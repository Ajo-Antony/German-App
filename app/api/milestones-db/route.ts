import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export async function GET() {
  if (!supabaseAdmin) return NextResponse.json({ milestones: [] });
  try {
    const { data, error } = await supabaseAdmin
      .from('milestones')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(200);

    if (error) throw error;

    const shaped = (data || []).map((m: any) => ({
      id: m.id,
      phraseId: m.phrase_id,
      german: m.german,
      score: m.score,
      date: m.created_at,
    }));

    return NextResponse.json({ success: true, milestones: shaped });
  } catch (error) {
    return NextResponse.json({ milestones: [] });
  }
}

export async function POST(req: NextRequest) {
  if (!supabaseAdmin) return NextResponse.json({ success: false });
  try {
    const { id, phraseId, german, score } = await req.json();
    const { error } = await supabaseAdmin
      .from('milestones')
      .insert({ id, phrase_id: phraseId, german, score });

    if (error) throw error;
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
