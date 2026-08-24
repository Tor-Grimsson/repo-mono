# ArticleCard — one article listing card, three contexts

**Filed:** 2026-08-15 → **kol-ds-ui**
**Entry:** `~/dev/projects/kol-ds-ui/lobby/inbox/ArticleCard.md`
**Ledger:** `~/dev/projects/kol-ds-ui/lobby/INDEX.md` — **the truth about this ticket**
**Last known:** 🟢 `closed` · synced 2026-08-15 — kol-content 0.6.0

## Why it went there

Stack articles are listed in three contexts (hero row, filtered index,
read-more band) by two-and-a-half hand-built cards (ArticleCardHero,
ArticleCardMini, the StackLatest band's composition). One card with
hero/mini/readmore variants belongs in kol-content beside WorkCard.

## What stays here

- **On ship: adopt** — both local cards retire, StackLatest + Stack index
  re-declare on the variants.

## Return — 🟢 2026-08-15

Shipped in **`@kolkrabbi/kol-content@0.6.0`** (registry-verified).

**Most of this already existed.** `ArticleCard` has shipped in kol-content since
extraction, where it collapsed three duplicate components — the same job you
filed for. Your two cards map onto it directly:

| Yours | Package |
|---|---|
| `ArticleCardHero` (hero row) | `size="hero"` |
| `ArticleCardHero variant="grid"` | `size="hero"` + `showHeader={false}` |
| `ArticleCardMini` | `size="mini"` |
| your `category` field | `kicker` |

**Two things were genuinely missing and are now in:**

- **`size="readmore"`** — and this one comes with a caveat. **Nothing in the
  estate had built this shape**, so there was no reference to recreate; it is the
  family's own idiom (mini's row, a `label` lead-in, a trailing arrow that
  travels on hero's 300ms hover clock). **Review it against a design before you
  ship it** — no existing surface validated it.
- **`titleClassName` / `excerptClassName` / `kickerClassName`** — the seams you
  asked for, behaving exactly like `WorkListItem`'s: they **REPLACE** the type
  class, never stack beside it. Colour, clamping and hover stay
  component-owned.

**One defect crossed both ways:** the index-key you flagged elsewhere was in the
package's tag Pills and hero meta row too. Keyed by value now.

**Remainder here:** bump `@kolkrabbi/kol-content` to `^0.6.0`, re-declare
`StackLatest` and `routes/Stack.jsx` on the variants, then retire
`components/prose/cards/ArticleCardHero.jsx` and `ArticleCardMini.jsx`.

✅ **Remainder executed 2026-08-15 same session:** kol-content ^0.6.1 bumped; both
consumers on the package variants (`size="hero"` / `+showHeader={false}` /
`size="mini"`, type seams for the local display face + kicker); both cards retired
to `_tmp/2026-08-15-anatomy-adoption/`. **`size="readmore"` unadopted — no
read-more band exists anywhere in apps/web**; it stays unexercised until a surface
renders it (the receipt's own review-first warning stands). Build 3/3 green.
