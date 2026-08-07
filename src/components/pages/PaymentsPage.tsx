'use client'

import { useEffect, useState, useCallback } from 'react'
import {
  Coins,
  ArrowUpCircle,
  ArrowDownCircle,
  Clock,
  AlertTriangle,
} from 'lucide-react'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { useAppStore } from '@/store/app-store'

interface CreditTransaction {
  id: string
  amount: number
  type: string
  description: string | null
  createdAt: string
}

const formatDate = (dateStr: string) => {
  return new Date(dateStr).toLocaleDateString('es-CO', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export default function PaymentsPage() {
  const { user, token } = useAppStore()

  const [credits, setCredits] = useState<number>(0)
  const [transactions, setTransactions] = useState<CreditTransaction[]>([])
  const [loading, setLoading] = useState(true)

  const fetchData = useCallback(async () => {
    if (!user?.id || !token) {
      setLoading(false)
      return
    }
    try {
      const res = await fetch('/api/credits', {
        headers: { 'x-user-id': user.id, Authorization: `Bearer ${token}` },
      })
      if (!res.ok) throw new Error('Error cargando créditos')
      const data = await res.json()
      setCredits(data.credits ?? 0)
      setTransactions(data.transactions ?? [])
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }, [user?.id, token])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-10 w-10 border-2 border-[#C9A94E] border-t-transparent" />
      </div>
    )
  }

  return (
    <div className="space-y-8 p-6 max-w-5xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold text-white flex items-center gap-3">
          <Coins className="h-8 w-8 text-[#C9A94E]" />
          Mis Créditos
        </h1>
        <p className="text-gray-400 mt-1">
          Cada crédito equivale a un documento que puedes generar.
        </p>
      </div>

      {credits <= 3 && credits > 0 && (
        <Alert className="border-amber-500/50 bg-amber-500/10">
          <AlertTriangle className="h-5 w-5 text-amber-400" />
          <AlertDescription className="text-amber-200">
            <span className="font-semibold">¡Atención!</span> Te quedan{' '}
            <span className="font-semibold text-amber-300">{credits} crédito{credits !== 1 ? 's' : ''}</span>.
            Contacta al administrador para obtener más créditos.
          </AlertDescription>
        </Alert>
      )}

      {credits === 0 && (
        <Alert className="border-red-500/50 bg-red-500/10">
          <AlertTriangle className="h-5 w-5 text-red-400" />
          <AlertDescription className="text-red-200">
            <span className="font-semibold">¡Sin créditos!</span> No puedes generar más documentos.
            Contacta al administrador para agregar créditos a tu cuenta.
          </AlertDescription>
        </Alert>
      )}

      <Card className="bg-gradient-to-br from-[#0F1F3D] to-[#0A1628] border border-[#C9A94E]/30">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-[#C9A94E]/10 border border-[#C9A94E]/20">
                <Coins className="h-6 w-6 text-[#C9A94E]" />
              </div>
              <div>
                <CardTitle className="text-white text-xl">
                  Saldo de Créditos
                </CardTitle>
                <CardDescription className="text-gray-400">
                  1 crédito = 1 documento generado
                </CardDescription>
              </div>
            </div>
            <div className="text-right">
              <p className={`text-5xl font-bold ${credits > 3 ? 'text-[#C9A94E]' : credits > 0 ? 'text-amber-400' : 'text-red-400'}`}>
                {credits}
              </p>
              <p className="text-xs text-gray-500 mt-1">crédito{credits !== 1 ? 's' : ''} disponible{credits !== 1 ? 's' : ''}</p>
            </div>
          </div>
        </CardHeader>
        {credits > 0 && (
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Estado</span>
                <span className={credits > 5 ? 'text-green-400' : credits > 2 ? 'text-amber-400' : 'text-red-400'}>
                  {credits > 5 ? 'Saldo saludable' : credits > 2 ? 'Saldo bajo' : 'Saldo crítico'}
                </span>
              </div>
              <div className="h-3 w-full rounded-full bg-gray-700/50 overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${Math.min((credits / 20) * 100, 100)}%`,
                    background: credits > 5
                      ? 'linear-gradient(90deg, #C9A94E, #E5CC7F)'
                      : credits > 2
                        ? 'linear-gradient(90deg, #f59e0b, #fbbf24)'
                        : 'linear-gradient(90deg, #ef4444, #f87171)',
                  }}
                />
              </div>
            </div>
          </CardContent>
        )}
      </Card>

      <section>
        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <Clock className="h-5 w-5 text-[#C9A94E]" />
          Historial de Créditos
        </h2>
        <Card className="bg-[#0F1F3D] border border-gray-700/50">
          <CardContent className="p-0">
            {transactions.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-gray-500">
                <Coins className="h-12 w-12 mb-3 opacity-40" />
                <p className="text-sm">No hay movimientos de créditos.</p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow className="border-gray-700/50 hover:bg-transparent">
                    <TableHead className="text-gray-400 font-semibold">Fecha</TableHead>
                    <TableHead className="text-gray-400 font-semibold">Descripción</TableHead>
                    <TableHead className="text-gray-400 font-semibold text-center">Tipo</TableHead>
                    <TableHead className="text-gray-400 font-semibold text-right">Cantidad</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transactions.map((tx) => (
                    <TableRow
                      key={tx.id}
                      className="border-gray-700/30 hover:bg-white/[0.02]"
                    >
                      <TableCell className="text-gray-300 text-sm">
                        {formatDate(tx.createdAt)}
                      </TableCell>
                      <TableCell className="text-white text-sm">
                        {tx.description || tx.type}
                      </TableCell>
                      <TableCell className="text-center">
                        {tx.type === 'admin_grant' ? (
                          <span className="inline-flex items-center gap-1 text-xs text-green-400">
                            <ArrowUpCircle className="h-3.5 w-3.5" /> Recarga
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-xs text-red-400">
                            <ArrowDownCircle className="h-3.5 w-3.5" /> Uso
                          </span>
                        )}
                      </TableCell>
                      <TableCell className={`text-right font-mono font-semibold ${tx.amount > 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {tx.amount > 0 ? '+' : ''}{tx.amount}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
