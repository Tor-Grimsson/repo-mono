# Session Log: Work & Foundry Polish + CMS Collection Seed

**Date:** 2026-03-17
**Status:** Completed

## Overview

Polish pass on /work shelf cards (hover flip, border, row labels, parallax tuning), WorkDetail overlay fixes (flush hero, removed blur), foundry card border fix, and full CMS seed of 12 collection projects (illustrations, geometric, grids, motion, patterns).

## Key Accomplishments

### 1. CMS Collection Seed — 12 Projects
**Files:** `kol-vault/collection/*/project.md` (iCloud vault)

Populated `_project.md` frontmatter for all blank collection folders. Renamed folders for consistency (`illust-02/03/06` → `geometric-1/2/3`, reordered `illust-04/05/07` → `illust-02/03/04`). Fixed slugs to singular (`illustration-*`, `grid-*`, `pattern-*`, `motion-*`, `geometric-*`). Seeded all 12 to Sanity via `packages/content/scripts/seed.js`.

### 2. Work Shelf Card Hover — Inverse Flip
**File:** `apps/web/src/routes/Work.jsx`

On hover, shelf cards now flip to full `bg-surface-inverse` overlay with centered TG Dylgjur title text in `text-auto-inverse`. Matches the TypefaceLibraryItem card hover pattern.

### 3. Work Shelf — Parallax Tuning
**File:** `apps/web/src/routes/Work.jsx`

Replaced flat `SCROLL_PARALLAX = 0.5` with ease-in curve: `MIN=0.1` at top, ramps to `MAX=0.4` at bottom using `scrollProgress²` quadratic.

### 4. Work Shelf — Row Label + Border
**File:** `apps/web/src/routes/Work.jsx`

Row type label: `text-fg-48` → `text-auto`, `kol-helper-regular-xs` → `kol-helper-xs`. Cards: added `border border-fg-04`.

### 5. Work Background
**File:** `apps/web/src/routes/Work.jsx`

`<main>` background changed to `bg-surface-secondary`.

### 6. WorkDetail — Hero Flush Fix
**File:** `apps/web/src/routes/WorkDetail.jsx`

Fixed 4px black strip at top of overlay. Header height = `py-4` (16px) + `h-9` (36px) + `py-4` (16px) = 68px. Changed `-mt-16` (64px) to `-mt-[68px]`.

### 7. WorkDetail — Removed Backdrop Blur
**File:** `apps/web/src/routes/WorkDetail.jsx`

Removed `blur(4px)` from backdrop overlay.

### 8. Foundry Card Border Fix
**File:** `apps/web/src/routes/foundry/components/TypefaceLibraryItem.jsx`

Card border changed from `border-fg-64` → `border-fg-08`. Also removed `hover:shadow-lg`. Fixed `ResizeObserver` for list view preview text not loading after card→list switch.

### 9. FoundryCTA Slug Fix
**File:** `apps/web/src/routes/foundry/components/TypefacePage.jsx`

Fixed CTA link from `/foundry/licence` → `/foundry/licensing`.

## Files Modified

### Modified Files
- `apps/web/src/routes/Work.jsx` — shelf hover flip, parallax ease-in, row labels, border, bg-surface-secondary
- `apps/web/src/routes/WorkDetail.jsx` — hero flush (-mt-[68px]), removed backdrop blur
- `apps/web/src/routes/foundry/components/TypefaceLibraryItem.jsx` — border-fg-08, ResizeObserver fix
- `apps/web/src/routes/foundry/components/TypefacePage.jsx` — /foundry/licensing CTA fix
- `packages/ui/src/molecules/FoundryCTA.jsx` — button size md (user edit)

## Issues Encountered

### 1. Scroll snap in WorkDetail
- **Problem:** Attempted CSS scroll snap for hero→content transition. Multiple approaches failed (Tailwind arbitrary props not generating, inline style with window.innerWidth on server).
- **Resolution:** Removed entirely at user request.

### 2. Color class errors
- **Problem:** Applied non-existent classes (`bg-primary`, `text-on-primary`) multiple times before reading design system docs.
- **Resolution:** Fixed to use correct system classes. Feedback saved to memory.

## Next Steps

- Client projects still need `_project.md` populated and seeded
- Tool/system projects (radial, system-dummy) still need seeding
- Foundry `FoundryCTA` unused import in FoundryTypefaces.jsx still present
