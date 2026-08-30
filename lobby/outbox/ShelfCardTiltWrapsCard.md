# ShelfCardTiltWrapsCard — the shelf's tilt is clipped by the card's own frame

**Filed:** 2026-08-27 → **kol-ds-ui**
**Entry:** `~/dev/projects/kol-ds-ui/lobby/inbox/ShelfCardTiltWrapsCard.md`
**Ledger:** `~/dev/projects/kol-ds-ui/lobby/INDEX.md` — **the truth about this ticket**
**Last known:** 🟢 `closed` in kol-ds-ui — kol-content 0.13.0 · kol-component 0.113.0, 2026-08-27

## Why it went there

The user on `/work`: *"work shelf does indeed not tilt"* → *"or it does but is
clipped by some mask container"*. He was right. `ShelfCardMotion` (kol-content
0.12.0) put `TiltCard grounded` in `ContentCard work`'s **media slot**, which
sits inside `ContentMedia`'s unconditional `overflow-hidden` and the card root's
own (drawer + framed). The frame, border and radius never move; only the artwork
leans a couple of px inside a static rectangle. The retired `WorkCard` had
`TiltCard` as the card root carrying the border, so the whole card leaned.

Same misplacement has been killing the work card's hover **zoom** since 0.12.0 —
`.kol-media-zoom > img` is a direct-child selector and the `<img>` is now two
levels down inside `TiltCard`.

Ask: `tilt` wraps the CARD, on the transform wrapper `ParallaxShelf` already
owns (`ShelfEnter`), with the media slot back to a plain `<img>`. **No new
component** — `useTilt` is already the one hook, and this repo just retired its
tilt forks onto the 0.110.0 family.

## What stays here

Nothing. `Work.jsx` passes `type · items · fromLeft · plugins · onNavigate ·
titleClass` and owns no shelf card code — the defect is entirely inside
`ParallaxShelf`'s default card.

## Remainder here once it ships

bump kol-content; eyeball `/work` — a shelf card should lean **with its border**,
and the hover zoom should be back.

---

## ✅ RETURNED — 2026-08-27 · kol-content 0.13.0 · kol-component 0.113.0

🟢 `closed` in **kol-ds-ui** — The tilt wraps the CARD: `ParallaxShelf` puts the whole `ContentCard work` in a `useTilt({ grounded: true })` motion wrapper (inside `ShelfEnter`, or alone when `enter={false}`), so border and radius lean with the artwork; a plain `<img>` is back in the media slot so `.kol-media-zoom > img` fires again. The grounded math (3 zones, ±2.5°, lazy spring 250/25/0.6, `min(0, …)`, `center bottom`) lifted out of `TiltCardInner` into the one hook — `TiltCard grounded` renders identically. No new component. `tilt={false}`, coarse pointer and reduced motion render the plain card. **kol-content now peers `framer-motion` ^12** (the site has it). 21 gates clean; verified in source only.

**Remainder here:** bump kol-content 0.13.0 · kol-component 0.113.0; measure the lean (border moves) and the zoom on `/work`'s shelf.
