# Session Log: Mobile Optimization — /work and /work/:slug

**Date:** 2026-03-17
**Status:** Completed

## Overview

Mobile-first optimization pass for the Work listing page and WorkDetail overlay. Fixed absurd desktop-only spacing on mobile, added full-width detail panel, disabled expensive animations on touch devices, created an image lightbox for gallery, and integrated SourcesItem cards for tool/system projects.

## Key Accomplishments

### 1. WorkDetail Full-Width Mobile Overlay
**File:** `apps/web/src/routes/WorkDetail.jsx`

Panel changed from fixed `w-[78vw]` to `w-full md:w-[78vw]`. Hero height uses `h-[120svh] md:h-[150vh]` (replaced inline style). All padding zones follow `px-4 md:px-8 lg:px-12` pattern. Backdrop remains behind full-width panel on mobile (unreachable, correct behavior).

### 2. Work.jsx Spacing Fixes
**File:** `apps/web/src/routes/Work.jsx`

- Main container: `pt-20 md:pt-56 pb-16 md:pb-32`
- Intro wrapper: `px-4 md:px-6 pt-16 md:pt-32`, shelf padding `lg:pl-64`
- Shelf column gap: `gap-12 md:gap-24`
- ShelfRow section: `py-6 md:py-16`
- Row labels: `pr-4 md:pr-64` / `pl-4 md:pl-64`

### 3. TiltCard Coarse-Pointer Disable
**File:** `apps/web/src/components/animation/TiltCard.jsx`

Module-level `(pointer: coarse)` check. On touch devices, renders a plain `<div>` — no motion.div, no springs, no tilt. Full tilt logic isolated in `TiltCardInner` (only mounted on fine-pointer devices).

### 4. Scroll Parallax Mobile Gate
**File:** `apps/web/src/routes/Work.jsx`

Module-level `IS_MOBILE` constant via `matchMedia('(max-width: 767px)')`. Parallax scroll listener returns early on mobile. Entry animation `perspective: 800` skipped on mobile.

### 5. ImageLightbox Component
**File:** `apps/web/src/components/work/ImageLightbox.jsx` (new)

Fullscreen image/video viewer at `z-[90]`. Features: close button, left/right arrows, swipe navigation (50px threshold), Escape key closes (with `capture: true` + `stopImmediatePropagation` to prevent WorkDetail's Escape handler from firing), body overflow lock.

### 6. Lightbox Integration in GalleryCarousel
**File:** `apps/web/src/routes/WorkDetail.jsx`

Added `lightboxIndex` state to GalleryCarousel. Each gallery item gets `onClick` (guarded by `!hasDragged.current`) + `cursor-pointer`. Lightbox renders when `lightboxIndex !== null`.

### 7. AsciiClouds Conditional Unmount
**File:** `apps/web/src/routes/Work.jsx`

AsciiClouds only renders when `location.pathname === '/work'` — unmounts entirely when a slug detail panel is open. Saves animation overhead behind the overlay.

### 8. Gallery Image Loading Fix
**File:** `apps/web/src/routes/WorkDetail.jsx`

Removed `loading="lazy"` from gallery carousel images. Browser lazy loading doesn't work reliably inside horizontal scroll containers — it can't detect that off-screen carousel items will be visible via drag.

### 9. SourcesItem for Tool/System Projects
**File:** `apps/web/src/routes/WorkDetail.jsx`

Col 3 in the metadata grid now conditionally renders: tool/system projects show "Sources & References" heading with `SourcesItem` cards (from `@kol/ui`) using the project's `links[]` array. Client/collection projects keep the original Live/Repo/Workshop link display.

### 10. StackArticle SourcesSection Margin Fix
**File:** `apps/web/src/routes/StackArticle.jsx`

Removed `kol-prose` wrapper from around `SourcesSection` (both instances). The `kol-prose` class was applying `max-width: min(65ch, 100%)` + `margin-inline: auto`, causing ~87.8px left margin offset. Now sits flush within parent container.

## Files Modified

### New Files
- `apps/web/src/components/work/ImageLightbox.jsx` — Fullscreen lightbox with swipe/arrow/keyboard navigation

### Modified Files
- `apps/web/src/routes/Work.jsx` — Mobile spacing, parallax gate, perspective gate, AsciiClouds conditional render
- `apps/web/src/routes/WorkDetail.jsx` — Full-width mobile panel, padding fixes, hero height, lightbox integration, lazy loading removal, SourcesItem for tool/system
- `apps/web/src/components/animation/TiltCard.jsx` — Coarse-pointer bypass, split into TiltCard + TiltCardInner
- `apps/web/src/routes/StackArticle.jsx` — Removed kol-prose wrapper from SourcesSection (both instances)

## Issues Encountered

### 1. Escape Key Conflict — Lightbox vs WorkDetail
- **Problem:** Both ImageLightbox and WorkDetail listen for Escape on `document`, so pressing Escape in the lightbox closed both the lightbox AND navigated back to /work.
- **Resolution:** Lightbox registers its keydown handler with `capture: true` and calls `stopImmediatePropagation()` on Escape. This fires before WorkDetail's handler and prevents it from executing.

### 2. Gallery Images Not Loading
- **Problem:** Half the images in Kol Radial's gallery carousel weren't loading.
- **Resolution:** Removed `loading="lazy"` attribute. Browser lazy loading doesn't work reliably in horizontal scroll containers — the browser can't determine visibility of off-screen flex items.

### 3. SourcesSection 87.8px Left Margin
- **Problem:** In Stack articles, the Sources & References section had an unexpected ~87.8px left margin.
- **Resolution:** The `kol-prose` wrapper was applying `margin-inline: auto` with a `max-width`, causing the centering offset. Removed the wrapper.

## Next Steps

- Verify all changes at 375px, 768px, 1440px in Chrome DevTools
- Test lightbox swipe on real touch device
- Check TiltCard renders flat on mobile (no tilt jank)
- Desktop regression check — all existing behavior should be identical
