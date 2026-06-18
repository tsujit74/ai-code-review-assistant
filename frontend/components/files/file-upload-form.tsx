'use client';

import { useState } from 'react';
import { uploadProjectZip } from '@/lib/files';

export function FileUploadForm({
  projectId,
  onUploaded,
}: {
  projectId: string;
  onUploaded: () => void;
}) {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    setLoading(true);
    try {
      await uploadProjectZip(projectId, file);
      setFile(null);
      onUploaded();
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleUpload}
      className={`
        h-full flex flex-col justify-center items-center text-center
        border border-zinc-800 rounded-2xl p-6 transition
        bg-gradient-to-br from-zinc-950 to-zinc-900
        ${dragActive ? 'border-blue-500 bg-blue-500/5' : ''}
      `}
      onDragOver={() => setDragActive(true)}
      onDragLeave={() => setDragActive(false)}
    >

      {/* Title */}
      <h3 className="text-sm font-semibold text-zinc-200">
        Upload Source Code
      </h3>

      <p className="text-xs text-zinc-500 mt-1">
        Drag & drop ZIP or browse files
      </p>

      {/* Input */}
      <input
        type="file"
        accept=".zip"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
        className="mt-4 text-sm text-zinc-300"
      />

      {/* Selected File */}
      {file && (
        <p className="mt-2 text-xs text-zinc-400">
          Selected: {file.name}
        </p>
      )}

      {/* Button */}
      <button
        type="submit"
        disabled={!file || loading}
        className="
          mt-4 w-full max-w-xs
          bg-blue-600 hover:bg-blue-500
          text-white text-sm font-medium
          py-2 rounded-xl transition
          disabled:opacity-50
        "
      >
        {loading ? 'Uploading...' : 'Upload Project'}
      </button>

      {/* Footer */}
      <p className="text-[10px] text-zinc-600 mt-3">
        ZIP will be indexed for AI review
      </p>
    </form>
  );
}