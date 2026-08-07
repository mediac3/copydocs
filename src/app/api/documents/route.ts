import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const userId = request.headers.get('x-user-id');
  if (!userId) return NextResponse.json({ error: 'No autenticado' }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const status = searchParams.get('status');
  const search = searchParams.get('search');

  const where: Record<string, unknown> = { userId };
  if (status && status !== 'all') (where as Record<string, unknown>).status = status;
  if (search) {
    (where as Record<string, unknown>).OR = [{ title: { contains: search } }];
  }

  const documents = await db.userDocument.findMany({
    where,
    include: { template: { select: { name: true, category: true } } },
    orderBy: { updatedAt: 'desc' }
  });

  return NextResponse.json({ documents });
}

export async function POST(request: Request) {
  const userId = request.headers.get('x-user-id');
  if (!userId) return NextResponse.json({ error: 'No autenticado' }, { status: 401 });

  try {
    const body = await request.json();
    const doc = await db.userDocument.create({
      data: {
        userId,
        templateId: body.templateId,
        title: body.title,
        status: 'draft',
        answers: JSON.stringify(body.answers || {}),
        generatedContent: null
      },
      include: { template: true }
    });
    return NextResponse.json({ document: doc }, { status: 201 });
  } catch (error) {
    console.error('Document creation error:', error);
    return NextResponse.json({ error: 'Error al crear documento' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  const userId = request.headers.get('x-user-id');
  if (!userId) return NextResponse.json({ error: 'No autenticado' }, { status: 401 });

  try {
    const body = await request.json();
    const doc = await db.userDocument.update({
      where: { id: body.id, userId },
      data: {
        title: body.title,
        status: body.status,
        answers: JSON.stringify(body.answers || {}),
        generatedContent: body.generatedContent || null
      },
      include: { template: true }
    });
    return NextResponse.json({ document: doc });
  } catch (error) {
    console.error('Document update error:', error);
    return NextResponse.json({ error: 'Error al actualizar documento' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const userId = request.headers.get('x-user-id');
  if (!userId) return NextResponse.json({ error: 'No autenticado' }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  if (!id) return NextResponse.json({ error: 'ID requerido' }, { status: 400 });

  try {
    await db.userDocument.delete({ where: { id, userId } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Error al eliminar documento' }, { status: 500 });
  }
}