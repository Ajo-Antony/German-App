import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST() {
  return NextResponse.json({ message: 'Run supabase-setup.sql in your Supabase SQL Editor instead.' });
}
