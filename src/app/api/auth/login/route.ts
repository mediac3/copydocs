import { db } from '@/lib/db';
import { compare } from 'bcryptjs';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json({ error: 'Usuario y contraseña son requeridos' }, { status: 400 });
    }

    const user = await db.user.findUnique({ where: { username } });

    if (!user) {
      return NextResponse.json({ error: 'Credenciales inválidas' }, { status: 401 });
    }

    if (user.status !== 'active') {
      return NextResponse.json({ error: 'Su cuenta ha sido suspendida. Contacte al administrador.' }, { status: 403 });
    }

    const isValid = await compare(password, user.passwordHash);

    if (!isValid) {
      return NextResponse.json({ error: 'Credenciales inválidas' }, { status: 401 });
    }

    const { passwordHash, ...safeUser } = user;

    const response = NextResponse.json({
      user: safeUser,
      token: `lexdoc-${user.id}-${Date.now()}`
    });

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}