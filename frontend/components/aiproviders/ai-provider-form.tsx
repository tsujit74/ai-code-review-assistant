'use client';

import { useState } from 'react';
import { createAiProvider } from '@/lib/aiprovider';

export function AiProviderForm({
  onSuccess,
  onClose,
}: {
  onSuccess: (provider: any) => void;
  onClose: () => void;
}) {
  const [form, setForm] = useState({
    name: '',
    baseUrl: '',
    apiKey: '',
    modelName: '',
    isActive: true,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !form.name.trim() ||
      !form.baseUrl.trim() ||
      !form.apiKey.trim() ||
      !form.modelName.trim()
    ) {
      setError('All fields are required');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const provider = await createAiProvider(form);

      setForm({
        name: '',
        baseUrl: '',
        apiKey: '',
        modelName: '',
        isActive: true,
      });

      onSuccess(provider);
      onClose();
    } catch (err: any) {
      setError(
        err?.response?.data?.message ||
          'Failed to create provider'
      );
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
          Add AI Provider
        </h2>

        <p className="mt-1 text-sm text-zinc-300">
          Configure an AI provider for project reviews and analysis.
        </p>
      </div>

      {error && (
        <div
          className="
            border border-red-900
            bg-red-950/30
            px-3 py-2
            text-sm text-red-300
          "
        >
          {error}
        </div>
      )}

      <div className="space-y-2">
        <label className="text-xs uppercase tracking-wider text-zinc-300">
          Provider Name
        </label>

        <input
          value={form.name}
          onChange={(e) =>
            setForm({
              ...form,
              name: e.target.value,
            })
          }
          placeholder="OpenAI"
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

      <div className="space-y-2">
        <label className="text-xs uppercase tracking-wider text-zinc-300">
          Base URL
        </label>

        <input
          value={form.baseUrl}
          onChange={(e) =>
            setForm({
              ...form,
              baseUrl: e.target.value,
            })
          }
          placeholder="https://api.openai.com/v1"
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

      <div className="space-y-2">
        <label className="text-xs uppercase tracking-wider text-zinc-300">
          API Key
        </label>

        <input
          type="password"
          value={form.apiKey}
          onChange={(e) =>
            setForm({
              ...form,
              apiKey: e.target.value,
            })
          }
          placeholder="sk-..."
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

      <div className="space-y-2">
        <label className="text-xs uppercase tracking-wider text-zinc-300">
          Model Name
        </label>

        <input
          value={form.modelName}
          onChange={(e) =>
            setForm({
              ...form,
              modelName: e.target.value,
            })
          }
          placeholder="gpt-4o"
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
          disabled={loading}
          className="
            px-4 py-2
            text-sm font-medium
            bg-zinc-100
            text-zinc-900
            hover:bg-white
            disabled:opacity-50
          "
        >
          {loading ? 'Saving...' : 'Save Provider'}
        </button>
      </div>
    </form>
  );
}