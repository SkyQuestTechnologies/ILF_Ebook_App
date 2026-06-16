"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function UnlockedClient({ slug }: { slug: string }) {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/library");
    }, 5000);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center max-w-md w-full">
        {/* Success animation */}
        <span className="mb-4 flex items-center justify-center">
          <span className="inline-flex items-center justify-center rounded-full bg-green-100 p-4 animate-pulse">
            <svg
              className="w-8 h-8 text-green-600"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </span>
        </span>
        <h1 className="text-2xl font-bold mb-2 text-gray-900">Demo Ebook Unlocked!</h1>
        <p className="mb-6 text-gray-600">Your sample ebook is ready to download.</p>
        <Link
          href={`/download/${slug}`}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 mb-2"
        >
          Download PDF
        </Link>
        <p className="text-xs text-gray-400 mt-2">You’ll return to the library shortly.</p>
      </div>
    </div>
  );
}
