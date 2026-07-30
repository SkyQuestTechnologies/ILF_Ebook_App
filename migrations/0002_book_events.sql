-- Migration 0002: book_events
-- One row per view / sale / download. Aggregated for author KPIs and,
-- later, per-book and time-ranged analytics.
-- Applied with: wrangler d1 migrations apply ilf_ebook_db

CREATE TABLE IF NOT EXISTS book_events (
  id          TEXT PRIMARY KEY,           -- uuid
  book_id     TEXT NOT NULL,
  author_id   TEXT NOT NULL,              -- denormalized for fast per-author rollups
  event_type  TEXT NOT NULL,              -- 'view' | 'sale' | 'download'
  amount      REAL NOT NULL DEFAULT 0,    -- sale price at time of event; 0 for view/download
  created_at  INTEGER NOT NULL,           -- epoch ms
  FOREIGN KEY (book_id)   REFERENCES books(id)   ON DELETE CASCADE,
  FOREIGN KEY (author_id) REFERENCES authors(id) ON DELETE CASCADE
);

-- Author rollups: WHERE author_id = ? GROUP BY event_type
CREATE INDEX IF NOT EXISTS idx_events_author ON book_events(author_id, event_type);
-- Per-book rollups and time ranges
CREATE INDEX IF NOT EXISTS idx_events_book ON book_events(book_id, event_type);
CREATE INDEX IF NOT EXISTS idx_events_created ON book_events(created_at);
