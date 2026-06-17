'use client';

export function ReviewDetails({ review }: { review: any | null }) {
  if (!review) {
    return <div className="rounded border p-4 text-sm text-muted-foreground">Select a review</div>;
  }

  return (
    <div className="space-y-4 rounded border p-4">
      <div>
        <h3 className="font-medium">{review.type}</h3>
        <p className="text-sm text-muted-foreground">Severity: {review.severity}</p>
        <p className="text-sm text-muted-foreground">Status: {review.status}</p>
      </div>

      <div>
        <h4 className="mb-2 font-medium">Summary</h4>
        <p className="text-sm whitespace-pre-wrap">{review.summary}</p>
      </div>

      <div>
        <h4 className="mb-2 font-medium">Issues</h4>
        <pre className="overflow-auto rounded bg-muted p-3 text-sm whitespace-pre-wrap">
          {JSON.stringify(review.issues, null, 2)}
        </pre>
      </div>

      <div>
        <h4 className="mb-2 font-medium">Recommendations</h4>
        <pre className="overflow-auto rounded bg-muted p-3 text-sm whitespace-pre-wrap">
          {JSON.stringify(review.recommendations, null, 2)}
        </pre>
      </div>
    </div>
  );
}