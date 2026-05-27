# Session: Landing hero swap + SideNav collapse scoping

**Date:** 2026-05-04
**Agent:** Grim
**Summary:** Swapped Landing hero image to a kol-style frame; fixed SideNav so auto-collapse is scoped to /editor only and never bleeds into other routes.

## Changes Made

### Files Modified
- `src/pages/Landing.jsx` — `HERO_IMAGE` switched from `/images/kol-photoshoot/thg-01.jpg` to `/images/kol-style/tt-01/05.jpg`.
- `src/components/framework/SideNav.jsx` — dropped `COLLAPSE_KEY` localStorage persistence. Initial state derives from `isEditor`. One route-driven `useEffect` sets `collapsed = isEditor` on every navigation. Manual chevron toggle still works but is session-only (next route change resets it).

### Behavior change
- **Before:** sidebar collapse persisted globally via localStorage. Once /editor auto-collapsed, the value was '1' forever — sidebar stayed collapsed on /icons, /styleguide, etc.
- **After:** /editor → collapsed. Anywhere else → expanded. No localStorage involved. Stale `kol-sidenav-collapsed` keys in user browsers are now ignored (harmless dead key).

## Current State

### Working
- Landing renders new kol-style hero.
- Editor auto-collapses on entry; navigating away expands.

### Known Issues
- None known.

## Next Steps
- None tracked.
