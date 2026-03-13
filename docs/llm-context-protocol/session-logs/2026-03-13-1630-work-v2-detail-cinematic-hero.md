# Session Log: Work V2 Detail — Cinematic Hero Intro

**Date:** 2026-03-13
**Status:** In Progress

## Overview

Rebuilt the Work V2 detail panel (`/work-v2/:slug`) from a Sanity-backed page into a cinematic two-section overlay with a full-viewport hero (video/image) and a gallery grid below. Panel slides up from bottom, hero fills 100vh with text overlapping, user scrolls down to gallery/metadata/more-work. Sticky header with backdrop blur transitions between hero and grid sections.

## Key Accomplishments

### 1. Two-Section Scrollable Panel
**File:** `apps/web/src/routes/WorkDetailV2.jsx`

Rewrote the detail panel as a single scrollable flow with two distinct sections:
- **Section 1 (Hero):** 100vh, video/image fills the viewport, title text overlaps top-left, down-arrow at bottom center
- **Section 2 (Grid):** Gallery carousel, metadata, divider, more-work shelf

User can scroll freely between both sections in both directions.

### 2. Sticky Header with Backdrop Blur
**File:** `apps/web/src/routes/WorkDetailV2.jsx`

Header (type breadcrumb + close button) sticks to top of panel. Over the hero it's transparent; once the grid section enters view, transitions to 80% surface-primary with 12px backdrop blur. Uses scroll listener comparing grid position to panel bottom.

### 3. Panel Animation: Bottom Slide-In
**File:** `apps/web/src/routes/WorkDetailV2.jsx`

Changed panel entry animation from `x: '100%'` (slide from right) to `y: '100%'` (slide up from bottom) using framer-motion.

### 4. Typography Hierarchy
**File:** `apps/web/src/routes/WorkDetailV2.jsx`

- **Description** is now the main heading (`kol-heading-lg`), not the project title
- **Client** name shown in `kol-mono-xs` above the description
- **Header** shows project type (`/ client`, `/ tool`) instead of slug to avoid repeating client name

### 5. Video/Image Hero Support
**Files:** `apps/web/src/routes/WorkDetailV2.jsx`, `apps/web/src/data/work-v2-static.js`

Added `isVideo()` helper supporting `.mp4`, `.mov`, `.webm`. Hero renders `<video autoPlay muted playsInline loop>` or `<img>` accordingly. Updated Aftra hero to `aftra_master.mov`.

### 6. Eager Import for Instant Mount
**File:** `apps/web/src/App.jsx`

Changed `WorkDetailV2` from `lazy()` import to regular `import` — eliminates chunk download delay on first click. Nested as child route under `work-v2` with `<Outlet />`. Removed `<Suspense>` wrapper.

### 7. Down Arrow — Scroll-Linked Visibility
**File:** `apps/web/src/routes/WorkDetailV2.jsx`

Arrow at `bottom-24` of hero section. Fades out as soon as the grid section starts entering the viewport (scroll listener). Clicking it smooth-scrolls to the grid section.

### 8. Staggered Title Animation
**File:** `apps/web/src/routes/WorkDetailV2.jsx`

Client and description animate in with staggered framer-motion fade+slide-up (delays 0.5s, 0.6s).

## Files Modified

### Modified Files
- `apps/web/src/routes/WorkDetailV2.jsx` — Complete rewrite: cinematic hero + grid two-section panel
- `apps/web/src/App.jsx` — Eager import for WorkDetailV2, nested as child route
- `apps/web/src/data/work-v2-static.js` — Aftra hero changed to `.mov` video

### Memory Files
- `.claude/projects/-Users-biskup-dev-projects-kol-monorepo/memory/feedback_admit_confusion.md` — New feedback memory: always admit confusion immediately instead of guessing

## Issues Encountered

### 1. Multiple Failed Scroll-Linked Implementations
- **Problem:** Initial attempts used GSAP ScrollTrigger with `scroller` option for a complex scroll-linked hero reveal. The mechanic was misunderstood — produced full-bleed video, wrong sizes, wrong animation triggers across 3 iterations.
- **Resolution:** After honest clarification from user, pivoted to a much simpler and better approach: two-section scroll (100vh hero + grid), no GSAP needed. Framer-motion for entry animations, vanilla scroll listener for header/arrow state.

### 2. Duplicate UI Elements
- **Problem:** Early implementation had close button and breadcrumb duplicated in both hero and grid sections.
- **Resolution:** Moved to a single sticky header shared across both sections.

## Next Steps

- Scroll-linked transition animation between hero and grid sections (optional polish)
- Gallery card entrance animation (staggered, like work-v2 shelf rows)
- Mobile responsive adjustments for the detail panel
- Search filtering in work-v2 listing
- Mobile toggle for shelf/list view
