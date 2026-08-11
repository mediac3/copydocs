import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const publications = await db.publication.findMany({
      orderBy: { order: 'asc' },
    });
    return NextResponse.json(publications);
  } catch (error) {
    console.error('Admin publications fetch error:', error);
    return NextResponse.json({ error: 'Error al obtener publicaciones' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, description, content, imageUrl, order, active } = body;

    if (!title?.trim() || !description?.trim()) {
      return NextResponse.json({ error: 'Título y descripción son requeridos' }, { status: 400 });
    }

    const maxOrder = await db.publication.findFirst({
      orderBy: { order: 'desc' },
      select: { order: true },
    });
    const nextOrder = (maxOrder?.order ?? -1) + 1;

    const publication = await db.publication.create({
      data: {
        title: title.trim(),
        description: description.trim(),
        content: content || '',
        imageUrl: imageUrl || null,
        order: order ?? nextOrder,
        active: active ?? true,
      },
    });

    return NextResponse.json(publication, { status: 201 });
  } catch (error) {
    console.error('Publication create error:', error);
    return NextResponse.json({ error: 'Error al crear publicación' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, title, description, content, imageUrl, order, active } = body;

    if (!id) {
      return NextResponse.json({ error: 'ID requerido' }, { status: 400 });
    }

    const data: Record<string, unknown> = {};
    if (title !== undefined) data.title = title.trim();
    if (description !== undefined) data.description = description.trim();
    if (content !== undefined) data.content = content;
    if (imageUrl !== undefined) data.imageUrl = imageUrl || null;
    if (order !== undefined) data.order = order;
    if (active !== undefined) data.active = active;

    const publication = await db.publication.update({
      where: { id },
      data,
    });

    return NextResponse.json(publication);
  } catch (error) {
    console.error('Publication update error:', error);
    return NextResponse.json({ error: 'Error al actualizar publicación' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'ID requerido' }, { status: 400 });
    }

    await db.publication.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Publication delete error:', error);
    return NextResponse.json({ error: 'Error al eliminar publicación' }, { status: 500 });
  }
}
