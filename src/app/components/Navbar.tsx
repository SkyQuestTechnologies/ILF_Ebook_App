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
                        (typeof (data as any).session === "object" ||
                            (data as any).session === null)
                    ) {
                        setSession(
                            (data as { session: { email?: string } | null })
                                .session,
                        );
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
        if (
            window.location.pathname !== "/library" &&
            window.location.pathname !== "/"
        ) {
            window.location.href = "/library";
        } else {
            window.location.reload();
        }
    };

    return (
        <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/90 backdrop-blur-sm">
            <div className="mx-auto flex max-w-7xl px-6 items-center justify-between py-3.5">
                <Link href="/" className="flex items-center gap-2">
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white text-xs font-bold">
                        ILF
                    </span>
                    <span className="font-semibold tracking-tight text-gray-900 text-sm">
                        iFLEbook
                    </span>
                </Link>
                <nav className="hidden items-center gap-6 text-sm text-gray-500 md:flex">
                    <Link
                        href="/#how-it-works"
                        className="hover:text-gray-900 transition-colors"
                    >
                        How it works
                    </Link>
                    <Link
                        href="/#featured"
                        className="hover:text-gray-900 transition-colors"
                    >
                        Featured
                    </Link>
                    <Link
                        href="/#about"
                        className="hover:text-gray-900 transition-colors"
                    >
                        About
                    </Link>
                </nav>
                <div className="flex items-center gap-2">
                    {loading ? null : session && session.email ? (
                        <>
                            <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-600">
                                {session.email}
                            </span>
                            <button
                                onClick={handleSignOut}
                                className="ml-2 rounded-lg border border-gray-200 px-3.5 py-2 text-xs font-semibold text-gray-900 hover:bg-gray-50 transition-colors"
                            >
                                Sign out
                            </button>
                        </>
                    ) : (
                        <>
                            <Link
                                href="/claim/school-visit"
                                className="rounded-lg border border-gray-200 px-3.5 py-2 text-xs font-semibold text-gray-900 hover:bg-gray-50 transition-colors"
                            >
                                Claim demo
                            </Link>
                            <Link
                                href="/"
                                className="rounded-lg bg-blue-600 px-3.5 py-2 text-xs font-semibold text-white hover:bg-blue-700 transition-colors"
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
