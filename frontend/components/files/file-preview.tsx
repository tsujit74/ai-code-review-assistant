'use client';

import { useState } from 'react';

type FilePreviewProps = {
  file: {
    name: string;
    content?: string;
  } | null;
};

export function FilePreview({ file }: FilePreviewProps) {
  const [fontSize, setFontSize] = useState(14);

  if (!file) {
    return (
      <div className="h-full flex items-center justify-center bg-zinc-950">
        <div className="text-center">
          <div className="text-5xl mb-4">📄</div>

          <h3 className="text-xl font-semibold text-zinc-200">
            No File Selected
          </h3>

          <p className="mt-2 text-sm text-zinc-500">
            Select a file from the explorer to view its contents
          </p>
        </div>
      </div>
    );
  }

  const lines = file.content?.split('\n') || [];

  const increaseFont = () => {
    setFontSize((prev) => Math.min(prev + 2, 24));
  };

  const decreaseFont = () => {
    setFontSize((prev) => Math.max(prev - 2, 10));
  };

  return (
    <div className="h-full flex flex-col bg-zinc-950 border-l border-zinc-800">
      {/* Header */}
      <div className="sticky top-0 z-10 flex items-center justify-between px-3 py-2 border-b border-zinc-800 bg-zinc-950/95 backdrop-blur">
        <div className="flex items-center gap-3 min-w-0">
          <span className="text-base">📄</span>

          <div className="min-w-0">
            <p className="text-sm font-medium text-zinc-100 truncate">
              {file.name}
            </p>

            <p className="text-xs text-zinc-300">
              {lines.length} lines
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Font Controls */}
          <button
            onClick={decreaseFont}
            className="h-8 w-8 flex items-center justify-center border border-zinc-500 text-zinc-300 hover:bg-zinc-900 transition-colors"
          >
            −
          </button>

          <span className="text-xs text-zinc-300 min-w-[40px] text-center">
            {fontSize}px
          </span>

          <button
            onClick={increaseFont}
            className="h-8 w-8 flex items-center justify-center border border-zinc-500 text-zinc-300 hover:bg-zinc-900 transition-colors"
          >
            +
          </button>

          <button className="px-3 py-1.5 text-xs font-medium text-zinc-300 border border-zinc-500 hover:bg-zinc-900 transition-colors">
            Copy
          </button>

          <button className="px-3 py-1.5 text-xs font-medium text-zinc-300 border border-zinc-500 hover:bg-zinc-900 transition-colors">
            Download
          </button>
        </div>
      </div>

      {/* Code Area */}
      <div className="flex-1 overflow-y-auto">
        <div
          className="min-w-max font-mono"
          style={{
            fontSize: `${fontSize}px`,
            lineHeight: 1.8,
          }}
        >
          {lines.map((line, index) => (
            <div
              key={index}
              className="group flex hover:bg-zinc-900/40 transition-colors"
            >
              <div className="w-16 shrink-0 px-3 py-1 text-right text-zinc-600 select-none border-r border-zinc-900">
                {index + 1}
              </div>

              <div className="flex-1 px-4 py-1 text-zinc-300 whitespace-pre-wrap break-words">
                {line || ' '}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}