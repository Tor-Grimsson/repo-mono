# ColumnBrowserResize — drag the browser's height and each column's width

**Filed:** 2026-08-27 → **kol-ds-ui**
**Entry:** `~/dev/projects/kol-ds-ui/lobby/inbox/ColumnBrowserResize.md`
**Ledger:** `~/dev/projects/kol-ds-ui/lobby/INDEX.md` — **the truth about this ticket**
**Last known:** 🟢 `closed` in kol-ds-ui — kol-component 0.113.0 · kol-theme 0.74.0, 2026-08-27

## Why it went there
The height (`h-[528px]`) and column widths (`w-[260px]`) live inside the DS organism with no seam; the user ruled the drags a DS set, not a consumer hack (native `resize:` rejected).

## What stays here
Nothing built locally. On publish: bump; wire `height` / `onHeightChange` and `onColumnResize` into the per-bucket settings.

---

## ✅ RETURNED — 2026-08-27 · kol-component 0.113.0 · kol-theme 0.74.0

🟢 `closed` in **kol-ds-ui** — `ColumnBrowser` resizes Finder-style: a bottom-edge handle (`row-resize`) and one on every column's right edge, the preview's too (`col-resize`) — 8px hit strips on the borders already there, invisible at rest, `fg-08` on hover / while dragging (`.kol-column-browser-resize-x/-y`, kol-theme 0.74.0), pointer capture, no library. `height` / `defaultHeight` 528 / `onHeightChange(px)` (min 240); `columnWidth` 260 (preview 320) / `onColumnResize(index | 'preview', px)` (min 160). Keyboard + cursor untouched; the showcase demo prints both drags. 21 gates clean; verified in source only.

**Remainder here:** bump kol-component 0.113.0 · kol-theme 0.74.0; persist `onHeightChange` / `onColumnResize` in the per-bucket settings and feed them back as `height` / `columnWidth`.

## ✅ RETURNED + DONE — 2026-08-27 · kol-component 0.113.0 · kol-theme 0.74.0

Bumped. `src/FileList.jsx` passes `height={settings.columnHeight}` + `onHeightChange` and `columnWidth={260}`; `columnHeight` (528) is a new per-bucket setting in `src/lib/settings.js`. Lint, both test files and `pnpm build` green.

**Left open — a per-column width prop.** Widths drag, but the organism seeds every column from one `columnWidth` number and hands back `onColumnResize(index | 'preview', px)` with no way to feed a map in, so the widths cannot survive a reload. Nothing is stored here (a written-never-read setting is worse than none). If the drags should persist, that is a small DS follow-up: `columnWidths` (array-or-map, index + `'preview'`) as the controlled counterpart.
