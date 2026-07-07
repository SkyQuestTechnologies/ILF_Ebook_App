-- Migration 0001: authors + books
-- D1 (SQLite). Applied with: wrangler d1 migrations apply ilf_ebook_db

CREATE TABLE IF NOT EXISTS authors (
  id            TEXT PRIMARY KEY,           -- uuid
  email         TEXT NOT NULL UNIQUE,
  display_name  TEXT NOT NULL,
  password_hash TEXT NOT NULL,              -- PBKDF2 (salt:hash), see lib/password.ts
  created_at    INTEGER NOT NULL            -- epoch ms
);

CREATE TABLE IF NOT EXISTS books (
  id          TEXT PRIMARY KEY,            -- uuid
  author_id   TEXT NOT NULL,
  slug        TEXT NOT NULL UNIQUE,
  title       TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  category    TEXT NOT NULL DEFAULT 'Uncategorized',
  free        INTEGER NOT NULL DEFAULT 1,  -- 0/1
  price       REAL NOT NULL DEFAULT 0,
  featured    INTEGER NOT NULL DEFAULT 0,  -- 0/1
  pdf_key     TEXT,                        -- R2 object key (null until uploaded)
  status      TEXT NOT NULL DEFAULT 'draft', -- draft | published
  created_at  INTEGER NOT NULL,
  updated_at  INTEGER NOT NULL,
  FOREIGN KEY (author_id) REFERENCES authors(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_books_author ON books(author_id);
CREATE INDEX IF NOT EXISTS idx_books_status ON books(status);
