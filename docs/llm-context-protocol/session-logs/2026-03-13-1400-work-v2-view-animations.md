# Session Log: Work V2 View Switch Animations & List View Expansion

**Date:** 2026-03-13
**Status:** In Progress

## Overview

Added animated view transitions for the Work V2 shelf/list toggle. Shelf cards hinge up from bottom with per-card staggered CSS transitions (varying delays, durations, rotations). List items drop in from above with matching stagger pattern. Added 6 dummy projects for list view testing. Applied TG Malromur italic to list item descriptions.

## Key Accomplishments

### 1. Shelf View Card Animations
**File:** `apps/web/src/routes/WorkV2.jsx`

Per-card CSS staggered entrance animation within each ShelfRow. Cards hinge up from bottom using `rotateX` with `perspective: 800` and `transformOrigin: 'bottom center'`. Each card has varying values — rotation (20-36deg), translateY (30-70px), duration (0.7-1.0s), and 70ms delay between cards. Rows stagger via `rowDelay` prop (200ms between rows). Uses `hasAnimated` state triggered after `rowDelay` timeout. Pure CSS transitions to avoid breaking Embla's slide structure.

### 2. List View Drop-In Animation
**File:** `apps/web/src/routes/WorkV2.jsx`

List items animate with negative translateY (drop from above) using same stagger pattern as shelf — varying offsets, durations, and 70ms per-item delay. Uses `requestAnimationFrame` to trigger `hasAnimated` state.

### 3. Intro Text Slide Animation
**File:** `apps/web/src/routes/WorkV2.jsx`

Heading section slides horizontally on view switch using framer-motion `AnimatePresence mode="wait"`. Direction-aware: slides left when switching to shelf, right for list. 40px x-offset with opacity fade, 500ms duration.

### 4. Dummy Projects for List View
**File:** `apps/web/src/data/work-v2-static.js`

Added 6 dummy projects: Dashboard System, Chess Analytics, Kol Noter, Kol Distress, KOL Design System, Kol Modulator. Total 9 projects in list view for testing animation stagger.

### 5. TG Malromur Italic on List Descriptions
**File:** `apps/web/src/components/work/ProjectListItem.jsx`

Inlined `fontFamily: 'TG Malromur', fontStyle: 'italic', fontWeight: 400` on the description text for a distinctive look in list view.

### 6. Layout Adjustments
**File:** `apps/web/src/routes/WorkV2.jsx`

- Removed `mb-16` from intro text section (both views)
- Conditional `pl-64` on intro text — only in shelf view, removed in list view
- Changed list view container from `mt-8` (32px margin) to `pt-16` (64px padding) to match shelf spacing

## Files Modified

### Modified Files
- `apps/web/src/routes/WorkV2.jsx` — View switch animations (shelf hinge, list drop, intro slide), layout adjustments
- `apps/web/src/data/work-v2-static.js` — Added 6 dummy projects
- `apps/web/src/components/work/ProjectListItem.jsx` — TG Malromur italic on description

## Issues Encountered

### 1. Per-Card Motion Wrappers Broke Embla
- **Problem:** Wrapping shelf cards in `motion.div` added extra nesting that broke Embla's slide width calculations (1st and 3rd rows misaligned)
- **Resolution:** Switched to pure CSS transitions with `hasAnimated` state toggle instead of framer-motion per-card. Keeps Embla's direct-child slide structure intact.

### 2. Unused Framer-Motion Variants Accumulation
- **Problem:** Multiple iterations left unused variant definitions
- **Resolution:** Cleaned up `shelfContainerVariants`, `shelfRowVariantsByIndex`, `listContainerVariants`, `listItemVariants`

## Next Steps

- Work on detail/slug page (`WorkDetailV2.jsx`)
- Search input wiring to filtering logic
- Mobile toggle behavior
- Revisit icon path scatter animation (deferred)
