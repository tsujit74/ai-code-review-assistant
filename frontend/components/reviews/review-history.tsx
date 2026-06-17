'use client';

type Review = {
  id: string;
  type: string;
  severity: string;
  status: string;
  createdAt: string;
};

export function ReviewHistory({
  reviews,
  onSelect,
}: {
  reviews: Review[];
  onSelect: (reviewId: string) => void;
}) {
  return (
    <div className="space-y-3">
      {reviews.map((review) => (
        <button
          key={review.id}
          onClick={() => onSelect(review.id)}
          className="flex w-full items-center justify-between rounded border p-4 text-left"
        >
          <div>
            <h3 className="font-medium">{review.type}</h3>
            <p className="text-sm text-muted-foreground">{review.createdAt}</p>
          </div>
          <div className="text-right text-sm">
            <div>{review.severity}</div>
            <div>{review.status}</div>
          </div>
        </button>
      ))}
    </div>
  );
}