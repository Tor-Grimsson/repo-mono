# TiltBentoCoarseRevealInView — touch cards should reveal in view, not all at once

**Filed:** 2026-08-31 → **kol-ds-ui**
**Entry:** `~/dev/projects/kol-ds-ui/lobby/inbox/TiltBentoCoarseRevealInView.md`
**Ledger:** `~/dev/projects/kol-ds-ui/lobby/INDEX.md` — **the truth about this ticket**
**Last known:** 🔵 `filed` · 2026-08-31

## Why it went there

`TiltBento`'s coarse-pointer branch is documented behaviour, not a bug: no-hover
devices show subtitle, description and CTA statically. The user wants the mobile
rest state to match the desktop rest state — title only — with the reveal driven
by which card is in view.

That is a behaviour change to a DS molecule with a stated design intent, so it is
a ruling for the DS, not something to override here. `HomeHighlights` passes only
content props; it has no seam to change this from the call site.

## What stays here

Nothing. `HomeHighlights.jsx` needs no change unless the DS ships it as an opt-in
prop, in which case the three call sites take one prop.

## Remainder here once it ships

bump kol-component; if it lands as opt-in, set the prop on the three `TiltBento`
call sites in `HomeHighlights.jsx`; re-check `/` on a phone.

## ✅ RETURNED — 2026-08-31 · kol-component@0.145.0

The open choice, decided: an IntersectionObserver with the root squeezed to the viewport's middle band (rootMargin -45% top and bottom). It intersects only the element crossing the centre line, so at most one full-width card in a column is ever active, with NO cross-card coordination and no shared store — each card answers for itself. A most-visible-card-wins rule needs the cards to know about each other, which this component has no way to arrange. On default vs opt-in: both. in-view is the coarse-pointer default because that is the reported defect, and coarseReveal=static restores today's behaviour for the wall-of-small-tiles case you flagged. The fine-pointer path is untouched. Measured with real touch emulation at 390x844: cards 0, 1 and 2 each open alone when scrolled to centre; fine pointer rest [0,0,0,0] and hover 1, both unchanged.

**Remainder here:** bump kol-component >=0.145.0; re-check / highlights on a phone — one card open, the rest title-only
