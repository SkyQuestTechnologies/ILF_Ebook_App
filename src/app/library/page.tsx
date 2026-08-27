import { AutoDownload } from "@/components/AutoDownload";
import FeaturedCarousel from "@/components/library/FeaturedCarousel";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import SplitHeadline from "@/components/SplitHeadline";
import RevealGroup from "@/components/RevealGroup";
import Link from "next/link";
import { listPublishedBooks, type PublicBook } from "@/lib/db";

const categoryGradients: Record<string, string> = {
  Fiction:              "from-violet-400 to-purple-500",
  Nonfiction:           "from-slate-400 to-slate-600",
  Education:            "from-blue-400 to-indigo-500",
  Career:               "from-emerald-400 to-teal-500",
  "Financial Literacy": "from-amber-400 to-orange-500",
  Entrepreneurship:     "from-rose-400 to-pink-500",
  "Student Success":    "from-sky-400 to-blue-500",
};

const allCategories = ["All","Fiction","Nonfiction","Education","Career","Financial Literacy","Entrepreneurship","Student Success"];

export default async function LibraryPage({
  searchParams,
}: {
  searchParams: Promise<{ download?: string; error?: string }>;
}) {
  const { download, error } = await searchParams;
  const downloadSlug = download || "";
  const errorMsg =
    error === "no-file"
      ? "That book doesn't have a downloadable file yet. Please try another title."
      : error === "not-found"
        ? "That book couldn't be found."
        : "";

  let books: PublicBook[] = [];
  try {
    books = await listPublishedBooks();
  } catch {
    books = [];
  }
  const featuredBooks = books.filter((b) => b.featured);

  return (
    <div className="min-h-screen flex flex-col bg-white antialiased">
      <Navbar />
      <AutoDownload slug={downloadSlug} />

      {errorMsg && (
        <div className="mx-auto max-w-4xl px-6 pt-6">
          <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
            {errorMsg}
          </div>
        </div>
      )}

      <main className="flex-1">

        {/* Hero */}
        <section className="relative overflow-hidden border-b border-slate-200 bg-white">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.07),transparent_55%)] pointer-events-none" />
          <div className="relative mx-auto max-w-4xl px-6 py-20 text-center">
            <SplitHeadline
              as="h1"
              className="text-4xl md:text-6xl font-bold tracking-tighter text-slate-900 mb-6 leading-[1.1]"
              triggerOnLoad
            >
              Explore the Library
            </SplitHeadline>
            <RevealGroup className="flex flex-col items-center" stagger={80} start="top 95%">
              <p className="text-lg text-slate-500 max-w-xl mb-8 leading-relaxed">
                Browse our collection of free and premium ebooks. Every title is curated for students.
              </p>
              {/* Stats pills */}
              <div className="flex flex-wrap justify-center gap-2 mb-8">
                {[
                  { label: "100+ Titles",    color: "bg-blue-50 text-blue-700"   },
                  { label: "New Releases",   color: "bg-emerald-50 text-emerald-700" },
                  { label: "Curated Picks",  color: "bg-amber-50 text-amber-700"  },
                ].map(({ label, color }) => (
                  <span key={label} className={`px-4 py-1.5 rounded-full text-sm font-semibold ${color}`}>
                    {label}
                  </span>
                ))}
              </div>
              {/* Category filter */}
              <div className="flex flex-wrap justify-center gap-2">
                {allCategories.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    className="px-4 py-1.5 rounded-full border border-slate-200 bg-white text-slate-600 text-sm font-medium hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200 transition-colors"
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </RevealGroup>
          </div>
        </section>

        {/* Featured Titles */}
        <section id="featured" className="border-b border-slate-100 bg-slate-50 px-6 py-16">
          <div className="mx-auto max-w-7xl">
            <div className="flex items-end justify-between mb-10">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-600 mb-3">
                  Curated picks
                </p>
                <SplitHeadline as="h2" className="text-2xl md:text-3xl font-bold tracking-tighter text-slate-900">
                  Featured Titles
                </SplitHeadline>
              </div>
              <a href="#all" className="hidden text-sm font-semibold text-blue-600 hover:text-blue-700 md:block shrink-0">
                Show all →
              </a>
            </div>
            <FeaturedCarousel books={featuredBooks.slice(0, 10)} />
          </div>
        </section>

        {/* All Titles */}
        <section id="all" className="px-6 py-16">
          <div className="mx-auto max-w-7xl">
            <div className="flex items-center justify-between mb-10">
              <SplitHeadline as="h2" className="text-2xl md:text-3xl font-bold tracking-tighter text-slate-900">
                All Titles
              </SplitHeadline>
              <span className="text-sm text-slate-400">{books.length} books</span>
            </div>

            {books.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24">
                <p className="text-slate-400 text-lg">No books available yet</p>
              </div>
            ) : (
              <RevealGroup
                className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4"
                stagger={30}
              >
                {books.map((book) => {
                  const gradient = categoryGradients[book.category] ?? "from-blue-400 to-indigo-500";
                  const href = book.free ? `/download/${book.slug}` : `/paywall/${book.slug}`;
                  return (
                    <Link
                      key={book.slug}
                      href={href}
                      className="group flex gap-4 rounded-2xl border border-slate-200 bg-white p-4 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-500/10 hover:border-blue-200"
                    >
                      {/* Book cover */}
                      <div className={`w-[80px] h-[110px] rounded-xl flex-shrink-0 bg-gradient-to-br ${gradient} ring-1 ring-black/5 shadow-sm transition-transform duration-300 group-hover:scale-105`} />

                      {/* Content */}
                      <div className="flex-1 flex flex-col min-w-0">
                        {/* Badges */}
                        <div className="flex gap-1.5 flex-wrap mb-2">
                          <span className="text-[10px] uppercase tracking-wider font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
                            {book.category}
                          </span>
                          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${book.free ? "bg-emerald-50 text-emerald-700" : "bg-blue-50 text-blue-700"}`}>
                            {book.free ? "Free" : `$${book.price.toFixed(2)}`}
                          </span>
                          {book.featured && (
                            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-amber-50 text-amber-700">
                              Featured
                            </span>
                          )}
                        </div>

                        <h3 className="text-sm font-semibold tracking-tight text-slate-900 leading-snug line-clamp-2">
                          {book.title}
                        </h3>
                        <p className="text-xs text-slate-500 mt-0.5">by {book.author}</p>
                        <p className="text-xs text-slate-400 leading-relaxed mt-1.5 line-clamp-2 flex-1">
                          {book.description}
                        </p>

                        <div className="mt-auto pt-2 flex items-center gap-1 text-xs font-semibold text-slate-400 transition-all duration-200 group-hover:text-blue-600">
                          <span>{book.free ? "Download Free" : `Buy · $${book.price.toFixed(2)}`}</span>
                          <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </RevealGroup>
            )}
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
