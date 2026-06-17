'use client';

import { useState } from 'react';
import { createProject } from '@/lib/projects';

export function CreateProjectForm({ onCreated }: { onCreated: () => void }) {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    setLoading(true);
    try {
      await createProject(name);
      setName('');
      onCreated();
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        className="flex-1 rounded border px-3 py-2"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="New project name"
      />
      <button
        type="submit"
        className="rounded bg-black px-4 py-2 text-white disabled:opacity-50"
        disabled={loading}
      >
        {loading ? 'Creating...' : 'Create'}
      </button>
    </form>
  );
}