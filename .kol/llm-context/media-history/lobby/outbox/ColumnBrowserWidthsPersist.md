# ColumnBrowserWidthsPersist — the width drags report but cannot be restored

**Filed:** 2026-08-27 → **kol-ds-ui**
**Entry:** `~/dev/projects/kol-ds-ui/lobby/inbox/ColumnBrowserWidthsPersist.md`
**Ledger:** `~/dev/projects/kol-ds-ui/lobby/INDEX.md` — **the truth about this ticket**
**Last known:** 🟢 `closed` in kol-ds-ui — kol-component 0.115.0, 2026-08-27

## Why it went there
`ColumnBrowserResize` gave `height` a controlled pair but left widths with an out-callback and no way in, so per-column widths cannot survive a reload. Only the organism can close that.

## What stays here
Nothing local — no width setting is stored (a written-never-read key is worse than none). On publish: bump; add `columnWidths` to the per-bucket settings and pass it beside `onColumnResize`.

---

## ✅ RETURNED — 2026-08-27 · kol-component 0.115.0

🟢 `closed` in **kol-ds-ui** — `columnWidths` — the controlled counterpart to `onColumnResize`: a map keyed by column index plus `'preview'` (`{ 0: 300, 2: 190, preview: 420 }`), the shape the callback reports; a key with no column is ignored, an unnamed column falls back to the drag state, then `columnWidth`. Unset = 0.113.0's behaviour; no render change. 21 gates clean; verified in source.

**Remainder here:** bump kol-component 0.115.0; store the `onColumnResize` map per bucket beside `columnHeight` and pass it back as `columnWidths`.

## ✅ RETURNED + DONE — 2026-08-27 · kol-component 0.115.0

`columnWidths` is the controlled counterpart: a map keyed by column index plus `'preview'`, unset = 0.113.0's behaviour. Bumped 0.114.0 → 0.117.0 (+ kol-theme 0.78.1); `src/FileList.jsx` passes `columnWidths={settings.columnWidths}` beside `onColumnResize`, and the local restore — a constant per-column offset applied as `width !important`, plus its `<style>` tag and bucket-stamped live state — is gone. Per-column widths now survive a reload for real. Lint, both test files and `pnpm build` green. Heard from kol-website's session, not the ledger.
