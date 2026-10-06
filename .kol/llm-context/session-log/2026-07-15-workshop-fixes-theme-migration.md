# Session: Workshop sidebar/toggle fixes + theme-system migration

**Date:** 2026-07-15 (afternoon arc, follows `2026-07-15-work-surface-ds-adoption-complete.md`)
**Agent:** Grim (Fable 5)
**Summary:** Fixed the workshop right sidebar's lost type classes (vendoring casualty), sized the theme toggle to the DS reference (root cause: baked SVG dims in kol-icons), then migrated web off the elder theme system entirely — kol-framework ThemeToggle writes, a new read-only `useThemeAttr` hook reads, killing the live wrong-hero-video bug.

## Changes Made

### Files Modified
- `apps/web/src/components/workshop/molecules/WorkshopSidebarContent.jsx` + `routes/workshop/Documentations.jsx` — package-parity type classes restored (labels `kol-helper-10 text-meta`, links/actions `kol-mono-14 text-body`); the vendoring of workshop-system back into the site had dropped them (theme CSS is deliberate: `shell-sidebar-*` = layout only, type lives in JSX). A spacing-alignment attempt on top was **reverted on user order** — rows were already numerically identical (playwright-measured); user's "still broken" screenshot was stale HMR (TOC elements stored in ShellLayout state don't hot-swap).
- `apps/web/src/index.css` — `@source` line for kol-workshop (hygiene; ledger #9 is the systemic fix) · theme-toggle shim: `button[aria-label^="Switch to"]` → 36×36, svg → 20×20 (root cause: `mode-toggle-01/02.svg` ship baked `width/height="32px"` attributes, Icon `size` no-ops — ledger #11; shim dies when it ships).
- **Theme migration (8 files):**
  - `components/layout/Navbar.jsx` — both hand-rolled toggles (desktop + mobile) → kol-framework `<ThemeToggle/>`; elder `useTheme` import gone.
  - `hooks/useThemeAttr.js` (new) — read-only effective-theme hook: `data-theme` via MutationObserver, else `prefers-color-scheme`. Never writes.
  - `HomeHero.jsx`, `HomeFoundry.jsx`, `sections/shared/FeaturesCardSection.jsx`, `workshop/animations/InteractivePreview.jsx` — elder `useTheme` → `useThemeAttr`.
  - `index.html` — boot key `theme` → `kol-theme` (framework contract) with one-time legacy carry-over; `.dark` classList write dropped.
  - `packages/ui/css/utilities.css` — the 4 last `.dark`-only selectors (wordmark/logomark filters) widened to `:is([data-theme="dark"], .dark)`.

### Features Added/Removed
- **Wrong-hero bug dead (user-verified):** elder `useTheme`'s hardcoded `'dark'` fallback served the dark hero video on light pages whenever no `theme` key existed. Page and hook can no longer disagree.
- Elder `useTheme`: **zero live consumers** in web (one museum exhibit, `ThemeToggleMoleculePreview`, kept deliberately).
- `docs/DS-CHANGES.md` grew #9 (@source manifest), #10 (sidebar-family rhythm ruling), #11 (mode-toggle SVG clean).

## Current State

### Working
- Build 5/5 green. User-verified: home hero follows the navbar toggle both directions; workshop sidebar type correct; toggle at DS-reference 36/20.
- One theme system: framework toggle writes `data-theme` + `kol-theme`; all readers watch the DOM.

### Known Issues
- **DS publishes pending (user's court):** ledger #1 (WorkListItem `titleClassName`), #8 (WorkCard `metaClassName`), #9 (@source manifest), #11 (mode-toggle SVGs — index.css shim deletes with it). #3 (framework `useTheme` export) is now moot for web — strike or keep as DS nicety.
- **Vendored dead code awaiting go:** `apps/web/src/workshop-system/shell/` + `/compositions/` have zero importers (the localized shell was superseded by the package) — delete candidate.
- `.dark` may still be set transiently by the elder museum exhibit's toggle — harmless (`:is()` pairs cover it).

## Next Steps
1. Delete the vendored workshop-system dead code (needs explicit go).
2. Consume the next kol-content/kol-icons publishes → pass `kol-mono-sm uppercase`/`kol-mono-xs uppercase` seams, delete the toggle shim.
3. Step 4 remainder: collapse `@kol/ui` (layer A/B deletions).
