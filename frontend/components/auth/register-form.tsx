'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';
import { auth } from '@/lib/auth';
import Link from 'next/link';

export function RegisterForm() {
  const router = useRouter();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await api.post('/auth/register', { name, email, password });

      auth.setToken(res.data.token);

      router.push('/projects');
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-950 px-4">

      <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-xl">

        {/* HEADER */}
        <div className="text-center mb-6">
          <h1 className="text-xl font-semibold text-white">
            Create Account
          </h1>
          <p className="text-sm text-zinc-400">
            Register to continue
          </p>
        </div>
      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          className="w-full rounded border px-3 py-2"
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="w-full rounded border px-3 py-2"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="w-full rounded border px-3 py-2"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && (
          <p className="text-sm text-red-500">{error}</p>
        )}

        <button
          className="w-full rounded bg-white px-4 py-2 text-black disabled:opacity-50"
          disabled={loading}
          type="submit"
        >
          {loading ? 'Creating account...' : 'Create Account'}
        </button>

      
        <p className="text-center text-sm text-zinc-500 pt-2">
          Already have an account?{" "}
          <Link href="/auth/login" className="text-white font-medium hover:underline">
            Sign in
          </Link>
        </p>

      </form>
      </div>
    </div>
  );
}