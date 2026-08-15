/**
 * Lightweight Google Gemini helper.
 *
 * Uses the official Generative Language REST API via fetch, so no extra SDK
 * dependency is required. Configure with the free API key from
 * https://aistudio.google.com/apikey and set GEMINI_API_KEY in your .env.
 *
 * Free tier: generous limits, no credit card needed.
 *
 * Google periodically retires model versions (gemini-1.5-flash is already
 * gone), so requests try a chain of current models and automatically fall
 * back on 404 "model not found". Override with GEMINI_MODEL if needed.
 */

import { ensureEnvLoaded } from '@/lib/env';

// Read lazily: env vars may be populated by ensureEnvLoaded() at boot, after
// this module was first imported.
function geminiApiKey(): string {
  ensureEnvLoaded();
  return process.env.GEMINI_API_KEY || '';
}

function geminiModels(): string[] {
  ensureEnvLoaded();
  return [process.env.GEMINI_MODEL, 'gemini-flash-latest', 'gemini-2.5-flash', 'gemini-2.0-flash'].filter(
    Boolean,
  ) as string[];
}

/**
 * Discover a currently-available flash model via ListModels.
 *
 * Google keeps retiring model versions (1.5 → 2.0 → 2.5 have all returned
 * 404 "no longer available" at some point), so hardcoding names breaks the
 * assistant over time. This asks the API which models exist right now and
 * picks a fast/cheap one. Result is cached for 10 minutes per process.
 */
const gCache = globalThis as unknown as {
  __geminiModelsCache?: { models: string[]; at: number };
};

async function discoverModels(apiKey: string): Promise<string[]> {
  const cached = gCache.__geminiModelsCache;
  if (cached && Date.now() - cached.at < 10 * 60_000) {
    return cached.models;
  }
  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}&pageSize=200`,
      { signal: AbortSignal.timeout(15000) },
    );
    if (!res.ok) {
      gCache.__geminiModelsCache = { models: [], at: Date.now() };
      return [];
    }
    const data = (await res.json()) as {
      models?: { name?: string; supportedGenerationMethods?: string[] }[];
    };
    const usable = (data.models ?? [])
      .filter((m) => m.name && (m.supportedGenerationMethods ?? ['generateContent']).includes('generateContent'))
      .map((m) => m.name!.replace(/^models\//, ''));

    // Preferred aliases first, then any other flash-class model, up to 4
    // candidates so the request chain can rotate if one is overloaded.
    const result: string[] = [];
    for (const pref of ['gemini-flash-latest', 'gemini-2.5-flash', 'gemini-2.0-flash']) {
      const found = usable.find((n) => n === pref || n.startsWith(pref));
      if (found && !result.includes(found)) result.push(found);
    }
    for (const n of usable) {
      if (n.includes('flash') && !result.includes(n)) result.push(n);
      if (result.length >= 4) break;
    }
    if (result.length === 0 && usable[0]) result.push(usable[0]);

    gCache.__geminiModelsCache = { models: result, at: Date.now() };
    return result;
  } catch {
    return cached?.models ?? [];
  }
}

export interface GeminiMessage {
  role: 'user' | 'model';
  content: string;
}

/**
 * Convert an OpenAI-style [{role, content}] history (which is what the previous
 * z-ai-web-dev-sdk expected) into Gemini's [{role: 'user'|'model', parts}] format.
 * The first "assistant" message is treated as the system/behaviour prompt.
 */
function buildContents(
  systemPrompt: string,
  history: GeminiMessage[],
  currentMessage: string,
) {
  const contents: { role: 'user' | 'model'; parts: { text: string } }[] = [];

  // Gemini does not have a dedicated "system" role in the REST API; we prepend
  // the system instructions as the first user turn so they steer the model.
  if (systemPrompt) {
    contents.push({ role: 'user', parts: { text: systemPrompt } });
    contents.push({ role: 'model', parts: { text: 'Entendido. Estoy listo para ayudar.' } });
  }

  for (const msg of history) {
    contents.push({ role: msg.role, parts: { text: msg.content } });
  }

  contents.push({ role: 'user', parts: { text: currentMessage } });
  return contents;
}

/**
 * Send a chat completion request to Gemini and return the generated text.
 * Mirrors the shape the previous z-ai-web-dev-sdk usage expected.
 */
export async function geminiChat({
  systemPrompt,
  history = [],
  message,
}: {
  systemPrompt: string;
  history?: GeminiMessage[];
  message: string;
}): Promise<string> {
  const apiKey = geminiApiKey();
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY no está configurada. Obtén una clave gratuita en https://aistudio.google.com/apikey');
  }

  const body = {
    contents: buildContents(systemPrompt, history, message),
    generationConfig: {
      temperature: 0.7,
      topP: 0.95,
      maxOutputTokens: 1024,
    },
  };

  // Model chain: explicit override → dynamically discovered current models →
  // static fallbacks. The dynamic discovery self-heals against Google
  // retiring model versions.
  const discovered = await discoverModels(apiKey);
  const chain = [...geminiModels()];
  for (const m of discovered) {
    if (!chain.includes(m)) chain.unshift(m);
  }

  let lastError: unknown = new Error('No hay modelos de Gemini disponibles');

  const isTransient = (msg: string) =>
    /Gemini API error (429|5\d\d) /.test(msg);

  // Per model: retry transient errors (429/5xx = overloaded/rate-limited)
  // once with a short backoff, then move on to the next model in the chain.
  // 404 (retired model) moves on immediately. 400/401/403 (bad request/key)
  // are fatal and surfaced right away.
  for (const model of chain) {
    for (let attempt = 0; attempt < 2; attempt++) {
      try {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

        const res = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
          signal: AbortSignal.timeout(45000),
        });

        if (!res.ok) {
          const errText = await res.text().catch(() => '');
          const error = new Error(
            `Gemini API error ${res.status} (modelo ${model}): ${errText.slice(0, 300)}`,
          );
          lastError = error;

          if (res.status === 404) break; // retired → next model
          if (isTransient(error.message)) {
            if (attempt === 0) {
              await new Promise((r) => setTimeout(r, 900)); // brief backoff, retry
              continue;
            }
            break; // still busy → next model
          }
          throw error; // auth/quota/bad-request → fatal
        }

        const data = await res.json();
        const text: string | undefined =
          data?.candidates?.[0]?.content?.parts
            ?.map((p: { text?: string }) => p.text)
            .filter(Boolean)
            .join('\n') || undefined;

        return text || '';
      } catch (e) {
        // Network/runtime rejections (connection reset, DNS, timeout) are
        // treated like transient errors: try the next model in the chain.
        lastError = e;
        break;
      }
    }
  }

  throw lastError;
}
