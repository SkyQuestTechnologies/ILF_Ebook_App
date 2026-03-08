"use client";
import { useSearchParams } from "next/navigation";

export default function LoginSearchParams({
  children,
}: {
  children: (params: { campaign: string | null; next: string | null }) => React.ReactNode;
}) {
  const searchParams = useSearchParams();
  const campaign = searchParams.get("campaign");
  const nextParam = searchParams.get("next");
  return <>{children({ campaign, next: nextParam })}</>;
}
