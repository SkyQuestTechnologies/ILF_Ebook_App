# 0001 — Persistence: Cloudflare D1

Status: Accepted

## Context
The author platform needs persistence for authors, books, and (later) sales.
The app is edge-runtime Next.js on Cloudflare Workers via OpenNext, which rules
out `fs` and most Node ORMs.

## Decision
Use Cloudflare D1 (SQLite) as the primary datastore, accessed via the `DB`
Worker binding.

## Rationale
- Native to the committed runtime; no external service, no connection pooling.
- Relational model fits authors → books → sales with foreign keys.
- Aligns with HARD_RULES: minimal services, low operational overhead, secure defaults.

## Alternatives considered
- Supabase (Postgres): adds the only off-Worker dependency; better if we outgrow
  D1 limits or want RLS/realtime. Migration path is Postgres-flavored SQL.
- Cloudflare KV: key-value only; cannot express relational queries without
  hand-rolled indexes. Rejected.

## Consequences
- Cloudflare-proprietary; lower write throughput than Postgres (not a constraint
  at current scale).
- Schema lives in `migrations/`, applied via `wrangler d1 migrations apply`.
