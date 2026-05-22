# Technical Documentation — `src/app/paywall/[slug]/page.tsx`

---

## Root Cause

The original paywall page used a narrow centered modal card (`max-w-md`, `flex items-center justify-center`) with no visual hierarchy — unsuitable for a premium e-commerce product page. The page had no `<Navbar />` or `<Footer />`, leaving it isolated from the rest of the site shell. It was redesigned to match a two-column e-commerce product layout (reference: standard book/product detail page pattern used by platforms such as Amazon, Gumroad, and Lemon Squeezy).

---

## File Modified

`src/app/paywall/[slug]/page.tsx`

No component files were changed. The `await params` resolution, `books.find` logic, and all three `<PaywallActions />` props (`slug`, `title`, `price`) are untouched.

---

## What Was Changed

### Imports Added
- `Navbar` from `@/app/components/Navbar`
- `Footer` from `@/app/components/Footer`

### Page Shell
- Removed: `min-h-screen flex flex-col items-center justify-center bg-neutral-50 px-4`.
- Replaced with: `<Navbar />` → `<main className="bg-white min-h-screen">` → `<Footer />` wrapper.
- Outer content container: `max-w-6xl mx-auto px-6 py-24`.
- Inner card: `bg-white rounded-3xl shadow-xl shadow-slate-200/50 p-8 md:p-12`.

### Two-Column Grid
- `grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16` inside the card.
- Stacks to single column on mobile.

### Left Column — Visual
- `bg-slate-50 rounded-2xl flex items-center justify-center p-12` background panel.
- Book cover: `aspect-[3/4] w-full max-w-[240px] relative` container.
  - Spine: `absolute left-0 top-0 bottom-0 w-4 bg-indigo-800 rounded-l-md z-10`.
  - Cover face: `absolute left-4 top-0 right-0 bottom-0 bg-gradient-to-br from-blue-400 to-indigo-600 rounded-r-2xl shadow-2xl` with two skeleton lines (`bg-white/30`, `bg-white/20`) and the book title as `text-white/80 text-xs`.

### Right Column — Details
| Element | Classes |
|---|---|
| Category eyebrow | `text-xs font-semibold tracking-widest text-blue-500 uppercase` |
| Title (`<h1>`) | `text-4xl font-bold tracking-tight text-slate-900` |
| Author | `text-sm uppercase tracking-wider text-slate-500` |
| Sale price | `text-3xl font-bold text-blue-600` |
| Original price | `text-lg text-slate-400 line-through` (computed as `price × 1.5`) |
| Description label | `font-semibold text-slate-900` |
| Description body | `text-slate-600 leading-relaxed text-sm` |

### Checkout Box
- Container: `border border-slate-200 rounded-xl p-6 bg-slate-50/50`.
- "Digital Download — Instant Access" label with a checkmark SVG (`w-4 h-4 text-blue-600`) displayed above `<PaywallActions />`.
- `<PaywallActions slug={book.slug} title={book.title} price={book.price} />` — props unchanged.

---

## Testing

1. Navigate to `/paywall/[any-premium-slug]` (any book where `free: false`).
2. Verify the two-column layout renders correctly at `lg` breakpoint and collapses to single column on mobile.
3. Confirm `<Navbar />` and `<Footer />` render without errors.
4. Confirm `<PaywallActions />` checkout flow (payment/unlock) still works end-to-end.
5. Navigate to a free book's slug or a nonexistent slug — confirm `notFound()` still fires (returns a 404 page).

---

## Limitations

- `originalPrice` is a display-only value computed as `book.price × 1.5` — it is not stored in the data model. If the client requires accurate original prices, add an `originalPrice` field to the book entries in `src/lib/books.ts`.
- The book cover is a gradient placeholder with decorative skeleton lines. Replace with a real `<Image>` element (and correct `width`/`height` props for Next.js image optimisation) when cover assets are available.
- The page background was set to `bg-white` (linter adjusted from `bg-slate-50`) — update if a different page background is preferred.
