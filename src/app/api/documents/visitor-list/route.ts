import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

// GET /api/documents/visitor-list — list visitor documents (for admin requests page)
export async function GET() {
  try {
    const documents = await db.userDocument.findMany({
      where: { userId: null },
      include: { template: { select: { name: true, category: true } } },
      orderBy: { updatedAt: 'desc' },
    });
    return NextResponse.json({ documents });
  } catch (error) {
    console.error('Visitor documents list error:', error);
    return NextResponse.json({ error: 'Error al obtener documentos' }, { status: 500 });
  }
}
