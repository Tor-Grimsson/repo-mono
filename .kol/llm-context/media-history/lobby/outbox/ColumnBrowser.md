# ColumnBrowser — the column folder view, plus round-two rulings

**Filed:** 2026-08-27 → **kol-ds-ui**
**Entry:** `~/dev/projects/kol-ds-ui/lobby/inbox/ColumnBrowser.md`
**Ledger:** `~/dev/projects/kol-ds-ui/lobby/INDEX.md` — **the truth about this ticket**
**Last known:** 🟢 `closed` · synced 2026-08-27 — shipped as `kol-component@0.96.0` + `kol-theme@0.65.0` + `kol-icons@0.19.0` the same day

## Why it went there

Built locally first (user ruling): `src/ColumnBrowser.jsx` is a Finder-style
column folder view with a preview column and full keyboard; alongside it four
rulings landed as local overrides on shipped DS pieces — `ContentRow` default's
thumb ratio (a DS defect), the `ContentCard` default border (off), the overlay
scrim (flat), and select-mode layout stability. All of it belongs in the
collection; the ticket carries the source verbatim.

## What stays here

Until it ships, the local versions run (and are deployed). Once it ships:

1. Bump `kol-component` (+ `kol-icons` for the `columns` glyph, `kol-theme` if the
   scrim/border move there).
2. `FileList.jsx`: import the DS `ColumnBrowser`; retire `src/ColumnBrowser.jsx`
   to `_tmp/`; drop the row `<img>` size pin; use the `columns` icon.
3. `index.css`: drop the `.kol-overlay` scrim and `.kol-card` border overrides.
4. Deploy; verify both hosts.

## ✅ RETURNED — 2026-08-27 · kol-component 0.96.0 · kol-theme 0.65.0 · kol-icons 0.19.0

ColumnBrowser shipped verbatim as a kol-component organism — the app bits are seams with defaults (urlOf, kindOf, kindLabel, formatSize, partition; displayKey falls back to the key under the level). Rendered: 528 tall, one column per segment, a file click opens the 320px preview with Kind · Type · Size · Dimensions · Date, → opens the folder's column. kol-icons 0.19.0 ships the columns glyph. ContentCard default carries no border (selected reads from the checkbox). ContentMedia's fit rules reach a consumer wrapper div. .kol-overlay is a flat surface-primary scrim. The row-thumb defect (§2) shipped in 0.94.0 / theme 0.63.0 — every row thumb is a fixed square. §5 (32px below row, reserved glyph, basename title) is consumer wiring and stays yours.

**Remainder here:** bump kol-icons 0.19.0 + kol-theme 0.65.0 + kol-component 0.96.0; swap src/ColumnBrowser.jsx for the DS organism passing urlOf={(o) => publicUrl(o.key)} kindOf={kindOf} kindLabel={KIND_LABEL} formatSize={formatSize} partition={partition}; drop the .kol-overlay and .kol-card overrides, the <img> size pin, and the layout stand-in (icon: 'columns')

## ✅ RETURNED + REMAINDER DONE — 2026-08-27

DS shipped `ColumnBrowser` verbatim as an organism (app bits as seams: `urlOf`, `kindOf`, `kindLabel`, `formatSize`, `partition`), the `columns` glyph (icons 0.19.0), `ContentCard` default without border, `ContentMedia` fit rules reaching a wrapper, flat `.kol-overlay` scrim; the row-thumb defect had shipped in 0.94.0 / theme 0.63.0.

Here: bumped to component 0.96.0 / theme 0.65.0 / icons 0.19.0; `FileList.jsx` imports the DS `ColumnBrowser` with the five seams; `src/ColumnBrowser.jsx` → `_tmp/2026-08-27-columnbrowser-local/`; the `.kol-overlay` / `.kol-card` overrides, the row `<img>` pin and the `layout` stand-in are gone. Deployed.
