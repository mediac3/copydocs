import { db } from '@/lib/db'
import { NextResponse } from 'next/server'
import { geminiChat } from '@/lib/gemini'
import { pollinationsChat } from '@/lib/pollinations'
import { ensureEnvLoaded } from '@/lib/env'

/**
 * AI endpoint for the visual editor assistant.
 *
 * Provider chain (first that works wins):
 *  1. Google Gemini — only when GEMINI_API_KEY is configured (free key).
 *  2. Pollinations — free, keyless, zero-config fallback so the assistant
 *     works out of the box on any deployment.
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

    // 1) Gemini (optional, requires key — may come from .env via ensureEnvLoaded)
    ensureEnvLoaded()
    if (process.env.GEMINI_API_KEY) {
      try {
        const response = await geminiChat({ systemPrompt, message: prompt })
        if (response) {
          return NextResponse.json({ response })
        }
      } catch (error) {
        console.warn(
          '[tinymce-ai] Gemini failed, falling back to Pollinations:',
          error instanceof Error ? error.message : error,
        )
      }
    }

    // 2) Pollinations — keyless best-effort fallback
    try {
      const response = await pollinationsChat(systemPrompt, prompt)
      if (response) {
        return NextResponse.json({ response })
      }
    } catch (error) {
      console.warn(
        '[tinymce-ai] Pollinations fallback failed:',
        error instanceof Error ? error.message : error,
      )
    }

    // 3) Nothing worked — tell the user exactly how to enable the assistant
    return NextResponse.json(
      {
        error:
          'El asistente IA no está disponible en este momento. Para activarlo de forma estable y gratuita: obtén una clave en https://aistudio.google.com/apikey y define GEMINI_API_KEY en el servidor.',
      },
      { status: 503 }
    )
  } catch (error) {
    console.error('TinyMCE AI error:', error)
    return NextResponse.json(
      { error: 'Error al procesar con IA' },
      { status: 500 }
    )
  }
}
