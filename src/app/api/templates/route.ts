import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const legalArea = searchParams.get('legalArea');
  const audience = searchParams.get('audience');
  const search = searchParams.get('search');
  const priceFilter = searchParams.get('price');

  const where: Record<string, unknown> = { status: 'published' };

  if (category && category !== 'all') (where as Record<string, unknown>).category = category;
  if (legalArea && legalArea !== 'all') (where as Record<string, unknown>).legalArea = legalArea;
  if (audience && audience !== 'all') (where as Record<string, unknown>).audience = audience;
  if (priceFilter === 'free') (where as Record<string, unknown>).price = 0;
  else if (priceFilter === 'paid') (where as Record<string, unknown>).price = { gt: 0 };
  if (search) {
    (where as Record<string, unknown>).OR = [
      { name: { contains: search } },
      { description: { contains: search } }
    ];
  }

  const templates = await db.documentTemplate.findMany({
    where,
    include: {
      normativity: true,
      _count: { select: { documents: true } }
    },
    orderBy: { createdAt: 'desc' }
  });

  return NextResponse.json({ templates });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const template = await db.documentTemplate.create({
      data: {
        name: body.name,
        description: body.description,
        category: body.category,
        legalArea: body.legalArea,
        audience: body.audience || 'particulares',
        price: body.price || 0,
        estimatedQuestions: body.estimatedQuestions || 10,
        estimatedMinutes: body.estimatedMinutes || 5,
        baseContent: body.baseContent,
        wizardConfig: JSON.stringify(body.wizardConfig),
        status: body.status || 'draft'
      }
    });
    return NextResponse.json({ template }, { status: 201 });
  } catch (error) {
    console.error('Template creation error:', error);
    return NextResponse.json({ error: 'Error al crear la plantilla' }, { status: 500 });
  }
}