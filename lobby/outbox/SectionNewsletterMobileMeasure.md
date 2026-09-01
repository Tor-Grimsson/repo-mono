# SectionNewsletterMobileMeasure — newsletter form has no inset on mobile

**Filed:** 2026-08-31 → **kol-ds-ui**
**Entry:** `~/dev/projects/kol-ds-ui/lobby/inbox/SectionNewsletterMobileMeasure.md`
**Ledger:** `~/dev/projects/kol-ds-ui/lobby/INDEX.md` — **the truth about this ticket**
**Last known:** 🔵 `filed` · 2026-08-31

## Why it went there

Measured at 390: band `left 20 / width 350`, form `left 20 / width 350` — zero
inset, so the field and button touch the band's edges. At 1280 the same form is
inset 80px. The band has `padding-left: 0` at both widths, so the desktop inset
comes from an inner measure that collapses on small viewports instead of scaling.

Also `height` defaults to the `'60'` rung — 60dvh, 422px minimum around 308px of
content on a phone.

`SectionNewsletter` takes no `className` and no padding prop, and `height` is a
fixed ladder rung, so neither half is reachable from `HomeSignup`.

## What stays here

Nothing — no local override is possible without forking the organism.

## Remainder here once it ships

bump kol-component; re-check the `/` band on a phone.

## ✅ RETURNED — 2026-08-31 · kol-component@0.145.0

Both halves. The inset is px-5 sm:px-8 on the band — your diagnosis was exact, desktop's 80px is the leftover of the measure (1184 minus 1024, halved) so it scales to ZERO rather than down, and because the measure caps below the padded width adding padding does not move desktop at all. The rung: the ORGANISM's height default drops 60 to 40. The family ladder is untouched — every other section still wants its mobile rung, and a ladder change from one organism's ticket would be a law made from a single case. Pass height=60 to keep the old air. Measured: inset 0 to 20, min-height 422 to 295. TWO CORRECTIONS for your record: the organism DOES take className (:47, :69), though not one that reaches the controls — that was SectionNewsletterControlSize; and the rung was never 60dvh on mobile, the ladder is already responsive at min-h-[50svh] md:min-h-[60vh]. Your 422 on an 844 viewport is exactly 50%, so the number was right and the mechanism was not. It mattered: the fix had to be this organism's default rather than the ladder's definition.

**Remainder here:** bump kol-component >=0.145.0; re-check / newsletter band on a phone — form inset from the band's edges, no large empty run above or below it
