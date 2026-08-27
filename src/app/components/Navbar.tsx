"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type Session = { role: "author" | "reader"; email: string; name: string } | null;

export default function Navbar() {
  const [session, setSession] = useState<Session>(null);
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/session")
      .then((r) => r.json() as Promise<{ session: Session }>)
      .then((data) => { if (!cancelled) setSession(data.session ?? null); })
      .catch(() => {});
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    if (!open) return;
    function onClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, [open]);

  async function handleLogout() {
    const endpoint = session?.role === "author" ? "/api/author/logout" : "/api/auth/logout";
    await fetch(endpoint, { method: "POST" });
    try { sessionStorage.removeItem("ilf_session_user"); } catch {}
    setSession(null);
    setOpen(false);
    window.location.href = "/";
  }

  const isAuthor = session?.role === "author";
  const displayName = session?.name || session?.email?.split("@")[0] || "";
  const initial = displayName.charAt(0).toUpperCase();

  return (
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/90 backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl px-6 items-center justify-between py-3.5">
        <Link href="/" className="flex items-center gap-2">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white text-xs font-bold">ILF</span>
          <span className="font-semibold tracking-tight text-gray-900 text-sm">iLFEbook</span>
        </Link>

        <nav className="hidden items-center gap-6 text-sm text-gray-500 md:flex">
          <Link href="/#how-it-works" className="hover:text-gray-900 transition-colors">How it works</Link>
          <Link href="/#featured" className="hover:text-gray-900 transition-colors">Featured</Link>
          <Link href="/library" className="hover:text-gray-900 transition-colors">Library</Link>
          <Link href="/#about" className="hover:text-gray-900 transition-colors">About</Link>
          {session?.role !== "reader" && (
            <Link href="/author/dashboard" className="hover:text-gray-900 transition-colors">Author Portal</Link>
          )}
        </nav>

        <div className="flex items-center gap-2">
          {session ? (
            <div className="relative" ref={dropdownRef}>
              <button onClick={() => setOpen((v) => !v)} className="flex items-center gap-2 rounded-full pl-1 pr-3 py-1 hover:bg-gray-100 transition-colors">
                <span className={`inline-flex h-8 w-8 items-center justify-center rounded-full text-white text-sm font-bold select-none ${isAuthor ? "bg-indigo-600" : "bg-blue-600"}`}>{initial}</span>
                <span className="flex flex-col items-start leading-tight">
                  <span className="text-sm font-medium text-gray-900 max-w-[120px] truncate">{displayName}</span>
                  <span className={`text-[10px] font-semibold uppercase tracking-wide ${isAuthor ? "text-indigo-600" : "text-blue-600"}`}>{isAuthor ? "Author" : "Reader"}</span>
                </span>
                <svg className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
              </button>
              {open && (
                <div className="absolute right-0 mt-2 w-56 rounded-xl border border-gray-200 bg-white shadow-lg overflow-hidden z-50">
                  <div className="px-4 py-3 border-b border-gray-100">
                    <p className="text-sm font-semibold text-gray-900 truncate">{displayName}</p>
                    <p className="text-xs text-gray-500 truncate mt-0.5">{session.email}</p>
                    <span className={`mt-1.5 inline-block rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${isAuthor ? "bg-indigo-50 text-indigo-700" : "bg-blue-50 text-blue-700"}`}>{isAuthor ? "Author account" : "Reader account"}</span>
                  </div>
                  <Link href={isAuthor ? "/author/dashboard" : "/library"} onClick={() => setOpen(false)} className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors">{isAuthor ? "Author Dashboard" : "My Library"}</Link>
                  <button onClick={handleLogout} className="flex w-full items-center gap-2.5 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors">Log out</button>
                </div>
              )}
            </div>
          ) : (
            <Link href="/login" className="rounded-lg bg-blue-600 px-3.5 py-2 text-xs font-semibold text-white hover:bg-blue-700 transition-colors">Log in</Link>
          )}
        </div>
      </div>
    </header>
  );
}
