
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-1 flex flex-col items-center">
        {/* Hero Section */}
        <section className="w-full min-h-[70vh] flex items-center justify-center py-16 px-4 bg-gradient-to-br from-blue-50 via-white to-blue-100 relative overflow-hidden">
          {/* Decorative Glow */}
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-200 rounded-full opacity-30 blur-3xl z-0" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-100 rounded-full opacity-40 blur-2xl z-0" />
          <div className="relative z-10 w-full flex flex-col items-center justify-center max-w-3xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6 leading-tight drop-shadow-sm">
              Unlock Free<br />Ebooks for Students
            </h1>
            <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
              Empower your learning journey with exclusive access to digital books.<br />Claim your free ebook in seconds.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-2">
              <Link
                href="/login?next=%2Fclaim%2Fschool-visit"
                className="px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition shadow text-lg"
              >
                Claim ebook
              </Link>
              <Link
                href="#how-it-works"
                className="px-8 py-4 bg-white border border-blue-600 text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition text-lg"
                scroll={true}
              >
                How it works
              </Link>
            </div>
          </div>
        </section>

        {/* How it works Section */}
        <section id="how-it-works" className="w-full py-20 px-4 bg-white flex justify-center">
          <div className="max-w-6xl w-full mx-auto flex flex-col items-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-gray-900 text-center">How it works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
              {/* Step 1 */}
              <div className="bg-blue-50 rounded-xl shadow p-6 flex flex-col items-center text-center">
                <div className="mb-4 text-4xl">📱</div>
                <h3 className="font-semibold text-lg mb-2">Scan QR</h3>
                <p className="text-gray-600">Find a QR code at your event or school and scan it to get started.</p>
              </div>
              {/* Step 2 */}
              <div className="bg-blue-50 rounded-xl shadow p-6 flex flex-col items-center text-center">
                <div className="mb-4 text-4xl">🔑</div>
                <h3 className="font-semibold text-lg mb-2">Sign in</h3>
                <p className="text-gray-600">Sign in quickly with Google, Microsoft, or email to verify your access.</p>
              </div>
              {/* Step 3 */}
              <div className="bg-blue-50 rounded-xl shadow p-6 flex flex-col items-center text-center">
                <div className="mb-4 text-4xl">⬇️</div>
                <h3 className="font-semibold text-lg mb-2">Download</h3>
                <p className="text-gray-600">Instantly download your free ebook and start reading right away.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Section */}
        <section id="featured" className="w-full py-20 px-4 bg-gradient-to-b from-white to-blue-50 flex justify-center">
          <div className="max-w-6xl w-full mx-auto flex flex-col items-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-gray-900 text-center">Featured</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
              {/* Book Card 1 */}
              <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center text-center">
                <div className="w-24 h-32 bg-blue-100 rounded mb-4" />
                <h3 className="font-semibold text-lg mb-2">Book Title 1</h3>
                <p className="text-gray-500">Author Name</p>
              </div>
              {/* Book Card 2 */}
              <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center text-center">
                <div className="w-24 h-32 bg-blue-100 rounded mb-4" />
                <h3 className="font-semibold text-lg mb-2">Book Title 2</h3>
                <p className="text-gray-500">Author Name</p>
              </div>
              {/* Book Card 3 */}
              <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center text-center">
                <div className="w-24 h-32 bg-blue-100 rounded mb-4" />
                <h3 className="font-semibold text-lg mb-2">Book Title 3</h3>
                <p className="text-gray-500">Author Name</p>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="w-full py-20 px-4 bg-white flex justify-center">
          <div className="max-w-6xl w-full mx-auto flex flex-col items-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 text-center">About</h2>
            <p className="text-lg text-gray-700 max-w-2xl text-center">
              iFLEbook is dedicated to making quality educational resources accessible to every student. Our mission is to empower learners by providing free, easy access to digital books through innovative campaigns and partnerships.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
