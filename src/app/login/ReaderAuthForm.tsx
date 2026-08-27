"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Mode = "login" | "signup";

export default function ReaderAuthForm({ next, download }: { next: string; download: string }) {
  const router = useRouter();
  const [mode, setMode] = useState<Mode>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    setError("");
    setLoading(true);
    try {
      const endpoint = mode === "signup" ? "/api/auth/signup" : "/api/auth/login";
      const payload = mode === "signup"
        ? { email, password, name, next, download }
        : { email, password, next, download };
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await res.json()) as { ok?: boolean; next?: string; error?: string };
      if (!res.ok || !data.ok) {
        setError(data.error || "Something went wrong.");
        setLoading(false);
        return;
      }
      router.push(data.next || "/library");
    } catch {
      setError("Network error. Try again.");
      setLoading(false);
    }
  }

  const inputCls = "w-full rounded-xl border border-neutral-300 px-4 py-2.5 text-neutral-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500";

  return (
    <div className="mt-8 space-y-4">
      <div className="flex rounded-xl bg-neutral-100 p-1 text-sm font-medium">
        <button type="button" onClick={() => { setMode("login"); setError(""); }}
          className={`flex-1 rounded-lg px-3 py-2 transition-colors ${mode === "login" ? "bg-white text-neutral-900 shadow-sm" : "text-neutral-500"}`}>
          Log in
        </button>
        <button type="button" onClick={() => { setMode("signup"); setError(""); }}
          className={`flex-1 rounded-lg px-3 py-2 transition-colors ${mode === "signup" ? "bg-white text-neutral-900 shadow-sm" : "text-neutral-500"}`}>
          Sign up
        </button>
      </div>

      {mode === "signup" && (
        <div>
          <label className="block text-sm font-medium text-neutral-800 mb-1">Name</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} className={inputCls} placeholder="Your name" />
        </div>
      )}
      <div>
        <label className="block text-sm font-medium text-neutral-800 mb-1">Email</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={inputCls} placeholder="you@example.com" />
      </div>
      <div>
        <label className="block text-sm font-medium text-neutral-800 mb-1">Password</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          className={inputCls} placeholder={mode === "signup" ? "Min 8 characters" : "Your password"} />
      </div>

      {error && <p className="rounded-xl bg-red-50 px-4 py-2.5 text-sm text-red-700">{error}</p>}

      <button type="button" onClick={handleSubmit} disabled={loading}
        className="w-full rounded-xl bg-blue-600 px-4 py-3 font-semibold text-white transition-colors hover:bg-blue-700 disabled:opacity-60">
        {loading ? "Please wait…" : mode === "signup" ? "Create account" : "Log in"}
      </button>

      <p className="text-center text-sm text-neutral-500">
        {mode === "login" ? (
          <>New here? <button type="button" onClick={() => { setMode("signup"); setError(""); }} className="font-medium text-blue-600 hover:underline">Create an account</button></>
        ) : (
          <>Already have an account? <button type="button" onClick={() => { setMode("login"); setError(""); }} className="font-medium text-blue-600 hover:underline">Log in</button></>
        )}
      </p>
    </div>
  );
}
