import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  const requests = await db.documentRequest.findMany({
    orderBy: { createdAt: 'desc' },
    include: { user: { select: { name: true, email: true } } }
  });
  return NextResponse.json({ requests });
}

export async function POST(request: Request) {
  const userId = request.headers.get('x-user-id');
  try {
    const body = await request.json();
    const req = await db.documentRequest.create({
      data: { userId: userId || null, title: body.title, description: body.description }
    });
    return NextResponse.json({ request: req }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Error al crear solicitud' }, { status: 500 });
  }
}