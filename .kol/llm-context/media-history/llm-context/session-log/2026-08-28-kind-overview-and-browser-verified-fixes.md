# Session: The kind overview, and the first work verified in a browser

**Date:** 2026-08-28
**Agent:** Claude (Grim)
**Summary:** Built the bucket kind-overview overlay, tuned the column browser's Finder manners across many live rulings, adopted `ColumnBrowserSeams` (component 0.119.0 / theme 0.81.0), and — on the user's explicit authorisation — drove the deployed app in Playwright, which found four defects that lint, tests and the build had all passed clean.

## Changes Made

### Files Modified
- `src/KindOverview.jsx` (new) — the overlay behind the grid button beside the settings gear. All 14 kinds in the vocabulary's order, surveyed across **all three buckets** (per-bucket showed eight empty tiles and answered nothing). Each tile previews a real file, with count, weight and home buckets; clicking opens it large in place. Present kinds sort first; kinds nothing holds collapse to a strip.
- `src/App.jsx` — the grid button in `headerActions`; `ThemeChip` portalled into the DS settings-footer beside reset (the drawer hardcodes its footer, no slot); `autoFocus` and `stats={false}` adopted, replacing the mount-focus effect and the CSS that hid the duplicate count.
- `src/index.css` — the Finder row shape re-keyed onto `is-selected` / `is-cursor` after 0.119.0 removed `bg-fg-04`; one-fill ruling (hover and bare cursor paint nothing); grab pill clamped inside its strip; document pages capped at **3:5**; count line split `fg-80` head / `fg-32` tail; the grey close chip; the footer `gap: 0.5rem`.
- `src/lib/settings.js` — `COLUMN_HEIGHT` 800, forced on load so every bucket opens the same height.
- `package.json` — component 0.119.0 · theme 0.81.0 · icons 0.24.0 · framework 0.33.0.
- `lobby/` — `ColumnBrowserSeams` filed and closed 🟢; every receipt is 🟢 with no remainder.

### Features Added/Removed
- The kind overview: what the system can show, and what the buckets actually hold.
- Fonts preview live through `FontFace`; HLS and video show a walked-up still instead of autoplaying.
- Theme toggle returned to the settings drawer footer (it had gone with the retired local adapter).

## Current State

### Working
- Deployed; live CSS bundle hash matches the local build. **Verified in a browser**, measured not eyeballed: ancestors `0.02`, deepest selection `0.04`, unselected and hovered rows transparent; grab pill 2 × 72px, opacity 0 at rest, 1.8s; footer gap 8px; **0 console errors**. Lint and both test files green. 22 CSS hooks audited against the installed DS, 0 dead.

### Known Issues
- Four defects only the browser caught, all now fixed: `KindPreview` has **no image branch** (plain images are the caller's job) so the `image` tile rendered a placeholder; `VideoTile` with no poster draws an unloaded rectangle; the HLS still lives two folders up, not beside the playlist; and the footer `gap` rule had never reached `index.css` at all — it was in a tool call the user interrupted. Three of the four passed lint, tests and build.
- The DS settings drawer has no **Write** section, so `uploadOpen` is no longer editable there. The header button covers it; unfiled.
- kol-framework 0.34.0 is out (SideNav panel leaf) — no-op here, not taken.

## Next Steps
1. **Consumer write access is a decision for the user, not a task.** kol-fxr asked; writes sit behind one shared `ADMIN_PASSWORD` (ARCHITECTURE §4), which a browser app cannot hold. Enabling it means per-app scoped tokens or short-lived signed upload URLs minted here — a change to §4.
2. Decide whether the pill geometry, `is-near` proximity and GSAP motion should become the organism's, or stay local.
