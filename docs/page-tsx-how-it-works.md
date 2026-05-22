# Technical Documentation — `src/app/page.tsx` (How It Works Section)

---

## Root Cause

The original "How it works" section used a basic three-column grid of bordered cards with filled blue circle step indicators. This pattern reads as generic/template UI rather than premium SaaS design. The section was redesigned in two iterations — first to a connected timeline layout, then to the final alternating zig-zag layout matching a reference image.

---

## File Modified

`src/app/page.tsx`

Only the `{/* How it works */}` section block was changed (previously lines 170–238). All other sections of the page are untouched.

---

## What Was Changed

### Layout
- Removed the `grid grid-cols-1 md:grid-cols-3` horizontal grid.
- Replaced with a vertical `flex flex-col gap-24 md:gap-32` stack.
- Each step is a `flex-row` / `flex-row-reverse` pair that splits into two `w-1/2` halves on `md+` breakpoints.
- **Alternation pattern:**
  - Step 1: Visual (mockup) left — Text right (`flex-row`)
  - Step 2: Text left — Visual right (`flex-row-reverse`)
  - Step 3: Visual left — Text right (`flex-row`)
- On mobile, all steps stack vertically in correct reading order.

### Background Decorators
- Each visual half contains a large faint step number (`01`, `02`, `03`) rendered as `absolute text-[12rem] font-bold text-slate-100 select-none` at `z-0`, positioned offset top-left behind the mockup card.
- A `w-56 h-56 rounded-full bg-blue-50 absolute z-0` decorative circle is centred behind each mockup.

### Floating Mockup Cards
- `bg-white shadow-xl shadow-slate-200/60 rounded-2xl p-6 relative z-10` floating above the background decorators.
- Each card has step-specific skeleton anatomy:
  - Step 1: form layout — title bar, three skeleton lines, blue CTA button.
  - Step 2: search layout — title bar, search input with icon placeholder, two skeleton lines.
  - Step 3: grid layout — title bar, 2×2 content tile grid (one tile in `bg-blue-50`), full-width CTA button.

### Text Side
- Uppercase `Step 0X` eyebrow label in `text-blue-500 tracking-widest`.
- Title: `text-2xl font-bold tracking-tight text-slate-900`.
- Body: `text-slate-500 leading-relaxed`.
- Copy replaced with lorem ipsum placeholder text.

### Section Shell
- `overflow-hidden` added to the section to prevent large background numbers from causing horizontal scroll.
- `<RevealGroup>` wrapper, `stagger` prop, and `<SplitHeadline>` wrapper are untouched — all GSAP entrance animations are preserved.

### Removed
- Connecting timeline `div` (horizontal 1px rule from previous iteration).
- Glowing ring step indicators from previous iteration.
- All `hover:` CSS animations removed per constraint.

---

## Testing

1. View the section at `localhost:3000/#how-it-works`.
2. Verify zig-zag alternation on `lg` breakpoint — steps 1 & 3 show visual left, step 2 shows visual right.
3. Resize to mobile — all three steps should stack vertically in order with no horizontal overflow.
4. Scroll past the section to confirm GSAP `<RevealGroup>` entrance animations still fire.
5. Confirm no horizontal scrollbar at any breakpoint.

---

## Limitations

- Background number position (`-left-4 -top-8`) is relative to the visual container — adjust if container padding changes.
- Mockup cards are purely decorative `div` skeletons with no `alt` / `aria` semantics. Replace with real `<Image>` elements and descriptive `alt` text before production.
- `overflow-hidden` on the section will clip any child element positioned outside the section boundary.
- Lorem ipsum copy is a placeholder — all three step descriptions must be replaced with final client copy before launch.
