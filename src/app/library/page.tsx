
import Link from "next/link";
import Navbar from "../components/Navbar";
import FeaturedCarousel from "@/components/library/FeaturedCarousel";

// In the future, replace this array with a fetch from Google Sheets or a free DB.
// Example: fetch('/api/books') or use a server action to load from an external source.
// Demo data generator for 50 books
const demoTitles = [
  "Money Habits for Teens", "Startup Blueprint", "Mindset Mastery", "Career Kickstart Guide", "Modern Financial Literacy",
  "The Art of Focus", "Digital Nomad Life", "Science for Curious Minds", "The Lost Expedition", "Creative Writing Toolkit",
  "Healthy Living Essentials", "The Innovator's Playbook", "Everyday Leadership", "The Secret Gardeners", "AI for Everyone",
  "The Great Escape", "Productivity Hacks", "The World of Numbers", "History Unveiled", "The Coding Journey",
  "The Art of Negotiation", "Eco Warriors", "The Storyteller's Path", "Physics in Motion", "The Mindful Parent",
  "The Startup CEO", "The Young Investor", "The Explorer's Diary", "The Science of Sleep", "The Social Media Guide",
  "The Modern Philosopher", "The Wellness Project", "The Digital Classroom", "The Fictional Reality", "The Nonfiction Narrative",
  "The Education Revolution", "The Book of Curiosity", "The Learning Curve", "The Adventure Begins", "The Knowledge Seeker",
  "The Free Thinker", "The Paid Solution", "The Featured Five", "The Balanced Life", "The Growth Mindset",
  "The Reading Habit", "The Future is Now", "The Classic Collection", "The New Age", "The Essential Guide"
];

const demoAuthors = [
  "Jane Doe", "John Smith", "Alex Lee", "Sam Green", "Marie Curie", "Ava Carter", "Liam Brown", "Olivia Wilson", "Noah Miller", "Emma Davis",
  "Mason Clark", "Sophia Lewis", "Logan Walker", "Mia Hall", "Lucas Young", "Charlotte King", "Elijah Wright", "Amelia Scott", "James Turner", "Harper Adams",
  "Benjamin Baker", "Evelyn Nelson", "Henry Perez", "Abigail Roberts", "Sebastian Campbell", "Ella Mitchell", "Jack Carter", "Grace Evans", "Daniel Edwards", "Chloe Rivera",
  "Matthew Cooper", "Scarlett Morgan", "David Reed", "Victoria Cox", "Joseph Bailey", "Penelope Ward", "Samuel Brooks", "Layla Kelly", "Carter Sanders", "Zoey Price",
  "Wyatt Bennett", "Lily Gray", "Julian Hughes", "Hannah Foster", "Levi Simmons", "Nora Butler", "Isaac Barnes", "Ellie Ross", "Gabriel Henderson", "Stella Patterson"
];

const categoriesList = ["Fiction", "Nonfiction", "Education"];

function slugify(str) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

const books = Array.from({ length: 50 }).map((_, i) => {
  // Category distribution
  let category = categoriesList[i % 3];
  // Free/Paid distribution: ~40% free, ~60% paid
  let isFree = i < 20; // 20/50 = 40%
  // Featured: first 5
  let isFeatured = i < 5;
  // Use demo titles and authors, loop if needed
  const title = demoTitles[i % demoTitles.length] + (i >= demoTitles.length ? ` Vol. ${Math.floor(i / demoTitles.length) + 1}` : "");
  const author = demoAuthors[i % demoAuthors.length];
  return {
    id: `book-${i + 1}`,
    slug: slugify(title),
    title,
    author,
    category,
    isFree,
    isFeatured,
    cover: "",
  };
});

const categories = [
  { key: "all", label: "All" },
  { key: "fiction", label: "Fiction" },
  { key: "nonfiction", label: "Nonfiction" },
  { key: "education", label: "Education" },
];

export default function LibraryPage() {
  // For demo, all books are shown. Add filtering logic here if needed.
  const featuredBooks = books.filter((b) => b.isFeatured);
  const otherBooks = books.filter((b) => !b.isFeatured);


  return (
    <div className="min-h-screen bg-neutral-50">
      <Navbar />
      <main className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8 pb-12">
        {/* Hero Section */}
        <section id="how-it-works" className="pt-10 pb-0 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-3 max-w-3xl mx-auto">Explore the Library</h1>
          <p className="text-lg text-gray-600 mb-4 max-w-2xl mx-auto">
            Browse our collection of free and premium ebooks. Start reading today!
          </p>
          <div className="flex flex-wrap justify-center gap-3 mb-6">
            <a href="#all-titles" className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">100+ Titles</a>
            <a href="#featured" className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">New Releases</a>
            <a href="#featured" className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-700">Curated Picks</a>
          </div>
        </section>

        {/* Category Tabs */}
        <nav className="w-full flex justify-center mt-6 mb-10">
          <div className="w-full max-w-[1440px] flex flex-wrap gap-3 justify-center">
            <a href="#all-titles" className="rounded-full border border-blue-200 bg-white px-6 py-2 text-sm font-medium text-blue-700 hover:bg-blue-50 cursor-pointer transition">All</a>
            <a href="#fiction" className="rounded-full border border-blue-200 bg-white px-6 py-2 text-sm font-medium text-blue-700 hover:bg-blue-50 cursor-pointer transition">Fiction</a>
            <a href="#nonfiction" className="rounded-full border border-blue-200 bg-white px-6 py-2 text-sm font-medium text-blue-700 hover:bg-blue-50 cursor-pointer transition">Nonfiction</a>
            <a href="#education" className="rounded-full border border-blue-200 bg-white px-6 py-2 text-sm font-medium text-blue-700 hover:bg-blue-50 cursor-pointer transition">Education</a>
          </div>
        </nav>

        {/* Featured Titles Row */}
        <section id="featured" className="mb-12">
          <div className="flex items-center justify-between mb-5 px-1 relative">
            <h2 className="text-lg font-semibold text-gray-800">Featured Titles</h2>
            <Link href="#all-titles" className="text-sm text-blue-600 hover:underline font-medium">
              Show all
            </Link>
          </div>
          <FeaturedCarousel books={featuredBooks} />
        </section>

        {/* All Titles Grid */}
        <section id="all-titles" className="mt-12">
          <h2 className="text-lg font-semibold text-gray-800 mb-5">All Titles</h2>
          {/* Category Anchors */}
          <div className="sr-only">
            <span id="fiction"></span>
            <span id="nonfiction"></span>
            <span id="education"></span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {otherBooks.map((book) => (
              <div
                key={book.slug}
                className="flex flex-col bg-white rounded-[20px] shadow-md border border-gray-100 overflow-hidden hover:shadow-lg transition"
                id={book.category === "Fiction" ? "fiction" : book.category === "Nonfiction" ? "nonfiction" : book.category === "Education" ? "education" : undefined}
              >
                {/* Cover image placeholder */}
                <div className="h-[210px] bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                  <span className="text-5xl text-blue-300">📘</span>
                </div>
                <div className="flex-1 flex flex-col p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="inline-block rounded-full bg-gray-100 px-3 py-0.5 text-xs font-medium text-gray-600">
                      {book.category}
                    </span>
                    {book.isFree ? (
                      <span className="inline-block rounded-full bg-green-100 px-2 py-0.5 text-xs font-semibold text-green-700 ml-2">Free</span>
                    ) : (
                      <span className="inline-block rounded-full bg-blue-100 px-2 py-0.5 text-xs font-semibold text-blue-700 ml-2">Paid</span>
                    )}
                  </div>
                  <h3 className="text-base font-semibold text-gray-900 mb-1">{book.title}</h3>
                  <div className="text-xs text-gray-500 mb-4">by {book.author}</div>
                  <div className="mt-auto">
                    {book.isFree ? (
                      <Link
                        href={`/login?next=/download/${book.slug}`}
                        className="block w-full rounded-xl bg-green-600 h-11 px-3 py-0 text-center text-sm font-semibold text-white hover:bg-green-700 transition flex items-center justify-center"
                      >
                        Download Free
                      </Link>
                    ) : (
                      <Link
                        href={`/login?next=/checkout/${book.slug}`}
                        className="block w-full rounded-xl bg-blue-600 h-11 px-3 py-0 text-center text-sm font-semibold text-white hover:bg-blue-700 transition flex items-center justify-center"
                      >
                        Buy Now
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
        {/* About Anchor (invisible, near bottom) */}
        <div id="about" className="sr-only" aria-hidden="true">About</div>
      </main>
      {/* Hide scrollbar utility */}
      <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}

/*
  To integrate with Google Sheets or a free DB in the future,
  replace the `books` array above with a fetch or server action.
  Example:
    // import { getBooks } from '@/lib/books-data'
    // const books = await getBooks();
*/
