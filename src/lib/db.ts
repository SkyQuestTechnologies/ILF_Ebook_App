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

export function getDB(): D1Database {
  const { env } = getCloudflareContext();
  const db = (env as { DB?: D1Database }).DB;
  if (!db) throw new Error("D1 binding 'DB' is not configured. Add it to wrangler.jsonc.");
  return db;
}

export async function getAuthorByEmail(email: string): Promise<AuthorRow | null> {
  const db = getDB();
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
  const db = getDB();
  await db
    .prepare(
      "INSERT INTO authors (id, email, display_name, password_hash, created_at) VALUES (?1, ?2, ?3, ?4, ?5)"
    )
    .bind(a.id, a.email, a.display_name, a.password_hash, a.created_at)
    .run();
}

export async function listBooksByAuthor(authorId: string): Promise<BookRow[]> {
  const db = getDB();
  const res = await db
    .prepare("SELECT * FROM books WHERE author_id = ?1 ORDER BY updated_at DESC")
    .bind(authorId)
    .all<BookRow>();
  return res.results ?? [];
}
