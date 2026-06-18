"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { AiProviderForm } from "./ai-provider-form";

export function AiProviderSelector({
  providers,
  selected,
  onChange,
  onCreated,
}: {
  providers: any[];
  selected?: any;
  onChange: (p: any) => void;
  onCreated?: (provider: any) => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex items-center gap-2">
      {/* SELECT */}
      <select
        value={selected?.id || ""}
        onChange={(e) => {
          const p = providers.find((x) => x.id === e.target.value);
          onChange(p);
        }}
        className="
          bg-zinc-900
          border border-zinc-400
          px-3 py-2
          text-sm text-zinc-200
          outline-none
          focus:border-zinc-500
        "
      >
        <option value="">Select AI Model</option>

        {providers.map((p) => (
          <option key={p.id} value={p.id}>
            {p.name} ({p.modelName})
          </option>
        ))}
      </select>

      {/* ADD BUTTON */}
      <button
        onClick={() => setOpen(true)}
        className="
          h-[38px] w-[38px]
          flex items-center justify-center
          border border-zinc-400
          bg-zinc-900
          text-zinc-200
          hover:bg-zinc-800
          hover:border-zinc-600
          transition
        "
        title="Add AI Provider"
      >
        <Plus size={16} />
      </button>

      {/* MODAL */}
      {open && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center">
          {/* overlay */}
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />

          {/* modal box */}
          <div className="relative w-full max-w-md border border-zinc-400 bg-zinc-950 shadow-2xl p-6">
            <AiProviderForm
              onSuccess={(newProvider: any) => {
                setOpen(false);
                onCreated?.(newProvider)
              }}
              onClose={() => setOpen(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
}