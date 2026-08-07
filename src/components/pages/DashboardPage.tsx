'use client'

import { useEffect, useState, useCallback } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { FileText, FileEdit, Download, Clock, Plus, Search, ArrowRight, TrendingUp, Coins } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useAppStore } from '@/store/app-store'

/* -------------------------------------------------------------------------- */
/*  Types                                                                    */
/* -------------------------------------------------------------------------- */

interface DashboardDocument {
  id: string
  name: string
  templateCategory: string
  status: 'draft' | 'completed' | 'archived'
  createdAt: string
}

interface StatCard {
  label: string
  value: number
  change: number
  icon: React.ReactNode
  accentBg: string
  accentText: string
  accentBorder: string
  changeColor: string
}

/* -------------------------------------------------------------------------- */
/*  Chart mock data                                                          */
/* -------------------------------------------------------------------------- */

function getMonthLabels(): string[] {
  const now = new Date()
  const months: string[] = []
  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1)
    months.push(d.toLocaleDateString('es-CO', { month: 'short' }).replace('.', ''))
  }
  return months
}

const MOCK_CHART_DATA = (() => {
  const labels = getMonthLabels()
  const categories = ['Contratos', 'Cartas', 'Actas', 'Estatutos', 'Derechos de Petición']
  const colors = ['#C9A94E', '#A68B3C', '#8B7230', '#D4B965', '#E5CC7F']

  return labels.map((month, _mi) => {
    const entry: Record<string, string | number> = { month }
    categories.forEach((cat) => {
      entry[cat] = Math.floor(Math.random() * 12) + 1
    })
    return entry
  })
})()

const CHART_COLORS: Record<string, string> = {
  Contratos: '#C9A94E',
  Cartas: '#A68B3C',
  Actas: '#8B7230',
  Estatutos: '#D4B965',
  'Derechos de Petición': '#E5CC7F',
}

const MOCK_RECENT_DOCS: DashboardDocument[] = [
  { id: '1', name: 'Contrato de Arrendamiento – Oficina Centro', templateCategory: 'Contratos', status: 'completed', createdAt: '2025-01-10T14:30:00Z' },
  { id: '2', name: 'Carta de Solicitud de Certificado', templateCategory: 'Cartas', status: 'draft', createdAt: '2025-01-09T10:15:00Z' },
  { id: '3', name: 'Acta de Asamblea General Ordinaria', templateCategory: 'Actas', status: 'completed', createdAt: '2025-01-08T16:00:00Z' },
  { id: '4', name: 'Estatutos Sociales – Restaurante El Sabor', templateCategory: 'Estatutos', status: 'archived', createdAt: '2025-01-07T09:45:00Z' },
  { id: '5', name: 'Derecho de Petición – Copia Expediente', templateCategory: 'Derechos de Petición', status: 'draft', createdAt: '2025-01-06T11:20:00Z' },
]

/* -------------------------------------------------------------------------- */
/*  Odometer hook                                                            */
/* -------------------------------------------------------------------------- */

function useOdometer(target: number, delayMs: number = 0): number {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    let cancelled = false
    const timeout = setTimeout(() => {
      const duration = 1200
      const steps = 40
      const stepTime = duration / steps
      const increment = target / steps
      let step = 0

      const interval = setInterval(() => {
        step++
        if (step >= steps) {
          if (!cancelled) setCurrent(target)
          clearInterval(interval)
        } else {
          if (!cancelled) setCurrent(Math.round(increment * step))
        }
      }, stepTime)
    }, delayMs)

    return () => {
      cancelled = true
      clearTimeout(timeout)
    }
  }, [target, delayMs])

  return current
}

/* -------------------------------------------------------------------------- */
/*  Status badge                                                             */
/* -------------------------------------------------------------------------- */

function StatusBadge({ status }: { status: DashboardDocument['status'] }) {
  const config = {
    draft: { label: 'Borrador', className: 'bg-yellow-500/15 text-yellow-400 border-yellow-500/25 hover:bg-yellow-500/25' },
    completed: { label: 'Completado', className: 'bg-green-500/15 text-green-400 border-green-500/25 hover:bg-green-500/25' },
    archived: { label: 'Archivado', className: 'bg-gray-500/15 text-gray-400 border-gray-500/25 hover:bg-gray-500/25' },
  }
  const c = config[status]
  return (
    <Badge variant="outline" className={c.className}>
      {c.label}
    </Badge>
  )
}

/* -------------------------------------------------------------------------- */
/*  Custom chart tooltip                                                     */
/* -------------------------------------------------------------------------- */

function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ name: string; value: number; color: string }>; label?: string }) {
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
/*  DashboardPage                                                            */
/* -------------------------------------------------------------------------- */

export default function DashboardPage() {
  const { user, setCurrentPage } = useAppStore()
  const [documents, setDocuments] = useState<DashboardDocument[]>(MOCK_RECENT_DOCS)
  const [chartData, setChartData] = useState(MOCK_CHART_DATA)
  const [loading, setLoading] = useState(true)

  const animatedDocs = useOdometer(24, 0)
  const animatedDrafts = useOdometer(7, 150)
  const animatedDownloads = useOdometer(53, 300)
  const animatedExpiring = useOdometer(3, 450)

  const fetchDashboard = useCallback(async () => {
    if (!user) return
    try {
      const res = await fetch('/api/documents?status=all', {
        headers: { 'x-user-id': user.id },
      })
      if (res.ok) {
        const data = await res.json()
        if (Array.isArray(data) && data.length > 0) {
          const mapped: DashboardDocument[] = data.slice(0, 5).map((d: Record<string, string>) => ({
            id: d.id,
            name: d.name || d.title || 'Sin título',
            templateCategory: d.templateCategory || d.category || 'Otro',
            status: (['draft', 'completed', 'archived'].includes(d.status) ? d.status : 'draft') as DashboardDocument['status'],
            createdAt: d.createdAt || d.created_at || new Date().toISOString(),
          }))
          setDocuments(mapped)
        }
      }
    } catch {
      // keep mock data on error
    } finally {
      setLoading(false)
    }
  }, [user])

  useEffect(() => {
    fetchDashboard()
  }, [fetchDashboard])

  /* ---- Stat cards config ---- */
  const stats: StatCard[] = [
    {
      label: 'Documentos generados este mes',
      value: animatedDocs,
      change: 12,
      icon: <FileText className="h-5 w-5" />,
      accentBg: 'bg-[#C9A94E]/15',
      accentText: 'text-[#C9A94E]',
      accentBorder: 'border-[#C9A94E]/20',
      changeColor: 'text-[#C9A94E]',
    },
    {
      label: 'Borradores pendientes',
      value: animatedDrafts,
      change: -5,
      icon: <FileEdit className="h-5 w-5" />,
      accentBg: 'bg-blue-500/15',
      accentText: 'text-blue-400',
      accentBorder: 'border-blue-500/20',
      changeColor: 'text-blue-400',
    },
    {
      label: 'Documentos descargados',
      value: animatedDownloads,
      change: 23,
      icon: <Download className="h-5 w-5" />,
      accentBg: 'bg-green-500/15',
      accentText: 'text-green-400',
      accentBorder: 'border-green-500/20',
      changeColor: 'text-green-400',
    },
    {
      label: 'Próximos vencimientos',
      value: animatedExpiring,
      change: 8,
      icon: <Clock className="h-5 w-5" />,
      accentBg: 'bg-red-500/15',
      accentText: 'text-red-400',
      accentBorder: 'border-red-500/20',
      changeColor: 'text-red-400',
    },
  ]

  const categories = Object.keys(CHART_COLORS)

  return (
    <main className="min-h-screen bg-[#0A1628]">
      <div className="mx-auto max-w-7xl space-y-8 px-4 py-8 sm:px-6 lg:px-8">
        {/* ---------- Header ---------- */}
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Panel de Control
          </h1>
          <p className="mt-1 text-sm text-white/50">
            Bienvenido{user?.name ? `, ${user.name.split(' ')[0]}` : ''} — resumen de tu actividad en LexDoc.
          </p>
        </div>

        {/* ---------- Stat cards ---------- */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <Card
              key={stat.label}
              className={`border ${stat.accentBorder} bg-[#0F1D32]/80 backdrop-blur-sm transition-shadow hover:shadow-lg hover:shadow-[#C9A94E]/5`}
            >
              <CardContent className="flex items-center gap-4 p-5">
                <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg ${stat.accentBg} ${stat.accentText}`}>
                  {stat.icon}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="animate-odometer text-2xl font-bold tabular-nums text-white">
                    {stat.value}
                  </p>
                  <p className="truncate text-xs text-white/50">{stat.label}</p>
                </div>
                <div className={`flex shrink-0 items-center gap-0.5 text-xs font-medium ${stat.changeColor}`}>
                  <TrendingUp className="h-3 w-3" />
                  <span>{stat.change > 0 ? '+' : ''}{stat.change}%</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* ---------- Chart ---------- */}
        <Card className="border-white/5 bg-[#0F1D32]/80 backdrop-blur-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold text-white">
              Evolución de documentos generados
            </CardTitle>
            <CardDescription className="text-xs text-white/40">
              Últimos 6 meses por categoría de documento
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="h-[320px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 8, right: 8, left: -4, bottom: 0 }}>
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
                  <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(201,169,78,0.06)' }} />
                  <Legend
                    wrapperStyle={{ paddingTop: 12 }}
                    formatter={(value: string) => (
                      <span className="text-xs text-white/50">{value}</span>
                    )}
                  />
                  {categories.map((cat) => (
                    <Bar
                      key={cat}
                      dataKey={cat}
                      stackId="docs"
                      fill={CHART_COLORS[cat]}
                      radius={cat === categories[categories.length - 1] ? [4, 4, 0, 0] : undefined}
                      maxBarSize={48}
                    />
                  ))}
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* ---------- Bottom grid: Recent docs + Quick actions ---------- */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Recent documents */}
          <Card className="border-white/5 bg-[#0F1D32]/80 backdrop-blur-sm lg:col-span-2">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base font-semibold text-white">
                    Documentos recientes
                  </CardTitle>
                  <CardDescription className="text-xs text-white/40">
                    Últimos 5 documentos trabajados
                  </CardDescription>
                </div>
                <button
                  onClick={() => setCurrentPage('documents')}
                  className="flex items-center gap-1 text-xs font-medium text-[#C9A94E] transition-colors hover:text-[#D4B965]"
                >
                  Ver todos <ArrowRight className="h-3 w-3" />
                </button>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-white/5">
                      <th className="whitespace-nowrap pb-2 pr-4 text-xs font-medium uppercase tracking-wider text-white/30">Nombre</th>
                      <th className="whitespace-nowrap pb-2 pr-4 text-xs font-medium uppercase tracking-wider text-white/30 hidden sm:table-cell">Categoría</th>
                      <th className="whitespace-nowrap pb-2 pr-4 text-xs font-medium uppercase tracking-wider text-white/30">Estado</th>
                      <th className="whitespace-nowrap pb-2 text-xs font-medium uppercase tracking-wider text-white/30 text-right hidden md:table-cell">Fecha</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {documents.map((doc) => (
                      <tr key={doc.id} className="group transition-colors hover:bg-white/[0.02]">
                        <td className="max-w-[240px] truncate py-3 pr-4 text-sm font-medium text-white/80 group-hover:text-white">
                          {doc.name}
                        </td>
                        <td className="whitespace-nowrap py-3 pr-4 text-xs text-white/40 hidden sm:table-cell">
                          {doc.templateCategory}
                        </td>
                        <td className="py-3 pr-4">
                          <StatusBadge status={doc.status} />
                        </td>
                        <td className="whitespace-nowrap py-3 text-right text-xs text-white/40 hidden md:table-cell">
                          {new Date(doc.createdAt).toLocaleDateString('es-CO', {
                            day: '2-digit',
                            month: 'short',
                            year: 'numeric',
                          })}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Quick actions */}
          <div className="flex flex-col gap-4">
            <h2 className="text-sm font-semibold text-white/60 uppercase tracking-wider px-1">
              Acciones rápidas
            </h2>

            <button
              onClick={() => setCurrentPage('catalog')}
              className="group flex items-center gap-4 rounded-xl border border-[#C9A94E]/15 bg-[#0F1D32]/80 p-4 text-left backdrop-blur-sm transition-all hover:border-[#C9A94E]/30 hover:bg-[#C9A94E]/5 hover:shadow-lg hover:shadow-[#C9A94E]/5"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#C9A94E]/15 text-[#C9A94E] transition-colors group-hover:bg-[#C9A94E]/25">
                <Plus className="h-5 w-5" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-white/90 group-hover:text-white">Crear nuevo documento</p>
                <p className="text-xs text-white/40">Genera un documento desde una plantilla</p>
              </div>
              <ArrowRight className="h-4 w-4 shrink-0 text-white/20 transition-transform group-hover:translate-x-0.5 group-hover:text-[#C9A94E]" />
            </button>

            <button
              onClick={() => setCurrentPage('catalog')}
              className="group flex items-center gap-4 rounded-xl border border-white/5 bg-[#0F1D32]/80 p-4 text-left backdrop-blur-sm transition-all hover:border-white/10 hover:bg-white/[0.02] hover:shadow-lg hover:shadow-white/[0.02]"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-500/15 text-blue-400 transition-colors group-hover:bg-blue-500/25">
                <Search className="h-5 w-5" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-white/90 group-hover:text-white">Ver catálogo</p>
                <p className="text-xs text-white/40">Explora todas las plantillas disponibles</p>
              </div>
              <ArrowRight className="h-4 w-4 shrink-0 text-white/20 transition-transform group-hover:translate-x-0.5 group-hover:text-blue-400" />
            </button>

            <button
              onClick={() => setCurrentPage('documents')}
              className="group flex items-center gap-4 rounded-xl border border-white/5 bg-[#0F1D32]/80 p-4 text-left backdrop-blur-sm transition-all hover:border-white/10 hover:bg-white/[0.02] hover:shadow-lg hover:shadow-white/[0.02]"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-green-500/15 text-green-400 transition-colors group-hover:bg-green-500/25">
                <FileText className="h-5 w-5" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-white/90 group-hover:text-white">Solicitar documento</p>
                <p className="text-xs text-white/40">Pide asistencia para un documento personalizado</p>
              </div>
              <ArrowRight className="h-4 w-4 shrink-0 text-white/20 transition-transform group-hover:translate-x-0.5 group-hover:text-green-400" />
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}