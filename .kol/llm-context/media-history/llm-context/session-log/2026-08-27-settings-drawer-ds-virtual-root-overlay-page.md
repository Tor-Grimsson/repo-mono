# Session: Settings drawer locked → DS organism, R2B2 virtual root, baked tree, overlay page

**Date:** 2026-08-27
**Agent:** Claude (Grim)
**Summary:** The settings drawer was ruled to pixel-lock locally, filed as `SettingsPanelApproved`, shipped as component 0.104.0 / theme 0.71.0 and adopted; the column browser gained a virtual `R2B2` root over all three buckets on a baked folder tree; the markdown/code overlay became a bounded 1:√2 page.

## Changes Made

### Files Modified
- `pnpm-workspace.yaml` — `minimumReleaseAgeExclude` pins through component 0.104.0 / theme 0.71.0 / icons 0.20.0 / framework 0.28.0 / media-client 0.1.2 (all installed).
- `src/SettingsPanel.jsx` — thin adapter over the DS `SettingsPanel` organism (`SettingsSection` / `SettingsRow` / `SettingsSwitch` / `SettingsChoice` / `SettingsMulti` / `SettingsFooter`). The locked local composition it replaced sits at `_tmp/2026-08-27-settingspanel-locked/`.
- `src/App.jsx` — bucket `Dropdown` (primary, `w-48`) gains `R2B2 · all`; upload / lock `IconFrame` replaces the read-only text; prefix synced to the URL hash (back arrow works); last bucket in `localStorage`.
- `src/FileList.jsx` — `ColumnBrowser` runs on a virtual key space `R2B2/<bucket>/<key>` with a custom `partition` (baked tree ∪ live folders); breadcrumb `R2B2 / BUCKET / … / file`; stats sum the tree at the root; no loading state; quick-look lightbox uses DS `KindPreview`; cards off on load.
- `scripts/folder-tree.mjs` (new) → `src/data/folder-tree.json` — folder tree + counts per bucket from `manifests/*.tsv`; runs at the end of `media-manifest`; `pnpm folder-tree`.
- `src/lib/settings.js` — store key `kol-r2b2:settings:v2`, `layout` forced `off` on load, `folderView: 'columns'` default.
- `src/lib/media.js` — `markdown` / `json` / `yaml` kinds split out of text; in the default allow-list.
- `src/lib/*.test.mjs` — updated for the above; green.
- `src/index.css` — local overrides pending DS tickets: column seams, first-column highlight, media checkbox border, preview frame top-start + codeblock zoom, **overlay flat scrim + hugging sheet** (`kol-framework.css` ships its own `.kol-overlay` / `.kol-overlay-sheet`), **overlay prose as a 1:√2 page** on `fg-04` that wraps text, tables and code, with `KindPreview`'s `max-w-[70ch]` wrapper neutralised via `:has()`.

### Features Added/Removed
- Settings drawer: pixel-locked by the user, shipped upstream, adopted as the DS organism.
- `R2B2` virtual root in the column browser; folder tree baked, so the column view needs no fetch.
- Overlay: click-away closes, no close button, no shadow, flat scrim; markdown / code previews scaled in the column and paged in the overlay.

## Current State

### Working
- All of the above on `pnpm exec vite --port 5199` (user-run). Tests and lint green.

### Known Issues
- Overlay page wrap fix (the `:has()` neutraliser, last edit) awaits the user's reload verdict.
- `kol-framework.css` overlay rules clash with the theme — overridden locally, not yet filed (local first → approve → ticket).
- Prod is behind: last deploy is the *local* locked drawer; the DS-organism adoption, virtual root and overlay work are not deployed.

## Next Steps
1. User verdict on the overlay page → file one DS ticket (framework overlay clash, preview-frame top-start, overlay page), bump, drop the `src/index.css` overrides.
2. `pnpm deploy`.
