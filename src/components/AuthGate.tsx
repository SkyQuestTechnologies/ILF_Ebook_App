"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AuthGate({ children, next }: { children: React.ReactNode; next: string }) {
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const isAuthed = localStorage.getItem("ilf_auth") === "1";
      if (!isAuthed) {
        router.replace(`/login?next=${encodeURIComponent(next)}`);
      }
    }
  }, [router, next]);

  // Render children only if authed
  if (typeof window !== "undefined" && localStorage.getItem("ilf_auth") !== "1") {
    return null;
  }
  return <>{children}</>;
}
