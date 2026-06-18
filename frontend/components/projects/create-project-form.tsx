'use client';

import { useState } from 'react';
import { createProject } from '@/lib/projects';

export function CreateProjectForm({
  onCreated,
  onClose,
}: {
  onCreated: () => void;
  onClose: () => void;
}) {
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
      onClose();
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5"
    >
      <div>
        <h2 className="text-lg font-semibold text-zinc-100">
          Create Project
        </h2>

        <p className="mt-1 text-sm text-zinc-300">
          Create a new workspace for AI reviews and code analysis.
        </p>
      </div>

      <div className="space-y-2">
        <label className="text-xs uppercase tracking-wider text-zinc-300">
          Project Name
        </label>

        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="KharchaMate Backend"
          autoFocus
          className="
            w-full
            bg-zinc-900
            border border-zinc-400
            px-3 py-2.5
            text-sm
            text-zinc-100
            placeholder:text-zinc-400
            outline-none
            focus:border-zinc-300
          "
        />
      </div>

      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={onClose}
          className="
            px-4 py-2
            text-sm
            border border-zinc-400
            bg-zinc-900
            text-zinc-300
            hover:bg-zinc-800
          "
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={!name.trim() || loading}
          className="
            px-4 py-2
            text-sm font-medium
            bg-zinc-100
            text-zinc-900
            hover:bg-white
            disabled:opacity-50
          "
        >
          {loading ? 'Creating...' : 'Create'}
        </button>
      </div>
    </form>
  );
}