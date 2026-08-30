# SectionHeroCarouselSeams — the hero's carousel branch drops renderTitle / ctaLabel / onNavigate

**Filed:** 2026-08-26 → **kol-ds-ui**
**Entry:** `~/dev/projects/kol-ds-ui/lobby/inbox/SectionHeroCarouselSeams.md`
**Ledger:** `~/dev/projects/kol-ds-ui/lobby/INDEX.md` — **the truth about this ticket**
**Last known:** 🟢 `closed` · synced 2026-08-26 — component 0.76.1; remainder executed here 2026-08-26

## Why it went there

Adopting `SectionHero media=[…]` on `/foundry` (the round-2 remainder) loses
the typeface-font slide titles (`renderTitle`), the "Explore Typeface" CTA
(`ctaLabel`) and SPA navigation (`onNavigate`) — `SectionHero.jsx:196-213`
forwards only items / height / autoplay / nav position to the engine.

## What stays here

`/foundry` stays on the deprecated `FeaturedCarousel` import with
`height="h-[80vh]"` — renders correctly on 0.76.0.

## Remainder here once it ships

bump; `/foundry` → `SectionHero media={featuredTypefaces} height="80" autoPlay
autoPlayInterval={10000} navPosition="header" renderTitle ctaLabel onNavigate`;
drop the `FeaturedCarousel` import

## ✅ RETURNED — 2026-08-26 · kol-component@0.76.1

`SectionHero` forwards every FeaturedCarousel seam when `media` is an array: `renderTitle`, `ctaLabel`, `onNavigate`, `showTitle` / `showDescription` / `showCta`, `titleClassName`, `descriptionClassName`, `options` — passed only when set, so the engine's defaults hold otherwise. Measured on the showcase carousel demo: `renderTitle` renders the slide title in its own class (italic, display-02), the CTA reads the `ctaLabel` copy, and the anchor keeps its href for `onNavigate` to intercept. Reference page row added.

**Remainder here:** bump kol-component 0.76.1; `/foundry` → `SectionHero media={[…]} height="80" autoPlay renderTitle={…} ctaLabel="Explore Typeface" onNavigate={…}` and drop the FeaturedCarousel import

✅ **Remainder executed 2026-08-26 same session:** component ^0.76.1 in both apps; `/foundry` → `SectionHero media={featuredTypefaces} height="80" ctaLabel renderTitle onNavigate navPosition="header" autoPlay autoPlayInterval={10000}`; the `pt-14 md:pt-16` wrapper and the `FeaturedCarousel` import are gone — zero `FeaturedCarousel` call sites left in web. Eyeball is the user's.
