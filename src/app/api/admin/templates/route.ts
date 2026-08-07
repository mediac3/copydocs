import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  const templates = await db.documentTemplate.findMany({
    include: { _count: { select: { documents: true } }, normativity: true },
    orderBy: { createdAt: 'desc' }
  });
  return NextResponse.json({ templates });
}
