"use client"
import {LoginForm} from "@/components/auth/login-form";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center p-6">
      <div className="w-full max-w-md space-y-6 rounded-lg border p-6">
        <h1 className="text-2xl font-semibold">Login</h1>
        <LoginForm />
      </div>
    </main>
  );
}