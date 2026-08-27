"use client";
import { useRouter } from "next/navigation";

export default function PaywallActions({ slug }: { slug: string; title: string; price: number }) {
  const router = useRouter();

  return (
    <div className="w-full flex flex-col gap-3">
      <div className="w-full rounded-xl bg-blue-50 border border-blue-200 px-4 py-3 text-center">
        <p className="text-sm font-semibold text-blue-800">Purchasing coming soon</p>
        <p className="text-xs text-blue-600 mt-1">
          Paid titles aren&apos;t available for purchase just yet. Check back soon.
        </p>
      </div>
      <button
        type="button"
        disabled
        className="w-full rounded-xl bg-blue-600/50 h-11 px-3 text-sm font-semibold text-white cursor-not-allowed flex items-center justify-center"
      >
        Buy — coming soon
      </button>
      <button
        type="button"
        onClick={() => router.push("/library")}
        className="w-full rounded-xl border border-gray-300 h-11 px-3 text-sm font-semibold text-gray-700 hover:bg-gray-100 transition flex items-center justify-center"
      >
        Back to Library
      </button>
    </div>
  );
}
