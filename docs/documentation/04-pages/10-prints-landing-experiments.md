---
title: Prints Landing Page Experiments
type: plan
status: draft
updated: 2026-02-17
description: Compares the production /prints page against two experimental prototypes and lists open decisions on which experimental concepts to adopt.
aliases:
  - prints-landing-experiments
tags:
  - project/kol-monorepo
  - domain/pages
  - domain/prints
---

# Prints Landing Page Experiments

## Overview

Three versions of the `/prints` landing page exist. The production page and two experimental prototypes exploring different interaction models for presenting art prints.

## Pages

### `/prints` — Production (PrintsGridGsap)

The live page. Scroll-driven vertical layout.

**Structure:**
1. GSAP hero (300vh) — 4-column animated marquee, -15deg rotation, varied speeds
2. Breather (100vh) — centered heading + tagline
3. Behind the Print — horizontal scroll strip with 5 editorial cards (varied aspect ratios: tall, wide, square), numbered captions. Currently uses placeholder CDN images. Replace with real process/exhibition photos.
4. About section — centered text block
5. Static gallery grid — 4-column grid, all 24 prints, clickable to detail overlay

**Files:**
- `apps/web/src/routes/Prints.jsx` — route wrapper, slug handling, detail overlay
- `apps/web/src/routes/prints/PrintsGridGsap.jsx` — full page layout
- `apps/web/src/routes/prints/PrintDetailOverlay.jsx` — purchase overlay (shared across all versions)

---

### `/prints-x` — Experimental: "The Drift" (PrintsExperimental)

Horizontal scroll gallery driven by vertical scroll. Disorienting by design.

**Concept:** Prints float at different sizes, rotations, and depths across a massive horizontal plane — like pieces pinned to a studio wall. The user scrolls vertically but the viewport pans sideways.

**Key techniques:**
- GSAP ScrollTrigger with `pin: true` and `scrub: 1` converts vertical scroll to horizontal translateX
- Per-card parallax — each print moves at a different speed based on its `parallaxSpeed` value
- Background color keyframes shift from black to cream to acid yellow to chartreuse and back to black
- Giant vertical "PRINTS" text at 20vw with `mix-blend-difference` for readability across all backgrounds
- `writingMode: 'vertical-rl'` on the title with slower parallax (0.3x scroll speed)

**Structure:**
1. Horizontal drift section (pinned) — 24 prints scattered with varied scale/rotation/position
2. Breather — archival editions text
3. Behind the Print — staggered 12-column masonry grid (editorial layout)
4. Catalog grid — clean 4-column grid with detail overlay

**Files:**
- `apps/web/src/routes/prints/PrintsExperimental.jsx`

---

### `/prints-xx` — Experimental: "The Vault" (PrintsArchitectural)

Fake 3D architectural walkthrough. No images. Duotone red + cream. Pure CSS perspective transforms + GSAP.

**Concept:** A physical journey through five rooms, each a pinned ScrollTrigger section. The user walks down a corridor, turns a corner, climbs stairs, enters a vault, and exits through a collapsing vanishing point.

**Rooms:**

| Room | Name | Technique | Duotone |
|------|------|-----------|---------|
| 1 | The Corridor | `translateZ` on world container, CSS `perspective: 800px`, rotateX/Y walls/floor/ceiling | Red walls, dark floor |
| 2 | The Turn | `rotateY: -90` timeline, cream walls with red stripe accents | Inverted: cream walls, red accents |
| 3 | The Staircase | `translateY` + `rotateX` tilt, 24 numbered step divs with staggered reveal | Alternating red/dark red steps |
| 4 | The Vault | Camera pull-back (`z: 600` to `z: 200`), print names fade in from sides | Red room, cream text |
| 5 | The Exit | `scale: 0.01` + `opacity: 0` collapse, concentric rectangles | Black, single red dot |

**Key techniques:**
- `perspective` + `transformStyle: preserve-3d` on viewport containers
- Walls/floor/ceiling are large divs with `rotateX`/`rotateY` to create 3D room illusion
- Ceiling lights with randomized opacity flicker (GSAP repeat/yoyo)
- All 24 print names displayed as monospace text at varied sizes/weights in the vault
- No images, no CDN — everything is CSS shapes and color
- End card links back to `/prints`

**Files:**
- `apps/web/src/routes/prints/PrintsArchitectural.jsx`

---

## Shared Components

All three pages use the same `PrintDetailOverlay` for the purchase flow (tabbed detail view, size/edition dropdown, PayPal links, shipping region selector).

## Route Registration

All routes are registered in `apps/web/src/App.jsx`:
- `/prints` — inside `SiteLayout` (has header/footer)
- `/prints-x` and `/prints-xx` — unlisted, outside `SiteLayout` (no header/footer), lazy-loaded

## Next Steps

- [ ] Replace placeholder images in `/prints` "Behind the Print" section with real process/exhibition photos
- [ ] Decide which experimental concepts (if any) to adopt for the production page
- [ ] The horizontal scroll from `/prints-x` and the editorial masonry grid could be merged into the production page
- [ ] The architectural walkthrough (`/prints-xx`) could serve as a standalone art piece or loading experience
