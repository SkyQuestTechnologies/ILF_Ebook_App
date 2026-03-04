import Link from "next/link";

export default async function UnlockedPage({ params }: { params: Promise<{ slug?: string }> }) {
  const { slug } = await params;
  if (!slug) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="bg-white shadow-lg rounded-xl p-8 max-w-md w-full text-center">
          <h1 className="text-2xl font-bold mb-2">Missing campaign slug</h1>
          <p className="text-gray-600 mb-4">No campaign specified.</p>
          <Link
            href="/"
            className="inline-block w-full px-6 py-3 mt-4 text-blue-600 rounded-lg font-semibold hover:underline transition"
          >
            Back to home
          </Link>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white shadow-lg rounded-xl p-8 max-w-md w-full text-center">
        <h1 className="text-2xl font-bold mb-2">Unlocked</h1>
        <p className="text-gray-600 mb-4">You now have access to the ebook.</p>
        <p className="text-xs text-gray-400 mb-6">Campaign: {slug}</p>
        <Link
          href={`/download?campaign=${encodeURIComponent(slug)}`}
          className="inline-block w-full px-6 py-3 mb-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          Download ebook
        </Link>
        <Link
          href={`/claim/${encodeURIComponent(slug)}`}
          className="inline-block w-full px-6 py-3 text-blue-600 rounded-lg font-semibold hover:underline transition"
        >
          Back to claim
        </Link>
        <Link
          href="/"
          className="inline-block w-full px-6 py-3 text-blue-600 rounded-lg font-semibold hover:underline transition"
        >
          Back to home
        </Link>
      </div>
    </div>
  );
}
