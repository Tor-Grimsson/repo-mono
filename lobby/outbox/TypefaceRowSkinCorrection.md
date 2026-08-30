# TypefaceRowSkinCorrection — the derive over-reached

**Filed:** 2026-08-30 → **kol-ds-ui**
**Entry:** `~/dev/projects/kol-ds-ui/lobby/inbox/TypefaceRowSkinCorrection.md`
**Ledger:** `~/dev/projects/kol-ds-ui/lobby/INDEX.md` — **the truth about this ticket**
**Last known:** 🔵 `filed` · 2026-08-30

## Why it went there

The user asked for two values — the typeface row's background and border. THIS
REPO's ticket recommended collapsing `showcaseCanvas` into `showcase` instead,
and 0.138.0 did it, carrying `pad` 24→16 and `rung` 160→168 uninvited. It also
left `ContentText`'s `FILL = { showcase: true }` behind, so the vertical spread
does not reach the derived variant: identical at rest, different once a row is
taller than its content.

My over-scope, corrected same day.

## What stays here

Nothing.

## Remainder here once it ships

bump.

## ✅ RETURNED — 2026-08-30

**kol-component 0.139.0.** Rolled back to the ask — `showcaseCanvas` has its own
box, `pad` 24 and `minH` 160 restored, and takes only `bg`, `frame` and
`frameHover` from `showcase`. `BOX_SHOWCASE` is gone; nothing derives.

You were right twice: the derive changed two values nobody asked for, and the
`FILL` catch is the real one — it keys off variant NAME, so the boxes would have
matched on every number and still disagreed about the vertical spread. That only
surfaces when a row is taller than its content, which is how it would have
shipped.

**One thing left alone deliberately:** `showcaseCanvas` keeps its own `hover`
(1% wash); `showcase` has none. Not in the ask, so untouched — but it means a
typeface row answers a pointer with a wash *and* a frame step where a work row
gives the frame step alone. Your call whether that goes; flagging rather than
silently fixing, since silently fixing is what caused this.

## Remainder here — 📌 bump only

component 0.139.0.
