import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="flex min-h-screen items-center justify-center p-6">
      <div className="space-y-4 text-center">
        <h1 className="text-3xl font-bold">AI Code Review Assistant</h1>
        <div className="flex gap-4 justify-center">
          <Link className="rounded bg-black px-4 py-2 text-white" href="/auth/login">
            Login
          </Link>
          <Link className="rounded border px-4 py-2" href="/auth/register">
            Register
          </Link>
        </div>
      </div>
    </main>
  );
}