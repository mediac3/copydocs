'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { MessageCircle, X, Send, FileText, Loader2, Bot, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAppStore } from '@/store/app-store'

interface Message {
  role: 'user' | 'assistant'
  content: string
  templates?: { id: string; name: string; description: string; category: string }[]
}

export default function AssistantChat() {
  const { isVisitor, user, startVisitorWizard, startWizard } = useAppStore()
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [greeted, setGreeted] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages, scrollToBottom])

  // Auto-greet when opened for the first time
  useEffect(() => {
    if (open && !greeted) {
      setGreeted(true)
      sendInitialGreeting()
    }
    }, [open, greeted])

  // Focus input when opened
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 300)
    }
  }, [open])

  const sendInitialGreeting = async () => {
    try {
      const res = await fetch('/api/assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: 'Hola, acabo de entrar a la página. ¿Qué me ofreces?',
          history: [],
        }),
      })
      const data = await res.json()
      if (data.response) {
        setMessages([{ role: 'assistant', content: data.response, templates: data.templates || [] }])
      }
    } catch {
      setMessages([{
        role: 'assistant',
        content: '¡Hola! 👋 Soy Copy, tu asistente en CopyExpress. ¿Qué tipo de documento te gustaría crear hoy? Puedo ayudarte con contratos, actas, derechos de petición y más.',
        templates: [],
      }])
    }
  }

  const sendMessage = async () => {
    const text = input.trim()
    if (!text || loading) return

    setInput('')
    setMessages((prev) => [...prev, { role: 'user', content: text }])
    setLoading(true)

    try {
      const history = messages
        .filter((m) => m.role === 'user' || m.role === 'assistant')
        .map((m) => ({ role: m.role, content: m.content }))

      const res = await fetch('/api/assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, history }),
      })
      const data = await res.json()

      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: data.response || data.error || 'No pude procesar tu consulta.',
          templates: data.templates || [],
        },
      ])
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: 'Hubo un error de conexión. Intenta de nuevo.', templates: [] },
      ])
    } finally {
      setLoading(false)
    }
  }

  const handleTemplateClick = (templateId: string) => {
    if (user) {
      startWizard(templateId)
    } else {
      startVisitorWizard(templateId)
    }
    setOpen(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <>
      {/* Chat Window */}
      {open && (
        <div className="fixed bottom-24 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[400px] h-[520px] max-h-[70vh] bg-card border border-border rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-fade-in-up">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-primary text-primary-foreground">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <p className="text-sm font-semibold">Copy — Asistente IA</p>
                <p className="text-[11px] opacity-80">CopyExpress</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setOpen(false)}
              className="h-7 w-7 text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin">
            {messages.length === 0 && !loading && (
              <div className="flex flex-col items-center justify-center h-full text-center px-4">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-3">
                  <Sparkles className="w-7 h-7 text-primary" />
                </div>
                <p className="text-sm font-medium text-foreground">¿Qué documento necesitas?</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Describe lo que buscas y te recomiendo la plantilla ideal.
                </p>
              </div>
            )}

            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-primary text-primary-foreground rounded-br-md'
                      : 'bg-secondary text-foreground rounded-bl-md'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{msg.content}</p>

                  {/* Template cards */}
                  {msg.templates && msg.templates.length > 0 && (
                    <div className="mt-3 space-y-2">
                      {msg.templates.map((t) => (
                        <button
                          key={t.id}
                          onClick={() => handleTemplateClick(t.id)}
                          className="flex items-center gap-3 w-full p-2.5 rounded-xl border border-primary/20 bg-primary/5 hover:bg-primary/10 transition-colors text-left"
                        >
                          <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                            <FileText className="w-4 h-4 text-primary" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-xs font-semibold text-primary">{t.name}</p>
                            <p className="text-[10px] text-muted-foreground truncate">{t.category} · {t.description}</p>
                          </div>
                          <span className="text-[10px] font-medium text-primary flex-shrink-0">Usar →</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="bg-secondary rounded-2xl rounded-bl-md px-4 py-3 flex items-center gap-2">
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">Pensando...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 border-t border-border bg-card">
            <div className="flex items-center gap-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Describe el documento que necesitas..."
                disabled={loading}
                className="flex-1 h-10 px-4 rounded-xl bg-secondary border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/40 disabled:opacity-50 transition-all"
              />
              <Button
                onClick={sendMessage}
                disabled={loading || !input.trim()}
                size="icon"
                className="h-10 w-10 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground disabled:opacity-40 transition-all"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-[10px] text-muted-foreground text-center mt-2">
              Asistente IA · CopyExpress
            </p>
          </div>
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={() => setOpen(!open)}
        className={`fixed bottom-5 right-4 sm:right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-105 ${
          open
            ? 'bg-foreground text-background'
            : 'bg-primary text-primary-foreground hover:shadow-[0_0_20px_rgba(40,167,69,0.3)]'
        }`}
      >
        {open ? (
          <X className="w-5 h-5" />
        ) : (
          <MessageCircle className="w-6 h-6" />
        )}
      </button>
    </>
  )
}
