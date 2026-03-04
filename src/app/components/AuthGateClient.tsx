"use client";
import dynamic from "next/dynamic";
import React from "react";

const AuthGate = dynamic(() => import("@/components/AuthGate"), { ssr: false });

export default function AuthGateClient({ campaignSlug, children }: { campaignSlug: string, children?: React.ReactNode }) {
  // Pass the correct 'next' prop to AuthGate
  return <AuthGate next={`/claim/${encodeURIComponent(campaignSlug)}`}>{children}</AuthGate>;
}
