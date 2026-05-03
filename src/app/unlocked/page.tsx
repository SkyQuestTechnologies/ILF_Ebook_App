import Navbar from "../components/Navbar";
import Image from "next/image";

const categories = [
  "Featured",
  "Free Ebooks",
  "Financial Literacy",
  "Entrepreneurship",
  "Career",
  "Student Success",
  "New Releases",
];

const shelves = [
  { title: "Featured Titles", key: "featured" },
  { title: "Popular Free Ebooks", key: "popular" },
  { title: "Recommended", key: "recommended" },
  { title: "School/Event Collection", key: "school" },
  { title: "Recently Unlocked", key: "recent" },
];

// Demo-safe mock data
const ebooks = [
  {
    id: 1,
    title: "Money Matters: A Student's Guide",
    author: "Jane Doe",
    cover: "/sample-ebook.txt", // Replace with real cover images if available
    category: "Financial Literacy",
    badge: "Free",
  },
  {
    id: 2,
    title: "Entrepreneurship 101",
    author: "John Smith",
    cover: "/sample-ebook.txt",
    category: "Entrepreneurship",
    badge: "Unlocked",
  },
  {
    id: 3,
    title: "Career Kickstart",
    author: "Alex Lee",
    cover: "/sample-ebook.txt",
    category: "Career",
    badge: "Free",
  },
  {
    id: 4,
    title: "Success in School",
    author: "Sam Patel",
    cover: "/sample-ebook.txt",
    category: "Student Success",
    badge: "Unlocked",
  },
  {
    id: 5,
    title: "New Release: The Future You",
    author: "Taylor Kim",
    cover: "/sample-ebook.txt",
    category: "New Releases",
    badge: "New",
  },
];

function EbookCard({ ebook }: { ebook: typeof ebooks[0] }) {
  return (
    <div className="bg-zinc-900 rounded-xl shadow-md overflow-hidden flex flex-col min-w-[140px] max-w-[180px] w-full">
      <div className="relative aspect-[3/4] w-full">
        <Image
          src={ebook.cover}
          alt={ebook.title}
          fill
          className="object-cover"
          sizes="(max-width: 600px) 50vw, 180px"
        />
        {ebook.badge && (
          <span className="absolute top-2 left-2 bg-blue-600 text-xs text-white px-2 py-0.5 rounded-full font-semibold">
            {ebook.badge}
          </span>
        )}
      </div>
      <div className="p-3 flex-1 flex flex-col justify-between">
        <div>
          <div className="text-sm text-zinc-300 font-medium truncate mb-1">{ebook.category}</div>
          <div className="text-base text-white font-bold truncate mb-0.5">{ebook.title}</div>
          <div className="text-xs text-zinc-400 truncate">{ebook.author}</div>
        </div>
      </div>
    </div>
  );
}

export default function UnlockedLibrary() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white flex flex-col">
      <Navbar />
      <main className="flex-1 w-full max-w-5xl mx-auto px-2 sm:px-4 py-4">
        <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-2xl font-bold tracking-tight">Welcome back</h1>
          <div className="flex gap-2 overflow-x-auto pb-1">
            {categories.map((cat) => (
              <button
                key={cat}
                className="px-3 py-1 rounded-full bg-zinc-800 text-zinc-200 text-sm font-semibold hover:bg-blue-700 hover:text-white transition whitespace-nowrap"
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-8">
          {shelves.map((shelf) => (
            <section key={shelf.key}>
              <h2 className="text-lg font-semibold mb-3 text-zinc-100">{shelf.title}</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {ebooks.map((ebook) => (
                  <EbookCard key={ebook.id + shelf.key} ebook={ebook} />
                ))}
              </div>
            </section>
          ))}
        </div>
      </main>
    </div>
  );
}
