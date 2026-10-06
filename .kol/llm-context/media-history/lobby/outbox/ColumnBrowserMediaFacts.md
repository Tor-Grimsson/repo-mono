# ColumnBrowserMediaFacts — Dimensions + Length in the preview facts

**Filed:** 2026-08-27 → **kol-ds-ui**
**Entry:** `~/dev/projects/kol-ds-ui/lobby/inbox/ColumnBrowserMediaFacts.md`
**Ledger:** `~/dev/projects/kol-ds-ui/lobby/INDEX.md` — **the truth about this ticket**
**Last known:** 🟢 `closed` · synced 2026-08-27 — `kol-component@0.106.0`

## Why it went there
The facts list (Kind · Type · Size · Dimensions · Date) is built inside the DS `ColumnBrowser` `Preview` with no consumer slot; `renderPreview` only replaces the media frame. Video pixel size and audio/video length can't be added from here.

## What stays here
`renderPreview` in `src/FileList.jsx` (bare cover `<video>`, `AudioTile`, images, markdown + frontmatter) and `src/AudioPreview.jsx` until the DS ships them. On publish: bump; drop the video / audio / image branches and `AudioPreview.jsx` for the DS versions.

## ✅ RETURNED — 2026-08-27 · kol-component 0.106.0

ColumnBrowser facts: Kind · Type · Size · Dimensions (image + video) · Length (audio + video, m:ss) · Date — both off loadedmetadata captured on the media frame, so consumer renderPreview nodes count. AudioPreview · AudioTile · VideoTile promoted verbatim from kol-r2b2 (the current ruled versions — VideoTile with its play/pause control, not the ticket's native controls); KindPreview's video branch is VideoTile, its audio branch AudioTile; formatLength exported. Verified in source only (no server run, by your rule).

**Remainder here:** bump kol-component 0.106.0; swap src/AudioPreview.jsx for the DS exports (AudioPreview, AudioTile, VideoTile, formatLength from @kolkrabbi/kol-component) and drop the local file; the renderPreview video/audio branches can go — KindPreview renders the tiles now

## ✅ RETURNED + DONE — 2026-08-27 · kol-component 0.106.0

DS: facts are Kind · Type · Size · Dimensions (image + video) · Length (audio + video) · Date off `loadedmetadata` captured on the frame; `AudioPreview` / `AudioTile` / `VideoTile` / `formatLength` promoted from here; KindPreview renders the tiles. Here: bumped; overlay player and `formatLength` are the DS exports; the local video branch is gone; `src/AudioPreview.jsx` retired to `_tmp/2026-08-27-audiopreview-local/`. **Left local:** `src/AudioTile.jsx` — the DS tile plus the embedded ID3 cover (`src/lib/id3.js`), unruled; follow-up ticket once ruled.
