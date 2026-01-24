// ...existing code...
import { streamText } from "ai";
import { NextResponse } from "next/server";
import { createOllama } from "ai-sdk-ollama";
import { text } from "stream/consumers";

const ollama = createOllama({ baseURL: "http://127.0.0.1:11434" });
export async function POST(request: Request) {
  const body = await request.json();
  const prompt = body.prompt;

  if (!prompt) {
    return Response.json({ error: "prompt is required" }, { status: 400 });
  }
  try {
    const result = streamText({
      model: ollama("qwen3-coder:480b-cloud"),
      
      prompt: prompt,
    });

   
    return result.toUIMessageStreamResponse();

  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

