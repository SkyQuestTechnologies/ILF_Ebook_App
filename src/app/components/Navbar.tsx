import Link from "next/link";

export default function Navbar({ loggedIn }: { loggedIn?: boolean } = {}) {
  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white shadow-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/" className="flex items-center gap-2">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white font-bold">
            ILF
          </span>
          <span className="font-semibold tracking-tight text-gray-900">
            iFLEbook
          </span>
        </Link>

        <nav className="hidden items-center gap-6 text-sm text-gray-600 md:flex">
          <Link href="/#how-it-works" className="hover:text-blue-700">
            How it works
          </Link>
          <Link href="/#featured" className="hover:text-blue-700">
            Featured
          </Link>
          <Link href="/#about" className="hover:text-blue-700">
            About
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          {loggedIn ? (
            <>
              <span className="rounded-full bg-gray-100 px-3 py-1 text-sm font-semibold text-gray-700">Profile</span>
              <button className="rounded-xl border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-100">Sign out</button>
            </>
          ) : (
            <>
              <Link
                href="/claim/school-visit"
                className="rounded-xl border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-50"
              >
                Claim demo
              </Link>
              <Link
                href="/"
                className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
              >
                Partner with us
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}