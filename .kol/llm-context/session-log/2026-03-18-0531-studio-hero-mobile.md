# Session Log: Studio Hero Mobile Fix

**Date:** 2026-03-18
**Status:** In Progress

## Overview

Fixed Studio page hero for mobile. Separated the ProfileCard contact card from the hero overlay into the StudioProcessCard section below. Simplified hero text, added background blur for legibility, and made the contact card responsive (vertical on mobile, horizontal on desktop).

## Key Accomplishments

### 1. Moved ProfileCard from Hero to Process Section
**Files:** `StudioAboutCard.jsx`, `StudioProcessCard.jsx`

Removed ProfileCard and its grid layout from StudioAboutCard (hero overlay). ProfileCard now lives in StudioProcessCard, replacing the process diagram SVG. On mobile it renders as the vertical `lg` variant at full width; on desktop it uses the horizontal `lg-h` variant.

### 2. Hero Text Legibility
**File:** `StudioAboutCard.jsx`

Added `color-mix(in srgb, var(--kol-surface-primary) 80%, transparent)` background with `backdrop-filter: blur(1px)` to the hero text container. Max-width 600px on desktop, centered. Removed second paragraph to keep hero text concise.

### 3. ProfileCard CDN Image & Blend Mode Removal
**File:** `ProfileCard.jsx`

Changed default image from `/img/contact/thg-05.jpg` to CDN path `asset-library/studio/card-about/studio-about-1200.jpg`. Removed `mixBlendMode: 'lighten'` from both image render paths (vertical and horizontal variants).

## Files Modified

### New Files (untracked, may need cleanup)
- `apps/web/src/components/sections/studio/StudioHero.jsx` — Created during exploration, not currently used in Studio.jsx. Can be deleted.

### Modified Files
- `apps/web/src/components/sections/studio/StudioAboutCard.jsx` — Removed ProfileCard/grid, simplified to text-only with blur background, centered, max-w-600px, removed second paragraph
- `apps/web/src/components/sections/studio/StudioProcessCard.jsx` — Replaced process diagram with ProfileCard, responsive variant (lg mobile / lg-h desktop), full-width on mobile
- `apps/web/src/components/ui/ProfileCard.jsx` — Default image changed to CDN, removed mixBlendMode from both render paths

## Issues Encountered

### 1. CDN Image Path
- **Problem:** Initially used wrong CDN path (`studio-about/` instead of `card-about/`)
- **Resolution:** Found correct path in `docs/documentation/09-cdn/9.6.0-cdn-tree.md`: `asset-library/studio/card-about/studio-about-1200.jpg`

### 2. Image Not Loading in Card
- **Problem:** Changed default image in ProfileCard but StudioProcessCard was passing the old local path explicitly as a prop
- **Resolution:** Removed explicit image prop from StudioProcessCard so it uses the CDN default

## Next Steps

- Delete `StudioHero.jsx` (unused file created during exploration)
- Verify CDN image loads correctly in production
- Test mobile layout end-to-end
- Consider responsive sizing for the `lg-h` ProfileCard variant (fixed 480px photo width may overflow on tablets)
