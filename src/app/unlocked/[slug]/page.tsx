import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function UnlockedPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const cookieStore = await cookies();
  const session = cookieStore.get("ilf_session");

  if (!session) {
    redirect(`/login?next=/unlocked/${slug}`);
  }

  return (
    <main className="min-h-screen bg-neutral-50 flex items-center justify-center px-4">
      <section className="w-full max-w-xl rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-lg">
        <h1 className="text-2xl font-bold text-gray-900">Download Complete</h1>
        <p className="mt-3 text-gray-600">
          Your demo ebook has been downloaded successfully.
        </p>

        <Link
          href="/library"
          className="mt-6 inline-flex items-center justify-center rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
        >
          Back to Library
        </Link>
      </section>
    </main>
  );
}
