'use client';

export function ReviewDetails({ review }: { review: any | null }) {
  const formatDate = (date: string) =>
    new Date(date).toLocaleString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

  const severityStyle = (severity: string) => {
    switch (severity?.toLowerCase()) {
      case 'high':
      case 'critical':
        return 'text-red-300 bg-red-500/10 border-red-500/30';
      case 'medium':
        return 'text-yellow-300 bg-yellow-500/10 border-yellow-500/30';
      default:
        return 'text-emerald-300 bg-emerald-500/10 border-emerald-500/30';
    }
  };

  if (!review) {
    return (
      <div className="h-full flex items-center justify-center bg-zinc-950">
        <div className="text-center max-w-sm">
          <div className="text-6xl mb-4">🤖</div>

          <h3 className="text-lg font-semibold text-zinc-100">
            No Review Selected
          </h3>

          <p className="mt-2 text-sm text-zinc-400">
            Choose a review from the timeline to inspect AI findings,
            detected risks and recommendations.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full overflow-auto bg-zinc-950">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-zinc-950 border-b border-zinc-400 px-4 py-3">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold text-zinc-100">
              AI Intelligence Report
            </h2>

            <p className="mt-1 text-sm text-zinc-300">
              {review.type?.replaceAll('_', ' ')}
            </p>
          </div>

          <span
            className={`px-3 py-1 text-xs border uppercase tracking-wide ${severityStyle(
              review.severity,
            )}`}
          >
            {review.severity}
          </span>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Metrics */}
        <div className="grid grid-cols-4 gap-2">
          <Metric
            label="Severity"
            value={review.severity}
          />

          <Metric
            label="Status"
            value={review.status}
          />

          <Metric
            label="Issues"
            value={review.issues?.length || 0}
          />

          <Metric
            label="Generated"
            value={formatDate(review.createdAt)}
          />
        </div>

        {/* Summary */}
        <section className="border border-zinc-400 bg-zinc-900/40">
          <div className="px-4 py-3 border-b border-zinc-300">
            <h3 className="text-sm font-medium text-zinc-100">
              Executive Summary
            </h3>
          </div>

          <div className="p-3">
            <p className="text-sm leading-7 text-zinc-300">
              {review.summary || 'No summary available'}
            </p>
          </div>
        </section>

        {/* Issues */}
        <section>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-zinc-100">
              Detected Issues
            </h3>

            <span className="text-xs text-zinc-300">
              {review.issues?.length || 0} findings
            </span>
          </div>

          <div className="space-y-3">
            {(review.issues || []).map((issue: any, i: number) => {
              const isString = typeof issue === 'string';

              return (
                <div
                  key={i}
                  className="border border-zinc-500 bg-zinc-900/40 p-3"
                >
                  {isString ? (
                    <>
                      <h4 className="text-sm font-medium text-zinc-100">
                        {issue}
                      </h4>

                      <p className="mt-2 text-xs text-zinc-500">
                        AI detected an issue but no structured metadata was
                        provided.
                      </p>
                    </>
                  ) : (
                    <>
                      <div className="flex flex-wrap items-center gap-2 mb-3">
                        <span
                          className={`px-2 py-1 text-[10px] border uppercase ${severityStyle(
                            issue.severity || review.severity,
                          )}`}
                        >
                          {issue.severity || review.severity}
                        </span>

                        {issue.file && (
                          <span className="px-2 py-1 text-[10px] border border-cyan-500/20 bg-cyan-500/5 text-cyan-400 font-mono">
                            {issue.file}
                          </span>
                        )}
                      </div>

                      <h4 className="text-sm font-medium text-zinc-100">
                        {issue.problem}
                      </h4>

                      {issue.lineHint && (
                        <div className="mt-4">
                          <div className="text-[11px] text-zinc-300 mb-2 uppercase tracking-wide">
                            Code Reference
                          </div>

                          <pre className="overflow-x-auto border border-zinc-700 bg-black p-3 text-xs text-zinc-200">
                            {issue.lineHint}
                          </pre>
                        </div>
                      )}
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Recommendations */}
        <section>
          <div className="mb-3">
            <h3 className="text-sm font-medium text-zinc-100">
              Recommended Actions
            </h3>
          </div>

          <div className="space-y-3">
            {(review.recommendations || []).map(
              (rec: any, index: number) => (
                <div
                  key={index}
                  className="border border-zinc-700 bg-zinc-900/40 p-4"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h4 className="text-sm font-medium text-zinc-100">
                        {rec.title || rec}
                      </h4>

                      {rec.detail && (
                        <p className="mt-2 text-sm text-zinc-300 leading-6">
                          {rec.detail}
                        </p>
                      )}
                    </div>

                    {rec.priority && (
                      <span className="text-[10px] border border-blue-500/30 bg-blue-500/10 text-blue-300 px-2 py-1 uppercase">
                        {rec.priority}
                      </span>
                    )}
                  </div>
                </div>
              ),
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

function Metric({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <div className="border border-zinc-400 bg-zinc-900/40 p-4">
      <div className="text-[10px] uppercase tracking-wide text-zinc-300">
        {label}
      </div>

      <div className="mt-2 text-sm font-medium text-zinc-200 break-words">
        {value}
      </div>
    </div>
  );
}