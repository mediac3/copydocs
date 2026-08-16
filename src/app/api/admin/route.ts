import { db } from '@/lib/db';
import { NextResponse } from 'next/server';
import { hash as bcryptHash } from 'bcryptjs';

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
          headerContent: body.headerContent || null,
          footerContent: body.footerContent || null,
          wizardConfig: JSON.stringify(body.wizardConfig || { steps: [] }),
          status: body.status || 'draft'
        }
      });
      return NextResponse.json({ template }, { status: 201 });
    }

    if (action === 'update_template') {
      const template = await db.documentTemplate.update({
        where: { id: body.templateId },
        data: {
          name: body.name,
          description: body.description,
          category: body.category,
          legalArea: body.legalArea,
          audience: body.audience || 'particulares',
          price: body.price || 0,
          baseContent: body.baseContent,
          headerContent: body.headerContent || null,
          footerContent: body.footerContent || null,
          wizardConfig: JSON.stringify(body.wizardConfig || { steps: [] }),
          status: body.status || 'draft',
        }
      });
      return NextResponse.json({ template });
    }

    if (action === 'update_template_status') {
      const template = await db.documentTemplate.update({
        where: { id: body.templateId },
        data: { status: body.status }
      });
      return NextResponse.json({ template });
    }

    // Set which paragraph numbers (1-based block indices) are blurred for
    // visitors in the document preview of a template
    if (action === 'update_template_blur') {
      const raw: unknown = Array.isArray(body.paragraphs)
        ? body.paragraphs
        : [];
      const paragraphs = [...new Set(
        (raw as unknown[]).filter((n): n is number => typeof n === 'number' && Number.isInteger(n) && n > 0)
      )].sort((a, b) => a - b);
      const template = await db.documentTemplate.update({
        where: { id: body.templateId },
        data: { blurParagraphs: JSON.stringify(paragraphs) }
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

    // ---- User CRUD -----------------------------------------------------
    if (action === 'create_user') {
      const username = String(body.username ?? '').trim();
      const password = String(body.password ?? '');
      const name = String(body.name ?? '').trim();
      if (!username || !password || !name) {
        return NextResponse.json({ error: 'Usuario, contraseña y nombre son obligatorios' }, { status: 400 });
      }
      const exists = await db.user.findUnique({ where: { username } });
      if (exists) {
        return NextResponse.json({ error: 'Ese nombre de usuario ya existe' }, { status: 409 });
      }
      const passwordHash = await bcryptHash(password, 10);
      const created = await db.user.create({
        data: {
          username,
          passwordHash,
          name,
          email: body.email || null,
          phone: body.phone || null,
          role: body.role === 'admin' ? 'admin' : 'client',
          status: 'active',
          credits: typeof body.credits === 'number' ? body.credits : 10,
        }
      });
      const { passwordHash: _ph, ...safe } = created;
      return NextResponse.json({ user: safe }, { status: 201 });
    }

    if (action === 'update_user') {
      const data: Record<string, unknown> = {
        name: String(body.name ?? '').trim(),
        email: body.email || null,
        phone: body.phone || null,
        role: body.role === 'admin' ? 'admin' : 'client',
        status: body.status === 'suspended' ? 'suspended' : 'active',
        credits: typeof body.credits === 'number' ? body.credits : 0,
      };
      const newPass = String(body.password ?? '');
      if (newPass) data.passwordHash = await bcryptHash(newPass, 10);
      const updated = await db.user.update({ where: { id: body.userId }, data });
      const { passwordHash: _ph2, ...safe } = updated;
      return NextResponse.json({ user: safe });
    }

    if (action === 'delete_user') {
      await db.user.delete({ where: { id: body.userId } });
      return NextResponse.json({ success: true });
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