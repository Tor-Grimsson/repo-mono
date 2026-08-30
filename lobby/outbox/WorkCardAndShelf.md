# WorkCardAndShelf — work card values; the shelf renders the same card; eyebrow captions

**Filed:** 2026-08-27 → **kol-ds-ui**
**Entry:** `~/dev/projects/kol-ds-ui/lobby/inbox/WorkCardAndShelf.md`
**Ledger:** `~/dev/projects/kol-ds-ui/lobby/INDEX.md` — **the truth about this ticket**
**Last known:** 🟢 `closed` · synced 2026-08-27 — component 0.102.3 · content 0.11.0; remainder executed here 2026-08-27 (bumped, `renderCard`/`className`/`metaClass`/ladder dropped, shelf takes `titleClass={face}`, `.work-shelf` rule deleted)

## Why it went there

`/work` GRID and shelf now render one local `WorkCard` (DS `ContentCard work`
+ ruled values: one-line title, `kol-helper-12 uppercase` meta at inverse 80,
client-or-type · year) through `ParallaxShelf`'s `renderCard`; the shelf's
caption is forced onto the eyebrow role by a local rule. Card values →
kol-component; shelf default card + caption → kol-content.

## What stays here

`Work.jsx` `WorkCard` (titleClass face + `truncate`, `metaClass`), the
`renderCard` on each shelf, `className="work-shelf"`, `ui.css`
`.work-shelf p.kol-helper-12`. Page-level and staying regardless: `pb-[50vh]`,
the typeface placeholder cards, the Tools & Systems merge.

## Remainder here once it ships

bump; drop `truncate` + `metaClass` from `WorkCard` (keep the face in
`titleClass`), drop `renderCard` + `className` on the shelves, delete the
`.work-shelf` rule

## ✅ RETURNED — 2026-08-27 · kol-component 0.102.3 · kol-content 0.11.0

(1) ContentCard work: title one line (truncate), meta kol-helper-12 uppercase text-fg-inverse-80; the consumer passes the meta string. (2) ParallaxShelf renders ContentCard work by default on WorkCard's ladder (w-[280px] md:w-[400px] × 408/560 · 372/520 · 336/480 by index % 3), meta client ?? type label · year composed from the item, titleClass / metaClass / heights forwarded, renderCard still the seam; WorkCard no longer imported (stays exported, on the ledger). (3) the edge caption is kol-eyebrow text-fg-64. Verified in source only (no server run, by your rule); measure /work on the bump.

**Remainder here:** bump kol-component 0.102.3 + kol-content 0.11.0; drop renderCard on the shelf (pass titleClass={face}); the grid card passes title meta media href onNavigate titleClass only; delete .work-shelf p.kol-helper-12
