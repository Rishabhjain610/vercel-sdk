
"use client";
import React, { useState } from "react";
import { useCompletion } from "@ai-sdk/react";

const Page = () => {
  const {
    input,
    handleInputChange,
    handleSubmit,
    completion,
    isLoading,
    error,
  } = useCompletion({
    api: "/api/stream",
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center p-6">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        <header className="px-6 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
          <h1 className="text-lg font-semibold">AI Assistant</h1>
          <p className="text-sm opacity-90 mt-1">
            Ask anything — streaming responses supported.
          </p>
        </header>
        {error && (
          <div className="px-6 py-4 border-b border-red-100 bg-red-50 text-red-700">
            Error: {error.message}
          </div>
        )}
        {isLoading && <div>Loading...</div>}

        <main className="p-6">
          <form onSubmit={handleSubmit} className="flex gap-3">
            <input
              type="text"
              value={input}
              onChange={handleInputChange}
              placeholder="How can I help?"
              className="flex-1 px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <button
              type="submit"
              className="px-5 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
            >
              Send
            </button>
          </form>

          <section className="mt-6">
            <div className="h-64 overflow-y-auto rounded-lg border border-gray-100 p-4 bg-gray-50 text-gray-800">
              <div className="text-sm italic text-gray-500">
                {completion && (
                  <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
                    <h2 className="text-md font-medium mb-2">Response:</h2>
                    <div className="whitespace-pre-wrap text-gray-800">
                      {completion}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>
        </main>

        <footer className="px-6 py-3 text-xs text-gray-500 border-t border-gray-100">
          Powered by Ollama · Local model
        </footer>
      </div>
    </div>
  );
};

export default Page;
// ...existing code...
