# ColumnBrowserChromeCorrections — four rulings on the organism's own chrome

**Filed:** 2026-08-27 → **kol-ds-ui**
**Entry:** `~/dev/projects/kol-ds-ui/lobby/inbox/ColumnBrowserChromeCorrections.md`
**Ledger:** `~/dev/projects/kol-ds-ui/lobby/INDEX.md` — **the truth about this ticket**
**Last known:** 🟢 `closed` · synced 2026-08-27 — `kol-component@0.118.3` + `kol-theme@0.79.0`

## Why it went there
All four are corrections to `ColumnBrowser`'s own chrome, not house style — the last column's missing right edge, a single-row column's missing hairline, files muted where folders are not, and the resize wash where the ruled affordance is the SideNav's pill. Described to the kol-website session during `MediaLibraryPages` and expected to ride along; 0.118.1 does not carry them, so they are filed properly.

## What stays here
The whole override block in `src/index.css` (everything but the media-checkbox rule). It was scoped to `.r2b2-columns` until `FileList` retired — the class went with it and every rule silently stopped applying, so it is scoped to the DS classes now. On publish: bump; delete the block.

## ↩ RETURNED — 2026-08-28

Closed in kol-ds-ui as **kol-component 0.118.3** (every column `border-r`; `only:border-b` on a column's single row; file rows drop `muted`) + **kol-theme 0.79.0** (`.kol-column-browser-resize-x/-y::before` = the `.kol-sidenav-grab` pill, hidden at rest, 420ms; the fg-08 wash gone). Values carried as measured. Verified in source only.

Remainder here: bump kol-component ≥0.118.3 and kol-theme ≥0.79.0, then delete the `src/index.css` block (everything bar the checkbox rule).

## ✅ RETURNED + DONE — 2026-08-27 · kol-component 0.118.3 · kol-theme 0.79.0

All four carried, checked in the installed source rather than taken on the message: `ColumnBrowser.jsx:393` is a bare `border-r` (no `last ?` ternary), `:108` adds `only:border-b` beside `last:border-b-0`, `:101` says `muted` stays a prop but the file rows no longer pass it, and `kol-components-molecules.css:1283-1300` is the pill verbatim — 0.1875rem × 2rem, `fg-64`, dead centre, `opacity: 0`, 420ms `cubic-bezier(0.4, 0, 0.2, 1)`, shown on hover and `.is-dragging`, wash gone.

Bumped and the whole override block is deleted. **`src/index.css` is 24 lines** — the imports, the body anchor, and one media-checkbox rule. Lint and `pnpm build` green.
