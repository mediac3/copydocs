import { db } from '@/lib/db'
import { NextResponse } from 'next/server'
import { geminiChat } from '@/lib/gemini'

/**
 * AI endpoint for TinyMCE's aiassistant plugin.
 * The editor sends a prompt; we enhance it with knowledge base context
 * and return generated content.
 */
export async function POST(request: Request) {
  try {
    const { prompt } = await request.json()

    if (!prompt || typeof prompt !== 'string') {
      return NextResponse.json({ error: 'Prompt requerido' }, { status: 400 })
    }

    // Fetch active knowledge base entries for context
    const knowledgeEntries = await db.knowledgeBase.findMany({
      where: { active: true },
      select: { title: true, content: true, category: true },
    })

    let knowledgeContext = ''
    if (knowledgeEntries.length > 0) {
      knowledgeContext =
        '\n\nBASE DE CONOCIMIENTOS:\n' +
        knowledgeEntries
          .map((e) => `[${e.category}] ${e.title}: ${e.content}`)
          .join('\n')
    }

    const systemPrompt = `Eres un asistente de redacción de documentos legales colombianos para la plataforma CopyDocs.
Genera contenido profesional, claro y adecuado para documentos legales.
Responde SOLO con el contenido solicitado, sin explicaciones adicionales.
Usa español colombiano.
Si el usuario pide mejoras, reescrituras o continuación, hazlo directamente.
No uses markdown, genera HTML limpio adecuado para un editor de texto.${knowledgeContext}`

    const response = await geminiChat({ systemPrompt, message: prompt })

    const finalResponse = response || 'No se pudo generar contenido.'

    return NextResponse.json({ response: finalResponse })
  } catch (error) {
    console.error('TinyMCE AI error:', error)
    const msg = error instanceof Error ? error.message : ''
    if (msg.includes('GEMINI_API_KEY')) {
      return NextResponse.json({ error: msg }, { status: 503 })
    }
    return NextResponse.json(
      { error: 'Error al procesar con IA' },
      { status: 500 }
    )
  }
}
