# Session Log: 2026-03-05 — Prints Landing Page Experiments

**Agent**: Claude Opus 4.6
**Status**: Complete

---

## Changes Made

### 1. "Behind the Print" Section on `/prints`
- Added horizontal scroll editorial strip to `PrintsGridGsap.jsx` between breather and about sections
- 5 cards with varied aspect ratios (3:4, 16:10, 1:1), numbered captions, snap scroll
- Uses existing CDN print images as placeholders — ready for real process/exhibition photos
- Fixed missing `cdnBase` constant that broke the page

### 2. Experimental: "The Drift" (`/prints-x`)
- New file: `apps/web/src/routes/prints/PrintsExperimental.jsx`
- Horizontal scroll driven by vertical scroll (GSAP ScrollTrigger pin + scrub)
- 24 prints scattered at varied sizes, rotations, positions with per-card parallax
- Background color keyframes: black → cream → acid yellow → chartreuse → black
- Giant vertical "PRINTS" text with mix-blend-difference, 0.3x parallax
- Below drift: staggered 12-column masonry editorial grid + clean catalog grid
- Shares `PrintDetailOverlay` for purchase flow

### 3. Experimental: "The Vault" (`/prints-xx`)
- New file: `apps/web/src/routes/prints/PrintsArchitectural.jsx`
- Fake 3D architectural walkthrough — no images, pure CSS perspective + GSAP
- Duotone: deep red (#b91c1c) + cream (#f5ebe0) on black
- 5 pinned ScrollTrigger rooms:
  - Room 1: Corridor — translateZ walk-forward, flickering ceiling lights
  - Room 2: The Turn — rotateY -90deg, inverted duotone (cream walls)
  - Room 3: Staircase — 24 numbered steps, camera tilt, staggered reveal
  - Room 4: The Vault — camera pull-back, 24 print names on walls, floating frames
  - Room 5: The Exit — concentric rectangles collapse to vanishing point
- End card with "Browse Collection" link back to `/prints`

### 4. Route Registration
- Added lazy imports for `PrintsExperimental` and `PrintsArchitectural` in `App.jsx`
- Routes: `/prints-x` and `/prints-xx` — unlisted, outside SiteLayout, no header/footer

### 5. Documentation
- Created `docs/prints-landing-experiments.md` — full writeup of all three pages, techniques, file paths, next steps

---

## Files Created
- `apps/web/src/routes/prints/PrintsExperimental.jsx`
- `apps/web/src/routes/prints/PrintsArchitectural.jsx`
- `docs/prints-landing-experiments.md`

## Files Modified
- `apps/web/src/routes/prints/PrintsGridGsap.jsx` — added cdnBase constant + "Behind the Print" section
- `apps/web/src/App.jsx` — lazy imports + routes for prints-x, prints-xx

---

## Decisions
- Experimental pages placed outside SiteLayout (no nav/footer) for full immersion
- Used existing CDN print images as placeholders in editorial section rather than blocking on real photos
- Architectural walkthrough uses inline styles for 3D transforms (CSS perspective not practical via Tailwind)

---

## Next Steps
- [ ] Replace placeholder images in `/prints` editorial section with real process/exhibition photos
- [ ] Evaluate which experimental concepts to adopt for production `/prints`
- [ ] Horizontal scroll + masonry grid from `/prints-x` are candidates for production merge
- [ ] `/prints-xx` could serve as standalone art piece or loading experience
