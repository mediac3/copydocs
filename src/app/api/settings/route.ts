import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Fetch all settings
    const settings = await db.siteSetting.findMany();
    const map: Record<string, string> = {};
    for (const s of settings) map[s.key] = s.value;
    return NextResponse.json(map);
  } catch {
    return NextResponse.json({}, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const userId = request.headers.get('x-user-id');
    if (!userId) return NextResponse.json({ error: 'No autenticado' }, { status: 401 });

    const user = await db.user.findUnique({ where: { id: userId } });
    if (!user || user.role !== 'admin') {
      return NextResponse.json({ error: 'Sin permisos' }, { status: 403 });
    }

    const body = await request.json();
    const results: Record<string, unknown> = {};

    for (const [key, value] of Object.entries(body)) {
      if (typeof value !== 'string') continue;
    
      const upsert = await db.siteSetting.upsert({
        where: { key },
        update: { value },
        create: { key, value },
      });
      results[key] = upsert.value;
    }

    return NextResponse.json({ success: true, settings: results });
  } catch (error) {
    console.error('Settings update error:', error);
    return NextResponse.json({ error: 'Error al guardar configuración' }, { status: 500 });
  }
}
