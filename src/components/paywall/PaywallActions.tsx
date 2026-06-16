"use client";
import { useRouter } from "next/navigation";

export default function PaywallActions({ slug }: { slug: string; title: string; price: number }) {
  const router = useRouter();

  function handleBuy() {
    const user = sessionStorage.getItem("ilf_session_user");
    if (!user) {
      router.push(`/login?next=/checkout/${slug}`);
    } else {
      router.push(`/checkout/${slug}`);
    }
  }

  return (
    <div className="w-full flex flex-col gap-3">
      <button
        type="button"
        onClick={handleBuy}
        className="w-full rounded-xl bg-blue-600 h-11 px-3 text-sm font-semibold text-white hover:bg-blue-700 transition flex items-center justify-center"
      >
        Get Premium Access
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
