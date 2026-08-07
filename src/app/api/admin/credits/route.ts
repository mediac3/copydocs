import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

/* GET /api/admin/credits?userId=xxx — Get user credit info */
export async function GET(request: Request) {
  const adminId = request.headers.get('x-user-id');
  if (!adminId) return NextResponse.json({ error: 'No autenticado' }, { status: 401 });

  const admin = await db.user.findUnique({ where: { id: adminId }, select: { role: true } });
  if (!admin || admin.role !== 'admin') return NextResponse.json({ error: 'Sin permisos' }, { status: 403 });

  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');

  if (userId) {
    const user = await db.user.findUnique({
      where: { id: userId },
      select: { id: true, name: true, username: true, credits: true },
    });
    if (!user) return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 404 });

    const transactions = await db.creditTransaction.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: 50,
    });

    return NextResponse.json({ user, transactions });
  }

  // All users with credit info
  const users = await db.user.findMany({
    where: { role: 'client' },
    select: { id: true, name: true, username: true, email: true, phone: true, status: true, credits: true },
    orderBy: { createdAt: 'desc' },
  });

  return NextResponse.json({ users });
}

/* POST /api/admin/credits — Add credits to a user */
export async function POST(request: Request) {
  const adminId = request.headers.get('x-user-id');
  if (!adminId) return NextResponse.json({ error: 'No autenticado' }, { status: 401 });

  const admin = await db.user.findUnique({ where: { id: adminId }, select: { role: true } });
  if (!admin || admin.role !== 'admin') return NextResponse.json({ error: 'Sin permisos' }, { status: 403 });

  try {
    const body = await request.json();
    const { userId, amount, description } = body;

    if (!userId || !amount || amount <= 0) {
      return NextResponse.json({ error: 'Datos inválidos. Se requiere userId y amount > 0' }, { status: 400 });
    }

    const targetUser = await db.user.findUnique({ where: { id: userId }, select: { credits: true, name: true } });
    if (!targetUser) return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 404 });

    const updated = await db.user.update({
      where: { id: userId },
      data: { credits: { increment: amount } },
      select: { credits: true },
    });

    await db.creditTransaction.create({
      data: {
        userId,
        amount,
        type: 'admin_grant',
        description: description || `Administrador agregó ${amount} crédito${amount > 1 ? 's' : ''}`,
        adminId,
      },
    });

    return NextResponse.json({
      success: true,
      credits: updated.credits,
      message: `Se agregaron ${amount} crédito${amount > 1 ? 's' : ''} a ${targetUser.name}`,
    });
  } catch (error) {
    return NextResponse.json({ error: 'Error al agregar créditos' }, { status: 500 });
  }
}
