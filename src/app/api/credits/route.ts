import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

/* GET /api/credits — Return user's credit balance and recent transactions */
export async function GET(request: Request) {
  const userId = request.headers.get('x-user-id');
  if (!userId) return NextResponse.json({ error: 'No autenticado' }, { status: 401 });

  const user = await db.user.findUnique({
    where: { id: userId },
    select: { credits: true },
  });
  if (!user) return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 404 });

  const transactions = await db.creditTransaction.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
    take: 50,
  });

  return NextResponse.json({ credits: user.credits, transactions });
}

/* POST /api/credits — Deduct 1 credit when completing a document (user action) */
export async function POST(request: Request) {
  const userId = request.headers.get('x-user-id');
  if (!userId) return NextResponse.json({ error: 'No autenticado' }, { status: 401 });

  try {
    const body = await request.json();
    const { action, amount, description } = body;

    if (action === 'deduct') {
      const user = await db.user.findUnique({ where: { id: userId }, select: { credits: true, role: true } });
      if (!user) return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 404 });

      const deductAmount = amount || 1;
      if (user.credits < deductAmount) {
        return NextResponse.json({ error: 'Créditos insuficientes', credits: user.credits }, { status: 400 });
      }

      const updated = await db.user.update({
        where: { id: userId },
        data: { credits: { decrement: deductAmount } },
        select: { credits: true },
      });

      await db.creditTransaction.create({
        data: {
          userId,
          amount: -deductAmount,
          type: 'document_completion',
          description: description || `Documento completado (-${deductAmount} crédito${deductAmount > 1 ? 's' : ''})`,
        },
      });

      return NextResponse.json({ credits: updated.credits });
    }

    return NextResponse.json({ error: 'Acción no válida' }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ error: 'Error al procesar créditos' }, { status: 500 });
  }
}
