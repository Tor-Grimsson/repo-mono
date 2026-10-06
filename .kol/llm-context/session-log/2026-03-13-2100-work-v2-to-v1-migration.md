# Session Log: Work V2 → V1 Migration (Promote to /work)

**Date:** 2026-03-13
**Status:** Completed

## Overview

Promoted Work V2 prototype to replace V1 at `/work`. Switched from static data to Sanity CMS queries, archived all V1 dead code, eliminated loading spinner on route transitions, and fixed detail panel to open instantly via Outlet context.

## Key Accomplishments

### 1. Archived V1 Dead Code
**Path:** `docs/a-torg/a-dead-code/work-v1/`

Moved all V1 files out of the active codebase:
- Routes: `Work.jsx`, `WorkDetail.jsx`
- Components: 13 files from `components/sections/work/`, 8 files from `components/sections/work-detail/`
- Static data: `work-v2-static.js`, `projectBridge.js`

### 2. Renamed V2 Routes → /work
**Files:** `apps/web/src/App.jsx`, `apps/web/src/routes/Work.jsx`, `apps/web/src/routes/WorkDetail.jsx`

- Removed V1 route imports, removed `WorkV2` lazy import and `WorkDetailV2` eager import
- Added `Work` (lazy) and `WorkDetail` (eager) imports
- Changed route from `/work-v2` to nested `/work` with `:slug` child
- Updated all internal `Link`/`navigate()` calls from `/work-v2/` to `/work/`

### 3. Switched Data Source: Static → Sanity
**Files:** `apps/web/src/routes/Work.jsx`, `apps/web/src/routes/WorkDetail.jsx`

- Removed static data imports (`STATIC_PROJECTS`, `getProjectsForType`, `SHELF_TYPES`)
- Added `getAllProjects()` fetch via `useState`/`useEffect`
- Mapped Sanity fields: `thumbnail?.url`, `heroVideo?.url || heroImage?.url`, `media[]`, `links[]`, `tags`
- Detail panel uses mixed media gallery (`_type === 'galleryVideo'` for video, `galleryImage` for images)
- Links extracted from `project.links[]` array (Live, Repo, Workshop)

### 4. Eliminated Loading Delay on Detail Open
**File:** `apps/web/src/routes/WorkDetail.jsx`

- Parent passes projects via `<Outlet context={{ projects }} />`
- Detail reads from `useOutletContext()` — instant render, no fetch needed
- Fallback fetch for direct URL access (bookmarks, shared links)
- `WorkDetail` is eager-imported (not lazy) to eliminate chunk download lag

### 5. Killed RouteLoader Spinner
**File:** `apps/web/src/components/layout/RouteLoader.jsx`

- Was a full-screen `z-[100]` spinner overlay firing for 500ms on every route change
- Replaced with no-op (`const RouteLoader = () => null`)

### 6. Updated Layout References
**Files:** `apps/web/src/components/layout/SiteLayout.jsx`, `apps/web/src/components/layout/Navbar.jsx`

- Changed `isWorkV2` → `isWork`, pathname check from `/work-v2` to `/work`
- Background `bg-surface-secondary` applied on `/work` routes
- Navbar hides on `/work` (immersive mode)

### 7. Updated Favicon
**File:** `apps/web/index.html`

- Changed favicon reference from `/svg/logo.svg` to `/svg/favicon.svg`

## Files Modified

### New Files (archived)
- `docs/a-torg/a-dead-code/work-v1/routes/Work.jsx`
- `docs/a-torg/a-dead-code/work-v1/routes/WorkDetail.jsx`
- `docs/a-torg/a-dead-code/work-v1/components/work/` (13 files)
- `docs/a-torg/a-dead-code/work-v1/components/work-detail/` (8 files)
- `docs/a-torg/a-dead-code/work-v1/data-work-v2-static.js`
- `docs/a-torg/a-dead-code/work-v1/data-projectBridge.js`

### Modified Files
- `apps/web/src/App.jsx` — Route config: removed V1/V2 imports, added Work/WorkDetail, nested routes
- `apps/web/src/routes/Work.jsx` — Sanity data, renamed paths, passes context to Outlet
- `apps/web/src/routes/WorkDetail.jsx` — Outlet context, Sanity field mapping, fallback fetch
- `apps/web/src/components/layout/SiteLayout.jsx` — Pathname check `/work-v2` → `/work`
- `apps/web/src/components/layout/Navbar.jsx` — Pathname check `/work-v2` → `/work`
- `apps/web/src/components/layout/RouteLoader.jsx` — Replaced with no-op
- `apps/web/src/components/work/ProjectListItem.jsx` — `services` → `tags`
- `apps/web/index.html` — Favicon path updated

## Issues Encountered

### 1. RouteLoader Blind Spinner
- **Problem:** Full-screen spinner overlay with 500ms delay fired on every route change, including work detail open
- **Resolution:** Replaced entire component with no-op. No route needs a blind timer overlay — components handle their own loading states.

### 2. Detail Panel Fetching Redundantly
- **Problem:** Detail was firing `Promise.all([getProjectBySlug(slug), getAllProjects()])` even though parent already had all project data loaded
- **Resolution:** Used React Router Outlet context pattern — parent passes projects, child reads immediately. Fallback fetch only for direct URL access.

### 3. Nested Archive Directories
- **Problem:** `mv` command created double nesting (`work/work/`, `work-detail/work-detail/`)
- **Resolution:** Moved contents up one level, removed empty nested dirs

## Next Steps

- Clean up `apps/web/public/work-v2/` static assets (no longer needed)
- Replace SiteLayout pathname check with LayoutContext hook (tech debt item)
- Review work page for any remaining issues (user mentioned "its all messed up" but then concluded session)
