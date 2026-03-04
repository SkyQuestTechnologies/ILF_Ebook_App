
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-center">
        {/* Hero Section */}
        <section className="w-full min-h-[70vh] flex items-center justify-center py-16 px-4 bg-gradient-to-br from-blue-50 via-white to-blue-100 relative overflow-hidden">
          <div className="relative z-10 w-full flex flex-col items-center justify-center max-w-3xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
              Unlock Free<br />Ebooks for Students
            </h1>
            <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
              Empower your learning journey with exclusive access to digital books.<br />Claim your free ebook in seconds.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-2">
              <Link
                href="/login?next=/claim/school-visit"
                className="px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition shadow text-lg"
              >
                Claim ebook
              </Link>
              <a
                href="#how-it-works"
                className="px-8 py-4 bg-white border border-blue-600 text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition text-lg"
              >
                How it works
              </a>
            </div>
          </div>
          {/* Decorative shapes */}
          <div className="absolute -top-16 -left-16 w-64 h-64 bg-blue-100 rounded-full opacity-40 blur-2xl z-0" />
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-blue-200 rounded-full opacity-30 blur-3xl z-0" />
        </section>

        {/* Try the Demo Section */}
        <section className="w-full flex justify-center py-12 px-4 bg-transparent">
          <div className="bg-white shadow-lg rounded-xl p-8 max-w-sm w-full text-center">
            <h2 className="text-2xl font-bold mb-2">Try the Demo</h2>
            <p className="text-gray-600 mb-4">Exclusive access for students</p>
            <p className="text-xs text-gray-400 mb-6">Campaign: school-visit</p>
            <Link
              href="/login?next=/claim/school-visit"
              className="inline-block w-full px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Continue
            </Link>
          </div>
        </section>

        {/* How it works anchor */}
        <div id="how-it-works" className="h-24" />
      </main>
      <Footer />
    </div>
  );
}
