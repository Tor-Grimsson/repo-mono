# ArticleHeaderReconcile — diverged twins, one survivor

**Filed:** 2026-08-15 → **kol-ds-ui**
**Entry:** `~/dev/projects/kol-ds-ui/lobby/inbox/ArticleHeaderReconcile.md`
**Ledger:** `~/dev/projects/kol-ds-ui/lobby/INDEX.md` — **the truth about this ticket**
**Last known:** 🟢 `closed` · synced 2026-08-15 — kol-content 0.5.0 + kol-component 0.40.0

## Why it went there

Local ArticleHeader (167L) vs kol-content's (87L) — 220-line diff, local is the
richer twin. Superset ships package-side per the diff-before-swap rule.

## What stays here

- **On ship: adopt** — StackArticle swaps, local file retires.

## Return — 🟢 2026-08-15

Shipped in **`@kolkrabbi/kol-content@0.5.0`** + **`@kolkrabbi/kol-component@0.40.0`**
(both registry-verified).

**Read both, and the package was already canon.** Your copy is bigger, but the
220 lines are not features — four Sanity image-URL builders, the `reveal`
entrance utility and its inline `--reveal-delay`, `kol-helper-14 uppercase` on
the meta line (against the no-`text-transform` rule), and `kol-display-lg` where
the prose role class belongs. Taking the superset literally would have
re-imported everything the de-Sanitizing removed. It did not come back.

**Three things yours had that the package genuinely lacked, now shipped:**

- **`authorImage`** — fixed where it belonged. Your `<img className="w-12 h-12
  rounded-full object-cover">` existed only because `Avatar` did initials, so
  `Avatar` gained `src`/`alt` and `AuthorLine` gained `image`. Every byline and
  card in the estate gains photos, not just the masthead.
- **`heroImageSrcSet` / `heroImageSizes`** — pass-through to DS `Image`. **You
  still build the candidate string**; the package resolves no URLs, so your
  Sanity builders stay yours and feed these two props.
- **`tagSize`** (default `md`) — the sm-below-lg Pill. Note it is ONE row now:
  yours rendered the whole tag list twice behind `lg:hidden` / `hidden lg:flex`.

**The index-as-key you flagged was ours too** — `key={i}` on the tag row here as
well. Keyed by label now, both sides.

**Remainder here:** bump `@kolkrabbi/kol-content` to `^0.5.0` and
`@kolkrabbi/kol-component` to `^0.40.0`, point `routes/StackArticle.jsx` at the
package `ArticleHeader`, feed `authorImage`/`heroImageSrcSet`/`heroImageSizes`
from your existing Sanity builders, then retire
`components/prose/layouts/ArticleHeader.jsx`.

✅ **Remainder executed 2026-08-15 same session:** kol-content ^0.6.1 +
kol-component ^0.43.0 bumped; StackArticle on the package `ArticleHeader`, Sanity
builders kept app-side feeding the three new props; local twin retired to
`_tmp/2026-08-15-anatomy-adoption/`. Two package-design deltas noted: no-cover
articles now render no hero block (old code showed an empty placeholder box), and
the tag row is one `md` row (the sm-below-lg doubling is gone). Build 3/3 green.
