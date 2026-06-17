"use client"

import { RegisterForm } from '@/components/auth/register-form';

export default function RegisterPage() {
  return (
    <main className="flex min-h-screen items-center justify-center p-6">
      <div className="w-full max-w-md space-y-6 rounded-lg border p-6">
        <h1 className="text-2xl font-semibold">Register</h1>
        <RegisterForm />
      </div>
    </main>
  );
}