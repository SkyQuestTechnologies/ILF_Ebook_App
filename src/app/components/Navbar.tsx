"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [session, setSession] = useState<{ email?: string } | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch session on mount
  useEffect(() => {
    fetch("/api/session")
      .then(async (res) => {
        const contentType = res.headers.get("content-type") || "";
        if (!res.ok || !contentType.includes("application/json")) {
          setSession(null);
          setLoading(false);
          return;
        }
        try {
          const data: unknown = await res.json();
          if (
            typeof data === "object" &&
            data !== null &&
            "session" in data &&
            (typeof (data as any).session === "object" || (data as any).session === null)
          ) {
            setSession((data as { session: { email?: string } | null }).session);
          } else {
            setSession(null);
          }
        } catch (e) {
          setSession(null);
        }
        setLoading(false);
      })
      .catch(() => {
        setSession(null);
        setLoading(false);
      });
  }, []);

  // Sign out handler
  const handleSignOut = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    setSession(null);
    // Optionally refresh or route to /library
    if (window.location.pathname !== "/library" && window.location.pathname !== "/") {
      window.location.href = "/library";
    } else {
      window.location.reload();
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white shadow-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/" className="flex items-center gap-2">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white font-bold">
            ILF
          </span>
          <span className="font-semibold tracking-tight text-gray-900">
            iFLEbook
          </span>
        </Link>
        <nav className="hidden items-center gap-6 text-sm text-gray-600 md:flex">
          <Link href="/#how-it-works" className="hover:text-blue-700">
            How it works
          </Link>
          <Link href="/#featured" className="hover:text-blue-700">
            Featured
          </Link>
          <Link href="/#about" className="hover:text-blue-700">
            About
          </Link>
        </nav>
        <div className="flex items-center gap-3">
          {loading ? null : session && session.email ? (
            <>
              <span className="rounded-full bg-gray-100 px-3 py-1 text-sm font-semibold text-gray-700">
                Signed in as {session.email}
              </span>
              <button
                onClick={handleSignOut}
                className="rounded-xl border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-50"
                style={{ marginLeft: 8 }}
              >
                Sign out
              </button>
            </>
          ) : (
            <>
              <Link
                href="/claim/school-visit"
                className="rounded-xl border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-50"
              >
                Claim demo
              </Link>
              <Link
                href="/"
                className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
              >
                Partner with us
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}