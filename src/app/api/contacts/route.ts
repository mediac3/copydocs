import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const userId = request.headers.get('x-user-id');
  if (!userId) return NextResponse.json({ error: 'No autenticado' }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const search = searchParams.get('search');
  const contactType = searchParams.get('type');

  const where: Record<string, unknown> = { userId };
  if (search) {
    (where as Record<string, unknown>).OR = [
      { name: { contains: search } },
      { documentNumber: { contains: search } },
      { companyName: { contains: search } }
    ];
  }
  if (contactType && contactType !== 'all') (where as Record<string, unknown>).contactType = contactType;

  const contacts = await db.contact.findMany({
    where,
    orderBy: { updatedAt: 'desc' }
  });

  return NextResponse.json({ contacts });
}

export async function POST(request: Request) {
  const userId = request.headers.get('x-user-id');
  if (!userId) return NextResponse.json({ error: 'No autenticado' }, { status: 401 });

  try {
    const body = await request.json();
    const contact = await db.contact.create({
      data: {
        userId,
        name: body.name,
        contactType: body.contactType,
        documentType: body.documentType,
        documentNumber: body.documentNumber,
        address: body.address,
        city: body.city,
        phone: body.phone,
        email: body.email,
        companyName: body.companyName,
        notes: body.notes
      }
    });
    return NextResponse.json({ contact }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Error al crear contacto' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  const userId = request.headers.get('x-user-id');
  if (!userId) return NextResponse.json({ error: 'No autenticado' }, { status: 401 });

  try {
    const body = await request.json();
    const contact = await db.contact.update({
      where: { id: body.id, userId },
      data: {
        name: body.name,
        contactType: body.contactType,
        documentType: body.documentType,
        documentNumber: body.documentNumber,
        address: body.address,
        city: body.city,
        phone: body.phone,
        email: body.email,
        companyName: body.companyName,
        notes: body.notes
      }
    });
    return NextResponse.json({ contact });
  } catch (error) {
    return NextResponse.json({ error: 'Error al actualizar contacto' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const userId = request.headers.get('x-user-id');
  if (!userId) return NextResponse.json({ error: 'No autenticado' }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  if (!id) return NextResponse.json({ error: 'ID requerido' }, { status: 400 });

  try {
    await db.contact.delete({ where: { id, userId } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Error al eliminar contacto' }, { status: 500 });
  }
}