import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Image from "next/image";
import React from "react";

const categories = [
  "All Categories",
  "Featured",
  "Financial Literacy",
  "Entrepreneurship",
  "Career",
  "Student Success",
  "New Releases",
];

const sections = [
  { title: "Featured Titles", key: "featured", showAll: true },
  { title: "Popular Free Ebooks", key: "popular", showAll: true },
  { title: "New This Month", key: "new", showAll: false },
  { title: "Financial Literacy", key: "financial", showAll: false },
  { title: "Student Success", key: "student", showAll: false },
  { title: "Recently Added", key: "recent", showAll: false },
];

const ebooks = [
  {
    id: 1,
    title: "Money Matters: A Student's Guide",
    author: "Jane Doe",
    cover: "/sample-ebook.txt", // Replace with real cover images if available
    category: "Financial Literacy",
    isFree: true,
    isFeatured: true,
  },
  {
    id: 2,
    title: "Entrepreneurship 101",
    author: "John Smith",
    cover: "/sample-ebook.txt",
    category: "Entrepreneurship",
    isFree: true,
    isFeatured: true,
  },
  {
    id: 3,
    title: "Career Kickstart",
    author: "Alex Lee",
    cover: "/sample-ebook.txt",
    category: "Career",
    isFree: true,
    isFeatured: false,
  },
  {
    id: 4,
    title: "Success in School",
    author: "Sam Patel",
    cover: "/sample-ebook.txt",
    category: "Student Success",
    isFree: false,
    isFeatured: false,
  },
  {
    id: 5,
    title: "New Release: The Future You",
    author: "Taylor Kim",
    cover: "/sample-ebook.txt",
    category: "New Releases",
    isFree: false,
    isFeatured: true,
  },
  {
    id: 6,
    title: "College Readiness Essentials",
    author: "Jordan Lee",
    cover: "/sample-ebook.txt",
    category: "College Readiness",
    isFree: true,
    isFeatured: false,
  },
  {
    id: 7,
    title: "Personal Growth Playbook",
    author: "Morgan Cruz",
    cover: "/sample-ebook.txt",
    category: "Personal Growth",
    isFree: false,
    isFeatured: false,
  },
];

function EbookCard({ ebook }: { ebook: typeof ebooks[0] }) {
  return (
    <div className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden flex flex-col min-w-[140px] max-w-[180px] w-full transition hover:shadow-md focus-within:shadow-md">
      <div className="relative aspect-[3/4] w-full bg-blue-50 flex items-center justify-center">
        {/* Replace with real cover images if available */}
        <Image
          src={ebook.cover}
          alt={ebook.title}
          fill
          className="object-cover object-center"
          sizes="(max-width: 600px) 50vw, 180px"
        />
        {(ebook.isFree || ebook.isFeatured) && (
          <span className="absolute top-2 left-2 bg-blue-600 text-xs text-white px-2 py-0.5 rounded-full font-semibold">
            {ebook.isFree ? "Free" : "Featured"}
          </span>
        )}
      </div>
      <div className="p-3 flex-1 flex flex-col justify-between">
        <div>
          <div className="text-xs text-blue-600 font-medium mb-1">{ebook.category}</div>
          <div className="text-base text-gray-900 font-bold truncate mb-0.5">{ebook.title}</div>
          <div className="text-xs text-gray-500 truncate">{ebook.author}</div>
        </div>
      </div>
    </div>
  );
}

export default function LibraryPage() {
  // For demo, always show all categories as active
  const activeCategory = "All Categories";
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar loggedIn />
      {/* Hero / Intro */}
      <section className="w-full border-b border-gray-100 bg-white px-4 pt-8 pb-4 flex flex-col items-center text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Explore the Library</h1>
        <p className="text-gray-600 mb-3 max-w-xl">
          Discover free ebooks, featured collections, and student-ready resources.
        </p>
        <div className="flex gap-2 flex-wrap justify-center mb-2">
          <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold border border-blue-100">Free access</span>
          <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold border border-blue-100">Student-ready</span>
          <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold border border-blue-100">New this month</span>
        </div>
      </section>
      {/* Category Chips */}
      <nav className="w-full border-b border-gray-100 bg-white px-4 py-3 overflow-x-auto">
        <div className="flex gap-2 min-w-full">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`px-4 py-1.5 rounded-full text-sm font-semibold border transition whitespace-nowrap ${cat === activeCategory ? "bg-blue-600 text-white border-blue-600" : "bg-white text-gray-700 border-gray-200 hover:bg-blue-50"}`}
              tabIndex={0}
            >
              {cat}
            </button>
          ))}
        </div>
      </nav>
      {/* Main Content Sections */}
      <main className="flex-1 w-full max-w-6xl mx-auto px-2 sm:px-4 py-8 flex flex-col gap-12">
        {sections.map((section) => (
          <section key={section.key} className="w-full">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900">{section.title}</h2>
              {section.showAll && (
                <button className="text-blue-600 text-sm font-semibold hover:underline">Show all</button>
              )}
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
              {ebooks.slice(0, 5).map((ebook) => (
                <EbookCard key={ebook.id + section.key} ebook={ebook} />
              ))}
            </div>
          </section>
        ))}
      </main>
      <Footer />
    </div>
  );
}
