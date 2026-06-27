import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;
    if (!file) return NextResponse.json({ error: 'No file provided' }, { status: 400 });

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    console.log(`Processing PDF: ${file.name}, size: ${buffer.length} bytes`);

    // Extract text locally using pdf-parse — no API call
    let pdfText = '';
    try {
      const pdfParse = (await import('pdf-parse')).default;
      const pdfData = await pdfParse(buffer);
      pdfText = pdfData.text;
      console.log(`Extracted ${pdfText.length} characters from PDF`);
    } catch (pdfErr) {
      console.error('PDF parse error:', pdfErr);
      return NextResponse.json({ error: 'Failed to extract text from PDF' }, { status: 500 });
    }

    if (!pdfText.trim()) {
      return NextResponse.json({ error: 'No text found in PDF (scanned/image PDFs are not supported)' }, { status: 400 });
    }

    // Use Groq to extract German vocabulary from the text
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.GROQ_API_KEY || ''}`,
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        max_tokens: 4096,
        messages: [
          {
            role: 'system',
            content: `You are a German language assistant. Extract ALL German words and phrases from the provided text.
Return ONLY a valid JSON array with no markdown fences, no explanation, nothing else.
Format: [{"german":"word","english":"translation","example":"German sentence","exampleTranslation":"English translation","type":"noun|verb|adjective|phrase|adverb"}]
For nouns include gender: "der Hund", "die Katze", "das Kind".
Extract every single German word you can find. If there are no German words, return [].`,
          },
          {
            role: 'user',
            content: `Extract all German vocabulary from this text:\n\n${pdfText.substring(0, 12000)}`,
          },
        ],
      }),
    });

    let words: any[] = [];
    if (response.ok) {
      const data = await response.json();
      const text = data.choices?.[0]?.message?.content || '[]';
      try {
        const clean = text.replace(/^```json\s*/i, '').replace(/^```\s*/i, '').replace(/\s*```$/i, '').trim();
        words = JSON.parse(clean);
        if (!Array.isArray(words)) words = [];
      } catch { words = []; }
    }

    // Save to Supabase
    const docId = Date.now().toString();
    try {
      const { error: docError } = await supabaseAdmin
        .from('pdf_documents')
        .insert({ id: docId, name: file.name, word_count: words.length });

      if (!docError && words.length > 0) {
        const batchSize = 100;
        for (let i = 0; i < words.length; i += batchSize) {
          const batch = words.slice(i, i + batchSize).map((w: any) => ({
            doc_id: docId,
            german: w.german || '',
            english: w.english || '',
            example: w.example || null,
            example_translation: w.exampleTranslation || null,
            type: w.type || null,
          }));
          await supabaseAdmin.from('pdf_words').insert(batch);
        }
      }
    } catch (dbErr) {
      console.error('DB error (non-fatal):', dbErr);
    }

    return NextResponse.json({
      success: true,
      words,
      fileName: file.name,
      wordCount: words.length,
      docId,
      rawText: pdfText.substring(0, 50000), // for TTS playback in browser
    });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: `Failed to process PDF: ${String(error)}` }, { status: 500 });
  }
}
