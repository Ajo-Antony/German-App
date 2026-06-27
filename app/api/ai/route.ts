import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const { messages, system } = await req.json();

    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'GROQ_API_KEY not set' }, { status: 500 });
    }

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        max_tokens: 1024,
        messages: [
          { role: 'system', content: system || 'You are a helpful German language tutor.' },
          ...messages,
        ],
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error('Groq API error:', errText);
      return NextResponse.json({ error: `AI API error: ${response.status}` }, { status: 500 });
    }

    const data = await response.json();

    // Normalize to Anthropic-style response shape so the frontend doesn't need changes
    return NextResponse.json({
      content: [{ type: 'text', text: data.choices?.[0]?.message?.content || '' }],
    });
  } catch (error) {
    console.error('AI route error:', error);
    return NextResponse.json({ error: 'Failed to call AI' }, { status: 500 });
  }
}
