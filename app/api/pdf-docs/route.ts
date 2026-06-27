import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export async function GET() {
  if (!supabaseAdmin) return NextResponse.json({ docs: [] });
  try {
    const { data: docs, error } = await supabaseAdmin
      .from('pdf_documents')
      .select(`id, name, word_count, created_at, pdf_words ( id, german, english, example, example_translation, type )`)
      .order('created_at', { ascending: false });

    if (error) throw error;

    const shaped = (docs || []).map((d: any) => ({
      id: d.id,
      name: d.name,
      date: d.created_at,
      words: (d.pdf_words || []).map((w: any) => ({
        german: w.german,
        english: w.english,
        example: w.example,
        exampleTranslation: w.example_translation,
        type: w.type,
      })),
    }));

    return NextResponse.json({ success: true, docs: shaped });
  } catch (error) {
    console.error('GET pdf-docs error:', error);
    return NextResponse.json({ docs: [] });
  }
}

export async function DELETE(req: NextRequest) {
  if (!supabaseAdmin) return NextResponse.json({ success: false });
  try {
    const { id } = await req.json();
    const { error } = await supabaseAdmin.from('pdf_documents').delete().eq('id', id);
    if (error) throw error;
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
