'use client'

import { useEffect, useState, useCallback } from 'react'
import {
  Check,
  CreditCard,
  Crown,
  Zap,
  Building,
  AlertTriangle,
  Calendar,
  Receipt,
  Star,
  ArrowRight,
} from 'lucide-react'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Alert, AlertDescription } from '@/components/ui/alert'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select'
import { useAppStore } from '@/store/app-store'
import { toast } from 'sonner'

/* -------------------------------------------------------------------------- */
/*  Types                                                                    */
/* -------------------------------------------------------------------------- */

interface Payment {
  id: string
  amount: number
  currency: string
  paymentMethod: string
  paymentGateway: string
  transactionRef: string
  status: string
  planName: string
  createdAt: string
}

interface Plan {
  id: string
  name: string
  price: number
  interval: string
  maxDocuments: number
  features: string
}

interface PaymentsResponse {
  payments: Payment[]
  plans: Plan[]
}

/* -------------------------------------------------------------------------- */
/*  Helpers                                                                  */
/* -------------------------------------------------------------------------- */

const formatCOP = (amount: number) =>
  new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
  }).format(amount)

const daysUntil = (dateStr: string) => {
  const now = new Date()
  const target = new Date(dateStr)
  const diff = target.getTime() - now.getTime()
  return Math.ceil(diff / (1000 * 60 * 60 * 24))
}

const formatDate = (dateStr: string) => {
  return new Date(dateStr).toLocaleDateString('es-CO', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

const PLAN_ICONS: Record<string, React.ReactNode> = {
  Básico: <Zap className="h-6 w-6" />,
  Profesional: <Crown className="h-6 w-6" />,
  Empresarial: <Building className="h-6 w-6" />,
}

const GATEWAY_LABELS: Record<string, string> = {
  epayco: 'ePayco',
  payu: 'PayU',
  wompi: 'Wompi',
}

/* -------------------------------------------------------------------------- */
/*  Component                                                                */
/* -------------------------------------------------------------------------- */

export default function PaymentsPage() {
  const { user, token } = useAppStore()

  const [payments, setPayments] = useState<Payment[]>([])
  const [plans, setPlans] = useState<Plan[]>([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)

  // Dialog state
  const [dialogOpen, setDialogOpen] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null)
  const [paymentMethod, setPaymentMethod] = useState('credit_card')
  const [paymentGateway, setPaymentGateway] = useState('epayco')
  const [cardNumber, setCardNumber] = useState('')
  const [cardExpiry, setCardExpiry] = useState('')
  const [cardCvv, setCardCvv] = useState('')

  /* ---------------------------------------------------------------------- */
  /*  Fetch data                                                             */
  /* ---------------------------------------------------------------------- */

  const fetchData = useCallback(async () => {
    if (!user?.id || !token) {
      setLoading(false)
      return
    }
    try {
      const res = await fetch('/api/payments', {
        headers: { 'x-user-id': user.id, Authorization: `Bearer ${token}` },
      })
      if (!res.ok) throw new Error('Error cargando datos de pagos')
      const data: PaymentsResponse = await res.json()
      setPayments(data.payments ?? [])
      setPlans(data.plans ?? [])
    } catch (err) {
      console.error(err)
      toast.error('No se pudieron cargar los datos de pagos')
    } finally {
      setLoading(false)
    }
  }, [user?.id, token])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  /* ---------------------------------------------------------------------- */
  /*  Current plan helpers                                                   */
  /* ---------------------------------------------------------------------- */

  const currentPlanName = user?.subscriptionPlan ?? null
  const currentPlan = plans.find((p) => p.name === currentPlanName)
  const subscriptionEnd = user?.subscriptionEnd

  const isRenewalAlert =
    subscriptionEnd && daysUntil(subscriptionEnd) <= 7 && daysUntil(subscriptionEnd) >= 0

  // Count documents used from completed payments in current period
  const docsUsed = payments.filter(
    (p) =>
      p.status === 'Completado' &&
      p.planName === currentPlanName &&
      subscriptionEnd &&
      new Date(p.createdAt) > new Date(new Date(subscriptionEnd).getTime() - 30 * 24 * 60 * 60 * 1000),
  ).length

  const docLimit = currentPlan?.maxDocuments ?? 0
  const docProgress = docLimit > 0 ? Math.min((docsUsed / docLimit) * 100, 100) : 0

  /* ---------------------------------------------------------------------- */
  /*  Open payment dialog                                                    */
  /* ---------------------------------------------------------------------- */

  const openPaymentDialog = (plan: Plan) => {
    if (plan.name === currentPlanName) return
    setSelectedPlan(plan)
    setPaymentMethod('credit_card')
    setPaymentGateway('epayco')
    setCardNumber('')
    setCardExpiry('')
    setCardCvv('')
    setDialogOpen(true)
  }

  /* ---------------------------------------------------------------------- */
  /*  Submit payment                                                         */
  /* ---------------------------------------------------------------------- */

  const handleSubmitPayment = async () => {
    if (!selectedPlan || !user?.id || !token) return

    if (!cardNumber.trim() || !cardExpiry.trim() || !cardCvv.trim()) {
      toast.error('Por favor completa todos los campos de la tarjeta')
      return
    }

    setSubmitting(true)
    try {
      const subscriptionEnd = new Date()
      subscriptionEnd.setMonth(subscriptionEnd.getMonth() + 1)

      const res = await fetch('/api/payments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-user-id': user.id,
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          amount: selectedPlan.price,
          planName: selectedPlan.name,
          paymentMethod,
          paymentGateway,
          subscriptionEnd: subscriptionEnd.toISOString(),
        }),
      })

      if (!res.ok) throw new Error('Error procesando el pago')

      toast.success(`¡Suscripción a ${selectedPlan.name} exitosa!`)
      setDialogOpen(false)
      fetchData()
    } catch (err) {
      console.error(err)
      toast.error('No se pudo procesar el pago. Intenta de nuevo.')
    } finally {
      setSubmitting(false)
    }
  }

  /* ---------------------------------------------------------------------- */
  /*  Status badge                                                           */
  /* ---------------------------------------------------------------------- */

  const StatusBadge = ({ status }: { status: string }) => {
    const styles: Record<string, string> = {
      Completado: 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30',
      Pendiente: 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30',
      Fallido: 'bg-red-500/20 text-red-400 border border-red-500/30',
    }
    return (
      <Badge
        className={
          styles[status] ?? 'bg-gray-500/20 text-gray-400 border border-gray-500/30'
        }
        variant="outline"
      >
        {status}
      </Badge>
    )
  }

  /* ---------------------------------------------------------------------- */
  /*  Render: Loading                                                        */
  /* ---------------------------------------------------------------------- */

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-10 w-10 border-2 border-[#C9A94E] border-t-transparent" />
      </div>
    )
  }

  /* ---------------------------------------------------------------------- */
  /*  Render                                                                 */
  /* ---------------------------------------------------------------------- */

  return (
    <div className="space-y-8 p-6 max-w-7xl mx-auto">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-white flex items-center gap-3">
          <CreditCard className="h-8 w-8 text-[#C9A94E]" />
          Pagos y Suscripciones
        </h1>
        <p className="text-gray-400 mt-1">
          Gestiona tu plan, realiza pagos y consulta tu historial.
        </p>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/*  Renewal Alert                                                     */}
      {/* ------------------------------------------------------------------ */}
      {isRenewalAlert && subscriptionEnd && (
        <Alert className="border-amber-500/50 bg-amber-500/10">
          <AlertTriangle className="h-5 w-5 text-amber-400" />
          <AlertDescription className="text-amber-200">
            <span className="font-semibold">¡Atención!</span> Tu suscripción{' '}
            <span className="font-semibold text-amber-300">{currentPlanName}</span> vence en{' '}
            <span className="font-semibold text-amber-300">
              {daysUntil(subscriptionEnd)} día{daysUntil(subscriptionEnd) !== 1 ? 's' : ''}
            </span>{' '}
            ({formatDate(subscriptionEnd)}). Renueva para no perder acceso a tus documentos.
          </AlertDescription>
        </Alert>
      )}

      {/* ------------------------------------------------------------------ */}
      {/*  Current Plan Card                                                 */}
      {/* ------------------------------------------------------------------ */}
      <Card className="bg-gradient-to-br from-[#0F1F3D] to-[#0A1628] border border-[#C9A94E]/30">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-[#C9A94E]/10 border border-[#C9A94E]/20">
                <Star className="h-6 w-6 text-[#C9A94E]" />
              </div>
              <div>
                <CardTitle className="text-white text-xl">
                  {currentPlan ? currentPlan.name : 'Sin suscripción'}
                </CardTitle>
                <CardDescription className="text-gray-400">
                  {currentPlan
                    ? `Plan ${currentPlan.name} · ${formatCOP(currentPlan.price)}/${currentPlan.interval === 'month' ? 'mes' : currentPlan.interval}`
                    : 'No tienes una suscripción activa'}
                </CardDescription>
              </div>
            </div>
            <div className="flex items-center gap-4">
              {subscriptionEnd && (
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <Calendar className="h-4 w-4" />
                  Renovación: {formatDate(subscriptionEnd)}
                </div>
              )}
              <Button
                onClick={() => {
                  const el = document.getElementById('plans-section')
                  el?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="bg-[#C9A94E] hover:bg-[#B8963F] text-[#0A1628] font-semibold"
              >
                Cambiar plan
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>

        {currentPlan && (
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">
                  Documentos generados: <span className="text-white font-medium">{docsUsed}</span> /{' '}
                  <span className="text-white font-medium">{docLimit}</span>
                </span>
                <span className="text-[#C9A94E] font-medium">{Math.round(docProgress)}%</span>
              </div>
              <div className="h-3 w-full rounded-full bg-gray-700/50 overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${docProgress}%`,
                    background:
                      docProgress > 90
                        ? 'linear-gradient(90deg, #ef4444, #f87171)'
                        : docProgress > 70
                          ? 'linear-gradient(90deg, #f59e0b, #fbbf24)'
                          : 'linear-gradient(90deg, #C9A94E, #E5CC7F)',
                  }}
                />
              </div>
            </div>
          </CardContent>
        )}
      </Card>

      {/* ------------------------------------------------------------------ */}
      {/*  Subscription Plans                                                */}
      {/* ------------------------------------------------------------------ */}
      <section id="plans-section">
        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <Crown className="h-5 w-5 text-[#C9A94E]" />
          Planes de Suscripción
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => {
            const isCurrent = plan.name === currentPlanName
            const isPopular = plan.name === 'Profesional'
            const features = plan.features.split(',').map((f) => f.trim()).filter(Boolean)

            return (
              <Card
                key={plan.id}
                className={`relative bg-[#0F1F3D] transition-all duration-200 hover:shadow-lg hover:shadow-[#C9A94E]/5 ${
                  isCurrent
                    ? 'border-2 border-[#C9A94E] shadow-lg shadow-[#C9A94E]/10'
                    : 'border border-gray-700/50'
                }`}
              >
                {/* Popular badge */}
                {isPopular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge className="bg-[#C9A94E] text-[#0A1628] font-bold px-4 py-1 text-xs shadow-md">
                      ★ POPULAR
                    </Badge>
                  </div>
                )}

                <CardHeader className="pt-6">
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-2.5 rounded-lg ${
                        isCurrent ? 'bg-[#C9A94E]/20 text-[#C9A94E]' : 'bg-gray-700/50 text-gray-400'
                      }`}
                    >
                      {PLAN_ICONS[plan.name] ?? <Zap className="h-6 w-6" />}
                    </div>
                    <div>
                      <CardTitle className="text-white text-lg">{plan.name}</CardTitle>
                      <CardDescription className="text-gray-500 text-xs">
                        Hasta {plan.maxDocuments} docs/{plan.interval === 'month' ? 'mes' : plan.interval}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-5">
                  {/* Price */}
                  <div>
                    <span className="text-3xl font-bold text-white">{formatCOP(plan.price)}</span>
                    <span className="text-gray-500 text-sm ml-1">/mes</span>
                  </div>

                  {/* Features */}
                  <ul className="space-y-2.5">
                    {features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                        <Check className="h-4 w-4 text-[#C9A94E] mt-0.5 shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  {isCurrent ? (
                    <Button
                      disabled
                      variant="outline"
                      className="w-full border-[#C9A94E]/30 text-[#C9A94E] bg-[#C9A94E]/5 cursor-default"
                    >
                      Plan actual
                    </Button>
                  ) : (
                    <Button
                      onClick={() => openPaymentDialog(plan)}
                      className={`w-full font-semibold ${
                        isPopular
                          ? 'bg-[#C9A94E] hover:bg-[#B8963F] text-[#0A1628]'
                          : 'bg-[#162544] hover:bg-[#1E3358] text-white border border-gray-600/50 hover:border-[#C9A94E]/50'
                      }`}
                    >
                      Suscribirse
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  )}
                </CardContent>
              </Card>
            )
          })}
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/*  Payment History                                                   */}
      {/* ------------------------------------------------------------------ */}
      <section>
        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <Receipt className="h-5 w-5 text-[#C9A94E]" />
          Historial de Pagos
        </h2>
        <Card className="bg-[#0F1F3D] border border-gray-700/50">
          <CardContent className="p-0">
            {payments.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-gray-500">
                <Receipt className="h-12 w-12 mb-3 opacity-40" />
                <p className="text-sm">No hay pagos registrados.</p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow className="border-gray-700/50 hover:bg-transparent">
                    <TableHead className="text-gray-400 font-semibold">Fecha</TableHead>
                    <TableHead className="text-gray-400 font-semibold">Descripción</TableHead>
                    <TableHead className="text-gray-400 font-semibold text-right">Monto</TableHead>
                    <TableHead className="text-gray-400 font-semibold text-center">Estado</TableHead>
                    <TableHead className="text-gray-400 font-semibold">Método</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {payments.map((payment) => (
                    <TableRow
                      key={payment.id}
                      className="border-gray-700/30 hover:bg-white/[0.02]"
                    >
                      <TableCell className="text-gray-300 text-sm">
                        {formatDate(payment.createdAt)}
                      </TableCell>
                      <TableCell className="text-white text-sm font-medium">
                        {payment.planName}
                      </TableCell>
                      <TableCell className="text-white text-sm text-right font-mono">
                        {formatCOP(payment.amount)}
                      </TableCell>
                      <TableCell className="text-center">
                        <StatusBadge status={payment.status} />
                      </TableCell>
                      <TableCell className="text-gray-400 text-sm">
                        <div className="flex items-center gap-1.5">
                          <CreditCard className="h-3.5 w-3.5" />
                          <span>{GATEWAY_LABELS[payment.paymentGateway] ?? payment.paymentGateway}</span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/*  Payment Dialog                                                    */}
      {/* ------------------------------------------------------------------ */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="bg-[#0F1F3D] border border-gray-700/50 text-white sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-xl flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-[#C9A94E]" />
              Suscribirse a {selectedPlan?.name}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-5 py-2">
            {/* Summary */}
            <div className="rounded-lg bg-[#0A1628] p-4 border border-gray-700/50">
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Plan seleccionado</span>
                <span className="text-white font-semibold">{selectedPlan?.name}</span>
              </div>
              <div className="flex items-center justify-between mt-1">
                <span className="text-gray-400">Total a pagar</span>
                <span className="text-[#C9A94E] text-2xl font-bold">
                  {selectedPlan ? formatCOP(selectedPlan.price) : ''}
                </span>
              </div>
            </div>

            {/* Payment Gateway */}
            <div className="space-y-3">
              <Label className="text-gray-300 text-sm font-medium">Pasarela de pago</Label>
              <Select value={paymentGateway} onValueChange={setPaymentGateway}>
                <SelectTrigger className="bg-[#0A1628] border-gray-700/50 text-white">
                  <SelectValue placeholder="Selecciona pasarela" />
                </SelectTrigger>
                <SelectContent className="bg-[#0F1F3D] border-gray-700/50">
                  <SelectItem value="epayco">ePayco</SelectItem>
                  <SelectItem value="payu">PayU</SelectItem>
                  <SelectItem value="wompi">Wompi</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Payment Method */}
            <div className="space-y-3">
              <Label className="text-gray-300 text-sm font-medium">Método de pago</Label>
              <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                <div className="flex items-center space-x-3 rounded-lg border border-gray-700/50 p-3 bg-[#0A1628] has-[:checked]:border-[#C9A94E]/50 has-[:checked]:bg-[#C9A94E]/5">
                  <RadioGroupItem value="credit_card" id="credit_card" className="border-gray-500" />
                  <Label htmlFor="credit_card" className="text-gray-300 cursor-pointer flex items-center gap-2">
                    <CreditCard className="h-4 w-4" /> Tarjeta de crédito
                  </Label>
                </div>
                <div className="flex items-center space-x-3 rounded-lg border border-gray-700/50 p-3 bg-[#0A1628] has-[:checked]:border-[#C9A94E]/50 has-[:checked]:bg-[#C9A94E]/5">
                  <RadioGroupItem value="debit_card" id="debit_card" className="border-gray-500" />
                  <Label htmlFor="debit_card" className="text-gray-300 cursor-pointer flex items-center gap-2">
                    <CreditCard className="h-4 w-4" /> Tarjeta débito
                  </Label>
                </div>
                <div className="flex items-center space-x-3 rounded-lg border border-gray-700/50 p-3 bg-[#0A1628] has-[:checked]:border-[#C9A94E]/50 has-[:checked]:bg-[#C9A94E]/5">
                  <RadioGroupItem value="pse" id="pse" className="border-gray-500" />
                  <Label htmlFor="pse" className="text-gray-300 cursor-pointer flex items-center gap-2">
                    <Building className="h-4 w-4" /> PSE (Débito bancario)
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {/* Card fields (simulated) */}
            <div className="space-y-3">
              <Label className="text-gray-300 text-sm font-medium">
                Datos de la tarjeta (simulado)
              </Label>
              <div>
                <Input
                  placeholder="Número de tarjeta"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, '').slice(0, 16))}
                  className="bg-[#0A1628] border-gray-700/50 text-white placeholder:text-gray-600"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Input
                  placeholder="MM/AA"
                  value={cardExpiry}
                  onChange={(e) => {
                    let v = e.target.value.replace(/\D/g, '').slice(0, 4)
                    if (v.length >= 3) v = v.slice(0, 2) + '/' + v.slice(2)
                    setCardExpiry(v)
                  }}
                  className="bg-[#0A1628] border-gray-700/50 text-white placeholder:text-gray-600"
                />
                <Input
                  placeholder="CVV"
                  value={cardCvv}
                  onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, '').slice(0, 4))}
                  className="bg-[#0A1628] border-gray-700/50 text-white placeholder:text-gray-600"
                  type="password"
                />
              </div>
            </div>
          </div>

          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              variant="ghost"
              onClick={() => setDialogOpen(false)}
              className="text-gray-400 hover:text-white hover:bg-gray-700/50"
            >
              Cancelar
            </Button>
            <Button
              onClick={handleSubmitPayment}
              disabled={submitting}
              className="bg-[#C9A94E] hover:bg-[#B8963F] text-[#0A1628] font-semibold min-w-[120px]"
            >
              {submitting ? (
                <span className="flex items-center gap-2">
                  <span className="animate-spin rounded-full h-4 w-4 border-2 border-[#0A1628] border-t-transparent" />
                  Procesando…
                </span>
              ) : (
                'Pagar'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
