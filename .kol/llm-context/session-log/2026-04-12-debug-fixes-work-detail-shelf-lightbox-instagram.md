# Session Log: Debug Fixes — Work Detail, Shelf, Lightbox, Instagram

**Date:** 2026-04-12
**Status:** Completed

## Overview

Researched 6 open bugs in parallel, dropped 2 blog-specific bugs per user request. Fixed 3 work page bugs (direct URL 404, shelf double-click, lightbox navigation) and added IntersectionObserver-based animation pausing to the HomeInstagram section for performance.

## Key Accomplishments

### 1. Bug Research — All 6 Open Bugs
Ran parallel research agents across all open bugs. Wrote detailed research doc at `docs/plans/debug/open-bugs-2026-04-12.md` with root causes, file locations, line numbers, and fix directions for each bug. Dropped blog portrait image sizing and blog image 10 seed script bugs per user decision.

### 2. Fix: `/work/:slug` Direct URL 404
**Files:** `App.jsx`, `WorkDetail.jsx`, `Work.jsx`

Root cause: `/work/:slug` route only existed inside `{backgroundLocation && <Routes>}` conditional — unreachable on direct URL or refresh.

Fix: Added standalone `work/:slug` route in primary Routes tree (inside SiteLayout). WorkDetail now detects modal vs standalone mode via `isModal = !!location.state?.backgroundLocation`. Standalone mode: normal document flow, no backdrop, no slide-up animation, close/escape navigates to `/work`. Modal mode: unchanged.

Also fixed ListView Link (was missing `state={{ backgroundLocation: location }}`).

### 3. Fix: Shelf First-Card Double-Click
**File:** `Work.jsx`

Root cause: Embla's `dragHandler.pointerDown()` returned true on first visible slide without actual movement, causing `onClickCapture` to block the click.

Fix: Replaced `dragHandler.pointerDown()` check with pointer distance tracking. Records coordinates on `pointerDown`, measures displacement on `pointerMove`, only flags as drag if moved >5px (squared distance >25).

### 4. Fix: Work Detail Lightbox Navigation
**File:** `WorkDetail.jsx`

Root cause: Inline `onPrev`/`onNext` arrow functions captured `lightboxIndex` from closure. Every re-render created new function instances with potentially stale values, causing ImageLightbox's `useEffect` to re-register event listeners with outdated callbacks.

Fix: Switched to functional setState (`setLightboxIndex(i => ...)`) so callbacks don't depend on current index value.

### 5. HomeInstagram Animation Pausing
**File:** `HomeInstagram.jsx`

All animations (AsciiLayer clouds, SparklingStar, AsciiFirework) ran continuously from mount regardless of visibility. Added IntersectionObserver (200px rootMargin) at InstagramScroller level, threading `inView` prop to all animated children. When out of view: framer-motion animations stop, setIntervals clear. SpaceInvader left alone (one-shot, not looping).

## Files Modified

### New Files
- `docs/plans/debug/open-bugs-2026-04-12.md` — debug research doc with root causes and fix directions for 4 bugs

### Modified Files
- `apps/web/src/App.jsx` — added standalone `work/:slug` route in primary Routes inside SiteLayout
- `apps/web/src/routes/WorkDetail.jsx` — added `useLocation` import, `isModal` mode detection, `handleClose` callback, conditional backdrop/panel/animation/scroll, functional setState for lightbox onPrev/onNext
- `apps/web/src/routes/Work.jsx` — pointer distance tracking replacing `dragHandler.pointerDown()`, `useLocation` in ListView, `state` prop on ListView Link
- `apps/web/src/components/sections/home/HomeInstagram.jsx` — IntersectionObserver in InstagramScroller, `inView` prop on AsciiLayer/SparklingStar/SparklingStars/AsciiFirework/AsciiFireworks/AsciiPatternBack/AsciiPatternFront

## Decisions Made

- Blog portrait image sizing and blog image 10 bugs deferred — user chose to skip these
- Workshop search crash researched but not fixed — needs dev server + console to confirm exact failing value
- SpaceInvader animation not paused — it's a one-shot scroll-triggered animation, not a continuous loop
- 200px rootMargin on IntersectionObserver for early animation start before section enters viewport

## Next Steps

- Test all fixes with `yarn dev`
- Workshop search crash (bug 4) — needs live reproduction to confirm `.toLowerCase()` on null theory
- Blog bugs (portrait sizing, image 10) — deferred, revisit when prioritized
