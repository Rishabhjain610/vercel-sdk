
import { UIMessage,streamText ,convertToModelMessages,tool,InferUITools,UIDataTypes,stepCountIs} from "ai";
import { NextResponse } from 'next/server';
import { createOllama } from 'ai-sdk-ollama';
import axios from 'axios';
import {z} from 'zod';
import { text } from "stream/consumers";
const tools={
  getWeather:tool({
    description:"Get the current weather for a given location",
    inputSchema:z.object({
      city:z.string().describe("The city to get the weather for"),
    }),
    execute:async({city})=>{
      // Mock weather data
      const response=await axios.get(`https://api.weatherapi.com/v1/current.json?key=${process.env.WEATHER_API_KEY}&q=${city}`);
      const weatherData = {
        location:{
          name: response.data.location.name,
          region: response.data.location.region,
          country: response.data.location.country,
          localtime: response.data.location.localtime,
        },
        current:{
          temp_c: response.data.current.temp_c,
          condition: {
            text: response.data.current.condition.text,
            code: response.data.current.condition.code,

          }
        }
      };
      console.log('Fetched weather data:', weatherData);
      return weatherData;
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
      stopWhen: stepCountIs(2),
      messages: await convertToModelMessages(messages),
    });

    return result.toUIMessageStreamResponse();
  } catch (err: any) {
    console.error('/api/chat error:', err?.stack ?? err);
    return NextResponse.json({ error: String(err?.message ?? err) }, { status: 500 });
  }
}
