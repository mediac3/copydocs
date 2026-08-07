'use client'

import { useEffect, useState, useCallback, useRef } from 'react'
import {
  Search,
  FileText,
  MoreVertical,
  Edit,
  Copy,
  Download,
  Archive,
  Trash2,
  Plus,
  FileCheck,
  FileEdit,
  FileArchive,
} from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Input } from '@/components/ui/input'
import { useAppStore } from '@/store/app-store'
import { toast } from 'sonner'

/* -------------------------------------------------------------------------- */
/*  Types                                                                    */
/* -------------------------------------------------------------------------- */

type DocumentStatus = 'draft' | 'completed' | 'archived'

interface DocumentTemplate {
  name: string
  category: string
}

interface Document {
  id: string
  title: string
  status: DocumentStatus
  createdAt: string
  updatedAt: string
  template: DocumentTemplate
}

type TabFilter = 'draft' | 'completed' | 'archived' | 'all'

/* -------------------------------------------------------------------------- */
/*  Helpers                                                                  */
/* -------------------------------------------------------------------------- */

const STATUS_BADGE_CONFIG: Record<
  DocumentStatus,
  { label: string; className: string }
> = {
  draft: {
    label: 'Borrador',
    className:
      'bg-yellow-500/15 text-yellow-400 border-yellow-500/25 hover:bg-yellow-500/25',
  },
  completed: {
    label: 'Completado',
    className:
      'bg-green-500/15 text-green-400 border-green-500/25 hover:bg-green-500/25',
  },
  archived: {
    label: 'Archivado',
    className:
      'bg-gray-500/15 text-gray-400 border-gray-500/25 hover:bg-gray-500/25',
  },
}

const TAB_CONFIG: Record<
  TabFilter,
  { label: string; emptyIcon: React.ElementType; emptyTitle: string; emptyDesc: string }
> = {
  draft: {
    label: 'Borradores',
    emptyIcon: FileEdit,
    emptyTitle: 'No hay borradores',
    emptyDesc:
      'Los documentos que inicies pero no completes aparecerán aquí.',
  },
  completed: {
    label: 'Completados',
    emptyIcon: FileCheck,
    emptyTitle: 'No hay documentos completados',
    emptyDesc:
      'Cuando finalices un documento, lo encontrarás en esta sección.',
  },
  archived: {
    label: 'Archivados',
    emptyIcon: FileArchive,
    emptyTitle: 'No hay documentos archivados',
    emptyDesc: 'Los documentos que archives se mostrarán aquí.',
  },
  all: {
    label: 'Todos',
    emptyIcon: FileText,
    emptyTitle: 'No hay documentos',
    emptyDesc: 'Crea tu primer documento para comenzar.',
  },
}

function formatDate(iso: string): string {
  try {
    const d = new Date(iso)
    return d.toLocaleDateString('es-CO', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    })
  } catch {
    return '—'
  }
}

function useDebounce<T>(value: T, delayMs: number): T {
  const [debounced, setDebounced] = useState(value)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => setDebounced(value), delayMs)
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [value, delayMs])

  return debounced
}

/* -------------------------------------------------------------------------- */
/*  Status Badge                                                             */
/* -------------------------------------------------------------------------- */

function StatusBadge({ status }: { status: DocumentStatus }) {
  const config = STATUS_BADGE_CONFIG[status]
  return (
    <Badge variant="outline" className={config.className}>
      {config.label}
    </Badge>
  )
}

/* -------------------------------------------------------------------------- */
/*  Empty State                                                              */
/* -------------------------------------------------------------------------- */

function EmptyState({ tab }: { tab: TabFilter }) {
  const config = TAB_CONFIG[tab]
  const Icon = config.emptyIcon
  return (
    <div className="flex flex-col items-center justify-center gap-4 rounded-xl border border-dashed border-white/10 px-6 py-16 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#C9A94E]/10">
        <Icon className="h-8 w-8 text-[#C9A94E]/60" />
      </div>
      <div className="space-y-1">
        <p className="text-sm font-semibold text-white/70">{config.emptyTitle}</p>
        <p className="max-w-sm text-xs text-white/40">{config.emptyDesc}</p>
      </div>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/*  Document Row Actions                                                     */
/* -------------------------------------------------------------------------- */

interface DocumentRowActionsProps {
  doc: Document
  onEdit: (doc: Document) => void
  onDuplicate: (doc: Document) => void
  onDownloadPdf: (doc: Document) => void
  onDownloadDocx: (doc: Document) => void
  onArchive: (doc: Document) => void
  onDelete: (doc: Document) => void
}

function DocumentRowActions({
  doc,
  onEdit,
  onDuplicate,
  onDownloadPdf,
  onDownloadDocx,
  onArchive,
  onDelete,
}: DocumentRowActionsProps) {
  const isDraft = doc.status === 'draft'
  const isCompleted = doc.status === 'completed'
  const isArchived = doc.status === 'archived'

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-white/40 hover:bg-white/5 hover:text-white/70"
        >
          <MoreVertical className="h-4 w-4" />
          <span className="sr-only">Acciones</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-48 border-white/10 bg-[#0F1D32]/95 backdrop-blur-sm"
      >
        {isDraft && (
          <DropdownMenuItem
            onClick={() => onEdit(doc)}
            className="text-white/70 focus:bg-white/5 focus:text-white cursor-pointer"
          >
            <Edit className="mr-2 h-4 w-4" />
            Editar
          </DropdownMenuItem>
        )}

        <DropdownMenuItem
          onClick={() => onDuplicate(doc)}
          className="text-white/70 focus:bg-white/5 focus:text-white cursor-pointer"
        >
          <Copy className="mr-2 h-4 w-4" />
          Duplicar
        </DropdownMenuItem>

        {isCompleted && (
          <>
            <DropdownMenuSeparator className="bg-white/10" />
            <DropdownMenuItem
              onClick={() => onDownloadPdf(doc)}
              className="text-white/70 focus:bg-white/5 focus:text-white cursor-pointer"
            >
              <Download className="mr-2 h-4 w-4" />
              Descargar PDF
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => onDownloadDocx(doc)}
              className="text-white/70 focus:bg-white/5 focus:text-white cursor-pointer"
            >
              <Download className="mr-2 h-4 w-4" />
              Descargar DOCX
            </DropdownMenuItem>
          </>
        )}

        <DropdownMenuSeparator className="bg-white/10" />
        <DropdownMenuItem
          onClick={() => onArchive(doc)}
          className="text-white/70 focus:bg-white/5 focus:text-white cursor-pointer"
        >
          <Archive className="mr-2 h-4 w-4" />
          {isArchived ? 'Desarchivar' : 'Archivar'}
        </DropdownMenuItem>

        <DropdownMenuSeparator className="bg-white/10" />
        <DropdownMenuItem
          onClick={() => onDelete(doc)}
          className="text-red-400/70 focus:bg-red-500/10 focus:text-red-400 cursor-pointer"
        >
          <Trash2 className="mr-2 h-4 w-4" />
          Eliminar
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

/* -------------------------------------------------------------------------- */
/*  Delete Confirmation Dialog                                                */
/* -------------------------------------------------------------------------- */

interface DeleteDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  docTitle: string
  onConfirm: () => void
  loading: boolean
}

function DeleteDialog({
  open,
  onOpenChange,
  docTitle,
  onConfirm,
  loading,
}: DeleteDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="border-white/10 bg-[#0F1D32] text-white sm:max-w-md">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-white">
            ¿Eliminar documento?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-white/50">
            Esta acción no se puede deshacer. Se eliminará permanentemente{' '}
            <span className="font-medium text-white/70">
              &quot;{docTitle}&quot;
            </span>
            .
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="gap-2 sm:gap-0">
          <AlertDialogCancel
            disabled={loading}
            className="border-white/10 bg-white/5 text-white/70 hover:bg-white/10 hover:text-white"
          >
            Cancelar
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={(e) => {
              e.preventDefault()
              onConfirm()
            }}
            disabled={loading}
            className="bg-red-600 text-white hover:bg-red-700 focus:ring-red-500"
          >
            {loading ? 'Eliminando…' : 'Eliminar'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

/* -------------------------------------------------------------------------- */
/*  DocumentsPage                                                            */
/* -------------------------------------------------------------------------- */

export default function DocumentsPage() {
  const { user, setCurrentPage, startWizard } = useAppStore()

  /* ---- State ---- */
  const [activeTab, setActiveTab] = useState<TabFilter>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const debouncedSearch = useDebounce(searchQuery, 300)
  const [documents, setDocuments] = useState<Document[]>([])
  const [loading, setLoading] = useState(true)

  /* Delete dialog */
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [docToDelete, setDocToDelete] = useState<Document | null>(null)
  const [deleting, setDeleting] = useState(false)

  /* Action loading helpers */
  const [actionLoading, setActionLoading] = useState<string | null>(null)

  /* ---- Fetch documents ---- */
  const fetchDocuments = useCallback(async () => {
    if (!user) return
    setLoading(true)
    try {
      const params = new URLSearchParams()
      params.set('status', activeTab)
      if (debouncedSearch.trim()) {
        params.set('search', debouncedSearch.trim())
      }
      const res = await fetch(`/api/documents?${params.toString()}`, {
        headers: { 'x-user-id': user.id },
      })
      if (!res.ok) throw new Error('Error fetching documents')
      const data = await res.json()
      setDocuments(Array.isArray(data) ? data : data.documents || [])
    } catch {
      toast.error('Error al cargar documentos')
    } finally {
      setLoading(false)
    }
  }, [user, activeTab, debouncedSearch])

  useEffect(() => {
    fetchDocuments()
  }, [fetchDocuments])

  /* ---- Filtered documents for client-side (API may not support search) ---- */
  const filteredDocuments = documents.filter((doc) => {
    if (!debouncedSearch.trim()) return true
    const q = debouncedSearch.toLowerCase()
    return (
      doc.title.toLowerCase().includes(q) ||
      doc.template?.name?.toLowerCase().includes(q) ||
      doc.template?.category?.toLowerCase().includes(q)
    )
  })

  /* ---- Action handlers ---- */

  const handleEdit = (doc: Document) => {
    // Edit opens wizard with existing document
    startWizard(doc.template?.name || '', doc.id)
  }

  const handleDuplicate = async (doc: Document) => {
    if (!user) return
    setActionLoading(doc.id)
    try {
      const res = await fetch('/api/documents', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-user-id': user.id,
        },
        body: JSON.stringify({
          duplicateFromId: doc.id,
        }),
      })
      if (!res.ok) throw new Error('Error duplicando documento')
      const newDoc = await res.json()
      toast.success('Documento duplicado', {
        description: `"${doc.title}" se copió como borrador.`,
      })
      // If we're on 'all' or 'draft', refetch to show new item
      if (activeTab === 'all' || activeTab === 'draft') {
        fetchDocuments()
      }
    } catch {
      toast.error('Error al duplicar', {
        description: 'No se pudo crear la copia del documento.',
      })
    } finally {
      setActionLoading(null)
    }
  }

  const handleDownloadPdf = async (doc: Document) => {
    setActionLoading(doc.id)
    try {
      const res = await fetch(
        `/api/documents/export?id=${doc.id}&format=pdf`,
        {
          headers: { 'x-user-id': user!.id },
        }
      )
      if (!res.ok) throw new Error('Error generando PDF')
      const blob = await res.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${doc.title}.pdf`
      document.body.appendChild(a)
      a.click()
      a.remove()
      URL.revokeObjectURL(url)
      toast.success('PDF descargado', {
        description: `"${doc.title}.pdf" se descargó correctamente.`,
      })
    } catch {
      toast.error('Error al descargar PDF')
    } finally {
      setActionLoading(null)
    }
  }

  const handleDownloadDocx = async (doc: Document) => {
    setActionLoading(doc.id)
    try {
      const res = await fetch(
        `/api/documents/export?id=${doc.id}&format=docx`,
        {
          headers: { 'x-user-id': user!.id },
        }
      )
      if (!res.ok) throw new Error('Error generando DOCX')
      const blob = await res.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${doc.title}.docx`
      document.body.appendChild(a)
      a.click()
      a.remove()
      URL.revokeObjectURL(url)
      toast.success('DOCX descargado', {
        description: `"${doc.title}.docx" se descargó correctamente.`,
      })
    } catch {
      toast.error('Error al descargar DOCX')
    } finally {
      setActionLoading(null)
    }
  }

  const handleArchive = async (doc: Document) => {
    if (!user) return
    const newStatus: DocumentStatus =
      doc.status === 'archived' ? 'draft' : 'archived'
    setActionLoading(doc.id)
    try {
      const res = await fetch('/api/documents', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-user-id': user.id,
        },
        body: JSON.stringify({
          id: doc.id,
          status: newStatus,
        }),
      })
      if (!res.ok) throw new Error('Error actualizando estado')
      toast.success(
        newStatus === 'archived'
          ? 'Documento archivado'
          : 'Documento desarchivado',
        {
          description: `"${doc.title}" ${
            newStatus === 'archived' ? 'se movió a archivados' : 'volvió a borradores'
          }.`,
        }
      )
      fetchDocuments()
    } catch {
      toast.error('Error al actualizar estado')
    } finally {
      setActionLoading(null)
    }
  }

  const handleDeleteRequest = (doc: Document) => {
    setDocToDelete(doc)
    setDeleteDialogOpen(true)
  }

  const handleDeleteConfirm = async () => {
    if (!user || !docToDelete) return
    setDeleting(true)
    try {
      const res = await fetch(
        `/api/documents?id=${docToDelete.id}`,
        {
          method: 'DELETE',
          headers: { 'x-user-id': user.id },
        }
      )
      if (!res.ok) throw new Error('Error eliminando documento')
      toast.success('Documento eliminado', {
        description: `"${docToDelete.title}" fue eliminado permanentemente.`,
      })
      setDeleteDialogOpen(false)
      setDocToDelete(null)
      fetchDocuments()
    } catch {
      toast.error('Error al eliminar documento')
    } finally {
      setDeleting(false)
    }
  }

  /* ---- Tab counts ---- */
  const tabCounts: Record<TabFilter, number> = {
    all: documents.length,
    draft: documents.filter((d) => d.status === 'draft').length,
    completed: documents.filter((d) => d.status === 'completed').length,
    archived: documents.filter((d) => d.status === 'archived').length,
  }

  /* ---- Render ---- */
  return (
    <main className="min-h-screen bg-[#0A1628]">
      <div className="mx-auto max-w-7xl space-y-6 px-4 py-8 sm:px-6 lg:px-8">
        {/* ---------- Header ---------- */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Mis Documentos
            </h1>
            <p className="mt-1 text-sm text-white/50">
              Gestiona, edita y descarga tus documentos legales.
            </p>
          </div>
          <Button
            onClick={() => setCurrentPage('catalog')}
            className="self-start bg-[#C9A94E] text-[#0A1628] font-semibold hover:bg-[#D4B965] focus-visible:ring-[#C9A94E]/50"
          >
            <Plus className="mr-2 h-4 w-4" />
            Nuevo Documento
          </Button>
        </div>

        {/* ---------- Search + Tabs ---------- */}
        <div className="space-y-4">
          {/* Search bar */}
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30" />
            <Input
              placeholder="Buscar por título, plantilla o categoría…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border-white/10 bg-[#0F1D32]/80 pl-10 text-white placeholder:text-white/30 focus-visible:ring-[#C9A94E]/30 focus-visible:border-[#C9A94E]/40"
            />
          </div>

          {/* Tabs */}
          <Tabs
            value={activeTab}
            onValueChange={(v) => setActiveTab(v as TabFilter)}
          >
            <TabsList className="border-white/10 bg-[#0F1D32]/80">
              {(['all', 'draft', 'completed', 'archived'] as TabFilter[]).map(
                (tab) => (
                  <TabsTrigger
                    key={tab}
                    value={tab}
                    className="data-[state=active]:bg-[#C9A94E]/15 data-[state=active]:text-[#C9A94E] text-white/50 data-[state=active]:shadow-none"
                  >
                    {TAB_CONFIG[tab].label}
                    <span className="ml-1.5 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-white/5 px-1.5 text-[10px] font-medium tabular-nums">
                      {loading ? '…' : tabCounts[tab]}
                    </span>
                  </TabsTrigger>
                )
              )}
            </TabsList>

            {/* Each tab renders the same content filtered by status */}
            {(['all', 'draft', 'completed', 'archived'] as TabFilter[]).map(
              (tab) => (
                <TabsContent key={tab} value={tab} className="mt-4">
                  {/* Loading skeleton */}
                  {loading ? (
                    <Card className="border-white/5 bg-[#0F1D32]/80">
                      <CardContent className="space-y-4 p-6">
                        {[1, 2, 3, 4, 5].map((i) => (
                          <div
                            key={i}
                            className="flex items-center gap-4 animate-pulse"
                          >
                            <div className="h-10 w-10 rounded-lg bg-white/5" />
                            <div className="flex-1 space-y-2">
                              <div className="h-4 w-3/4 rounded bg-white/5" />
                              <div className="h-3 w-1/2 rounded bg-white/5" />
                            </div>
                            <div className="h-6 w-20 rounded-full bg-white/5" />
                            <div className="h-6 w-6 rounded bg-white/5" />
                          </div>
                        ))}
                      </CardContent>
                    </Card>
                  ) : filteredDocuments.length === 0 ? (
                    <EmptyState tab={tab} />
                  ) : (
                    <Card className="overflow-hidden border-white/5 bg-[#0F1D32]/80 backdrop-blur-sm">
                      <CardContent className="p-0">
                        {/* Desktop table */}
                        <div className="hidden sm:block overflow-x-auto">
                          <table className="w-full text-left text-sm">
                            <thead>
                              <tr className="border-b border-white/5">
                                <th className="whitespace-nowrap px-5 py-3 text-xs font-medium uppercase tracking-wider text-white/30">
                                  Documento
                                </th>
                                <th className="whitespace-nowrap px-5 py-3 text-xs font-medium uppercase tracking-wider text-white/30 hidden md:table-cell">
                                  Plantilla / Categoría
                                </th>
                                <th className="whitespace-nowrap px-5 py-3 text-xs font-medium uppercase tracking-wider text-white/30 hidden lg:table-cell">
                                  Creado
                                </th>
                                <th className="whitespace-nowrap px-5 py-3 text-xs font-medium uppercase tracking-wider text-white/30 hidden lg:table-cell">
                                  Modificado
                                </th>
                                <th className="whitespace-nowrap px-5 py-3 text-xs font-medium uppercase tracking-wider text-white/30">
                                  Estado
                                </th>
                                <th className="relative px-5 py-3 w-10">
                                  <span className="sr-only">Acciones</span>
                                </th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                              {filteredDocuments.map((doc) => (
                                <tr
                                  key={doc.id}
                                  className="group transition-colors hover:bg-white/[0.02]"
                                >
                                  {/* Title */}
                                  <td className="max-w-[260px] px-5 py-3.5">
                                    <div className="flex items-center gap-3">
                                      <div
                                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
                                          doc.status === 'draft'
                                            ? 'bg-yellow-500/10 text-yellow-400/60'
                                            : doc.status === 'completed'
                                              ? 'bg-green-500/10 text-green-400/60'
                                              : 'bg-gray-500/10 text-gray-400/60'
                                        }`}
                                      >
                                        <FileText className="h-4 w-4" />
                                      </div>
                                      <div className="min-w-0">
                                        <p className="truncate text-sm font-medium text-white/80 group-hover:text-white">
                                          {doc.title}
                                        </p>
                                        <p className="mt-0.5 truncate text-xs text-white/30 md:hidden">
                                          {doc.template?.name} · {doc.template?.category}
                                        </p>
                                      </div>
                                    </div>
                                  </td>

                                  {/* Template / Category */}
                                  <td className="whitespace-nowrap px-5 py-3.5 hidden md:table-cell">
                                    <p className="text-sm text-white/60">
                                      {doc.template?.name || '—'}
                                    </p>
                                    <p className="text-xs text-white/30">
                                      {doc.template?.category || '—'}
                                    </p>
                                  </td>

                                  {/* Created */}
                                  <td className="whitespace-nowrap px-5 py-3.5 text-xs text-white/40 hidden lg:table-cell">
                                    {formatDate(doc.createdAt)}
                                  </td>

                                  {/* Modified */}
                                  <td className="whitespace-nowrap px-5 py-3.5 text-xs text-white/40 hidden lg:table-cell">
                                    {formatDate(doc.updatedAt)}
                                  </td>

                                  {/* Status */}
                                  <td className="whitespace-nowrap px-5 py-3.5">
                                    <StatusBadge status={doc.status} />
                                  </td>

                                  {/* Actions */}
                                  <td className="px-5 py-3.5">
                                    {actionLoading === doc.id ? (
                                      <div className="flex h-8 w-8 items-center justify-center">
                                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-[#C9A94E]/30 border-t-[#C9A94E]" />
                                      </div>
                                    ) : (
                                      <DocumentRowActions
                                        doc={doc}
                                        onEdit={handleEdit}
                                        onDuplicate={handleDuplicate}
                                        onDownloadPdf={handleDownloadPdf}
                                        onDownloadDocx={handleDownloadDocx}
                                        onArchive={handleArchive}
                                        onDelete={handleDeleteRequest}
                                      />
                                    )}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>

                        {/* Mobile card list */}
                        <div className="block sm:hidden divide-y divide-white/5">
                          {filteredDocuments.map((doc) => (
                            <div
                              key={doc.id}
                              className="flex items-start gap-3 p-4"
                            >
                              <div
                                className={`mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${
                                  doc.status === 'draft'
                                    ? 'bg-yellow-500/10 text-yellow-400/60'
                                    : doc.status === 'completed'
                                      ? 'bg-green-500/10 text-green-400/60'
                                      : 'bg-gray-500/10 text-gray-400/60'
                                }`}
                              >
                                <FileText className="h-5 w-5" />
                              </div>
                              <div className="min-w-0 flex-1">
                                <p className="truncate text-sm font-medium text-white/80">
                                  {doc.title}
                                </p>
                                <p className="mt-0.5 text-xs text-white/40">
                                  {doc.template?.name}
                                </p>
                                <div className="mt-2 flex flex-wrap items-center gap-2">
                                  <StatusBadge status={doc.status} />
                                  <span className="text-[11px] text-white/30">
                                    {formatDate(doc.updatedAt)}
                                  </span>
                                </div>
                              </div>
                              <div className="shrink-0">
                                {actionLoading === doc.id ? (
                                  <div className="flex h-8 w-8 items-center justify-center">
                                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-[#C9A94E]/30 border-t-[#C9A94E]" />
                                  </div>
                                ) : (
                                  <DocumentRowActions
                                    doc={doc}
                                    onEdit={handleEdit}
                                    onDuplicate={handleDuplicate}
                                    onDownloadPdf={handleDownloadPdf}
                                    onDownloadDocx={handleDownloadDocx}
                                    onArchive={handleArchive}
                                    onDelete={handleDeleteRequest}
                                  />
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </TabsContent>
              )
            )}
          </Tabs>
        </div>

        {/* ---------- Footer summary ---------- */}
        {!loading && documents.length > 0 && (
          <p className="text-center text-xs text-white/25">
            Mostrando {filteredDocuments.length} de{' '}
            {documents.length} documento
            {documents.length !== 1 ? 's' : ''}
            {debouncedSearch.trim() && (
              <span>
                {' '}
                para &quot;{debouncedSearch.trim()}&quot;
              </span>
            )}
          </p>
        )}
      </div>

      {/* ---------- Delete Confirmation Dialog ---------- */}
      <DeleteDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        docTitle={docToDelete?.title || ''}
        onConfirm={handleDeleteConfirm}
        loading={deleting}
      />
    </main>
  )
}
