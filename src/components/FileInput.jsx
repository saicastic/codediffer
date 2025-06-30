import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { FiUpload, FiX } from "react-icons/fi";

const FileInput = ({ label, onContentChange }) => {
  const [content, setContent] = useState("");
  const [fileName, setFileName] = useState("");
  const [isText, setIsText] = useState(true);

  const onDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          setContent(reader.result);
          setFileName(file.name);
          onContentChange(reader.result);
        };
        reader.readAsText(file);
      }
    },
    [onContentChange]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "text/*": [".txt", ".js", ".jsx", ".html", ".css", ".json"],
      "application/json": [".json"],
    },
  });

  const handleTextChange = (e) => {
    const value = e.target.value;
    setContent(value);
    onContentChange(value);
  };

  const clearInput = () => {
    setContent("");
    setFileName("");
    onContentChange("");
  };

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <label className="block text-lg font-medium text-gray-700">
          {label}
        </label>
        <div className="flex space-x-2">
          <button
            type="button"
            className={`px-3 py-1 rounded ${
              isText ? "bg-primary text-white" : "bg-gray-200"
            }`}
            onClick={() => setIsText(true)}
          >
            Text
          </button>
          <button
            type="button"
            className={`px-3 py-1 rounded ${
              !isText ? "bg-primary text-white" : "bg-gray-200"
            }`}
            onClick={() => setIsText(false)}
          >
            File
          </button>
        </div>
      </div>

      {isText ? (
        <div className="relative">
          <textarea
            value={content}
            onChange={handleTextChange}
            className="w-full h-40 p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="Enter text to compare..."
          />
          {content && (
            <button
              onClick={clearInput}
              className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
            >
              <FiX size={20} />
            </button>
          )}
        </div>
      ) : (
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors
            ${
              isDragActive
                ? "border-primary bg-blue-50"
                : "border-gray-300 hover:border-primary"
            }`}
        >
          <input {...getInputProps()} />
          <FiUpload className="mx-auto text-gray-400 mb-2" size={24} />
          {fileName ? (
            <div className="flex items-center justify-between">
              <span className="truncate max-w-xs">{fileName}</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  clearInput();
                }}
                className="text-gray-500 hover:text-red-500 ml-2"
              >
                <FiX size={18} />
              </button>
            </div>
          ) : (
            <p className="text-gray-600">
              {isDragActive
                ? "Drop your file here"
                : "Drag & drop a file, or click to select"}
            </p>
          )}
          <p className="text-sm text-gray-500 mt-1">
            Supports: TXT, JS, JSX, HTML, CSS, JSON
          </p>
        </div>
      )}
    </div>
  );
};

export default FileInput;
