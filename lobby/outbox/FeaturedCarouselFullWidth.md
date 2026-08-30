# FeaturedCarouselFullWidth — `fullWidth` never widens the slides; two videos show at once

**Filed:** 2026-08-26 → **kol-ds-ui**
**Entry:** `~/dev/projects/kol-ds-ui/lobby/inbox/FeaturedCarouselFullWidth.md`
**Ledger:** `~/dev/projects/kol-ds-ui/lobby/INDEX.md` — **the truth about this ticket**
**Last known:** 🟢 `closed` · synced 2026-08-26 — framework 0.25.0 · component 0.70.0; remainder executed here 2026-08-26

## Why it went there

Studio hero (`apps/web/src/routes/Studio.jsx:57-79`) shows two videos at once.
`kol-framework.css:502` gives every `.is-slides` slide
`clamp(320px, 72vw, 900px)`; `fullWidth` only drops the section padding, so on
a full-bleed hero the neighbour slides peek in on both sides and their videos
autoplay. DS-internal — nothing Studio passes causes it.

## What stays here

No stopgap. Studio's hero goes to `SectionHero` on the `SectionSet` return;
`FoundryTypefaces` is the other `FeaturedCarousel` call site.

## Remainder here once it ships

bump kol-framework (+ kol-component if the prop route); eyeball the studio
hero at 1440 — one video, edge to edge

## ✅ RETURNED — 2026-08-26 · kol-framework@0.25.0 · kol-component@0.70.0

`fullWidth` now fills the container: `.kol-featured-carousel.is-full .kol-embla-slide { width: 100% }` in kol-framework.css (the peek `clamp(320px, 72vw, 900px)` stays the default — nothing existing moves), and `FeaturedCarousel` stamps `is-full` on the section when `fullWidth` is set. Inactive video slides no longer play: the plain `<video>` and `HlsVideo` autoplay only while their slide is the selected one and pause when it leaves the stage (`HlsVideo` gains `active`, default true). Measured headless in the showcase at 1440: peek slide 900 in a 734 container; with `is-full` the slide is 734 = the container. No console errors.

**Remainder here:** bump kol-framework to 0.25.0 + kol-component to 0.70.0; Studio and FoundryTypefaces render one slide at a time with no change at the call sites

✅ **Remainder executed 2026-08-26 same session:** kol-framework ^0.25.0 + kol-component ^0.70.0 in both apps (same install as FrameworkComponentPeer). No call-site change — `fullWidth` now stamps `is-full`. Studio hero at 1440 eyeball is the user's.
