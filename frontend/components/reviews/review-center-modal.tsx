"use client";

import { ReviewHistory } from "./review-history";
import { ReviewDetails } from "./review-details";

type Props = {
  open: boolean;
  onClose: () => void;
  reviews: any[];
  selectedReview: any;
  onSelectReview: (reviewId: string) => void;
};

export function ReviewCenterModal({
  open,
  onClose,
  reviews,
  selectedReview,
  onSelectReview,
}: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md flex items-center justify-center">
      <div
        className="
          w-[95vw]
          max-w-[1800px]
          h-[92vh]
          bg-zinc-950
          border border-zinc-300
          shadow-[0_0_80px_rgba(0,0,0,0.7)]
          overflow-hidden
          flex
          flex-col
        "
      >
        {/* HEADER */}
        <div className="border-b border-zinc-400 bg-zinc-900">
          <div className="px-6 py-4 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-zinc-100">
                AI Review Center
              </h2>

              <p className="mt-1 text-sm text-zinc-300">
                Project intelligence, findings and recommendations
              </p>
            </div>

            <button
              onClick={onClose}
              className="
                h-10
                w-10
                flex
                items-center
                justify-center
                border
                border-zinc-400
                bg-zinc-950
                text-zinc-300
                hover:text-zinc-100
                hover:border-zinc-500
                hover:bg-zinc-900
                transition-all
              "
            >
              ✕
            </button>
          </div>

          {/* STATS BAR */}
          <div className="px-4 pb-3">
            <div className="grid grid-cols-4 gap-2">
              <StatCard
                label="Total Reviews"
                value={reviews.length}
              />

              <StatCard
                label="Selected Review"
                value={
                  selectedReview
                    ? selectedReview.type?.replaceAll("_", " ")
                    : "None"
                }
              />

              <StatCard
                label="Severity"
                value={selectedReview?.severity || "-"}
              />

              <StatCard
                label="Status"
                value={selectedReview?.status || "-"}
              />
            </div>
          </div>
        </div>

        {/* BODY */}
        <div className="flex flex-1 overflow-hidden">
          {/* LEFT SIDEBAR */}
          <aside
            className="
              w-[380px]
              border-r
              border-zinc-400
              bg-zinc-950
              flex
              flex-col
              overflow-hidden
            "
          >
            <div className="px-5 py-3 border-b border-zinc-400">
              <h3 className="text-sm font-semibold text-zinc-100">
                Review Timeline
              </h3>

              <p className="mt-1 text-xs text-zinc-300">
                Browse previous AI analysis runs
              </p>
            </div>

            <div className="flex-1 overflow-auto">
              <ReviewHistory
                reviews={reviews}
                selectedReviewId={selectedReview?.id}
                onSelect={onSelectReview}
              />
            </div>
          </aside>

          {/* REPORT */}
          <section className="flex-1 overflow-hidden bg-zinc-950">
            <ReviewDetails review={selectedReview} />
          </section>
        </div>
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <div className="border border-zinc-400 bg-zinc-950 px-3 py-2">
      <div className="text-[12px] uppercase tracking-wider text-zinc-300">
        {label}
      </div>

      <div className="mt-2 text-sm font-medium text-zinc-100 break-words">
        {value}
      </div>
    </div>
  );
}