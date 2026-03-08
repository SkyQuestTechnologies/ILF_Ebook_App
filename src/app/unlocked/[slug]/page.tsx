import Link from "next/link";

export default function UnlockedPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-4">Ebook Unlocked!</h1>
      <div className="mb-2">Campaign: <span className="font-mono">{slug}</span></div>
      <Link
        href={`/download/${encodeURIComponent(slug)}`}
        className="bg-green-600 text-white rounded px-3 py-2 font-semibold mb-2"
      >
        Download Ebook
      </Link>
      <Link href="/" className="text-blue-600 underline">Back to Home</Link>
    </main>
  );
}
