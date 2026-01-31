
import { UIMessage,streamText ,convertToModelMessages,tool,InferUITools,UIDataTypes,stepCountIs} from "ai";
import { NextResponse } from 'next/server';
import { createOllama } from 'ai-sdk-ollama';

import {z} from 'zod';
const tools={
  getLocation:tool({
    description:"Get location of a user",
    inputSchema:z.object({
      name:z.string().describe("The name of the user"),
    }),
    execute:async({name})=>{
      if(name.toLowerCase()==="alice"){
        return "New York, USA";
      } else if(name.toLowerCase()==="bob"){
        return "San Francisco, USA";
      }
      return "Unknown Location";
      // Mock location data 
    }
  }),
  getWeather:tool({
    description:"Get the current weather for a given location",
    inputSchema:z.object({
      city:z.string().describe("The city to get the weather for"),
    }),
    execute:async({city})=>{
      // Mock weather data
      const weatherData={
        temperature:"25°C",
        condition:"Sunny",
      };
      return `The current weather in ${city} is ${weatherData.temperature} with ${weatherData.condition}.`;
    }
  })
}
export type ChatTools=InferUITools<typeof tools>;
export type ChatMessage=UIMessage<never,UIDataTypes,ChatTools>; 

const ollama = createOllama({ baseURL: 'http://127.0.0.1:11434' });
export async function POST(request: Request) {
  const { messages }:{messages: ChatMessage[]} = await request.json();

  try {
    const result =  streamText({
      model: ollama('qwen3-coder:480b-cloud'),
      
      tools,
      stopWhen: stepCountIs(3),
      messages: await convertToModelMessages(messages),
    });

    return result.toUIMessageStreamResponse();
  } catch (err: any) {
    console.error('/api/chat error:', err?.stack ?? err);
    return NextResponse.json({ error: String(err?.message ?? err) }, { status: 500 });
  }
}
