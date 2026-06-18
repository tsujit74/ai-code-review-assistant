'use client';

import { useState } from 'react';
import { createReview } from '@/lib/reviews';

export function ReviewTrigger({
  projectId,
  onCreated,
}: {
  projectId: string;
  onCreated: () => void;
}) {
  const [loading, setLoading] = useState(false);

  const handleReview = async (type: string) => {
    setLoading(true);

    try {
      await createReview(projectId, type);
      onCreated();
    } finally {
      setLoading(false);
    }
  };

  const Button = ({
    label,
    type,
    icon,
  }: {
    label: string;
    type: string;
    icon: string;
  }) => (
    <button
      disabled={loading}
      onClick={() => handleReview(type)}
      className="
        w-full
        flex items-center justify-between
        px-3 py-2.5
        border border-zinc-500
        bg-zinc-900
        text-zinc-200
        text-sm
        hover:bg-zinc-800
        hover:border-zinc-600
        transition-all
        disabled:opacity-50
        disabled:cursor-not-allowed
        cursor-pointer
      "
    >
      <div className="flex items-center gap-3">
        <span>{icon}</span>
        <span>{label}</span>
      </div>

      <span className="text-zinc-200">→</span>
    </button>
  );

  return (
    <div className="h-full border border-zinc-400 bg-zinc-900/40">
      {/* Header */}
      <div className="px-4 py-2 border-b border-zinc-400">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-zinc-100">
            AI Review Engine
          </h3>

          <div className="text-[10px] uppercase tracking-wider text-zinc-100">
            Analysis
          </div>
        </div>

        <p className="mt-1 text-xs text-zinc-400">
          Run AI-powered project reviews
        </p>
      </div>

      {/* Actions */}
      <div className="p-3 space-y-2">
        <Button
          icon="🛡️"
          label="Security Scan"
          type="SECURITY"
        />

        <Button
          icon="⚡"
          label="Performance Audit"
          type="PERFORMANCE"
        />

        <Button
          icon="✨"
          label="Code Quality Review"
          type="CODE_QUALITY"
        />
      </div>

      {/* Footer */}
      <div className="px-4 py-3 border-t border-zinc-800">
        {loading ? (
          <div className="flex items-center gap-2 text-xs text-zinc-300">
            <div className="h-2 w-2 rounded-full bg-zinc-400 animate-pulse" />
            Running analysis...
          </div>
        ) : (
          <p className="text-xs text-zinc-400">
            Reviews analyze the latest uploaded project snapshot.
          </p>
        )}
      </div>
    </div>
  );
}