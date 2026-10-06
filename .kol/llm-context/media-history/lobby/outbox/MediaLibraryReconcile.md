# MediaLibraryReconcile — the DS page variant converges on FileList's read-only render

**Filed:** 2026-08-26 → **kol-ds-ui**
**Entry:** `~/dev/projects/kol-ds-ui/lobby/done/MediaLibraryReconcile.md`
**Ledger:** `~/dev/projects/kol-ds-ui/lobby/INDEX.md` — **the truth about this ticket**
**Last known:** 🟢 closed 2026-08-26 → kol-component@0.69.0 · kol-theme@0.53.0

> Written by hand: no receipt stub existed here when the ticket closed, so
> `lobby-close` had nothing to append to.

## ✅ RETURNED — 2026-08-26 · kol-component@0.69.0 · kol-theme@0.53.0

The page variant is FileList's read-only render: breadcrumb `root / seg / seg` on top, the stats line (`N folders · N files · size · bucket: N files · size · N system files hidden`, whole-bucket figures at root or in flat), folder rows that ENTER a prefix (`folder` 18 · name · trailing `chevron-right`, hairline, `fg-04` hover; struck in flat), a bare toolbar (filter + search on DS nav Buttons | `Flat` chip · `ViewToggle` icon · vertical Divider · sort labels with `arrow-down` asc / `arrow-up` desc, click active flips), a `.kol-media-grid` at 260px tiles / gap 12, `Show N more · N remaining` paging, Copy URL + ghost `iconOnly="download"` beside the card chip. Props: `pageSize` 60 · `defaultSort` `{ by: 'date', dir: 'desc' }` · `flat`. The provider is PREFIX-SCOPED now (`prefix` / `setPrefix` / `crumbs` / `folders` / `flat` / `kinds` / `search` / `sort` / `sorted` / `shown` / `showMore` / `stats`); paging is keyed to what is listed so entering a folder resets it. Finder's disclose-in-place tree is dropped, not a variant. The picker keeps its ContentFilters chrome and foot path bar and navigates the same way. Measured live over the website bucket in the showcase: root `3 folders · 7 files · 2.6 MB · bucket: 433 files · 1.29 GB`, enter → crumb `labs-render-examples`, Name sort → glyph, Flat → 433 files / 60 tiles / `Show 60 more · 373 remaining` → 120, kind chips with counts, picker folders + path bar, no console errors. BREAKING for `useMediaLibrary()` consumers (`rows` / `expanded` / `toggleFolder` gone).

**Remainder here:** bump kol-component to 0.69.0 + kol-theme 0.53.0; brand `/library` is a bump only (`<MediaLibrary variant="page" client />`). Long-term: FileList = `MediaLibrary` + a writes slot — file it when you want ONE render of the bucket

## ✅ REMAINDER DONE — 2026-08-27

The bump is long past (component 0.108.0 / theme 0.72.0 today; brand `/library` is kol-website's). The long-term half — `FileList` = DS `MediaLibrary` + a writes slot, one render of the bucket — is parked with its trigger at `.kol/llm-plan/02-parked-followups.md`, not open.
