import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const userId = request.headers.get('x-user-id');
  if (!userId) return NextResponse.json({ error: 'No autenticado' }, { status: 401 });

  const [payments, plans] = await Promise.all([
    db.payment.findMany({ where: { userId }, orderBy: { createdAt: 'desc' } }),
    db.subscriptionPlan.findMany({ where: { isActive: true } })
  ]);

  return NextResponse.json({ payments, plans });
}

export async function POST(request: Request) {
  const userId = request.headers.get('x-user-id');
  if (!userId) return NextResponse.json({ error: 'No autenticado' }, { status: 401 });

  try {
    const body = await request.json();
    const payment = await db.payment.create({
      data: {
        userId,
        amount: body.amount,
        currency: 'COP',
        paymentMethod: body.paymentMethod,
        paymentGateway: body.paymentGateway,
        transactionRef: `TX-${Date.now()}`,
        status: 'completed',
        planName: body.planName
      }
    });

    if (body.planName && body.subscriptionEnd) {
      await db.user.update({
        where: { id: userId },
        data: { subscriptionPlan: body.planName, subscriptionEnd: new Date(body.subscriptionEnd) }
      });
    }

    return NextResponse.json({ payment }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Error al procesar pago' }, { status: 500 });
  }
}