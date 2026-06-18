type Review = {
  id: string;
  type: string;
  severity: string;
  status: string;
  createdAt: string;
};

export function ReviewHistory({
  reviews,
  selectedReviewId,
  onSelect,
}: {
  reviews: Review[];
  selectedReviewId?: string;
  onSelect: (reviewId: string) => void;
}) {
  const formatDate = (date: string) =>
    new Date(date).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  const severityClass = (severity: string) => {
    switch (severity?.toLowerCase()) {
      case "critical":
      case "high":
        return "text-red-400 border-red-500/30 bg-red-500/10";
      case "medium":
        return "text-yellow-400 border-yellow-500/30 bg-yellow-500/10";
      default:
        return "text-emerald-400 border-emerald-500/30 bg-emerald-500/10";
    }
  };

  if (!reviews.length) {
    return (
      <div className="h-full flex items-center justify-center text-zinc-400 text-sm">
        No reviews generated yet
      </div>
    );
  }

  return (
    <div className="p-4 space-y-3">
      {reviews.map((review) => (
        <button
          key={review.id}
          onClick={() => onSelect(review.id)}
          className={`
  w-full text-left p-2 border transition-all duration-200
  ${
    selectedReviewId === review.id
      ? "border-zinc-400 bg-zinc-800"
      : "border-zinc-700 bg-zinc-950 hover:bg-zinc-800"
  }
`}
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <h4 className="font-medium text-zinc-100">
                {review.type.replaceAll("_", " ")}
              </h4>

              <p className="text-xs text-zinc-300 mt-1">
                {formatDate(review.createdAt)}
              </p>
            </div>

            <span
              className={`text-[10px] px-2 py-1 border uppercase tracking-wide ${severityClass(
                review.severity,
              )}`}
            >
              {review.severity}
            </span>
          </div>

          <div className="mt-3 flex justify-between text-xs">
            <span className="text-zinc-400">#{review.id.slice(0, 8)}</span>

            <span className="text-zinc-300 uppercase">{review.status}</span>
          </div>
        </button>
      ))}
    </div>
  );
}
