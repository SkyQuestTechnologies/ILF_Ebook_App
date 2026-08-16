# PDF Upload (R2) — Setup Runbook

The code adds author PDF upload, R2 storage, and real downloads. Two things
must be done in your Cloudflare account (I can't do these from here):

## 1. Create the R2 bucket

```bash
npx wrangler r2 bucket create ilf-ebook-files
```

## 2. The wrangler.jsonc binding is already added by the patch:

```jsonc
"r2_buckets": [
  { "binding": "BOOK_FILES", "bucket_name": "ilf-ebook-files" }
]
```

## 3. Regenerate types + apply (local dev uses a local R2 simulation automatically)

```bash
npm run cf-typegen
npm run build:cf && npm run preview
```

Local preview simulates R2 on disk under .wrangler/ — no bucket needed for local
testing. The real bucket (step 1) is only needed for deploy.

## What the feature does
- Author create/edit form gets a PDF file input.
- On save, the file uploads to /api/author/books/upload, stored in R2 under
  `books/<bookId>.pdf`, and the object key saved to books.pdf_key.
- /download/<slug> streams the real PDF from R2 (replaces the fake blank PDF).
- Free books: download works after reader login (unchanged gate).
- A book with no uploaded PDF shows "No file yet" and can't be downloaded.
