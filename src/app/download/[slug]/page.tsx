import Link from "next/link";

export default async function DownloadPage({ params }: { params: Promise<{ slug?: string }> }) {
  const { slug } = await params;
  if (!slug) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="bg-white shadow-lg rounded-xl p-8 max-w-md w-full text-center">
          <h1 className="text-2xl font-bold mb-2">Missing campaign slug</h1>
          <p className="text-gray-600 mb-4">No campaign specified.</p>
          <Link
            href="/claim/school-visit"
            className="inline-block w-full px-6 py-3 mb-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Go to example campaign
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
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white shadow-lg rounded-xl p-8 max-w-md w-full text-center">
        <h1 className="text-2xl font-bold mb-2">Download</h1>
        <p className="text-gray-600 mb-4">Your ebook is ready.</p>
        <p className="text-xs text-gray-400 mb-6">Campaign: {slug}</p>
        <a
          href="/sample-ebook.txt"
          download
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block w-full px-6 py-3 mb-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          Download ebook
        </a>
        <Link
          href={`/unlocked/${encodeURIComponent(slug)}`}
          className="inline-block w-full px-6 py-3 mb-3 text-blue-600 rounded-lg font-semibold hover:underline transition"
        >
          Back to unlocked
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
