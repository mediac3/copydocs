import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const publications = await db.publication.findMany({
      where: { active: true },
      orderBy: { order: 'asc' },
      select: {
        id: true,
        title: true,
        description: true,
        content: true,
        imageUrl: true,
        order: true,
      },
    });
    return NextResponse.json(publications);
  } catch (error) {
    console.error('Publications fetch error:', error);
    return NextResponse.json([], { status: 200 });
  }
}
