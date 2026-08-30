# IconSetCut — the icon set carries each glyph's cut (stroke | solid)

**Filed:** 2026-08-27 → **kol-ds-ui**
**Entry:** `~/dev/projects/kol-ds-ui/lobby/inbox/IconSetCut.md`
**Ledger:** `~/dev/projects/kol-ds-ui/lobby/INDEX.md` — **the truth about this ticket**
**Last known:** 🟢 `closed` in kol-ds-ui — kol-icons 0.24.0, 2026-08-27

## Why it went there

`/icons` filters by TYPE (Stroke | Solid). The package exposes names and groups
but not how a glyph is drawn, so brand globs the shipped SVGs and reads the cut
off the markup. The package already reads those files at build; the fact
belongs there.

## What stays here

`pages/IconsGallery.jsx` — the `RAW` glob + `CUT` map (the regex rule), by the
local-first rule.

## Remainder here once it ships

bump kol-icons; read the cut from the package export; delete the `RAW` glob and
`CUT`.

---

## ✅ RETURNED — 2026-08-27 · kol-icons 0.24.0

🟢 `closed` in **kol-ds-ui** — `KOL_ICON_SET_V1_META` — `{ name: { group, cut } }` — and `getCut(name)` on the barrel; `cut` is `stroke` | `solid`, derived from the markup at build by your rule verbatim (`fill="currentColor"` = solid) into `src/cuts.json` (212 glyphs — 41 solid · 171 stroke); the `icon-cuts` gate (22nd) fails when the JSON is stale, so a new SVG classifies itself. Documented in `02-icons/INDEX.md § Glyph cut`. 22 gates clean.

**Remainder here:** bump kol-icons 0.24.0; delete the `CUT` glob in `IconsGallery.jsx` and read `KOL_ICON_SET_V1_META[name].cut` (or `getCut`).

**Remainder here:** ✅ executed 2026-08-27 same session — icons ^0.24.0 in both apps; `IconsGallery.jsx` reads `getCut(name)`, the `RAW` glob + `CUT` map deleted.
