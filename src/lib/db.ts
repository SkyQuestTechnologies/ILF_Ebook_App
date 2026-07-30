// lib/db.ts
// Access the D1 binding (env.DB) from within the Cloudflare Workers runtime.
// OpenNext exposes bindings via @opennextjs/cloudflare's getCloudflareContext().

import { getCloudflareContext } from "@opennextjs/cloudflare";

export type AuthorRow = {
  id: string;
  email: string;
  display_name: string;
  password_hash: string;
  created_at: number;
};

export type BookRow = {
  id: string;
  author_id: string;
  slug: string;
  title: string;
  description: string;
  category: string;
  free: number;
  price: number;
  featured: number;
  pdf_key: string | null;
  status: string;
  created_at: number;
  updated_at: number;
};

export type AuthorKpis = {
  viewed: number;
  sold: number;
  downloaded: number;
};

export type BookEventType = "view" | "sale" | "download";

export async function getAuthorKpis(authorId: string): Promise<AuthorKpis> {
  const db = await getDB();
  const res = await db
    .prepare(
      `SELECT event_type, COUNT(*) AS n FROM book_events WHERE author_id = ?1 GROUP BY event_type`
    )
    .bind(authorId)
    .all<{ event_type: string; n: number }>();
  const counts: Record<string, number> = {};
  for (const row of res.results ?? []) counts[row.event_type] = row.n;
  return {
    viewed: counts["view"] ?? 0,
    sold: counts["sale"] ?? 0,
    downloaded: counts["download"] ?? 0,
  };
}

export async function recordBookEvent(
  bookId: string,
  authorId: string,
  eventType: BookEventType,
  amount = 0
): Promise<void> {
  const db = await getDB();
  await db
    .prepare(
      `INSERT INTO book_events (id, book_id, author_id, event_type, amount, created_at) VALUES (?1, ?2, ?3, ?4, ?5, ?6)`
    )
    .bind(crypto.randomUUID(), bookId, authorId, eventType, amount, Date.now())
    .run();
}

export async function getDB(): Promise<D1Database> {
  const { env } = await getCloudflareContext({ async: true });
  const db = (env as { DB?: D1Database }).DB;
  if (!db) throw new Error("D1 binding 'DB' is not configured. Add it to wrangler.jsonc.");
  return db;
}

export async function getAuthorByEmail(email: string): Promise<AuthorRow | null> {
  const db = await getDB();
  const row = await db
    .prepare("SELECT * FROM authors WHERE email = ?1")
    .bind(email)
    .first<AuthorRow>();
  return row ?? null;
}

export async function createAuthor(a: {
  id: string;
  email: string;
  display_name: string;
  password_hash: string;
  created_at: number;
}): Promise<void> {
  const db = await getDB();
  await db
    .prepare(
      "INSERT INTO authors (id, email, display_name, password_hash, created_at) VALUES (?1, ?2, ?3, ?4, ?5)"
    )
    .bind(a.id, a.email, a.display_name, a.password_hash, a.created_at)
    .run();
}

export async function listBooksByAuthor(authorId: string): Promise<BookRow[]> {
  const db = await getDB();
  const res = await db
    .prepare("SELECT * FROM books WHERE author_id = ?1 ORDER BY updated_at DESC")
    .bind(authorId)
    .all<BookRow>();
  return res.results ?? [];
}

export async function getBookBySlug(slug: string): Promise<BookRow | null> {
  const db = await getDB();
  const row = await db
    .prepare("SELECT * FROM books WHERE slug = ?1")
    .bind(slug)
    .first<BookRow>();
  return row ?? null;
}

export async function getBookById(id: string): Promise<BookRow | null> {
  const db = await getDB();
  const row = await db
    .prepare("SELECT * FROM books WHERE id = ?1")
    .bind(id)
    .first<BookRow>();
  return row ?? null;
}

export type BookInput = {
  title: string;
  description: string;
  category: string;
  free: boolean;
  price: number;
  featured: boolean;
  status: "draft" | "published";
};

export async function createBook(
  authorId: string,
  slug: string,
  input: BookInput
): Promise<string> {
  const db = await getDB();
  const id = crypto.randomUUID();
  const now = Date.now();
  await db
    .prepare(
      `INSERT INTO books
        (id, author_id, slug, title, description, category, free, price, featured, status, created_at, updated_at)
       VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9, ?10, ?11, ?12)`
    )
    .bind(
      id,
      authorId,
      slug,
      input.title,
      input.description,
      input.category,
      input.free ? 1 : 0,
      input.price,
      input.featured ? 1 : 0,
      input.status,
      now,
      now
    )
    .run();
  return id;
}

export async function updateBook(
  id: string,
  authorId: string,
  input: BookInput
): Promise<boolean> {
  const db = await getDB();
  const res = await db
    .prepare(
      `UPDATE books SET
        title = ?1, description = ?2, category = ?3, free = ?4,
        price = ?5, featured = ?6, status = ?7, updated_at = ?8
       WHERE id = ?9 AND author_id = ?10`
    )
    .bind(
      input.title,
      input.description,
      input.category,
      input.free ? 1 : 0,
      input.price,
      input.featured ? 1 : 0,
      input.status,
      Date.now(),
      id,
      authorId
    )
    .run();
  return (res.meta?.changes ?? 0) > 0;
}

export async function deleteBook(id: string, authorId: string): Promise<boolean> {
  const db = await getDB();
  const res = await db
    .prepare("DELETE FROM books WHERE id = ?1 AND author_id = ?2")
    .bind(id, authorId)
    .run();
  return (res.meta?.changes ?? 0) > 0;
}

export async function slugExists(slug: string): Promise<boolean> {
  const db = await getDB();
  const row = await db
    .prepare("SELECT 1 AS one FROM books WHERE slug = ?1")
    .bind(slug)
    .first<{ one: number }>();
  return !!row;
}

// A published book shaped for the public library, with the author's display name
// joined in. Drafts are excluded — only status = 'published' appears publicly.
export type PublicBook = {
  slug: string;
  title: string;
  author: string;
  description: string;
  category: string;
  free: boolean;
  featured: boolean;
  price: number;
};

export async function listPublishedBooks(): Promise<PublicBook[]> {
  const db = await getDB();
  const res = await db
    .prepare(
      `SELECT b.slug, b.title, b.description, b.category,
              b.free, b.featured, b.price,
              a.display_name AS author
         FROM books b
         JOIN authors a ON a.id = b.author_id
        WHERE b.status = 'published'
        ORDER BY b.updated_at DESC`
    )
    .all<{
      slug: string; title: string; description: string; category: string;
      free: number; featured: number; price: number; author: string;
    }>();
  return (res.results ?? []).map((r) => ({
    slug: r.slug, title: r.title, author: r.author, description: r.description,
    category: r.category, free: r.free === 1, featured: r.featured === 1, price: r.price,
  }));
}
