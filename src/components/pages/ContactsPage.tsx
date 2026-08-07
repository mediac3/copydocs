'use client'

import { useEffect, useState, useCallback, useRef } from 'react'
import {
  Search,
  Plus,
  Edit,
  Trash2,
  User,
  Building,
  MapPin,
  Phone,
  Mail,
  FileText,
  Users,
} from 'lucide-react'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
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
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { useAppStore } from '@/store/app-store'
import { toast } from 'sonner'

/* -------------------------------------------------------------------------- */
/*  Types                                                                    */
/* -------------------------------------------------------------------------- */

interface Contact {
  id: string
  name: string
  contactType: string
  documentType: string
  documentNumber: string
  address: string
  city: string
  phone: string
  email: string
  companyName: string
  notes: string
  createdAt: string
  updatedAt: string
}

type ContactTabFilter =
  | 'all'
  | 'Propietario'
  | 'Arrendatario'
  | 'Empleado'
  | 'Empresa'
  | 'Fiador'
  | 'Notario'
  | 'Abogado'
  | 'Otro'

type TabKey =
  | 'all'
  | 'Propietario'
  | 'Arrendatario'
  | 'Empleado'
  | 'Empresa'
  | 'Fiador'
  | 'Otro'

/* -------------------------------------------------------------------------- */
/*  Constants                                                                */
/* -------------------------------------------------------------------------- */

const CONTACT_TYPE_OPTIONS = [
  { value: 'Propietario', label: 'Propietario' },
  { value: 'Arrendatario', label: 'Arrendatario' },
  { value: 'Empleado', label: 'Empleado' },
  { value: 'Empresa', label: 'Empresa' },
  { value: 'Fiador', label: 'Fiador' },
  { value: 'Notario', label: 'Notario' },
  { value: 'Abogado', label: 'Abogado' },
  { value: 'Otro', label: 'Otro' },
] as const

const DOCUMENT_TYPE_OPTIONS = [
  { value: 'CC', label: 'CC' },
  { value: 'NIT', label: 'NIT' },
  { value: 'CE', label: 'CE' },
  { value: 'Pasaporte', label: 'Pasaporte' },
] as const

const TAB_CONFIG: Record<
  TabKey,
  { label: string; apiValue?: string }
> = {
  all: { label: 'Todos' },
  Propietario: { label: 'Propietarios', apiValue: 'Propietario' },
  Arrendatario: { label: 'Arrendatarios', apiValue: 'Arrendatario' },
  Empleado: { label: 'Empleados', apiValue: 'Empleado' },
  Empresa: { label: 'Empresas', apiValue: 'Empresa' },
  Fiador: { label: 'Fiadores', apiValue: 'Fiador' },
  Otro: { label: 'Otros', apiValue: 'Otro' },
}

const TYPE_BADGE_COLORS: Record<string, string> = {
  Propietario:
    'bg-blue-500/15 text-blue-400 border-blue-500/25 hover:bg-blue-500/25',
  Arrendatario:
    'bg-emerald-500/15 text-emerald-400 border-emerald-500/25 hover:bg-emerald-500/25',
  Empleado:
    'bg-violet-500/15 text-violet-400 border-violet-500/25 hover:bg-violet-500/25',
  Empresa:
    'bg-amber-500/15 text-amber-400 border-amber-500/25 hover:bg-amber-500/25',
  Fiador:
    'bg-rose-500/15 text-rose-400 border-rose-500/25 hover:bg-rose-500/25',
  Notario:
    'bg-cyan-500/15 text-cyan-400 border-cyan-500/25 hover:bg-cyan-500/25',
  Abogado:
    'bg-indigo-500/15 text-indigo-400 border-indigo-500/25 hover:bg-indigo-500/25',
  Otro: 'bg-gray-500/15 text-gray-400 border-gray-500/25 hover:bg-gray-500/25',
}

const EMPTY_FORM: Omit<Contact, 'id' | 'createdAt' | 'updatedAt'> = {
  name: '',
  contactType: '',
  documentType: '',
  documentNumber: '',
  address: '',
  city: '',
  phone: '',
  email: '',
  companyName: '',
  notes: '',
}

/* -------------------------------------------------------------------------- */
/*  Helpers                                                                  */
/* -------------------------------------------------------------------------- */

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
/*  Empty State                                                              */
/* -------------------------------------------------------------------------- */

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 rounded-xl border border-dashed border-white/10 px-6 py-16 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#C9A94E]/10">
        <Users className="h-8 w-8 text-[#C9A94E]/60" />
      </div>
      <div className="space-y-1">
        <p className="text-sm font-semibold text-white/70">
          No hay contactos
        </p>
        <p className="max-w-sm text-xs text-white/40">
          Agrega tu primer contacto para comenzar a usarlo en tus documentos
          legales.
        </p>
      </div>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/*  Contact Card                                                             */
/* -------------------------------------------------------------------------- */

function ContactCard({
  contact,
  onEdit,
  onDelete,
}: {
  contact: Contact
  onEdit: (c: Contact) => void
  onDelete: (c: Contact) => void
}) {
  const badgeColor =
    TYPE_BADGE_COLORS[contact.contactType] ?? TYPE_BADGE_COLORS.Otro

  return (
    <Card className="group relative border-white/[0.06] bg-[#0F1D32]/80 backdrop-blur-sm transition-all duration-200 hover:border-[#C9A94E]/20 hover:bg-[#0F1D32]">
      <CardContent className="p-5">
        {/* Header: name + badge */}
        <div className="mb-3 flex items-start justify-between gap-2">
          <h3 className="text-[15px] font-semibold leading-tight text-white/90 cursor-pen">
            {contact.name}
          </h3>
          <Badge variant="outline" className={`shrink-0 text-[10px] font-medium ${badgeColor}`}>
            {contact.contactType}
          </Badge>
        </div>

        {/* Document */}
        {contact.documentType && contact.documentNumber && (
          <div className="mb-2 flex items-center gap-1.5 text-xs text-white/40">
            <FileText className="h-3.5 w-3.5 shrink-0" />
            <span>
              {contact.documentType}{' '}
              <span className="cursor-pen text-white/55">
                {contact.documentNumber}
              </span>
            </span>
          </div>
        )}

        {/* Details */}
        <div className="mb-4 space-y-1.5">
          {contact.companyName && (
            <div className="flex items-center gap-1.5 text-xs text-white/40">
              <Building className="h-3.5 w-3.5 shrink-0" />
              <span className="cursor-pen text-white/55">
                {contact.companyName}
              </span>
            </div>
          )}
          {contact.city && (
            <div className="flex items-center gap-1.5 text-xs text-white/40">
              <MapPin className="h-3.5 w-3.5 shrink-0" />
              <span className="cursor-pen text-white/55">{contact.city}</span>
            </div>
          )}
          {contact.phone && (
            <div className="flex items-center gap-1.5 text-xs text-white/40">
              <Phone className="h-3.5 w-3.5 shrink-0" />
              <span className="cursor-pen text-white/55">
                {contact.phone}
              </span>
            </div>
          )}
          {contact.email && (
            <div className="flex items-center gap-1.5 text-xs text-white/40">
              <Mail className="h-3.5 w-3.5 shrink-0" />
              <span className="cursor-pen text-white/55">
                {contact.email}
              </span>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1 border-t border-white/[0.06] pt-3">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-white/30 transition-colors hover:bg-white/5 hover:text-[#C9A94E]"
            onClick={() => onEdit(contact)}
          >
            <Edit className="h-4 w-4" />
            <span className="sr-only">Editar</span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-white/30 transition-colors hover:bg-red-500/10 hover:text-red-400"
            onClick={() => onDelete(contact)}
          >
            <Trash2 className="h-4 w-4" />
            <span className="sr-only">Eliminar</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

/* -------------------------------------------------------------------------- */
/*  Contact Form Dialog                                                      */
/* -------------------------------------------------------------------------- */

interface ContactFormData extends Omit<Contact, 'id' | 'createdAt' | 'updatedAt'> {
  id?: string
}

function ContactFormDialog({
  open,
  onOpenChange,
  contact,
  onSave,
  saving,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  contact: Contact | null
  onSave: (data: ContactFormData) => Promise<void>
  saving: boolean
}) {
  const isEdit = !!contact
  const [form, setForm] = useState<ContactFormData>(() => contact ? {
    id: contact.id,
    name: contact.name,
    contactType: contact.contactType,
    documentType: contact.documentType,
    documentNumber: contact.documentNumber,
    address: contact.address,
    city: contact.city,
    phone: contact.phone,
    email: contact.email,
    companyName: contact.companyName,
    notes: contact.notes,
  } : EMPTY_FORM)

  const set = (field: keyof typeof form, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }))

  const isValid = form.name.trim().length > 0

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isValid || saving) return
    await onSave(form)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto border-white/10 bg-[#0F1D32] text-white sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-white">
            {isEdit ? 'Editar contacto' : 'Nuevo contacto'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor="contact-name" className="text-white/60">
              Nombre <span className="text-red-400">*</span>
            </Label>
            <Input
              id="contact-name"
              value={form.name}
              onChange={(e) => set('name', e.target.value)}
              placeholder="Nombre completo o razón social"
              className="border-white/10 bg-white/5 text-white placeholder:text-white/25 focus-visible:border-[#C9A94E]/50 focus-visible:ring-[#C9A94E]/20"
            />
          </div>

          {/* Type + Document row */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label htmlFor="contact-type" className="text-white/60">
                Tipo de contacto
              </Label>
              <Select
                value={form.contactType}
                onValueChange={(v) => set('contactType', v)}
              >
                <SelectTrigger className="border-white/10 bg-white/5 text-white focus:ring-[#C9A94E]/20">
                  <SelectValue placeholder="Seleccionar" />
                </SelectTrigger>
                <SelectContent className="border-white/10 bg-[#0A1628] text-white">
                  {CONTACT_TYPE_OPTIONS.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="doc-type" className="text-white/60">
                Tipo de documento
              </Label>
              <Select
                value={form.documentType}
                onValueChange={(v) => set('documentType', v)}
              >
                <SelectTrigger className="border-white/10 bg-white/5 text-white focus:ring-[#C9A94E]/20">
                  <SelectValue placeholder="Seleccionar" />
                </SelectTrigger>
                <SelectContent className="border-white/10 bg-[#0A1628] text-white">
                  {DOCUMENT_TYPE_OPTIONS.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Document number */}
          <div className="space-y-2">
            <Label htmlFor="doc-number" className="text-white/60">
              Número de documento
            </Label>
            <Input
              id="doc-number"
              value={form.documentNumber}
              onChange={(e) => set('documentNumber', e.target.value)}
              placeholder="Ej. 1234567890"
              className="border-white/10 bg-white/5 text-white placeholder:text-white/25 focus-visible:border-[#C9A94E]/50 focus-visible:ring-[#C9A94E]/20"
            />
          </div>

          {/* Address + City row */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label htmlFor="contact-address" className="text-white/60">
                Dirección
              </Label>
              <Input
                id="contact-address"
                value={form.address}
                onChange={(e) => set('address', e.target.value)}
                placeholder="Calle, carrera, nro."
                className="border-white/10 bg-white/5 text-white placeholder:text-white/25 focus-visible:border-[#C9A94E]/50 focus-visible:ring-[#C9A94E]/20"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="contact-city" className="text-white/60">
                Ciudad
              </Label>
              <Input
                id="contact-city"
                value={form.city}
                onChange={(e) => set('city', e.target.value)}
                placeholder="Ej. Bogotá"
                className="border-white/10 bg-white/5 text-white placeholder:text-white/25 focus-visible:border-[#C9A94E]/50 focus-visible:ring-[#C9A94E]/20"
              />
            </div>
          </div>

          {/* Phone + Email row */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label htmlFor="contact-phone" className="text-white/60">
                Teléfono
              </Label>
              <Input
                id="contact-phone"
                value={form.phone}
                onChange={(e) => set('phone', e.target.value)}
                placeholder="+57 300 123 4567"
                className="border-white/10 bg-white/5 text-white placeholder:text-white/25 focus-visible:border-[#C9A94E]/50 focus-visible:ring-[#C9A94E]/20"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="contact-email" className="text-white/60">
                Correo electrónico
              </Label>
              <Input
                id="contact-email"
                type="email"
                value={form.email}
                onChange={(e) => set('email', e.target.value)}
                placeholder="correo@ejemplo.com"
                className="border-white/10 bg-white/5 text-white placeholder:text-white/25 focus-visible:border-[#C9A94E]/50 focus-visible:ring-[#C9A94E]/20"
              />
            </div>
          </div>

          {/* Company name */}
          <div className="space-y-2">
            <Label htmlFor="company-name" className="text-white/60">
              Nombre de la empresa
            </Label>
            <Input
              id="company-name"
              value={form.companyName}
              onChange={(e) => set('companyName', e.target.value)}
              placeholder="Razón social (opcional)"
              className="border-white/10 bg-white/5 text-white placeholder:text-white/25 focus-visible:border-[#C9A94E]/50 focus-visible:ring-[#C9A94E]/20"
            />
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <Label htmlFor="contact-notes" className="text-white/60">
              Notas
            </Label>
            <Textarea
              id="contact-notes"
              value={form.notes}
              onChange={(e) => set('notes', e.target.value)}
              placeholder="Notas adicionales sobre el contacto..."
              rows={3}
              className="border-white/10 bg-white/5 text-white placeholder:text-white/25 focus-visible:border-[#C9A94E]/50 focus-visible:ring-[#C9A94E]/20 resize-none"
            />
          </div>

          {/* Footer buttons */}
          <DialogFooter className="gap-2 pt-2 sm:gap-0">
            <Button
              type="button"
              variant="ghost"
              disabled={saving}
              onClick={() => onOpenChange(false)}
              className="border-white/10 bg-white/5 text-white/70 hover:bg-white/10 hover:text-white"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={!isValid || saving}
              className="bg-[#C9A94E] text-[#0A1628] font-semibold hover:bg-[#B8983E] focus:ring-[#C9A94E]/50 disabled:opacity-50"
            >
              {saving
                ? isEdit
                  ? 'Guardando…'
                  : 'Creando…'
                : isEdit
                  ? 'Guardar cambios'
                  : 'Crear contacto'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

/* -------------------------------------------------------------------------- */
/*  Delete Confirmation Dialog                                                */
/* -------------------------------------------------------------------------- */

function DeleteDialog({
  open,
  onOpenChange,
  contactName,
  onConfirm,
  loading,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  contactName: string
  onConfirm: () => void
  loading: boolean
}) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="border-white/10 bg-[#0F1D32] text-white sm:max-w-md">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-white">
            ¿Eliminar contacto?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-white/50">
            Esta acción no se puede deshacer. Se eliminará permanentemente{' '}
            <span className="font-medium text-white/70">
              &quot;{contactName}&quot;
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
/*  ContactsPage                                                             */
/* -------------------------------------------------------------------------- */

export default function ContactsPage() {
  const { user } = useAppStore()

  /* ---- State ---- */
  const [activeTab, setActiveTab] = useState<TabKey>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const debouncedSearch = useDebounce(searchQuery, 300)
  const [contacts, setContacts] = useState<Contact[]>([])
  const [loading, setLoading] = useState(true)

  /* Form dialog */
  const [formDialogOpen, setFormDialogOpen] = useState(false)
  const [editingContact, setEditingContact] = useState<Contact | null>(null)
  const [saving, setSaving] = useState(false)

  /* Delete dialog */
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [contactToDelete, setContactToDelete] = useState<Contact | null>(null)
  const [deleting, setDeleting] = useState(false)

  /* ---- Fetch contacts ---- */
  const fetchContacts = useCallback(async () => {
    if (!user) return
    setLoading(true)
    try {
      const params = new URLSearchParams()
      const tabConfig = TAB_CONFIG[activeTab]
      if (tabConfig.apiValue) {
        params.set('type', tabConfig.apiValue)
      }
      if (debouncedSearch.trim()) {
        params.set('search', debouncedSearch.trim())
      }
      const res = await fetch(`/api/contacts?${params.toString()}`, {
        headers: { 'x-user-id': user.id },
      })
      if (!res.ok) throw new Error('Error fetching contacts')
      const data = await res.json()
      setContacts(Array.isArray(data) ? data : data.contacts || [])
    } catch {
      toast.error('Error al cargar contactos')
    } finally {
      setLoading(false)
    }
  }, [user, activeTab, debouncedSearch])

  useEffect(() => {
    fetchContacts()
  }, [fetchContacts])

  /* ---- Client-side search fallback ---- */
  const filteredContacts = contacts.filter((c) => {
    if (!debouncedSearch.trim()) return true
    const q = debouncedSearch.toLowerCase()
    return (
      c.name.toLowerCase().includes(q) ||
      c.contactType.toLowerCase().includes(q) ||
      c.documentNumber.toLowerCase().includes(q) ||
      c.companyName.toLowerCase().includes(q) ||
      c.city.toLowerCase().includes(q) ||
      c.email.toLowerCase().includes(q)
    )
  })

  /* ---- Create / Update ---- */
  const handleSave = async (formData: ContactFormData) => {
    if (!user) return
    setSaving(true)
    try {
      const isEdit = !!formData.id
      const method = isEdit ? 'PUT' : 'POST'
      const res = await fetch('/api/contacts', {
        method,
        headers: {
          'Content-Type': 'application/json',
          'x-user-id': user.id,
        },
        body: JSON.stringify(formData),
      })
      if (!res.ok) throw new Error('Error saving contact')
      toast.success(
        isEdit
          ? 'Contacto actualizado correctamente'
          : 'Contacto creado correctamente'
      )
      setFormDialogOpen(false)
      setEditingContact(null)
      fetchContacts()
    } catch {
      toast.error('Error al guardar el contacto')
    } finally {
      setSaving(false)
    }
  }

  /* ---- Delete ---- */
  const handleDelete = async () => {
    if (!user || !contactToDelete) return
    setDeleting(true)
    try {
      const res = await fetch(
        `/api/contacts?id=${contactToDelete.id}`,
        {
          method: 'DELETE',
          headers: { 'x-user-id': user.id },
        }
      )
      if (!res.ok) throw new Error('Error deleting contact')
      toast.success('Contacto eliminado correctamente')
      setDeleteDialogOpen(false)
      setContactToDelete(null)
      fetchContacts()
    } catch {
      toast.error('Error al eliminar el contacto')
    } finally {
      setDeleting(false)
    }
  }

  /* ---- Handlers ---- */
  const openNewContact = () => {
    setEditingContact(null)
    setFormDialogOpen(true)
  }

  const openEditContact = (contact: Contact) => {
    setEditingContact(contact)
    setFormDialogOpen(true)
  }

  const openDeleteContact = (contact: Contact) => {
    setContactToDelete(contact)
    setDeleteDialogOpen(true)
  }

  /* ---- Render ---- */
  return (
    <div className="flex h-full flex-col overflow-hidden bg-[#0A1628]">
      {/* Header */}
      <div className="flex shrink-0 items-center justify-between border-b border-white/[0.06] px-6 py-4">
        <div>
          <h1 className="text-lg font-semibold text-white">
            Mis Datos
          </h1>
          <p className="mt-0.5 text-xs text-white/40">
            Gestiona tus contactos y partes para documentos legales
          </p>
        </div>
        <Button
          onClick={openNewContact}
          className="bg-[#C9A94E] text-[#0A1628] font-semibold hover:bg-[#B8983E] focus:ring-[#C9A94E]/50"
        >
          <Plus className="mr-1.5 h-4 w-4" />
          Nuevo contacto
        </Button>
      </div>

      {/* Toolbar: search + tabs */}
      <div className="shrink-0 space-y-3 border-b border-white/[0.06] px-6 py-4">
        {/* Search bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar por nombre, documento, ciudad, empresa..."
            className="border-white/10 bg-white/[0.03] pl-9 text-sm text-white placeholder:text-white/25 focus-visible:border-[#C9A94E]/40 focus-visible:ring-[#C9A94E]/20"
          />
        </div>

        {/* Type filter tabs */}
        <Tabs
          value={activeTab}
          onValueChange={(v) => setActiveTab(v as TabKey)}
        >
          <TabsList className="h-9 bg-white/[0.04] p-0.5">
            {(Object.keys(TAB_CONFIG) as TabKey[]).map((key) => (
              <TabsTrigger
                key={key}
                value={key}
                className="h-7 rounded-md px-3 text-xs data-[state=active]:bg-[#C9A94E]/15 data-[state=active]:text-[#C9A94E] data-[state=active]:shadow-none text-white/40 hover:text-white/60"
              >
                {TAB_CONFIG[key].label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      {/* Contact grid */}
      <div className="flex-1 overflow-y-auto px-6 py-5">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#C9A94E]/30 border-t-[#C9A94E]" />
          </div>
        ) : filteredContacts.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredContacts.map((contact) => (
              <ContactCard
                key={contact.id}
                contact={contact}
                onEdit={openEditContact}
                onDelete={openDeleteContact}
              />
            ))}
          </div>
        )}
      </div>

      {/* Form Dialog */}
      <ContactFormDialog
        key={editingContact?.id ?? 'new'}
        open={formDialogOpen}
        onOpenChange={setFormDialogOpen}
        contact={editingContact}
        onSave={handleSave}
        saving={saving}
      />

      {/* Delete Dialog */}
      <DeleteDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        contactName={contactToDelete?.name ?? ''}
        onConfirm={handleDelete}
        loading={deleting}
      />
    </div>
  )
}
