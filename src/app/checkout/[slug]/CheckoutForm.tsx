"use client";
import { useState } from "react";

export default function CheckoutForm({ slug }: { slug: string }) {
  const [loading, setLoading] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    window.location.href = `/download/${encodeURIComponent(slug)}`;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-neutral-800 mb-1">Cardholder Name</label>
        <input
          type="text"
          required
          placeholder="John Doe"
          className="w-full rounded-xl border border-neutral-300 px-4 py-3 text-neutral-950 outline-none focus:border-neutral-950 text-sm"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-neutral-800 mb-1">Card Number</label>
        <input
          type="text"
          required
          maxLength={19}
          placeholder="1234 5678 9012 3456"
          className="w-full rounded-xl border border-neutral-300 px-4 py-3 text-neutral-950 outline-none focus:border-neutral-950 text-sm font-mono"
        />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-medium text-neutral-800 mb-1">Expiry</label>
          <input
            type="text"
            required
            maxLength={5}
            placeholder="MM/YY"
            className="w-full rounded-xl border border-neutral-300 px-4 py-3 text-neutral-950 outline-none focus:border-neutral-950 text-sm font-mono"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-neutral-800 mb-1">CVV</label>
          <input
            type="text"
            required
            maxLength={4}
            placeholder="123"
            className="w-full rounded-xl border border-neutral-300 px-4 py-3 text-neutral-950 outline-none focus:border-neutral-950 text-sm font-mono"
          />
        </div>
      </div>
      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-xl bg-neutral-950 px-5 py-3 font-semibold text-white hover:bg-neutral-800 disabled:opacity-60 transition mt-2"
      >
        {loading ? "Processing..." : "Pay & Download"}
      </button>
      <p className="text-xs text-center text-neutral-400">Demo only — no real payment is processed.</p>
    </form>
  );
}
