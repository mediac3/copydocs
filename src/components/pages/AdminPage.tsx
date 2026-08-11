'use client'

import { useEffect, useState, useCallback, useRef } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import {
  Users,
  FileText,
  BookOpen,
  Layout,
  Settings,
  Coins,
  MessageSquare,
  Check,
  X,
  Edit,
  Trash2,
  Plus,
  BarChart3,
  TrendingUp,
  Eye,
  MoreVertical,
  AlertCircle,
  Download,
  Upload,
  GripVertical,
  ChevronDown,
  ChevronRight,
  Trash2 as TrashIcon,
  CalendarDays,
  Hash,
  Type,
  AlignLeft,
  List,
  ToggleLeft,
  Newspaper,
  ImageOff,
  Brain,
  ImageIcon,
} from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select'
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from '@/components/ui/alert-dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { toast } from 'sonner'
import { useAppStore, type Page } from '@/store/app-store'
import dynamic from 'next/dynamic'

const TinyMCEEditor = dynamic(() => import('@/components/ui/tinymce-editor'), { ssr: false })

/* -------------------------------------------------------------------------- */
/*  Types                                                                    */
/* -------------------------------------------------------------------------- */

interface AdminStats {
  totalUsers: number
  totalDocuments: number
  activeTemplates: number
  totalRevenue: number
  documentsByMonth: Array<{ month: string; count: number }>
  topTemplates: Array<{ id: string; name: string; category: string; count: number }>
}

interface Template {
  id: string
  name: string
  category: string
  legalArea: string
  status: string
  price: number
  documentCount: number
  description?: string
  audience?: string
  baseContent?: string
  headerContent?: string
  footerContent?: string
  wizardConfig?: string
}

interface Clause {
  id: string
  title: string
  content: string
  legalArea: string
}

interface AdminUser {
  id: string
  name: string
  username: string
  email: string
  role: string
  status: string
  credits: number
  documentCount: number
  lastAccess: string
}

interface DocumentRequest {
  id: string
  title: string
  description: string
  user: string
  date: string
  status: 'pendiente' | 'aprobada' | 'rechazada' | 'en_desarrollo'
  notes?: string
}

interface VisitorDocument {
  id: string
  title: string
  visitorPhone: string | null
  visitorName: string | null
  status: string
  createdAt: string
  template?: { name: string; category: string }
}

interface CreditUser {
  id: string
  name: string
  username: string
  email: string
  phone: string
  status: string
  credits: number
}

interface CreditTransaction {
  id: string
  amount: number
  type: string
  description: string | null
  createdAt: string
}

/* ---- Media helper: stores type + dimensions alongside base64 data ---- */
interface MediaContent {
  type: 'text' | 'image'
  text?: string
  dataUrl?: string
  width?: number
  height?: number
}

function parseMedia(raw: string | null | undefined): MediaContent {
  if (!raw) return { type: 'text', text: '' }
  if (raw.startsWith('data:image')) {
    try {
      const parsed = JSON.parse(raw)
      if (parsed && parsed.type === 'image' && parsed.dataUrl) return parsed
    } catch { /* not JSON, treat as raw base64 */ }
    return { type: 'image', dataUrl: raw, width: 468, height: 60 }
  }
  return { type: 'text', text: raw }
}

function encodeMedia(m: MediaContent): string {
  if (m.type === 'text') return m.text || ''
  return JSON.stringify({ type: 'image', dataUrl: m.dataUrl, width: m.width, height: m.height })
}

function isMediaImage(m: MediaContent): boolean {
  return m.type === 'image' && !!m.dataUrl
}

interface WizardFieldDef {
  key: string
  label: string
  type: 'text' | 'number' | 'date' | 'textarea' | 'select' | 'boolean'
  options?: string[]
  tooltip?: string
  condition?: { field: string; value: boolean | string | number }
}

interface WizardStepDef {
  title: string
  fields: WizardFieldDef[]
}

interface NewTemplateForm {
  name: string
  description: string
  category: string
  legalArea: string
  audience: string
  price: string
  baseContent: string
  headerContent: string
  footerContent: string
  status: string
  wizardConfig: WizardStepDef[]
}

interface NewClauseForm {
  title: string
  content: string
  legalArea: string
}

/* -------------------------------------------------------------------------- */
/*  Helpers                                                                  */
/* -------------------------------------------------------------------------- */

function formatCurrency(value: number): string {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
  }).format(value)
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('es-CO', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

function formatDateTime(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('es-CO', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

/* -------------------------------------------------------------------------- */
/*  Status Badges                                                            */
/* -------------------------------------------------------------------------- */

const TEMPLATE_STATUS_CONFIG: Record<string, { label: string; className: string }> = {
  draft: { label: 'Borrador', className: 'bg-yellow-500/15 text-yellow-400 border-yellow-500/25' },
  in_review: { label: 'En revisión', className: 'bg-blue-500/15 text-blue-400 border-blue-500/25' },
  published: { label: 'Publicado', className: 'bg-green-500/15 text-green-400 border-green-500/25' },
  disabled: { label: 'Desactivado', className: 'bg-gray-500/15 text-gray-400 border-gray-500/25' },
}

const REQUEST_STATUS_CONFIG: Record<string, { label: string; className: string }> = {
  pendiente: { label: 'Pendiente', className: 'bg-yellow-500/15 text-yellow-400 border-yellow-500/25' },
  aprobada: { label: 'Aprobada', className: 'bg-green-500/15 text-green-400 border-green-500/25' },
  rechazada: { label: 'Rechazada', className: 'bg-red-500/15 text-red-400 border-red-500/25' },
  en_desarrollo: { label: 'En desarrollo', className: 'bg-blue-500/15 text-blue-400 border-blue-500/25' },
}

const ROLE_BADGE_CONFIG: Record<string, string> = {
  admin: 'bg-[#C9A94E]/15 text-[#C9A94E] border-[#C9A94E]/25',
  user: 'bg-blue-500/15 text-blue-400 border-blue-500/25',
  editor: 'bg-purple-500/15 text-purple-400 border-purple-500/25',
}

const USER_STATUS_CONFIG: Record<string, { label: string; className: string }> = {
  active: { label: 'Activo', className: 'bg-green-500/15 text-green-400 border-green-500/25' },
  suspended: { label: 'Suspendido', className: 'bg-red-500/15 text-red-400 border-red-500/25' },
  inactive: { label: 'Inactivo', className: 'bg-gray-500/15 text-gray-400 border-gray-500/25' },
}

function StatusBadge({ status, config }: { status: string; config: Record<string, { label: string; className: string }> }) {
  const c = config[status] || { label: status, className: 'bg-gray-500/15 text-gray-400 border-gray-500/25' }
  return (
    <Badge variant="outline" className={`${c.className} hover:${c.className}`}>
      {c.label}
    </Badge>
  )
}

/* -------------------------------------------------------------------------- */
/*  Chart Tooltip                                                            */
/* -------------------------------------------------------------------------- */

function ChartTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number; name: string; color: string }>; label?: string }) {
  if (!active || !payload?.length) return null
  return (
    <div className="rounded-lg border border-[#C9A94E]/20 bg-[#0A1628]/95 px-3 py-2 shadow-xl backdrop-blur-sm">
      <p className="mb-1 text-xs font-semibold text-white/80 capitalize">{label}</p>
      {payload.map((p, i) => (
        <div key={i} className="flex items-center gap-2 text-xs">
          <span className="inline-block h-2 w-2 rounded-full" style={{ backgroundColor: p.color }} />
          <span className="text-white/60">{p.name}:</span>
          <span className="font-medium text-white">{p.value}</span>
        </div>
      ))}
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/*  Empty state                                                              */
/* -------------------------------------------------------------------------- */

function EmptyState({ icon: Icon, message }: { icon: React.ElementType; message: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/5">
        <Icon className="h-6 w-6 text-white/25" />
      </div>
      <p className="text-sm text-white/40">{message}</p>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/*  Stat Card                                                                */
/* -------------------------------------------------------------------------- */

function AdminStatCard({ label, value, icon, accentBg, accentText, accentBorder, sub }: {
  label: string
  value: string | number
  icon: React.ReactNode
  accentBg: string
  accentText: string
  accentBorder: string
  sub?: string
}) {
  return (
    <Card className={`border ${accentBorder} bg-[#0F1D32]/80 backdrop-blur-sm transition-shadow hover:shadow-lg hover:shadow-[#C9A94E]/5`}>
      <CardContent className="flex items-center gap-4 p-5">
        <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg ${accentBg} ${accentText}`}>
          {icon}
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-2xl font-bold tabular-nums text-white">{value}</p>
          <p className="truncate text-xs text-white/50">{label}</p>
        </div>
        {sub && <p className="text-xs text-white/30">{sub}</p>}
      </CardContent>
    </Card>
  )
}

/* -------------------------------------------------------------------------- */
/*  AdminPage                                                                */
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/*  Media Field Editor (Header / Footer with Image+Dimensions)                 */
/* -------------------------------------------------------------------------- */

function MediaFieldEditor({
  label, rawValue, onChange, defaultW, defaultH, maxH, hint
}: {
  label: string
  rawValue: string
  onChange: (encoded: string) => void
  defaultW: number
  defaultH: number
  maxH: number
  hint: string
}) {
  const [mode, setMode] = useState<'text' | 'image'>(() => {
    if (!rawValue) return 'text'
    if (rawValue.startsWith('data:image')) return 'image'
    try { const p = JSON.parse(rawValue); if (p?.type === 'image') return 'image' } catch {}
    return 'text'
  })
  const [imgData, setImgData] = useState<string>('')
  const [imgW, setImgW] = useState(defaultW)
  const [imgH, setImgH] = useState(defaultH)
  const [textVal, setTextVal] = useState('')
  const initialized = useRef(false)

  // Init from rawValue on mount
  useEffect(() => {
    if (initialized.current) return
    initialized.current = true
    if (!rawValue) return
    if (rawValue.startsWith('data:image')) {
      setImgData(rawValue)
    } else {
      try {
        const p = JSON.parse(rawValue)
        if (p?.type === 'image') {
          setImgData(p.dataUrl || '')
          if (p.width) setImgW(p.width)
          if (p.height) setImgH(p.height)
        } else {
          setTextVal(typeof p?.text === 'string' ? p.text : rawValue)
        }
      } catch {
        setTextVal(rawValue)
      }
    }
  }, [])

  const switchMode = (t: 'text' | 'image') => {
    setMode(t)
    if (t === 'text') {
      setTextVal('')
      onChange('')
    } else {
      setImgData('')
      setImgW(defaultW)
      setImgH(defaultH)
      onChange(JSON.stringify({ type: 'image', dataUrl: '', width: defaultW, height: defaultH }))
    }
  }

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (file.size > 2 * 1024 * 1024) { toast.error('La imagen no puede superar 2 MB'); return }
    const reader = new FileReader()
    reader.onload = () => {
      const dataUrl = reader.result as string
      const img = new window.Image()
      img.onload = () => {
        const ratio = img.width / img.height
        let h = maxH
        let w = Math.round(h * ratio)
        if (w > 468) { w = 468; h = Math.round(w / ratio) }
        setImgData(dataUrl)
        setImgW(w)
        setImgH(h)
        onChange(JSON.stringify({ type: 'image', dataUrl, width: w, height: h }))
      }
      img.onerror = () => {
        setImgData(dataUrl)
        setImgW(defaultW)
        setImgH(defaultH)
        onChange(JSON.stringify({ type: 'image', dataUrl, width: defaultW, height: defaultH }))
      }
      img.src = dataUrl
    }
    reader.readAsDataURL(file)
    e.target.value = ''
  }

  const removeImage = () => {
    setImgData('')
    setImgW(defaultW)
    setImgH(defaultH)
    onChange(JSON.stringify({ type: 'image', dataUrl: '', width: defaultW, height: defaultH }))
  }

  return (
    <div className="grid gap-2">
      <Label className="text-white/70">{label}</Label>
      <div className="flex gap-1 mb-1">
        {(['text', 'image'] as const).map(t => (
          <button
            key={t}
            type="button"
            onClick={() => switchMode(t)}
            className={`flex-1 rounded-md px-3 py-1.5 text-[11px] font-medium transition-colors ${
              mode === t
                ? 'bg-[#28A745]/20 text-[#28A745] border border-[#28A745]/30'
                : 'bg-white/5 text-white/40 border border-white/10 hover:bg-white/10'
            }`}
          >
            {t === 'text' ? 'Texto' : 'Imagen'}
          </button>
        ))}
      </div>
      {mode === 'text' ? (
        <Textarea
          value={textVal}
          onChange={(e) => { setTextVal(e.target.value); onChange(e.target.value) }}
          placeholder={`Texto del ${label.toLowerCase()}...`}
          rows={3}
          className="border-white/10 bg-white/5 text-white placeholder:text-white/30"
        />
      ) : (
        <div className="space-y-2">
          {imgData && (
            <div className="flex items-center justify-center rounded-lg border border-dashed border-white/15 bg-white/[0.02] p-3">
              <img src={imgData} alt="Preview" className="max-h-24 max-w-full object-contain rounded" />
            </div>
          )}
          <label className="flex cursor-pointer items-center justify-center gap-2 rounded-md border border-white/10 bg-white/5 px-3 py-2.5 text-xs text-white/50 hover:bg-white/10 hover:text-white/70 transition-colors">
            <Upload className="h-3.5 w-3.5" />
            {imgData ? 'Cambiar imagen' : 'Subir imagen (PNG, JPG, WebP)'}
            <input type="file" accept="image/png,image/jpeg,image/webp" className="hidden" onChange={handleFile} />
          </label>
          <div className="grid grid-cols-2 gap-2">
            <div className="grid gap-1">
              <span className="text-[9px] uppercase tracking-wider text-white/25">Ancho (px)</span>
              <Input
                type="number"
                value={imgW}
                onChange={(e) => {
                  const w = parseInt(e.target.value) || defaultW
                  setImgW(w)
                  onChange(JSON.stringify({ type: 'image', dataUrl: imgData, width: w, height: imgH }))
                }}
                className="h-7 border-white/10 bg-white/5 text-white text-xs"
              />
            </div>
            <div className="grid gap-1">
              <span className="text-[9px] uppercase tracking-wider text-white/25">Alto (px)</span>
              <Input
                type="number"
                value={imgH}
                onChange={(e) => {
                  const h = parseInt(e.target.value) || defaultH
                  setImgH(h)
                  onChange(JSON.stringify({ type: 'image', dataUrl: imgData, width: imgW, height: h }))
                }}
                className="h-7 border-white/10 bg-white/5 text-white text-xs"
              />
            </div>
          </div>
          <p className="text-[10px] text-white/25 text-center">{hint}. Max 2 MB.</p>
          {imgData && (
            <button
              type="button"
              onClick={removeImage}
              className="w-full text-center text-[11px] text-red-400/60 hover:text-red-400 transition-colors"
            >
              Eliminar imagen
            </button>
          )}
        </div>
      )}
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/*  Wizard Step Editor Component                                                */
/* -------------------------------------------------------------------------- */

const FIELD_TYPE_OPTIONS: Array<{ value: WizardFieldDef['type']; label: string; icon: React.ElementType }> = [
  { value: 'text', label: 'Texto', icon: Type },
  { value: 'number', label: 'Número', icon: Hash },
  { value: 'date', label: 'Fecha', icon: CalendarDays },
  { value: 'textarea', label: 'Área de texto', icon: AlignLeft },
  { value: 'select', label: 'Selección', icon: List },
  { value: 'boolean', label: 'Sí/No', icon: ToggleLeft },
]

function WizardStepEditor({
  step, stepIndex, allSteps, onChange, onRemove
}: {
  step: WizardStepDef
  stepIndex: number
  allSteps: WizardStepDef[]
  onChange: (updated: WizardStepDef) => void
  onRemove: () => void
}) {
  const [expanded, setExpanded] = useState(true)

  const updateField = (fi: number, patch: Partial<WizardFieldDef>) => {
    const fields = step.fields.map((f, i) => i === fi ? { ...f, ...patch } : f)
    onChange({ ...step, fields })
  }

  const removeField = (fi: number) => {
    onChange({ ...step, fields: step.fields.filter((_, i) => i !== fi) })
  }

  const addField = () => {
    onChange({
      ...step,
      fields: [...step.fields, { key: '', label: '', type: 'text' }]
    })
  }

  /* Collect boolean fields for condition dropdown */
  const booleanFields = allSteps.flatMap((s, si) =>
    s.fields.filter(f => f.type === 'boolean').map(f => ({ key: f.key, label: `[Paso ${si + 1}] ${f.label}`, value: true }))
  )

  return (
    <div className="rounded-lg border border-white/10 bg-white/[0.02] overflow-hidden">
      <div
        className="flex items-center gap-2 px-3 py-2.5 cursor-pointer hover:bg-white/[0.03] transition-colors"
        onClick={() => setExpanded(!expanded)}
      >
        {expanded ? <ChevronDown className="h-3.5 w-3.5 text-white/30" /> : <ChevronRight className="h-3.5 w-3.5 text-white/30" />}
        <Input
          value={step.title}
          onChange={(e) => onChange({ ...step, title: e.target.value })}
          onClick={(e) => e.stopPropagation()}
          className="h-6 border-0 bg-transparent p-0 text-sm font-medium text-white focus-visible:ring-0"
          placeholder={`Paso ${stepIndex + 1}`}
        />
        <Badge variant="outline" className="ml-auto border-white/10 text-white/30 text-[10px]">
          {step.fields.length} campo{step.fields.length !== 1 ? 's' : ''}
        </Badge>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="h-6 w-6 p-0 text-white/20 hover:text-red-400 hover:bg-red-400/10"
          onClick={(e) => { e.stopPropagation(); onRemove() }}
        >
          <X className="h-3.5 w-3.5" />
        </Button>
      </div>

      {expanded && (
        <div className="border-t border-white/5 p-3 space-y-2">
          {step.fields.length === 0 && (
            <p className="text-center text-[11px] text-white/20 py-3">Sin campos. Haz clic en &quot;Agregar campo&quot;.</p>
          )}
          {step.fields.map((field, fi) => (
            <div key={fi} className="grid gap-2 rounded-md border border-white/5 bg-white/[0.02] p-2.5 sm:grid-cols-[1fr_1fr_auto_auto_auto]">
              <div className="flex flex-col gap-1">
                <span className="text-[9px] uppercase tracking-wider text-white/20">Variable (key)</span>
                <Input
                  value={field.key}
                  onChange={(e) => updateField(fi, { key: e.target.value.replace(/[^a-zA-Z0-9_]/g, '').toLowerCase() })}
                  placeholder="nombre_variable"
                  className="h-7 border-white/10 bg-white/5 text-white text-xs placeholder:text-white/20"
                />
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[9px] uppercase tracking-wider text-white/20">Etiqueta</span>
                <Input
                  value={field.label}
                  onChange={(e) => updateField(fi, { label: e.target.value })}
                  placeholder="Texto visible"
                  className="h-7 border-white/10 bg-white/5 text-white text-xs placeholder:text-white/20"
                />
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[9px] uppercase tracking-wider text-white/20">Tipo</span>
                <Select
                  value={field.type}
                  onValueChange={(v) => updateField(fi, { type: v as WizardFieldDef['type'], options: v === 'select' ? field.options || [''] : undefined })}
                >
                  <SelectTrigger className="h-7 w-[110px] border-white/10 bg-white/5 text-white text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="border-white/10 bg-[#0F1D32]">
                    {FIELD_TYPE_OPTIONS.map(ft => (
                      <SelectItem key={ft.value} value={ft.value} className="text-white focus:bg-white/5 focus:text-white text-xs">
                        {ft.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[9px] uppercase tracking-wider text-white/20">Cond.</span>
                <Select
                  value={field.condition?.field || '_none'}
                  onValueChange={(v) => {
                    if (v === '_none') {
                      const { condition, ...rest } = field
                      const cleaned = { ...rest } as WizardFieldDef
                      const fields = step.fields.map((f, i) => i === fi ? cleaned : f)
                      onChange({ ...step, fields })
                    } else {
                      const bf = booleanFields.find(b => b.key === v)
                      updateField(fi, { condition: { field: v, value: bf?.value ?? true } })
                    }
                  }}
                >
                  <SelectTrigger className="h-7 w-[110px] border-white/10 bg-white/5 text-white/20 text-xs">
                    <SelectValue placeholder="Ninguna" />
                  </SelectTrigger>
                  <SelectContent className="border-white/10 bg-[#0F1D32]">
                    <SelectItem value="_none" className="text-white/50 text-xs">Ninguna</SelectItem>
                    {booleanFields.map(bf => (
                      <SelectItem key={bf.key} value={bf.key} className="text-white focus:bg-white/5 focus:text-white text-xs">
                        {bf.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-end pb-0.5">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="h-7 w-7 p-0 text-white/20 hover:text-red-400 hover:bg-red-400/10"
                  onClick={() => removeField(fi)}
                >
                  <TrashIcon className="h-3.5 w-3.5" />
                </Button>
              </div>
              {/* Options editor for select type */}
              {field.type === 'select' && (
                <div className="sm:col-span-5 mt-1">
                  <span className="text-[9px] uppercase tracking-wider text-white/20">Opciones (separadas por coma)</span>
                  <Input
                    value={(field.options || []).join(', ')}
                    onChange={(e) => updateField(fi, { options: e.target.value.split(',').map(o => o.trim()).filter(Boolean) })}
                    placeholder="Opción 1, Opción 2, Opción 3"
                    className="h-7 mt-0.5 border-white/10 bg-white/5 text-white text-xs placeholder:text-white/20"
                  />
                </div>
              )}
              {/* Tooltip */}
              <div className="sm:col-span-5">
                <Input
                  value={field.tooltip || ''}
                  onChange={(e) => updateField(fi, { tooltip: e.target.value || undefined })}
                  placeholder="Tooltip o ayuda (opcional)"
                  className="h-6 border-0 bg-transparent text-white/30 text-[11px] placeholder:text-white/15 focus-visible:ring-0"
                />
              </div>
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="w-full border-dashed border-white/10 bg-transparent text-white/40 hover:bg-white/5 hover:text-white/70 text-xs"
            onClick={addField}
          >
            <Plus className="mr-1 h-3 w-3" />
            Agregar campo
          </Button>
        </div>
      )}
    </div>
  )
}

/* ========================================================================== */
/*  Terms Tab Component                                                     */
/* ========================================================================== */

function InlineTerms() {
  const { authHeaders } = useAppStore() as { authHeaders: () => Record<string, string> }
  const [terms, setTerms] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    setLoading(true)
    fetch('/api/settings').then(r => r.json()).then(data => {
      setTerms(data.terms_and_conditions || '')
    }).catch(() => {}).finally(() => setLoading(false))
  }, [])

  const handleSave = async () => {
    setSaving(true)
    try {
      const res = await fetch('/api/settings', {
        method: 'PUT',
        headers: authHeaders(),
        body: JSON.stringify({ terms_and_conditions: terms }),
      })
      if (res.ok) toast.success('Términos y condiciones actualizados')
      else toast.error('Error al guardar')
    } catch { toast.error('Error de conexión') }
    finally { setSaving(false) }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-white">Términos y Condiciones</h2>
        <p className="text-xs text-white/40">Configura los términos que los visitantes deben aceptar antes de generar un documento.</p>
      </div>
      <Card className="border-white/5 bg-[#0F1D32]/80 backdrop-blur-sm">
        <CardContent className="p-6">
          {loading ? (
            <div className="h-64 animate-pulse rounded-lg bg-white/[0.04]" />
          ) : (
            <>
              <div className="grid gap-2 mb-4">
                <Label className="text-white/70">Contenido de Términos y Condiciones</Label>
                <p className="text-xs text-white/30">Este texto se mostrará a los visitantes antes de iniciar un documento. Usa texto plano.</p>
              </div>
              <Textarea
                value={terms}
                onChange={(e) => setTerms(e.target.value)}
                placeholder="Escribe aquí los términos y condiciones del servicio..."
                rows={16}
                className="border-white/10 bg-white/5 text-white placeholder:text-white/30 text-sm leading-relaxed"
              />
            </>
          )}
        </CardContent>
      </Card>
      <div className="flex justify-end">
        <Button onClick={handleSave} disabled={saving} className="bg-[#C9A94E] text-[#0A1628] hover:bg-[#D4B965] font-semibold min-w-[120px]">
          {saving ? 'Guardando...' : 'Guardar Términos'}
        </Button>
      </div>
    </div>
  )
}

const PAGE_TO_TAB: Record<string, string> = {
  admin: 'resumen',
  'admin-templates': 'plantillas',
  'admin-clauses': 'clausulas',
  'admin-users': 'usuarios',
  'admin-requests': 'solicitudes',
  'admin-pricing': 'precios',
  'admin-terminos': 'terminos',
  'admin-publications': 'publicaciones',
}

export default function AdminPage() {
  const { user, currentPage, setCurrentPage } = useAppStore()
  const [activeTab, setActiveTab] = useState(PAGE_TO_TAB[currentPage] || 'resumen')

  // Sync sidebar navigation with internal tabs
  useEffect(() => {
    const mapped = PAGE_TO_TAB[currentPage]
    if (mapped && mapped !== activeTab) {
      setActiveTab(mapped)
    }
  }, [currentPage])

  // Update store page when tab changes
  const handleTabChange = (value: string) => {
    setActiveTab(value)
    const pageMap: Record<string, string> = { resumen: 'admin', plantillas: 'admin-templates', clausulas: 'admin-clauses', usuarios: 'admin-users', solicitudes: 'admin-requests', precios: 'admin-pricing', terminos: 'admin-terminos', publicaciones: 'admin-publications' }
    const page = pageMap[value]
    if (page && page !== currentPage) setCurrentPage(page as Page)
  }

  /* ---- Resumen state ---- */
  const [stats, setStats] = useState<AdminStats | null>(null)
  const [loadingStats, setLoadingStats] = useState(true)

  /* ---- Templates state ---- */
  const [templates, setTemplates] = useState<Template[]>([])
  const [loadingTemplates, setLoadingTemplates] = useState(true)
  const [templateDialogOpen, setTemplateDialogOpen] = useState(false)
  const [editingTemplate, setEditingTemplate] = useState<Template | null>(null)
  const [templateForm, setTemplateForm] = useState<NewTemplateForm>({
    name: '', description: '', category: '', legalArea: '', audience: '',
    price: '', baseContent: '', headerContent: '', footerContent: '', status: 'draft',
    wizardConfig: [],
  })
  const [savingTemplate, setSavingTemplate] = useState(false)

  /* ---- Clauses state ---- */
  const [clauses, setClauses] = useState<Clause[]>([])
  const [loadingClauses, setLoadingClauses] = useState(true)
  const [clauseDialogOpen, setClauseDialogOpen] = useState(false)
  const [editingClause, setEditingClause] = useState<Clause | null>(null)
  const [clauseForm, setClauseForm] = useState<NewClauseForm>({ title: '', content: '', legalArea: '' })
  const [savingClause, setSavingClause] = useState(false)
  const [deleteClauseId, setDeleteClauseId] = useState<string | null>(null)

  /* ---- Users state ---- */
  const [users, setUsers] = useState<AdminUser[]>([])
  const [loadingUsers, setLoadingUsers] = useState(true)

  /* ---- Requests state ---- */
  const [requests, setRequests] = useState<DocumentRequest[]>([])
  const [loadingRequests, setLoadingRequests] = useState(true)
  const [requestNotesId, setRequestNotesId] = useState<string | null>(null)
  const [requestNotes, setRequestNotes] = useState('')

  /* ---- Visitor documents state ---- */
  const [visitorDocs, setVisitorDocs] = useState<VisitorDocument[]>([])
  const [loadingVisitorDocs, setLoadingVisitorDocs] = useState(true)

  /* ---- Credits state ---- */
  const [creditUsers, setCreditUsers] = useState<CreditUser[]>([])
  const [loadingCreditUsers, setLoadingCreditUsers] = useState(true)
  const [selectedCreditUser, setSelectedCreditUser] = useState<CreditUser | null>(null)
  const [creditTransactions, setCreditTransactions] = useState<CreditTransaction[]>([])
  const [loadingCreditTx, setLoadingCreditTx] = useState(false)
  const [addCreditsAmount, setAddCreditsAmount] = useState('')
  const [addCreditsDesc, setAddCreditsDesc] = useState('')
  const [addingCredits, setAddingCredits] = useState(false)
  const [creditDialogOpen, setCreditDialogOpen] = useState(false)

  /* ---- Auth header helper ---- */
  const authHeaders = useCallback(() => ({
    'Content-Type': 'application/json',
    'x-user-id': user?.id || '',
  }), [user?.id])

  /* ========================================================================== */
  /*  DATA FETCHING                                                             */
  /* ========================================================================== */

  const fetchStats = useCallback(async () => {
    setLoadingStats(true)
    try {
      const res = await fetch('/api/admin', { headers: authHeaders() })
      if (res.ok) {
        const data = await res.json()
        const s = data.stats || data
        setStats({
          totalUsers: s.totalUsers ?? 0,
          totalDocuments: s.totalDocuments ?? 0,
          activeTemplates: s.totalTemplates ?? 0,
          totalRevenue: s.totalCredits ?? 0,
          documentsByMonth: s.monthlyStats ?? [],
          topTemplates: s.topTemplates ?? [],
        })
      }
    } catch {
      // keep null state on error
    } finally {
      setLoadingStats(false)
    }
  }, [authHeaders])

  const fetchTemplates = useCallback(async () => {
    setLoadingTemplates(true)
    try {
      const res = await fetch('/api/admin/templates', { headers: authHeaders() })
      if (res.ok) {
        const data = await res.json()
        setTemplates(Array.isArray(data) ? data : data.templates || [])
      }
    } catch {
      // keep empty on error
    } finally {
      setLoadingTemplates(false)
    }
  }, [authHeaders])

  const fetchClauses = useCallback(async () => {
    setLoadingClauses(true)
    try {
      const res = await fetch('/api/admin/clauses', { headers: authHeaders() })
      if (res.ok) {
        const data = await res.json()
        setClauses(Array.isArray(data) ? data : data.clauses || [])
      }
    } catch {
      // keep empty on error
    } finally {
      setLoadingClauses(false)
    }
  }, [authHeaders])

  const fetchUsers = useCallback(async () => {
    setLoadingUsers(true)
    try {
      const res = await fetch('/api/admin/users', { headers: authHeaders() })
      if (res.ok) {
        const data = await res.json()
        setUsers(Array.isArray(data) ? data : data.users || [])
      }
    } catch {
      // keep empty on error
    } finally {
      setLoadingUsers(false)
    }
  }, [authHeaders])

  const fetchRequests = useCallback(async () => {
    setLoadingRequests(true)
    try {
      const res = await fetch('/api/admin/requests', { headers: authHeaders() })
      if (res.ok) {
        const data = await res.json()
        setRequests(Array.isArray(data) ? data : data.requests || [])
      }
    } catch {
      // keep empty on error
    } finally {
      setLoadingRequests(false)
    }
  }, [authHeaders])

  const fetchVisitorDocs = useCallback(async () => {
    setLoadingVisitorDocs(true)
    try {
      const res = await fetch('/api/documents/visitor-list')
      if (res.ok) {
        const data = await res.json()
        setVisitorDocs(Array.isArray(data) ? data : data.documents || [])
      }
    } catch {
      // keep empty on error
    } finally {
      setLoadingVisitorDocs(false)
    }
  }, [])

  const handleExportVisitor = useCallback(async (docId: string, format: 'pdf' | 'docx') => {
    try {
      const res = await fetch(`/api/documents/export?id=${docId}&format=${format}`, {
        headers: { 'x-admin-export': 'copyexpress-admin-export' },
      })
      if (!res.ok) {
        toast.error('Error al exportar')
        return
      }
      const blob = await res.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `documento.${format}`
      a.click()
      URL.revokeObjectURL(url)
    } catch {
      toast.error('Error al exportar')
    }
  }, [])

  const fetchCreditUsers = useCallback(async () => {
    setLoadingCreditUsers(true)
    try {
      const res = await fetch('/api/admin/credits', { headers: authHeaders() })
      if (res.ok) {
        const data = await res.json()
        setCreditUsers(data.users || [])
      }
    } catch {
      // keep empty on error
    } finally {
      setLoadingCreditUsers(false)
    }
  }, [authHeaders])

  const fetchCreditTransactions = useCallback(async (userId: string) => {
    setLoadingCreditTx(true)
    try {
      const res = await fetch(`/api/admin/credits?userId=${userId}`, { headers: authHeaders() })
      if (res.ok) {
        const data = await res.json()
        setCreditTransactions(data.transactions || [])
      }
    } catch {
      // keep empty on error
    } finally {
      setLoadingCreditTx(false)
    }
  }, [authHeaders])

  useEffect(() => {
    fetchStats()
  }, [fetchStats])

  useEffect(() => {
    if (activeTab === 'plantillas') fetchTemplates()
  }, [activeTab, fetchTemplates])

  useEffect(() => {
    if (activeTab === 'clausulas') fetchClauses()
  }, [activeTab, fetchClauses])

  useEffect(() => {
    if (activeTab === 'usuarios') fetchUsers()
  }, [activeTab, fetchUsers])

  useEffect(() => {
    if (activeTab === 'solicitudes') { fetchRequests(); fetchVisitorDocs() }
  }, [activeTab, fetchRequests, fetchVisitorDocs])

  useEffect(() => {
    if (activeTab === 'precios') fetchCreditUsers()
  }, [activeTab, fetchCreditUsers])

  /* ---- Publications state ---- */
  interface PubItem {
    id: string; title: string; description: string; content: string;
    imageUrl: string | null; order: number; active: boolean; createdAt: string;
  }
  const [publications, setPublications] = useState<PubItem[]>([])
  const [loadingPubs, setLoadingPubs] = useState(false)
  const [pubDialogOpen, setPubDialogOpen] = useState(false)
  const [editingPub, setEditingPub] = useState<PubItem | null>(null)
  const [pubForm, setPubForm] = useState({ title: '', description: '', content: '', imageUrl: '', active: true })
  const [deletingPubId, setDeletingPubId] = useState<string | null>(null)

  /* ---- Knowledge Base ---- */
  interface KBItem {
    id: string; title: string; content: string; category: string; active: boolean; createdAt: string
  }
  const [kbEntries, setKbEntries] = useState<KBItem[]>([])
  const [loadingKB, setLoadingKB] = useState(false)
  const [kbDialogOpen, setKbDialogOpen] = useState(false)
  const [editingKB, setEditingKB] = useState<KBItem | null>(null)
  const [kbForm, setKbForm] = useState({ title: '', content: '', category: 'general', active: true })
  const [deletingKBId, setDeletingKBId] = useState<string | null>(null)

  const KB_CATEGORIES = [
    { value: 'general', label: 'General' },
    { value: 'civil', label: 'Derecho Civil' },
    { value: 'laboral', label: 'Derecho Laboral' },
    { value: 'mercantil', label: 'Derecho Mercantil' },
    { value: 'administrativo', label: 'Derecho Administrativo' },
    { value: 'penal', label: 'Derecho Penal' },
    { value: 'familia', label: 'Derecho de Familia' },
    { value: 'inmobiliario', label: 'Derecho Inmobiliario' },
    { value: 'procesal', label: 'Derecho Procesal' },
  ]

  const fetchKB = useCallback(async () => {
    setLoadingKB(true)
    try {
      const res = await fetch('/api/admin/knowledge', { headers: { 'x-admin-export': 'copyexpress-admin-export' } })
      const data = await res.json()
      setKbEntries(Array.isArray(data) ? data : [])
    } catch { setKbEntries([]) }
    finally { setLoadingKB(false) }
  }, [])

  useEffect(() => {
    if (activeTab === 'conocimiento') fetchKB()
  }, [activeTab, fetchKB])

  const handleOpenKBDialog = (entry?: KBItem) => {
    if (entry) {
      setEditingKB(entry)
      setKbForm({ title: entry.title, content: entry.content, category: entry.category || 'general', active: entry.active })
    } else {
      setEditingKB(null)
      setKbForm({ title: '', content: '', category: 'general', active: true })
    }
    setKbDialogOpen(true)
  }

  const handleSaveKB = async () => {
    if (!kbForm.title.trim() || !kbForm.content.trim()) {
      toast.error('Titulo y contenido son requeridos')
      return
    }
    try {
      const method = editingKB ? 'PUT' : 'POST'
      const body = { ...kbForm, ...(editingKB ? { id: editingKB.id } : {}) }
      const res = await fetch('/api/admin/knowledge', { method, headers: { 'Content-Type': 'application/json', 'x-admin-export': 'copyexpress-admin-export' }, body: JSON.stringify(body) })
      if (!res.ok) throw new Error()
      toast.success(editingKB ? 'Entrada actualizada' : 'Entrada creada')
      setKbDialogOpen(false)
      fetchKB()
    } catch { toast.error('Error al guardar entrada') }
  }

  const handleDeleteKB = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/knowledge?id=${id}`, { method: 'DELETE', headers: { 'x-admin-export': 'copyexpress-admin-export' } })
      if (!res.ok) throw new Error()
      toast.success('Entrada eliminada')
      fetchKB()
    } catch { toast.error('Error al eliminar entrada') }
    setDeletingKBId(null)
  }

  const handleToggleKBActive = async (entry: KBItem) => {
    try {
      await fetch('/api/admin/knowledge', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'x-admin-export': 'copyexpress-admin-export' },
        body: JSON.stringify({ id: entry.id, active: !entry.active }),
      })
      fetchKB()
    } catch { toast.error('Error al cambiar estado') }
  }

  const fetchPublications = useCallback(async () => {
    setLoadingPubs(true)
    try {
      const res = await fetch('/api/admin/publications')
      const data = await res.json()
      setPublications(Array.isArray(data) ? data : [])
    } catch { setPublications([]) }
    finally { setLoadingPubs(false) }
  }, [])

  useEffect(() => {
    if (activeTab === 'publicaciones') fetchPublications()
  }, [activeTab, fetchPublications])

  const handleOpenPubDialog = (pub?: PubItem) => {
    if (pub) {
      setEditingPub(pub)
      setPubForm({ title: pub.title, description: pub.description, content: pub.content || '', imageUrl: pub.imageUrl || '', active: pub.active })
    } else {
      setEditingPub(null)
      setPubForm({ title: '', description: '', content: '', imageUrl: '', active: true })
    }
    setPubDialogOpen(true)
  }

  const handleSavePub = async () => {
    if (!pubForm.title.trim() || !pubForm.description.trim()) {
      toast.error('Titulo y descripcion son requeridos')
      return
    }
    try {
      const url = editingPub ? '/api/admin/publications' : '/api/admin/publications'
      const method = editingPub ? 'PUT' : 'POST'
      const body = { ...pubForm, ...(editingPub ? { id: editingPub.id } : {}) }
      const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
      if (!res.ok) throw new Error()
      toast.success(editingPub ? 'Publicacion actualizada' : 'Publicacion creada')
      setPubDialogOpen(false)
      fetchPublications()
    } catch { toast.error('Error al guardar publicacion') }
  }

  const handleDeletePub = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/publications?id=${id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error()
      toast.success('Publicacion eliminada')
      fetchPublications()
    } catch { toast.error('Error al eliminar publicacion') }
    setDeletingPubId(null)
  }

  const handleTogglePubActive = async (pub: PubItem) => {
    try {
      await fetch('/api/admin/publications', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: pub.id, active: !pub.active }),
      })
      fetchPublications()
    } catch { toast.error('Error al cambiar estado') }
  }

  /* ========================================================================== */
  /*  ACTION HANDLERS                                                           */
  /* ========================================================================== */

  /* ---- Template actions ---- */
  const handleOpenTemplateDialog = (template?: Template) => {
    if (template) {
      setEditingTemplate(template)
      let parsedWizard: WizardStepDef[] = []
      try {
        if (template.wizardConfig) {
          const raw = typeof template.wizardConfig === 'string'
            ? JSON.parse(template.wizardConfig)
            : template.wizardConfig
          if (Array.isArray(raw)) {
            parsedWizard = raw
          } else if (raw && Array.isArray(raw.steps)) {
            parsedWizard = raw.steps
          }
        }
      } catch { parsedWizard = [] }
      setTemplateForm({
        name: template.name,
        description: template.description || '',
        category: template.category,
        legalArea: template.legalArea,
        audience: template.audience || '',
        price: String(template.price),
        baseContent: template.baseContent || '',
        headerContent: template.headerContent || '',
        footerContent: template.footerContent || '',
        status: template.status,
        wizardConfig: parsedWizard,
      })
    } else {
      setEditingTemplate(null)
      setTemplateForm({ name: '', description: '', category: '', legalArea: '', audience: '', price: '', baseContent: '', headerContent: '', footerContent: '', status: 'draft', wizardConfig: [] })
    }
    setTemplateDialogOpen(true)
  }

  const handleSaveTemplate = async () => {
    if (!templateForm.name.trim()) {
      toast.error('El nombre es obligatorio')
      return
    }
    setSavingTemplate(true)
    try {
      const payload = {
        action: editingTemplate ? 'update_template' : 'create_template',
        templateId: editingTemplate?.id,
        ...templateForm,
        price: Number(templateForm.price) || 0,
      }
      const res = await fetch('/api/admin', {
        method: 'POST',
        headers: authHeaders(),
        body: JSON.stringify(payload),
      })
      if (res.ok) {
        toast.success(editingTemplate ? 'Plantilla actualizada' : 'Plantilla creada')
        setTemplateDialogOpen(false)
        fetchTemplates()
      } else {
        toast.error('Error al guardar la plantilla')
      }
    } catch {
      toast.error('Error de conexión')
    } finally {
      setSavingTemplate(false)
    }
  }

  const handleUpdateTemplateStatus = async (templateId: string, newStatus: string) => {
    try {
      const res = await fetch('/api/admin', {
        method: 'POST',
        headers: authHeaders(),
        body: JSON.stringify({ action: 'update_template_status', templateId, status: newStatus }),
      })
      if (res.ok) {
        toast.success(`Estado cambiado a ${TEMPLATE_STATUS_CONFIG[newStatus]?.label || newStatus}`)
        fetchTemplates()
      } else {
        toast.error('Error al cambiar estado')
      }
    } catch {
      toast.error('Error de conexión')
    }
  }

  /* ---- Clause actions ---- */
  const handleOpenClauseDialog = (clause?: Clause) => {
    if (clause) {
      setEditingClause(clause)
      setClauseForm({ title: clause.title, content: clause.content, legalArea: clause.legalArea })
    } else {
      setEditingClause(null)
      setClauseForm({ title: '', content: '', legalArea: '' })
    }
    setClauseDialogOpen(true)
  }

  const handleSaveClause = async () => {
    if (!clauseForm.title.trim() || !clauseForm.content.trim()) {
      toast.error('Título y contenido son obligatorios')
      return
    }
    setSavingClause(true)
    try {
      const payload = {
        ...clauseForm,
        clauseId: editingClause?.id,
      }
      const res = await fetch('/api/admin/clauses', {
        method: 'POST',
        headers: authHeaders(),
        body: JSON.stringify(payload),
      })
      if (res.ok) {
        toast.success(editingClause ? 'Cláusula actualizada' : 'Cláusula creada')
        setClauseDialogOpen(false)
        fetchClauses()
      } else {
        toast.error('Error al guardar la cláusula')
      }
    } catch {
      toast.error('Error de conexión')
    } finally {
      setSavingClause(false)
    }
  }

  const handleDeleteClause = async () => {
    if (!deleteClauseId) return
    try {
      const res = await fetch('/api/admin/clauses', {
        method: 'POST',
        headers: authHeaders(),
        body: JSON.stringify({ action: 'delete_clause', clauseId: deleteClauseId }),
      })
      if (res.ok) {
        toast.success('Cláusula eliminada')
        setDeleteClauseId(null)
        fetchClauses()
      } else {
        toast.error('Error al eliminar la cláusula')
      }
    } catch {
      toast.error('Error de conexión')
    }
  }

  /* ---- User actions ---- */
  const handleUpdateUserStatus = async (userId: string, newStatus: string) => {
    try {
      const res = await fetch('/api/admin', {
        method: 'POST',
        headers: authHeaders(),
        body: JSON.stringify({ action: 'update_user_status', userId, status: newStatus }),
      })
      if (res.ok) {
        toast.success(`Usuario ${newStatus === 'active' ? 'activado' : 'suspendido'}`)
        fetchUsers()
      } else {
        toast.error('Error al actualizar usuario')
      }
    } catch {
      toast.error('Error de conexión')
    }
  }

  const handleChangeUserRole = async (userId: string, newRole: string) => {
    try {
      const res = await fetch('/api/admin', {
        method: 'POST',
        headers: authHeaders(),
        body: JSON.stringify({ action: 'update_user_status', userId, role: newRole }),
      })
      if (res.ok) {
        toast.success('Rol actualizado')
        fetchUsers()
      } else {
        toast.error('Error al cambiar rol')
      }
    } catch {
      toast.error('Error de conexión')
    }
  }

  /* ---- Request actions ---- */
  const handleRequestAction = async (requestId: string, action: 'aprobada' | 'rechazada' | 'en_desarrollo', notes?: string) => {
    try {
      const res = await fetch('/api/admin', {
        method: 'POST',
        headers: authHeaders(),
        body: JSON.stringify({ action: 'handle_request', requestId, status: action, notes }),
      })
      if (res.ok) {
        toast.success(`Solicitud marcada como ${REQUEST_STATUS_CONFIG[action]?.label || action}`)
        setRequestNotesId(null)
        setRequestNotes('')
        fetchRequests()
      } else {
        toast.error('Error al procesar solicitud')
      }
    } catch {
      toast.error('Error de conexión')
    }
  }

  /* ---- Credit actions ---- */
  const handleOpenCreditDialog = (user: CreditUser) => {
    setSelectedCreditUser(user)
    setAddCreditsAmount('')
    setAddCreditsDesc('')
    setCreditDialogOpen(true)
  }

  const handleViewCreditHistory = (user: CreditUser) => {
    setSelectedCreditUser(user)
    fetchCreditTransactions(user.id)
  }

  const handleAddCredits = async () => {
    if (!selectedCreditUser || !addCreditsAmount || Number(addCreditsAmount) <= 0) {
      toast.error('Ingresa una cantidad válida')
      return
    }
    setAddingCredits(true)
    try {
      const res = await fetch('/api/admin/credits', {
        method: 'POST',
        headers: authHeaders(),
        body: JSON.stringify({
          userId: selectedCreditUser.id,
          amount: Number(addCreditsAmount),
          description: addCreditsDesc || undefined,
        }),
      })
      if (res.ok) {
        const data = await res.json()
        toast.success(data.message || 'Créditos agregados')
        setCreditDialogOpen(false)
        fetchCreditUsers()
        if (selectedCreditUser) fetchCreditTransactions(selectedCreditUser.id)
      } else {
        toast.error('Error al agregar créditos')
      }
    } catch {
      toast.error('Error de conexión')
    } finally {
      setAddingCredits(false)
    }
  }

  /* ========================================================================== */
  /*  SKELETON LOADER                                                           */
  /* ========================================================================== */

  function TableSkeleton({ rows = 5, cols = 6 }: { rows?: number; cols?: number }) {
    return (
      <div className="space-y-3 p-4">
        {Array.from({ length: rows }).map((_, r) => (
          <div key={r} className="flex gap-4">
            {Array.from({ length: cols }).map((_, c) => (
              <div
                key={c}
                className="h-5 flex-1 animate-pulse rounded bg-white/[0.04]"
              />
            ))}
          </div>
        ))}
      </div>
    )
  }

  /* ========================================================================== */
  /*  NAV TABS CONFIG                                                          */
  /* ========================================================================== */

  const adminTabs = [
    { value: 'resumen', label: 'Resumen', icon: BarChart3 },
    { value: 'plantillas', label: 'Plantillas', icon: Layout },
    { value: 'clausulas', label: 'Cláusulas', icon: BookOpen },
    { value: 'usuarios', label: 'Usuarios', icon: Users },
    { value: 'solicitudes', label: 'Solicitudes', icon: MessageSquare },
    { value: 'precios', label: 'Créditos', icon: Coins },
    { value: 'terminos', label: 'Términos', icon: FileText },
    { value: 'publicaciones', label: 'Publicaciones', icon: Newspaper },
    { value: 'conocimiento', label: 'Base de Conocimiento', icon: Brain },
  ]

  /* ========================================================================== */
  /*  RENDER                                                                   */
  /* ========================================================================== */

  return (
    <main className="min-h-screen bg-[#0A1628]">
      <div className="mx-auto max-w-[1440px] px-4 py-8 sm:px-6 lg:px-8">
        {/* ---------- Header ---------- */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Panel de Administración
          </h1>
          <p className="mt-1 text-sm text-white/50">
            Gestiona plantillas, cláusulas, usuarios y más en CopyExpress.
          </p>
        </div>

        {/* ---------- Tabs Layout ---------- */}
        <div className="flex flex-col gap-6 lg:flex-row">
          {/* Vertical nav on lg, horizontal on mobile */}
          <Tabs value={activeTab} onValueChange={handleTabChange} className="flex w-full flex-col lg:flex-row">
            <TabsList className="mb-4 flex h-auto w-full flex-row flex-wrap gap-1 bg-[#0F1D32]/80 p-1 lg:mb-0 lg:w-56 lg:flex-col lg:flex-nowrap lg:overflow-y-auto lg:rounded-xl lg:border lg:border-white/5">
              {adminTabs.map((tab) => (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  className="flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-left text-sm font-medium text-white/50 data-[state=active]:bg-[#C9A94E]/10 data-[state=active]:text-[#C9A94E] lg:w-full justify-start"
                >
                  <tab.icon className="h-4 w-4 shrink-0" />
                  <span className="hidden sm:inline">{tab.label}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            {/* ============================================================ */}
            {/*  1. RESUMEN                                                  */}
            {/* ============================================================ */}
            <TabsContent value="resumen" className="mt-0 flex-1 lg:ml-6">
              <div className="space-y-6">
                {/* Stat Cards */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                  <AdminStatCard
                    label="Total usuarios"
                    value={loadingStats ? '…' : (stats?.totalUsers ?? 0)}
                    icon={<Users className="h-5 w-5" />}
                    accentBg="bg-blue-500/15"
                    accentText="text-blue-400"
                    accentBorder="border-blue-500/20"
                  />
                  <AdminStatCard
                    label="Total documentos"
                    value={loadingStats ? '…' : (stats?.totalDocuments ?? 0)}
                    icon={<FileText className="h-5 w-5" />}
                    accentBg="bg-[#C9A94E]/15"
                    accentText="text-[#C9A94E]"
                    accentBorder="border-[#C9A94E]/20"
                  />
                  <AdminStatCard
                    label="Plantillas activas"
                    value={loadingStats ? '…' : (stats?.activeTemplates ?? 0)}
                    icon={<Layout className="h-5 w-5" />}
                    accentBg="bg-green-500/15"
                    accentText="text-green-400"
                    accentBorder="border-green-500/20"
                  />
                  <AdminStatCard
                    label="Ingresos totales"
                    value={loadingStats ? '…' : formatCurrency(stats?.totalRevenue ?? 0)}
                    icon={<Coins className="h-5 w-5" />}
                    accentBg="bg-purple-500/15"
                    accentText="text-purple-400"
                    accentBorder="border-purple-500/20"
                  />
                </div>

                {/* Chart */}
                <Card className="border-white/5 bg-[#0F1D32]/80 backdrop-blur-sm">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base font-semibold text-white">
                      Generación de documentos
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    {loadingStats ? (
                      <div className="flex h-[320px] items-center justify-center">
                        <div className="h-64 w-full animate-pulse rounded-lg bg-white/[0.04]" />
                      </div>
                    ) : (stats?.documentsByMonth?.length ?? 0) > 0 ? (
                      <div className="h-[320px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={stats!.documentsByMonth} margin={{ top: 8, right: 8, left: -4, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" vertical={false} />
                            <XAxis
                              dataKey="month"
                              tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 12 }}
                              axisLine={{ stroke: 'rgba(255,255,255,0.08)' }}
                              tickLine={false}
                            />
                            <YAxis
                              tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 12 }}
                              axisLine={false}
                              tickLine={false}
                              allowDecimals={false}
                            />
                            <Tooltip content={<ChartTooltip />} cursor={{ fill: 'rgba(201,169,78,0.06)' }} />
                            <Bar dataKey="count" name="Documentos" fill="#C9A94E" radius={[4, 4, 0, 0]} maxBarSize={48} />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    ) : (
                      <EmptyState icon={BarChart3} message="No hay datos de generación disponibles" />
                    )}
                  </CardContent>
                </Card>

                {/* Top 5 Templates */}
                <Card className="border-white/5 bg-[#0F1D32]/80 backdrop-blur-sm">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base font-semibold text-white">
                      Top 5 plantillas más usadas
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    {loadingStats ? (
                      <TableSkeleton rows={5} cols={3} />
                    ) : (stats?.topTemplates?.length ?? 0) > 0 ? (
                      <Table>
                        <TableHeader>
                          <TableRow className="border-white/5 hover:bg-transparent">
                            <TableHead className="text-xs font-medium uppercase tracking-wider text-white/30">#</TableHead>
                            <TableHead className="text-xs font-medium uppercase tracking-wider text-white/30">Nombre</TableHead>
                            <TableHead className="text-xs font-medium uppercase tracking-wider text-white/30">Categoría</TableHead>
                            <TableHead className="text-right text-xs font-medium uppercase tracking-wider text-white/30">Documentos</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody className="divide-y divide-white/5">
                          {stats!.topTemplates.slice(0, 5).map((tpl, idx) => (
                            <TableRow key={tpl.id} className="group border-white/5 transition-colors hover:bg-white/[0.02]">
                              <TableCell className="font-medium text-[#C9A94E]">{idx + 1}</TableCell>
                              <TableCell className="font-medium text-white/80">{tpl.name}</TableCell>
                              <TableCell className="text-white/40">{tpl.category}</TableCell>
                              <TableCell className="text-right">
                                <span className="flex items-center justify-end gap-1.5 font-medium text-white/70">
                                  <TrendingUp className="h-3.5 w-3.5 text-[#C9A94E]/70" />
                                  {tpl.count}
                                </span>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    ) : (
                      <EmptyState icon={Layout} message="No hay datos de plantillas disponibles" />
                    )}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* ============================================================ */}
            {/*  2. GESTIÓN DE PLANTILLAS                                    */}
            {/* ============================================================ */}
            <TabsContent value="plantillas" className="mt-0 flex-1 lg:ml-6">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-semibold text-white">Gestión de Plantillas</h2>
                    <p className="text-xs text-white/40">Administra todas las plantillas del sistema</p>
                  </div>
                  <Button
                    onClick={() => handleOpenTemplateDialog()}
                    className="bg-[#C9A94E] text-[#0A1628] hover:bg-[#D4B965]"
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Crear Plantilla
                  </Button>
                </div>

                <Card className="border-white/5 bg-[#0F1D32]/80 backdrop-blur-sm">
                  <CardContent className="p-0">
                    {loadingTemplates ? (
                      <TableSkeleton rows={6} cols={7} />
                    ) : templates.length > 0 ? (
                      <div className="overflow-x-auto">
                        <Table>
                          <TableHeader>
                            <TableRow className="border-white/5 hover:bg-transparent">
                              <TableHead className="text-xs font-medium uppercase tracking-wider text-white/30">Nombre</TableHead>
                              <TableHead className="hidden text-xs font-medium uppercase tracking-wider text-white/30 md:table-cell">Categoría</TableHead>
                              <TableHead className="hidden text-xs font-medium uppercase tracking-wider text-white/30 lg:table-cell">Área Legal</TableHead>
                              <TableHead className="text-xs font-medium uppercase tracking-wider text-white/30">Estado</TableHead>
                              <TableHead className="text-right text-xs font-medium uppercase tracking-wider text-white/30">Precio</TableHead>
                              <TableHead className="hidden text-right text-xs font-medium uppercase tracking-wider text-white/30 sm:table-cell">Docs</TableHead>
                              <TableHead className="text-right text-xs font-medium uppercase tracking-wider text-white/30">Acciones</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody className="divide-y divide-white/5">
                            {templates.map((tpl) => (
                              <TableRow key={tpl.id} className="group border-white/5 transition-colors hover:bg-white/[0.02]">
                                <TableCell className="max-w-[200px] truncate font-medium text-white/80">{tpl.name}</TableCell>
                                <TableCell className="hidden text-white/40 md:table-cell">{tpl.category}</TableCell>
                                <TableCell className="hidden text-white/40 lg:table-cell">{tpl.legalArea}</TableCell>
                                <TableCell>
                                  <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                      <button className="cursor-pointer">
                                        <StatusBadge status={tpl.status} config={TEMPLATE_STATUS_CONFIG} />
                                      </button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className="border-white/10 bg-[#0F1D32] text-white">
                                      {Object.entries(TEMPLATE_STATUS_CONFIG).map(([key, val]) => (
                                        <DropdownMenuItem
                                          key={key}
                                          onClick={() => handleUpdateTemplateStatus(tpl.id, key)}
                                          disabled={key === tpl.status}
                                          className="focus:bg-white/5 focus:text-white"
                                        >
                                          {val.label}
                                        </DropdownMenuItem>
                                      ))}
                                    </DropdownMenuContent>
                                  </DropdownMenu>
                                </TableCell>
                                <TableCell className="text-right font-medium text-white/70">{formatCurrency(tpl.price)}</TableCell>
                                <TableCell className="hidden text-right text-white/40 sm:table-cell">{tpl.documentCount}</TableCell>
                                <TableCell className="text-right">
                                  <div className="flex items-center justify-end gap-1">
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      className="h-8 w-8 text-white/40 hover:text-[#C9A94E] hover:bg-[#C9A94E]/10"
                                      onClick={() => handleOpenTemplateDialog(tpl)}
                                    >
                                      <Eye className="h-4 w-4" />
                                    </Button>
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      className="h-8 w-8 text-white/40 hover:text-blue-400 hover:bg-blue-400/10"
                                      onClick={() => handleOpenTemplateDialog(tpl)}
                                    >
                                      <Edit className="h-4 w-4" />
                                    </Button>
                                  </div>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    ) : (
                      <EmptyState icon={Layout} message="No hay plantillas registradas" />
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Create/Edit Template Dialog */}
              <Dialog open={templateDialogOpen} onOpenChange={setTemplateDialogOpen}>
                <DialogContent className="max-h-[90vh] overflow-y-auto border-white/10 bg-[#0F1D32] sm:max-w-2xl">
                  <DialogHeader>
                    <DialogTitle className="text-white">
                      {editingTemplate ? 'Editar Plantilla' : 'Crear Plantilla'}
                    </DialogTitle>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label className="text-white/70">Nombre *</Label>
                      <Input
                        value={templateForm.name}
                        onChange={(e) => setTemplateForm((f) => ({ ...f, name: e.target.value }))}
                        placeholder="Nombre de la plantilla"
                        className="border-white/10 bg-white/5 text-white placeholder:text-white/30"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label className="text-white/70">Descripción</Label>
                      <Textarea
                        value={templateForm.description}
                        onChange={(e) => setTemplateForm((f) => ({ ...f, description: e.target.value }))}
                        placeholder="Descripción de la plantilla"
                        rows={3}
                        className="border-white/10 bg-white/5 text-white placeholder:text-white/30"
                      />
                    </div>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div className="grid gap-2">
                        <Label className="text-white/70">Categoría</Label>
                        <Input
                          value={templateForm.category}
                          onChange={(e) => setTemplateForm((f) => ({ ...f, category: e.target.value }))}
                          placeholder="Ej: Contratos"
                          className="border-white/10 bg-white/5 text-white placeholder:text-white/30"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label className="text-white/70">Área Legal</Label>
                        <Input
                          value={templateForm.legalArea}
                          onChange={(e) => setTemplateForm((f) => ({ ...f, legalArea: e.target.value }))}
                          placeholder="Ej: Derecho Civil"
                          className="border-white/10 bg-white/5 text-white placeholder:text-white/30"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                      <div className="grid gap-2">
                        <Label className="text-white/70">Audiencia</Label>
                        <Input
                          value={templateForm.audience}
                          onChange={(e) => setTemplateForm((f) => ({ ...f, audience: e.target.value }))}
                          placeholder="Ej: Empresas"
                          className="border-white/10 bg-white/5 text-white placeholder:text-white/30"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label className="text-white/70">Precio (COP)</Label>
                        <Input
                          type="number"
                          value={templateForm.price}
                          onChange={(e) => setTemplateForm((f) => ({ ...f, price: e.target.value }))}
                          placeholder="0"
                          className="border-white/10 bg-white/5 text-white placeholder:text-white/30"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label className="text-white/70">Estado</Label>
                        <Select
                          value={templateForm.status}
                          onValueChange={(v) => setTemplateForm((f) => ({ ...f, status: v }))}
                        >
                          <SelectTrigger className="border-white/10 bg-white/5 text-white">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="border-white/10 bg-[#0F1D32]">
                            {Object.entries(TEMPLATE_STATUS_CONFIG).map(([key, val]) => (
                              <SelectItem key={key} value={key} className="text-white focus:bg-white/5 focus:text-white">
                                {val.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="grid gap-2">
                      <Label className="text-white/70">Contenido Base</Label>
                      <div className="rounded-lg border border-white/10 overflow-hidden">
                        <TinyMCEEditor
                          value={templateForm.baseContent}
                          onValueChange={(val) => setTemplateForm((f) => ({ ...f, baseContent: val }))}
                          height={350}
                          placeholder="Contenido base de la plantilla con {{variables}}..."
                          darkMode={true}
                          aiFeatures={true}
                        />
                      </div>
                    </div>

                    {/* ===== Wizard Config Editor ===== */}
                    <div className="grid gap-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="text-white/70">Campos del Formulario (Wizard)</Label>
                          <p className="text-[11px] text-white/30 mt-0.5">Define los pasos y tipos de campo que el visitante completará. Usa los mismos nombres de variable del contenido base.</p>
                        </div>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          className="border-white/10 bg-white/5 text-white/70 hover:bg-white/10 hover:text-white text-xs"
                          onClick={() => {
                            const vars = [...new Set((templateForm.baseContent.match(/\{\{([\w_]+)\}\}/g) || []).map(m => m.replace(/\{\{/g, '').replace(/\}\}/g, '')))]
                            const existingKeys = new Set(templateForm.wizardConfig.flatMap(s => s.fields.map(f => f.key)))
                            const missing = vars.filter(v => !existingKeys.has(v))
                            if (missing.length === 0) {
                              toast.info('Todas las variables ya tienen campos definidos')
                              return
                            }
                            const newStep: WizardStepDef = {
                              title: `Paso ${templateForm.wizardConfig.length + 1}`,
                              fields: missing.map(v => ({ key: v, label: v.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase()), type: 'text' as const }))
                            }
                            setTemplateForm(f => ({ ...f, wizardConfig: [...f.wizardConfig, newStep] }))
                            toast.success(`Se agregaron ${missing.length} campos automáticamente`)
                          }}
                        >
                          <Plus className="mr-1 h-3 w-3" />
                          Auto-detectar variables
                        </Button>
                      </div>

                      {templateForm.wizardConfig.length === 0 ? (
                        <div className="rounded-lg border border-dashed border-white/10 p-8 text-center">
                          <p className="text-xs text-white/30 mb-2">No hay pasos definidos. Puedes:</p>
                          <div className="flex items-center justify-center gap-2">
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              className="border-white/10 bg-white/5 text-white/70 hover:bg-white/10 hover:text-white text-xs"
                              onClick={() => setTemplateForm(f => ({ ...f, wizardConfig: [...f.wizardConfig, { title: `Paso ${f.wizardConfig.length + 1}`, fields: [] }] }))}
                            >
                              <Plus className="mr-1 h-3 w-3" />
                              Agregar paso manualmente
                            </Button>
                            <span className="text-white/20 text-xs">o escribe el contenido base y usa "Auto-detectar variables"</span>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          {templateForm.wizardConfig.map((step, si) => (
                            <WizardStepEditor
                              key={si}
                              step={step}
                              stepIndex={si}
                              allSteps={templateForm.wizardConfig}
                              onChange={(updated) => {
                                const wc = [...templateForm.wizardConfig]
                                wc[si] = updated
                                setTemplateForm(f => ({ ...f, wizardConfig: wc }))
                              }}
                              onRemove={() => setTemplateForm(f => ({ ...f, wizardConfig: f.wizardConfig.filter((_, i) => i !== si) }))}
                            />
                          ))}
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            className="w-full border-dashed border-white/10 bg-transparent text-white/40 hover:bg-white/5 hover:text-white/70 text-xs"
                            onClick={() => setTemplateForm(f => ({ ...f, wizardConfig: [...f.wizardConfig, { title: `Paso ${f.wizardConfig.length + 1}`, fields: [] }] }))}
                          >
                            <Plus className="mr-1 h-3 w-3" />
                            Agregar otro paso
                          </Button>
                        </div>
                      )}
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <MediaFieldEditor
                        label="Encabezado (opcional)"
                        rawValue={templateForm.headerContent}
                        onChange={(v) => setTemplateForm((f) => ({ ...f, headerContent: v }))}
                        defaultW={468}
                        defaultH={60}
                        maxH={80}
                        hint="Recomendado: 468 x 60 px"
                      />
                      <MediaFieldEditor
                        label="Pie de Página (opcional)"
                        rawValue={templateForm.footerContent}
                        onChange={(v) => setTemplateForm((f) => ({ ...f, footerContent: v }))}
                        defaultW={468}
                        defaultH={40}
                        maxH={50}
                        hint="Recomendado: 468 x 40 px"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button
                      variant="ghost"
                      onClick={() => setTemplateDialogOpen(false)}
                      className="text-white/50 hover:text-white hover:bg-white/5"
                    >
                      Cancelar
                    </Button>
                    <Button
                      onClick={handleSaveTemplate}
                      disabled={savingTemplate}
                      className="bg-[#C9A94E] text-[#0A1628] hover:bg-[#D4B965]"
                    >
                      {savingTemplate ? 'Guardando...' : 'Guardar'}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </TabsContent>

            {/* ============================================================ */}
            {/*  3. BIBLIOTECA DE CLÁUSULAS                                  */}
            {/* ============================================================ */}
            <TabsContent value="clausulas" className="mt-0 flex-1 lg:ml-6">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-semibold text-white">Biblioteca de Cláusulas</h2>
                    <p className="text-xs text-white/40">Gestiona las cláusulas legales disponibles</p>
                  </div>
                  <Button
                    onClick={() => handleOpenClauseDialog()}
                    className="bg-[#C9A94E] text-[#0A1628] hover:bg-[#D4B965]"
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Nueva Cláusula
                  </Button>
                </div>

                {loadingClauses ? (
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {Array.from({ length: 6 }).map((_, i) => (
                      <div key={i} className="h-40 animate-pulse rounded-xl border border-white/5 bg-white/[0.03]" />
                    ))}
                  </div>
                ) : clauses.length > 0 ? (
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                    {clauses.map((clause) => (
                      <Card key={clause.id} className="border-white/5 bg-[#0F1D32]/80 backdrop-blur-sm transition-shadow hover:shadow-lg hover:shadow-[#C9A94E]/5">
                        <CardHeader className="pb-2">
                          <div className="flex items-start justify-between gap-2">
                            <CardTitle className="text-sm font-semibold text-white line-clamp-1">{clause.title}</CardTitle>
                            <Badge variant="outline" className="shrink-0 border-[#C9A94E]/20 bg-[#C9A94E]/10 text-[#C9A94E] text-[10px]">
                              {clause.legalArea}
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent className="pt-0">
                          <p className="line-clamp-3 text-xs leading-relaxed text-white/40">{clause.content}</p>
                          <div className="mt-4 flex items-center gap-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-7 text-xs text-white/40 hover:text-blue-400 hover:bg-blue-400/10"
                              onClick={() => handleOpenClauseDialog(clause)}
                            >
                              <Edit className="mr-1 h-3 w-3" />
                              Editar
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-7 text-xs text-white/40 hover:text-red-400 hover:bg-red-400/10"
                              onClick={() => setDeleteClauseId(clause.id)}
                            >
                              <Trash2 className="mr-1 h-3 w-3" />
                              Eliminar
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <EmptyState icon={BookOpen} message="No hay cláusulas registradas" />
                )}
              </div>

              {/* Create/Edit Clause Dialog */}
              <Dialog open={clauseDialogOpen} onOpenChange={setClauseDialogOpen}>
                <DialogContent className="border-white/10 bg-[#0F1D32] sm:max-w-lg">
                  <DialogHeader>
                    <DialogTitle className="text-white">
                      {editingClause ? 'Editar Cláusula' : 'Nueva Cláusula'}
                    </DialogTitle>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label className="text-white/70">Título *</Label>
                      <Input
                        value={clauseForm.title}
                        onChange={(e) => setClauseForm((f) => ({ ...f, title: e.target.value }))}
                        placeholder="Título de la cláusula"
                        className="border-white/10 bg-white/5 text-white placeholder:text-white/30"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label className="text-white/70">Área Legal</Label>
                      <Input
                        value={clauseForm.legalArea}
                        onChange={(e) => setClauseForm((f) => ({ ...f, legalArea: e.target.value }))}
                        placeholder="Ej: Derecho Laboral"
                        className="border-white/10 bg-white/5 text-white placeholder:text-white/30"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label className="text-white/70">Contenido *</Label>
                      <Textarea
                        value={clauseForm.content}
                        onChange={(e) => setClauseForm((f) => ({ ...f, content: e.target.value }))}
                        placeholder="Texto de la cláusula..."
                        rows={8}
                        className="border-white/10 bg-white/5 text-white placeholder:text-white/30"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button
                      variant="ghost"
                      onClick={() => setClauseDialogOpen(false)}
                      className="text-white/50 hover:text-white hover:bg-white/5"
                    >
                      Cancelar
                    </Button>
                    <Button
                      onClick={handleSaveClause}
                      disabled={savingClause}
                      className="bg-[#C9A94E] text-[#0A1628] hover:bg-[#D4B965]"
                    >
                      {savingClause ? 'Guardando...' : 'Guardar'}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              {/* Delete Clause Confirmation */}
              <AlertDialog open={!!deleteClauseId} onOpenChange={(open) => !open && setDeleteClauseId(null)}>
                <AlertDialogContent className="border-white/10 bg-[#0F1D32]">
                  <AlertDialogHeader>
                    <AlertDialogTitle className="text-white">¿Eliminar cláusula?</AlertDialogTitle>
                    <AlertDialogDescription className="text-white/50">
                      Esta acción no se puede deshacer. La cláusula será eliminada permanentemente.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel className="border-white/10 text-white/50 hover:bg-white/5 hover:text-white">
                      Cancelar
                    </AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleDeleteClause}
                      className="bg-red-500/20 text-red-400 hover:bg-red-500/30"
                    >
                      Eliminar
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </TabsContent>

            {/* ============================================================ */}
            {/*  4. GESTIÓN DE USUARIOS                                      */}
            {/* ============================================================ */}
            <TabsContent value="usuarios" className="mt-0 flex-1 lg:ml-6">
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-semibold text-white">Gestión de Usuarios</h2>
                  <p className="text-xs text-white/40">Administra los usuarios registrados en la plataforma</p>
                </div>

                <Card className="border-white/5 bg-[#0F1D32]/80 backdrop-blur-sm">
                  <CardContent className="p-0">
                    {loadingUsers ? (
                      <TableSkeleton rows={6} cols={8} />
                    ) : users.length > 0 ? (
                      <div className="overflow-x-auto">
                        <Table>
                          <TableHeader>
                            <TableRow className="border-white/5 hover:bg-transparent">
                              <TableHead className="text-xs font-medium uppercase tracking-wider text-white/30">Nombre</TableHead>
                              <TableHead className="hidden text-xs font-medium uppercase tracking-wider text-white/30 md:table-cell">Usuario</TableHead>
                              <TableHead className="hidden text-xs font-medium uppercase tracking-wider text-white/30 lg:table-cell">Email</TableHead>
                              <TableHead className="text-xs font-medium uppercase tracking-wider text-white/30">Rol</TableHead>
                              <TableHead className="text-xs font-medium uppercase tracking-wider text-white/30">Estado</TableHead>
                              <TableHead className="hidden text-xs font-medium uppercase tracking-wider text-white/30 sm:table-cell">Créditos</TableHead>
                              <TableHead className="hidden text-right text-xs font-medium uppercase tracking-wider text-white/30 lg:table-cell">Docs</TableHead>
                              <TableHead className="hidden text-right text-xs font-medium uppercase tracking-wider text-white/30 xl:table-cell">Último acceso</TableHead>
                              <TableHead className="text-right text-xs font-medium uppercase tracking-wider text-white/30">Acciones</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody className="divide-y divide-white/5">
                            {users.map((u) => (
                              <TableRow key={u.id} className="group border-white/5 transition-colors hover:bg-white/[0.02]">
                                <TableCell className="font-medium text-white/80">{u.name}</TableCell>
                                <TableCell className="hidden text-white/40 md:table-cell">@{u.username}</TableCell>
                                <TableCell className="hidden max-w-[200px] truncate text-white/40 lg:table-cell">{u.email}</TableCell>
                                <TableCell>
                                  <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                      <button className="cursor-pointer">
                                        <Badge variant="outline" className={`${ROLE_BADGE_CONFIG[u.role] || 'bg-gray-500/15 text-gray-400 border-gray-500/25'} hover:${ROLE_BADGE_CONFIG[u.role] || ''}`}>
                                          {u.role}
                                        </Badge>
                                      </button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className="border-white/10 bg-[#0F1D32] text-white">
                                      {['admin', 'user', 'editor'].map((role) => (
                                        <DropdownMenuItem
                                          key={role}
                                          onClick={() => handleChangeUserRole(u.id, role)}
                                          disabled={role === u.role}
                                          className="capitalize focus:bg-white/5 focus:text-white"
                                        >
                                          {role}
                                        </DropdownMenuItem>
                                      ))}
                                    </DropdownMenuContent>
                                  </DropdownMenu>
                                </TableCell>
                                <TableCell>
                                  <StatusBadge status={u.status} config={USER_STATUS_CONFIG} />
                                </TableCell>
                                <TableCell className="hidden text-white/40 sm:table-cell"><span className="font-semibold text-[#C9A94E]">{u.credits}</span></TableCell>
                                <TableCell className="hidden text-right text-white/40 lg:table-cell">{u.documentCount}</TableCell>
                                <TableCell className="hidden text-right text-white/40 xl:table-cell">{u.lastAccess ? formatDate(u.lastAccess) : '—'}</TableCell>
                                <TableCell className="text-right">
                                  <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                      <Button variant="ghost" size="icon" className="h-8 w-8 text-white/40 hover:text-white hover:bg-white/5">
                                        <MoreVertical className="h-4 w-4" />
                                      </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end" className="border-white/10 bg-[#0F1D32] text-white">
                                      {u.status === 'active' ? (
                                        <DropdownMenuItem
                                          onClick={() => handleUpdateUserStatus(u.id, 'suspended')}
                                          className="focus:bg-red-500/10 focus:text-red-400"
                                        >
                                          <X className="mr-2 h-4 w-4" />
                                          Suspender
                                        </DropdownMenuItem>
                                      ) : (
                                        <DropdownMenuItem
                                          onClick={() => handleUpdateUserStatus(u.id, 'active')}
                                          className="focus:bg-green-500/10 focus:text-green-400"
                                        >
                                          <Check className="mr-2 h-4 w-4" />
                                          Activar
                                        </DropdownMenuItem>
                                      )}
                                    </DropdownMenuContent>
                                  </DropdownMenu>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    ) : (
                      <EmptyState icon={Users} message="No hay usuarios registrados" />
                    )}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* ============================================================ */}
            {/*  5. SOLICITUDES DE NUEVOS DOCUMENTOS                         */}
            {/* ============================================================ */}
            <TabsContent value="solicitudes" className="mt-0 flex-1 lg:ml-6">
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-semibold text-white">Solicitudes de Nuevos Documentos</h2>
                  <p className="text-xs text-white/40">Revisa y gestiona las solicitudes de la comunidad</p>
                </div>

                <Card className="border-white/5 bg-[#0F1D32]/80 backdrop-blur-sm">
                  <CardContent className="p-0">
                    {loadingRequests ? (
                      <TableSkeleton rows={5} cols={5} />
                    ) : requests.length > 0 ? (
                      <div className="overflow-x-auto">
                        <Table>
                          <TableHeader>
                            <TableRow className="border-white/5 hover:bg-transparent">
                              <TableHead className="text-xs font-medium uppercase tracking-wider text-white/30">Título</TableHead>
                              <TableHead className="hidden text-xs font-medium uppercase tracking-wider text-white/30 md:table-cell">Descripción</TableHead>
                              <TableHead className="hidden text-xs font-medium uppercase tracking-wider text-white/30 lg:table-cell">Usuario</TableHead>
                              <TableHead className="text-xs font-medium uppercase tracking-wider text-white/30">Fecha</TableHead>
                              <TableHead className="text-xs font-medium uppercase tracking-wider text-white/30">Estado</TableHead>
                              <TableHead className="text-right text-xs font-medium uppercase tracking-wider text-white/30">Acciones</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody className="divide-y divide-white/5">
                            {requests.map((req) => (
                              <TableRow key={req.id} className="border-white/5 transition-colors hover:bg-white/[0.02]">
                                <TableCell className="max-w-[180px] truncate font-medium text-white/80">{req.title}</TableCell>
                                <TableCell className="hidden max-w-[250px] truncate text-white/40 md:table-cell">{req.description}</TableCell>
                                <TableCell className="hidden text-white/40 lg:table-cell">{req.user}</TableCell>
                                <TableCell className="whitespace-nowrap text-white/40">{formatDate(req.date)}</TableCell>
                                <TableCell>
                                  <StatusBadge status={req.status} config={REQUEST_STATUS_CONFIG} />
                                </TableCell>
                                <TableCell className="text-right">
                                  {req.status === 'pendiente' ? (
                                    <div className="flex items-center justify-end gap-1">
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        className="h-7 text-xs text-green-400 hover:bg-green-400/10"
                                        onClick={() => handleRequestAction(req.id, 'aprobada')}
                                      >
                                        <Check className="mr-1 h-3 w-3" />
                                        Aprobar
                                      </Button>
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        className="h-7 text-xs text-red-400 hover:bg-red-400/10"
                                        onClick={() => handleRequestAction(req.id, 'rechazada')}
                                      >
                                        <X className="mr-1 h-3 w-3" />
                                        Rechazar
                                      </Button>
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        className="h-7 text-xs text-blue-400 hover:bg-blue-400/10"
                                        onClick={() => { setRequestNotesId(req.id); setRequestNotes('') }}
                                      >
                                        <AlertCircle className="mr-1 h-3 w-3" />
                                        En desarrollo
                                      </Button>
                                    </div>
                                  ) : (
                                    <span className="text-xs text-white/20">—</span>
                                  )}
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    ) : (
                      <EmptyState icon={MessageSquare} message="No hay solicitudes pendientes" />
                    )}
                  </CardContent>
                </Card>

                {/* Visitor completed documents */}
                <div className="pt-2">
                  <h3 className="text-base font-semibold text-white mb-1">Documentos de Visitantes</h3>
                  <p className="text-xs text-white/40 mb-4">Documentos generados por usuarios no registrados</p>
                  <Card className="border-white/5 bg-[#0F1D32]/80 backdrop-blur-sm">
                    <CardContent className="p-0">
                      {loadingVisitorDocs ? (
                        <TableSkeleton rows={3} cols={5} />
                      ) : visitorDocs.length > 0 ? (
                      <div className="overflow-x-auto">
                        <Table>
                          <TableHeader>
                            <TableRow className="border-white/5 hover:bg-transparent">
                              <TableHead className="text-xs font-medium uppercase tracking-wider text-white/30">Documento</TableHead>
                              <TableHead className="hidden text-xs font-medium uppercase tracking-wider text-white/30 sm:table-cell">Nombre</TableHead>
                              <TableHead className="hidden text-xs font-medium uppercase tracking-wider text-white/30 md:table-cell">Teléfono</TableHead>
                              <TableHead className="text-xs font-medium uppercase tracking-wider text-white/30">Fecha</TableHead>
                              <TableHead className="text-xs font-medium uppercase tracking-wider text-white/30">Estado</TableHead>
                              <TableHead className="text-right text-xs font-medium uppercase tracking-wider text-white/30">Descargar</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody className="divide-y divide-white/5">
                            {visitorDocs.map((doc) => (
                              <TableRow key={doc.id} className="border-white/5 transition-colors hover:bg-white/[0.02]">
                                <TableCell className="max-w-[200px] truncate font-medium text-white/80">{doc.title}</TableCell>
                                <TableCell className="hidden text-white/40 sm:table-cell">{doc.visitorName || '—'}</TableCell>
                                <TableCell className="hidden text-white/40 md:table-cell">{doc.visitorPhone || '—'}</TableCell>
                                <TableCell className="whitespace-nowrap text-white/40">{formatDate(doc.createdAt)}</TableCell>
                                <TableCell>
                                  <Badge className="bg-green-500/15 text-green-400 border-0 text-[10px]">Completado</Badge>
                                </TableCell>
                                <TableCell className="text-right">
                                  <div className="flex items-center justify-end gap-1">
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="h-7 text-xs text-blue-400 hover:bg-blue-400/10"
                                      onClick={() => handleExportVisitor(doc.id, 'pdf')}
                                    >
                                      <Download className="mr-1 h-3 w-3" />
                                      PDF
                                    </Button>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="h-7 text-xs text-green-400 hover:bg-green-400/10"
                                      onClick={() => handleExportVisitor(doc.id, 'docx')}
                                    >
                                      <Download className="mr-1 h-3 w-3" />
                                      DOCX
                                    </Button>
                                  </div>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center py-10 text-center">
                        <FileText className="h-8 w-8 text-white/10 mb-2" />
                        <p className="text-sm text-white/30">No hay documentos de visitantes</p>
                      </div>
                    )}
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Notes Dialog for "En desarrollo" */}
              <Dialog open={!!requestNotesId} onOpenChange={(open) => { if (!open) setRequestNotesId(null) }}>
                <DialogContent className="border-white/10 bg-[#0F1D32] sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle className="text-white">Marcar como En Desarrollo</DialogTitle>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label className="text-white/70">Notas (opcional)</Label>
                      <Textarea
                        value={requestNotes}
                        onChange={(e) => setRequestNotes(e.target.value)}
                        placeholder="Agrega notas sobre el progreso..."
                        rows={4}
                        className="border-white/10 bg-white/5 text-white placeholder:text-white/30"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button
                      variant="ghost"
                      onClick={() => setRequestNotesId(null)}
                      className="text-white/50 hover:text-white hover:bg-white/5"
                    >
                      Cancelar
                    </Button>
                    <Button
                      onClick={() => requestNotesId && handleRequestAction(requestNotesId, 'en_desarrollo', requestNotes)}
                      className="bg-blue-500/20 text-blue-400 hover:bg-blue-500/30"
                    >
                      Confirmar
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </TabsContent>

            {/* ============================================================ */}
            {/*  6. GESTION DE CREDITOS                                     */}
            {/* ============================================================ */}
            <TabsContent value="precios" className="mt-0 flex-1 lg:ml-6">
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-semibold text-white">Gestión de Créditos</h2>
                  <p className="text-xs text-white/40">Administra los créditos de los usuarios. Cada crédito equivale a un documento.</p>
                </div>

                {loadingCreditUsers ? (
                  <TableSkeleton rows={4} cols={5} />
                ) : creditUsers.length > 0 ? (
                  <Card className="border-white/5 bg-[#0F1D32]/80 backdrop-blur-sm">
                    <CardContent className="p-0">
                      <div className="overflow-x-auto">
                        <Table>
                          <TableHeader>
                            <TableRow className="border-white/5 hover:bg-transparent">
                              <TableHead className="text-xs font-medium uppercase tracking-wider text-white/30">Usuario</TableHead>
                              <TableHead className="hidden text-xs font-medium uppercase tracking-wider text-white/30 md:table-cell">Email</TableHead>
                              <TableHead className="text-xs font-medium uppercase tracking-wider text-white/30">Estado</TableHead>
                              <TableHead className="text-xs font-medium uppercase tracking-wider text-white/30 text-center">Créditos</TableHead>
                              <TableHead className="text-right text-xs font-medium uppercase tracking-wider text-white/30">Acciones</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody className="divide-y divide-white/5">
                            {creditUsers.map((cu) => (
                              <TableRow key={cu.id} className="border-white/5 transition-colors hover:bg-white/[0.02]">
                                <TableCell>
                                  <div>
                                    <p className="text-sm font-medium text-white/90">{cu.name}</p>
                                    <p className="text-xs text-white/40">@{cu.username}</p>
                                  </div>
                                </TableCell>
                                <TableCell className="hidden text-white/40 text-sm md:table-cell">{cu.email || '—'}</TableCell>
                                <TableCell>
                                  <Badge className={cu.status === 'active' ? 'bg-green-500/15 text-green-400 border-green-500/25' : 'bg-red-500/15 text-red-400 border-red-500/25'} variant="outline">
                                    {cu.status === 'active' ? 'Activo' : 'Suspendido'}
                                  </Badge>
                                </TableCell>
                                <TableCell className="text-center">
                                  <span className={`text-lg font-bold ${cu.credits > 5 ? 'text-[#C9A94E]' : cu.credits > 0 ? 'text-amber-400' : 'text-red-400'}`}>{cu.credits}</span>
                                </TableCell>
                                <TableCell className="text-right">
                                  <div className="flex items-center justify-end gap-1">
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="h-7 text-xs text-green-400 hover:bg-green-400/10"
                                      onClick={() => handleOpenCreditDialog(cu)}
                                    >
                                      <Plus className="mr-1 h-3 w-3" />
                                      Agregar
                                    </Button>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="h-7 text-xs text-blue-400 hover:bg-blue-400/10"
                                      onClick={() => handleViewCreditHistory(cu)}
                                    >
                                      <Eye className="mr-1 h-3 w-3" />
                                      Historial
                                    </Button>
                                  </div>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <EmptyState icon={Coins} message="No hay usuarios registrados" />
                )}

                {selectedCreditUser && (
                  <Card className="border-white/5 bg-[#0F1D32]/80 backdrop-blur-sm">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-base font-semibold text-white">
                          Historial de {selectedCreditUser.name}
                        </CardTitle>
                        <button onClick={() => setSelectedCreditUser(null)} className="text-white/30 hover:text-white/60">
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    </CardHeader>
                    <CardContent className="p-0">
                      {loadingCreditTx ? (
                        <TableSkeleton rows={3} cols={4} />
                      ) : creditTransactions.length > 0 ? (
                        <div className="overflow-x-auto">
                          <Table>
                            <TableHeader>
                              <TableRow className="border-white/5 hover:bg-transparent">
                                <TableHead className="text-xs font-medium uppercase tracking-wider text-white/30">Fecha</TableHead>
                                <TableHead className="text-xs font-medium uppercase tracking-wider text-white/30">Descripción</TableHead>
                                <TableHead className="text-xs font-medium uppercase tracking-wider text-white/30 text-center">Tipo</TableHead>
                                <TableHead className="text-xs font-medium uppercase tracking-wider text-white/30 text-right">Cantidad</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody className="divide-y divide-white/5">
                              {creditTransactions.map((tx) => (
                                <TableRow key={tx.id} className="border-white/5 transition-colors hover:bg-white/[0.02]">
                                  <TableCell className="text-white/40 text-sm">{formatDate(tx.createdAt)}</TableCell>
                                  <TableCell className="text-white/80 text-sm">{tx.description || tx.type}</TableCell>
                                  <TableCell className="text-center">
                                    <Badge variant="outline" className={tx.type === 'admin_grant' ? 'bg-green-500/15 text-green-400 border-green-500/25' : 'bg-red-500/15 text-red-400 border-red-500/25'}>
                                      {tx.type === 'admin_grant' ? 'Recarga' : 'Uso'}
                                    </Badge>
                                  </TableCell>
                                  <TableCell className={`text-right font-mono font-semibold ${tx.amount > 0 ? 'text-green-400' : 'text-red-400'}`}>
                                    {tx.amount > 0 ? '+' : ''}{tx.amount}
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center py-10 text-center">
                          <Coins className="h-8 w-8 text-white/10 mb-2" />
                          <p className="text-sm text-white/30">Sin movimientos</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )}
              </div>

              <Dialog open={creditDialogOpen} onOpenChange={setCreditDialogOpen}>
                <DialogContent className="border-white/10 bg-[#0F1D32] sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle className="text-white flex items-center gap-2">
                      <Coins className="h-5 w-5 text-[#C9A94E]" />
                      Agregar Créditos
                    </DialogTitle>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="rounded-lg bg-white/5 p-3 border border-white/10">
                      <p className="text-sm text-white/70">Usuario:</p>
                      <p className="text-base font-semibold text-white">{selectedCreditUser?.name} <span className="text-white/40 font-normal">(@{selectedCreditUser?.username})</span></p>
                      <p className="text-xs text-white/40 mt-1">Saldo actual: <span className="font-semibold text-[#C9A94E]">{selectedCreditUser?.credits}</span> crédito{selectedCreditUser?.credits !== 1 ? 's' : ''}</p>
                    </div>
                    <div className="grid gap-2">
                      <Label className="text-white/70">Cantidad de créditos *</Label>
                      <Input type="number" min="1" value={addCreditsAmount} onChange={(e) => setAddCreditsAmount(e.target.value)} placeholder="Ej: 10" className="border-white/10 bg-white/5 text-white placeholder:text-white/30" />
                    </div>
                    <div className="grid gap-2">
                      <Label className="text-white/70">Nota / Descripción (opcional)</Label>
                      <Input value={addCreditsDesc} onChange={(e) => setAddCreditsDesc(e.target.value)} placeholder="Ej: Recarga mensual" className="border-white/10 bg-white/5 text-white placeholder:text-white/30" />
                    </div>
                  </div>
                  <DialogFooter className="gap-2 sm:gap-0">
                    <Button variant="ghost" onClick={() => setCreditDialogOpen(false)} className="text-white/50 hover:text-white hover:bg-white/5">Cancelar</Button>
                    <Button onClick={handleAddCredits} disabled={addingCredits} className="bg-[#C9A94E] text-[#0A1628] hover:bg-[#D4B965] font-semibold min-w-[120px]">
                      {addingCredits ? (
                        <span className="flex items-center gap-2"><span className="animate-spin rounded-full h-4 w-4 border-2 border-[#0A1628] border-t-transparent" />Procesando…</span>
                      ) : 'Agregar'}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </TabsContent>

            {/* 7. TERMINOS Y CONDICIONES */}
            <TabsContent value="terminos" className="mt-0 flex-1 lg:ml-6">
              <InlineTerms />
            </TabsContent>
            <TabsContent value="publicaciones" className="mt-0 flex-1 lg:ml-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-white">Publicaciones</h3>
                    <p className="text-sm text-white/50">Gestiona las publicaciones que se muestran en el panel lateral de los visitantes.</p>
                  </div>
                  <Button onClick={() => handleOpenPubDialog()} className="bg-[#C9A94E] text-[#0A1628] hover:bg-[#C9A94E]/90">
                    <Plus className="h-4 w-4 mr-1.5" /> Nueva publicacion
                  </Button>
                </div>

                <Card className="bg-[#0F1D32] border-white/5">
                  <CardContent className="p-0">
                    {loadingPubs ? (
                      <div className="p-8 text-center text-white/40">Cargando...</div>
                    ) : publications.length === 0 ? (
                      <div className="p-8 text-center text-white/40">No hay publicaciones. Crea una para que aparezca en el panel lateral.</div>
                    ) : (
                      <Table>
                        <TableHeader>
                          <TableRow className="border-white/5 hover:bg-transparent">
                            <TableHead className="text-white/50 text-xs">Imagen</TableHead>
                            <TableHead className="text-white/50 text-xs">Titulo</TableHead>
                            <TableHead className="text-white/50 text-xs hidden md:table-cell">Descripcion</TableHead>
                            <TableHead className="text-white/50 text-xs">Orden</TableHead>
                            <TableHead className="text-white/50 text-xs">Estado</TableHead>
                            <TableHead className="text-white/50 text-xs text-right">Acciones</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {publications.map((pub) => (
                            <TableRow key={pub.id} className="border-white/5 hover:bg-white/[0.02]">
                              <TableCell>
                                {pub.imageUrl ? (
                                  // eslint-disable-next-line @next/next/no-img-element
                                  <img src={pub.imageUrl} alt="" className="w-12 h-8 rounded object-cover border border-white/10" />
                                ) : (
                                  <div className="w-12 h-8 rounded bg-white/5 border border-white/10 flex items-center justify-center">
                                    <ImageOff className="h-3 w-3 text-white/20" />
                                  </div>
                                )}
                              </TableCell>
                              <TableCell className="text-white font-medium text-sm">{pub.title}</TableCell>
                              <TableCell className="text-white/50 text-xs hidden md:table-cell max-w-[200px] truncate">{pub.description}</TableCell>
                              <TableCell className="text-white/40 text-xs">{pub.order}</TableCell>
                              <TableCell>
                                <button
                                  onClick={() => handleTogglePubActive(pub)}
                                  className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium ${pub.active ? 'bg-[#28A745]/15 text-[#28A745]' : 'bg-white/5 text-white/30'}`}
                                >
                                  {pub.active ? 'Activa' : 'Inactiva'}
                                </button>
                              </TableCell>
                              <TableCell className="text-right">
                                <div className="flex items-center justify-end gap-1">
                                  <Button variant="ghost" size="icon" className="h-7 w-7 text-white/40 hover:text-white hover:bg-white/5" onClick={() => handleOpenPubDialog(pub)}>
                                    <Edit className="h-3.5 w-3.5" />
                                  </Button>
                                  <Button variant="ghost" size="icon" className="h-7 w-7 text-red-400/60 hover:text-red-400 hover:bg-red-400/10" onClick={() => setDeletingPubId(pub.id)}>
                                    <Trash2 className="h-3.5 w-3.5" />
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Create/Edit Dialog */}
              <Dialog open={pubDialogOpen} onOpenChange={setPubDialogOpen}>
                <DialogContent className="bg-[#0F1D32] border-white/10 text-white max-w-2xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>{editingPub ? 'Editar publicacion' : 'Nueva publicacion'}</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 mt-2">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-white/70 text-xs">Titulo *</Label>
                        <Input value={pubForm.title} onChange={(e) => setPubForm({ ...pubForm, title: e.target.value })} placeholder="Titulo de la publicacion" className="bg-white/5 border-white/10 text-white placeholder:text-white/20" />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-white/70 text-xs">Imagen (opcional)</Label>
                        <div className="flex items-center gap-2">
                          <label className="flex-1 flex items-center justify-center gap-2 h-10 rounded-lg border border-dashed border-white/20 bg-white/5 text-white/40 hover:text-white/60 hover:border-white/30 cursor-pointer transition-colors text-xs">
                            <ImageIcon className="h-4 w-4" />
                            {pubForm.imageUrl ? 'Cambiar imagen' : 'Subir imagen'}
                            <input type="file" accept="image/*" className="hidden" onChange={async (e) => {
                              const file = e.target.files?.[0]
                              if (!file) return
                              const formData = new FormData()
                              formData.append('file', file)
                              try {
                                const res = await fetch('/api/upload', { method: 'POST', body: formData })
                                const data = await res.json()
                                if (data.url) setPubForm((f) => ({ ...f, imageUrl: data.url }))
                              } catch { toast.error('Error al subir imagen') }
                            }} />
                          </label>
                          {pubForm.imageUrl && (
                            <button onClick={() => setPubForm((f) => ({ ...f, imageUrl: '' }))} className="h-10 px-3 rounded-lg border border-white/10 bg-white/5 text-white/40 hover:text-red-400 text-xs">
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          )}
                        </div>
                        {pubForm.imageUrl && (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={pubForm.imageUrl} alt="Preview" className="mt-2 w-full h-24 rounded-lg object-cover border border-white/10" />
                        )}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-white/70 text-xs">Descripcion *</Label>
                      <Textarea value={pubForm.description} onChange={(e) => setPubForm({ ...pubForm, description: e.target.value })} placeholder="Breve descripcion que se muestra en el panel lateral..." rows={2} className="bg-white/5 border-white/10 text-white placeholder:text-white/20" />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-white/70 text-xs">Contenido completo</Label>
                      <div className="rounded-lg border border-white/10 overflow-hidden">
                        <TinyMCEEditor
                          value={pubForm.content}
                          onValueChange={(val) => setPubForm((f) => ({ ...f, content: val }))}
                          height={350}
                          placeholder="Escribe el contenido de la publicacion..."
                          darkMode={true}
                          imagesUploadUrl="/api/upload"
                        />
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => setPubForm({ ...pubForm, active: !pubForm.active })}
                        className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${pubForm.active ? 'bg-[#28A745]' : 'bg-white/10'}`}
                      >
                        <span className={`inline-block h-3.5 w-3.5 rounded-full bg-white transition-transform ${pubForm.active ? 'translate-x-4' : 'translate-x-1'}`} />
                      </button>
                      <Label className="text-white/70 text-xs">Publicacion activa</Label>
                    </div>
                  </div>
                  <DialogFooter className="mt-4">
                    <Button variant="ghost" onClick={() => setPubDialogOpen(false)} className="text-white/50 hover:text-white hover:bg-white/5">Cancelar</Button>
                    <Button onClick={handleSavePub} className="bg-[#C9A94E] text-[#0A1628] hover:bg-[#C9A94E]/90">
                      {editingPub ? 'Guardar cambios' : 'Crear publicacion'}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              {/* Delete Confirmation */}
              <AlertDialog open={!!deletingPubId} onOpenChange={(open) => !open && setDeletingPubId(null)}>
                <AlertDialogContent className="bg-[#0F1D32] border-white/10">
                  <AlertDialogHeader>
                    <AlertDialogTitle className="text-white">Eliminar publicacion</AlertDialogTitle>
                    <AlertDialogDescription className="text-white/50">Esta accion no se puede deshacer. La publicacion sera eliminada permanentemente.</AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel className="text-white/50 hover:text-white hover:bg-white/5">Cancelar</AlertDialogCancel>
                    <AlertDialogAction onClick={() => deletingPubId && handleDeletePub(deletingPubId)} className="bg-red-500 text-white hover:bg-red-600">Eliminar</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </TabsContent>

            {/* 9. BASE DE CONOCIMIENTO */}
            <TabsContent value="conocimiento" className="mt-0 flex-1 lg:ml-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-white">Base de Conocimiento</h3>
                    <p className="text-sm text-white/50">Gestiona el conocimiento que alimenta el Asistente de IA. Las entradas activas se inyectan como contexto en las respuestas.</p>
                  </div>
                  <Button onClick={() => handleOpenKBDialog()} className="bg-[#C9A94E] text-[#0A1628] hover:bg-[#C9A94E]/90">
                    <Plus className="h-4 w-4 mr-1.5" /> Nueva entrada
                  </Button>
                </div>

                <Card className="bg-[#0F1D32] border-white/5">
                  <CardContent className="p-0">
                    {loadingKB ? (
                      <div className="p-8 text-center text-white/40">Cargando...</div>
                    ) : kbEntries.length === 0 ? (
                      <div className="p-8 text-center text-white/40">No hay entradas. Crea una para enriquecer el conocimiento del asistente.</div>
                    ) : (
                      <Table>
                        <TableHeader>
                          <TableRow className="border-white/5 hover:bg-transparent">
                            <TableHead className="text-white/50 text-xs">Titulo</TableHead>
                            <TableHead className="text-white/50 text-xs hidden md:table-cell">Categoria</TableHead>
                            <TableHead className="text-white/50 text-xs hidden lg:table-cell">Contenido (resumen)</TableHead>
                            <TableHead className="text-white/50 text-xs">Estado</TableHead>
                            <TableHead className="text-white/50 text-xs text-right">Acciones</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {kbEntries.map((entry) => (
                            <TableRow key={entry.id} className="border-white/5 hover:bg-white/[0.02]">
                              <TableCell className="text-white font-medium text-sm">{entry.title}</TableCell>
                              <TableCell className="text-white/50 text-xs hidden md:table-cell">
                                <Badge variant="outline" className="border-white/10 bg-white/5 text-white/50 text-[10px]">
                                  {KB_CATEGORIES.find((c) => c.value === entry.category)?.label || entry.category}
                                </Badge>
                              </TableCell>
                              <TableCell className="text-white/40 text-xs hidden lg:table-cell max-w-[250px] truncate">{entry.content.replace(/<[^>]*>/g, '').slice(0, 80)}</TableCell>
                              <TableCell>
                                <button
                                  onClick={() => handleToggleKBActive(entry)}
                                  className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium ${entry.active ? 'bg-[#28A745]/15 text-[#28A745]' : 'bg-white/5 text-white/30'}`}
                                >
                                  {entry.active ? 'Activa' : 'Inactiva'}
                                </button>
                              </TableCell>
                              <TableCell className="text-right">
                                <div className="flex items-center justify-end gap-1">
                                  <Button variant="ghost" size="icon" className="h-7 w-7 text-white/40 hover:text-white hover:bg-white/5" onClick={() => handleOpenKBDialog(entry)}>
                                    <Edit className="h-3.5 w-3.5" />
                                  </Button>
                                  <Button variant="ghost" size="icon" className="h-7 w-7 text-red-400/60 hover:text-red-400 hover:bg-red-400/10" onClick={() => setDeletingKBId(entry.id)}>
                                    <Trash2 className="h-3.5 w-3.5" />
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Create/Edit Dialog */}
              <Dialog open={kbDialogOpen} onOpenChange={setKbDialogOpen}>
                <DialogContent className="bg-[#0F1D32] border-white/10 text-white max-w-2xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>{editingKB ? 'Editar entrada' : 'Nueva entrada'}</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 mt-2">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-white/70 text-xs">Titulo *</Label>
                        <Input value={kbForm.title} onChange={(e) => setKbForm({ ...kbForm, title: e.target.value })} placeholder="Ej: Formato de contratos de arrendamiento" className="bg-white/5 border-white/10 text-white placeholder:text-white/20" />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-white/70 text-xs">Categoria</Label>
                        <Select value={kbForm.category} onValueChange={(val) => setKbForm({ ...kbForm, category: val })}>
                          <SelectTrigger className="border-white/10 bg-white/5 text-white">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="border-white/10 bg-[#0F1D32]">
                            {KB_CATEGORIES.map((cat) => (
                              <SelectItem key={cat.value} value={cat.value} className="text-white focus:bg-white/5 focus:text-white">
                                {cat.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-white/70 text-xs">Contenido *</Label>
                      <div className="rounded-lg border border-white/10 overflow-hidden">
                        <TinyMCEEditor
                          value={kbForm.content}
                          onValueChange={(val) => setKbForm({ ...kbForm, content: val })}
                          height={400}
                          placeholder="Escribe el conocimiento que el asistente usara como contexto..."
                          darkMode={true}
                        />
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => setKbForm({ ...kbForm, active: !kbForm.active })}
                        className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${kbForm.active ? 'bg-[#28A745]' : 'bg-white/10'}`}
                      >
                        <span className={`inline-block h-3.5 w-3.5 rounded-full bg-white transition-transform ${kbForm.active ? 'translate-x-4' : 'translate-x-1'}`} />
                      </button>
                      <Label className="text-white/70 text-xs">Entrada activa</Label>
                    </div>
                  </div>
                  <DialogFooter className="mt-4">
                    <Button variant="ghost" onClick={() => setKbDialogOpen(false)} className="text-white/50 hover:text-white hover:bg-white/5">Cancelar</Button>
                    <Button onClick={handleSaveKB} className="bg-[#C9A94E] text-[#0A1628] hover:bg-[#C9A94E]/90">
                      {editingKB ? 'Guardar cambios' : 'Crear entrada'}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              {/* Delete Confirmation */}
              <AlertDialog open={!!deletingKBId} onOpenChange={(open) => !open && setDeletingKBId(null)}>
                <AlertDialogContent className="bg-[#0F1D32] border-white/10">
                  <AlertDialogHeader>
                    <AlertDialogTitle className="text-white">Eliminar entrada</AlertDialogTitle>
                    <AlertDialogDescription className="text-white/50">Esta accion no se puede deshacer. La entrada sera eliminada permanentemente.</AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel className="text-white/50 hover:text-white hover:bg-white/5">Cancelar</AlertDialogCancel>
                    <AlertDialogAction onClick={() => deletingKBId && handleDeleteKB(deletingKBId)} className="bg-red-500 text-white hover:bg-red-600">Eliminar</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </main>
  )
}