

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function ClaimPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  if (slug !== "demo-client") {
    return (
      <main className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-xl font-bold">Invalid claim link.</h1>
      </main>
    );
  }
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