"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export default function LoginClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const nextUrl = searchParams.get("next") || "/";

  // Simulate login and redirect
  const handleLogin = useCallback(() => {
    // TODO: Replace with real auth (NextAuth, Clerk, etc)
    localStorage.setItem("ilf_auth", "1");
    router.push(nextUrl);
  }, [router, nextUrl]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white shadow-lg rounded-xl p-8 max-w-md w-full text-center">
        <h1 className="text-2xl font-bold mb-4">Sign in to continue</h1>
        <p className="text-gray-600 mb-8">Choose a login method to claim your ebook.</p>
        <button
          onClick={handleLogin}
          className="w-full mb-4 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          Continue with Google
        </button>
        <button
          onClick={handleLogin}
          className="w-full mb-4 px-6 py-3 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition"
        >
          Continue with Microsoft
        </button>
        <button
          onClick={handleLogin}
          className="w-full mb-6 px-6 py-3 bg-gray-200 text-gray-800 rounded-lg font-semibold hover:bg-gray-300 transition"
        >
          Continue with Email
        </button>
        <p className="text-xs text-gray-400">For demo only. No real authentication yet.</p>
      </div>
    </div>
  );
}
