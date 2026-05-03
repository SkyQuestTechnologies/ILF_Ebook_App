"use client";

import { useRef } from "react";
import Link from "next/link";

export type FeaturedBook = {
  slug: string;
  title: string;
  author: string;
  category: string;
  featured: boolean;
  free: boolean;
};

interface FeaturedCarouselProps {
  books: FeaturedBook[];
}

export default function FeaturedCarousel({ books }: FeaturedCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({
      left: dir === "left" ? -300 : 300,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative">
      {/* Left Arrow */}
      <button
        type="button"
        aria-label="Scroll left"
        className="absolute left-[-20px] top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-gray-200 bg-white shadow-md hover:shadow-lg"
        onClick={() => scroll("left")}
      >
        <span className="text-2xl text-gray-500">&#8592;</span>
      </button>
      {/* Right Arrow */}
      <button
        type="button"
        aria-label="Scroll right"
        className="absolute right-[-20px] top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-gray-200 bg-white shadow-md hover:shadow-lg"
        onClick={() => scroll("right")}
      >
        <span className="text-2xl text-gray-500">&#8594;</span>
      </button>
      {/* Scroll Container */}
      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto scroll-smooth px-2 py-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        {books.map((book) => (
          <div
            key={book.slug}
            className="flex-none w-[260px] h-[420px] flex flex-col bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden"
          >
            {/* Cover image placeholder */}
            <div className="h-[210px] bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
              <span className="text-5xl text-blue-300">📘</span>
            </div>
            <div className="flex flex-1 flex-col p-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="inline-block rounded-full bg-gray-100 px-3 py-0.5 text-xs font-medium text-gray-600">
                    {book.category}
                  </span>
                  <span className="inline-block rounded-full bg-blue-100 px-2 py-0.5 text-xs font-semibold text-blue-700 ml-2">
                    {book.free ? "Free" : "Paid"}
                  </span>
                  {book.featured && (
                    <span className="inline-block rounded-full bg-yellow-100 px-2 py-0.5 text-xs font-semibold text-yellow-700 ml-2">
                      Featured
                    </span>
                  )}
                </div>
                <h3 className="text-base font-semibold text-gray-900 mb-1">{book.title}</h3>
                <div className="text-xs text-gray-500 mb-2">by {book.author}</div>
                <div className="text-sm text-gray-500">{/* Optionally add description here */}</div>
              </div>
              <div className="mt-auto pt-4">
                <Link
                  href={book.free ? `/download/${book.slug}` : `/paywall/${book.slug}`}
                  className="block w-full rounded-xl bg-blue-600 h-11 px-3 py-0 text-center text-sm font-semibold text-white hover:bg-blue-700 transition flex items-center justify-center"
                >
                  {book.free ? "Download Free" : "Buy Now"}
                </Link>
              </div>
            </div>
          </div>
        ))}
        {/* Add empty cards to always show 5 on desktop */}
        {Array.from({ length: Math.max(0, 5 - books.length) }).map((_, i) => (
          <div key={i} className="flex-none w-[260px] h-[420px] flex flex-col" />
        ))}
      </div>
    </div>
  );
}
