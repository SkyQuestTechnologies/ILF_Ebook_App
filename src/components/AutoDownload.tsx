"use client";

import { useEffect } from "react";

export function AutoDownload({ slug }: { slug?: string }) {
  useEffect(() => {
    if (!slug) return;

    const timer = window.setTimeout(() => {
      window.location.href = `/download/${encodeURIComponent(slug)}`;
    }, 100);

    return () => window.clearTimeout(timer);
  }, [slug]);

  return null;
}