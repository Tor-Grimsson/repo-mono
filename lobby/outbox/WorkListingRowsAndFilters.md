# WorkListingRowsAndFilters — work row values + five family defects from the /work swap

**Filed:** 2026-08-27 → **kol-ds-ui**
**Entry:** `~/dev/projects/kol-ds-ui/lobby/inbox/WorkListingRowsAndFilters.md`
**Ledger:** `~/dev/projects/kol-ds-ui/lobby/INDEX.md` — **the truth about this ticket**
**Last known:** 🟢 `closed` · synced 2026-08-27 — kol-component 0.100.0 · kol-theme 0.69.0; remainder executed here 2026-08-27 (bumped, seams + the four `ui.css` rules + `stack`/`text-balance` dropped, `/work` list swapped onto `ContentCollection` + `ContentRow work`, `WorkListItem` retired)

## Why it went there

Tuned on `/work` with a DS `ContentRow work` as the first list item beside
the local `WorkListItem`. The row's ruled values (168 min-h, 16 pad, thumb
fills the content height with no hairline, hover frame `fg-08`, the typeface
row's title/type/year voices) are package values; the swap also surfaced that
nothing in the DS declares `container-type` (the row's md step is dead on
every page), the filters' fluid group has no right room and no class seam,
short groups aren't narrow by default, `Tag` sizes carry no type of their
own, and `SectionText` headlines don't balance.

## What stays here

`Work.jsx` L86–110 (the comparison row: `titleClass` / `metaClass` /
`dateClass` / `thumb={136}` / `className="work-row"`), `ui.css` rules
`.work-row .kol-row-thumb > *`, `.work-row.kol-row` (168), `.work-row.kol-row:hover`
(fg-08), `.work-filters .flex-1 > .flex-wrap` (pr 48); `stack: true` on Type;
`slotClass={{ headline: 'text-balance' }}` on the header. The local rows still
render below the DS one.

## Remainder here once it ships

bump; drop the `*Class` seams (keep `bodyClass` — the face), `thumb`,
`className`, the four `ui.css` rules, `stack: true`, `text-balance`; swap the
list onto `ContentCollection` + `ContentRow work` for every item, retire
`WorkListItem` import + the `ListRows` stagger; remove the TEMP block

## ✅ RETURNED — 2026-08-27 · kol-component 0.100.0 · kol-theme 0.69.0

(1) ContentRow work as ruled: title + type kol-mono-14 full ink, year kol-mono-12 fg-64, min-height 168, 16 padding at every width, thumb fills the content height (136×136 measured in a 168 row) with no hairline (thumbBorder false), frame transparent → fg-08 on hover (measured). (2) ContentCollection and ContentFilters' items panel declare container-type: inline-size (measured inline-size on the filters set); the work row's md step is gone — the rows were approved at base, so the container change moves nothing today. (3) the fluid group keeps 48px on its right (pr-12) and every group takes className / wrapClassName. (4) a group with ≤ 6 values stacks by default, stack: false opts out (measured: Kind with 5 values stacks with no prop). (5) .kol-tag--sm/md/lg carry their type; Tag sm's class list is kol-tag kol-tag--primary kol-tag--sm, 10px / 0.10em (measured). (6) thumb="fill" on any row — the square is the rung minus the vertical padding (the ruled 136), a definite number rather than a stretch (a min-height row has no definite cross size). (7) SectionText headlines wear kol-section-text-headline and balance (measured text-wrap: balance).

**Remainder here:** bump kol-component 0.100.0 + kol-theme 0.69.0; delete .work-row* / .work-filters* from ui.css; /work passes content + bodyClass only; drop stack: true and the text-balance slotClass
