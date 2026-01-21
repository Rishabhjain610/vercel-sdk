// ...existing code...
import { NextResponse } from 'next/server';
import { generateText } from 'ai';
import { google } from '@ai-sdk/google';

export async function POST(request: Request) {
  try {
    
    const { text } = await generateText({
      model: google('gemini-2.5-flash-lite'),
      prompt:  'Write a short poem about the sea.',
    });

    return NextResponse.json({ text });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
