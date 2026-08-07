import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  const plans = await db.subscriptionPlan.findMany({ where: { isActive: true }, orderBy: { price: 'asc' } });
  return NextResponse.json({ plans });
}
