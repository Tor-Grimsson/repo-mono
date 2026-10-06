# Session: CDN hostname bulletin

**Date:** 2026-08-27
**Agent:** Grim
**Summary:** Bulletin on the hostnames; then the listing surface moved onto the DS ContentFilters collection, iterated on a pnpm link, filed, shipped by the DS the same day, adopted and deployed.

## Changes Made

### Files Modified
- `~/.dotfiles/claude/packages/scaffold/03-scaffold-llm-context/LLM_RULES.md` — BULLETIN entry: build media URLs on `r2.` / `b2.` / `b2v.`; `media.` is the admin app now (an `<img>` on it 404s); `cdn.` / `vault.` deprecated; repos still carrying old names swap on their next deploy (kol-ds-ui, kol-apps, kol-vault were rewritten 08-15, never redeployed).

## Current State

### Working
- Everything from `2026-08-26-one-view-media-readonly-ds-bumps.md` — live, verified.
- Repo initialised under git by the user (outside the agent's remit).

### Known Issues
- None open in this repo. Retiring `cdn.` / `vault.` from the Worker is an estate concern, now on the bulletin; nothing here waits on it.

## Next Steps
1. Nothing queued.

## Later the same day — ContentFilters collection

- Page width → `max-w-[var(--kol-container-max)] mx-auto breakpoint-padding` with `@kolkrabbi/kol-framework` (0.27.1) installed for `kol-framework.css`; the 1024 `max-w-5xl` was an agent default from 05-05.
- `pnpm link` to `kol-ds-ui/packages/component`; `resolve.dedupe` for react + kol-icons while linked (two copies → "Invalid hook call", empty icon map).
- `FileList.jsx`: bespoke toolbar → `ContentFilters`; `MediaCard`/`MediaRow` → `ContentCard`/`ContentRow` default; plate actions → `ActionButton` glyphs; select box → `ToggleCheckbox`; `handleSort` two-write bug fixed (sortBy never changed, only the arrow). Every layout ruling recorded in the DS ticket.
- DS edits made in the linked tree: `ContentFilters` `layout`/`onLayoutChange`, strip items with `onClick`/`active`/`title`, `trailingActions` + organism divider, `leadingActions`, `belowActions`; `ContentCard` `controlStart`.
- Filed `ContentFiltersCollection` to kol-ds-ui with the consumer JSX verbatim + screenshots. DS closed it same day: component **0.93.0** / theme **0.62.0** — `SortHeader` + `SortControls`, `SizeOrDownload`, `ToggleCheckbox variant="media"`, `.kol-frame-control--top-left`.
- Unlinked, bumped, adopted the three new pieces, dedupe removed, deployed — both hosts on `index-BwYW_dZ0.js`, zero console errors.
- `SettingsPanel` is untouched by this arc (already the DS organism).

## Later still — ColumnBrowser round

- Built `src/ColumnBrowser.jsx` locally (Finder columns as the folder view: preview column with W×H, Table row metrics, 528px, hover fill = selected/cursor, ↑↓←→, space = Quick Look over the column's files with a real index, arrows while the overlay is open). Toggle beside the breadcrumb + `folderView` setting.
- Rulings applied locally then filed: `ContentCard` default no border, flat overlay scrim, overlay caption W×H + `ActionButton` download, title = basename in Flat, select-mode layout stability (32px below row, reserved glyph), last bucket persisted. The "shadow" was an inline style in this repo's lightbox, removed.
- Filed `ColumnBrowser` to kol-ds-ui; closed same day as component **0.96.0** / theme **0.65.0** / icons **0.19.0** (row-thumb ratio defect fixed in 0.94.0). Adopted: DS organism with `urlOf`/`kindOf`/`kindLabel`/`formatSize`/`partition` seams, local file → `_tmp/`, overrides and pins dropped. Deployed.
