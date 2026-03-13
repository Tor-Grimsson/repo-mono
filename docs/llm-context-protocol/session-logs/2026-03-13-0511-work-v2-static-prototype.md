# Session Log: Work V2 Static Prototype & Embla Carousel

**Date:** 2026-03-13
**Status:** In Progress

## Overview

Built a static-data prototype for the Work V2 listing and detail pages, bypassing Sanity to wireframe layout with real exported images before committing to schema changes. Listing page uses 4 horizontal shelf rows (client/collection/tool/system) with Embla Carousel for drag+momentum scrolling. Detail page uses a gallery-first layout with [5:3, 4:5, 4:5] masonry pattern. TiltCard got a new `grounded` variant with zone-based tilt, bottom-anchored transform origin, and forward-only rotation.

## Key Accomplishments

### 1. Static Data File
**File:** `apps/web/src/data/work-v2-static.js`

Created static project data for 3 projects (Aftra/client, Folio 24/collection, Radial/tool) with plain image URLs instead of Sanity references. Images reordered to match [5:3, 4:5, 4:5] repeating masonry pattern. Exports `STATIC_PROJECTS`, `SHELF_TYPES`, `getStaticProjectBySlug()`, and `getProjectsForType()`. System type reuses radial project.

### 2. Work V2 Listing — Shelf-Per-Type with Embla
**File:** `apps/web/src/routes/WorkV2.jsx`

Rewrote listing page from Sanity-fetching grid to 4 horizontal shelf rows grouped by project type. Each row repeats its single project 8 times. Odd rows (Collections, Systems) flow right-to-left via Embla's `direction: 'rtl'`. Labels sit below each row, right-aligned for RTL rows.

Key features:
- Embla Carousel with `loop: true`, `dragFree: true` for momentum scrolling
- `overflow: visible` on viewport — no card clipping during tilt
- Full-viewport scroll container with dynamic padding to align first card with 1400px content edge
- Drag detection prevents accidental link navigation
- TiltCard `grounded` variant on all shelf cards
- Hover overlay with project title + Pill tags
- Header: "Use Cases" section label + heading

### 3. Work V2 Detail — Static Gallery-First Layout
**File:** `apps/web/src/routes/WorkDetailV2.jsx`

Rewrote detail page to use static data with synchronous lookup (no loading state). Hero uses the extra 5:3 export image. Masonry gallery uses new [5:3, 4:5, 4:5] repeating pattern with inline `<img>` elements. Bottom shelf shows other static projects. ProjectOverlay and CtaGlobal kept as-is.

### 4. TiltCard `grounded` Variant
**File:** `apps/web/src/components/animation/TiltCard.jsx`

Added `variant` prop to TiltCard (`default` | `grounded`). Grounded variant:
- `transformOrigin: 'center bottom'` — cards pivot from bottom edge
- Inverted + clamped rotateX — top tilts toward viewer only, never backward
- Zone-based snapping (3×3 grid) — mouse position triggers zones, not 1:1 tracking
- Lazy spring (`stiffness: 250, damping: 25, mass: 0.6`) — smooth transitions between zones
- Reduced rotation range (±2.5° vs default ±4°)
- Children render directly (removed wrapping div)

### 5. Embla Carousel Integration
**File:** `apps/web/package.json`

Installed `embla-carousel-react` (v8.6.0). Replaced hacky scroll+snap+drag approach with proper carousel. Handles drag, momentum, loop, variable widths, and RTL direction cleanly.

## Files Modified

### New Files
- `apps/web/src/data/work-v2-static.js` — Static project data with image paths
- `apps/web/public/work-v2/` — Exported project images (client/aftra, collection/folio-24, tool/radial)

### Modified Files
- `apps/web/src/routes/WorkV2.jsx` — Full rewrite: 4 Embla shelf rows with TiltCard grounded variant
- `apps/web/src/routes/WorkDetailV2.jsx` — Full rewrite: static data, inline hero/masonry, [5:3, 4:5, 4:5] pattern
- `apps/web/src/components/animation/TiltCard.jsx` — Added `variant` prop, grounded variant with zone tilt, lazy spring, forward-only rotation
- `apps/web/package.json` — Added embla-carousel-react dependency
- `yarn.lock` — Updated

## Issues Encountered

### 1. Vite HMR Corruption
- **Problem:** Editing shared components (TiltCard) during rapid iteration caused repeated Vite HMR failures (`@react-refresh` module load errors). Unprecedented in months of work.
- **Resolution:** Cleared `.vite` cache, restarted server. Saved feedback memory to avoid editing shared components during wireframing in future.

### 2. Overflow Clipping vs Horizontal Scroll
- **Problem:** CSS `overflow-x: auto` forces `overflow-y: auto`, clipping tilted cards vertically and horizontally at scroll container edges. Scroll-snap + drag-to-scroll layered on top created conflicting behaviors.
- **Resolution:** Replaced native scroll approach with Embla Carousel. `overflow: visible` on viewport eliminates clipping. Embla handles drag, momentum, and loop properly.

### 3. SiteLayout Padding Offset
- **Problem:** Shelf card start position was 32px too indented — forgot to account for SiteLayout's `lg:px-8` in the dynamic padding calc.
- **Resolution:** Subtracted 2rem from the `calc()` expression.

## Next Steps

- Test Embla integration on all 4 shelf rows — verify loop, drag, momentum, RTL direction
- Consider Embla for the detail page gallery (slug) as well
- Explore parallax on thumbnails within Embla
- Iterate on shelf card sizing, spacing, overlay design
- Eventually: Sanity `type` field schema + CMS entries to replace static data
