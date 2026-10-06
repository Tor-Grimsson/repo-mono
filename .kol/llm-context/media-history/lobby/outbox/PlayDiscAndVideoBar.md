# PlayDiscAndVideoBar — the Finder disc, the QuickTime bar, the icon weights

**Filed:** 2026-08-27 → **kol-ds-ui**
**Entry:** `~/dev/projects/kol-ds-ui/lobby/inbox/PlayDiscAndVideoBar.md`
**Ledger:** `~/dev/projects/kol-ds-ui/lobby/INDEX.md` — **the truth about this ticket**
**Last known:** 🟢 `closed` · synced 2026-08-27 — `kol-component@0.107.0` + `kol-theme@0.72.0` + `kol-icons@0.22.0`

## Why it went there
Ruled locally (disc values tuned by the user step by step; the QuickTime bar built from the audio timeline's DS parts) and compiled into one ticket at the user's request, together with the icon variants only the set can supply.

## What stays here
`src/AudioTile.jsx` (`PlayDisc`, `AudioTile`, `VideoTile`, `AudioSheet`, `VideoSheet`), `src/lib/id3.js`, `.r2b2-play` in `src/index.css`, the `renderPreview` audio/video branches in `src/FileList.jsx`. On publish: bump; the local ones go.

## ✅ RETURNED — 2026-08-27 · kol-component 0.107.0 · kol-theme 0.72.0 · kol-icons 0.22.0

(1) PlayDisc: AudioTile / VideoTile carry the Finder disc over full-bleed artwork — .kol-play-disc in kol-theme, declared after the IconFrame variants so nothing is restated; audio artwork = the ID3 cover (readCover promoted verbatim), video = the poster with the media element hidden. (2) VideoSheet promoted verbatim (skip-back-15 · play/pause · skip-forward-15 · elapsed · Slider scrubber with remaining · volume popover). (3) kol-icons: skip-back-15 / skip-forward-15 (the QuickTime badge), skip-back-bold / skip-forward-bold (3px chevrons), slider-01 knobs filled — the 1.5px skip chevrons stay for kol-chess. AudioSheet (cover above the player) not promoted — not in the ask. Verified in source only (no server run, by your rule).

**Remainder here:** bump component 0.107.0 · theme 0.72.0 · icons 0.22.0; drop src/AudioTile.jsx (keep AudioSheet if you want it — or file it), .r2b2-play in index.css, and the renderPreview video/audio branches; import VideoSheet, AudioTile, VideoTile, readCover from @kolkrabbi/kol-component

## ✅ RETURNED + DONE — 2026-08-27 · kol-component 0.108.0 · kol-theme 0.72.0 · kol-icons 0.22.0

Bumped (0.108.0 is the latest; 0.107.0 carried this). `KindPreview` renders the DS `AudioTile` / `VideoTile` — the column's `renderPreview` passes the sibling poster and drops its audio / video branches; the lightbox uses the DS `VideoSheet`. `src/AudioTile.jsx` → `_tmp/2026-08-27-audiotile-local/`, `.r2b2-play` gone from `src/index.css` (the theme's `.kol-play-disc` carries it, no backdrop-filter — the Chrome saturation jump is named there). `AudioSheet` (cover above the player, not in the ask) stays local in `src/FileList.jsx` on `src/lib/id3.js`: the DS `readCover` lives in `utilities/id3.js`, which the package's `./utilities/*` → `*.jsx` exports map cannot reach, and the barrel drags `react-router-dom`. Lint, both test files and `pnpm build` green.
