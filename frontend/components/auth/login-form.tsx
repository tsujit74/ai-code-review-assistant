'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';
import { auth } from '@/lib/auth';
import Link from 'next/link';

export default function LoginForm() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Email and password required');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await api.post('/auth/login', { email, password });

      const { token, user } = res.data;

      if (!token) {
        setError('Login failed');
        return;
      }

      auth.setToken(token);
      auth.setUser(user);

      router.push('/projects');
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Login failed');
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
            Welcome Back
          </h1>
          <p className="text-sm text-zinc-400">
            Sign in to continue
          </p>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            className="w-full rounded-lg bg-zinc-800 border border-zinc-700 px-3 py-2 text-white outline-none focus:border-zinc-500"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            className="w-full rounded-lg bg-zinc-800 border border-zinc-700 px-3 py-2 text-white outline-none focus:border-zinc-500"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && (
            <p className="text-sm text-red-400">{error}</p>
          )}

          <button
            disabled={loading}
            type="submit"
            className="w-full rounded-lg bg-white text-black font-medium py-2 hover:bg-zinc-200 disabled:opacity-50"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>

          <p className="text-center text-sm text-zinc-500 pt-2">
            Dont have an account?{" "}
            <Link
              href="/auth/register"
              className="text-white font-medium hover:underline"
            >
              Create account
            </Link>
          </p>

        </form>
      </div>
    </div>
  );
}