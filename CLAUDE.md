# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # Start Next.js dev server on localhost:3000
npm run build        # Build for production
npm run build:cf     # Build with OpenNext for Cloudflare Workers
npm run deploy       # Build + deploy to Cloudflare Workers
npm run preview      # Local preview of Cloudflare build
npm run lint         # Run ESLint (Next.js core-web-vitals + TypeScript)
npm run cf-typegen   # Regenerate cloudflare-env.d.ts from wrangler.jsonc
```

No test suite is configured. Node.js >=20 <21 required (see `.nvmrc`).

## Architecture

**Next.js 16 App Router ebook platform deployed to Cloudflare Workers via OpenNext.**

### Edge Runtime Constraint

All API routes use `export const runtime = "edge"`. This means **no Node.js APIs** — no `fs`, no `crypto` module. All crypto uses the browser-compatible `SubtleCrypto` API (e.g., `crypto.subtle.sign`). Keep this constraint in mind when adding any server-side logic.

### Authentication Flow

JWT-based sessions stored in an `ilf_session` HTTP-only cookie.

- `src/lib/session.ts` — core JWT utilities (`createSessionToken`, `verifySessionToken`, `cookieSerialize`)
- `src/app/api/auth/login/route.ts` — accepts email, creates JWT, sets cookie
- `src/app/api/auth/logout/route.ts` — clears cookie
- `src/app/api/session/route.ts` — verifies session for client-side checks
- `src/components/AuthGate.tsx` — client-side auth guard (localStorage fallback)

JWT payload: `{ sub, email, unlocked[], iat, exp }`. Secret key comes from `ILF_SESSION_SECRET` env var.

### Book Data & Download Flow

Books are **hardcoded** in `src/app/library/page.tsx` (30 demo books — no database). Each book has a `slug`, `free`/`premium` flag, and metadata.

Download path: `/download/[slug]` validates the JWT cookie then serves the PDF from `/public/ebooks/`. Demo builds return a hardcoded mini PDF.

User journey:
```
Login → /library → /paywall/[slug] (premium) → /unlocked/[slug] → AutoDownload
                 → /download/[slug] directly (free)
```

`src/components/AutoDownload.tsx` triggers the download route after a 100ms delay on the unlocked page.

### Routing

| Route | Purpose |
|---|---|
| `/` | Homepage (hero + how-it-works) |
| `/library` | Book catalog |
| `/login` | Email login form |
| `/paywall/[slug]` | Premium book paywall |
| `/unlocked/[slug]` | Post-purchase success + auto-download |
| `/claim/[slug]` | Campaign/promo link handler |
| `/checkout/[slug]` | Checkout flow |
| `/download/[slug]` | Protected PDF download (API-style route handler) |

### Cloudflare Deployment

- `wrangler.jsonc` — Workers config
- `open-next.config.ts` — OpenNext/Cloudflare adapter (caching, R2 bindings)
- `cloudflare-env.d.ts` — generated Cloudflare env types (run `cf-typegen` after wrangler changes)
- Non-interactive deploy requires `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` env vars

### Environment Variables

See `.env.example`:
- `ILF_SESSION_SECRET` — JWT signing secret (required)
- `SESSION_SECRET` — fallback/alias

### Path Alias

`@/*` maps to `src/*` (configured in `tsconfig.json`).
