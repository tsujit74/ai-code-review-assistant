'use client';

export function FilePreview({ file }: { file: any | null }) {
  if (!file) {
    return <div className="rounded border p-4 text-sm text-muted-foreground">Select a file</div>;
  }

  return (
    <div className="rounded border p-4">
      <h3 className="mb-2 font-medium">{file.name}</h3>
      <pre className="overflow-auto rounded bg-muted p-4 text-sm whitespace-pre-wrap">
        {file.content}
      </pre>
    </div>
  );
}