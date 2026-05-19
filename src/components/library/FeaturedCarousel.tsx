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

const categoryGradients: Record<string, string> = {
  Fiction:              "from-violet-400 to-purple-500",
  Nonfiction:           "from-slate-400 to-slate-600",
  Education:            "from-blue-400 to-indigo-500",
  Career:               "from-emerald-400 to-teal-500",
  "Financial Literacy": "from-amber-400 to-orange-500",
  Entrepreneurship:     "from-rose-400 to-pink-500",
  "Student Success":    "from-sky-400 to-blue-500",
};

export default function FeaturedCarousel({ books }: FeaturedCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: dir === "left" ? -320 : 320, behavior: "smooth" });
  };

  return (
    <div className="relative">
      {/* Arrows */}
      <button
        type="button"
        aria-label="Scroll left"
        onClick={() => scroll("left")}
        className="absolute -left-4 top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white shadow-sm hover:border-blue-200 hover:shadow-md transition-all"
      >
        <span className="text-slate-500 text-sm">←</span>
      </button>
      <button
        type="button"
        aria-label="Scroll right"
        onClick={() => scroll("right")}
        className="absolute -right-4 top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white shadow-sm hover:border-blue-200 hover:shadow-md transition-all"
      >
        <span className="text-slate-500 text-sm">→</span>
      </button>

      {/* Scroll container */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scroll-smooth px-1 py-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {books.map((book) => {
          const gradient = categoryGradients[book.category] ?? "from-blue-400 to-indigo-500";
          const href = book.free ? `/download/${book.slug}` : `/paywall/${book.slug}`;
          return (
            <Link
              key={book.slug}
              href={href}
              className="group flex-none w-[220px] flex flex-col rounded-2xl border border-slate-200 bg-white overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/10 hover:border-blue-200"
            >
              {/* Cover */}
              <div className={`h-[160px] w-full bg-gradient-to-br ${gradient} relative flex-shrink-0 transition-transform duration-500 group-hover:scale-[1.02] origin-top`}>
                <div className="absolute top-3 right-3 flex flex-col gap-1.5 items-end">
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${book.free ? "bg-white/90 text-emerald-700" : "bg-white/90 text-slate-700"}`}>
                    {book.free ? "Free" : "Premium"}
                  </span>
                  {book.featured && (
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-amber-400/90 text-white">
                      Featured
                    </span>
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-col flex-1 p-4">
                <span className="text-[10px] uppercase tracking-wider font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full w-fit mb-2">
                  {book.category}
                </span>
                <h3 className="text-sm font-semibold tracking-tight text-slate-900 leading-snug line-clamp-2">
                  {book.title}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">by {book.author}</p>
                <div className="mt-auto pt-4">
                  <div className="flex items-center gap-1 text-xs font-semibold text-slate-400 transition-all duration-200 group-hover:text-blue-600">
                    <span>{book.free ? "Download Free" : "View Book"}</span>
                    <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
