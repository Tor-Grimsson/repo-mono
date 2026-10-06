# ArticleCard size presets — define the geometry so the DS stops guessing it

**Staged:** 2026-08-15 · from a kol-ds-ui session
**Change:** a spec, not code — one table the DS builds against

---

## The problem, in one case

`@kolkrabbi/kol-content`'s `ArticleCard` ships four size presets — `default` /
`hero` / `mini` / `readmore` — and their geometry is **archaeology, not
specification**. Three presets were reverse-engineered from this repo's
hand-built cards (`ArticleCardHero.jsx`, `ArticleCardMini.jsx`, the Stack
grid); the fourth (`readmore`) had no reference anywhere, and the DS invented
its geometry — shipped in `kol-content@0.6.0` with a text-glyph arrow and a
`w-[88px]` thumbnail no other card uses, corrected same-day in **0.6.1** to
mini's row after the user caught it.

The user's ruling (2026-08-15, verbatim intent): *"readmore is a cms card.
dont we have some standard shortlist of sizes we use?"* — there **should** be a
standard, and the consumer that renders these cards in every context is the
repo that can define it. The current numbers, extracted from what shipped:

| Preset | Thumbnail | Title type | Where it renders |
|---|---|---|---|
| `default` | 16/9 or 3/4, fluid | `kol-mono-20` | Stack filtered grid |
| `hero` | 16/9, fluid | `kol-sans-heading-03` | Stack top row, StackLatest lg+ |
| `mini` | 120×120 fixed | `kol-mono-14` | StackLatest below lg |
| `readmore` | 120×120 fixed (mini's) | `kol-mono-14` | end-of-article — **never rendered anywhere yet** |

None of this says what happens at a breakpoint (StackLatest today swaps
mini↔hero at `lg` by rendering two components), what heights are canonical, or
whether 120×120 is a ruling or an accident of the first mini.

## The fix

Write the spec — a table the DS conforms `ArticleCard` to, covering:

- **The preset shortlist itself** — are four right? Is `readmore` real, and
  what is its intended geometry (it is currently the DS's guess, twice)?
- **Thumbnail geometry per preset** — fixed boxes (120×120?) vs aspect boxes
  (16/9, 3/4), and the canonical numbers.
- **Type per preset** — title/excerpt/kicker classes, so the `titleClassName`
  seams are overrides, not load-bearing.
- **Breakpoint behaviour** — which preset renders at which width in each
  context, and whether that swap belongs in the consumer (today's
  StackLatest pattern) or in the card.
- **Heights/clamps** — line-clamp counts per preset are currently 2/3/2 by
  copy-paste; confirm or re-rule.

File the answers back to kol-ds-ui as a `/lobby-ds` ticket (or a resolution on
this one's receipt); the DS updates `ArticleCard` to the spec and the numbers
stop being archaeology.

## Also: is "Article" even the right name? (appended 2026-08-15, user ask)

Two questions for the same spec, verbatim intent: *"can ArticleCard be used for
other things not 'article'? if naming things such specifically, are they
cross-functional enough? we want these cards to be used with as wide a scope as
possible."*

- **Scope** — the card's anatomy (thumbnail · kicker · title · excerpt · meta ·
  link) is generic listing anatomy, nothing in it is article-specific. Should
  the spec cover it as THE listing card — projects, prints, typefaces, tools —
  not just Stack posts?
- **Naming** — `ArticleCard` sits beside `WorkCard`/`WorkListItem` in
  kol-content, which is already two names for content-domain listing cards. If
  the ruling is wide-scope, does the family converge on one domain-neutral name
  (with the current names as aliases), or stay split by content type?

Rule on both in the same table — the geometry answers change if the card serves
every listing context rather than one.

## Rejected alternative

The DS ruling the geometry itself — rejected because it already tried, twice,
and the first attempt shipped invented geometry that had to be corrected the
same day. The consumer owns the contexts; the contexts decide the geometry.

## Definition of done

- [x] A geometry table exists covering all presets × (thumbnail, type,
      clamps, breakpoint behaviour)
- [x] `readmore`'s intended shape is confirmed or redrawn against a design
- [x] Scope ruling: article-only, or THE listing card for any content type
- [x] Naming ruling: keep `ArticleCard`/`WorkCard` split, or converge on a domain-neutral name
- [x] The spec is filed back to kol-ds-ui

## Resolution — 🟢 2026-08-15 (user rulings, same day)

All five DoD items closed; the spec lives at
`~/dev/projects/kol-ds-ui/lobby/inbox/ListingCardSpec.md` (receipt:
`lobby/outbox/ListingCardSpec.md`). The rulings:

1. **Presets: THREE — `readmore` dropped.** Never rendered anywhere, the DS
   invented it twice, its shape was literally mini's. "Read more" is a
   **context, not a size** — a band renders `mini` + `label`.
2. **Geometry:** hero 16/9 fluid · sans-heading-03 · clamp 2 // default 16/9
   fluid (3/4 opt-in) · mono-20 · clamp 3 // mini **120×120 fixed, confirmed
   as a ruling** · mono-14 · clamp 2. Breakpoint swaps live in the CONSUMER
   (StackLatest's mini↔hero at `lg` is the pattern); the card does no internal
   swapping. Type seams stay replace-only overrides.
3. **Scope: WIDE** — THE listing card for any content type; article-only
   breeds a fork per domain.
4. **Name: `ListingCard`** — role, not content, per the naming law;
   `ArticleCard`/`WorkCard` alias until next major.
