/**
 * Keyless AI attempt via the Pollinations text API (best effort).
 *
 * The anonymous GET endpoint is heavily rate/length limited and intermittently
 * returns 402, so this is used ONLY as an opportunistic zero-config attempt.
 * The reliable path is Gemini with a free API key (see src/lib/gemini.ts).
 */

const POLLINATIONS_URL = 'https://text.pollinations.ai/';

export async function pollinationsChat(
  systemPrompt: string,
  message: string,
): Promise<string> {
  // The GET API has no roles and only tolerates very short prompts: send the
  // user message with a compact instruction suffix when budget allows.
  const htmlHint = ' Responde solo el contenido en HTML limpio.';
  let prompt = `${message}${htmlHint}`;
  if (prompt.length > 100) {
    // Prefer the raw message over truncating it behind the length limit
    prompt = message;
  }
  if (prompt.length > 180) {
    prompt = prompt.slice(0, 177) + '...';
  }
  void systemPrompt;

  const url = `${POLLINATIONS_URL}${encodeURIComponent(prompt)}`;

  const res = await fetch(url, {
    headers: { Accept: 'text/plain' },
    signal: AbortSignal.timeout(45000),
  });

  if (!res.ok) {
    const errText = await res.text().catch(() => '');
    throw new Error(`Pollinations API error ${res.status}: ${errText.slice(0, 200)}`);
  }

  const text = await res.text();
  // Guard against error payloads that arrive with HTTP 200
  if (text.includes('"status":402') || text.includes('Payment Required')) {
    throw new Error('Pollinations API error 402');
  }
  return text.trim();
}
