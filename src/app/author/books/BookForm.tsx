"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export type BookFormValues = {
  id?: string;
  title: string;
  description: string;
  category: string;
  free: boolean;
  price: number;
  featured: boolean;
  status: "draft" | "published";
};

const EMPTY: BookFormValues = {
  title: "",
  description: "",
  category: "",
  free: true,
  price: 0,
  featured: false,
  status: "draft",
};

export default function BookForm({
  initial,
  mode,
}: {
  initial?: BookFormValues;
  mode: "create" | "edit";
}) {
  const router = useRouter();
  const [values, setValues] = useState<BookFormValues>(initial ?? EMPTY);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [pdfFile, setPdfFile] = useState<File | null>(null);

  function set<K extends keyof BookFormValues>(key: K, val: BookFormValues[K]) {
    setValues((v) => ({ ...v, [key]: val }));
  }

  async function handleSave() {
    setError("");
    setSaving(true);
    try {
      const url =
        mode === "create"
          ? "/api/author/books"
          : `/api/author/books/${values.id}`;
      const method = mode === "create" ? "POST" : "PATCH";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: values.title,
          description: values.description,
          category: values.category,
          free: values.free,
          price: values.free ? 0 : values.price,
          featured: values.featured,
          status: values.status,
        }),
      });
      const data = (await res.json()) as { ok?: boolean; slug?: string; id?: string; error?: string };
      if (!res.ok || !data.ok) {
        setError(data.error || "Save failed.");
        setSaving(false);
        return;
      }

      // If a PDF was selected, upload it now that we have a book id.
      const bookId = mode === "create" ? data.id : values.id;
      if (pdfFile && bookId) {
        const fd = new FormData();
        fd.append("bookId", bookId);
        fd.append("file", pdfFile);
        const up = await fetch("/api/author/books/upload", { method: "POST", body: fd });
        const upData = (await up.json()) as { ok?: boolean; error?: string };
        if (!up.ok || !upData.ok) {
          setError(upData.error || "Book saved, but file upload failed. Edit the book to retry.");
          setSaving(false);
          return;
        }
      }

      router.push("/author/dashboard");
      router.refresh();
    } catch {
      setError("Network error. Try again.");
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!values.id) return;
    if (!confirm(`Delete "${values.title}"? This cannot be undone.`)) return;
    setError("");
    setDeleting(true);
    try {
      const res = await fetch(`/api/author/books/${values.id}`, { method: "DELETE" });
      const data = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok || !data.ok) {
        setError(data.error || "Delete failed.");
        setDeleting(false);
        return;
      }
      router.push("/author/dashboard");
      router.refresh();
    } catch {
      setError("Network error. Try again.");
      setDeleting(false);
    }
  }

  const inputCls =
    "w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500";

  return (
    <div className="space-y-5">
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Title</label>
        <input
          type="text"
          value={values.title}
          onChange={(e) => set("title", e.target.value)}
          className={inputCls}
          placeholder="The Great Novel"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
        <textarea
          value={values.description}
          onChange={(e) => set("description", e.target.value)}
          rows={4}
          className={inputCls}
          placeholder="What is this book about?"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Category</label>
          <input
            type="text"
            value={values.category}
            onChange={(e) => set("category", e.target.value)}
            className={inputCls}
            placeholder="Fiction"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
          <select
            value={values.status}
            onChange={(e) => set("status", e.target.value as "draft" | "published")}
            className={inputCls}
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <label className="flex items-center gap-2 text-sm text-slate-700">
          <input
            type="checkbox"
            checked={values.free}
            onChange={(e) => set("free", e.target.checked)}
            className="h-4 w-4 rounded border-slate-300"
          />
          Free
        </label>

        {!values.free && (
          <div className="flex items-center gap-2">
            <span className="text-sm text-slate-500">$</span>
            <input
              type="number"
              min="0"
              step="0.01"
              value={values.price}
              onChange={(e) => set("price", Number(e.target.value))}
              className="w-28 rounded-lg border border-slate-300 px-3 py-2 text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
        )}

        <label className="flex items-center gap-2 text-sm text-slate-700">
          <input
            type="checkbox"
            checked={values.featured}
            onChange={(e) => set("featured", e.target.checked)}
            className="h-4 w-4 rounded border-slate-300"
          />
          Featured
        </label>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">
          Book PDF {mode === "edit" && <span className="text-slate-400">(upload to replace)</span>}
        </label>
        <input
          type="file"
          accept="application/pdf"
          onChange={(e) => setPdfFile(e.target.files?.[0] ?? null)}
          className="block w-full text-sm text-slate-600 file:mr-3 file:rounded-lg file:border-0 file:bg-blue-50 file:px-3 file:py-2 file:text-sm file:font-semibold file:text-blue-700 hover:file:bg-blue-100"
        />
        <p className="mt-1 text-xs text-slate-400">PDF only, up to 50 MB.</p>
      </div>

      {error && (
        <p className="rounded-lg bg-rose-50 px-3 py-2 text-sm text-rose-700">{error}</p>
      )}

      <div className="flex items-center justify-between pt-2">
        <div className="flex gap-3">
          <button
            type="button"
            onClick={handleSave}
            disabled={saving || deleting}
            className="rounded-lg bg-blue-600 px-5 py-2.5 font-semibold text-white transition-colors hover:bg-blue-700 disabled:opacity-60"
          >
            {saving ? "Saving…" : mode === "create" ? "Create book" : "Save changes"}
          </button>
          <Link
            href="/author/dashboard"
            className="rounded-lg border border-slate-300 px-5 py-2.5 font-medium text-slate-600 transition-colors hover:bg-slate-100"
          >
            Cancel
          </Link>
        </div>

        {mode === "edit" && (
          <button
            type="button"
            onClick={handleDelete}
            disabled={saving || deleting}
            className="rounded-lg border border-rose-300 px-4 py-2.5 text-sm font-medium text-rose-600 transition-colors hover:bg-rose-50 disabled:opacity-60"
          >
            {deleting ? "Deleting…" : "Delete"}
          </button>
        )}
      </div>
    </div>
  );
}
