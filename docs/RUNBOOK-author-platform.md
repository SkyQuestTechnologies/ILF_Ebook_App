# Runbook — Author Platform (Slice 1)

## What shipped
Author accounts + login + dashboard listing the signed-in author's books.

- `migrations/0001_authors_books.sql` — `authors` + `books` tables
- `src/lib/password.ts` — PBKDF2 hashing (SubtleCrypto, edge-safe)
- `src/lib/author.ts` — author JWT (role="author", `ilf_author` cookie)
- `src/lib/db.ts` — D1 binding accessor + queries
- `src/app/api/author/login|logout` — auth routes
- `src/app/author/login` — login page (create-on-first-use)
- `src/app/author/dashboard` — gated dashboard

## One-time Cloudflare setup

1. Create the D1 database:
   ```bash
   npx wrangler d1 create ilf_ebook_db
   ```
2. Copy the returned `database_id` into `wrangler.jsonc`
   (replace `REPLACE_WITH_D1_DATABASE_ID`).
3. Apply migrations:
   ```bash
   # local (preview)
   npx wrangler d1 migrations apply ilf_ebook_db --local
   # remote (production)
   npx wrangler d1 migrations apply ilf_ebook_db --remote
   ```
4. Regenerate binding types:
   ```bash
   npm run cf-typegen
   ```
5. Ensure `ILF_SESSION_SECRET` is set (author tokens reuse it):
   ```bash
   npx wrangler secret put ILF_SESSION_SECRET
   ```

## Verify
- Visit `/author/login`, enter email + password (min 8 chars) + display name.
- First submit creates the account; you land on `/author/dashboard` (empty state).
- Re-login with the same email verifies against the stored PBKDF2 hash.

## Notes / open items (next slices)
- `create-on-first-use` login is a slice-1 convenience; split into explicit
  signup vs login before real use.
- Dashboard links to `/author/books/new` and `/author/books/[slug]` — not built yet.
- Sales table + R2 PDF upload deferred to later slices.
