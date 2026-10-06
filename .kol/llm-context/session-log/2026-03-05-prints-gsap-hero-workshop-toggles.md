# Session Log: 2026-03-05 — Prints GSAP Hero + Workshop Expand All

**Agent**: Claude Opus 4.6
**Duration**: ~45 min
**Status**: In Progress

---

## Changes Made

### 1. Workshop: Expand All Toggle — 10 Route Files
Added `allExpanded` and `toggleAll` from `useSectionExpansion` to all workshop pages that were missing it. Each page now passes these as props to `<DesPage>` (or sidebar, per user's subsequent edits).

**Files modified** (2 edits each — destructuring + DesPage props):
- `Animations.jsx`, `ComponentsOrganisms.jsx`, `ComponentsAtoms.jsx`, `ComponentsMolecules.jsx`
- `Icons.jsx`, `Logo.jsx`, `Spacing.jsx`, `Colors.jsx`, `Typography.jsx`, `ChessComponents.jsx`

**Skipped**: `TypeReport.jsx` (no DesPage), `DashboardComponents.jsx` (already done).

**Note**: User subsequently moved the toggle from DesPage header to the right sidebar TOC (WorkshopSidebarContent) in several files — those edits are user-side.

### 2. Prints Page: GSAP River Hero
Replaced the static print grid with an animated gallery hero on `/prints`.

**Architecture**: 4-column vertical marquee using GSAP. Each column scrolls upward at a different speed (22, 28, 34, 38 px/s). Content is duplicated for seamless looping. IntersectionObserver pauses tweens when hero is out of viewport.

**Layout** (top to bottom):
1. **GSAP Hero** (300vh, full width) — 4 columns of print cards flowing upward, rotated -15deg, scaled 1.3x, overflow hidden
2. **Breather** (100vh) — centered display heading "Prints" + description sentence
3. **About section** — archival print details
4. **Static gallery grid** (max-w-1600px) — clickable PrintGridCards for browsing

**New files**:
- `apps/web/src/routes/prints/PrintsGridGsap.jsx` — GSAP river + page layout
- `packages/ui/src/molecules/PrintGridCardGsap.jsx` — simplified card (no hover effects, forwardRef)

**Modified files**:
- `apps/web/src/routes/Prints.jsx` — swapped `PrintsGrid` import for `PrintsGridGsap`

**Original files preserved**: `PrintsGrid.jsx` and `PrintGridCard.jsx` untouched for comparison.

### 3. PrintGridCard: Removed Hover Effects
Original `PrintGridCard.jsx` had zoom (scale 1.05) + dark overlay + title on hover. Removed the zoom and overlay — card now shows image only. (This edit is on the original file, separate from the Gsap copy.)

---

## Decisions & Notes
- **No flip animation on cards** — Experimented with Y-axis 3-face flip (artwork → print → certificate) but concluded the cleanest gallery approach is no hover effect. Detail overlay handles multi-image viewing.
- **GSAP pauses off-screen** — IntersectionObserver on the hero container pauses/resumes all column tweens for performance.
- **`will-change: transform`** — Applied to column wrappers for GPU compositing.
- **Column speeds are fixed, not random** — Intentional differentiation (22/28/34/38 px/s) rather than seeded randomness.
- **24 prints in data** — User mentioned 30 CDN prints; only 24 exist in `prints.js`. May need to add 6 more from CDN manifest.

---

## Open Items
- [ ] Add remaining 6 CDN prints to `prints.js` (user says 30 exist)
- [ ] Performance tuning — user reports some jank at 2160px on 24" monitor
- [ ] Toggle atom refactor — extract toggle indicator from ToggleSwitch into `packages/ui/src/atoms/Toggle.jsx` with 3 sizes (deferred, was discussed but not started)
- [ ] Finalize breather/about copy
- [ ] Decide if original PrintsGrid.jsx should be deleted or kept as fallback
