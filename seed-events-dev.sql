-- Local dev seed for book_events, so the dashboard KPI cards show real numbers.
-- Local D1 only. Depends on seed-dev.sql having been run first (needs the books).
-- Sample: 5 views, 2 sales, 3 downloads for the dev author.

INSERT OR IGNORE INTO book_events (id, book_id, author_id, event_type, amount, created_at) VALUES
  ('ev-0001', 'dev-book-0001', 'dev-author-0000', 'view', 0, 1),
  ('ev-0002', 'dev-book-0001', 'dev-author-0000', 'view', 0, 2),
  ('ev-0003', 'dev-book-0001', 'dev-author-0000', 'view', 0, 3),
  ('ev-0004', 'dev-book-0002', 'dev-author-0000', 'view', 0, 4),
  ('ev-0005', 'dev-book-0002', 'dev-author-0000', 'view', 0, 5),
  ('ev-0006', 'dev-book-0002', 'dev-author-0000', 'sale', 9.99, 6),
  ('ev-0007', 'dev-book-0002', 'dev-author-0000', 'sale', 9.99, 7),
  ('ev-0008', 'dev-book-0001', 'dev-author-0000', 'download', 0, 8),
  ('ev-0009', 'dev-book-0001', 'dev-author-0000', 'download', 0, 9),
  ('ev-0010', 'dev-book-0002', 'dev-author-0000', 'download', 0, 10);
