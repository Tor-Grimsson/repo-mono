# MediaLibraryPages — MediaLibrary becomes r2b2's two surfaces: Browse and Library

**Filed:** 2026-08-27 → **kol-ds-ui**
**Entry:** `~/dev/projects/kol-ds-ui/lobby/done/MediaLibraryPages.md`
**Ledger:** `~/dev/projects/kol-ds-ui/lobby/INDEX.md` — **the truth about this ticket**
**Last known:** 🟢 `closed` in kol-ds-ui — kol-component 0.118.0 · kol-media-client 0.2.0, 2026-08-27

## Why it went there

The two pages are the DS's; r2b2's FileList was the fork.

## What stays here

The swap on the bump (below).

---

## ✅ RETURNED — 2026-08-27 · kol-component 0.118.0 · kol-media-client 0.2.0

🟢 `closed` in **kol-ds-ui** — `MediaLibrary variant="browse"` (the header with the bucket Dropdown from `client.buckets()`, a lock when read-only, settings; the crumb line with ROW | COLUMN; `ColumnBrowser` on the flat key space with the virtual root — the title, then the buckets — and the baked `folderTree` seam; the count line) and `variant="library"` (FileList's wall verbatim minus the app wiring: ContentFilters with FILES · kind chips · search · SELECT / FLAT · grid | list | off · SortControls · the selection bar; ContentCard / ContentRow default with the frame-corner download + SizeOrDownload; paging; the per-bucket cache; the stats line; the inspector lightbox — image · VideoSheet · AudioSheet · DocPage through KindPreview, arrows fixed at the edges; your settings drawer on the DS SettingsPanel). Read-only unless the client carries `deleteObject` / `renameObject` / `downloadUrl`; `settings` / `onSettingsChange` + `defaults` = your per-bucket model (`SETTINGS_BASE`). `variant="page"` is a deprecated alias of `library` for one release. kol-media-client 0.2.0: `createMediaClient({ buckets })` → `listMedia(prefix, { bucket })`, `mediaUrl(key, bucket)`, `buckets()` — whether the worker answers for the B2 buckets from admin. is yours. Your `lib/media.js` + `lib/ratios.js` promoted verbatim to the barrel. 22 gates clean, the showcase builds; verified in source (no server run).

**Remainder here:** bump kol-component 0.118.0 · kol-media-client 0.2.0; build a client with `buckets: BUCKETS` and the write seams (`deleteObject`, `renameObject`, `downloadUrl`) and put App on `<MediaLibrary variant="browse" prefix onPrefix folderTree headerActions>` + `variant="library"`; `FileList.jsx`, `SettingsPanel.jsx`, `lib/media.js`, `lib/ratios.js` retire to `_tmp/`. Confirm the worker's `bucket=` for B2 from admin.

## ✅ RETURNED + DONE — 2026-08-27 · kol-component 0.118.0 · kol-media-client 0.2.0

Bumped both. `src/lib/client.js` (new) is `createMediaClient({ buckets: BUCKETS })` plus the write seams (`deleteObject` · `renameObject` · `downloadUrl`), each stamping `setBucket` first because `src/lib/api.js` resolves the bucket from module state. `src/App.jsx` is the two variants STACKED, not tabbed — the 2026-08-26 one-view ruling stands: `variant="browse"` renders the header (its own dropdown, lock and gear), the crumb line and the columns with `folderTree`; `variant="library"` renders the wall below it with `header={false}`; both share one bucket, one prefix and one settings object, and the app passes its upload `IconFrame` as `headerActions`. Retired to `_tmp/2026-08-27-filelist-retired/`: `FileList.jsx` (834 lines), `SettingsPanel.jsx`, `lib/media.js`, `lib/ratios.js`, `lib/media.test.mjs`. What stays local: the bucket registry + write API, `lib/settings.js` (per-bucket persistence), `UploadZone`, the baked tree, and the column CSS corrections in `index.css`.

Lint, `settings.test.mjs` and `pnpm build` green. **NOT deployed and not browser-verified** — the whole surface changed and this repo's rule is that the user validates live; prod still runs the FileList build.

**Left open:** `KINDS` / `DEFAULT_KINDS` are restated in `src/lib/settings.js` because `@kolkrabbi/kol-component/utilities/mediaKinds` cannot resolve — filed as `MediaKindsExportPath`.
