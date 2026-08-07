import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

// POST /api/documents/visitor — save a visitor document (no auth required)
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { templateId, title, answers, generatedContent, visitorPhone, visitorName } = body;

    if (!templateId || !title) {
      return NextResponse.json({ error: 'templateId y title son requeridos' }, { status: 400 });
    }

    const doc = await db.userDocument.create({
      data: {
        userId: null,
        templateId,
        title,
        answers: JSON.stringify(answers || {}),
        generatedContent: generatedContent || null,
        status: 'completed',
        visitorPhone: visitorPhone || null,
        visitorName: visitorName || null,
      },
      include: { template: { select: { name: true, category: true } } },
    });

    return NextResponse.json({ document: doc }, { status: 201 });
  } catch (error) {
    console.error('Visitor document creation error:', error);
    return NextResponse.json({ error: 'Error al guardar documento' }, { status: 500 });
  }
}
