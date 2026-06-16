

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function ClaimPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const cookieStore = await cookies();
  const session = cookieStore.get("ilf_session");
  if (!session) {
    redirect(`/login?campaign=${slug}&next=/unlocked/${slug}`);
  } else {
    redirect(`/unlocked/${slug}`);
  }
  // This return is unreachable but required for type safety
  return null;
}