'use client'

import { useEffect, useState, useCallback, useRef } from 'react'
import {
  Search,
  LayoutGrid,
  List,
  Clock,
  HelpCircle,
  Star,
  ArrowRight,
  Plus,
  Scale,
  Building,
  HardHat,
  Home,
  FileText,
  LogIn,
  Moon,
  Palette,
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { useAppStore } from '@/store/app-store'
import { useTheme } from 'next-themes'

/* -------------------------------------------------------------------------- */
/*  Types                                                                    */
/* -------------------------------------------------------------------------- */

interface NormativityItem {
  lawName: string
  lawReference: string
}

interface Template {
  id: string
  name: string
  description: string
  category: string
  legalArea: string
  audience: string
  price: number | null
  estimatedQuestions: number
  estimatedMinutes: number
  rating: number
  ratingCount: number
  normativity: NormativityItem[]
  _count: {
    documents: number
  }
}

/* -------------------------------------------------------------------------- */
/*  Constants                                                                */
/* -------------------------------------------------------------------------- */

const LEGAL_AREA_EMOJI: Record<string, string> = {
  Civil: '⚖️',
  Mercantil: '🏢',
  Laboral: '👷',
  Inmobiliario: '🏠',
  Administrativo: '📝',
  Constitucional: '📜',
  'Derechos de Petición': '📋',
  Penal: '🔒',
  Familia: '👨‍👩‍👧‍👦',
  Tributario: '💰',
}

const LEGAL_AREA_ICON: Record<string, React.ReactNode> = {
  Civil: <Scale className="h-5 w-5" />,
  Mercantil: <Building className="h-5 w-5" />,
  Laboral: <HardHat className="h-5 w-5" />,
  Inmobiliario: <Home className="h-5 w-5" />,
  Administrativo: <FileText className="h-5 w-5" />,
}

/* -------------------------------------------------------------------------- */
/*  Helpers                                                                  */
/* -------------------------------------------------------------------------- */

function formatPrice(price: number | null): string {
  if (price === null || price === 0) return 'GRATUITO'
  return `COP $${price.toLocaleString('es-CO')}`
}

function getLegalAreaEmoji(legalArea: string): string {
  return LEGAL_AREA_EMOJI[legalArea] || '📄'
}

function renderStars(rating: number, size: string = 'h-3.5 w-3.5') {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          className={`${size} ${
            s <= Math.round(rating)
              ? 'fill-[#C9A94E] text-[#C9A94E]'
              : 'fill-transparent text-white/20'
          }`}
        />
      ))}
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/*  Skeleton card                                                            */
/* -------------------------------------------------------------------------- */

function SkeletonCard() {
  return (
    <Card className="border-white/5 bg-[#0F1D32]/80 backdrop-blur-sm animate-pulse">
      <CardContent className="p-5 space-y-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-white/5" />
          <div className="flex-1 space-y-2">
            <div className="h-4 w-3/4 rounded bg-white/5" />
            <div className="h-3 w-1/2 rounded bg-white/5" />
          </div>
        </div>
        <div className="space-y-2">
          <div className="h-3 w-full rounded bg-white/5" />
          <div className="h-3 w-2/3 rounded bg-white/5" />
        </div>
        <div className="flex gap-2">
          <div className="h-6 w-20 rounded-full bg-white/5" />
          <div className="h-6 w-24 rounded-full bg-white/5" />
        </div>
        <div className="flex gap-4">
          <div className="h-4 w-16 rounded bg-white/5" />
          <div className="h-4 w-16 rounded bg-white/5" />
          <div className="h-4 w-16 rounded bg-white/5" />
        </div>
        <div className="h-9 w-full rounded-lg bg-white/5" />
      </CardContent>
    </Card>
  )
}

function SkeletonRow() {
  return (
    <div className="flex items-center gap-4 rounded-xl border border-white/5 bg-[#0F1D32]/80 p-4 backdrop-blur-sm animate-pulse">
      <div className="h-10 w-10 shrink-0 rounded-lg bg-white/5" />
      <div className="flex-1 space-y-2">
        <div className="h-4 w-1/3 rounded bg-white/5" />
        <div className="h-3 w-2/3 rounded bg-white/5" />
      </div>
      <div className="hidden sm:flex gap-2">
        <div className="h-6 w-20 rounded-full bg-white/5" />
        <div className="h-6 w-24 rounded-full bg-white/5" />
      </div>
      <div className="hidden md:flex gap-4">
        <div className="h-4 w-12 rounded bg-white/5" />
        <div className="h-4 w-12 rounded bg-white/5" />
        <div className="h-4 w-12 rounded bg-white/5" />
      </div>
      <div className="h-8 w-24 rounded-lg bg-white/5" />
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/*  Grid card                                                                */
/* -------------------------------------------------------------------------- */

function TemplateCard({
  template,
  onSelect,
}: {
  template: Template
  onSelect: (t: Template) => void
}) {
  const { startWizard, startVisitorWizard, user } = useAppStore()
  const isFree = template.price === null || template.price === 0
  const handleUse = () => { if (user) startWizard(template.id); else startVisitorWizard(template.id) }

  return (
    <Card className="group border-white/5 bg-[#0F1D32]/80 backdrop-blur-sm transition-all hover:border-[#C9A94E]/20 hover:shadow-lg hover:shadow-[#C9A94E]/5">
      <CardContent className="flex flex-col gap-4 p-5">
        {/* Header: icon + name */}
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#C9A94E]/10 text-lg transition-colors group-hover:bg-[#C9A94E]/15">
            {getLegalAreaEmoji(template.legalArea)}
          </div>
          <div className="min-w-0 flex-1">
            <h3
              className="cursor-pointer truncate text-sm font-semibold text-white/90 transition-colors group-hover:text-[#C9A94E]"
              onClick={() => onSelect(template)}
            >
              {template.name}
            </h3>
            <p className="text-xs text-white/40">{template.legalArea}</p>
          </div>
        </div>

        {/* Description */}
        <p
          className="line-clamp-2 cursor-pointer text-xs leading-relaxed text-white/50 transition-colors hover:text-white/70"
          onClick={() => onSelect(template)}
        >
          {template.description}
        </p>

        {/* Badges */}
        <div className="flex flex-wrap gap-2">
          <Badge
            variant="outline"
            className={
              isFree
                ? 'border-[#C9A94E]/30 bg-[#C9A94E]/10 text-[#C9A94E] text-[10px] font-semibold hover:bg-[#C9A94E]/20'
                : 'border-green-500/30 bg-green-500/10 text-green-400 text-[10px] font-semibold hover:bg-green-500/20'
            }
          >
            {isFree ? '✦ GRATUITO' : formatPrice(template.price)}
          </Badge>
          <Badge
            variant="outline"
            className="border-white/10 bg-white/5 text-white/50 text-[10px] hover:bg-white/10"
          >
            {template.audience === 'Profesionales' ? '👨‍💼' : '👤'} {template.audience}
          </Badge>
        </div>

        {/* Stats row */}
        <div className="flex items-center gap-4 text-[11px] text-white/40">
          <span className="flex items-center gap-1">
            <Clock className="h-3 w-3" /> {template.estimatedMinutes} min
          </span>
          <span className="flex items-center gap-1">
            <HelpCircle className="h-3 w-3" /> {template.estimatedQuestions} preguntas
          </span>
          <span className="flex items-center gap-1">
            <Star className="h-3 w-3 fill-[#C9A94E] text-[#C9A94E]" /> {template.rating.toFixed(1)}
          </span>
        </div>

        {/* CTA */}
        <Button
          className="mt-auto w-full bg-[#C9A94E]/15 text-[#C9A94E] border border-[#C9A94E]/20 text-xs font-semibold transition-all hover:bg-[#C9A94E]/25 hover:border-[#C9A94E]/40 hover:text-[#D4B965]"
          variant="outline"
          onClick={handleUse}
        >
          Comenzar
          <ArrowRight className="ml-1 h-3 w-3" />
        </Button>
      </CardContent>
    </Card>
  )
}

/* -------------------------------------------------------------------------- */
/*  List row                                                                 */
/* -------------------------------------------------------------------------- */

function TemplateRow({
  template,
  onSelect,
}: {
  template: Template
  onSelect: (t: Template) => void
}) {
  const { startWizard, startVisitorWizard, user } = useAppStore()
  const isFree = template.price === null || template.price === 0
  const handleUse = () => { if (user) startWizard(template.id); else startVisitorWizard(template.id) }

  return (
    <div className="group flex flex-col gap-3 rounded-xl border border-white/5 bg-[#0F1D32]/80 p-4 backdrop-blur-sm transition-all hover:border-[#C9A94E]/20 hover:shadow-md hover:shadow-[#C9A94E]/5 sm:flex-row sm:items-center sm:gap-4">
      {/* Icon */}
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#C9A94E]/10 text-lg transition-colors group-hover:bg-[#C9A94E]/15">
        {getLegalAreaEmoji(template.legalArea)}
      </div>

      {/* Name + description */}
      <div className="min-w-0 flex-1">
        <h3
          className="cursor-pointer truncate text-sm font-semibold text-white/90 transition-colors group-hover:text-[#C9A94E]"
          onClick={() => onSelect(template)}
        >
          {template.name}
        </h3>
        <p className="mt-0.5 line-clamp-1 text-xs text-white/40">
          {template.description}
        </p>
      </div>

      {/* Badges */}
      <div className="flex flex-wrap gap-2">
        <Badge
          variant="outline"
          className={
            isFree
              ? 'border-[#C9A94E]/30 bg-[#C9A94E]/10 text-[#C9A94E] text-[10px] font-semibold hover:bg-[#C9A94E]/20'
              : 'border-green-500/30 bg-green-500/10 text-green-400 text-[10px] font-semibold hover:bg-green-500/20'
          }
        >
          {isFree ? '✦ GRATUITO' : formatPrice(template.price)}
        </Badge>
        <Badge
          variant="outline"
          className="border-white/10 bg-white/5 text-white/50 text-[10px] hover:bg-white/10"
        >
          {template.audience === 'Profesionales' ? '👨‍💼' : '👤'} {template.audience}
        </Badge>
      </div>

      {/* Stats */}
      <div className="hidden md:flex shrink-0 items-center gap-3 text-[11px] text-white/40">
        <span className="flex items-center gap-1">
          <Clock className="h-3 w-3" /> {template.estimatedMinutes} min
        </span>
        <span className="flex items-center gap-1">
          <HelpCircle className="h-3 w-3" /> {template.estimatedQuestions}
        </span>
        <span className="flex items-center gap-1">
          <Star className="h-3 w-3 fill-[#C9A94E] text-[#C9A94E]" /> {template.rating.toFixed(1)}
        </span>
      </div>

      {/* CTA */}
      <Button
        className="shrink-0 bg-[#C9A94E]/15 text-[#C9A94E] border border-[#C9A94E]/20 text-xs font-semibold transition-all hover:bg-[#C9A94E]/25 hover:border-[#C9A94E]/40 hover:text-[#D4B965]"
        variant="outline"
        onClick={handleUse}
      >
        Comenzar
      </Button>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/*  Detail dialog                                                            */
/* -------------------------------------------------------------------------- */

function TemplateDetailDialog({
  template,
  open,
  onOpenChange,
}: {
  template: Template | null
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const { user, startWizard, startVisitorWizard } = useAppStore()

  if (!template) return null

  const isFree = template.price === null || template.price === 0
  const handleStart = () => {
    onOpenChange(false)
    if (user) {
      startWizard(template.id)
    } else {
      startVisitorWizard(template.id)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[85vh] overflow-y-auto border-white/10 bg-[#0F1D32] sm:max-w-lg">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#C9A94E]/10 text-2xl">
              {getLegalAreaEmoji(template.legalArea)}
            </div>
            <div>
              <DialogTitle className="text-base font-semibold text-white">
                {template.name}
              </DialogTitle>
              <DialogDescription className="text-xs text-white/40">
                {template.category} · {template.legalArea}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-5 pt-2">
          {/* Description */}
          <div>
            <h4 className="mb-1.5 text-xs font-semibold uppercase tracking-wider text-white/30">
              Descripción
            </h4>
            <p className="text-sm leading-relaxed text-white/60">
              {template.description}
            </p>
          </div>

          {/* Badges */}
          <div className="flex flex-wrap gap-2">
            <Badge
              variant="outline"
              className={
                isFree
                  ? 'border-[#C9A94E]/30 bg-[#C9A94E]/10 text-[#C9A94E] text-[10px] font-semibold'
                  : 'border-green-500/30 bg-green-500/10 text-green-400 text-[10px] font-semibold'
              }
            >
              {isFree ? '✦ GRATUITO' : formatPrice(template.price)}
            </Badge>
            <Badge
              variant="outline"
              className="border-white/10 bg-white/5 text-white/50 text-[10px]"
            >
              {template.audience === 'Profesionales' ? '👨‍💼' : '👤'} {template.audience}
            </Badge>
            <Badge
              variant="outline"
              className="border-white/10 bg-white/5 text-white/50 text-[10px]"
            >
              {template._count?.documents ?? 0} documentos generados
            </Badge>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3">
            <div className="rounded-lg border border-white/5 bg-white/[0.02] p-3 text-center">
              <Clock className="mx-auto mb-1 h-4 w-4 text-[#C9A94E]" />
              <p className="text-sm font-bold text-white">{template.estimatedMinutes} min</p>
              <p className="text-[10px] text-white/40">Tiempo estimado</p>
            </div>
            <div className="rounded-lg border border-white/5 bg-white/[0.02] p-3 text-center">
              <HelpCircle className="mx-auto mb-1 h-4 w-4 text-[#C9A94E]" />
              <p className="text-sm font-bold text-white">{template.estimatedQuestions}</p>
              <p className="text-[10px] text-white/40">Preguntas</p>
            </div>
            <div className="rounded-lg border border-white/5 bg-white/[0.02] p-3 text-center">
              <Star className="mx-auto mb-1 h-4 w-4 fill-[#C9A94E] text-[#C9A94E]" />
              <p className="text-sm font-bold text-white">{template.rating.toFixed(1)}</p>
              <p className="text-[10px] text-white/40">
                {template.ratingCount} {template.ratingCount === 1 ? 'reseña' : 'reseñas'}
              </p>
            </div>
          </div>

          {/* Rating with stars */}
          <div className="flex items-center gap-2">
            {renderStars(template.rating)}
            <span className="text-xs text-white/40">
              {template.rating.toFixed(1)} de 5 · {template.ratingCount} calificaciones
            </span>
          </div>

          {/* Normativity */}
          {template.normativity && template.normativity.length > 0 && (
            <div>
              <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-white/30">
                Normativa aplicable
              </h4>
              <div className="space-y-1.5">
                {template.normativity.map((norm, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-2 rounded-lg border border-white/5 bg-white/[0.02] px-3 py-2"
                  >
                    <Scale className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#C9A94E]/60" />
                    <div className="min-w-0">
                      <p className="text-xs font-medium text-white/70">{norm.lawName}</p>
                      <p className="text-[10px] text-white/40">{norm.lawReference}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CTA */}
          <Button
            className="w-full bg-[#C9A94E] text-[#0A1628] font-semibold text-sm transition-all hover:bg-[#D4B965] hover:shadow-lg hover:shadow-[#C9A94E]/20"
            size="lg"
            onClick={handleStart}
          >
            Comenzar con esta plantilla
            <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

/* -------------------------------------------------------------------------- */
/*  Empty state                                                              */
/* -------------------------------------------------------------------------- */

function EmptyState({ hasFilters }: { hasFilters: boolean }) {
  const { setCurrentPage } = useAppStore()

  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 bg-[#0F1D32]/40 px-6 py-16 text-center">
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-white/5">
        <Search className="h-6 w-6 text-white/20" />
      </div>
      <h3 className="text-base font-semibold text-white/60">
        {hasFilters ? 'Sin resultados' : 'No hay plantillas disponibles'}
      </h3>
      <p className="mt-1 max-w-sm text-sm text-white/30">
        {hasFilters
          ? 'Intenta ajustar los filtros o el término de búsqueda.'
          : 'Aún no hay plantillas en el catálogo. Vuelve más tarde.'}
      </p>
      <Button
        className="mt-6 bg-[#C9A94E]/15 text-[#C9A94E] border border-[#C9A94E]/20 text-xs font-semibold hover:bg-[#C9A94E]/25 hover:border-[#C9A94E]/40"
        variant="outline"
        onClick={() => setCurrentPage('documents')}
      >
        <Plus className="mr-1 h-3.5 w-3.5" />
        Solicitar documento personalizado
      </Button>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/*  CatalogPage                                                              */
/* -------------------------------------------------------------------------- */

export default function CatalogPage() {
  const { user, isVisitor, showLoginPage, hideLoginPage } = useAppStore()
  const { theme, setTheme } = useTheme()

  /* ---- State ---- */
  const [templates, setTemplates] = useState<Template[]>([])
  const [loading, setLoading] = useState(true)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  // Filters
  const [searchInput, setSearchInput] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')
  const [category, setCategory] = useState('all')
  const [legalArea, setLegalArea] = useState('all')
  const [audience, setAudience] = useState('all')
  const [priceFilter, setPriceFilter] = useState('all')

  // Dialog
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)

  // Debounce timer ref
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null)

  /* ---- Debounced search ---- */
  const updateDebouncedSearch = useCallback((value: string) => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current)
    }
    debounceTimerRef.current = setTimeout(() => {
      setDebouncedSearch(value)
    }, 300)
  }, [])

  // Sync search input to debounced value
  useEffect(() => {
    updateDebouncedSearch(searchInput)
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current)
      }
    }
  }, [searchInput, updateDebouncedSearch])

  /* ---- Fetch templates ---- */
  const fetchTemplates = useCallback(async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()

      if (category !== 'all') params.set('category', category)
      if (legalArea !== 'all') params.set('legalArea', legalArea)
      if (audience !== 'all') params.set('audience', audience)
      if (priceFilter === 'free') params.set('price', 'free')
      if (priceFilter === 'paid') params.set('price', 'paid')
      if (debouncedSearch.trim()) params.set('search', debouncedSearch.trim())

      const query = params.toString() ? `?${params.toString()}` : ''
      const headers: HeadersInit = {}
      if (user) headers['x-user-id'] = user.id
      const res = await fetch(`/api/templates${query}`, { headers })

      if (res.ok) {
        const data = await res.json()
        setTemplates(Array.isArray(data) ? data : data.templates || [])
      }
    } catch {
      // keep empty on error
    } finally {
      setLoading(false)
    }
  }, [user, category, legalArea, audience, priceFilter, debouncedSearch])

  useEffect(() => {
    fetchTemplates()
  }, [fetchTemplates])

  /* ---- Handlers ---- */
  const handleSelectTemplate = useCallback((template: Template) => {
    setSelectedTemplate(template)
    setDialogOpen(true)
  }, [])

  const handleDialogClose = useCallback((open: boolean) => {
    setDialogOpen(open)
    if (!open) {
      // Keep template reference for animation but can clear if desired
    }
  }, [])

  const hasActiveFilters =
    searchInput.trim() !== '' ||
    category !== 'all' ||
    legalArea !== 'all' ||
    audience !== 'all' ||
    priceFilter !== 'all'

  /* ---- Render ---- */
  return (
    <main className="min-h-screen bg-[#0A1628]">
      {/* Visitor header bar */}
      {isVisitor && (
        <div className="border-b border-border bg-card/80 backdrop-blur-sm">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center">
                  <Scale className="h-4 w-4 text-primary-foreground" />
                </div>
                <span className="text-sm font-bold text-foreground">LexDoc</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  if (theme === 'warm') setTheme('dark')
                  else if (theme === 'dark') setTheme('light')
                  else setTheme('warm')
                }}
                className="text-muted-foreground hover:text-foreground h-8 w-8 p-0"
              >
                {theme === 'dark' ? <Sun className="h-4 w-4" /> : theme === 'light' ? <Palette className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => { showLoginPage() }}
                className="border-primary/30 text-primary text-xs font-medium hover:bg-primary/10"
              >
                <LogIn className="mr-1.5 h-3.5 w-3.5" />
                Iniciar sesion
              </Button>
            </div>
          </div>
        </div>
      )}
      <div className="mx-auto max-w-7xl space-y-6 px-4 py-8 sm:px-6 lg:px-8">
        {/* ---------- Header ---------- */}
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
            {isVisitor ? 'Genera tu Documento Legal' : 'Catálogo de Plantillas'}
          </h1>
          <p className="mt-1 text-sm text-white/50">
            {isVisitor
              ? 'Selecciona una plantilla, completa los campos y envia tu solicitud por WhatsApp.'
              : 'Explora y genera documentos legales colombianos con plantillas profesionales.'}
          </p>
        </div>

        {/* ---------- Search bar ---------- */}
        <div className="relative">
          <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-white/30" />
          <Input
            placeholder="Buscar plantillas por nombre, tipo o palabra clave..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="h-11 w-full border-white/10 bg-[#0F1D32] pl-10 pr-4 text-sm text-white placeholder:text-white/30 focus-visible:border-[#C9A94E]/40 focus-visible:ring-[#C9A94E]/20"
          />
        </div>

        {/* ---------- Filters row ---------- */}
        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-3">
          {/* Category */}
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger
              className="w-full border-white/10 bg-[#0F1D32] text-white/70 text-xs sm:w-[155px]"
              size="sm"
            >
              <SelectValue placeholder="Categoría" />
            </SelectTrigger>
            <SelectContent className="border-white/10 bg-[#0F1D32]">
              <SelectItem value="all" className="text-white/70 focus:bg-[#C9A94E]/10 focus:text-[#C9A94E]">
                Todas
              </SelectItem>
              <SelectItem value="Contratos" className="text-white/70 focus:bg-[#C9A94E]/10 focus:text-[#C9A94E]">
                Contratos
              </SelectItem>
              <SelectItem value="Actas" className="text-white/70 focus:bg-[#C9A94E]/10 focus:text-[#C9A94E]">
                Actas
              </SelectItem>
              <SelectItem value="Derechos de Petición" className="text-white/70 focus:bg-[#C9A94E]/10 focus:text-[#C9A94E]">
                Derechos de Petición
              </SelectItem>
            </SelectContent>
          </Select>

          {/* Legal Area */}
          <Select value={legalArea} onValueChange={setLegalArea}>
            <SelectTrigger
              className="w-full border-white/10 bg-[#0F1D32] text-white/70 text-xs sm:w-[165px]"
              size="sm"
            >
              <SelectValue placeholder="Área del Derecho" />
            </SelectTrigger>
            <SelectContent className="border-white/10 bg-[#0F1D32]">
              <SelectItem value="all" className="text-white/70 focus:bg-[#C9A94E]/10 focus:text-[#C9A94E]">
                Todos
              </SelectItem>
              <SelectItem value="Civil" className="text-white/70 focus:bg-[#C9A94E]/10 focus:text-[#C9A94E]">
                Civil
              </SelectItem>
              <SelectItem value="Mercantil" className="text-white/70 focus:bg-[#C9A94E]/10 focus:text-[#C9A94E]">
                Mercantil
              </SelectItem>
              <SelectItem value="Laboral" className="text-white/70 focus:bg-[#C9A94E]/10 focus:text-[#C9A94E]">
                Laboral
              </SelectItem>
              <SelectItem value="Constitucional" className="text-white/70 focus:bg-[#C9A94E]/10 focus:text-[#C9A94E]">
                Constitucional
              </SelectItem>
            </SelectContent>
          </Select>

          {/* Audience */}
          <Select value={audience} onValueChange={setAudience}>
            <SelectTrigger
              className="w-full border-white/10 bg-[#0F1D32] text-white/70 text-xs sm:w-[155px]"
              size="sm"
            >
              <SelectValue placeholder="Audiencia" />
            </SelectTrigger>
            <SelectContent className="border-white/10 bg-[#0F1D32]">
              <SelectItem value="all" className="text-white/70 focus:bg-[#C9A94E]/10 focus:text-[#C9A94E]">
                Todos
              </SelectItem>
              <SelectItem value="Profesionales" className="text-white/70 focus:bg-[#C9A94E]/10 focus:text-[#C9A94E]">
                Profesionales
              </SelectItem>
              <SelectItem value="Particulares" className="text-white/70 focus:bg-[#C9A94E]/10 focus:text-[#C9A94E]">
                Particulares
              </SelectItem>
            </SelectContent>
          </Select>

          {/* Price */}
          <Select value={priceFilter} onValueChange={setPriceFilter}>
            <SelectTrigger
              className="w-full border-white/10 bg-[#0F1D32] text-white/70 text-xs sm:w-[135px]"
              size="sm"
            >
              <SelectValue placeholder="Precio" />
            </SelectTrigger>
            <SelectContent className="border-white/10 bg-[#0F1D32]">
              <SelectItem value="all" className="text-white/70 focus:bg-[#C9A94E]/10 focus:text-[#C9A94E]">
                Todos
              </SelectItem>
              <SelectItem value="free" className="text-white/70 focus:bg-[#C9A94E]/10 focus:text-[#C9A94E]">
                Gratuito
              </SelectItem>
              <SelectItem value="paid" className="text-white/70 focus:bg-[#C9A94E]/10 focus:text-[#C9A94E]">
                De Pago
              </SelectItem>
            </SelectContent>
          </Select>

          {/* Spacer */}
          <div className="flex-1" />

          {/* View toggle */}
          <ToggleGroup
            type="single"
            value={viewMode}
            onValueChange={(v) => {
              if (v) setViewMode(v as 'grid' | 'list')
            }}
            className="border-white/10 bg-[#0F1D32]"
          >
            <ToggleGroupItem
              value="grid"
              aria-label="Vista de cuadrícula"
              className="data-[state=on]:bg-[#C9A94E]/15 data-[state=on]:text-[#C9A94E] text-white/40 hover:bg-white/5 hover:text-white/60 h-8 w-8 rounded-l-md"
            >
              <LayoutGrid className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem
              value="list"
              aria-label="Vista de lista"
              className="data-[state=on]:bg-[#C9A94E]/15 data-[state=on]:text-[#C9A94E] text-white/40 hover:bg-white/5 hover:text-white/60 h-8 w-8 rounded-r-md"
            >
              <List className="h-4 w-4" />
            </ToggleGroupItem>
          </ToggleGroup>
        </div>

        {/* ---------- Results count ---------- */}
        <div className="flex items-center justify-between">
          <p className="text-xs text-white/40">
            {loading
              ? 'Cargando...'
              : `${templates.length} plantilla${templates.length !== 1 ? 's' : ''} encontrada${templates.length !== 1 ? 's' : ''}`}
          </p>
          {hasActiveFilters && (
            <button
              onClick={() => {
                setSearchInput('')
                setCategory('all')
                setLegalArea('all')
                setAudience('all')
                setPriceFilter('all')
              }}
              className="text-[11px] font-medium text-[#C9A94E]/70 transition-colors hover:text-[#C9A94E]"
            >
              Limpiar filtros
            </button>
          )}
        </div>

        {/* ---------- Content ---------- */}
        {loading ? (
          viewMode === 'grid' ? (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <SkeletonRow key={i} />
              ))}
            </div>
          )
        ) : templates.length === 0 ? (
          <EmptyState hasFilters={hasActiveFilters} />
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {templates.map((t) => (
              <TemplateCard key={t.id} template={t} onSelect={handleSelectTemplate} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {templates.map((t) => (
              <TemplateRow key={t.id} template={t} onSelect={handleSelectTemplate} />
            ))}
          </div>
        )}

        {/* ---------- Bottom CTA (logged-in only) ---------- */}
        {!isVisitor && (
        <div className="flex items-center justify-center pt-4">
          <button
            className="group flex items-center gap-3 rounded-xl border border-[#C9A94E]/15 bg-[#0F1D32]/60 px-6 py-4 text-left backdrop-blur-sm transition-all hover:border-[#C9A94E]/30 hover:bg-[#C9A94E]/5 hover:shadow-lg hover:shadow-[#C9A94E]/5"
          >
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#C9A94E]/15 text-[#C9A94E] transition-colors group-hover:bg-[#C9A94E]/25">
              <Plus className="h-5 w-5" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-white/80 group-hover:text-white">
                No encuentras lo que buscas?
              </p>
              <p className="text-xs text-white/40">
                Solicita un documento personalizado y nuestro equipo lo preparara para ti.
              </p>
            </div>
            <ArrowRight className="h-4 w-4 shrink-0 text-white/20 transition-transform group-hover:translate-x-0.5 group-hover:text-[#C9A94E]" />
          </button>
        </div>
        )}
      </div>

      {/* ---------- Detail Dialog ---------- */}
      <TemplateDetailDialog
        template={selectedTemplate}
        open={dialogOpen}
        onOpenChange={handleDialogClose}
      />
    </main>
  )
}
