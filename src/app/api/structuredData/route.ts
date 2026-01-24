import { streamObject } from "ai";
import { createOllama } from "ai-sdk-ollama";
import { receipeSchema } from "./schema";
const ollama = createOllama({ baseURL: "http://127.0.0.1:11434" });
export async function POST(request: Request) {
  try {
    const { dish } = await request.json();
    const result = streamObject({
      model: ollama("qwen3-coder:480b-cloud"),
      prompt: `Provide a detailed recipe for making ${dish}. Include ingredients and step-by-step instructions in JSON format.`,
      schema: receipeSchema,
    });
    return result.toTextStreamResponse();
  } catch (err: any) {
    console.error("/api/structuredData error:", err?.stack ?? err);
    return new Response(
      JSON.stringify({ error: String(err?.message ?? err) }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }
}
