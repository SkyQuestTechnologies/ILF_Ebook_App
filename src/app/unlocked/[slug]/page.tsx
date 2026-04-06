import { redirect } from "next/navigation";

export default function UnlockedPage() {
  // Optionally, redirect to the main library
  import { cookies } from "next/headers";
  import { redirect } from "next/navigation";
  import Link from "next/link";

  export default function UnlockedPage({ params }: { params: { slug: string } }) {
    if (params.slug !== "demo-client") {
      return <div>Invalid unlocked page.</div>;
    }
    const session = cookies().get("session");
    if (!session) {
      redirect(`/login?next=/unlocked/demo-client`);
    }
    return (
      <main className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold mb-4">Demo Ebook Unlocked!</h1>
        <p className="mb-6">You can now download your sample ebook.</p>
        <Link
          href="/download/demo-client"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Download PDF
        </Link>
      </main>
    );
  }
  return null;
}
