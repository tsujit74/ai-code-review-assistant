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

  return (
    <div className="flex gap-2 flex-wrap">
      <button className="rounded border px-3 py-2" disabled={loading} onClick={() => handleReview('SECURITY')}>
        Security Review
      </button>
      <button className="rounded border px-3 py-2" disabled={loading} onClick={() => handleReview('PERFORMANCE')}>
        Performance Review
      </button>
      <button className="rounded border px-3 py-2" disabled={loading} onClick={() => handleReview('CODE_QUALITY')}>
        Code Quality Review
      </button>
    </div>
  );
}