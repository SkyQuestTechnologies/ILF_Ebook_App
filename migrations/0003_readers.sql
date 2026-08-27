-- Migration 0003: readers
-- Reader accounts (people who download books). Mirrors authors, kept separate
-- so reader and author identities never collide.
-- Applied with: wrangler d1 migrations apply ilf_ebook_db

CREATE TABLE IF NOT EXISTS readers (
  id            TEXT PRIMARY KEY,           -- uuid
  email         TEXT NOT NULL UNIQUE,
  display_name  TEXT NOT NULL,
  password_hash TEXT NOT NULL,              -- PBKDF2 (salt:hash), see lib/password.ts
  created_at    INTEGER NOT NULL            -- epoch ms
);
