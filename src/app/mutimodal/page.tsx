// "use client";
// import React, { useState,useRef } from "react";
// import { useChat } from "@ai-sdk/react";
// import { DefaultChatTransport } from "ai";
// import Image from "next/image";

// const Page = () => {
//   const [input, setInput] = useState("");
//   const [files,setFiles]=useState<FileList | undefined>(undefined);
//   const fileInputRef=useRef<HTMLInputElement | null>(null);
//   const { messages, sendMessage, status, error, stop } = useChat({
//     transport: new DefaultChatTransport({
//       api: "/api/mutimodal",
//     }),
//   });
//   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     if (!input.trim()) return;
//     sendMessage({
//       text: input,
//       files
//     });
//     setInput("");
//     setFiles(undefined);
//     if(fileInputRef.current){
//       fileInputRef.current.value="";
//     }
//   };

//   const lastMessage = messages.length ? messages[messages.length - 1] : null;
//   const isLoading =
//     (status === "submitted" || status === "streaming") &&
//     lastMessage?.role === "user";

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
//       <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
//         <h1 className="text-xl font-bold mb-4 text-gray-800 text-center">
//           Chat Assistant
//         </h1>
//         <div className="h-64 mb-4 p-3 bg-gray-50 border border-gray-200 rounded overflow-y-auto text-gray-700">
//           {error && (
//             <div className="text-red-600 mb-2">Error: {error.message}</div>
//           )}
//           {messages.map((msg) => (
//             <div
//               key={msg.id}
//               className={`mb-2 ${msg.role === "user" ? "text-blue-700" : "text-green-700"}`}
//             >
//               <span className="font-semibold">
//                 {msg.role === "user" ? "You: " : "AI: "}
//               </span>
//               {msg.parts.map((part, pIndex) => {
//                 switch (part.type) {
//                   case "text":
//                     return (
//                       <div
//                         key={`${msg.id}-part-${pIndex}`}
//                         className="whitespace-pre-wrap"
//                       >
//                         {part.text}
//                       </div>
//                     );
//                   case "file":
//                     if(part.mediaType?.startsWith("image/")){
//                       return <Image key={`${msg.id}-part-${pIndex}`} src={part.url} alt="uploaded image" width={200} height={200} />
//                     }
//                   if(part.mediaType?.startsWith("application/pdf")){
//                     return <iframe key={`${msg.id}-part-${pIndex}`} src={part.url} className="text-blue-600 underline" width="300" height="300">View PDF</iframe>
//                   }
//                   default:
//                     return null;
//                 }
//               })}
//             </div>
//           ))}

//           {isLoading && (
//             <div className="flex items-center text-gray-500 mt-2">
//               <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-blue-600 mr-2" />
//               <span>AI is typing...</span>
//               <button
//                 onClick={stop}
//                 className="ml-3 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
//               >
//                 Stop
//               </button>
//             </div>
//           )}
//         </div>
//         <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
//           <input
//             ref={fileInputRef}
//             type="file"
//             accept="image/*"
//             multiple
//             className="px-3 py-2 border border-gray-300 rounded text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             onChange={(e) => setFiles(e.target.files ?? undefined)}
//           />
//           <input
//             type="text"
//             placeholder="How can I help you?"
//             className="flex-1 px-3 py-2 border border-gray-300 rounded text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             value={input}
//             onChange={(e) => setInput(e.target.value)}
//           />
//           <button
//             type="submit"
//             className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition disabled:opacity-50"
//             disabled={status !== "ready"}
//           >
//             Send
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Page;
// // ...existing code...
"use client";
import React, { useState, useRef } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import Image from "next/image";

const Page = () => {
  const [input, setInput] = useState("");
  const [files, setFiles] = useState<FileList | undefined>(undefined);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { messages, sendMessage, status, error, stop } = useChat({
    transport: new DefaultChatTransport({
      api: "/api/mutimodal",
    }),
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim()) return;
    sendMessage({
      text: input,
      files,
    });
    setInput("");
    setFiles(undefined);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const lastMessage = messages.length ? messages[messages.length - 1] : null;
  const isLoading =
    (status === "submitted" || status === "streaming") &&
    lastMessage?.role === "user";

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-4">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
          <h1 className="text-3xl font-bold text-center">Chat Assistant</h1>
          <p className="text-blue-100 text-center mt-1 text-sm">Powered by AI</p>
        </div>

        {/* Messages Container */}
        <div className="h-96 p-6 bg-gray-50 border-b border-gray-200 overflow-y-auto space-y-4">
          {error && (
            <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
              <span className="text-2xl">⚠️</span>
              <span className="font-medium">Error: {error.message}</span>
            </div>
          )}

          {messages.length === 0 && !isLoading && (
            <div className="flex items-center justify-center h-full text-gray-400">
              <div className="text-center">
                <p className="text-4xl mb-2">💬</p>
                <p className="text-lg font-medium">Start a conversation</p>
              </div>
            </div>
          )}

          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-3 rounded-lg ${
                  msg.role === "user"
                    ? "bg-blue-600 text-white rounded-br-none"
                    : "bg-gray-200 text-gray-900 rounded-bl-none"
                }`}
              >
                {msg.parts.map((part, pIndex) => {
                  switch (part.type) {
                    case "text":
                      return (
                        <div
                          key={`${msg.id}-part-${pIndex}`}
                          className="whitespace-pre-wrap break-words text-sm leading-relaxed"
                        >
                          {part.text}
                        </div>
                      );
                    case "file":
                      if (part.mediaType?.startsWith("image/")) {
                        return (
                          <Image
                            key={`${msg.id}-part-${pIndex}`}
                            src={part.url}
                            alt="uploaded image"
                            width={250}
                            height={250}
                            className="rounded-lg mt-2 max-w-full h-auto"
                          />
                        );
                      }
                      if (part.mediaType?.startsWith("application/pdf")) {
                        return (
                          <iframe
                            key={`${msg.id}-part-${pIndex}`}
                            src={part.url}
                            className="rounded-lg mt-2"
                            width="250"
                            height="300"
                          >
                            View PDF
                          </iframe>
                        );
                      }
                      default:
                        return null;
                  }
                })}
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start">
              <div className="flex items-center gap-3 p-4 bg-gray-100 rounded-lg rounded-bl-none">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-gray-600 rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-gray-600 rounded-full animate-bounce delay-100" />
                  <div className="w-2 h-2 bg-gray-600 rounded-full animate-bounce delay-200" />
                </div>
                <span className="text-gray-700 text-sm font-medium">AI is typing...</span>
                <button
                  onClick={stop}
                  className="ml-2 px-3 py-1 text-xs bg-red-500 text-white rounded-full hover:bg-red-600 transition font-medium"
                >
                  Stop
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="p-6 bg-white border-t border-gray-200">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="relative">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*,.pdf"
                multiple
                className="hidden"
                id="file-input"
                onChange={(e) => setFiles(e.target.files ?? undefined)}
              />
              <label
                htmlFor="file-input"
                className="flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed border-blue-300 rounded-lg cursor-pointer hover:bg-blue-50 transition bg-white text-gray-700 font-medium"
              >
                <span>📎</span>
                <span>
                  {files?.length ? `${files.length} file(s) selected` : "Attach files"}
                </span>
              </label>
            </div>

            <div className="flex gap-3">
              <input
                type="text"
                placeholder="Ask me anything..."
                className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <button
                type="submit"
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
                disabled={status !== "ready"}
              >
                Send
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Page;