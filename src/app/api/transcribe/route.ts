// import { createOllama } from "ai-sdk-ollama";
// import { experimental_transcribe as transcribe } from "ai";
// import { tr } from "zod/locales";
// import { groq } from '@ai-sdk/groq';
// export async function POST(request: Request){
//   const formData = await request.formData();
//   const audioFile=formData.get("audio") as File;
//   if (!audioFile){
//     return new Response("No audio file provided", { status: 400 });
//   }
//   const audioArrayBuffer = await audioFile.arrayBuffer();
//   const audioUint8Array = new Uint8Array(audioArrayBuffer);
//   await transcribe({
//     model: "whisper-1",

//   })

// }