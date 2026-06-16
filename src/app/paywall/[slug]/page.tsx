import { notFound } from "next/navigation";
import PaywallActions from "@/components/paywall/PaywallActions";
import { books } from "@/lib/books";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";

export default async function PaywallPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const book = books.find((b) => b.slug === slug && !b.free);
    if (!book) return notFound();

    const originalPrice = (book.price * 1.5).toFixed(2);

    return (
        <>
            <Navbar />
            <main className="bg-white min-h-screen">
                <div className="max-w-6xl mx-auto px-6 py-24">
                    <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 p-8 md:p-12">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
                            {/* Left — Visual */}
                            <div className="bg-slate-50 rounded-2xl flex items-center justify-center p-12">
                                <div className="aspect-[3/4] w-full max-w-[240px] relative">
                                    <div className="absolute left-0 top-0 bottom-0 w-4 bg-indigo-800 rounded-l-md z-10" />
                                    <div className="absolute left-4 top-0 right-0 bottom-0 bg-gradient-to-br from-blue-400 to-indigo-600 rounded-r-2xl shadow-2xl flex flex-col justify-end p-6">
                                        <div className="w-full space-y-1.5 mb-4">
                                            <div className="h-1.5 w-3/4 bg-white/30 rounded" />
                                            <div className="h-1.5 w-1/2 bg-white/20 rounded" />
                                        </div>
                                        <p className="text-white/80 text-xs font-medium tracking-wide text-center w-full">
                                            {book.title}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Right — Details */}
                            <div className="flex flex-col justify-center">
                                <span className="inline-block text-xs font-semibold tracking-widest text-blue-500 uppercase mb-3">
                                    {book.category}
                                </span>
                                <h1 className="text-4xl font-bold tracking-tight text-slate-900 mb-2">
                                    {book.title}
                                </h1>
                                <p className="text-sm uppercase tracking-wider text-slate-500 mb-6">
                                    by {book.author}
                                </p>

                                <div className="flex items-baseline gap-3 mb-8">
                                    <span className="text-3xl font-bold text-blue-600">
                                        ${book.price.toFixed(2)}
                                    </span>
                                    <span className="text-lg text-slate-400 line-through">
                                        ${originalPrice}
                                    </span>
                                </div>

                                <p className="font-semibold text-slate-900 mb-3">
                                    Description
                                </p>
                                <p className="text-slate-600 leading-relaxed text-sm mb-8">
                                    {book.description}
                                </p>

                                <div className="border border-slate-200 rounded-xl p-6 bg-slate-50/50">
                                    <div className="flex items-center gap-2 mb-5">
                                        <svg
                                            className="w-4 h-4 text-blue-600 shrink-0"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            strokeWidth={2.5}
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M4.5 12.75l6 6 9-13.5"
                                            />
                                        </svg>
                                        <span className="text-sm font-medium text-slate-700">
                                            Digital Download &mdash; Instant
                                            Access
                                        </span>
                                    </div>
                                    <PaywallActions
                                        slug={book.slug}
                                        title={book.title}
                                        price={book.price}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
