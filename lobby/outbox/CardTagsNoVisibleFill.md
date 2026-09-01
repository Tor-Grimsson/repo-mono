# CardTagsNoVisibleFill

**Filed:** 2026-09-01 → **kol-ds-ui**
**Entry:** `~/dev/projects/kol-ds-ui/lobby/inbox/CardTagsNoVisibleFill.md`
**Ledger:** `~/dev/projects/kol-ds-ui/lobby/INDEX.md` — **the truth about this ticket**
**Last known:** 🟢 `closed` · synced 2026-09-01 — **kol-component@0.158.0**

## Why it went there

Phone review, 2026-09-01. Full statement of the defect is in the entry.

## What stays here

Nothing — both are literals inside DS components with no consumer seam.

## Remainder here once it ships

bump; re-check at 390.

## ✅ RETURNED — 2026-09-01 · kol-component@0.158.0

Your preferred answer, with the per-variant half built in so the /work ruling survives: ContentText takes tagVariant, default primary — the soft ink wash, the one that reads as a chip on a plain surface — and ContentCard / ContentRow derive it from the BOX: a solid surface fill (a --kol-surface-* token) keeps tertiary, which is exactly the filled /work row the variant was minted for on 08-27, and everything else — article cards on the page, washed boxes — takes primary. Both expose tagVariant to override. You were right that tertiary on surface-primary is not a look; the fill was never the point on the row and it removed the chip everywhere else. Verified in a real render: the article card's chips are kol-tag--primary at a 16% ink wash; the work row's chips stay kol-tag--tertiary on its surface-secondary fill. Tarball checked.

**Remainder here:** bump kol-component@0.158.0 and re-check /stack at 390 — the tag row reads as chips; /work rows unchanged

## ✅ RETURNED — 2026-09-01 · kol-component@0.158.0

`ContentText` takes `tagVariant`, default `primary`; `ContentCard`/`ContentRow`
derive it from the BOX — a solid `--kol-surface-*` fill keeps `tertiary` (the
filled `/work` row the variant was minted for), everything else takes `primary`.
Both expose `tagVariant` to override.

**Remainder here:** bump; re-check the tag rows at 390.

✅ **Remainder executed 2026-09-01 same session.** component ^0.158.0 in web +
brand. Measured on `/` (StackLatest's cards): **15 chips, every one
`kol-tag--primary kol-tag--sm`**, fill `color(srgb 0.07 0.07 0.08 / 0.16)`
against page `rgb(250,250,250)` — distinct. `/stack`'s own grid renders **no
tags** — `Stack.jsx` never passes the `tags` prop — which is why a first read
there found zero chips; the rows the user screenshotted are StackLatest's, on
`/` and at the foot of every article.

⚠️ **Not a user ruling — corrected 2026-09-01.** I first reported this as "by
ruling (08-27)". It is not. It traces to ONE agent-written comment at
`Stack.jsx:91` — *"live's look: … no tags, no date"* — someone matching the old
live site's card, restated twice in this ledger until it read as a decision.
The user, asked directly: *"i dont understand 7, i dont remember making any
ruling there."* He never made one. Whether `/stack`'s grid shows tags is still
open and is his call; it is one prop.
