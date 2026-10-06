# Session Log: Work V2 — Gallery-First Redesign

**Date:** 2026-03-09
**Status:** In Progress (mockup complete, pending review & iteration)

## Overview

Built a complete v2 mockup of the Work pages at `/work-v2` (listing) and `/work-v2/:slug` (detail). The detail page follows a gallery-first approach inspired by Collins/Koto/Ueno references: video/image hero → inline info toggle → masonry gallery → horizontal "Case Studies" shelf. Original pages at `/work` and `/work/:slug` are untouched.

## Key Accomplishments

### 1. Gallery-First Detail Page (`/work-v2/:slug`)
**File:** `apps/web/src/routes/WorkDetailV2.jsx`

- Full-viewport DetailHero (reused existing component) with height trimmed to `calc(100dvh - 7rem)` so the info bar peeks on load
- `/ project-name` + `+ Information` toggle bar at `max-w-[1800px]`, inline with gallery
- ImageMasonry gallery below
- ProjectShelf "Case Studies" horizontal scroll at bottom
- `bg-surface-secondary` via SiteLayout pathname check

### 2. Full-Screen Project Overlay
**File:** `apps/web/src/components/sections/work-detail/ProjectOverlay.jsx`

Collins-style full-screen dark overlay (95% black) triggered by `+ Information`. Two-column layout: metadata (client, year, services) on left, description + about text on right. Portal to body, scroll lock, Escape key, fade animation.

### 3. Mixed Masonry Gallery
**File:** `apps/web/src/components/sections/work-detail/ImageMasonry.jsx`

Standardised aspect ratios for image preparation:
- **2:1** — full-width cinematic (2880×1440)
- **4:5** — portrait pairs side-by-side (1400×1750)
- **4:3** — full-width desktop landscape (2880×2160)

Pattern per 6 images: 2:1 → two 4:5 → 4:3 → two 4:5 → repeat. Grid gap follows design system (`gap-8`). Container: `max-w-[1800px]`.

### 4. Horizontal Project Shelf
**File:** `apps/web/src/components/sections/work-detail/ProjectShelf.jsx`

"Case Studies" eyebrow + "Kolkrabbi Use cases" heading + "Work" primary button CTA. Horizontal scrolling card row with hidden scrollbar. Text respects `max-w-[1800px]`, cards bleed to viewport right edge. 3 alternating card heights (tall/medium/short, ~30px difference) aligned bottom. Cards: `rounded-[4px]`, portrait aspect.

### 5. Grid Listing Page (`/work-v2`)
**File:** `apps/web/src/routes/WorkV2.jsx`

Simple 2-column grid of project thumbnails. `4:3` aspect ratio, `rounded-[4px]`, `max-w-[1800px]`, responsive gap (`gap-4 md:gap-6 lg:gap-8`). `pt-20` clears fixed Navbar.

### 6. Media Slot Documentation
**File:** `docs/cms-projects/cms-projects-layout.md`

Full page structure diagram, media slot map with dimensions for image preparation, theme variant notes, grid spacing references, component map.

### 7. SiteLayout Background Override
**File:** `apps/web/src/components/layout/SiteLayout.jsx`

Pathname-based background swap for `/work-v2/` routes (`bg-surface-secondary`). Temporary solution with TODO comment — should be replaced with LayoutContext + `useLayoutBackground()` hook when v2 goes live.

## Files Modified

### New Files
- `apps/web/src/routes/WorkV2.jsx` — Listing page
- `apps/web/src/routes/WorkDetailV2.jsx` — Detail page
- `apps/web/src/components/sections/work-detail/ProjectOverlay.jsx` — Full-screen info overlay
- `apps/web/src/components/sections/work-detail/ImageMasonry.jsx` — Mixed masonry gallery
- `apps/web/src/components/sections/work-detail/ProjectShelf.jsx` — Horizontal scroll shelf
- `docs/cms-projects/cms-projects-layout.md` — Media slot documentation

### Modified Files
- `apps/web/src/App.jsx` — Added WorkV2 + WorkDetailV2 imports and routes
- `apps/web/src/components/layout/SiteLayout.jsx` — Added pathname-based bg override for work-v2

### Deleted Files
- `apps/web/src/components/sections/work-detail/ProjectBar.jsx` — Replaced by inline info toggle
- `apps/web/src/components/sections/work-detail/ProjectDrawer.jsx` — Replaced by ProjectOverlay
- `apps/web/src/components/sections/work-detail/ImageStream.jsx` — Replaced by ImageMasonry

## Issues Encountered

### 1. Round 1 Design Rejected
- **Problem:** Initial implementation had a flat secondary navbar (ProjectBar), side drawer, no video hero, uniform image grid
- **Resolution:** Complete rethink based on reference screenshots. Reintroduced DetailHero, replaced drawer with full-screen overlay, added masonry grid with standardised ratios

### 2. full-bleed Utility Not Found Initially
- **Problem:** Searched for `full-bleed` in CSS files with incorrect grep patterns, concluded it didn't exist
- **Resolution:** User corrected — found `@utility full-bleed` in `packages/ui/css/utilities.css` using broader search

### 3. SiteLayout Background Bleed
- **Problem:** Setting `bg-surface-secondary` on `<main>` didn't reach viewport edges due to SiteLayout's `px-4 md:px-6 lg:px-8` padding
- **Resolution:** Moved background to SiteLayout's wrapper div via pathname check. Noted as tech debt for LayoutContext refactor.

### 4. ProjectShelf Layout Misalignment
- **Problem:** Initially wrapped entire shelf in max-width, preventing cards from bleeding right. Also had too-dramatic height differences between cards.
- **Resolution:** Split layout: text in max-width container, card row uses `marginRight: calc(-50vw + 50%)` to bleed right. Reduced height steps to ~30px.

## Decisions Made

- **Standardised aspect ratios**: 2:1 (cinematic), 4:5 (portrait pairs), 4:3 (desktop landscape) — enables consistent image preparation
- **max-w-[1800px]** for work-v2 pages (wider than the 1400px used elsewhere) — matches Navbar max-width
- **Pathname check for background** — temporary, will refactor to LayoutContext when v2 replaces v1
- **No scrollbar-hide utility created** — used inline styles + injected `<style>` tag, matching existing codebase patterns

## Next Steps

- Review mockup on real devices (mobile, tablet)
- Iterate on ProjectOverlay content layout
- Test with projects that have video heroes
- Consider whether `/work-v2` listing needs more features (filtering, hover overlays)
- When approved: swap routes, remove old components, refactor SiteLayout bg to LayoutContext
