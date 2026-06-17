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
    <form onSubmit={handleUpload} className="space-y-3 rounded border p-4">
      <input
        type="file"
        accept=".zip"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
      />
      <button
        className="rounded bg-black px-4 py-2 text-white disabled:opacity-50"
        disabled={loading || !file}
        type="submit"
      >
        {loading ? 'Uploading...' : 'Upload ZIP'}
      </button>
    </form>
  );
}