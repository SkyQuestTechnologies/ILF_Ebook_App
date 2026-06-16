import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-black/5 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="flex flex-col justify-between gap-8 md:flex-row">
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white font-bold">
                ILF
              </span>
              <span className="font-semibold tracking-tight text-gray-900">
                iLFEbook
              </span>
            </div>
            <p className="mt-3 max-w-sm text-sm text-gray-600">
              Scan a QR code, create an account, and access free ebooks—plus optional
              paid titles from featured authors.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 text-sm md:grid-cols-3">
            <div className="space-y-2">
              <p className="font-semibold text-gray-900">Product</p>
              <Link className="block text-gray-600 hover:text-gray-900" href="/#how-it-works">
                How it works
              </Link>
              <Link className="block text-gray-600 hover:text-gray-900" href="/#featured">
                Featured
              </Link>
            </div>

            <div className="space-y-2">
              <p className="font-semibold text-gray-900">Company</p>
              <Link className="block text-gray-600 hover:text-gray-900" href="/#about">
                About
              </Link>
              <a className="block text-gray-600 hover:text-gray-900" href="#">
                Contact
              </a>
            </div>

            <div className="space-y-2">
              <p className="font-semibold text-gray-900">Legal</p>
              <a className="block text-gray-600 hover:text-gray-900" href="#">
                Privacy
              </a>
              <a className="block text-gray-600 hover:text-gray-900" href="#">
                Terms
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-black/5 pt-6 text-xs text-gray-500 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} iFLEbook. All rights reserved.</p>
          <p>Built for demo & early-stage validation.</p>
        </div>
      </div>
    </footer>
  );
}