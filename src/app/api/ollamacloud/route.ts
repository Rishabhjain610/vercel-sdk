import { NextResponse } from 'next/server';
import { generateText } from 'ai';
import { createOllama } from 'ai-sdk-ollama';

const ollama = createOllama({ baseURL: 'http://127.0.0.1:11434' });

export async function POST(request: Request) {
  try {
    // const { prompt } = await request.json();
    // if (!prompt) return NextResponse.json({ error: 'Missing prompt' }, { status: 400 });

    const { text } = await generateText({
      model: ollama('qwen3-coder:480b-cloud'),
      prompt:"Tell me a joke about programming.",
    });

    return NextResponse.json({ text });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}