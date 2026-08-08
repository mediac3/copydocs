'use client'

import { useState, useEffect } from 'react'
import { Check, ExternalLink, Loader2, FileText } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog'

interface TermsAcceptanceProps {
  onStart: () => void
  templateName: string
}

export default function TermsAcceptance({ onStart, templateName }: TermsAcceptanceProps) {
  const [accepted, setAccepted] = useState(false)
  const [showTerms, setShowTerms] = useState(false)
  const [terms, setTerms] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/settings')
      .then((r) => r.json())
      .then((data) => {
        setTerms(data.terms_and_conditions || 'No hay términos y condiciones configurados aún. Al continuar, aceptas las políticas de uso de la plataforma.')
      })
      .catch(() => {
        setTerms('No se pudo cargar la información. Por favor intenta de nuevo.')
      })
      .finally(() => setLoading(false))
  }, [])

  const handleAccept = () => {
    if (accepted) {
      onStart()
    }
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-[60vh] p-6">
        <div className="w-full max-w-md text-center space-y-6 animate-fade-in-up">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto">
            <FileText className="w-8 h-8 text-primary" />
          </div>

          <div>
            <h2 className="text-xl font-bold text-foreground">Vas a crear un documento</h2>
            <p className="text-sm text-muted-foreground mt-1">
              <span className="font-medium text-foreground">{templateName}</span>
            </p>
          </div>

          {loading ? (
            <div className="flex items-center justify-center gap-2 text-muted-foreground">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span className="text-sm">Cargando...</span>
            </div>
          ) : (
            <div className="flex items-start gap-3 p-4 rounded-xl bg-secondary border border-border text-left">
              <Checkbox
                id="terms-accept"
                checked={accepted}
                onCheckedChange={(checked) => setAccepted(checked === true)}
                className="mt-0.5"
              />
              <label
                htmlFor="terms-accept"
                className="text-sm text-muted-foreground leading-relaxed cursor-pointer"
              >
                Acepto los{' '}
                <button
                  type="button"
                  onClick={(e) => { e.preventDefault(); setShowTerms(true) }}
                  className="inline-flex items-center gap-1 text-primary font-medium hover:underline"
                >
                  Términos y Condiciones
                  <ExternalLink className="w-3 h-3" />
                </button>
                {' '}del servicio
              </label>
            </div>
          )}

          <Button
            onClick={handleAccept}
            disabled={!accepted || loading}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold h-11 transition-all disabled:opacity-40"
          >
            Comenzar
          </Button>

          <p className="text-xs text-muted-foreground/60">
            Al continuar, aceptas procesar tus datos conforme a la Ley 1581 de 2012.
          </p>
        </div>
      </div>

      {/* Terms Dialog */}
      <Dialog open={showTerms} onOpenChange={setShowTerms}>
        <DialogContent className="max-h-[80vh] overflow-y-auto sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>Términos y Condiciones del Servicio</DialogTitle>
            <DialogDescription>
              CopyExpress — Generación Inteligente de Documentos
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="prose prose-sm max-w-none text-foreground whitespace-pre-wrap leading-relaxed">
              {terms}
            </div>
          </div>
          <DialogFooter>
            <Button
              onClick={() => {
                setAccepted(true)
                setShowTerms(false)
              }}
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              <Check className="w-4 h-4 mr-2" />
              Aceptar y continuar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
