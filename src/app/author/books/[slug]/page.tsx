import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import { getAuthor } from "@/lib/require-author";
import { getBookBySlug } from "@/lib/db";
import BookForm, { type BookFormValues } from "../BookForm";


export default async function EditBookPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const author = await getAuthor();
  if (!author) redirect("/author/login");

  const { slug } = await params;
  const book = await getBookBySlug(slug);

  // Ownership: an author may only edit their own books.
  if (!book || book.author_id !== author.sub) {
    notFound();
  }

  const initial: BookFormValues = {
    id: book.id,
    title: book.title,
    description: book.description,
    category: book.category,
    free: book.free === 1,
    price: book.price,
    featured: book.featured === 1,
    status: book.status === "published" ? "published" : "draft",
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-2xl items-center justify-between px-6 py-2.5">
          <Link href="/" className="flex items-center gap-2">
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-blue-600 text-white text-xs font-bold">ILF</span>
            <span className="text-sm font-semibold tracking-tight text-slate-900">iLFEbook</span>
          </Link>
          <Link href="/" className="text-sm text-slate-500 hover:text-slate-900 transition-colors">Home</Link>
        </div>
      </div>
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-2xl px-6 py-4">
          <Link href="/author/dashboard" className="text-sm text-slate-500 hover:text-slate-700">
            ← Dashboard
          </Link>
          <h1 className="mt-1 text-xl font-bold tracking-tight text-slate-900">
            Edit book
          </h1>
        </div>
      </header>
      <main className="mx-auto max-w-2xl px-6 py-10">
        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <BookForm mode="edit" initial={initial} />
        </div>
      </main>
    </div>
  );
}
