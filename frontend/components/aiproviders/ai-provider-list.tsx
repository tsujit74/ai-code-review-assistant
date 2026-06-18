'use client';

import { useEffect, useState } from 'react';
import {
  getAiProviders,
  deleteAiProvider,
} from '@/lib/aiprovider';

export function AiProviderList() {
  const [providers, setProviders] = useState([]);

  const load = async () => {
    const data = await getAiProviders();
    setProviders(data);
  };

  useEffect(() => {
    load();
  }, []);

  const remove = async (id: string) => {
    await deleteAiProvider(id);
    load();
  };

  return (
    <div className="space-y-3">
      {providers.map((p: any) => (
        <div
          key={p.id}
          className="p-3 border border-zinc-700 bg-zinc-900"
        >
          <div className="flex justify-between">
            <div>
              <p className="text-white">{p.name}</p>
              <p className="text-xs text-zinc-400">
                {p.modelName}
              </p>
            </div>

            <button
              onClick={() => remove(p.id)}
              className="text-red-400 text-sm"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}