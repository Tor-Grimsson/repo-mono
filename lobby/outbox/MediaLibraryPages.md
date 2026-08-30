# MediaLibraryPages — MediaLibrary becomes r2b2's Browse + Library

**Filed:** 2026-08-27 → **kol-ds-ui**
**Entry:** `~/dev/projects/kol-ds-ui/lobby/inbox/MediaLibraryPages.md`
**Ledger:** `~/dev/projects/kol-ds-ui/lobby/INDEX.md` — **the truth about this ticket**
**Last known:** 🟢 `closed` · synced 2026-08-27 — kol-component 0.118.0 · kol-media-client 0.2.0

## Why it went there

Brand `/library` renders the 08-26 `MediaLibrary`; r2b2's page is the newer
surface — `ColumnBrowser` (DS) over a forked 868-line `FileList`. User: the
newer components belong in library, split as one page for the filters wall,
one for folder/files, plus a local gallery; bucket is a control, not a page.
The wall promotes from r2b2's source; `kol-media-client` grows `{ bucket }`.

## What stays here

`/library` (Overview) on `MediaLibrary variant="page"` until the return.
`/library/browse` on the DS `ColumnBrowser` directly, fed by `listMedia('')`
— the organism exists today. `/library/local` on the content-card family
over the repo's photo index (brand-local by design, no client).

## Remainder here once it ships

bump kol-component (+ kol-media-client); Overview → `variant="library"`,
Browse → `variant="browse"` (retire the local ColumnBrowser page); bucket
dropdown lists all three if the client can.

## ✅ RETURNED — 2026-08-27 · kol-component 0.118.0 · kol-media-client 0.2.0

`MediaLibrary variant="browse"` (ColumnBrowser + bucket dropdown) and `variant="library"` (the content-filters wall) — r2b2's app cut in two, read-only on a read client; `variant="page"` aliases `library` one release. `createMediaClient({ buckets })` lists a named bucket.

**Remainder here:** ✅ executed 2026-08-27 same session — bumped both; `lib/mediaClient.js` = one client over the three buckets (all read-only here); Overview on `variant="library"` (Open admin in `headerActions`), Browse on `variant="browse"`; the local ColumnBrowser page retired to `_tmp/2026-08-27-library-pages-elder/`.
