# ListingCardHoverZoom — the hero ListingCard zooms 5%; the family zooms 3%

**Filed:** 2026-08-27 → **kol-ds-ui**
**Entry:** `~/dev/projects/kol-ds-ui/lobby/inbox/ListingCardHoverZoom.md`
**Ledger:** `~/dev/projects/kol-ds-ui/lobby/INDEX.md` — **the truth about this ticket**
**Last known:** 🟢 `closed` · synced 2026-08-27 — kol-content 0.10.1; remainder executed here 2026-08-27

## Why it went there

`/stack`'s featured `ListingCard` hardcodes `group-hover:scale-105`; the
article cards below it zoom on the theme's media rule (1.06); the card-visual
rule is 1.03. Three factors. Not relative. Ask:
`ListingCard` on the family's zoom, no seam needed here.

## Remainder here once it ships

bump kol-content; eyeball the hover on `/stack`

## ✅ RETURNED — 2026-08-27 · kol-content 0.10.1

ListingCard hero + default thumbs wear .kol-media-zoom — the content-card family's rule (1.06 / 600ms house ease, hover:hover only, reduced-motion opt-out) — the hero's own group-hover:scale-105 / 300ms is gone. Note the family's number is 1.06 / 600ms (ContentMedia), not the 1.03 / 300ms of CardFeatureItem the ticket cited; article cards were already on 1.06. Measured on the comparison page: ListingCard and ContentCard article both hover to matrix(1.06) over 0.6s.

**Remainder here:** bump kol-content 0.10.1; no consumer change

✅ **Remainder executed 2026-08-27 same session:** kol-content ^0.10.1 in web; no call-site change. Hover eyeball is the user's.
