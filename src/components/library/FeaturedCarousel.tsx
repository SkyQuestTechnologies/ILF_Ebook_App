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
  cover: string;
};

interface FeaturedCarouselProps {
  books: FeaturedBook[];
}

export default function FeaturedCarousel({ books }: FeaturedCarouselProps) {
  const featuredRowRef = useRef<HTMLDivElement>(null);

  const scrollFeatured = (dir: "left" | "right") => {
    const node = featuredRowRef.current;
    if (!node) return;
    const scrollAmount = 320;
    node.scrollBy({
      left: dir === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative">
      {/* Carousel Arrows (desktop only) */}
      <button
        type="button"
        aria-label="Scroll left"
        className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white border border-gray-200 shadow rounded-full w-9 h-9 items-center justify-center"
        style={{ marginLeft: "-20px" }}
        onClick={() => scrollFeatured("left")}
      >
        <span className="text-2xl text-gray-500">&#8592;</span>
      </button>
      <button
        type="button"
        aria-label="Scroll right"
        className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white border border-gray-200 shadow rounded-full w-9 h-9 items-center justify-center"
        style={{ marginRight: "-20px" }}
        onClick={() => scrollFeatured("right")}
      >
        <span className="text-2xl text-gray-500">&#8594;</span>
      </button>
      <div
        ref={featuredRowRef}
        className="flex gap-5 overflow-x-auto pb-2 px-1 hide-scrollbar scroll-smooth"
        style={{ WebkitOverflowScrolling: "touch", scrollbarWidth: "none" }}
      >
        {books.map((book) => (
          <div
            key={book.slug}
            className="min-w-[260px] max-w-[260px] w-[260px] flex-shrink-0 flex flex-col bg-white rounded-[20px] shadow-md border border-gray-100 overflow-hidden hover:shadow-lg transition"
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
                {book.free ? (
                  <span className="inline-block rounded-full bg-green-100 px-2 py-0.5 text-xs font-semibold text-green-700 ml-2">Free</span>
                ) : (
                  <span className="inline-block rounded-full bg-blue-100 px-2 py-0.5 text-xs font-semibold text-blue-700 ml-2">Paid</span>
                )}
                {book.featured && (
                  <span className="inline-block rounded-full bg-yellow-100 px-2 py-0.5 text-xs font-semibold text-yellow-700 ml-2">Featured</span>
                )}
              </div>
              <h3 className="text-base font-semibold text-gray-900 mb-1">{book.title}</h3>
              <div className="text-xs text-gray-500 mb-4">by {book.author}</div>
              <div className="mt-auto">
                {book.free ? (
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
        {/* Add empty cards to always show 5 on desktop */}
        {Array.from({ length: Math.max(0, 5 - books.length) }).map((_, i) => (
          <div key={i} className="min-w-[260px] max-w-[260px] w-[260px] flex-shrink-0" />
        ))}
      </div>
      <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}
