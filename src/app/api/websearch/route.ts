import { UIMessage,streamText ,convertToModelMessages,tool,InferUITools,UIDataTypes,stepCountIs} from "ai";
import { NextResponse } from 'next/server';
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { 
  tavilySearch, 
  tavilyExtract, 
  tavilyCrawl, 
  tavilyMap 
} from "@tavily/ai-sdk";
import {z} from 'zod';

const google = createGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
});

const tools={
  tavilySearch: tavilySearch({ 
    searchDepth: "advanced",
    apiKey: process.env.TAVILY_API_KEY,
  }),
  
}

export type ChatTools=InferUITools<typeof tools>;
export type ChatMessage=UIMessage<never,UIDataTypes,ChatTools>; 

export async function POST(request: Request) {
  const { messages }:{messages: ChatMessage[]} = await request.json();

  try {
    console.log(`[WebSearch] Processing ${messages.length} messages`);
    
    const result = streamText({
      model: google("gemini-2.5-flash"),
      tools,
      messages: await convertToModelMessages(messages),
      stopWhen: stepCountIs(5),
      system: "You are a research assistant. Use Tavily tools to search, extract, crawl, and map information. Provide comprehensive research reports with sources."
    });

    return result.toUIMessageStreamResponse();
  } catch (err: any) {
    console.error('/api/websearch error:', err?.stack ?? err);
    return NextResponse.json({ error: String(err?.message ?? err) }, { status: 500 });
  }
}