# Session Log: Apparat Pages Expansion & Remotion GridSymbols Composition

**Date:** 2026-03-10
**Status:** In Progress

## Overview

Continued from iframe fix session. Updated remaining 3 iframe pages (KolEditor, KolNoter, KolDistress) with same-origin subdomains and ShellTocCollapsedContext. Created 2 new iframe pages (KolModulator, KolMirror). Removed Frequency Modulator from nav (replaced by Kol Modulator). Created first SVG-based Remotion composition (GridSymbols) — animating hexagon wireframe → circle grid morph → yellow accent symbol transitions.

## Key Accomplishments

### 1. Updated Existing Iframe Pages
**Files:** `apps/web/src/routes/workshop/KolEditor.jsx`, `KolNoter.jsx`, `KolDistress.jsx`

Updated all 3 to match the Kol Radial pattern:
- Subdomain URLs (`editor.kolkrabbi.io`, `noter.kolkrabbi.io`, `distress.kolkrabbi.io`)
- Added `ShellTocCollapsedContext` (right sidebar starts collapsed)
- Changed wrapper from `h-full` to `flex-1 min-h-0` (Suspense height fix)

### 2. New Iframe Pages: Kol Modulator & Kol Mirror
**Files:** `apps/web/src/routes/workshop/KolModulator.jsx`, `KolMirror.jsx`

New iframe embed pages following the same pattern. Sources: `modulator.kolkrabbi.io`, `mirror.kolkrabbi.io`. Both use ShellFullHeightContext + ShellTocCollapsedContext.

### 3. Frequency Modulator Removal
**Files:** `apps/web/src/App.jsx`, `navigation.js`, `HomeApparat.jsx`

Removed Frequency Modulator from sidebar nav, overview cards, and import. Route redirects to `/workshop/apparat/kol-modulator`. Component file (`ApparatusFrequencyModulator.jsx`) kept but no longer routed.

### 4. Navigation Data: Links for All Tools
**File:** `apps/web/src/data/workshop/navigation.js`

Added `links: { live, repo }` field for all 6 tool pages: kol-modulator, kol-radial, kol-editor, kol-noter, kol-distress, kol-mirror. These render as Repository section in WorkshopDefaultSidebar.

### 5. HomeApparat Expanded
**File:** `apps/web/src/routes/workshop/HomeApparat.jsx`

Expanded from 3 cards to 6 (added Kol Noter, Kol Distress, Kol Mirror). Removed Frequency Modulator card.

### 6. Remotion GridSymbols Composition
**File:** `apps/video/src/compositions/GridSymbols.tsx`

First SVG-based Remotion composition. 9-second animation (270 frames at 30fps) on 1920x1080:
- Phase 1 (0–1.5s): Hexagon wireframe draws on with staggered line animation
- Phase 2 (1.5–2.5s): Gold accent strokes draw onto hexagon
- Phase 3 (2.5–3.8s): Hexagon fades, circle grid springs in with staggered internal lines
- Phase 4-6 (4.3–8.5s): Three yellow symbol sets draw on sequentially with crossfades
- Phase 7 (8.5–9s): Final fade out

Techniques used: `strokeDasharray`/`strokeDashoffset` for draw-on, `spring()` for circle entrance, staggered `interpolate()` for line reveals, smooth easing function.

Source SVG: `apps/video/svgs-to-animate/1/code-anim-01.svg` — 4 geometric constructions (hexagon + 3 circle grids with yellow accent symbols).

## Files Modified

### New Files
- `apps/web/src/routes/workshop/KolModulator.jsx` - Iframe embed for modulator.kolkrabbi.io
- `apps/web/src/routes/workshop/KolMirror.jsx` - Iframe embed for mirror.kolkrabbi.io
- `apps/video/src/compositions/GridSymbols.tsx` - Remotion SVG animation composition

### Modified Files
- `apps/web/src/routes/workshop/KolEditor.jsx` - Subdomain URL + ShellTocCollapsedContext + flex fix
- `apps/web/src/routes/workshop/KolNoter.jsx` - Subdomain URL + ShellTocCollapsedContext + flex fix
- `apps/web/src/routes/workshop/KolDistress.jsx` - Subdomain URL + ShellTocCollapsedContext + flex fix
- `apps/web/src/data/workshop/navigation.js` - Added kol-modulator, kol-mirror entries; links for all tools; removed frequency-modulator
- `apps/web/src/routes/workshop/HomeApparat.jsx` - 6 cards (was 3), removed freq modulator, added noter/distress/mirror
- `apps/web/src/App.jsx` - Imports + routes for KolModulator/KolMirror; freq-modulator redirects to kol-modulator
- `apps/video/src/Root.tsx` - Registered GridSymbols composition (1920x1080, 270 frames, 30fps)

## Decisions Made

- **Frequency Modulator replaced by Kol Modulator**: Same concept but Kol Modulator is the standalone repo version. Old route redirects.
- **SVG + Remotion validated**: SVGs inline as JSX in Remotion, animate individual paths with `useCurrentFrame()` + `interpolate()`. Stroke draw-on via dasharray/dashoffset. Works cleanly — no CSS transitions or runtime animation needed.
- **All 6 Cloudflare CNAMEs confirmed set up**: User showed screenshot of DNS records. All subdomains + Vercel custom domains configured.

## Next Steps

- Preview GridSymbols in Remotion Studio, iterate on timing/easing
- Build more compositions from remaining SVGs (folders 2-5, 6-7)
- Consider Kol Mirror per-hall routing when React Router is added to that app
- Remove loose `docs/documentation/remotion/` folder
- Delete dead `ApparatusFrequencyModulator.jsx` file (no longer routed but still on disk)
