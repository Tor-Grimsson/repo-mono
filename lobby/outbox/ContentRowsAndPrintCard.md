# ContentRowsAndPrintCard — fixed-square row thumb · no row zoom · print card flip + rect · one name for the eyebrow

**Filed:** 2026-08-27 → **kol-ds-ui**
**Entry:** `~/dev/projects/kol-ds-ui/lobby/inbox/ContentRowsAndPrintCard.md`
**Ledger:** `~/dev/projects/kol-ds-ui/lobby/INDEX.md` — **the truth about this ticket**
**Last known:** 🟢 `closed` · synced 2026-08-27 — theme 0.63.0 · component 0.94.0; remainder executed here 2026-08-27 (bump + the two `ui.css` rules deleted; renames aliased, at our pace)

## Why it went there

Tuned locally on `/stack` + `/prints`: row thumbs must be a fixed square
the image fits (the DS lets the image set the row height), rows don't zoom
on hover, the print card lacks the flip / keyboard `PrintGridCard` had, and
the eyebrow is called kicker / label / eyebrow depending on the file.

## What stays here

Two rules at the tail of `apps/web/src/styles/ui.css` (row thumb square,
no row zoom). `/prints` already on the set.

## Remainder here once it ships

bump; delete the two `ui.css` rules; rename `kicker`/`kickerClass` →
`eyebrow` at the call sites if the slot renames; `/prints` complete

## ✅ RETURNED — 2026-08-27 · kol-theme 0.63.0 · kol-component 0.94.0

(1) Every ContentRow thumb is a fixed square box by rule — .kol-row > .kol-row-thumb is --kol-row-thumb wide, aspect 1/1, align-self flex-start, its child fills it; measured article 120×120 at the top of a 120 row, work 64×64. (2) Rows never zoom — thumbZoom gone; measured transform none on hover. (3) ContentCard print carries PrintGridCard: selected turns the card (0.4s ease-out, preserve-3d — measured matrix3d rotateY 180), the media fades in with loading=lazy (ContentMedia fade), onClick's event.currentTarget is the rect, role=button + tabindex 0 + Enter/Space on an onClick card. (4) The eyebrow has one name: kol-eyebrow is the theme role (measured mono 12 uppercase 0.06em fg-64), kol-card-kicker its alias on the ledger; eyebrow/eyebrowClass on ContentText (kicker/kickerClass alias) and SectionText + every section (label/labelClass/slot key label alias) — both aliases measured rendering. Prop aliases are documented on the components; the gate cannot see props, so only the class rides the ledger.

**Remainder here:** bump kol-theme 0.63.0 + kol-component 0.94.0; delete the two ui.css rules; rename kicker → eyebrow, kickerClass → eyebrowClass, label → eyebrow on the sections, kol-card-kicker → kol-eyebrow at your pace (all alias for now)
