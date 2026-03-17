# Session Log: Modal Routes, ShelfCard Refactor & Design System Fixes

**Date:** 2026-03-17
**Status:** Completed

## Overview

Major architectural session covering: React Router Modal Routes pattern for WorkDetail overlay (fixes scroll reset on open/close), ShelfCard extracted as shared component with image-load-driven animation, @container → @media migration for all kol-* typography, hover:bg-surface-* utilities added, navbar hover background with asymmetric timing. Collections dead code archived.

## Key Accomplishments

### 1. Collections Dead Code Archived
**Files:** `docs/a-torg/a-dead-code/collections/`

Copied 5 route files and 4 data files to archive. Removed all imports and routes from App.jsx. HomeHighlights and FeaturesCardSection links already updated previous session.

### 2. ShelfCard Shared Component
**File:** `apps/web/src/components/work/ShelfCard.jsx`

Extracted shelf card used in both Work.jsx (ShelfRow) and WorkDetail.jsx (MoreWorkShelf) into a single shared component. Key improvement: entry animation is now driven by image preload (`new Image()` onload/onerror) rather than a setTimeout — cards animate in only once their thumbnail is fully loaded. Same size, border, hover state, and animation across both contexts. MoreWorkShelf now shows all other projects (no repeat cap of 8).

### 3. Modal Routes Pattern
**Files:** `apps/web/src/App.jsx`, `apps/web/src/routes/Work.jsx`, `apps/web/src/routes/WorkDetail.jsx`, `apps/web/src/components/work/ShelfCard.jsx`

Implemented React Router's Modal Routes pattern — the industry-standard solution for overlay routes that should not remount the background page. WorkDetail is no longer a nested child of Work; it renders in a parallel `<Routes>` tree only when `location.state.backgroundLocation` exists. Work stays frozen at `/work`, scroll position is never touched.

- ShelfCard `<Link>` passes `state={{ backgroundLocation: location }}`
- AppRoutes main `<Routes>` receives `location={backgroundLocation || location}`
- WorkDetail close actions changed from `navigate('/work')` → `navigate(-1)` (POP action)
- `scrollToTop()` skips on both background location state and POP (browser back/forward)
- All `document.body` scroll-lock hacks removed from WorkDetail
- `useOutletContext` removed — WorkDetail always fetches directly via `getAllProjects()`

### 4. Shelf Rows Dim When Overlay Open
**File:** `apps/web/src/routes/Work.jsx`

Shelf rows fade to `opacity-20` when overlay is open. Uses `window.location.pathname` (not React Router's `useLocation`) because the background location is frozen at `/work` with modal routes — `window.location` always reflects the real browser URL.

### 5. WorkDetail Hero Text Box
**File:** `apps/web/src/routes/WorkDetail.jsx`

Title/description text box wrapped in `inline-block max-w-[600px] bg-surface-secondary rounded-[2px]` with negative left margin (`-ml-8 md:-ml-12 lg:-ml-16`) so it bleeds beyond the panel's left edge. Compensating left padding keeps text aligned. Text switched from `text-white mix-blend-difference` to `text-auto` for legibility on both light and dark heroes.

### 6. @container → @media Migration
**Files:** `packages/ui/css/components.css`, `packages/ui/css/docs.css`

Replaced all 113 `@container` queries in components.css and 5 in docs.css with `@media`. The kol-* typography classes were using container queries which created a hidden dependency on a `containerType: 'inline-size'` ancestor — this broke WorkDetail after modal routes removed it from SiteLayout's Outlet wrapper. Standard media queries respond to the viewport, which is correct for app-level typography.

Removed `containerType: 'inline-size'` wrapper from SiteLayout.jsx.

### 7. hover:bg-surface-* Utilities
**File:** `packages/ui/css/utilities.css`

Added `hover:bg-surface-primary`, `hover:bg-surface-secondary`, `hover:bg-surface-tertiary`, `hover:bg-surface-inverse` CSS classes. Previously only `hover:bg-fg-*` existed. Updated colors cheat sheet doc.

### 8. Navbar Hover Background
**File:** `apps/web/src/components/layout/Navbar.jsx`

Added `isHovered` state with `onMouseEnter`/`onMouseLeave` on the header. Background appears fast (near-instant) and fades out slowly with a long hold (1000ms delay) after mouse leaves — asymmetric timing requires JS state since CSS transition applies the same duration to both directions.

### 9. Modal Routes Documentation
**File:** `docs/documentation/01-foundation/1.7.0-modal-routes.md`

New foundation doc explaining the Modal Routes pattern: when to use it, the two-Routes-tree architecture, `backgroundLocation` state, skipping `scrollToTop` on background navigation and POP actions.

## Files Modified

### New Files
- `apps/web/src/components/work/ShelfCard.jsx` - Shared shelf card component
- `docs/documentation/01-foundation/1.7.0-modal-routes.md` - Modal Routes pattern docs
- `docs/a-torg/a-dead-code/collections/` - Archived collection routes + data files

### Modified Files
- `apps/web/src/App.jsx` - Modal Routes split, useNavigationType, skip scrollToTop guards
- `apps/web/src/routes/Work.jsx` - ShelfCard usage, Outlet removed, Link import fix, window.location opacity check
- `apps/web/src/routes/WorkDetail.jsx` - Modal Routes cleanup, navigate(-1), text box styling, removed scroll hacks
- `apps/web/src/components/work/ShelfCard.jsx` - Created (new)
- `apps/web/src/components/layout/Navbar.jsx` - isHovered state, asymmetric bg transition
- `apps/web/src/components/layout/SiteLayout.jsx` - Removed containerType wrapper
- `packages/ui/css/components.css` - @container → @media (113 replacements)
- `packages/ui/css/docs.css` - @container → @media (5 replacements)
- `packages/ui/css/utilities.css` - hover:bg-surface-* variants added
- `docs/documentation/02-design-system/2.1.1-colors-cheat-sheet.md` - hover:bg-surface-* documented
- `docs/documentation/01-foundation/1.7.0-modal-routes.md` - Created (new)

## Issues Encountered

### 1. Duplicate style prop on Navbar header
- **Problem:** Added `style` prop for transition alongside existing `style` prop (transform + color)
- **Resolution:** Merged into single style object

### 2. Shelf opacity using frozen location
- **Problem:** `location.pathname !== '/work'` always false after modal routes (location is frozen)
- **Resolution:** Use `window.location.pathname` which always reflects the real browser URL

### 3. Link not defined in Work.jsx
- **Problem:** Removed `Link` from imports when cleaning up Outlet, but ListView still uses it
- **Resolution:** Added `Link` back to the import

### 4. WorkDetail typography smaller after modal routes
- **Problem:** kol-* typography used @container queries requiring containerType ancestor. WorkDetail now renders outside SiteLayout which provided that container.
- **Resolution:** Migrated all @container → @media in components.css and docs.css. Removed containerType from SiteLayout.

## Next Steps

- Review kol-* typography — currently uses fixed px at breakpoints, no fluid scaling between them (intentional per user)
- Foundry plan still pending (foundry-simplified plan in .claude/plans/)
- Client, tool, system projects still need _project.md populated and seeded to Sanity
