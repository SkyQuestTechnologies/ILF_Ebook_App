"use client";


import { useState } from "react";
import { useRouter } from "next/navigation";
import { Suspense } from "react";
import LoginSearchParamsClient from "./LoginSearchParamsClient";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function safeNext(next: string | null, campaign: string | null) {
    if (next && next.startsWith("/") && !next.startsWith("//")) {
      return next;
    }
    if (campaign) return `/unlocked/${encodeURIComponent(campaign)}`;
    return "/";
  }

  return (
    <Suspense>
      <LoginSearchParamsClient>
        {({ campaign, next }) => {
          async function handleSubmit(e: React.FormEvent) {
            e.preventDefault();
            setLoading(true);
            setError(null);
            try {
              const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, campaign, next }),
              });
              type LoginResponse = { error?: string; next?: string };
              if (!res.ok) {
                const data = (await res.json().catch(() => ({}))) as LoginResponse;
                setError(data.error ?? "Login failed");
                setLoading(false);
                return;
              }
              const data = (await res.json()) as LoginResponse;
              router.push(data.next ?? safeNext(next, campaign));
            } catch (err) {
              setError("Network error");
              setLoading(false);
            }
          }
          return (
            <main className="flex flex-col items-center justify-center min-h-screen p-4">
              <h1 className="text-2xl font-bold mb-4">Login</h1>
              <form onSubmit={handleSubmit} className="flex flex-col gap-2 w-80 max-w-full">
                <input
                  type="email"
                  required
                  placeholder="Email"
                  className="border rounded px-3 py-2"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  disabled={loading}
                />
                <button
                  type="submit"
                  className="bg-blue-600 text-white rounded px-3 py-2 font-semibold"
                  disabled={loading}
                >
                  {loading ? "Logging in..." : "Login"}
                </button>
                {error && <div className="text-red-600 text-sm">{error}</div>}
              </form>
            </main>
          );
        }}
      </LoginSearchParamsClient>
    </Suspense>
  );
}
