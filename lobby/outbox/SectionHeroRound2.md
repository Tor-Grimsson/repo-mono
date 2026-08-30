# SectionHeroRound2 — one hero for every page

**Filed:** 2026-08-26 → **kol-ds-ui**
**Entry:** `~/dev/projects/kol-ds-ui/lobby/inbox/SectionHeroRound2.md`
**Ledger:** `~/dev/projects/kol-ds-ui/lobby/INDEX.md` — **the truth about this ticket**
**Last known:** 🟢 `closed` · synced 2026-08-26 — component 0.76.0 · theme 0.57.0; remainder executed here 2026-08-26 (foundry index pending `SectionHeroCarouselSeams`)

## Why it went there

User's rule: maintain ONE hero component. `SectionHero` (SectionSet, 0.71.0)
still can't do what Stack, the foundry index, typeface pages and licensing do:
vh height presets (`full` 100vh under the navbar · `80` · `60`, each with a
phone pair — user's ruling), content pinned to the bottom, a gradient veil,
a card overlapping the fold, rotating media (= `FeaturedCarousel`), a
text-only hero, and the "Licence" block (`FoundryCTA`) folded into the set.

## What stays here (done 2026-08-26, current packages)

Studio hero → `screen` under the navbar (top padding removed) · typeface pages
`h-[60vh]` (was 560/768px) · foundry index carousel `h-[80vh]`. Stack stays on
`StackHero` (90vh) until the hero can pin content to the bottom.

## Remainder here once it ships

bump; swap the three class strings for the presets; Stack → `SectionHero`
(retire `StackHero`); foundry index → `media=[…]`; licensing hero → text-only
`SectionHero` + FAQ → `SectionFaq`; `FoundryCTA` call sites onto the alias

## ✅ RETURNED — 2026-08-26 · kol-component@0.76.0 · kol-theme@0.57.0

One hero, seven asks, all in `SectionHero` (component 0.76.0 · theme 0.57.0). (1) `height` presets in viewport units: `full` = 100dvh (dvh, not vh — a phone's URL bar would push the foot off screen; sits under a fixed navbar, drop the pt-14 wrapper) · `80` = 70svh / 80vh · `60` = 50svh / 60vh; `lg` / `md` / `screen` stay as aliases. (2) `justify="end"` — items-end + StackHero's pb-32 → xl:pb-56 ramp. (3) `veil` — `.kol-section-hero-veil`, the bottom-heavy gradient, same device as the split's caption veil. (4) `foot` + `overlap` (default 250px) — the node renders across the fold, the hero owns the negative margin. (5) `media` as an ARRAY is the carousel: FeaturedCarousel is the engine (fullWidth, no header, one glass panel per slide; `autoPlay`, `autoPlayInterval`, `navPosition`), deprecated as a consumer import. (6) No media = the text-only hero: the composed SectionText on the surface, no glass panel. (7) `FoundryCTA` = `SectionCta variant="centered"` (rule · heading · mono line · Buttons), deprecated alias, same render. The split variant takes the same presets (`full` default). Measured headless: text-only 600px at 60 with no glass and no media; end at 80 → 800px with the veil and a 120px foot overlap; carousel `.is-full`, 2 slides, 600px, no header; centred CTA with rule, centred heading, two Buttons. Reference pages updated (`/components/section-hero`, `/components/section-cta`).

**Remainder here:** bump kol-component 0.76.0 + kol-theme 0.57.0: Stack → `SectionHero height="full" justify="end" veil foot={<FeaturedCard/>}` (StackHero retires) · foundry index → `SectionHero media={[…]} autoPlay height="80"` · typeface pages `height="60"` · licensing → text-only SectionHero + `SectionFaq` · Studio `height="full"` · FoundryCTA call sites → `SectionCta variant="centered"`

✅ **Remainder executed 2026-08-26 same session:** component ^0.76.0 + theme 0.57.0. Studio `height="full"` + `overlayOpacity={80}` (brand landing's wash) on the mood-05 still · Stack → `SectionHero height="full" justify="end" veil` with `SectionText` as the bare `panel` and the Featured card in `foot` (`StackHero.jsx` → `_tmp/2026-08-26-sectionhero-round2/`) · typeface pages `height="60"` · licensing → text-only `SectionHero height="60"` (Pill in `label`; the old hairline has no slot and is gone) + `SectionFaq singleOpen defaultOpen={0}` (hand-built accordion + its `useState` gone) · `FoundryCTA` ×3 → `SectionCta variant="centered"` (TypefacePage · FoundryLicensing · PrintsGrid). **Not done:** `/foundry` index — the carousel branch drops `renderTitle` / `ctaLabel` / `onNavigate`; filed `SectionHeroCarouselSeams`, page stays on the deprecated `FeaturedCarousel` import at `h-[80vh]`. Web build green; eyeballs are the user's.
