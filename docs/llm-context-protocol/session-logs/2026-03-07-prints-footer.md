# Session Log: 2026-03-07 — Prints Rollback + Footer 3-Column

**Agent**: Claude Opus 4.6
**Status**: In Progress

---

## Changes Made

### 1. Prints Page Rollback (`apps/web/src/routes/Prints.jsx`)
- Switched `/prints` back from `PrintsGridGsap` (GSAP animated hero with 4-column marquees) to the original `PrintsGrid` (simple grid with `ContentFilters`)
- `PrintsGridGsap.jsx` preserved for future use, just no longer imported
- Passed `activeSlug` prop to `PrintsGrid` for flip animation support

### 2. Footer 3-Column Layout (`apps/web/src/components/layout/Footer.jsx`)
- Added third "Workshop" column between Menu and Follow
- **Menu** (6 links): Work, Collections, Prints, Stack, Foundry, Studio
- **Workshop** (4 links): Design System, Components, Apparat, Documentation
- **Follow** (5 links): Instagram, Behance, Dribbble, YouTube, TikTok (unchanged)
- Removed fixed `md:w-2/3` from columns container so `md:justify-between` spreads wordmark and link columns to opposite ends
- Staggered reveal delays: 0.1s / 0.15s / 0.2s

---

## Files Changed

| File | Action |
|------|--------|
| `apps/web/src/routes/Prints.jsx` | Modified (switched to PrintsGrid) |
| `apps/web/src/components/layout/Footer.jsx` | Modified (3-column layout, added Prints/Stack to Menu, Workshop column) |

---

## Next Steps
- Review footer on mobile breakpoints (3 columns may need to stack)
- Consider font size adjustment for 3 columns on tablet
- Prints page: decide if GSAP hero is revisited or experimental routes cleaned up
