import { db } from '@/lib/db';
import { NextResponse } from 'next/server';
import ZAI from 'z-ai-web-dev-sdk';

const zaiInstance: { current: null | Awaited<ReturnType<typeof ZAI.create>> } = { current: null };

async function getZAI() {
  if (!zaiInstance.current) {
    zaiInstance.current = await ZAI.create();
  }
  return zaiInstance.current;
}

const SYSTEM_PROMPT = `Eres el asistente virtual de CopyDocs, una plataforma de generacion de documentos legales colombianos. Tu nombre es "Copy" y eres amable, profesional y servicial.

Tu unico objetivo es ayudar al visitante a encontrar la plantilla de documento adecuada y guiarlo para que la use.

REGLAS IMPORTANTES:
1. Siempre habla en espanol colombiano.
2. Se conciso — maximo 3 oraciones por respuesta.
3. Cuando el usuario describa lo que necesita, recomiendale la plantilla mas adecuada de las disponibles.
4. Si el usuario pregunta por algo que no existe en las plantillas, sugierela la mas cercana.
5. NUNCA inventes plantillas que no existan en la lista.
6. Cuando recomiendes una plantilla, incluye su ID entre dobles corchetes [[TEMPLATE_ID]] para que el sistema pueda crear un enlace clickeable.
7. Si el usuario saluda, presentate brevemente y preguntale que tipo de documento necesita.
8. No des consejos legales — solo ayudas a encontrar la plantilla correcta.
9. Usa un tono calido y corporativo, apropiado para un servicio profesional.
10. Si el usuario no sabe que necesita, hazle preguntas especificas: Es un contrato? Un acta? Un derecho de peticion? Para que area (civil, laboral, mercantil)?`;

export async function POST(request: Request) {
  try {
    const { message, history = [] } = await request.json();

    if (!message || typeof message !== 'string') {
      return NextResponse.json({ error: 'Mensaje requerido' }, { status: 400 });
    }

    // Fetch available templates
    const templates = await db.documentTemplate.findMany({
      where: { status: 'published' },
      select: {
        id: true,
        name: true,
        description: true,
        category: true,
        legalArea: true,
        audience: true,
      },
    });

    const templateList = templates
      .map((t) => `- [${t.id}] "${t.name}" (Categoria: ${t.category}, Area: ${t.legalArea}, Audiencia: ${t.audience}): ${t.description}`)
      .join('\n');

    // Fetch active knowledge base entries for enhanced context
    const knowledgeEntries = await db.knowledgeBase.findMany({
      where: { active: true },
      select: { title: true, content: true, category: true },
    });

    let knowledgeContext = '';
    if (knowledgeEntries.length > 0) {
      knowledgeContext =
        '\n\nCONOCIMIENTO ADICIONAL:\n' +
        knowledgeEntries
          .map((e) => `[${e.category}] ${e.title}: ${e.content.replace(/<[^>]*>/g, '')}`)
          .join('\n');
    }

    const contextPrompt = `PLANTILLAS DISPONIBLES EN COPYDOCS:\n${templateList}${knowledgeContext}`;

    // Build message history
    const messages: { role: string; content: string }[] = [
      { role: 'assistant', content: `${SYSTEM_PROMPT}\n\n${contextPrompt}` },
    ];

    // Add conversation history (limit to last 10 messages to save tokens)
    const recentHistory = history.slice(-10);
    for (const msg of recentHistory) {
      messages.push({ role: msg.role === 'assistant' ? 'assistant' : 'user', content: msg.content });
    }

    // Add current message
    messages.push({ role: 'user', content: message });

    const zai = await getZAI();
    const completion = await zai.chat.completions.create({
      messages,
      thinking: { type: 'disabled' },
    });

    const response = completion.choices[0]?.message?.content || 'Lo siento, no pude generar una respuesta. Intenta de nuevo.';

    // Extract template IDs from response [[TEMPLATE_ID]]
    const templateIds = [...response.matchAll(/\[\[([a-z0-9-]+)\]\]/g)].map((m) => m[1]);

    // Clean response: remove [[ID]] brackets but keep the text
    const cleanResponse = response.replace(/\[\[[a-z0-9-]+\]\]/g, '').trim();

    // Find matching templates for rich cards
    const matchedTemplates = templateIds
      .map((id) => templates.find((t) => t.id === id))
      .filter(Boolean);

    return NextResponse.json({
      response: cleanResponse,
      templates: matchedTemplates,
    });
  } catch (error) {
    console.error('Assistant error:', error);
    return NextResponse.json(
      { error: 'Error al procesar tu consulta. Intenta de nuevo.' },
      { status: 500 }
    );
  }
}
