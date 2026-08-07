import { NextResponse } from 'next/server';

// Plans have been replaced by the credit system.
// This endpoint is kept for backwards compatibility.
export async function GET() {
  return NextResponse.json({ plans: [] });
}
