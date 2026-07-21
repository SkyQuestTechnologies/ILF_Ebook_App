INSERT OR IGNORE INTO authors (id, email, display_name, password_hash, created_at)
VALUES ('dev-author-0000', 'dev@local.test', 'Dev Author', 'x', 0);

INSERT OR IGNORE INTO books
  (id, author_id, slug, title, description, category, free, price, featured, status, created_at, updated_at)
VALUES
  ('dev-book-0001', 'dev-author-0000', 'sample-book', 'Sample Book', 'A seeded book.', 'Fiction', 1, 0, 1, 'published', 0, 0),
  ('dev-book-0002', 'dev-author-0000', 'draft-guide', 'Draft Writing Guide', 'A draft title.', 'Non-fiction', 0, 9.99, 0, 'draft', 0, 0);
