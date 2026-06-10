import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Link from "next/link";
import SplitHeadline from "@/components/SplitHeadline";
import RevealGroup from "@/components/RevealGroup";
import { books } from "@/lib/books";

export default function HomePage() {
    const featuredBooks = books.filter((b) => b.featured).slice(0, 4);
    return (
        <div className="min-h-screen flex flex-col bg-white antialiased">
            <Navbar />
            {/* Hero Section */}
            <section className="relative overflow-hidden border-b border-slate-200 bg-white">
                {/* Background radial */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.08),transparent_55%)]" />

                <div className="relative mx-auto grid min-h-screen max-w-7xl items-center gap-20 px-6 py-32 lg:grid-cols-2">
                    {/* LEFT */}
                    <div>
                        <SplitHeadline
                            as="h1"
                            className="mt-8 text-6xl font-semibold leading-[0.95] tracking-tight text-slate-900 md:text-7xl"
                            triggerOnLoad
                        >
                            The modern way
                            <span className="block text-blue-600">
                                to access ebooks
                            </span>
                        </SplitHeadline>

                        <RevealGroup
                            className="mt-8"
                            stagger={100}
                            start="top 95%"
                        >
                            <p className="max-w-xl text-lg leading-8 text-slate-500">
                                Discover free educational books through
                                beautifully designed digital experiences built
                                for modern students.
                            </p>
                            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                                <Link
                                    href="/login?next=%2Fclaim%2Fschool-visit"
                                    className="rounded-2xl bg-blue-600 px-7 py-4 font-medium text-white transition hover:bg-blue-700 shadow-sm shadow-blue-500/30"
                                >
                                    Claim free ebook
                                </Link>
                                <Link
                                    href="/library"
                                    className="rounded-2xl border border-slate-200 bg-white px-7 py-4 font-medium text-slate-900 hover:bg-slate-50 transition-colors"
                                >
                                    Browse library
                                </Link>
                            </div>
                        </RevealGroup>

                        <RevealGroup
                            className="mt-14 flex gap-10"
                            stagger={80}
                            start="top 95%"
                        >
                            {[
                                ["500+", "Books"],
                                ["120+", "Schools"],
                                ["10k+", "Students"],
                            ].map(([value, label]) => (
                                <div key={label}>
                                    <div className="text-3xl font-semibold text-slate-900">
                                        {value}
                                    </div>
                                    <div className="mt-1 text-sm text-slate-400">
                                        {label}
                                    </div>
                                </div>
                            ))}
                        </RevealGroup>
                    </div>

                    {/* RIGHT */}
                    <RevealGroup className="relative" start="top 80%">
                        {/* Glow */}
                        <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-400/10 blur-3xl" />

                        {/* Main Dashboard */}
                        <div className="relative overflow-hidden rounded-[32px] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/60">
                            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                                <div>
                                    <p className="text-sm text-slate-400">
                                        Featured Ebook
                                    </p>
                                    <h3 className="mt-1 text-lg font-medium text-slate-900">
                                        Deep Work
                                    </h3>
                                </div>

                                <div className="rounded-xl bg-blue-600 px-3 py-1 text-sm text-white">
                                    Free
                                </div>
                            </div>

                            <div className="mt-6 grid grid-cols-[160px_1fr] gap-6">
                                {/* Book Cover */}
                                <div className="aspect-[3/4] rounded-2xl bg-gradient-to-br from-blue-400 to-indigo-600 shadow-lg" />

                                {/* Content */}
                                <div>
                                    <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
                                        <p className="text-sm text-slate-500">
                                            Reading Progress
                                        </p>

                                        <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-200">
                                            <div className="h-full w-[68%] rounded-full bg-blue-500" />
                                        </div>

                                        <p className="mt-3 text-sm text-slate-400">
                                            68% completed
                                        </p>
                                    </div>

                                    <div className="mt-4 rounded-2xl border border-slate-100 bg-slate-50 p-4">
                                        <p className="text-sm text-slate-500">
                                            Student Access
                                        </p>

                                        <div className="mt-4 flex -space-x-3">
                                            {[1, 2, 3, 4].map((i) => (
                                                <div
                                                    key={i}
                                                    className="h-10 w-10 rounded-full border-2 border-white bg-gradient-to-br from-blue-400 to-indigo-500"
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Floating Card */}
                        <div className="absolute -bottom-10 -left-10 rounded-2xl border border-slate-200 bg-white p-5 shadow-lg shadow-slate-200/60">
                            <p className="text-sm text-slate-400">
                                Downloads today
                            </p>

                            <h4 className="mt-2 text-3xl font-semibold text-slate-900">
                                1,284
                            </h4>
                        </div>
                    </RevealGroup>
                </div>
            </section>

            {/* How it works */}
            <section
                id="how-it-works"
                className="w-full py-24 bg-white flex justify-center overflow-hidden"
            >
                <div className="max-w-7xl px-6 w-full mx-auto flex flex-col items-center">
                    <SplitHeadline
                        as="h2"
                        className="text-2xl md:text-4xl font-bold tracking-tighter mb-4 text-slate-900 text-center"
                    >
                        How it works
                    </SplitHeadline>
                    <p className="text-slate-500 text-center mb-16 max-w-lg">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam.
                    </p>
                    <RevealGroup
                        className="flex flex-col gap-24 md:gap-32 w-full"
                        stagger={150}
                    >
                        {/* Step 1 — Visual Left, Text Right */}
                        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-20">
                            <div className="relative w-full md:w-1/2 flex items-center justify-center min-h-[280px]">
                                <span className="absolute text-[9rem] md:text-[12rem] font-bold text-slate-100 select-none leading-none -left-4 -top-8 z-0">
                                    01
                                </span>
                                <div className="absolute w-56 h-56 rounded-full bg-blue-50 z-0" />
                                <div className="relative z-10 bg-white shadow-xl shadow-slate-200/60 rounded-2xl p-6 w-[280px] md:w-[300px]">
                                    <div className="h-4 w-2/3 bg-slate-900 rounded mb-5" />
                                    <div className="space-y-2 mb-6">
                                        <div className="h-2.5 w-full bg-slate-100 rounded" />
                                        <div className="h-2.5 w-5/6 bg-slate-100 rounded" />
                                        <div className="h-2.5 w-4/6 bg-slate-100 rounded" />
                                    </div>
                                    <div className="h-8 w-24 bg-blue-600 rounded-lg" />
                                </div>
                            </div>
                            <div className="w-full md:w-1/2">
                                <span className="inline-block text-xs font-semibold tracking-widest text-blue-500 uppercase mb-3">
                                    Step 01
                                </span>
                                <h3 className="text-2xl font-bold tracking-tight text-slate-900 mb-4">
                                    Scan QR
                                </h3>
                                <p className="text-slate-500 leading-relaxed max-w-sm">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. We know your needs are more than just a form — committed to providing the best experience.
                                </p>
                            </div>
                        </div>

                        {/* Step 2 — Text Left, Visual Right */}
                        <div className="flex flex-col md:flex-row-reverse items-center gap-12 md:gap-20">
                            <div className="relative w-full md:w-1/2 flex items-center justify-center min-h-[280px]">
                                <span className="absolute text-[9rem] md:text-[12rem] font-bold text-slate-100 select-none leading-none -left-4 -top-8 z-0">
                                    02
                                </span>
                                <div className="absolute w-56 h-56 rounded-full bg-blue-50 z-0" />
                                <div className="relative z-10 bg-white shadow-xl shadow-slate-200/60 rounded-2xl p-6 w-[280px] md:w-[300px]">
                                    <div className="h-4 w-1/2 bg-slate-900 rounded mb-5" />
                                    <div className="flex items-center gap-2 border border-slate-200 rounded-lg px-3 py-2 mb-5">
                                        <div className="h-2.5 flex-1 bg-slate-100 rounded" />
                                        <div className="h-5 w-5 rounded bg-blue-100 shrink-0" />
                                    </div>
                                    <div className="space-y-2">
                                        <div className="h-2.5 w-full bg-slate-100 rounded" />
                                        <div className="h-2.5 w-3/4 bg-slate-100 rounded" />
                                    </div>
                                </div>
                            </div>
                            <div className="w-full md:w-1/2">
                                <span className="inline-block text-xs font-semibold tracking-widest text-blue-500 uppercase mb-3">
                                    Step 02
                                </span>
                                <h3 className="text-2xl font-bold tracking-tight text-slate-900 mb-4">
                                    Sign in
                                </h3>
                                <p className="text-slate-500 leading-relaxed max-w-sm">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. It&apos;s the fast, easy way to verify your identity and access your content anytime, anywhere.
                                </p>
                            </div>
                        </div>

                        {/* Step 3 — Visual Left, Text Right */}
                        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-20">
                            <div className="relative w-full md:w-1/2 flex items-center justify-center min-h-[280px]">
                                <span className="absolute text-[9rem] md:text-[12rem] font-bold text-slate-100 select-none leading-none -left-4 -top-8 z-0">
                                    03
                                </span>
                                <div className="absolute w-56 h-56 rounded-full bg-blue-50 z-0" />
                                <div className="relative z-10 bg-white shadow-xl shadow-slate-200/60 rounded-2xl p-6 w-[280px] md:w-[300px]">
                                    <div className="h-4 w-3/4 bg-slate-900 rounded mb-5" />
                                    <div className="grid grid-cols-2 gap-2 mb-5">
                                        <div className="h-16 bg-slate-50 border border-slate-100 rounded-lg" />
                                        <div className="h-16 bg-blue-50 border border-blue-100 rounded-lg" />
                                        <div className="h-16 bg-slate-50 border border-slate-100 rounded-lg" />
                                        <div className="h-16 bg-slate-50 border border-slate-100 rounded-lg" />
                                    </div>
                                    <div className="h-8 w-full bg-blue-600 rounded-lg" />
                                </div>
                            </div>
                            <div className="w-full md:w-1/2">
                                <span className="inline-block text-xs font-semibold tracking-widest text-blue-500 uppercase mb-3">
                                    Step 03
                                </span>
                                <h3 className="text-2xl font-bold tracking-tight text-slate-900 mb-4">
                                    Download
                                </h3>
                                <p className="text-slate-500 leading-relaxed max-w-sm">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Instantly access your free ebook and start reading right away.
                                </p>
                            </div>
                        </div>
                    </RevealGroup>
                </div>
            </section>

            {/* Featured */}
            <section id="featured" className="bg-slate-50 px-6 py-28">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="flex items-end justify-between gap-6 mb-14">
                        <div>
                            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600 mb-4">
                                Featured Collection
                            </p>
                            <SplitHeadline
                                as="h2"
                                className="text-4xl font-bold tracking-tighter text-slate-900"
                            >
                                Popular ebooks
                            </SplitHeadline>
                        </div>
                        <Link
                            href="/library"
                            className="hidden text-sm font-semibold text-blue-600 hover:text-blue-700 md:block shrink-0"
                        >
                            View all →
                        </Link>
                    </div>

                    <RevealGroup
                        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
                        stagger={120}
                    >
                        {featuredBooks.map((book) => (
                            <Link
                                key={book.slug}
                                href={book.free ? `/download/${book.slug}` : `/paywall/${book.slug}`}
                                className="group rounded-3xl border border-slate-200 bg-white p-6 flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/10 hover:border-blue-200"
                            >
                                <div className="aspect-[3/4] rounded-2xl bg-gradient-to-br from-blue-100 to-blue-200 transition-transform duration-500 group-hover:scale-[1.02]" />

                                <div className="mt-5 flex-1 flex flex-col">
                                    <h3 className="text-lg font-semibold tracking-tight text-slate-900">
                                        {book.title}
                                    </h3>
                                    <p className="mt-1 text-sm text-slate-500">
                                        {book.author}
                                    </p>
                                    <div className="mt-auto pt-5 flex items-center gap-1 text-sm text-slate-400 transition-all duration-200 group-hover:text-blue-600">
                                        <span>View Book</span>
                                        <span className="transition-transform duration-200 group-hover:translate-x-1">
                                            →
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </RevealGroup>
                </div>
            </section>

            {/* About */}
            <section id="about" className="px-6 py-28 bg-white">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        {/* LEFT SIDE */}
                        <div>
                            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600 mb-4">
                                IFLEBOOK
                            </p>

                            <SplitHeadline
                                as="h2"
                                className="text-4xl md:text-5xl font-bold tracking-tighter text-slate-900"
                            >
                                About Us
                            </SplitHeadline>

                            <RevealGroup start="top 85%">
                                <p className="text-base md:text-lg text-slate-500 leading-relaxed mt-5 max-w-xl">
                                    iFLEbook is dedicated to making quality
                                    educational resources accessible to every
                                    student. Our mission is to empower learners
                                    by providing free, easy access to digital
                                    books through innovative campaigns and
                                    partnerships.
                                </p>
                            </RevealGroup>
                        </div>

                        {/* RIGHT SIDE - SaaS STYLE GRAPHICS */}
                        <div className="relative flex justify-center lg:justify-end">
                            {/* background glow */}
                            <div className="absolute -inset-10 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.12),transparent_60%)] blur-2xl" />

                            {/* main floating card */}
                            <RevealGroup
                                className="relative w-full max-w-md"
                                stagger={150}
                                start="top 80%"
                            >
                                {/* top card */}
                                <div className="rounded-3xl border border-slate-100 bg-white shadow-lg p-6 mb-6">
                                    <div className="flex items-center justify-between">
                                        <div className="text-sm text-slate-500">
                                            Active Students
                                        </div>
                                        <div className="text-blue-600 font-semibold">
                                            +24%
                                        </div>
                                    </div>

                                    <div className="mt-4 text-3xl font-bold text-slate-900">
                                        10,482
                                    </div>

                                    <div className="mt-3 h-2 bg-slate-100 rounded-full overflow-hidden">
                                        <div className="h-full w-[70%] bg-blue-500 rounded-full" />
                                    </div>
                                </div>

                                {/* middle floating card */}
                                <div className="rounded-3xl border border-slate-100 bg-white shadow-md p-6 ml-10 mb-6">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
                                            📚
                                        </div>
                                        <div>
                                            <div className="text-sm font-semibold text-slate-900">
                                                Ebook Library
                                            </div>
                                            <div className="text-xs text-slate-500">
                                                Updated daily
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* bottom card */}
                                <div className="rounded-3xl border border-slate-100 bg-white shadow-lg p-6 ml-6">
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <div className="text-sm text-slate-500">
                                                Downloads
                                            </div>
                                            <div className="text-2xl font-bold text-slate-900 mt-1">
                                                1.2k/day
                                            </div>
                                        </div>

                                        {/* mini chart */}
                                        <div className="flex items-end gap-1 h-10">
                                            {[40, 60, 30, 80, 55, 90].map(
                                                (h, i) => (
                                                    <div
                                                        key={i}
                                                        className="w-1.5 bg-blue-400 rounded-full"
                                                        style={{
                                                            height: `${h}%`,
                                                        }}
                                                    />
                                                ),
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </RevealGroup>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
