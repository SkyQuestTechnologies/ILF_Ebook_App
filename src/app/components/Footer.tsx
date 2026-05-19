export default function Footer() {
    return (
        <footer className="w-full border-t border-slate-100 bg-white">
            <div className="mx-auto max-w-7xl px-6 py-16">
                {/* TOP SECTION */}
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-10">
                    {/* Brand */}
                    <div>
                        <h3 className="text-lg font-semibold text-slate-900">
                            iFLEbook
                        </h3>
                        <p className="mt-2 text-sm text-slate-500 max-w-sm">
                            Free digital learning platform empowering students
                            through accessible educational ebooks.
                        </p>
                    </div>

                    {/* Links */}
                    <div className="grid grid-cols-2 gap-10 text-sm">
                        <div className="space-y-3">
                            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                                Legal
                            </p>
                            <a
                                href="#"
                                className="block text-slate-600 hover:text-blue-600 transition"
                            >
                                Privacy Policy
                            </a>
                            <a
                                href="#"
                                className="block text-slate-600 hover:text-blue-600 transition"
                            >
                                Terms of Service
                            </a>
                        </div>

                        <div className="space-y-3">
                            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                                Support
                            </p>
                            <a
                                href="#"
                                className="block text-slate-600 hover:text-blue-600 transition"
                            >
                                Contact
                            </a>
                            <a
                                href="#"
                                className="block text-slate-600 hover:text-blue-600 transition"
                            >
                                Help Center
                            </a>
                        </div>
                    </div>
                </div>

                {/* DIVIDER */}
                <div className="my-10 h-px w-full bg-slate-100" />

                {/* BOTTOM ROW */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-sm text-slate-500">
                        © {new Date().getFullYear()} iFLEbook. All rights
                        reserved.
                    </p>

                    <div className="flex items-center gap-4 text-sm text-slate-500">
                        <span className="hover:text-blue-600 transition cursor-pointer">
                            Twitter
                        </span>
                        <span className="hover:text-blue-600 transition cursor-pointer">
                            GitHub
                        </span>
                        <span className="hover:text-blue-600 transition cursor-pointer">
                            LinkedIn
                        </span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
