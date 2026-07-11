// lib/book-input.ts
// Slug generation + request-body validation shared by the book API routes.

import type { BookInput } from "@/lib/db";

export function slugify(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

export type ParseResult =
  | { ok: true; value: BookInput }
  | { ok: false; error: string };

export function parseBookInput(body: unknown): ParseResult {
  if (!body || typeof body !== "object") {
    return { ok: false, error: "Invalid request body." };
  }
  const b = body as Record<string, unknown>;

  const title = typeof b.title === "string" ? b.title.trim() : "";
  if (!title) return { ok: false, error: "Title is required." };
  if (title.length > 200) return { ok: false, error: "Title too long (max 200)." };

  const description = typeof b.description === "string" ? b.description.trim() : "";
  const category =
    typeof b.category === "string" && b.category.trim()
      ? b.category.trim()
      : "Uncategorized";

  const free = b.free === true || b.free === "true";
  const featured = b.featured === true || b.featured === "true";

  let price = 0;
  if (!free) {
    const raw = typeof b.price === "number" ? b.price : Number(b.price);
    if (Number.isNaN(raw) || raw < 0) {
      return { ok: false, error: "Price must be a non-negative number." };
    }
    price = Math.round(raw * 100) / 100;
  }

  const status = b.status === "published" ? "published" : "draft";

  return {
    ok: true,
    value: { title, description, category, free, price, featured, status },
  };
}
