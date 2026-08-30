# StackCardHover — hero-size thumb zooms 1.02; article card titles dim 70% on hover

**Filed:** 2026-08-27 → **kol-ds-ui**
**Entry:** `~/dev/projects/kol-ds-ui/lobby/inbox/StackCardHover.md`
**Ledger:** `~/dev/projects/kol-ds-ui/lobby/INDEX.md` — **the truth about this ticket**
**Last known:** 🟢 `closed` · synced 2026-08-27 — theme 0.61.0 · component 0.90.2 · content 0.10.2; remainder executed here 2026-08-27

## Why it went there

Tuned locally first: the hero thumb at the family's 1.06 was too much travel
(→ 1.02), and the article cards didn't dim their title on hover like the
hero card does (→ 70% / 200ms). Both are DS card chrome.

## What stays here

Two scoped rules at the tail of `apps/web/src/styles/ui.css`
(`.stack-featured …`, `.stack-articles …`) + the `stack-article-title` class
on the article `titleClass`.

## Remainder here once it ships

bump; delete the two `ui.css` rules and the `stack-article-title` /
`stack-articles` / `stack-featured` hooks in `Stack.jsx`

## ✅ RETURNED — 2026-08-27 · kol-theme 0.61.0 · kol-component 0.90.2 · kol-content 0.10.2

Hero rung on the media zoom: .kol-media-zoom.is-hero scales 1.02 — ListingCard size=hero wears it, ContentMedia takes zoom="hero" (ContentCard passes it through); the default size stays 1.06. Title dim: ContentText stamps kol-content-title-dim on the article title in both forms; the theme dims it to 70% / 200ms on .kol-card / .kol-row hover (keyed off the card root, not any .group ancestor), reduced-motion opt-out. Measured on the comparison page: ContentCard article title 1 → 0.7 over 0.2s, ContentRow 0.7, the is-hero rule at matrix(1.02). Note: ContentCard's root IS a Tailwind group (kol-card group) — the rule is on the card root anyway.

**Remainder here:** bump kol-theme 0.61.0 + kol-component 0.90.2 + kol-content 0.10.2; delete the .stack-featured / .stack-articles rules and the stack-article-title hook from ui.css

✅ **Remainder executed 2026-08-27 same session:** theme 0.61.0 + component ^0.90.2 + content ^0.10.2 in both apps; the two `ui.css` rules and the `stack-featured` / `stack-articles` / `stack-article-title` hooks deleted. **`/stack` content-filter swap complete** — hero, featured card, filter bar, article cards all on the set. Builds green.

## ➕ FOLLOW-UP — 2026-08-27 · kol-component@0.91.0 — the hero card exists now

`ListingCard size="hero"` had no `ContentCard` equivalent, which is the only reason Stack still imports `ListingCard` (and why three tickets patched a retiring card — the DS now has a gate rule against that, R4). **`ContentCard variant="article" hero`**: header row above the media (`label` left, `meta` chips right), media on the 1.02 zoom rung, title on display-03, body mono-14, `tags` → `data-tags`, same `frame` (off) and title dim.

**Remainder here:** bump kol-component 0.91.0; Stack's featured card → `<ContentCard variant="article" hero label="Featured" meta={latestArticle.meta} kicker={…} title={…} body={summary} media={<img src={thumbnail} alt="" />} tags={tags} href={…} onNavigate={…} titleClass="… uppercase" />` and drop the `ListingCard` import — that is the last one; the retirement sweep then reads kol-website ×0 for it.

## ➕ FOLLOW-UP — 2026-08-27 · kol-component@0.92.1 — the title dim survives `titleClass`

The dim hook rode inside the title's ramp string, and Stack's `titleClass` override (uppercase display title) replaced that string whole — so the hover vanished the moment the local `.stack-article-title` rule came out. 0.92.1 re-attaches `kol-content-title-dim` after any override. **Remainder here:** bump kol-component 0.92.1; nothing else — keep the `titleClass`.
