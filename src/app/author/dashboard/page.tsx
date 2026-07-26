import { redirect } from "next/navigation";
import Link from "next/link";
import { getAuthor } from "@/lib/require-author";
import { listBooksByAuthor, type BookRow } from "@/lib/db";
import AuthorLogoutButton from "./LogoutButton";

export default async function AuthorDashboardPage() {
  const claims = await getAuthor();
  if (!claims) redirect("/author/login");

  let books: BookRow[] = [];
  let loadError = false;
  try {
    books = await listBooksByAuthor(claims.sub);
  } catch {
    loadError = true;
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-2.5">
          <Link href="/" className="flex items-center gap-2">
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-blue-600 text-white text-xs font-bold">ILF</span>
            <span className="text-sm font-semibold tracking-tight text-slate-900">iLFEbook</span>
          </Link>
          <Link href="/" className="text-sm text-slate-500 hover:text-slate-900 transition-colors">Home</Link>
        </div>
      </div>
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <div>
            <h1 className="text-xl font-bold tracking-tight text-slate-900">Author Dashboard</h1>
            <p className="text-sm text-slate-500">{claims.name} · {claims.email}</p>
          </div>
          <AuthorLogoutButton />
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-6 py-10">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-900">Your books</h2>
          <Link href="/author/books/new" className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">+ New book</Link>
        </div>
        {loadError ? (
          <div className="rounded-xl border border-amber-200 bg-amber-50 p-6 text-amber-800">Could not load books.</div>
        ) : books.length === 0 ? (
          <div className="rounded-xl border border-dashed border-slate-300 bg-white p-12 text-center">
            <p className="text-slate-500">No books yet.</p>
            <Link href="/author/books/new" className="mt-4 inline-block rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">Create your first book</Link>
          </div>
        ) : (
          <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-slate-200 bg-slate-50 text-slate-500">
                <tr><th className="px-4 py-3 font-medium">Title</th><th className="px-4 py-3 font-medium">Category</th><th className="px-4 py-3 font-medium">Price</th><th className="px-4 py-3 font-medium">Status</th></tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {books.map((b) => (
                  <tr key={b.id} className="hover:bg-slate-50">
                    <td className="px-4 py-3"><Link href={`/author/books/${b.slug}`} className="font-medium text-slate-900 hover:text-blue-600">{b.title}</Link></td>
                    <td className="px-4 py-3 text-slate-600">{b.category}</td>
                    <td className="px-4 py-3 text-slate-600">{b.free ? "Free" : `$${b.price.toFixed(2)}`}</td>
                    <td className="px-4 py-3"><span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${b.status === "published" ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-600"}`}>{b.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}
