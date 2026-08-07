import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  const users = await db.user.findMany({
    select: { id: true, username: true, name: true, email: true, role: true, status: true, credits: true, createdAt: true, _count: { select: { documents: true } } },
    orderBy: { createdAt: 'desc' }
  });
  return NextResponse.json({ users });
}
