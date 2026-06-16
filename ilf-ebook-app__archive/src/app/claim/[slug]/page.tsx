import { AutoDownload } from "@/components/AutoDownload";

// Example book data (expand as needed)
const books = [
  {
    slug: "school-visit",
    title: "School Visit Free Ebook",
    description: "A free sample ebook for students and families.",
    author: "ILF Team",
    category: "Education",
    featured: true,
    free: true,
  },
  {
    slug: "eco-warriors",
    title: "Eco Warriors",
    description: "A student-friendly ebook sample.",
    author: "Jane Green",
    category: "Fiction",
    featured: false,
    free: true,
  },
  {
    slug: "premium-sci-fi",
    title: "Galactic Frontiers",
    description: "A thrilling premium sci-fi adventure.",
    author: "A. Spacewriter",
    category: "Fiction",
    featured: true,
    free: false,
  },
  {
    slug: "premium-nonfiction",
    title: "The Green Revolution",
    description: "Insights into modern sustainability.",
    author: "Dr. Leaf",
    category: "Nonfiction",
    featured: false,
    free: false,
  },
  {
    slug: "premium-education",
    title: "Math Mastery",
    description: "Unlock your math potential.",
    author: "Prof. Numbers",
    category: "Education",
    featured: true,
    free: false,
  },
  // ...add more books as needed
];

const allCategories = ["All", "Fiction", "Nonfiction", "Education"];

export default async function LibraryPage({
  searchParams,
}: {
  searchParams: Promise<{ download?: string }>;
}) {
  const { download } = await searchParams;
  const downloadSlug = download || "";

  const featuredBooks = books.filter((b) => b.featured);
  // For demo, show all books in All Titles
  const allBooks = books;

  return (
    <main className="min-h-screen bg-white">
      <AutoDownload slug={downloadSlug} />

      {/* Navbar */}
      <nav className="w-full bg-white border-b border-gray-100">
        <div className="max-w-[1440px] mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 h-16">
          {/* Left: Logo */}
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-100">
              <span className="text-2xl">📚</span>
            </span>
            <span className="font-bold text-lg text-blue-900 tracking-tight">iLFEbook</span>
          </div>
          {/* Center: Links */}
          <div className="hidden md:flex gap-8 text-gray-700 font-medium">
            <a href="#how" className="hover:text-blue-700 transition">How it works</a>
            <a href="#featured" className="hover:text-blue-700 transition">Featured</a>
            <a href="#about" className="hover:text-blue-700 transition">About</a>
          </div>
          {/* Right: Auth/Actions */}
          <div className="flex items-center gap-4">
            {/* Example: Show user email and sign out if logged in */}
            {/* <span className="text-sm text-gray-700">user@email.com</span>
            <button className="text-sm px-3 py-1 rounded border border-gray-200 bg-white hover:bg-gray-50 transition">Sign out</button> */}
            <a
              href="/claim/demo"
              className="text-sm font-medium px-3 py-1 rounded bg-blue-50 text-blue-700 hover:bg-blue-100 transition"
            >
              Claim demo
            </a>
            <a
              href="/partner"
              className="text-sm font-medium px-3 py-1 rounded border border-blue-100 text-blue-700 hover:bg-blue-50 transition"
            >
              Partner with us
            </a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="w-full bg-white">
        <div className="max-w-[900px] mx-auto px-4 sm:px-6 lg:px-8 py-14 text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4">Explore the Library</h1>
          <p className="text-lg text-gray-500 mb-8">
            Browse our collection of free and premium ebooks. Start reading today!
          </p>
          <div className="flex flex-wrap justify-center gap-3 mb-6">
            <span className="px-4 py-1 rounded-full bg-blue-50 text-blue-700 text-sm font-semibold">100+ Titles</span>
            <span className="px-4 py-1 rounded-full bg-green-50 text-green-700 text-sm font-semibold">New Releases</span>
            <span className="px-4 py-1 rounded-full bg-yellow-50 text-yellow-700 text-sm font-semibold">Curated Picks</span>
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {allCategories.map((cat) => (
              <button
                key={cat}
                className="px-4 py-1 rounded-full border border-gray-200 bg-gray-50 text-gray-700 text-sm font-medium hover:bg-blue-50 hover:text-blue-700 transition"
                type="button"
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Titles */}
      <section id="featured" className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-900">Featured Titles</h2>
          <a href="#all" className="text-blue-600 text-sm font-medium hover:underline">Show all</a>
        </div>
        <div className="overflow-x-auto pb-2">
          <div className="flex gap-6 min-w-[700px]">
            {featuredBooks.length === 0 ? (
              <div className="text-gray-400 text-lg py-8">No featured books yet</div>
            ) : (
              featuredBooks.slice(0, 5).map((book) => (
                <div
                  key={book.slug}
                  className="flex-shrink-0 w-[260px] bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-200 transform hover:scale-105"
                >
                  <div className="h-[210px] bg-blue-50 rounded-t-2xl flex items-center justify-center relative">
                    <span className="text-5xl">📘</span>
                    {book.featured && (
                      <span className="absolute top-3 left-3 px-2 py-0.5 rounded-full bg-yellow-400 text-xs font-bold text-white shadow">Featured</span>
                    )}
                  </div>
                  <div className="p-5 flex flex-col gap-2">
                    <div className="flex gap-2 items-center">
                      <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold">{book.category}</span>
                      {book.free ? (
                        <span className="px-2 py-0.5 rounded-full bg-green-100 text-green-700 text-xs font-semibold">Free</span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold">Premium</span>
                      )}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">{book.title}</h3>
                    <div className="text-sm text-gray-500">{book.author}</div>
                    <p className="text-sm text-gray-500">{book.description}</p>
                    <a
                      href={`/download/${book.slug}`}
                      className={`mt-3 w-full inline-block text-center rounded-lg px-4 py-2 font-medium transition duration-200 ${
                        book.free
                          ? "bg-green-600 text-white hover:bg-green-700"
                          : "bg-blue-600 text-white hover:bg-blue-700"
                      }`}
                    >
                      {book.free ? "Download Free" : "Buy Now"}
                    </a>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* All Titles */}
      <section id="all" className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">All Titles</h2>
        {allBooks.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24">
            <p className="text-gray-400 text-lg">No books available yet</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
            {allBooks.map((book) => (
              <div
                key={book.slug}
                className="bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-200 transform hover:scale-105 flex flex-col"
                style={{ width: "100%", maxWidth: 260 }}
              >
                <div className="h-[210px] bg-blue-50 rounded-t-2xl flex items-center justify-center relative">
                  <span className="text-5xl">📘</span>
                  {book.featured && (
                    <span className="absolute top-3 left-3 px-2 py-0.5 rounded-full bg-yellow-400 text-xs font-bold text-white shadow">Featured</span>
                  )}
                </div>
                <div className="flex-1 flex flex-col p-5 gap-2">
                  <div className="flex gap-2 items-center">
                    <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold">{book.category}</span>
                    {book.free ? (
                      <span className="px-2 py-0.5 rounded-full bg-green-100 text-green-700 text-xs font-semibold">Free</span>
                    ) : (
                      <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold">Premium</span>
                    )}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">{book.title}</h3>
                  <div className="text-sm text-gray-500">{book.author}</div>
                  <p className="text-sm text-gray-500">{book.description}</p>
                  <a
                    href={`/download/${book.slug}`}
                    className={`mt-3 w-full inline-block text-center rounded-lg px-4 py-2 font-medium transition duration-200 ${
                      book.free
                        ? "bg-green-600 text-white hover:bg-green-700"
                        : "bg-blue-600 text-white hover:bg-blue-700"
                    }`}
                  >
                    {book.free ? "Download Free" : "Buy Now"}
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
