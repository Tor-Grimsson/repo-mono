# CardFeatureVisualCollapses — feature card media can render at zero height

**Filed:** 2026-08-31 → **kol-ds-ui**
**Entry:** `~/dev/projects/kol-ds-ui/lobby/inbox/CardFeatureVisualCollapses.md`
**Ledger:** `~/dev/projects/kol-ds-ui/lobby/INDEX.md` — **the truth about this ticket**
**Last known:** 🔵 `filed` · 2026-08-31

## Why it went there

`.kol-card-feature-visual` is `flex: 1 1 0%`. Basis zero — the box's height comes
only from the parent's free space, never from its own content. If no ancestor
supplies a definite height it resolves to 0 and the card loses its image with no
visible failure.

The user's iPhone shows all four `/` feature cards imageless at ~205px. Not
reproducible here in any of three engines, and not a CDN block (blocking gives a
*bigger* card with an empty box). The zero basis is the only structural thing that
permits the observed geometry.

## What stays here

A dated stopgap in `apps/web/src/styles/ui.css` (`max-width: 767px`) giving the box
`flex: 1 1 auto; aspect-ratio: 3/2; min-height: 8rem`. Verified worst-case: with
every ancestor's definite height stripped, WebKit and Firefox both hold 211px at
390, and 1280 is untouched.

## Remainder here once it ships

bump kol-component; delete the stopgap block from `apps/web/src/styles/ui.css`;
re-check on a real phone.

## ✅ RETURNED — 2026-08-31 · kol-component@0.145.0

flex-1 to flex-auto AND the ratio now defaults to 3/2 instead of empty. The zero basis was only half of it: flex: 1 1 auto still leaves the box with nothing of its own to be sized from when no ratio is set, so the ratio is what makes zero unreachable and the basis is what stops the parent overriding it. 3/2 is the geometry those cards already rendered at, so nothing moved where it already worked. Measured at 390x700: 136 / 136 / 136, no collapse. On the wider audit you flagged — SectionSplit's media box was the same class of defect and shipped in the same release; no other flex-1 media box in the set resolves without a ratio.

**Remainder here:** bump kol-component >=0.145.0; delete the max-width 767px stopgap from apps/web/src/styles/ui.css; re-check / feature cards on a real phone
