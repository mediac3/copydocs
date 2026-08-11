'use client'

import { useEffect, useState, useRef } from 'react'
import {
  ChevronLeft,
  ChevronRight,
  X,
  Newspaper,
  ExternalLink,
  Image as ImageIcon,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'

interface Publication {
  id: string
  title: string
  description: string
  content: string
  imageUrl: string | null
  order: number
}

/* -------------------------------------------------------------------------- */
/*  Render HTML content (links + tables) safely                               */
/* -------------------------------------------------------------------------- */
function SafeHtml({ html }: { html: string }) {
  return (
    <div
      className="not-prose text-sm text-foreground/80 max-w-none [&_a]:text-primary [&_a]:underline [&_a]:underline-offset-2 hover:[&_a]:text-primary/80 [&_table]:w-full [&_table]:border-collapse [&_table]:text-xs [&_th]:border [&_th]:border-border [&_th]:bg-muted/50 [&_th]:px-2 [&_th]:py-1.5 [&_th]:text-left [&_th]:font-semibold [&_td]:border [&_td]:border-border [&_td]:px-2 [&_td]:py-1.5 [&_td]:text-foreground/70 [&_figure]:my-3 [&_figure_img]:w-full [&_figure_img]:h-auto [&_figure_img]:rounded-lg [&_figure_img]:border [&_figure_img]:border-border/50 [&_figure_figcaption]:text-xs [&_figure_figcaption]:text-muted-foreground [&_p_img]:inline-block [&_p_img]:max-w-full [&_p_img]:h-auto"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}

/* -------------------------------------------------------------------------- */
/*  Lightbox                                                                  */
/* -------------------------------------------------------------------------- */
function PublicationLightbox({
  publication,
  onClose,
}: {
  publication: Publication
  onClose: () => void
}) {
  const overlayRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) onClose()
  }

  return (
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-2xl max-h-[85vh] bg-card border border-border rounded-2xl shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 slide-in-from-bottom-4 duration-300">
        {/* Header */}
        <div className="flex items-start justify-between p-5 pb-3 border-b border-border">
          <div className="flex-1 min-w-0 pr-4">
            <h2 className="text-lg font-bold text-foreground leading-tight">
              {publication.title}
            </h2>
            {publication.description && (
              <p className="text-sm text-muted-foreground mt-1">
                {publication.description}
              </p>
            )}
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="h-8 w-8 rounded-full text-muted-foreground hover:text-foreground flex-shrink-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-5">
          {/* Image */}
          {publication.imageUrl && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={publication.imageUrl}
              alt={publication.title}
              className="w-full rounded-xl mb-4 border border-border object-cover max-h-60"
            />
          )}

          {/* Content */}
          {publication.content ? (
            <SafeHtml html={publication.content} />
          ) : (
            <p className="text-sm text-muted-foreground italic">
              No hay contenido adicional.
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/*  Main Publications Panel (anchored left, toggleable)                       */
/* -------------------------------------------------------------------------- */
export default function PublicationsPanel() {
  const [open, setOpen] = useState(true)
  const [publications, setPublications] = useState<Publication[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedPub, setSelectedPub] = useState<Publication | null>(null)

  useEffect(() => {
    fetch('/api/publications')
      .then((r) => r.json())
      .then((data) => {
        setPublications(Array.isArray(data) ? data : [])
      })
      .catch(() => setPublications([]))
      .finally(() => setLoading(false))
  }, [])

  if (!loading && publications.length === 0) return null

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed left-0 top-1/2 -translate-y-1/2 z-50 bg-primary text-primary-foreground rounded-r-lg p-1.5 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group"
        title={open ? 'Ocultar publicaciones' : 'Mostrar publicaciones'}
      >
        {open ? (
          <ChevronLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
        ) : (
          <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        )}
      </button>

      {/* Panel */}
      <div
        className={`
          fixed left-0 top-0 h-full z-40
          bg-card/95 backdrop-blur-md border-r border-border
          transition-all duration-300 ease-in-out overflow-hidden
          ${open ? 'w-72' : 'w-0'}
          shadow-xl
        `}
      >
        <div className="flex flex-col h-full w-72">
          {/* Panel Header */}
          <div className="flex items-center gap-2 px-4 py-3 border-b border-border flex-shrink-0">
            <Newspaper className="h-4 w-4 text-primary" />
            <span className="text-sm font-semibold text-foreground">Publicaciones</span>
          </div>

          {/* Publications List */}
          <ScrollArea className="flex-1">
            <div className="p-3 space-y-2">
              {loading
                ? Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="rounded-lg border border-border p-3 animate-pulse">
                      <div className="h-4 bg-muted rounded w-3/4 mb-2" />
                      <div className="h-3 bg-muted rounded w-full" />
                      <div className="h-3 bg-muted rounded w-2/3 mt-1" />
                    </div>
                  ))
                : publications.map((pub) => (
                    <button
                      key={pub.id}
                      onClick={() => setSelectedPub(pub)}
                      className="w-full text-left rounded-lg border border-border p-3 transition-all hover:border-primary/30 hover:shadow-sm hover:bg-accent/5 group"
                    >
                      {/* Thumbnail */}
                      {pub.imageUrl && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={pub.imageUrl}
                          alt={pub.title}
                          className="w-full h-24 object-cover rounded-md mb-2 border border-border/50"
                        />
                      )}
                      <h4 className="text-xs font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-1">
                        {pub.title}
                      </h4>
                      <p className="text-[11px] text-muted-foreground mt-1 line-clamp-2 leading-relaxed">
                        {pub.description}
                      </p>
                      <span className="inline-flex items-center gap-1 mt-2 text-[10px] font-medium text-primary/70 group-hover:text-primary transition-colors">
                        Leer mas <ExternalLink className="h-2.5 w-2.5" />
                      </span>
                    </button>
                  ))}
            </div>
          </ScrollArea>
        </div>
      </div>

      {/* Lightbox */}
      {selectedPub && (
        <PublicationLightbox
          publication={selectedPub}
          onClose={() => setSelectedPub(null)}
        />
      )}
    </>
  )
}
