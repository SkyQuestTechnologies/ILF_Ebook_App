"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get("next") || "/library";
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    const res = await fetch("/api/session", {
      method: "POST",
      body: JSON.stringify({ email }),
      headers: { "Content-Type": "application/json" },
    });
    if (res.ok) {
      router.replace(next);
    } else {
      setError("Login failed");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-50 px-4">
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 w-full max-w-lg p-8 sm:p-10 flex flex-col items-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Sign in</h1>
        <p className="text-gray-600 mb-6 text-center text-sm max-w-xs">Access your ebooks and manage your library account.</p>
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
          <input
            type="email"
            required
            placeholder="Email address"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition placeholder-gray-400"
          />
          <button
            type="submit"
            className="w-full rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 text-base transition shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Continue with Email
          </button>
        </form>
        <div className="w-full mt-6 flex flex-col gap-3">
          <button
            className="w-full rounded-lg bg-white border border-gray-300 text-gray-700 font-semibold py-3 text-base hover:bg-gray-50 transition shadow-sm disabled:opacity-60"
            disabled
          >
            Continue with Google (demo)
          </button>
          <button
            className="w-full rounded-lg bg-white border border-gray-300 text-gray-700 font-semibold py-3 text-base hover:bg-gray-50 transition shadow-sm disabled:opacity-60"
            disabled
          >
            Continue with Microsoft (demo)
          </button>
        </div>
        {error && <div className="text-red-600 mt-4 text-sm w-full text-center">{error}</div>}
      </div>
    </div>
  );
}
