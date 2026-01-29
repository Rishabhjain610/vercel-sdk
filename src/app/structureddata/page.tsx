"use client";
import React, { useState } from "react";
import { experimental_useObject as useObject } from "@ai-sdk/react";
import { receipeSchema } from "../api/structureddata/schema";
const page = () => {
  const [dishName, setDishName] = useState("");
  const { submit, object, isLoading, error, stop } = useObject({
    api: "/api/structureddata",
    schema: receipeSchema,
  });
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await submit({ dishName });
  };
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      {error && (
        <div>
          <p className="text-red-500 mb-4">Error: {error.message}</p>
        </div>
      )}
      {object?.receipe && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            {object.receipe.name}
          </h2>
          {object?.receipe?.ingredients && (
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-700 mb-4">
                Ingredients:
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {object?.receipe?.ingredients.map((ingredient, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 border border-gray-200 rounded p-4"
                  >
                    <p className="text-gray-700 font-medium">
                      {ingredient?.name}
                    </p>
                    <p className="text-gray-600">{ingredient?.amount}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          {object?.receipe?.steps && (
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-700 mb-4">
                Steps:
              </h3>
              <ol className="list-decimal list-inside space-y-3">
                {object?.receipe?.steps.map((step, index) => (
                  <li key={index} className="mb-3 text-gray-700">
                    <span className="font-medium mr-2">Step {index + 1}:</span>{" "}
                    {step}
                  </li>
                ))}
              </ol>
            </div>
          )}
        </div>
      )}
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow-md p-6 max-w-md"
      >
        <div className="space-y-4">
          <input
            type="text"
            value={dishName}
            onChange={(e) => setDishName(e.target.value)}
            placeholder="type here"
            className="w-full px-4 py-2 border text-yellow-700 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {isLoading && (
            <button
              onClick={stop}
              className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
            >
              Stop
            </button>
          )}
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
            disabled={isLoading}
          >
            {isLoading ? "Generating..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default page;
