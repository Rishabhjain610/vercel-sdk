
import { UIMessage,streamText ,convertToModelMessages} from "ai";
import { NextResponse } from 'next/server';
import { createOllama } from 'ai-sdk-ollama';

const ollama = createOllama({ baseURL: 'http://127.0.0.1:11434' });
export async function POST(request: Request) {
  const { messages }:{messages: UIMessage[]} = await request.json();

  try {
    const result =  streamText({
      model: ollama('qwen3-coder:480b-cloud'),
      
      messages: await convertToModelMessages(messages),
    });

    return result.toUIMessageStreamResponse();
  } catch (err: any) {
    console.error('/api/chat error:', err?.stack ?? err);
    return NextResponse.json({ error: String(err?.message ?? err) }, { status: 500 });
  }
}
