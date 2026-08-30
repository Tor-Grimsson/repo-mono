# ListingCardThumbBorder — the thumb hairline is hardcoded; no way off it

**Filed:** 2026-08-27 → **kol-ds-ui**
**Entry:** `~/dev/projects/kol-ds-ui/lobby/inbox/ListingCardThumbBorder.md`
**Ledger:** `~/dev/projects/kol-ds-ui/lobby/INDEX.md` — **the truth about this ticket**
**Last known:** 🟢 `closed` · synced 2026-08-27 — kol-content 0.10.0 · kol-component 0.88.0; remainder executed here 2026-08-27

## Why it went there

`/stack`'s featured `ListingCard size="hero"` draws `border border-fg-08`
around its thumb with no prop (`ListingCard.jsx:139`). User: no borders.
Ask: a `frame` seam like `ContentCard`'s, and the article thumb frame
defaulting off across the family.

## Remainder here once it ships

bump kol-content (+ component if the default flips); drop `frame={false}`
from the `/stack` list cards if the default is off

## ✅ RETURNED — 2026-08-27 · kol-content 0.10.0 · kol-component 0.88.0

ListingCard takes frame (default false) on the hero and default sizes — the hardcoded border border-fg-08 is gone, the bg-fg-04 tint stays, hero keeps its fg-16 hover step when frame is on; same contract as ContentCard's frame. And the ruling: ContentCard variant=article no longer frames its media by default — frame opts the hairline in. Measured on the comparison page, article variant: ListingCard thumb border 0 with the tint kept, ContentCard media border 0.

**Remainder here:** bump kol-content 0.10.0 + kol-component 0.88.0; the /stack hero ListingCard needs no prop (frame defaults off) and the list cards can drop frame={false}

✅ **Remainder executed 2026-08-27 same session:** kol-content ^0.10.0 + kol-component ^0.88.0 in both apps; `frame={false}` dropped from the `/stack` list cards (off by default now); the hero `ListingCard` needs nothing. No thumb borders on `/stack`.
