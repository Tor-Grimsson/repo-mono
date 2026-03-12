# Session Log: Iframe Height Fix, Kol Radial Rename & Sidebar Links

**Date:** 2026-03-10
**Status:** In Progress

## Overview

Fixed critical iframe height bug caused by React 19 Suspense wrapper div breaking flex chain in ShellLayout. Renamed "Radial Editor" to "Kol Radial" across all references. Added Repository links (Live site + GitHub) to WorkshopDefaultSidebar via navigation data `links` field. Created new `ShellTocCollapsedContext` for per-page right sidebar collapse control. Created two new documentation pages (dev servers + creative tooling).

## Key Accomplishments

### 1. React 19 Suspense Wrapper Height Fix
**File:** `packages/ui/src/layout/ShellLayout.jsx`

React 19's `<Suspense>` renders an invisible wrapper `<div>` with `display: block` and `flex: 0 1 auto`, which broke the flex height chain for fullHeight pages (iframe embeds). Discovered via Playwright DOM inspection. Fixed by wrapping `<Suspense>` in a div with `[&>*]` child selectors that force the wrapper to participate in flex layout: `[&>*]:flex-1 [&>*]:flex [&>*]:flex-col [&>*]:min-h-0`.

Also removed redundant `container-type: inline-size` from MainColumn (DashboardGrid and .docs-article already set their own).

### 2. ShellTocCollapsedContext
**File:** `packages/ui/src/layout/ShellLayout.jsx`, `packages/ui/src/layout/index.js`

Created new context allowing individual pages to control whether the right sidebar starts collapsed. Pages use `useContext(ShellTocCollapsedContext)` + `useLayoutEffect` to set collapsed state on mount.

### 3. Kol Radial Rename
**Files:** Multiple (see below)

Renamed "Radial Editor" to "Kol Radial" everywhere — navigation data, route paths, sidebar labels, home highlights, footer test, apparat overview. Added redirect from old `/workshop/apparat/radial-editor` path. Updated iframe src to `https://radial.kolkrabbi.io/` (same-origin subdomain to bypass browser storage partitioning).

### 4. Repository Links in WorkshopDefaultSidebar
**File:** `apps/web/src/components/workshop/WorkshopDefaultSidebar.jsx`

Added detection of `links` field from navigation data children. Renders "Repository" section with Live site and GitHub external links using `shell-sidebar-action` class and `docs-external-link` icon.

### 5. Dev Servers Documentation
**File:** `docs/documentation/01-foundation/1.6.0-dev-servers.md`

New doc cataloging all 4 dev servers (web:5173, studio:3333, foundry:5174, video:3000) with ports, commands, bundlers, and what each serves.

### 6. Creative Tooling Documentation
**File:** `docs/documentation/08-operations/8.6.0-creative-tooling.md`

New doc grouping Remotion video pipeline, Playwright screen recording, GLIF image generation, and Figma MCP captures as creative tooling operations.

## Files Modified

### New Files
- `docs/documentation/01-foundation/1.6.0-dev-servers.md` - Dev servers catalog
- `docs/documentation/08-operations/8.6.0-creative-tooling.md` - Creative tooling operations doc

### Modified Files
- `packages/ui/src/layout/ShellLayout.jsx` - Suspense wrapper fix, removed container-type, added ShellTocCollapsedContext, flex chain for fullHeight
- `packages/ui/src/layout/index.js` - Export ShellTocCollapsedContext
- `apps/web/src/routes/workshop/ApparatusRadialEditor.jsx` - Iframe src to radial.kolkrabbi.io, uses ShellTocCollapsedContext, flex-1 min-h-0 wrapper
- `apps/web/src/data/workshop/navigation.js` - Renamed radial-editor → kol-radial, added links field
- `apps/web/src/components/workshop/WorkshopDefaultSidebar.jsx` - Repository section with live/repo links from navigation data
- `apps/web/src/App.jsx` - Route path change + redirect from old path
- `apps/web/src/routes/workshop/HomeApparat.jsx` - Kol Radial card rename + path
- `apps/web/src/routes/FooterTest.jsx` - Updated link text and path
- `apps/web/src/components/sections/home/HomeHighlights.jsx` - Updated href
- `docs/documentation/01-foundation/1.0.0-foundation-index.md` - Added 1.6.0 entry
- `docs/documentation/08-operations/8.0.0-operations-index.md` - Added 8.6.0 entry
- `.gitignore` - Minor update

## Issues Encountered

### 1. Iframe 0px Height (React 19 Suspense Wrapper)
- **Problem:** React 19 `<Suspense>` inserts an invisible wrapper `<div>` with `display: block` and `flex: 0 1 auto` that breaks the flex height chain. No way to add classes directly to this div.
- **Resolution:** Wrapped `<Suspense>` in a parent div using `[&>*]` Tailwind child selectors to force the wrapper to `flex-1 flex flex-col min-h-0`. This lets the flex chain pass through to the actual page component.

### 2. Container-type Redundancy
- **Problem:** `container-type: inline-size` on MainColumn's inner wrapper was suspected of causing height issues.
- **Resolution:** Confirmed DashboardGrid and .docs-article already set their own container-type. Removed from MainColumn — was redundant, not the cause but unnecessary.

### 3. First TOC Approach Replaced Default Sidebar
- **Problem:** Using `setTocContent(<Links />)` completely replaced the WorkshopDefaultSidebar with just the links.
- **Resolution:** Switched to data-driven approach: added `links` field to navigation.js children, rendered by WorkshopDefaultSidebar alongside existing sibling nav and quick actions.

## Decisions Made

- **Same-origin subdomains** for iframe embeds (*.kolkrabbi.io via Cloudflare CNAME → cname.vercel-dns.com) to bypass browser dynamic state partitioning
- **`[&>*]` child selectors** as the fix for React 19 Suspense wrapper — documented as tech debt pattern
- **Data-driven links** via navigation.js `links` field rather than per-component overrides
- **ShellTocCollapsedContext** as a general pattern for pages to control right sidebar initial state

## Next Steps

- Update remaining 3 iframe pages (KolEditor, KolNoter, KolDistress) with subdomain URLs
- Add `links` field to navigation data for editor, noter, distress, modulator, mirror
- Apply ShellTocCollapsedContext to other iframe pages
- Add Kol Modulator and Kol Mirror iframe pages
- Remove loose `docs/documentation/remotion/` folder
- Document Suspense wrapper height fix as permanent tech debt note
