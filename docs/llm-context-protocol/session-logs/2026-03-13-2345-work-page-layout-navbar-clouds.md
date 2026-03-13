# Session Log: Work Page Layout, Navbar Grid & ASCII Clouds

**Date:** 2026-03-13
**Status:** In Progress

## Overview

Reworked the `/work` page background, shelf spacing, and scroll behavior. Moved the view toggle into the Navbar on an 8-column CSS grid for asymmetric placement. Extracted `AsciiClouds` from `HomeInstagram` into `@kol/ui` as a shared atom with three variants (fixed, parallax, drift). Added Sanity orderable-document-list plugin for drag-and-drop project ordering. Various list view card styling and footer fixes.

## Key Accomplishments

### 1. Work Page Background & Spacing
**File:** `apps/web/src/routes/Work.jsx`

- Background: `bg-surface-secondary` → `bg-surface-tertiary` → `bg-fg-02` (subtle lift off primary)
- Scroll parallax constant: `0.15` → `0.5`, removed proximity ramp (all rows scroll simultaneously)
- Card gap: `gap-4` → `gap-8` (32px)
- Row container gap: `gap-16` → `gap-24` (96px)
- Intro text padding: `pt-16` → `pt-32`
- Bottom padding: `pb-6 md:pb-8` → `pb-32`
- Added `select-none` to shelf carousel to prevent drag text selection
- All row intro animations start simultaneously (`rowDelay={0}`)

### 2. WorkDetail Overlay Background
**File:** `apps/web/src/routes/WorkDetail.jsx`

- Panel background: `bg-surface-secondary` → `bg-surface-primary`

### 3. Sanity Orderable Document List
**Files:** `packages/content/src/schemas/types/project.ts`, `apps/studio/sanity.config.ts`, `apps/web/src/lib/queries.js`, `packages/content/src/queries.ts`

- Installed `@sanity/orderable-document-list` in studio and content packages
- Added `orderRankField` and `orderRankOrdering` to project schema
- Studio config: added `orderableDocumentListDeskItem` with custom desk structure
- Updated both GROQ queries to `order(orderRank asc, _updatedAt desc)`
- Drag-and-drop reordering now available in Sanity Studio

### 4. Navbar Restructured for /work
**File:** `apps/web/src/components/layout/Navbar.jsx`

- When on `/work` (desktop): navbar uses `grid-cols-8` layout
  - Col 1: Logo
  - Col 7: View toggle (shelf/list + search), right-aligned
  - Col 8: Theme toggle + hamburger with dropdown menu
- Moved `WorkViewToggle` from Work.jsx into Navbar.jsx (uses `useWorkView` context)
- Simple dropdown menu on hamburger click (not fullscreen overlay) for desktop /work
- Mobile: standard fullscreen overlay still works
- Removed `max-w-[1800px]` from Navbar and Footer
- Removed background color from Navbar (now transparent)

### 5. AsciiClouds Shared Component
**File:** `packages/ui/src/atoms/AsciiClouds.jsx`

- Extracted cloud motion from `HomeInstagram.jsx` into `@kol/ui`
- Three variants:
  - `fixed` (default): pinned to viewport, horizontal drift only
  - `parallax`: CSS sticky, scroll-linked vertical descent
  - `drift`: autonomous descending loop (120s), no scroll binding — two 100vh panels stacked, `translateY` loops from `-100vh` to `0`
- Exported from `@kol/ui` atoms index
- Work page uses `drift` variant

### 6. List View Card Styling
**File:** `apps/web/src/components/work/ProjectListItem.jsx`

- Default state: `bg-transparent` → `bg-surface-primary` (solid background over clouds)
- Hover/active: `bg-surface-secondary` with brighter border
- Background persists across all states (no transparent replacement)

### 7. Footer Over Clouds
**File:** `apps/web/src/components/layout/Footer.jsx`

- Added `relative z-10` so footer background paints over fixed ASCII clouds

## Files Modified

### New Files
- `packages/ui/src/atoms/AsciiClouds.jsx` — shared ASCII cloud background component with 3 variants

### Modified Files
- `apps/web/src/routes/Work.jsx` — background, spacing, parallax, removed WorkViewToggle
- `apps/web/src/routes/WorkDetail.jsx` — overlay bg to surface-primary
- `apps/web/src/components/layout/Navbar.jsx` — 8-col grid for /work, WorkViewToggle moved here, removed max-width + bg
- `apps/web/src/components/layout/Footer.jsx` — removed max-width, added relative z-10
- `apps/web/src/components/work/ProjectListItem.jsx` — solid bg + hover states
- `packages/ui/src/atoms/index.js` — export AsciiClouds
- `packages/content/src/schemas/types/project.ts` — orderRankField + orderRankOrdering
- `apps/studio/sanity.config.ts` — orderable document list plugin + desk structure
- `apps/web/src/lib/queries.js` — orderRank sorting
- `packages/content/src/queries.ts` — orderRank sorting
- `apps/studio/package.json` — added @sanity/orderable-document-list
- `packages/content/package.json` — added @sanity/orderable-document-list
- `yarn.lock` — updated dependencies

## Issues Encountered

### 1. Firefox Scroll-Linked Warning
- **Problem:** JS scroll listener for parallax variant triggered Firefox async panning warning
- **Resolution:** Created `drift` variant (autonomous loop, no scroll binding) as the preferred approach for /work. Kept `parallax` variant available but not actively used.

### 2. Toggle Positioning in Full-Width Navbar
- **Problem:** 8-column grid with no max-width stretches unpredictably on wide viewports
- **Resolution:** Equal-width `grid-cols-8` — predictable column positions at any viewport width. Toggle in col 7, right-aligned.

## Next Steps

- Fine-tune cloud opacity/speed for /work page
- Consider using `drift` variant on other pages
- Parallax tuning on shelf rows
- Clean up `public/work-v2/` static assets
- Search UX refinement (overlay vs inline)
