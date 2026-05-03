"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function PaywallActions({ slug, title, price }: { slug: string; title: string; price: number }) {
  const router = useRouter();
  const [success, setSuccess] = useState(false);

  function handleDemoPurchase(e: React.FormEvent) {
    e.preventDefault();
    // Demo purchase: In production, integrate Stripe or payment provider here
    router.push(`/unlocked/${slug}`);
  }

  function handleCompletePurchase() {
    // Mark the book as unlocked in localStorage (demo only)
    if (typeof window !== "undefined") {
      const unlocked = JSON.parse(localStorage.getItem("unlockedBooks") || "[]");
      if (!unlocked.includes(slug)) {
        unlocked.push(slug);
        localStorage.setItem("unlockedBooks", JSON.stringify(unlocked));
      }
    }
    setSuccess(true);
    setTimeout(() => {
      router.push("/library");
    }, 800);
  }

  return (
    <form
      action="/unlocked"
      method="GET"
      className="w-full flex flex-col gap-3"
      onSubmit={handleDemoPurchase}
    >
      <button
        type="submit"
        className="w-full rounded-xl bg-blue-600 h-11 px-3 py-0 text-center text-sm font-semibold text-white hover:bg-blue-700 transition flex items-center justify-center"
      >
        Demo purchase
      </button>
      <button
        type="button"
        className="w-full rounded-xl border border-gray-300 h-11 px-3 py-0 text-center text-sm font-semibold text-gray-700 hover:bg-gray-100 transition flex items-center justify-center"
        onClick={() => router.push("/library")}
      >
        Back to Library
      </button>
      <button
        type="button"
        className="w-full rounded-xl bg-green-600 h-11 px-3 py-0 text-center text-sm font-semibold text-white hover:bg-green-700 transition flex items-center justify-center"
        onClick={handleCompletePurchase}
      >
        Complete Purchase (Demo)
      </button>
      {success && (
        <div className="text-green-600 text-center text-sm mt-2">Purchase successful! Redirecting...</div>
      )}
    </form>
  );
}
