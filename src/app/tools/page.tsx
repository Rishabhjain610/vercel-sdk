"use client";
import React, { useState } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import type { ChatMessage } from "../api/tools/route";
const Page = () => {
  const [input, setInput] = useState("");

  const { messages, sendMessage, status, error, stop } = useChat<ChatMessage>({
    transport: new DefaultChatTransport({
      api: "/api/tools",
    }),
  });
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim()) return;
    sendMessage({
      text: input,
    });
    setInput("");
  };

  const lastMessage = messages.length ? messages[messages.length - 1] : null;
  const isLoading =
    (status === "submitted" || status === "streaming") &&
    lastMessage?.role === "user";

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <h1 className="text-xl font-bold mb-4 text-gray-800 text-center">
          Chat Assistant
        </h1>
        <div className="h-64 mb-4 p-3 bg-gray-50 border border-gray-200 rounded overflow-y-auto text-gray-700">
          {error && (
            <div className="text-red-600 mb-2">Error: {error.message}</div>
          )}
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`mb-2 ${msg.role === "user" ? "text-blue-700" : "text-green-700"}`}
            >
              <span className="font-semibold">
                {msg.role === "user" ? "You: " : "AI: "}
              </span>
              {msg.parts.map((part, pIndex) => {
                switch (part.type) {
                  case "text":
                    return (
                      <div
                        key={`${msg.id}-part-${pIndex}`}
                        className="whitespace-pre-wrap"
                      >
                        {part.text}
                      </div>
                    );
                  case "tool-getWeather":
                    switch (part.state) {
                      case "input-streaming":
                        return (
                          <div key={`${msg.id}-getWeather-${pIndex}`}>
                            <div>Receiving request</div>
                            <pre className="text-xs text-zinc-600 mt-1">
                              {JSON.stringify(part.input, null, 2)}
                            </pre>
                          </div>
                        );
                      case "input-available":  
                        return (
                          <div key={`${msg.id}-getWeather-${pIndex}`} className="bg-zinc-800/50 border border-zinc-700 p-2 rounded">
                            <div className="text-sm text-zinc-400">
                              Weather request for city: <strong>{part.input.city}</strong>
                            </div>
                            
                          </div>
                        );
                      case "output-available":
                        return (
                          <div key={`${msg.id}-getWeather-${pIndex}`} className="bg-zinc-800/50 border border-zinc-700 p-2 rounded mt-1">
                            <div className="text-sm text-zinc-400">
                              Weather response:
                            </div>
                            <div className="mt-1">
                              {part.output}
                            </div>
                          </div>  
                        )
                      case "output-error":
                        return (
                          <div key={`${msg.id}-getWeather-${pIndex}`} className="bg-red-800/50 border border-red-700 p-2 rounded mt-1">
                            <div className="text-sm text-red-400">      
                              Error fetching weather:
                            </div>
                            <div className="mt-1">
                              {part.errorText}
                            </div>
                          </div>
                        );
                      default:
                        return null;
                    }
                  
                  default:
                    return null;
                }
              })}
            </div>
          ))}

          {isLoading && (
            <div className="flex items-center text-gray-500 mt-2">
              <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-blue-600 mr-2" />
              <span>AI is typing...</span>
              <button
                onClick={stop}
                className="ml-3 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
              >
                Stop
              </button>
            </div>
          )}
        </div>
        <form className="flex gap-2" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="How can I help you?"
            className="flex-1 px-3 py-2 border border-gray-300 rounded text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition disabled:opacity-50"
            disabled={status !== "ready"}
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default Page;
// ...existing code...
