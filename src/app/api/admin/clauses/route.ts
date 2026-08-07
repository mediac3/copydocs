import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  const clauses = await db.clause.findMany({ orderBy: { createdAt: 'desc' } });
  return NextResponse.json({ clauses });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const clause = await db.clause.create({
      data: { title: body.title, content: body.content, legalArea: body.legalArea, category: body.category, isDefault: body.isDefault || false }
    });
    return NextResponse.json({ clause }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Error al crear cláusula' }, { status: 500 });
  }
}
