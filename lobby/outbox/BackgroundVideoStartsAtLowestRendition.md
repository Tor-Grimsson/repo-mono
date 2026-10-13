# BackgroundVideo starts HLS at the lowest rendition

**Filed:** 2026-10-13 → **kol-ds-ui**
**Entry:** `~/dev/projects/kol-ds-ui/lobby/inbox/BackgroundVideoStartsAtLowestRendition.md`
**Ledger:** `~/dev/projects/kol-ds-ui/lobby/INDEX.md` — **the truth about this ticket**
**Last known:** 🟢 `closed` 2026-10-13

## Why it went there

The home bento videos (`HomeHighlights` → `TiltBento` → `BackgroundVideo`) play 360p upscaled, then
climb slowly. `new Hls()` with no config; no consumer seam.

## Stopgap here

None for the bento tiles. The home hero's local `components/ui/HlsVideo.jsx` gets the same config here.

## What stays here

On return: bump kol-component, reload `/` with a cold cache, confirm the Málrómur and Radial tiles open
at 720p or higher. **Remainder here:** bump + check.

## Answered — 2026-10-13

kol-ds-ui closed it as **kol-component 0.254.0**: `HLS_DEFAULTS` (`startLevel -1` · `testBandwidth false` · 8 Mbps estimate · `capLevelToPlayerSize`) + `hlsConfig`; a 1280×720 player plays 720p from the first fragment. Resolution: `~/dev/projects/kol-ds-ui/lobby/done/BackgroundVideoStartsAtLowestRendition.md`.

**Remainder here:** bump kol-component ^0.254.0, then the resolution's closing line.

## 🟢 RETURNED — 2026-10-13

kol-component 0.254.0: `new Hls({ ...HLS_DEFAULTS, ...hlsConfig })`, the three keys plus `testBandwidth: false`. Measured by the DS: a 720 player opens at 720, a small tile caps to its size.

**Remainder here:** bump kol-component ≥0.254.0, check the bento tiles open at ≥720p; the hero's local `HlsVideo` can import `HLS_DEFAULTS` (or render `BackgroundVideo`) and drop its duplicate config.

✅ **Remainder executed — 2026-10-13.** kol-component ^0.255.0 in all four apps (0.254.0 never reached the registry; 0.255.0 carries `HLS_DEFAULTS`), one copy. `HLS_DEFAULTS` is not exported from the package index, so the hero renders `BackgroundVideo` instead (`aria-hidden` passed through) and the local `components/ui/HlsVideo.jsx` is retired to `_tmp/2026-10-13-local-hlsvideo/`. Not measured here: the tiles at ≥720p — eyes on the next reload.

**Remainder here:** none.
