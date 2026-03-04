import Link from "next/link";

export default async function ClaimPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const callbackUrl = `/library?campaign=${encodeURIComponent(slug)}`;
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white shadow-lg rounded-xl p-8 max-w-md w-full text-center">
        <h1 className="text-2xl font-bold mb-2">Claim your free ebook</h1>
        <p className="text-gray-600 mb-4">Exclusive access for students</p>
        <p className="text-xs text-gray-400 mb-6">Campaign: {slug}</p>
        <Link
          href={`/signin?callbackUrl=${encodeURIComponent(callbackUrl)}`}
          className="inline-block w-full px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          Continue
        </Link>
      </div>
    </div>
  );
}
