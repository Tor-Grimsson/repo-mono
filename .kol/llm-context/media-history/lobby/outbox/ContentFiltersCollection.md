# ContentFiltersCollection — the listing surface on the collection

**Filed:** 2026-08-27 → **kol-ds-ui**
**Entry:** `~/dev/projects/kol-ds-ui/lobby/inbox/ContentFiltersCollection.md`
**Ledger:** `~/dev/projects/kol-ds-ui/lobby/INDEX.md` — **the truth about this ticket**
**Last known:** 🟢 `closed` · synced 2026-08-27 — shipped as `kol-component@0.93.0` + `kol-theme@0.62.0` the same day

## Why it went there

`src/FileList.jsx` now renders on `ContentFilters` + `ContentCard`/`ContentRow`
default, built against a **pnpm link** to `~/dev/projects/kol-ds-ui/packages/component`.
The slots the swap needed were added in that linked tree (unpublished), and three
pieces don't exist in the DS yet: `SortHeader`/`SortControls`, `SizeOrDownload`,
an on-media `ToggleCheckbox` variant. All of it is DS work; the ticket carries the
consumer JSX verbatim so the published result renders identically.

## What stays here

Until it ships, this repo stays on the link — **do not `pnpm deploy`**:
`package.json` still says `kol-component ^0.78.0`, and the build would bundle
the unpublished tree.

Once it ships:

1. `pnpm unlink @kolkrabbi/kol-component`, pin + bump `kol-component` (and
   `kol-theme` for `.kol-frame-control--start`) in `pnpm-workspace.yaml`
   `minimumReleaseAgeExclude`.
2. `FileList.jsx`: replace local `SORT_OPTIONS`/`SortControls` with the DS
   `SortControls`; `size={formatSize(o.size)}` → `SizeOrDownload`; `ToggleCheckbox`
   → the on-media variant. Stop importing nothing else — `MediaCard`/`MediaRow`
   are already gone.
3. `vite.config.js`: drop `resolve.dedupe` (only needed while linked).
4. Deploy; verify both hosts against the linked rendering.

## ✅ RETURNED — 2026-08-27 · kol-theme 0.62.0 · kol-component 0.93.0

The linked working-tree edits were already in the tree and have shipped in every kol-component since 0.86.0 (ContentFilters layout/onLayoutChange, strip items with onClick/active/title, trailingActions + Divider, leadingActions, belowActions; ContentCard controlStart) — controlStart now rides the theme's existing .kol-frame-control--top-left (same rule you asked for as --start), no inline style. New: SortHeader atom + SortControls molecule (click inactive → asc, click active → flip, one onSort per click; measured: one arrow on the active field, asc ≠ desc, rest desc == flipped desc), SizeOrDownload atom promoted verbatim with a real href (measured: size 1/label 0 at rest → 0/1 on hover, glyph 20px, 2s confirm kept), ToggleCheckbox variant=media (unchecked box on the media control's oq-12 plate, border transparent; checked unchanged — measured).

**Remainder here:** bump kol-theme 0.62.0 + kol-component 0.93.0; replace the local SortControls/SORT_OPTIONS with the DS pair (SORT_OPTIONS becomes the options prop); size={<SizeOrDownload href={downloadUrl(o.key)}>{formatSize(o.size)}</SizeOrDownload>}; ToggleCheckbox variant="media"; stop importing MediaCard/MediaRow; nothing else changes

## ✅ RETURNED + REMAINDER DONE — 2026-08-27

DS closed it same day: the six linked-tree slots had already shipped (≥0.86.0); new `SortHeader` atom + `SortControls` molecule, `SizeOrDownload` atom (real `href`), `ToggleCheckbox variant="media"`, `controlStart` on the theme's `.kol-frame-control--top-left`.

Here: unlinked, bumped to `kol-component@0.93.0` / `kol-theme@0.62.0` (pinned past the release-age gate). `FileList.jsx`: local `SortControls` retired for the DS pair (`SORT_OPTIONS` is its `options`), the card's `size` slot is `SizeOrDownload`, the select box is `ToggleCheckbox variant="media"`; `vite.config.js` lost the link-only `resolve.dedupe`. Zero console errors on the published packages; deployed, both hosts on `index-BwYW_dZ0.js`.
