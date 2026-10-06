# PlaybackBarAndAudioSheet — the QuickTime bar as its own molecule, video on it, audio in two variants

**Filed:** 2026-08-27 → **kol-ds-ui**
**Entry:** `~/dev/projects/kol-ds-ui/lobby/inbox/PlaybackBarAndAudioSheet.md`
**Ledger:** `~/dev/projects/kol-ds-ui/lobby/INDEX.md` — **the truth about this ticket**
**Last known:** 🟢 `closed` in kol-ds-ui — kol-component 0.114.0 · kol-theme 0.75.0 · kol-icons 0.23.0, 2026-08-27

## Why it went there
The bar was re-ruled against the QuickTime reference after `PlayDiscAndVideoBar` (0.107.0) shipped — radius, glyph colour, time format, the scrubber and the total readout all changed; the audio sheet is new and needs three glyphs only the set can supply; `readCover` cannot be imported through the package's exports map.

## What stays here
`src/MediaSheets.jsx` (`PlaybackBar`, `VideoSheet`, `AudioSheet`), `src/lib/id3.js`, the `.r2b2-bar` / `.r2b2-scrub` rules in `src/index.css`, the `variant="sheet"` call in `src/FileList.jsx`. On publish: bump; import `VideoSheet` / `AudioSheet` from the DS; the locals go.

---

## ✅ RETURNED — 2026-08-27 · kol-component 0.114.0 · kol-theme 0.75.0 · kol-icons 0.23.0

🟢 `closed` in **kol-ds-ui** — `PlaybackBar` is its own molecule, ruled against the reference: frosted `fg-absolute-48` + blur-xl, radius 12, white glyphs (`.kol-playback-bar`), `mm:ss` elapsed / TOTAL, the native scrubber with the 4 × 28 pill knob (`.kol-playback-scrub`), volume behind the new `speaker`, `>>` (`chevrons-right`) cycling 1 → 1.5 → 2 (`onRate`). Presentational — `usePlayback(onLoaded)` owns the element (`{ ref, handlers, bar }`, exported + `hooks/usePlayback`). `VideoSheet` rides it; `AudioSheet` new, `cover` | `sheet`, the ID3 cover via `readCover`, no cover → the `music-note` square. `readCover` reachable at `@kolkrabbi/kol-component/utilities/id3` (explicit exports entry) and on the barrel. Demos: PlaybackBar (simulated clock), AudioSheet (silent WAV, both variants); the video sheet on the `/sets/preview/kind-preview` page runs the bar over a poster — the showcase carries no video. 21 gates clean; verified in source only.

**Remainder here:** bump kol-component 0.114.0 · kol-theme 0.75.0 · kol-icons 0.23.0; delete `src/MediaSheets.jsx`, `src/lib/id3.js` and the `.r2b2-bar` / `.r2b2-scrub` rules; import `VideoSheet` / `AudioSheet` from the package.

## ✅ RETURNED + DONE — 2026-08-27 · kol-component 0.114.0 · kol-theme 0.75.0 · kol-icons 0.23.0

Bumped. `src/FileList.jsx` imports the DS `AudioSheet` (`variant="sheet"`) and `VideoSheet`; `src/MediaSheets.jsx` and `src/lib/id3.js` → `_tmp/2026-08-27-mediasheets-docpage-local/`, the `.r2b2-bar` / `.r2b2-scrub` rules gone from `src/index.css`. The DS bar carries what the locals could not: `speaker` for volume, `chevrons-right` for the `>>` speed cycle (1 → 1.5 → 2), `music-note` for a coverless audio sheet. Lint, both test files and `pnpm build` green.
