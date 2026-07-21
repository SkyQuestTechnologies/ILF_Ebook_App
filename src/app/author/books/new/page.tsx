import { redirect } from "next/navigation";
import Link from "next/link";
import { getAuthor } from "@/lib/require-author";
import BookForm from "../BookForm";


export default async function NewBookPage() {
  const author = await getAuthor();
  if (!author) redirect("/author/login");

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-2xl px-6 py-4">
          <Link href="/author/dashboard" className="text-sm text-slate-500 hover:text-slate-700">
            ← Dashboard
          </Link>
          <h1 className="mt-1 text-xl font-bold tracking-tight text-slate-900">New book</h1>
        </div>
      </header>
      <main className="mx-auto max-w-2xl px-6 py-10">
        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <BookForm mode="create" />
        </div>
      </main>
    </div>
  );
}
