"use client";

import { useRouter } from "next/navigation";

export default function AuthorLogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/author/logout", { method: "POST" });
    router.push("/author/login");
  }

  return (
    <button
      type="button"
      onClick={handleLogout}
      className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100"
    >
      Sign out
    </button>
  );
}
