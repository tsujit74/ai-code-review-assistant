"use client";

import { useState } from "react";
import { uploadProjectZip } from "@/lib/files";

type TreeNode = {
  name: string;
  path: string;
  type: "file" | "folder";
  fileId?: string;
  children?: TreeNode[];
};

export function FileExplorer({
  projectId,
  nodes,
  onSelectFile,
  onUploaded,
}: {
  projectId: string;
  nodes: TreeNode[];
  onSelectFile: (fileId: string) => void;
  onUploaded: () => void;
}) {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [openFolders, setOpenFolders] = useState<Record<string, boolean>>({});
  const [activeFile, setActiveFile] = useState<string | null>(null);

  const toggleFolder = (path: string) => {
    setOpenFolders((prev) => ({
      ...prev,
      [path]: !prev[path],
    }));
  };

  const handleUpload = async (target?: File | null) => {
    const fileToUpload = target || file;

    if (!fileToUpload) return;

    setLoading(true);

    try {
      await uploadProjectZip(projectId, fileToUpload);
      setFile(null);
      onUploaded();
    } finally {
      setLoading(false);
    }
  };

  const renderNode = (node: TreeNode, depth = 0) => {
    const isOpen = openFolders[node.path];

    if (node.type === "file") {
      const isActive = activeFile === node.path;

      return (
        <button
          key={node.path}
          onClick={() => {
            setActiveFile(node.path);
            if (node.fileId) onSelectFile(node.fileId);
          }}
          className={`
            relative w-full flex items-center h-8 text-sm text-left
            transition-colors
            ${
              isActive
                ? "bg-zinc-800 text-white"
                : "text-zinc-300 hover:bg-zinc-900"
            }
          `}
          style={{ paddingLeft: depth * 16 + 12 }}
        >
          {depth > 0 && (
            <div
              className="absolute left-0 top-0 bottom-0 border-l border-zinc-500"
              style={{ marginLeft: depth * 16 }}
            />
          )}

          {isActive && (
            <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-blue-500" />
          )}

          <span className="mr-2 text-zinc-500">📄</span>

          <span className="truncate">{node.name}</span>
        </button>
      );
    }

    return (
      <div key={node.path}>
        <button
          onClick={() => toggleFolder(node.path)}
          className="
            w-full flex items-center h-8 text-sm text-left
            text-zinc-200 hover:bg-zinc-900
            transition-colors
          "
          style={{ paddingLeft: depth * 16 + 12 }}
        >
          <span className="w-4 text-zinc-500">{isOpen ? "▼" : "▶"}</span>

          <span className="mr-2">📁</span>

          <span className="truncate">{node.name}</span>
        </button>

        {isOpen && (
          <div className="relative">
            <div
              className="absolute top-0 bottom-0 border-l border-zinc-800"
              style={{ left: depth * 16 + 18 }}
            />

            {node.children?.map((child) => renderNode(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div
      className={`
        h-full flex flex-col
        bg-zinc-950
        border-r border-zinc-800
        overflow-hidden
        ${dragActive ? "bg-blue-500/5" : ""}
      `}
      onDragOver={(e) => {
        e.preventDefault();
        setDragActive(true);
      }}
      onDragLeave={() => setDragActive(false)}
      onDrop={async (e) => {
        e.preventDefault();
        setDragActive(false);

        const dropped = e.dataTransfer.files?.[0];

        if (dropped) {
          await handleUpload(dropped);
        }
      }}
    >
      {/* Header */}
      <div className="sticky top-0 z-10 border-b border-zinc-400 bg-zinc-950">
        <div className="px-4 py-3">
          <p className="text-xs font-bold tracking-wider uppercase text-zinc-100">
            Explorer
          </p>
        </div>

        <div className="px-3 pb-3 flex gap-2">
          <label
            className="
              flex-1
              h-8
              flex items-center
              px-3
              border border-zinc-400
              bg-zinc-900
              text-xs text-zinc-300
              cursor-pointer
              hover:border-zinc-300
              transition
            "
          >
            <span className="truncate">
              {file ? file.name : "Select File.zip"}
            </span>

            <input
              type="file"
              accept=".zip"
              className="hidden"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
            />
          </label>

          <button
            onClick={() => handleUpload()}
            disabled={!file || loading}
            className="
    h-8 px-3
    border border-zinc-200
    bg-zinc-800
    text-zinc-100
    text-xs font-medium
    hover:bg-zinc-700
    hover:border-zinc-400
    disabled:opacity-40
    disabled:cursor-not-allowed
    transition-all
  "
          >
            {loading ? "Uploading..." : "Upload"}
          </button>
        </div>
      </div>

      {/* Tree */}
      <div className="flex-1 overflow-y-auto">
        {nodes.length === 0 ? (
          <div className="h-full flex items-center justify-center text-zinc-600 text-sm">
            Upload a ZIP file to begin
          </div>
        ) : (
          <div className="py-2">{nodes.map((node) => renderNode(node))}</div>
        )}
      </div>
    </div>
  );
}
