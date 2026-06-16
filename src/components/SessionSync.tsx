"use client";
import { useEffect } from "react";

export default function SessionSync() {
  useEffect(() => {
    const match = document.cookie.match(/(?:^|;\s*)ilf_user=([^;]*)/);
    if (!match) return;
    try {
      const user = JSON.parse(decodeURIComponent(match[1]));
      if (user?.email) {
        sessionStorage.setItem("ilf_session_user", JSON.stringify(user));
      }
    } catch {}
  }, []);
  return null;
}
