# Session Log: ProfileCard Horizontal Variant & Social Icons

**Date:** 2026-03-18
**Status:** Completed

## Overview

Added 8 social SVG icons to `@kol/ui`, built `ProfileCard` component (digital namecard) with 4 size variants, added `lg-h` horizontal variant matching Figma spec, integrated into `StudioAboutCard` with grid layout. Fixed Vite proxy noise and metrics DEV guards.

## Key Accomplishments

### 1. Social Icons Added to @kol/ui
**Files:** `packages/ui/src/atoms/icons/svg/social-*.svg`

Added 8 social icons with `fill="currentColor"`: behance, youtube, linkedin, tiktok, dribbble, facebook, instagram, instagram-2. Auto-registered via Vite `import.meta.glob()` — no manual registry needed.

### 2. ProfileCard Component
**File:** `apps/web/src/components/ui/ProfileCard.jsx`

Digital namecard component. Variants: `xl` (680px vertical), `lg` (480px vertical), `lg-h` (horizontal: 224px panel + 480px photo), `md` (320px), `sm` (200px). Toggle (TogglePill) bottom-left of photo shows/hides info panel. Photo: `#27272F` bg + `mix-blend-mode: lighten`. Drop shadow from Figma. `lg-h` panel slides via `maxWidth` animation, loads closed.

### 3. lg-h Horizontal Variant
**File:** `apps/web/src/components/ui/ProfileCard.jsx`

Panel LEFT (224px, `flex-col justify-between`: logo top, name+email+socials bottom with `gap-8`, icons in a row), photo RIGHT (480×480 square). Toggle hides panel via `maxWidth: 0`. Card loads with `showInfo: false`.

### 4. StudioAboutCard Integration
**File:** `apps/web/src/components/sections/studio/StudioAboutCard.jsx`

`grid grid-cols-2 items-center` layout — fixed equal halves. Card right-aligned in left cell with `overflow-hidden` so panel expands left without moving text. Text left-aligned in right cell.

### 5. FooterSimple Social Icons
**File:** `apps/web/src/components/layout/Footer.jsx`

Social icons (instagram, behance, dribbble, youtube, tiktok) at 16px between copyright and back-to-top.

### 6. CtaGlobal Max-Width Removed
**File:** `apps/web/src/components/sections/cta/CtaGlobal.jsx`

Removed `max-w-[1400px] mx-auto` wrapper.

### 7. Vite Proxy Noise Fix
**Files:** `apps/web/vite.config.js`, `apps/web/src/hooks/useMetricsData.js`

Added `proxy.on('error')` handler in vite.config. Added `if (import.meta.env.DEV) return` guards in both `useEffect` blocks in `useMetricsData.js` to stop API polling in dev.

### 8. FeaturedCarousel Overlay
**File:** `apps/web/src/components/sections/shared/FeaturedCarousel.jsx`

Changed overlay from centered to `items-start pt-[280px]` so card anchors top and expands downward only.

## Files Modified

### New Files
- `packages/ui/src/atoms/icons/svg/social-behance.svg`
- `packages/ui/src/atoms/icons/svg/social-youtube.svg`
- `packages/ui/src/atoms/icons/svg/social-linkedin.svg`
- `packages/ui/src/atoms/icons/svg/social-tiktok.svg`
- `packages/ui/src/atoms/icons/svg/social-dribbble.svg`
- `packages/ui/src/atoms/icons/svg/social-facebook.svg`
- `packages/ui/src/atoms/icons/svg/social-instagram.svg`
- `packages/ui/src/atoms/icons/svg/social-instagram-2.svg`
- `apps/web/src/components/ui/ProfileCard.jsx`

### Modified Files
- `apps/web/src/components/sections/studio/StudioAboutCard.jsx` — grid layout, lg-h variant
- `apps/web/src/components/sections/shared/FeaturedCarousel.jsx` — overlay top-anchored
- `apps/web/src/components/sections/cta/CtaGlobal.jsx` — removed max-width
- `apps/web/src/components/layout/Footer.jsx` — social icons in FooterSimple
- `apps/web/vite.config.js` — proxy error handler
- `apps/web/src/hooks/useMetricsData.js` — DEV guards

## Issues Encountered

### 1. Panel expanding moved text
- **Problem:** Card had no fixed width so it grew/shrank when panel toggled, pushing adjacent text.
- **Resolution:** `grid grid-cols-2` with `overflow-hidden` on left cell — grid columns are fixed, panel clips at boundary.

### 2. Logo clipping in panel
- **Problem:** `panelMaxWidth: 224px` on wrapper + `w-56` inner div caused logo to clip.
- **Resolution:** Removed inner width class, set width/maxWidth directly on the single panel div.

### 3. Panel showing when closed
- **Problem:** Padding still rendered when `maxWidth: 0`, showing a sliver.
- **Resolution:** Added `padding: showInfo ? undefined : '0px'` inline style.

## Next Steps

- Client, tool, system project `_project.md` files populated and seeded to Sanity (carried over)
