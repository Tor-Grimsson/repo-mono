# Session: Mobile audit round two — 27 screenshots, thirteen DS round-trips, zero local overrides left

**Date:** 2026-08-31 → 2026-09-01
**Agent:** Grim
**Summary:** A live mobile review of `/` turned into thirteen kol-ds-ui tickets, all shipped and consumed the same session. `apps/web/src/styles/ui.css` ends with **zero** local rules over DS chrome for the first time in this arc.

## Changes Made

### Files Modified
- `apps/web/package.json` · `apps/brand/package.json` — component `^0.143.0 → ^0.149.0` · theme `0.111.0 → 0.116.0` · workshop `^0.24.1 → ^0.25.0`
- `apps/web/src/routes/Home.jsx` — six page wrappers converged on `.kol-page`; `ButtonGroup` wrapping for the CTAs; per-feature zoom via `useFeatureCards`
- `apps/web/src/hooks/useFeatureCards.js` — `zoom: 1.08` on the four line-art features
- `apps/web/src/components/sections/home/HomeAbout.jsx` — `animatedTitle` added to `containerClass`; eyebrow clamped
- `apps/web/src/components/sections/home/HomeInstagram.jsx` — gutter moved off the marquee onto the label
- `apps/web/src/components/sections/home/HomeWorkshop.jsx` — own gutter, `ButtonGroup` sizes/variants, `tone="sunken"`
- `apps/web/src/components/sections/home/HomeFoundry.jsx` · `HomeSignup.jsx` — CTA `lg`; `fullBleed` + `controlSize="lg"`
- `apps/web/src/components/layout/Navbar.jsx` — opacity follows `isVisible`, not `isHovered`
- `apps/web/src/routes/Studio.jsx` · `foundry/FoundryTypefaces.jsx` · `Stack.jsx` — heroes clear the navbar
- `apps/web/src/styles/tokens.css` — new `--kol-nav-h: 68px`
- `apps/web/src/styles/ui.css` — ten stopgaps written, **all ten removed** by session end
- `apps/web/src/routes/workshop/WorkshopIntroduction.jsx` · `EmbedOverview.jsx` — `minmax(min(22rem,100%),1fr)`
- `apps/web/vite.config.js` — `resolve.dedupe` + kol-theme in `optimizeDeps.exclude` (for `kol-link`)
- `_tmp/2026-09-01-hook-retired/useMobileActiveCard.js` — retired once the DS shipped the shared attention state

### Filed and consumed — thirteen tickets, all 🟢
`InputTypeScaleZoomsIOS` · `TagModeOverlayIgnoresQuery` · `CardFeatureVisualCollapses` ·
`TiltBentoCoarseRevealInView` · `SectionNewsletterMobileMeasure` · `SectionSplitVisualWidth` ·
`SectionNewsletterControlSize` · `ButtonGroupResponsiveGap` · `CardFeatureZoomScale` ·
`SectionNewsletterFullBleed` · `CardSetInViewAttention` · `SectionFamilyFullBleed` ·
`ContentGridMinColumnWidth`

## Current State

### Working
- Every content section at gutter **20** (390) / **48** (1280), no overflow at either width
- Newsletter card: fill edge-to-edge, form inset, controls `lg`, min-height 422 → 245
- One feature card stamped `data-attention` at a time on touch, zoom 1.08 on line-art / 1.03 elsewhere
- TiltBento: one card open at a time, title-only at rest, from the package
- `/stack` `/work` `/prints` checked after `ContentCollectionMinColumnWidth` — no column moved
- Build green, one DS copy under the app

### Known Issues
- **Nothing is pushed.** All of the above is working-tree only; the live site is unchanged.
- **Twelve findings still open** — board: artifact `f9d44f07`. Never filed: the two ContentFilters gaps (B1, B1b), the `/prints` year facet (D1), the card-height ruling (C6, lever never chosen). Never traced: print overlay images (B2 — cause found, fix never made), system-sans tag row (C1), studio about-card crop (C5). Cosmetic: empty "More work" band (D4).
- **Four new, measured, unfiled** — workshop search overlay (E1–E4), see plan §E.

### Three laws this session bought
- **A screenshot is not a measurement, and a measurement of the wrong element is worse than none.** I reported "images are fine" off a DOM read that had walked to the wrong node, twice. Verify the selector matched the visible element.
- **The preloader blanks every headless screenshot.** `fixed z-[100]`, waits on the hero video, never lifts without an h264 decoder. Strip it before capturing or you photograph a black splash and conclude nothing.
- **Test viewport HEIGHT, not just width.** `SectionSplitVisualWidth` reproduced only at 700 and 667, never at 844 — browser chrome puts a real phone in that band. Four reports and a wrong "cannot reproduce" before I varied it.

## Next Steps
1. **Push.** Nothing else ships until then.
2. File E1–E3 (search input auto-zoom missed by the 16px floor · backdrop tap does not dismiss · unwanted 1px blur); measure E4's status rows first.
3. Take the B/C remainder in one pass rather than one at a time.
