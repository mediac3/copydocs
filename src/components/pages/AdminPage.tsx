'use client'

import { useEffect, useState, useCallback } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import {
  Users,
  FileText,
  BookOpen,
  Layout,
  Settings,
  CreditCard,
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
import { useAppStore } from '@/store/app-store'

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
  status: 'borrador' | 'en_revision' | 'publicado' | 'desactivado'
  price: number
  documentCount: number
  description?: string
  audience?: string
  baseContent?: string
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
  subscription: string
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

interface Plan {
  id: string
  name: string
  price: number
  interval: string
  features: string[]
  popular?: boolean
}

interface NewTemplateForm {
  name: string
  description: string
  category: string
  legalArea: string
  audience: string
  price: string
  baseContent: string
  status: string
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
  borrador: { label: 'Borrador', className: 'bg-yellow-500/15 text-yellow-400 border-yellow-500/25' },
  en_revision: { label: 'En revisión', className: 'bg-blue-500/15 text-blue-400 border-blue-500/25' },
  publicado: { label: 'Publicado', className: 'bg-green-500/15 text-green-400 border-green-500/25' },
  desactivado: { label: 'Desactivado', className: 'bg-gray-500/15 text-gray-400 border-gray-500/25' },
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

export default function AdminPage() {
  const { user } = useAppStore()
  const [activeTab, setActiveTab] = useState('resumen')

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
    price: '', baseContent: '', status: 'borrador',
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

  /* ---- Plans state ---- */
  const [plans, setPlans] = useState<Plan[]>([])
  const [loadingPlans, setLoadingPlans] = useState(true)
  const [editingPlan, setEditingPlan] = useState<Plan | null>(null)
  const [planPrice, setPlanPrice] = useState('')

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
        setStats({
          totalUsers: data.totalUsers ?? 0,
          totalDocuments: data.totalDocuments ?? 0,
          activeTemplates: data.activeTemplates ?? 0,
          totalRevenue: data.totalRevenue ?? 0,
          documentsByMonth: data.documentsByMonth ?? [],
          topTemplates: data.topTemplates ?? [],
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
        headers: { 'x-admin-export': 'lexdoc-admin-export' },
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

  const fetchPlans = useCallback(async () => {
    setLoadingPlans(true)
    try {
      const res = await fetch('/api/plans', { headers: authHeaders() })
      if (res.ok) {
        const data = await res.json()
        setPlans(Array.isArray(data) ? data : data.plans || [])
      }
    } catch {
      // keep empty on error
    } finally {
      setLoadingPlans(false)
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
    if (activeTab === 'precios') fetchPlans()
  }, [activeTab, fetchPlans])

  /* ========================================================================== */
  /*  ACTION HANDLERS                                                           */
  /* ========================================================================== */

  /* ---- Template actions ---- */
  const handleOpenTemplateDialog = (template?: Template) => {
    if (template) {
      setEditingTemplate(template)
      setTemplateForm({
        name: template.name,
        description: template.description || '',
        category: template.category,
        legalArea: template.legalArea,
        audience: template.audience || '',
        price: String(template.price),
        baseContent: template.baseContent || '',
        status: template.status,
      })
    } else {
      setEditingTemplate(null)
      setTemplateForm({ name: '', description: '', category: '', legalArea: '', audience: '', price: '', baseContent: '', status: 'borrador' })
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
        action: editingTemplate ? 'update_template_status' : 'create_template',
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

  /* ---- Plan actions ---- */
  const handleOpenEditPlan = (plan: Plan) => {
    setEditingPlan(plan)
    setPlanPrice(String(plan.price))
  }

  const handleSavePlanPrice = async () => {
    if (!editingPlan) return
    try {
      const res = await fetch('/api/admin', {
        method: 'POST',
        headers: authHeaders(),
        body: JSON.stringify({ action: 'update_plan', planId: editingPlan.id, price: Number(planPrice) || 0 }),
      })
      if (res.ok) {
        toast.success('Precio actualizado')
        setEditingPlan(null)
        fetchPlans()
      } else {
        toast.error('Error al actualizar precio')
      }
    } catch {
      toast.error('Error de conexión')
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
    { value: 'precios', label: 'Precios', icon: CreditCard },
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
            Gestiona plantillas, cláusulas, usuarios y más en LexDoc.
          </p>
        </div>

        {/* ---------- Tabs Layout ---------- */}
        <div className="flex flex-col gap-6 lg:flex-row">
          {/* Vertical nav on lg, horizontal on mobile */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="flex w-full flex-col lg:flex-row">
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
                    icon={<CreditCard className="h-5 w-5" />}
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
                      <Textarea
                        value={templateForm.baseContent}
                        onChange={(e) => setTemplateForm((f) => ({ ...f, baseContent: e.target.value }))}
                        placeholder="Contenido base de la plantilla..."
                        rows={8}
                        className="border-white/10 bg-white/5 text-white placeholder:text-white/30"
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
                              <TableHead className="hidden text-xs font-medium uppercase tracking-wider text-white/30 sm:table-cell">Suscripción</TableHead>
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
                                <TableCell className="hidden text-white/40 sm:table-cell">{u.subscription || '—'}</TableCell>
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
            {/*  6. CONFIGURACIÓN DE PRECIOS                                */}
            {/* ============================================================ */}
            <TabsContent value="precios" className="mt-0 flex-1 lg:ml-6">
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-semibold text-white">Configuración de Precios</h2>
                  <p className="text-xs text-white/40">Gestiona los planes de suscripción</p>
                </div>

                {loadingPlans ? (
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {Array.from({ length: 3 }).map((_, i) => (
                      <div key={i} className="h-64 animate-pulse rounded-xl border border-white/5 bg-white/[0.03]" />
                    ))}
                  </div>
                ) : plans.length > 0 ? (
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {plans.map((plan) => (
                      <Card
                        key={plan.id}
                        className={`relative border ${plan.popular ? 'border-[#C9A94E]/40' : 'border-white/5'} bg-[#0F1D32]/80 backdrop-blur-sm transition-shadow hover:shadow-lg hover:shadow-[#C9A94E]/5`}
                      >
                        {plan.popular && (
                          <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                            <Badge className="bg-[#C9A94E] text-[#0A1628] border-0 font-semibold">
                              Popular
                            </Badge>
                          </div>
                        )}
                        <CardHeader className="pb-3 pt-6">
                          <CardTitle className="text-base font-semibold text-white">{plan.name}</CardTitle>
                          <div className="mt-2">
                            {editingPlan?.id === plan.id ? (
                              <div className="flex items-center gap-2">
                                <Input
                                  type="number"
                                  value={planPrice}
                                  onChange={(e) => setPlanPrice(e.target.value)}
                                  className="h-9 w-32 border-white/10 bg-white/5 text-lg font-bold text-white"
                                />
                                <Button size="sm" onClick={handleSavePlanPrice} className="h-9 bg-[#C9A94E] text-[#0A1628] hover:bg-[#D4B965]">
                                  <Check className="h-4 w-4" />
                                </Button>
                                <Button size="sm" variant="ghost" onClick={() => setEditingPlan(null)} className="h-9 text-white/50 hover:text-white hover:bg-white/5">
                                  <X className="h-4 w-4" />
                                </Button>
                              </div>
                            ) : (
                              <button
                                onClick={() => handleOpenEditPlan(plan)}
                                className="group flex items-baseline gap-1"
                              >
                                <span className="text-3xl font-bold text-white">{formatCurrency(plan.price)}</span>
                                <span className="text-xs text-white/40">/{plan.interval}</span>
                                <Edit className="ml-2 h-3.5 w-3.5 text-white/20 transition-colors group-hover:text-[#C9A94E]" />
                              </button>
                            )}
                          </div>
                        </CardHeader>
                        <CardContent className="pt-0">
                          <ul className="space-y-2.5">
                            {plan.features.map((feature, idx) => (
                              <li key={idx} className="flex items-start gap-2 text-sm text-white/60">
                                <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#C9A94E]" />
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <EmptyState icon={CreditCard} message="No hay planes de suscripción configurados" />
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </main>
  )
}