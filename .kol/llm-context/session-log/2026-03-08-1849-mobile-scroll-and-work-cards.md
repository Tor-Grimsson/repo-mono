# Session Log: Mobile Scroll Fix & Work Card Polish

**Date:** 2026-03-08
**Status:** In Progress

## Overview

Fixed horizontal scroll issues across Home and Work pages on mobile. Addressed `100vw` width usage, missing `overflow-x: clip` on intermediate wrappers, full-bleed padding inconsistencies, and polished Work page project cards with responsive aspect ratios and borders.

## Key Accomplishments

### 1. overflow-x: clip chain (html/body/#root)
**File:** `apps/web/src/index.css`

Changed `overflow-x: hidden` to `overflow-x: clip` on `html, body` and added `#root { overflow-x: clip }`. `clip` prevents scroll without creating a scroll container. `#root` needed separately because mobile Safari doesn't propagate clip through intermediate wrappers.

### 2. Home hero width fix
**File:** `packages/ui/css/components.css`

Removed explicit `width: 100vw` from `.home-hero, .home-hero__frame`. The hero uses `full-bleed` class (negative margins) so block auto width stretches correctly. Also changed `width: 100vw` to `100%` in `.aboutSubtext`.

### 3. Home hero title responsive padding
**File:** `packages/ui/css/components.css`

Replaced fixed `padding: 3rem` + mobile override with responsive breakpoints: `1rem` base, `1.5rem` at md (768px), `2rem` at lg (1024px). Matches site layout padding progression.

### 4. Home gradient section refactor
**File:** `apps/web/src/routes/Home.jsx`

Replaced `w-screen -ml-[50vw] left-1/2` hack with `full-bleed` on wrapper + `absolute inset-0` for gradient. Split content so Instagram stays full-width while WorkshopFeatures/HomeFoundry get `px-4 md:px-6 lg:px-8` padding.

### 5. Work hero overflow containment
**File:** `apps/web/src/components/sections/work/WorkHeroSection.jsx`

Added `overflow-hidden` to flex container wrapping DialRotation to clip SVG wave overflow and orbiting items beyond `h-dvh`.

### 6. btn-control padding
**File:** `packages/ui/css/components.css`

Added missing `padding: 8px 16px` to `.btn-control`. Was absent from CSS despite component docstring.

### 7. Work ProjectCard responsive aspect ratio
**File:** `apps/web/src/components/sections/work/ProjectCard.jsx`

Changed from fixed `h-[440px]` to `aspect-[2/1]` on mobile, `md:h-[440px] md:aspect-auto` on desktop. Mobile cards were appearing ~1:1 (390x440) which looked wrong.

### 8. Work ProjectCard border
**File:** `apps/web/src/components/sections/work/ProjectCard.jsx`

Added `border border-fg-08` to project cards for subtle definition.

## Files Modified

### Modified Files
- `apps/web/src/index.css` — `overflow-x: clip` on html/body + `#root`
- `packages/ui/css/components.css` — home-hero width removed, aboutSubtext width fix, hero title responsive padding, btn-control padding
- `apps/web/src/routes/Home.jsx` — gradient full-bleed refactor, Instagram full-width preserved, inner content padded
- `apps/web/src/components/sections/work/WorkHeroSection.jsx` — overflow-hidden on dial container
- `apps/web/src/components/sections/work/ProjectCard.jsx` — responsive aspect ratio (2:1 mobile, 440px desktop), border-fg-08

## Issues Encountered

### 1. overflow-x: clip on html/body insufficient for mobile Safari
- **Problem:** Horizontal scroll persisted despite clip on html/body
- **Resolution:** Added clip to `#root` as well

### 2. Removing width: 100vw broke hero fill
- **Problem:** `width: 100%` constrained hero to padded parent width
- **Resolution:** Removed explicit width; `full-bleed` negative margins + auto width handles it

### 3. full-bleed wrapper stripped child padding
- **Problem:** Moving full-bleed to gradient wrapper lost site padding on all children
- **Resolution:** Split structure: Instagram stays unwrapped (full-width), other sections get `px-4 md:px-6 lg:px-8`

### 4. ProjectCard fixed height looked square on mobile
- **Problem:** `h-[440px]` on ~390px wide mobile screen appeared ~1:1
- **Resolution:** `aspect-[2/1]` on mobile, fixed height on md+

## Next Steps

- Verify all fixes on real mobile devices (iOS Safari, Chrome Android)
- Check Prints, Studio pages for remaining `100vw` usage
- Test gradient section visual appearance after refactor
