'use client'

import { useState, useEffect, useRef, useMemo, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable'
import { ArrowLeft, ArrowRight, Save, FileText, Check, Info, Eye, Download, MessageCircle, Phone } from 'lucide-react'
import { toast } from 'sonner'
import { useAppStore } from '@/store/app-store'
import TermsAcceptance from '@/components/TermsAcceptance'

/* -------------------------------------------------------------------------- */
/*  Types                                                                    */
/* -------------------------------------------------------------------------- */

interface WizardField {
  key: string
  label: string
  type: 'text' | 'number' | 'date' | 'textarea' | 'select' | 'boolean'
  options?: string[]
  tooltip?: string
  condition?: { field: string; value: boolean | string | number }
}

interface WizardStep {
  title: string
  fields: WizardField[]
}

interface WizardConfig {
  steps: WizardStep[]
}

interface Template {
  id: string
  name: string
  description: string
  category: string
  legalArea: string
  baseContent: string
  wizardConfig: string
  status: string
}

interface Contact {
  id: string
  name: string
  contactType: string
  documentType?: string | null
  documentNumber?: string | null
  companyName?: string | null
  email?: string | null
  phone?: string | null
  address?: string | null
  city?: string | null
}

/* -------------------------------------------------------------------------- */
/*  Contact type mapping - field name prefix → contact type                   */
/* -------------------------------------------------------------------------- */

const CONTACT_TYPE_MAP: Record<string, string[]> = {
  arrendador: ['arrendador', 'propietario'],
  arrendatario: ['arrendatario', 'inquilino'],
  fiador: ['fiador', 'codeudor'],
  comprador: ['comprador', 'adquirente'],
  vendedor: ['vendedor', 'enajenante'],
  empleador: ['empleador', 'patrono', 'empresa'],
  trabajador: ['trabajador', 'empleado'],
  demandante: ['demandante', 'actor'],
  demandado: ['demandado'],
  deudor: ['deudor'],
  acreedor: ['acreedor'],
}

function detectContactType(fieldKey: string): string | null {
  const lower = fieldKey.toLowerCase()
  for (const [contactType, prefixes] of Object.entries(CONTACT_TYPE_MAP)) {
    for (const prefix of prefixes) {
      if (lower.includes(prefix)) return contactType
    }
  }
  return null
}

/* -------------------------------------------------------------------------- */
/*  Component                                                                */
/* -------------------------------------------------------------------------- */

export default function WizardPage() {
  const { user, wizardTemplateId, wizardDocumentId, setCurrentPage, isVisitor, exitVisitorMode } = useAppStore()

  /* ---- state ---- */
  const [template, setTemplate] = useState<Template | null>(null)
  const [wizardConfig, setWizardConfig] = useState<WizardConfig | null>(null)
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string | number | boolean>>({})
  const [loading, setLoading] = useState(true)
  const [generating, setGenerating] = useState(false)
  const [saving, setSaving] = useState(false)
  const [docId, setDocId] = useState<string | null>(wizardDocumentId)
  const [contactsCache, setContactsCache] = useState<Record<string, Contact[]>>({})
  const [showContacts, setShowContacts] = useState<string | null>(null)
  const previewRef = useRef<HTMLDivElement>(null)
  const hasLoadedDraft = useRef(false)

  // WhatsApp modal state (visitor mode)
  const [showWhatsAppModal, setShowWhatsAppModal] = useState(false)
  const [visitorPhone, setVisitorPhone] = useState('')

  // Terms acceptance (visitor mode)
  const [termsAccepted, setTermsAccepted] = useState(false)

  /* ---- fetch template ---- */
  useEffect(() => {
    if (!wizardTemplateId) {
      setCurrentPage('catalog')
      return
    }
    async function load() {
      try {
        const res = await fetch('/api/templates')
        const data = await res.json()
        const found: Template | undefined = data.templates?.find(
          (t: Template) => t.id === wizardTemplateId
        )
        if (!found) {
          toast.error('Plantilla no encontrada')
          setCurrentPage('catalog')
          return
        }
        setTemplate(found)
        try {
          let config: WizardConfig = typeof found.wizardConfig === 'string' 
            ? JSON.parse(found.wizardConfig) 
            : found.wizardConfig
          // Normalize: if wizardConfig is an array, wrap it in { steps }
          if (Array.isArray(config)) {
            config = { steps: config }
          }
          if (!config || !config.steps) {
            config = { steps: [] }
          }
          // Normalize: seed data may use 'id' instead of 'key' for field identifiers
          for (const step of config.steps) {
            for (const field of step.fields) {
              if (!field.key && (field as Record<string, unknown>).id) {
                field.key = String((field as Record<string, unknown>).id)
              }
            }
          }
          setWizardConfig(config)
        } catch {
          toast.error('Error al leer configuración de la plantilla')
          setCurrentPage('catalog')
          return
        }

        // Load existing draft if editing
        if (wizardDocumentId && !hasLoadedDraft.current) {
          hasLoadedDraft.current = true
          const docRes = await fetch('/api/documents')
          if (docRes.ok) {
            const docData = await docRes.json()
            const existing = docData.documents?.find(
              (d: { id: string; templateId: string }) => d.id === wizardDocumentId
            )
            if (existing && existing.answers) {
              try {
                const parsed = typeof existing.answers === 'string' 
                  ? JSON.parse(existing.answers) 
                  : existing.answers
                setAnswers(parsed)
                setDocId(existing.id)
              } catch { /* ignore */ }
            }
          }
        }
      } catch {
        toast.error('Error al cargar la plantilla')
        setCurrentPage('catalog')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [wizardTemplateId])

  /* ---- fetch contacts for a field ---- */
  const fetchContacts = useCallback(async (contactType: string) => {
    if (contactsCache[contactType]) return contactsCache[contactType]
    if (!user) return []
    try {
      const res = await fetch(`/api/contacts?type=${encodeURIComponent(contactType)}`, {
        headers: { 'x-user-id': user.id },
      })
      if (!res.ok) return []
      const data = await res.json()
      const contacts: Contact[] = data.contacts || []
      setContactsCache((prev) => ({ ...prev, [contactType]: contacts }))
      return contacts
    } catch {
      return []
    }
  }, [contactsCache, user])

  /* ---- auto-open contacts dropdown on focus (logged-in only) ---- */
  const handleFieldFocus = useCallback(async (fieldKey: string) => {
    if (isVisitor || !user) return
    const contactType = detectContactType(fieldKey)
    if (!contactType) return
    const contacts = await fetchContacts(contactType)
    if (contacts.length > 0) {
      setShowContacts(fieldKey)
    }
  }, [fetchContacts, isVisitor, user])

  /* ---- apply contact data ---- */
  const applyContact = useCallback((contact: Contact, fieldKey: string) => {
    const updates: Record<string, string> = {}
    // Map contact fields to wizard answer keys
    if (contact.name) {
      const nameKey = fieldKey.includes('nombre') ? fieldKey : fieldKey.replace(/_cc$|_cedula$|_nit$|_direccion$|_ciudad$|_telefono$|_email$/, '_nombre')
      updates[nameKey] = contact.name
    }
    if (contact.documentNumber) {
      const ccKey = fieldKey.replace(/_nombre$|_direccion$|_ciudad$|_telefono$|_email$/, '_cc').replace(/_nombre$/, '_cc')
      // Try common patterns
      for (const suffix of ['_cc', '_cedula', '_nit', '_documento']) {
        const candidate = fieldKey.replace(/_nombre.*$/, suffix)
        updates[candidate] = contact.documentNumber
      }
    }
    if (contact.address) {
      updates[fieldKey.replace(/_nombre.*$/, '_direccion')] = contact.address
    }
    if (contact.city) {
      updates[fieldKey.replace(/_nombre.*$/, '_ciudad')] = contact.city
    }
    if (contact.phone) {
      updates[fieldKey.replace(/_nombre.*$/, '_telefono')] = contact.phone
    }
    if (contact.email) {
      updates[fieldKey.replace(/_nombre.*$/, '_email')] = contact.email
    }

    // For the current field itself, just set the name
    if (contact.name && ['text'].includes(wizardConfig?.steps.flatMap(s => s.fields).find(f => f.key === fieldKey)?.type || '')) {
      updates[fieldKey] = contact.name
    }

    setAnswers((prev) => {
      const next = { ...prev }
      for (const [k, v] of Object.entries(updates)) {
        // Only set if the key exists in wizard config
        const allFields = wizardConfig?.steps.flatMap((s) => s.fields) || []
        if (allFields.some((f) => f.key === k)) {
          next[k] = v
        }
      }
      return next
    })
    setShowContacts(null)
    toast.success(`Datos de ${contact.name} aplicados`)
  }, [wizardConfig])

  /* ---- update answer ---- */
  const updateAnswer = useCallback((key: string, value: string | number | boolean) => {
    setAnswers((prev) => ({ ...prev, [key]: value }))
  }, [])

  /* ---- check condition ---- */
  const isFieldVisible = useCallback(
    (field: WizardField) => {
      if (!field.condition) return true
      return answers[field.condition.field] === field.condition.value
    },
    [answers]
  )

  /* ---- navigation ---- */
  const totalSteps = wizardConfig ? wizardConfig.steps.length : 0
  const isReviewStep = currentStep === totalSteps

  const goToStep = useCallback(
    (step: number) => {
      if (step < 0 || step > totalSteps) return
      setCurrentStep(step)
    },
    [totalSteps]
  )

  const goNext = useCallback(() => {
    if (currentStep < totalSteps) setCurrentStep((s) => s + 1)
  }, [currentStep, totalSteps])

  const goPrev = useCallback(() => {
    if (currentStep > 0) setCurrentStep((s) => s - 1)
  }, [currentStep])

  /* ---- save draft ---- */
  const saveDraft = useCallback(async () => {
    if (!user || !template) return
    setSaving(true)
    try {
      const headers: HeadersInit = {
        'Content-Type': 'application/json',
        'x-user-id': user.id,
      }
      if (docId) {
        await fetch('/api/documents', {
          method: 'PUT',
          headers,
          body: JSON.stringify({
            id: docId,
            title: template.name,
            answers,
            status: 'draft',
          }),
        })
      } else {
        const res = await fetch('/api/documents', {
          method: 'POST',
          headers,
          body: JSON.stringify({
            templateId: template.id,
            title: template.name,
            answers,
          }),
        })
        const data = await res.json()
        if (data.document?.id) {
          setDocId(data.document.id)
        }
      }
      toast.success('Borrador guardado')
    } catch {
      toast.error('Error al guardar borrador')
    } finally {
      setSaving(false)
    }
  }, [user, template, docId, answers])

  /* ---- live preview ---- */
  const replaceVariables = useCallback(
    (content: string, final = false) => {
      let result = content
      const allFields = wizardConfig?.steps.flatMap((s) => s.fields) || []
      for (const field of allFields) {
        const placeholder = `{{${field.key}}}`
        const value = answers[field.key]
        if (value !== undefined && value !== '') {
          result = result.replaceAll(placeholder, String(value))
        }
      }
      if (final) {
        // Replace remaining placeholders with empty string
        result = result.replace(/\{\{[^}]+\}\}/g, '')
      }
      return result
    },
    [answers, wizardConfig]
  )

  /* ---- generate document ---- */
  const generateDocument = useCallback(async () => {
    if (!user || !template) return
    // Check credits for new documents (not re-generations)
    if (!docId && user.credits <= 0) {
      toast.error('No tienes créditos disponibles. Contacta al administrador.')
      return
    }
    setGenerating(true)
    try {
      const generated = replaceVariables(template.baseContent, true)
      const headers: HeadersInit = {
        'Content-Type': 'application/json',
        'x-user-id': user.id,
      }
      const body: Record<string, unknown> = {
        id: docId,
        title: template.name,
        answers,
        status: 'completed',
        generatedContent: generated,
      }
      if (!docId) {
        body.templateId = template.id
      }
      const method = docId ? 'PUT' : 'POST'
      const res = await fetch('/api/documents', {
        method,
        headers,
        body: JSON.stringify(body),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Error')
      if (!docId && data.document?.id) {
        setDocId(data.document.id)
      }
      toast.success('¡Documento generado exitosamente!')
      // Deduct 1 credit
      fetch('/api/credits', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-user-id': user.id },
        body: JSON.stringify({ action: 'deduct', amount: 1, description: `Documento: ${template.name}` }),
      }).catch(() => {}) // silently fail - document is already saved
      setTimeout(() => setCurrentPage('documents'), 800)
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Error al generar documento')
    } finally {
      setGenerating(false)
    }
  }, [user, template, docId, answers, setCurrentPage, replaceVariables])

  /* ---- visitor: send WhatsApp ---- */
  const handleVisitorSubmit = useCallback(() => {
    if (!template) return
    setShowWhatsAppModal(true)
  }, [template])

  const sendWhatsApp = useCallback(async () => {
    if (!template || !visitorPhone.trim()) return
    // Find the user's name from answers (first field containing 'nombre')
    const allFields = wizardConfig?.steps.flatMap((s) => s.fields) || []
    const nombreField = allFields.find((f) => f.key.toLowerCase().includes('nombre'))
    const userName = nombreField ? String(answers[nombreField.key] || 'sin nombre') : 'sin nombre'

    // Save visitor document to database before sending WhatsApp
    try {
      const generated = replaceVariables(template.baseContent, true)
      const res = await fetch('/api/documents/visitor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          templateId: template.id,
          title: template.name,
          answers,
          generatedContent: generated,
          visitorPhone: visitorPhone.trim(),
          visitorName: userName,
        }),
      })
      if (res.ok) {
        toast.success('Documento guardado exitosamente')
      }
    } catch {
      // Non-critical: WhatsApp message still sends
    }

    const message = encodeURIComponent(`Generé un nuevo documento ${template.name} a nombre de ${userName}`)
    const url = `https://wa.me/573226575422?text=${message}`
    window.open(url, '_blank')
    toast.success('Solicitud enviada por WhatsApp')
    setShowWhatsAppModal(false)
  }, [template, wizardConfig, answers, visitorPhone, replaceVariables])

  // Prevent right-click and copy in preview for visitors
  const handlePreviewContextMenu = useCallback((e: React.MouseEvent) => {
    if (isVisitor) {
      e.preventDefault()
    }
  }, [isVisitor])

  const handlePreviewCopy = useCallback((e: React.ClipboardEvent) => {
    if (isVisitor) {
      e.preventDefault()
      toast.info('El contenido del documento está protegido')
    }
  }, [isVisitor])

  const previewContent = useMemo(() => {
    if (!template) return ''
    return replaceVariables(template.baseContent)
  }, [template, replaceVariables])

  /* ---- auto-scroll preview ---- */
  useEffect(() => {
    if (!previewRef.current) return
    const currentFields = wizardConfig?.steps[currentStep]?.fields || []
    const visibleFields = currentFields.filter(isFieldVisible)
    if (visibleFields.length === 0) return
    const firstKey = visibleFields[0].key
    const placeholder = `{{${firstKey}}}`
    const textContent = previewRef.current.textContent || ''
    const idx = textContent.indexOf(firstKey)
    if (idx >= 0) {
      // Rough scroll proportion
      const proportion = idx / textContent.length
      previewRef.current.scrollTop = proportion * previewRef.current.scrollHeight
    }
  }, [currentStep])

  /* ---- compute progress ---- */
  const completedSteps = useMemo(() => {
    if (!wizardConfig) return 0
    let count = 0
    for (let i = 0; i < Math.min(currentStep, wizardConfig.steps.length); i++) {
      const step = wizardConfig.steps[i]
      const visibleFields = step.fields.filter(isFieldVisible)
      if (visibleFields.length === 0 || visibleFields.every((f) => answers[f.key] !== undefined && answers[f.key] !== '')) {
        count++
      }
    }
    return count
  }, [wizardConfig, currentStep, answers, isFieldVisible])

  /* ---- Terms gate for visitors ---- */
  if (isVisitor && !termsAccepted) {
    return (
      <TermsAcceptance
        onStart={() => setTermsAccepted(true)}
        templateName={template?.name || 'Documento'}
      />
    )
  }

  /* ---- loading ---- */
  if (loading) {
    return (
      <div className="flex h-full items-center justify-center bg-[#0A1628]">
        <div className="flex flex-col items-center gap-4">
          <div className="h-10 w-10 animate-spin rounded-full border-2 border-[#C9A94E] border-t-transparent" />
          <p className="text-sm text-[#CBD5E1]">Cargando plantilla...</p>
        </div>
      </div>
    )
  }

  if (!template || !wizardConfig) return null

  const allFields = wizardConfig.steps.flatMap((s) => s.fields)
  const currentFields = isReviewStep ? [] : wizardConfig.steps[currentStep]?.fields || []

  /* ====================================================================== */
  /*  RENDER                                                                 */
  /* ====================================================================== */

  return (
    <TooltipProvider delayDuration={300}>
      <div className="flex h-full flex-col bg-[#0A1628]">
        {/* ---- Top bar ---- */}
        <div className="flex items-center justify-between border-b border-[#1E3A5F] px-6 py-3">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              className="text-[#CBD5E1] hover:bg-[#152A4A] hover:text-white"
              onClick={() => setCurrentPage('catalog')}
            >
              <ArrowLeft className="mr-1 h-4 w-4" />
              Volver
            </Button>
            <div className="h-4 w-px bg-[#1E3A5F]" />
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-[#C9A94E]" />
              <span className="text-sm font-medium text-white">{template.name}</span>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="border-[#C9A94E]/30 text-[#C9A94E] hover:bg-[#C9A94E]/10"
            onClick={saveDraft}
            disabled={saving}
          >
            <Save className="mr-1.5 h-3.5 w-3.5" />
            {saving ? 'Guardando...' : 'Guardar borrador'}
          </Button>
        </div>

        {/* ---- Main content ---- */}
        <div className="flex-1 overflow-hidden">
          <ResizablePanelGroup direction="horizontal">
            {/* =============== LEFT PANEL - FORM =============== */}
            <ResizablePanel defaultSize={55} minSize={35}>
              <div className="flex h-full flex-col">
                {/* Progress Stepper */}
                <div className="border-b border-[#1E3A5F] px-6 py-4">
                  <div className="flex items-center justify-center">
                    {wizardConfig.steps.map((step, idx) => {
                      const isCompleted = idx < completedSteps
                      const isCurrent = idx === currentStep && !isReviewStep
                      const isFuture = idx > currentStep

                      return (
                        <div key={step.title} className="flex items-center">
                          {/* Step circle + label */}
                          <button
                            type="button"
                            onClick={() => goToStep(idx)}
                            className="group flex flex-col items-center gap-1.5"
                          >
                            <div
                              className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold transition-all duration-300 ${
                                isCompleted
                                  ? 'bg-[#C9A94E] text-[#0A1628] shadow-lg shadow-[#C9A94E]/20'
                                  : isCurrent
                                    ? 'border-2 border-[#C9A94E] text-[#C9A94E]'
                                    : 'border border-[#1E3A5F] text-[#475569]'
                              }`}
                            >
                              {isCompleted ? <Check className="h-4 w-4" /> : idx + 1}
                            </div>
                            <span
                              className={`max-w-[80px] truncate text-center text-[10px] leading-tight ${
                                isCompleted
                                  ? 'text-[#C9A94E]'
                                  : isCurrent
                                    ? 'text-white font-medium'
                                    : 'text-[#475569]'
                              }`}
                            >
                              {step.title}
                            </span>
                          </button>
                          {/* Connector line */}
                          {idx < wizardConfig.steps.length - 1 && (
                            <div
                              className={`mx-2 h-0.5 w-8 transition-colors duration-300 ${
                                idx < completedSteps ? 'bg-[#C9A94E]' : 'bg-[#1E3A5F]'
                              }`}
                            />
                          )}
                        </div>
                      )
                    })}
                    {/* Review step */}
                    <div className="flex items-center">
                      <div
                        className={`mx-2 h-0.5 w-8 transition-colors duration-300 ${
                          currentStep >= totalSteps ? 'bg-[#C9A94E]' : 'bg-[#1E3A5F]'
                        }`}
                      />
                      <button
                        type="button"
                        onClick={() => goToStep(totalSteps)}
                        className="group flex flex-col items-center gap-1.5"
                      >
                        <div
                          className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold transition-all duration-300 ${
                            isReviewStep
                              ? 'border-2 border-[#C9A94E] text-[#C9A94E]'
                              : 'border border-[#1E3A5F] text-[#475569]'
                          }`}
                        >
                          <Eye className="h-4 w-4" />
                        </div>
                        <span
                          className={`max-w-[80px] truncate text-center text-[10px] leading-tight ${
                            isReviewStep ? 'text-white font-medium' : 'text-[#475569]'
                          }`}
                        >
                          Revisión
                        </span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Step Content / Review */}
                <div className="flex-1 overflow-y-auto scrollbar-thin px-6 py-6">
                  {isReviewStep ? (
                    <div className="space-y-6 animate-fade-in-up">
                      <div className="mb-6">
                        <h2 className="text-lg font-semibold text-white">Revisión Final</h2>
                        <p className="text-sm text-[#94A3B8]">Verifica tus respuestas antes de generar el documento.</p>
                      </div>

                      {wizardConfig.steps.map((step, stepIdx) => {
                        const visibleFields = step.fields.filter(isFieldVisible)
                        if (visibleFields.length === 0) return null
                        return (
                          <Card key={step.title} className="border-[#1E3A5F] bg-[#0F1F38]">
                            <CardContent className="pt-4 pb-4">
                              <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-[#C9A94E]">
                                <Badge variant="outline" className="border-[#C9A94E]/30 text-[#C9A94E] text-[10px]">
                                  Paso {stepIdx + 1}
                                </Badge>
                                {step.title}
                              </h3>
                              <div className="space-y-2.5">
                                {visibleFields.map((field) => (
                                  <div
                                    key={field.key}
                                    className="flex items-start justify-between gap-4 rounded-md bg-[#152A4A]/50 px-3 py-2"
                                  >
                                    <span className="text-xs text-[#94A3B8]">{field.label}</span>
                                    <span className="max-w-[60%] truncate text-right text-xs font-medium text-white">
                                      {answers[field.key] !== undefined && answers[field.key] !== ''
                                        ? String(answers[field.key])
                                        : <span className="text-[#C9A94E]/60 italic">Sin respuesta</span>}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </CardContent>
                          </Card>
                        )
                      })}


                      {/* Generate / WhatsApp Button */}
                      <div className="pt-4">
                        <Button
                          className={isVisitor
                            ? "w-full bg-[#25D366] text-white font-semibold hover:bg-[#20BD5A] shadow-lg shadow-[#25D366]/20"
                            : "w-full bg-[#C9A94E] text-[#0A1628] font-semibold hover:bg-[#D4BA6A] shadow-lg shadow-[#C9A94E]/20"}
                          size="lg"
                          onClick={isVisitor ? handleVisitorSubmit : generateDocument}
                          disabled={!isVisitor && generating}
                        >
                          {generating ? (
                            <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-[#0A1628] border-t-transparent" />
                          ) : isVisitor ? (
                            <MessageCircle className="mr-2 h-5 w-5" />
                          ) : (
                            <FileText className="mr-2 h-5 w-5" />
                          )}
                          {generating ? "Generando..." : isVisitor ? "Enviar por WhatsApp" : "Generar Documento"}
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-5 animate-fade-in-up">
                      <div className="mb-2">
                        <h2 className="text-lg font-semibold text-white">
                          {wizardConfig.steps[currentStep]?.title}
                        </h2>
                        <p className="text-sm text-[#94A3B8]">
                          Paso {currentStep + 1} de {totalSteps}
                        </p>
                      </div>

                      {currentFields.map((field) => {
                        if (!isFieldVisible(field)) return null

                        return (
                          <FieldRenderer
                            key={field.key}
                            field={field}
                            value={answers[field.key]}
                            onChange={(val) => updateAnswer(field.key, val)}
                            onFocus={() => handleFieldFocus(field.key)}
                            contacts={
                              showContacts === field.key
                                ? contactsCache[detectContactType(field.key) || ''] || []
                                : []
                            }
                            onApplyContact={(contact) => applyContact(contact, field.key)}
                            onDismissContacts={() => setShowContacts(null)}
                          />
                        )
                      })}
                    </div>
                  )}
                </div>

                {/* Navigation Buttons */}
                {!isReviewStep && (
                  <div className="flex items-center justify-between border-t border-[#1E3A5F] px-6 py-4">
                    <Button
                      variant="outline"
                      className="border-[#1E3A5F] text-[#CBD5E1] hover:bg-[#152A4A] hover:text-white"
                      onClick={goPrev}
                      disabled={currentStep === 0}
                    >
                      <ArrowLeft className="mr-1.5 h-4 w-4" />
                      Anterior
                    </Button>
                    <span className="text-xs text-[#475569]">
                      {currentStep + 1} / {totalSteps}
                    </span>
                    <Button
                      className="bg-[#C9A94E] text-[#0A1628] font-semibold hover:bg-[#D4BA6A]"
                      onClick={goNext}
                    >
                      Siguiente
                      <ArrowRight className="ml-1.5 h-4 w-4" />
                    </Button>
                  </div>
                )}
                {isReviewStep && (
                  <div className="flex items-center justify-between border-t border-[#1E3A5F] px-6 py-4">
                    <Button
                      variant="outline"
                      className="border-[#1E3A5F] text-[#CBD5E1] hover:bg-[#152A4A] hover:text-white"
                      onClick={goPrev}
                    >
                      <ArrowLeft className="mr-1.5 h-4 w-4" />
                      Anterior
                    </Button>
                    {isVisitor ? (
                      <Button
                        variant="outline"
                        className="border-white/10 text-white/50 hover:bg-white/5"
                        onClick={exitVisitorMode}
                      >
                        Volver al catalogo
                      </Button>
                    ) : (
                      <Button
                        variant="outline"
                        className="border-[#C9A94E]/30 text-[#C9A94E] hover:bg-[#C9A94E]/10"
                        onClick={saveDraft}
                        disabled={saving}
                      >
                        <Save className="mr-1.5 h-3.5 w-3.5" />
                        {saving ? 'Guardando...' : 'Guardar borrador'}
                      </Button>
                    )}
                  </div>
                )}
              </div>
            </ResizablePanel>

            {/* ---- Handle ---- */}
            <ResizableHandle withHandle className="bg-[#1E3A5F] hover:bg-[#C9A94E]/50 transition-colors" />

            {/* =============== RIGHT PANEL - PREVIEW =============== */}
            <ResizablePanel defaultSize={45} minSize={25}>
              <div className="flex h-full flex-col bg-[#0F1F38]">
                {/* Preview header */}
                <div className="flex items-center justify-between border-b border-[#1E3A5F] px-5 py-3">
                  <div className="flex items-center gap-2">
                    <Eye className="h-4 w-4 text-[#C9A94E]" />
                    <span className="text-sm font-medium text-[#CBD5E1]">Vista Previa</span>
                  </div>
                  <Badge variant="outline" className="border-[#1E3A5F] text-[10px] text-[#475569]">
                    Actualización en tiempo real
                  </Badge>
                </div>

                {/* Document preview */}
                <div
                  ref={previewRef}
                  className="flex-1 overflow-y-auto scrollbar-thin p-6"
                  onContextMenu={handlePreviewContextMenu}
                  onCopy={handlePreviewCopy}
                >
                  <div className="mx-auto max-w-[650px] rounded-lg bg-white p-10 shadow-2xl shadow-black/30 relative select-none">
                    {/* Watermark */}
                    <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-lg">
                      <div
                        className="absolute -left-[40%] -top-[20%] w-[200%] -rotate-45 text-[80px] font-bold text-gray-300/30 whitespace-nowrap"
                        style={{ lineHeight: '1.2' }}
                      >
                        Documento Borrador&nbsp;&nbsp;&nbsp;Documento Borrador&nbsp;&nbsp;&nbsp;Documento Borrador
                      </div>
                      <div
                        className="absolute -left-[40%] top-[15%] w-[200%] -rotate-45 text-[80px] font-bold text-gray-300/30 whitespace-nowrap"
                        style={{ lineHeight: '1.2' }}
                      >
                        &nbsp;&nbsp;&nbsp;Documento Borrador&nbsp;&nbsp;&nbsp;Documento Borrador&nbsp;&nbsp;&nbsp;Documento Borrador&nbsp;&nbsp;&nbsp;
                      </div>
                    </div>
                    {/* Document title */}
                    <h1 className="mb-6 text-center font-serif-doc text-xl font-bold text-[#0A1628] leading-tight">
                      {template.name.toUpperCase()}
                    </h1>

                    {/* Document body */}
                    <div
                      className="font-serif-doc text-sm leading-relaxed text-[#1a1a1a] [&_p]:mb-3 [&_p]:text-justify"
                      dangerouslySetInnerHTML={{
                        __html: formatPreviewContent(previewContent),
                      }}
                    />
                  </div>
                </div>
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
      </div>

      {/* ---- WhatsApp Modal (visitor) ---- */}
      {showWhatsAppModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-md animate-fade-in-up rounded-2xl border border-white/10 bg-[#0F1D32] p-6 shadow-2xl">
            <div className="mb-6 text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366]/15">
                <MessageCircle className="h-7 w-7 text-[#25D366]" />
              </div>
              <h2 className="text-lg font-bold text-white">Enviar solicitud por WhatsApp</h2>
              <p className="mt-2 text-sm text-white/50">
                Ingresa tu numero de telefono para enviar la solicitud del documento
                <span className="font-semibold text-[#C9A94E]"> {template?.name}</span>
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <Label className="mb-1.5 block text-xs font-medium text-[#CBD5E1]">
                  Tu numero de telefono
                </Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30" />
                  <Input
                    type="tel"
                    placeholder="Ej: 300 123 4567"
                    value={visitorPhone}
                    onChange={(e) => setVisitorPhone(e.target.value)}
                    className="h-11 border-white/10 bg-[#0A1628] pl-10 text-white placeholder:text-white/30 focus-visible:border-[#25D366]/40 focus-visible:ring-[#25D366]/20"
                  />
                </div>
              </div>

              <Button
                className="w-full bg-[#25D366] text-white font-semibold hover:bg-[#20BD5A]"
                size="lg"
                onClick={sendWhatsApp}
                disabled={!visitorPhone.trim()}
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                Enviar por WhatsApp
              </Button>

              <button
                onClick={() => setShowWhatsAppModal(false)}
                className="w-full text-center text-xs text-white/40 transition-colors hover:text-white/60"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </TooltipProvider>
  )
}

/* -------------------------------------------------------------------------- */
/*  Field Renderer                                                           */
/* -------------------------------------------------------------------------- */

interface FieldRendererProps {
  field: WizardField
  value: string | number | boolean | undefined
  onChange: (value: string | number | boolean) => void
  onFocus: () => void
  contacts: Contact[]
  onApplyContact: (contact: Contact) => void
  onDismissContacts: () => void
}

function FieldRenderer({
  field,
  value,
  onChange,
  onFocus,
  contacts,
  onApplyContact,
  onDismissContacts,
}: FieldRendererProps) {
  const fieldRef = useRef<HTMLDivElement>(null)

  // Close contacts dropdown on outside click
  useEffect(() => {
    if (contacts.length === 0) return
    function handleClick(e: MouseEvent) {
      if (fieldRef.current && !fieldRef.current.contains(e.target as Node)) {
        onDismissContacts()
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [contacts.length, onDismissContacts])

  const labelElement = (
    <div className="mb-1.5 flex items-center gap-1.5">
      <Label className="text-xs font-medium text-[#CBD5E1]">{field.label}</Label>
      {field.tooltip && (
        <Tooltip>
          <TooltipTrigger asChild>
            <button type="button" className="text-[#475569] hover:text-[#C9A94E] transition-colors">
              <Info className="h-3.5 w-3.5" />
            </button>
          </TooltipTrigger>
          <TooltipContent
            side="right"
            className="max-w-[280px] border-[#1E3A5F] bg-[#152A4A] text-[#CBD5E1] text-xs shadow-xl"
          >
            <p className="leading-relaxed">{field.tooltip}</p>
          </TooltipContent>
        </Tooltip>
      )}
    </div>
  )

  return (
    <div ref={fieldRef} className="relative animate-fade-in-up">
      {labelElement}

      {/* Contact autocomplete dropdown */}
      {contacts.length > 0 && (
        <div className="absolute bottom-full left-0 right-0 mb-1 z-50 rounded-lg border border-[#C9A94E]/30 bg-[#152A4A] shadow-xl animate-fade-in-up">
          <div className="px-3 py-1.5 text-[10px] font-medium text-[#C9A94E] uppercase tracking-wider">
            Contactos guardados
          </div>
          {contacts.slice(0, 5).map((contact) => (
            <button
              key={contact.id}
              type="button"
              className="flex w-full items-center gap-3 px-3 py-2 text-left text-xs text-[#CBD5E1] hover:bg-[#1E3A5F] transition-colors first:rounded-t-lg last:rounded-b-lg"
              onClick={() => onApplyContact(contact)}
            >
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#C9A94E]/10 text-[#C9A94E]">
                {contact.name.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">{contact.name}</p>
                <p className="text-[10px] text-[#475569] truncate">
                  {[contact.documentType, contact.documentNumber].filter(Boolean).join(': ') ||
                    contact.companyName ||
                    ''}
                </p>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Field input */}
      {field.type === 'text' && (
        <Input
          value={String(value ?? '')}
          onChange={(e) => onChange(e.target.value)}
          onFocus={onFocus}
          placeholder={field.label}
          className="border-[#1E3A5F] bg-[#0F1F38] text-white placeholder:text-[#475569] focus:border-[#C9A94E] focus:ring-[#C9A94E]/20 h-10 text-sm"
        />
      )}

      {field.type === 'number' && (
        <Input
          type="number"
          value={value !== undefined ? String(value) : ''}
          onChange={(e) => onChange(e.target.value === '' ? '' : Number(e.target.value))}
          placeholder={field.label}
          className="border-[#1E3A5F] bg-[#0F1F38] text-white placeholder:text-[#475569] focus:border-[#C9A94E] focus:ring-[#C9A94E]/20 h-10 text-sm"
        />
      )}

      {field.type === 'date' && (
        <Input
          type="date"
          value={String(value ?? '')}
          onChange={(e) => onChange(e.target.value)}
          className="border-[#1E3A5F] bg-[#0F1F38] text-white placeholder:text-[#475569] focus:border-[#C9A94E] focus:ring-[#C9A94E]/20 h-10 text-sm [color-scheme:dark]"
        />
      )}

      {field.type === 'textarea' && (
        <Textarea
          value={String(value ?? '')}
          onChange={(e) => onChange(e.target.value)}
          placeholder={field.label}
          rows={3}
          className="border-[#1E3A5F] bg-[#0F1F38] text-white placeholder:text-[#475569] focus:border-[#C9A94E] focus:ring-[#C9A94E]/20 text-sm resize-none"
        />
      )}

      {field.type === 'select' && field.options && (
        <Select
          value={value !== undefined ? String(value) : undefined}
          onValueChange={(val) => onChange(val)}
        >
          <SelectTrigger className="border-[#1E3A5F] bg-[#0F1F38] text-white focus:border-[#C9A94E] focus:ring-[#C9A94E]/20 h-10 text-sm">
            <SelectValue placeholder={`Seleccionar ${field.label.toLowerCase()}`} />
          </SelectTrigger>
          <SelectContent className="border-[#1E3A5F] bg-[#152A4A] text-[#CBD5E1]">
            {field.options.map((opt) => (
              <SelectItem key={opt} value={opt} className="text-sm focus:bg-[#1E3A5F] focus:text-white">
                {opt}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}

      {field.type === 'boolean' && (
        <RadioGroup
          value={value !== undefined ? String(value) : undefined}
          onValueChange={(val) => onChange(val === 'true')}
          className="flex gap-4"
        >
          <div className="flex items-center gap-2">
            <RadioGroupItem
              value="true"
              id={`${field.key}-yes`}
              className="border-[#1E3A5F] text-[#C9A94E] data-[state=checked]:border-[#C9A94E] data-[state=checked]:bg-[#C9A94E]"
            />
            <Label
              htmlFor={`${field.key}-yes`}
              className="text-sm text-[#CBD5E1] cursor-pointer"
            >
              Sí
            </Label>
          </div>
          <div className="flex items-center gap-2">
            <RadioGroupItem
              value="false"
              id={`${field.key}-no`}
              className="border-[#1E3A5F] text-[#C9A94E] data-[state=checked]:border-[#C9A94E] data-[state=checked]:bg-[#C9A94E]"
            />
            <Label
              htmlFor={`${field.key}-no`}
              className="text-sm text-[#CBD5E1] cursor-pointer"
            >
              No
            </Label>
          </div>
        </RadioGroup>
      )}
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/*  Preview formatting                                                       */
/* -------------------------------------------------------------------------- */

function formatPreviewContent(content: string): string {
  // Replace newlines with paragraph breaks
  let html = content
    .split('\n')
    .filter((line) => line.trim() !== '')
    .map((line) => {
      // Highlight unresolved {{variables}} in gold
      const highlighted = line.replace(
        /\{\{([^}]+)\}\}/g,
        '<span class="inline-block rounded bg-[#C9A94E]/10 px-1.5 py-0.5 text-[#C9A94E] font-semibold text-xs mx-0.5">{{$1}}</span>'
      )
      return `<p>${highlighted}</p>`
    })
    .join('')
  return html
}
