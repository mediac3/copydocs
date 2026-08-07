import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const userId = request.headers.get('x-user-id');
  if (!userId) return NextResponse.json({ error: 'No autenticado' }, { status: 401 });

  const user = await db.user.findUnique({ where: { id: userId } });
  if (!user || user.role !== 'admin') return NextResponse.json({ error: 'Sin permisos' }, { status: 403 });

  const [totalUsers, totalDocuments, totalTemplates, totalCredits, recentDocs, monthlyStats] = await Promise.all([
    db.user.count({ where: { role: 'client' } }),
    db.userDocument.count(),
    db.documentTemplate.count({ where: { status: 'published' } }),
    db.user.aggregate({ _sum: { credits: true } }),
    db.userDocument.findMany({ take: 5, include: { user: { select: { name: true } }, template: { select: { name: true } } }, orderBy: { createdAt: 'desc' } }),
    db.$queryRaw<Array<{month: string, count: number}>>`
      SELECT strftime('%Y-%m', createdAt) as month, COUNT(*) as count
      FROM UserDocument
      WHERE createdAt >= datetime('now', '-6 months')
      GROUP BY strftime('%Y-%m', createdAt)
      ORDER BY month
    `
  ]);

  const templateStats = await db.documentTemplate.findMany({
    where: { status: 'published' },
    include: { _count: { select: { documents: true } } },
    orderBy: { documents: { _count: 'desc' } },
    take: 5
  });

  return NextResponse.json({
    stats: {
      totalUsers,
      totalDocuments,
      totalTemplates,
      totalCredits: totalCredits._sum.credits || 0,
      recentDocs,
      monthlyStats,
      topTemplates: templateStats
    }
  });
}

export async function POST(request: Request) {
  const userId = request.headers.get('x-user-id');
  if (!userId) return NextResponse.json({ error: 'No autenticado' }, { status: 401 });

  const user = await db.user.findUnique({ where: { id: userId } });
  if (!user || user.role !== 'admin') return NextResponse.json({ error: 'Sin permisos' }, { status: 403 });

  try {
    const body = await request.json();
    const { action } = body;

    if (action === 'create_template') {
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
          wizardConfig: JSON.stringify(body.wizardConfig || { steps: [] }),
          status: body.status || 'draft'
        }
      });
      return NextResponse.json({ template }, { status: 201 });
    }

    if (action === 'update_template_status') {
      const template = await db.documentTemplate.update({
        where: { id: body.templateId },
        data: { status: body.status }
      });
      return NextResponse.json({ template });
    }

    if (action === 'update_user_status') {
      const updatedUser = await db.user.update({
        where: { id: body.userId },
        data: { status: body.status, role: body.role || undefined }
      });
      const { passwordHash, ...safe } = updatedUser;
      return NextResponse.json({ user: safe });
    }

    if (action === 'handle_request') {
      const req = await db.documentRequest.update({
        where: { id: body.requestId },
        data: { status: body.status, adminNotes: body.adminNotes }
      });
      return NextResponse.json({ request: req });
    }

    return NextResponse.json({ error: 'Acción no válida' }, { status: 400 });
  } catch (error) {
    console.error('Admin action error:', error);
    return NextResponse.json({ error: 'Error en la acción' }, { status: 500 });
  }
}