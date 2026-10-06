# Session: The /icons control set — four DS round-trips, zero local CSS left

**Date:** 2026-08-28
**Agent:** Grim
**Summary:** Brand `/icons` got its header control cluster (size dropdown · settings · theme toggle · ground toggle · GUIDE/CLEAR) and its catalog cards tuned on the page wash. Every fix was a DS gap: four tickets filed to kol-ds-ui, all four returned and consumed the same session, and the local stylesheet that carried them is retired.

## Changes Made

### Files Modified
- `apps/brand/src/pages/IconsGallery.jsx` — the control cluster passed to `PageHeader` as `actions` with `subtitleMaxWidth="800px"` (the lede sits back inside the component); `tone="sunken"` on every control; `plateRule={false}` on the catalog card; LIST/GRID dropped to `kol-helper-12`; the size dropdown is `w-48`
- `apps/{web,brand}/package.json` — component `^0.119.0 → ^0.121.1` · theme `0.81.0 → 0.83.0` · framework `^0.34.0 → ^0.35.0` · shell `^0.14.0 → ^0.15.0` (brand)
- `apps/brand/src/index.css` — the `controls-tone.css` import came and went in the same session
- `lobby/` — four entries in kol-ds-ui's inbox + ledger rows, four receipts here, four rows and three history lines

### Features Added/Removed
- **Added:** two icon-container buttons (settings · theme toggle) beside the size dropdown, on the DS `sm` rung
- **Removed:** `apps/brand/src/styles/controls-tone.css` → `_tmp/2026-08-28-icons-controls-tone/`. Six local rules at its peak; zero at the end

### The Content-Set retirement — kol-website is CLEAR
- `WorkCard` in `routes/WorkDetail.jsx` (the "More Work" carousel at the page foot) was the LAST deprecated card in the repo. It survived every sweep because each one swept the `/work` LISTING and marked the repo done on that evidence — the detail route was never opened. Now `ContentCard variant="work"`, with `WORK_TITLE_FACE` + `TYPE_LABELS` exported from `Work.jsx` so the face has one home
- Stack's featured hero was already `ContentCard variant="article" hero` — that checklist box was **stale, not open**
- Full scan of both apps: zero imports and zero call sites of all eight (`ListingCard` · `ArticleCard` · `WorkCard` · `WorkListItem` · `PrintGridCard` · `TypefaceLibraryItem` · `MediaRow` · `MediaCard`). `GridCard` in `DashboardComponents.jsx` is kol-dashboards' layout span component — different thing, not in the wave
- kol-ds-ui's `ContentSetRetirement` checklist ticked for this repo

## Current State

### Working
- `/icons` renders entirely on DS chrome — no local CSS, no `!important`, no negative-margin correction, no hand-rolled fill
- component 0.121.1 · theme 0.83.0 · framework 0.35.0 · shell 0.15.0 in both apps, `pnpm why kol-component` → **Found 1 version**, brand builds green

### Known Issues
- **Verified in source + build only.** Every visual on this page is owed the user's eyes on a restarted server
- DS ceiling flagged by kol-ds-ui: the newly-inset `ViewToggle` well bleeds 4px past a row's outer edge when the toggle is first or last. Mid-row on `/icons`, so nothing reads wrong here — file it if a gutter ever shows it
- **`--kol-fg-*` is the INK, not a plate.** Ruled mid-session to move the sunken fill onto the relative family; in dark theme `fg-24` is 24% *white*, so the icon buttons lightened and stopped matching the dropdown. A sunken plate is a surface role — the shipped tone keeps `fg-absolute-24` for the well and `fg-08` for the active chip
- **A sweep that measures one route and marks the repo done is how `WorkCard` survived three "complete" claims.** The scan is per-import, both apps, or it is not a scan
- The session cost far more round trips than the diff deserved — several instructions were read as value changes when they were layout changes, and one sequence went full circle back to the original markup

## Next Steps
1. Eyeball `/icons` on a restarted brand server — the four DS bumps are new in the graph
2. The other three surfaces still off the control-set family: `/library`'s bucket controls, `/slide-deck`, `/icons/:set`
3. `tone="sunken"` is the estate-wide name now — the other repos' `tone="inverse"` call sites are aliased, not broken, and can move at their own pace
