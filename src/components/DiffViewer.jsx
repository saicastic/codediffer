import React from "react";
import { diffLines } from "diff";

const DiffViewer = ({ contentA, contentB }) => {
  if (!contentA && !contentB) return null;

  const renderContent = (content, isLeft) => {
    if (!content)
      return <div className="text-gray-500 italic">No content provided</div>;

    return content.split("\n").map((line, i) => (
      <div key={i} className="font-mono text-sm">
        {line}
      </div>
    ));
  };

  const renderDiff = () => {
    if (!contentA || !contentB) return null;

    const diff = diffLines(contentA, contentB);
    return diff.map((part, index) => {
      const className = part.added
        ? "diff-added"
        : part.removed
        ? "diff-removed"
        : "";
      return (
        <div
          key={index}
          className={`${className} font-mono text-sm whitespace-pre-wrap`}
        >
          {part.value}
        </div>
      );
    });
  };

  return (
    <div className="mt-8 border rounded-lg overflow-hidden shadow-lg">
      <div className="bg-gray-100 p-2 flex justify-between">
        <h3 className="font-semibold">Comparison Results</h3>
        <div className="flex">
          <span className="bg-green-100 px-2 mr-2">Added</span>
          <span className="bg-red-100 px-2">Removed</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-white">
        <div>
          <h4 className="font-medium mb-2 text-gray-700">Original Content</h4>
          <div className="max-h-96 overflow-auto p-2 border rounded bg-gray-50">
            {renderContent(contentA, true)}
          </div>
        </div>

        <div>
          <h4 className="font-medium mb-2 text-gray-700">Modified Content</h4>
          <div className="max-h-96 overflow-auto p-2 border rounded bg-gray-50">
            {contentA && contentB
              ? renderDiff()
              : renderContent(contentB, false)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiffViewer;
