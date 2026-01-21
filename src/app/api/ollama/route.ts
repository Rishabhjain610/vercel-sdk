import { NextResponse } from 'next/server';
import { generateText } from 'ai';
import { createOllama } from 'ai-sdk-ollama';

const ollama = createOllama({ baseURL: 'http://127.0.0.1:11434' });

export async function POST(request: Request) {
  try {
    

    const { text } = await generateText({
      model: ollama('qwen2.5-coder:3b'),
      prompt:" Write a short poem about the sea.",
    });

    return NextResponse.json({ text });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}