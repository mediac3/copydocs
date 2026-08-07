import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const userId = request.headers.get('x-user-id');
  if (!userId) {
    return NextResponse.json({ error: 'No autenticado' }, { status: 401 });
  }
  const { db } = await import('@/lib/db');
  const user = await db.user.findUnique({
    where: { id: userId },
    select: { id: true, username: true, name: true, email: true, phone: true, role: true, status: true, credits: true }
  });
  if (!user) return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 404 });
  return NextResponse.json({ user });
}