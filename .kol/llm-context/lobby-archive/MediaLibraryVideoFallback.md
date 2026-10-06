# MediaLibraryVideoFallback

**Filed:** 2026-08-01 → **kol-ds-ui**
**Entry:** `~/dev/projects/kol-ds-ui/lobby/done/MediaLibraryVideoFallback.md`
**Ledger:** `~/dev/projects/kol-ds-ui/lobby/INDEX.md` — **the truth about this ticket**
**Last known:** 🟢 `closed` · synced 2026-08-01

## Why it went there

Found while executing the `MediaLibrary` remainder. `Thumb`
(`MediaLibrary.jsx:219`) renders a bare `<video preload="metadata">`, so a tile
that has not decoded paints a blank grey box — no filename, no type marker.
222 of this bucket's 433 objects are `video/mp4`. Fixing that inside
kol-website would mean wrapping or forking a DS organism the same week four
forks were collapsed into it, which is the mistake the consolidation existed to
end.

The fallback the brief asks for is lifted from `LibraryFolder.jsx`'s
`VideoThumb`, retired to `_tmp/brand-medialibrary-elder/` in the same pass —
a play glyph plus the filename behind the video element.

## What stays here

`none`. Nothing in this repo can close a gap in a published organism, and the
page is live and correct in every other respect.

⚠ **One standing item is NOT this ticket and must not be folded into it:**
whether video tiles paint in real Chrome. That is placeholder #4 from the
2026-08-01 handoff and it needs the user's own eyes. This session probed both
strategies side by side and **neither** reached `readyState 2` — headless
Chromium ships no h264 decoder, so the measurement discriminates nothing. The
brief says so explicitly to stop the DS "fixing" a loading strategy on
worthless evidence.

---

## ✅ RETURNED — 2026-08-01

🟢 `closed` in **kol-ds-ui** — shipped in **`@kolkrabbi/kol-component@0.21.0`** +
**`@kolkrabbi/kol-theme@0.19.0`**, published to the registry 2026-08-01 (their
bar: a shipped version cited in the resolution). 14/14 gates clean, production
build green.

The ask was taken whole, and `VideoThumb`'s shape was used as filed — play glyph
at 20, `kol-mono-12`, the `fg-48` ink, absolute inset, pointer-events off,
filename truncated. It sits **behind** the video and is covered on
`onLoadedData`, the earliest event that guarantees a frame. Its comment became
the CSS comment: *"A blank square must never be the resting state"*, above
`.kol-media-thumb-fallback` in `kol-components-organisms.css`, carrying the
222-of-433 figure and the reason.

**The loading strategy was not touched**, exactly as the brief instructed. Your
side-by-side probe discriminates nothing — both candidates time out headless for
want of an h264 decoder — and that repo has no evidence either way.

**Remainder here (SUPERSEDED — see the CURRENT line at the foot of this file):** 📌 two.

1. **Bump `apps/brand`** to `@kolkrabbi/kol-component@^0.21.0` **and**
   `@kolkrabbi/kol-theme@^0.19.0`. The fallback's chrome lives in the theme, so
   the component alone would render it unstyled.
2. **Your standing item — does `#t=0.1` paint in real Chrome — is now
   non-blocking.** It was correctly kept out of this ticket. If it never paints,
   every video tile shows the glyph and filename instead of a grey box, which is
   the correct failure rather than a broken page. Resolving it only decides
   whether a poster frame appears *as well*.

⚠ Two other things move on the same bump, from `ButtonIconOnlyParity`: every bare
`iconOnly` Button gains 2px of glyph, and any `<Input iconLeft>` at the default
`md` gains 2px. Both are corrections.

---

## ✅ REMAINDER EXECUTED — 2026-08-01

**Remainder here: `none`.** Both apps on `@kolkrabbi/kol-component@^0.21.0` +
`@kolkrabbi/kol-theme@0.19.0` — moved together, since the chrome is theme-side.
Build 3/3 from the repo root, brand and web live, 0 console errors.

**Verified at `/library` → expand `video/`:**

| | |
|---|---|
| fallbacks rendered | **10 for 10** video tiles |
| each one | play glyph + filename, `opacity 1`, `data-painted="false"` |
| CSS | `.kol-media-thumb-fallback` present in `kol-components-organisms.css:564` |

Headless ships no h264 decoder, so nothing decodes and **the fallback is exactly
what should be visible** — which is the proof, not a caveat. Grey boxes are gone.

The shipped CSS carried the brief's own reasoning into its comment, including the
222-of-433 figure and the note that the side-by-side probe discriminates nothing.
The loading strategy was not touched, as demanded.

**Ride-alongs checked, both benign:** web's `Search` button is unaffected — it
passes an explicit `iconSize`, which the resolution said would immunise it. The
ThemeToggle resolves the `SOLO` ladder's `lg` rung in the matching square, as
intended. No `<Input iconLeft>` renders on the surfaces checked.
