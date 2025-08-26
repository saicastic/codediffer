import React from "react";
import { Link } from "react-router-dom";
import { FiGitBranch, FiCode, FiUploadCloud } from "react-icons/fi";

const HomePage = () => {
  return (
    <div className="container mx-auto px-4 py-16 text-center max-w-3xl">
      <div className="bg-gradient-to-r from-primary to-secondary text-white w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
        <FiGitBranch size={48} />
      </div>

      <h1 className="text-4xl font-bold mb-4">DiffCompare AI</h1>
      <p className="text-xl text-gray-600 mb-10">
        Compare text or files with AI-powered insights and detailed diff
        analysis
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <div className="border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="bg-blue-100 text-blue-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
            <FiUploadCloud size={24} />
          </div>
          <h3 className="font-semibold text-lg mb-2">Upload Files</h3>
          <p className="text-gray-600">
            Compare code files or text documents side-by-side
          </p>
        </div>

        <div className="border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="bg-purple-100 text-purple-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
            <FiCode size={24} />
          </div>
          <h3 className="font-semibold text-lg mb-2">Visual Diffs</h3>
          <p className="text-gray-600">
            See line-by-line differences with color-coded changes
          </p>
        </div>

        <div className="border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="bg-green-100 text-green-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
            <FiGitBranch size={24} />
          </div>
          <h3 className="font-semibold text-lg mb-2">AI Analysis</h3>
          <p className="text-gray-600">
            Get detailed explanations of changes using Gemini AI
          </p>
        </div>
      </div>

      <Link
        to="/compare"
        className="inline-block px-8 py-4 bg-gradient-to-r from-primary to-secondary border rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 text-lg font-medium"
      >
        Start Comparing Now
      </Link>
    </div>
  );
};

export default HomePage;
