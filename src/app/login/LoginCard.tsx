"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type LoginCardProps = {
  campaign?: string;
  nextParam?: string;
};

export default function LoginCard({ campaign, nextParam }: LoginCardProps) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  function safeNext(next: string | undefined, camp: string | undefined) {
    if (next && next.startsWith("/") && !next.startsWith("//")) {
      return next;
    }
    if (camp) return `/unlocked/${encodeURIComponent(camp)}`;
    return "/";
  }

  async function handleEmailSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, campaign, next: nextParam }),
      });
      type LoginResponse = { error?: string; next?: string };
      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as LoginResponse;
        setError(data.error ?? "Login failed");
        setLoading(false);
        return;
      }
      const data = (await res.json()) as LoginResponse;
      router.push(data.next ?? safeNext(nextParam, campaign));
    } catch (err) {
      console.error("Login request failed:", err);
      setError("Network error");
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md w-full flex flex-col items-center">
        <div className="text-sm font-semibold text-blue-600 mb-2 tracking-wide uppercase">Claim your free ebook</div>
        <h1 className="text-2xl font-bold mb-2">Sign in to continue</h1>
        <p className="text-gray-600 mb-6 text-center">
          Use your school, event, or personal email to unlock your ebook. More sign-in options are coming soon.
        </p>
        <div className="w-full flex flex-col gap-3 mb-4">
          <button
            className="flex items-center justify-center gap-2 w-full px-6 py-3 bg-white border border-gray-300 text-gray-800 rounded-lg font-semibold shadow-sm hover:bg-gray-100 transition disabled:opacity-60 disabled:cursor-not-allowed"
            disabled
            aria-disabled="true"
          >
            <span className="inline-block w-5 h-5 bg-gray-200 rounded-full" />
            Continue with Google
          </button>
          <button
            className="flex items-center justify-center gap-2 w-full px-6 py-3 bg-white border border-gray-300 text-gray-800 rounded-lg font-semibold shadow-sm hover:bg-gray-100 transition disabled:opacity-60 disabled:cursor-not-allowed"
            disabled
            aria-disabled="true"
          >
            <span className="inline-block w-5 h-5 bg-gray-200 rounded-full" />
            Continue with Microsoft
          </button>
        </div>
        <div className="flex items-center w-full mb-4">
          <div className="flex-grow h-px bg-gray-200" />
          <span className="mx-3 text-gray-400 text-xs font-medium">or continue with email</span>
          <div className="flex-grow h-px bg-gray-200" />
        </div>
        <form onSubmit={handleEmailSubmit} className="flex flex-col gap-2 w-full mb-2">
          <input
            type="email"
            required
            placeholder="you@example.com"
            className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={email}
            onChange={e => setEmail(e.target.value)}
            disabled={loading}
            autoComplete="email"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white rounded px-3 py-2 font-semibold hover:bg-blue-700 transition"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Continue with Email"}
          </button>
          {error && <div className="text-red-600 text-sm">{error}</div>}
        </form>
        <div className="text-xs text-gray-500 mb-1 text-center">
          You&apos;ll be redirected back to your ebook after signing in.
        </div>
        <div className="text-xs text-gray-400 text-center mt-2">
          Google and Microsoft sign-in will be available soon.
        </div>
      </div>
    </div>
  );
}
