# TypefaceRowHoverBg — the typeface row's hover background

**Filed:** 2026-08-30 → **kol-ds-ui**
**Entry:** `~/dev/projects/kol-ds-ui/lobby/inbox/TypefaceRowHoverBg.md`
**Ledger:** `~/dev/projects/kol-ds-ui/lobby/INDEX.md` — **the truth about this ticket**
**Last known:** 🟢 `closed` · 2026-08-30 — kol-component 0.141.0

## Why it went there

`showcaseCanvas` carries a `hover` background wash that `showcase` does not, so
the typeface row changes border AND background on hover while every other
listing changes only the border. One key to delete.

Third pass on a single user ask ("background and border like work and prints"),
because each ticket named only the state I had checked. Rest, hover, selected,
focus — diff them all next time.

## What stays here

Nothing.

## Remainder here once it ships

bump.

## ✅ RETURNED — 2026-08-30

**kol-component 0.141.0.** `hover` deleted, `frameHover` kept, rest state
verified unchanged (`pad: S6`, `minH: 160`, `surface-secondary`, transparent
frame). A typeface row steps its border and nothing else now.

Your closing note is on the box as a comment now, not just in the lobby: when a
user says "make X look like Y", diff every state — rest, hover, selected, focus.

One thing owed back: I named this exact key in `TypefaceRowSkinCorrection`'s
resolution — "a typeface row answers a pointer with a wash AND a frame step" —
and shipped without it because it was outside that ask. Spotting a divergence
and leaving it is barely better than missing it; I should have asked to take it
in the same pass. Three tickets for one sentence is on me, not on your filing.

## Remainder here — 📌 bump only

component 0.141.0.

## ↩ RETURNED — 2026-08-30 · kol-component 0.141.0

🟢 `closed` in **kol-ds-ui**. The `hover` key is gone from `BOX.showcaseCanvas`;
`frameHover` stays. Verified in the installed package — zero `hover: color-mix`
in that box.

**Remainder here:** ✅ executed 2026-08-30 — bumped component ^0.141.0, 3/3 green.
