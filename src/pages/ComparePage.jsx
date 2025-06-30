import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import FileInput from "../components/FileInput";
import DiffViewer from "../components/DiffViewer";
import { FiLoader, FiAlertTriangle } from "react-icons/fi";

const ComparePage = () => {
  const [contentA, setContentA] = useState("");
  const [contentB, setContentB] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleExplainDiff = async () => {
    if (!contentA || !contentB) {
      setError("Both inputs are required");
      return;
    }

    setIsLoading(true);
    setError("");
    setAiResponse("");

    try {
      const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
      const model = genAI.getGenerativeModel({
        model: "googleai/gemini-2.0-flash",
      });

      const prompt = `Explain the differences between these two code snippets in detail. 
        Focus on functional changes, potential bugs, and improvements. 
        Format your response with bullet points and clear headings.
        
        Original Code:
        ${contentA}
        
        Modified Code:
        ${contentB}`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      setAiResponse(response.text());
    } catch (err) {
      console.error("Gemini API error:", err);
      setError("Failed to get AI explanation. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <h1 className="text-3xl font-bold text-center mb-2">
        Code Diff Analyzer
      </h1>
      <p className="text-gray-600 text-center mb-8">
        Compare files or text with AI-powered insights
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <FileInput label="Input A (Original)" onContentChange={setContentA} />
        <FileInput label="Input B (Modified)" onContentChange={setContentB} />
      </div>

      <div className="mt-6 flex justify-center space-x-4">
        <button
          onClick={handleExplainDiff}
          disabled={isLoading}
          className="px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-lg shadow hover:opacity-90 transition-opacity disabled:opacity-70 flex items-center"
        >
          {isLoading ? (
            <>
              <FiLoader className="animate-spin mr-2" />
              Analyzing...
            </>
          ) : (
            "Explain with AI"
          )}
        </button>
      </div>

      {error && (
        <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-lg flex items-center">
          <FiAlertTriangle className="mr-2" />
          {error}
        </div>
      )}

      <DiffViewer contentA={contentA} contentB={contentB} />

      {aiResponse && (
        <div className="mt-8 p-6 bg-gray-50 rounded-lg border">
          <h3 className="text-xl font-semibold mb-4 flex items-center">
            <img
              src="https://www.gstatic.com/lamda/images/gemini_sparkle_v002_d4735304ff6292a690345.svg"
              alt="Gemini"
              className="w-6 h-6 mr-2"
            />
            Gemini AI Analysis
          </h3>
          <div className="prose max-w-none bg-white p-4 rounded-lg">
            {aiResponse.split("\n").map((line, i) => (
              <p key={i}>{line}</p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ComparePage;
