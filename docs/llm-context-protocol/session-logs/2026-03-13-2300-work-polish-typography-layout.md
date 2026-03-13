# Session Log: Work Page Polish, Typography & Layout Refactor

**Date:** 2026-03-13
**Status:** In Progress

## Overview

Polished the `/work` detail panel (header, gallery, metadata typography), swapped Mono Grotesk Fine for Regular (weight 300→400), removed SiteLayout padding/bg logic in favor of per-route `breakpoint-padding` utility, added scroll-driven parallax to shelf rows, installed 3 new Claude Code skills, and various card sizing adjustments.

## Key Accomplishments

### 1. Detail Panel Header Fix
**File:** `apps/web/src/routes/WorkDetail.jsx`

- Changed header padding from `pt-8 pb-4` to `py-4` to align with main navbar height
- Added `bg-surface-primary` initially, then switched to `bg-fg-inverse-80` (solid dark) that transitions to `bg-fg-inverse-48` with `blur(4px)` once scrolled past hero
- Differentiates the detail header from the site navbar visually

### 2. Gallery Aspect Ratios from Sanity Metadata
**Files:** `apps/web/src/lib/queries.js`, `apps/web/src/routes/WorkDetail.jsx`

- Added `"dimensions": asset->metadata.dimensions` to GROQ media projection
- Gallery carousel now uses real `aspectRatio` from each asset instead of guessing from alt text
- Wide images (ar >= 1) get larger width, portrait images get smaller width

### 3. Metadata Typography Bump
**File:** `apps/web/src/routes/WorkDetail.jsx`

- Labels: `kol-mono-xs` → `kol-mono-xxs`
- Values: `kol-mono-text` → `kol-mono-sm`, then → `kol-mono-sm-regular` (new weight)
- More compact metadata section that doesn't compete with hero

### 4. Mono Grotesk Fine → Regular
**Files:** `packages/ui/theme.css`, `packages/ui/css/components.css`, `packages/ui/css/prose.css`, 22 JSX/JS files, 5 docs files

- Swapped `@font-face` from Fine (300) to Regular (400) woff files
- Renamed all CSS classes: `kol-mono-text-fine` → `kol-mono-text-regular`, `kol-mono-sm-fine` → `kol-mono-sm-regular`, `kol-helper-fine-*` → `kol-helper-regular-*`
- Updated all component references and documentation
- Font files: `PPRightGroteskMono-Regular.woff` and `PPRightGroteskMono-RegularItalic.woff`

### 5. SiteLayout Padding → Per-Route `breakpoint-padding`
**Files:** `packages/ui/css/utilities.css`, `apps/web/src/components/layout/SiteLayout.jsx`, ~25 route files

- Created `.breakpoint-padding` utility class (`px-4 → md:px-6 → lg:px-8`)
- Stripped SiteLayout of all pathname checks, padding logic, and bg-class logic
- Each route now owns its own padding and background
- Work.jsx sets `bg-surface-secondary` on its own `<main>`
- Removed `- 2rem` offset from shelf row padding calc to realign with heading after SiteLayout padding removal

### 6. Search Filtering Connected
**Files:** `apps/web/src/context/WorkViewContext.jsx`, `apps/web/src/routes/Work.jsx`

- Added `searchQuery`/`setSearchQuery` to WorkViewContext
- Wired input value/onChange, clears on close
- Filters on title, description, client, type, tags
- Works in both shelf and list views
- Input styled with `kol-helper-regular-s text-fg-80`, no placeholder

### 7. Scroll-Driven Shelf Parallax
**File:** `apps/web/src/routes/Work.jsx`

- Page scroll nudges Embla carousel position via `scrollTo.distance()`
- `fromLeft` rows move opposite direction — all converge through center
- Quadratic ramp: accelerates as row moves away from viewport center
- `SCROLL_PARALLAX = 0.15` constant for easy tuning
- Only fires when section is in viewport

### 8. Shelf Row Sizing & Spacing
**File:** `apps/web/src/routes/Work.jsx`

- Cards: 360px → 400px wide at md
- Heights scaled proportionally: 504/468/432 → 560/520/480 at md
- Shelf rows container: `flex flex-col gap-16`
- Added `pt-16` on heading wrapper for spacing

### 9. TiltCard Overflow Fix
**File:** `apps/web/src/components/animation/TiltCard.jsx`

- Moved `overflow-hidden` from outer `motion.div` to an inner wrapper
- Prevents border-radius clipping artifacts during 3D tilt transforms
- Inner wrapper uses `rounded-[inherit]` to respect parent's radius

### 10. Installed Claude Code Skills
**Path:** `.claude/skills/`

- `frontend-design` — design thinking and aesthetic principles for CSS/UI
- `webapp-testing` — Playwright-based testing patterns and helpers
- `algorithmic-art` — p5.js generative art with seeded randomness

## Files Modified

### New Files
- `.claude/skills/frontend-design/` — skill from anthropics/skills
- `.claude/skills/webapp-testing/` — skill from anthropics/skills
- `.claude/skills/algorithmic-art/` — skill from anthropics/skills

### Modified Files
- `apps/web/src/routes/WorkDetail.jsx` — header bg/padding, gallery aspect ratios, metadata typography
- `apps/web/src/routes/Work.jsx` — search wiring, parallax, card sizing, spacing, bg-secondary, padding calc fix
- `apps/web/src/lib/queries.js` — media dimensions in GROQ projection
- `apps/web/src/context/WorkViewContext.jsx` — searchQuery state
- `apps/web/src/components/animation/TiltCard.jsx` — overflow-hidden moved to inner wrapper
- `apps/web/src/components/layout/SiteLayout.jsx` — stripped padding/bg logic
- `packages/ui/theme.css` — Fine → Regular @font-face
- `packages/ui/css/components.css` — fine → regular class rename + weight 300→400
- `packages/ui/css/prose.css` — kol-caption-text weight 300→400
- `packages/ui/css/utilities.css` — new .breakpoint-padding class
- 22 JSX/JS files — fine → regular class references
- 5 docs files — typography documentation updated
- ~25 route files — added breakpoint-padding class

## Issues Encountered

### 1. Gallery Aspect Ratios Not Working
- **Problem:** Static data used alt text convention (`5-3`, `5_3`) to determine aspect ratio. Sanity data didn't follow this convention, so all images defaulted to 4:5.
- **Resolution:** Fetched `asset->metadata.dimensions` from Sanity and used real `aspectRatio` value.

### 2. Shelf Row Misalignment After SiteLayout Padding Removal
- **Problem:** Shelf padding calc had `- 2rem` offset that compensated for SiteLayout's padding. After removal, cards didn't align with heading text.
- **Resolution:** Removed the `- 2rem` from the calc.

### 3. TiltCard Border-Radius Disappearing on Hover
- **Problem:** `overflow-hidden` on a 3D-transformed element caused border-radius clipping artifacts during tilt.
- **Resolution:** Moved overflow-hidden to an inner wrapper div, keeping the tilt container overflow-visible.

## Next Steps

- Review parallax feel — user may want further tuning
- Search UX — currently inline filtering, considered overlay approach but kept animation work
- Clean up `apps/web/public/work-v2/` static assets
- Replace LayoutContext tech debt note (now resolved via breakpoint-padding approach)
