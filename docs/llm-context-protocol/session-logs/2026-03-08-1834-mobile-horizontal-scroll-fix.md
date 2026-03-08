# Session Log: Mobile Horizontal Scroll Fix

**Date:** 2026-03-08
**Status:** In Progress

## Overview

Fixed horizontal scroll issues across multiple pages (Home, Work) on mobile. Root causes: `100vw` width not accounting for scrollbar, missing `overflow-x: clip` on intermediate wrappers, and padding inconsistencies in full-bleed sections.

## Key Accomplishments

### 1. overflow-x: clip on html/body
**File:** `apps/web/src/index.css`

Changed `overflow-x: hidden` to `overflow-x: clip`. `clip` prevents horizontal scroll without creating a scroll container, so positioned/transformed children can't trigger scrolling.

### 2. overflow-x: clip on #root
**File:** `apps/web/src/index.css`

Added `overflow-x: clip` to `#root` div. On mobile Safari, `clip` on `html`/`body` alone is insufficient — intermediate wrappers also need it.

### 3. Home hero width fix
**File:** `packages/ui/css/components.css`

Removed explicit `width: 100vw` from `.home-hero, .home-hero__frame`. The hero already uses `full-bleed` class (negative margins) so block-level auto width stretches correctly without `100vw`.

### 4. Home hero title responsive padding
**File:** `packages/ui/css/components.css`

Replaced fixed `padding: 3rem` with responsive breakpoints matching site layout: `1rem` base, `1.5rem` at md (768px), `2rem` at lg (1024px). Removed old max-width media query.

### 5. Home gradient section padding fix
**File:** `apps/web/src/routes/Home.jsx`

Replaced `w-screen -ml-[50vw] left-1/2` full-bleed hack on gradient div with `full-bleed` class on wrapper + `absolute inset-0` for gradient. Added `px-4 md:px-6 lg:px-8` to inner content div to restore site padding lost by `full-bleed` wrapper.

### 6. aboutSubtext width fix
**File:** `packages/ui/css/components.css`

Changed `width: 100vw` to `width: 100%` in `.aboutSubtext` utility.

### 7. Work hero overflow containment
**File:** `apps/web/src/components/sections/work/WorkHeroSection.jsx`

Added `overflow-hidden` to the flex container wrapping DialRotation to clip orbiting items and SVG wave overflow that extended beyond `h-dvh`.

### 8. btn-control missing padding
**File:** `packages/ui/css/components.css`

Added `padding: 8px 16px` to `.btn-control` — was completely missing from CSS despite component docstring claiming it was set.

## Files Modified

### Modified Files
- `apps/web/src/index.css` — `overflow-x: hidden` → `clip` on html/body, added `#root { overflow-x: clip }`
- `packages/ui/css/components.css` — Removed `width: 100vw` from home-hero, responsive hero title padding, `aboutSubtext` width fix, `btn-control` padding
- `apps/web/src/routes/Home.jsx` — Gradient section full-bleed refactor, inner content padding restored
- `apps/web/src/components/sections/work/WorkHeroSection.jsx` — `overflow-hidden` on dial container

## Issues Encountered

### 1. overflow-x: clip insufficient on html/body alone
- **Problem:** Mobile Safari still showed horizontal scroll despite `clip` on html/body
- **Resolution:** Added `overflow-x: clip` to `#root` wrapper as well

### 2. Removing width: 100vw broke hero viewport fill
- **Problem:** Changing `width: 100vw` to `100%` on home-hero made it not fill viewport (contained by padded parent)
- **Resolution:** Removed explicit width entirely — `full-bleed` negative margins + block auto width handles it

### 3. full-bleed wrapper stripped child padding
- **Problem:** Moving `full-bleed` to gradient wrapper caused all inner content (Instagram, Workshop, Foundry) to lose site padding
- **Resolution:** Added `px-4 md:px-6 lg:px-8` to inner content div

## Next Steps

- Verify horizontal scroll fix on actual mobile devices (iOS Safari, Chrome Android)
- Check other pages (Prints, Studio) for remaining `100vw` usage
- Test gradient section visual appearance after refactor
