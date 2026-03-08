import Link from "next/link";

export default function ClaimPage({ params }: { params: { slug: string } }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full text-center">
        <h1 className="text-2xl font-bold mb-2">Claim Your Free Ebook</h1>
        <p className="text-gray-600 mb-6">Exclusive access for students</p>
        <Link
          href={`/unlocked/${encodeURIComponent(params.slug)}`}
          className="inline-block px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Continue
        </Link>
      </div>
    </div>
  );
}
