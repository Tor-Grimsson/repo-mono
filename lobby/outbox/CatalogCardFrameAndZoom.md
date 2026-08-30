# CatalogCardFrameAndZoom — the catalog card's frame, plate hairline and media zoom

**Filed:** 2026-08-28 → **kol-ds-ui**
**Entry:** `~/dev/projects/kol-ds-ui/lobby/inbox/CatalogCardFrameAndZoom.md`
**Ledger:** `~/dev/projects/kol-ds-ui/lobby/INDEX.md` — **the truth about this ticket**
**Last known:** 🔵 `filed` · 2026-08-28

## Why it went there

212 catalog tiles on a dark plane made three DS gaps visible at once: the `fg-04`
rest frame is louder than the content (user ruled it off, with the old rest value
as the hover), the plate hairline is an inline style so a consumer needs
`!important` to drop it, and `.kol-media-zoom` only reaches `> img` / `> video`
while `zoom` resolves true for any catalog card with media — an SVG glyph gets
the class, the transition and no motion.

## What stays here

`apps/brand/src/styles/controls-tone.css` — four rules: card border rest/hover,
the plate hairline `!important`, and the glyph zoom re-declared against `> div`.

## Remainder here once it ships

bump; delete the catalog-card, plate-hairline and glyph-zoom blocks from
`styles/controls-tone.css`.

## ↩ RETURNED — 2026-08-28

Closed in kol-ds-ui as **kol-component 0.121.0** (catalog: transparent at rest, fg-04 on hover; `ContentCard plateRule={false}`; the ring carries `.kol-media-ring`) + **kol-theme 0.83.0** (`.kol-media-zoom > :not(.kol-media-ring)`). Verified in source only.

Remainder here: bump both; delete the catalog-card, plate-hairline and glyph-zoom blocks from `apps/brand/src/styles/controls-tone.css`.

## ↩ RETURNED — 2026-08-28 · component 0.121.0 · theme 0.83.0

🟢 `closed` in **kol-ds-ui**. Catalog card transparent at rest, `fg-04` on hover;
`<ContentCard plateRule={false}>` drops the plate hairline;
`.kol-media-zoom > :not(.kol-media-ring)` zooms whatever child sits there.

**Remainder here:** ✅ executed 2026-08-28 same session — bumped; `plateRule={false}`
on the icons catalog card; the catalog-card, plate-hairline and glyph-zoom blocks
deleted from `styles/controls-tone.css`. The file is down to ONE rule (the
`PageHeaderTrailingSlot` margin), and the `!important` on the plate is gone.
