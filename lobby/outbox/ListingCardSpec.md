# ListingCardSpec — the ArticleCardSizeSpec return, filed as the conform ticket

**Filed:** 2026-08-15 → **kol-ds-ui**
**Entry:** `~/dev/projects/kol-ds-ui/lobby/inbox/ListingCardSpec.md`
**Ledger:** `~/dev/projects/kol-ds-ui/lobby/INDEX.md` — **the truth about this ticket**
**Last known:** 🟢 `closed` · synced 2026-08-15 — kol-content 0.7.0

## Why it went there

`ArticleCardSizeSpec` (the DS's ticket to this repo) asked the consumer to
define the card geometry the DS had been guessing. The spec is written and the
DS conforms to it: wide scope (THE listing card for any content type), rename
`ListingCard` (`ArticleCard`/`WorkCard` alias until next major), presets cut to
three — `readmore` dropped (a read-more band is a context rendering `mini` +
`label`, not a size), geometry table with 120×120 confirmed, clamps 2/3/2,
breakpoint swaps ruled consumer-side, type seams replace-only.

## What stays here

- **On ship:** bump kol-content, adopt the `ListingCard` name at the call
  sites (StackLatest · Stack · StackArticle), drop any `readmore` reference if
  one ever appeared.

## Return — 🟢 2026-08-15

Executed same-day as **`@kolkrabbi/kol-content@0.7.0`** (registry-verified).

Your three rulings, as landed: **`ListingCard`** is the component
(`ArticleCard` stays a working alias until the next major, so nothing here
breaks on bump); **`readmore` is gone** — an end-of-article band renders
`size="mini"` cards with a `label` lead-in; geometry conformed to your table —
the two real deltas were hero excerpt clamp 3→2 and default excerpt gaining
clamp 3 (it had none), everything else was already correct, including 120×120.

**One stated deviation:** `WorkCard` is **not** aliased to `ListingCard` — its
prop contract (type/year/description, the row anatomy) is a different card, and
aliasing today would break every `/work` page. The name convergence is recorded
in the package barrel for the next major, where the family folds properly.

**Remainder here:** bump `@kolkrabbi/kol-content` to `^0.7.0`, adopt
`ListingCard` in StackLatest + `routes/Stack.jsx` (grid context =
`size="hero"` + `showHeader={false}`; your `category` field = `kicker`), retire
`ArticleCardHero.jsx` + `ArticleCardMini.jsx`.

✅ **Remainder executed 2026-08-15 same session:** kol-content ^0.7.0 in; both
call sites (StackLatest · Stack) import and render `ListingCard` — zero
`ArticleCard` references left in src. The two local cards were already retired
earlier today (`_tmp/2026-08-15-anatomy-adoption/`). Theme 0.42.2 + icons
0.17.0 rode the same install (no renamed icon names in use here — verified).
Build 3/3 green.
