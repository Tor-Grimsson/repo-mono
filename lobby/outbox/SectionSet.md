# SectionSet — website sections composed from one text molecule + one media slot (bundled set)

**Filed:** 2026-08-26 → **kol-ds-ui**
**Entry:** `~/dev/projects/kol-ds-ui/lobby/inbox/SectionSet.md`
**Ledger:** `~/dev/projects/kol-ds-ui/lobby/INDEX.md` — **the truth about this ticket**
**Last known:** 🟢 `closed` · synced 2026-08-26 — component 0.71.0 · theme 0.54.0; remainder executed here 2026-08-26

## Why it went there

Hero · split · cards band · CTA · FAQ are DS organisms already
(`FullBleedHero` · `FeatureSplit` · `FeaturesCardSection` · `CtaGlobal`;
FAQ has only `Accordion`), but none share a text primitive or a media slot —
each types its own kicker / heading / body / media. The user's ask: build them
from components (`SectionText`: label · headline · body · actions, all opt-in;
`ContentMedia` reused as the slot, takes any node incl. interactive cards) under
one `Section*` prefix so they group in a rail, with `align: left | right |
center` on the split instead of a third component. Second filing of the idea —
`SectionSplit` (08-15) got the anatomy answered, not the composition.

## What stays here

Studio is the first adopter on return: hero → `SectionHero` (kills the local
`StudioAboutCard`), process → `SectionSplit` with `ProfileCard` in
`ContentMedia`, services → `SectionCards`, connect → `SectionCta`.

## Remainder here once it ships

bump kol-component + kol-theme; adopt on Studio; retire `StudioAboutCard` to
`_tmp/`; eyeball hero / split / cards / cta against the current render

## ✅ RETURNED — 2026-08-26 · kol-component@0.71.0 · kol-theme@0.54.0

`SectionText` (new molecule) — label · headline · body · actions, every slot opt-in, type by role (`headlineSize`), every default class a seam — and the five organisms on it: `SectionHero` (= FullBleedHero; text props render as SectionText in its own glass panel, `panel` still renders verbatim), `SectionSplit` (= FeatureSplit + `align: 'right' | 'left' | 'center'` — media side or one centred column; `flip` → `align="left"`), `SectionCards` (= FeaturesCardSection), `SectionCta` (= CtaGlobal), `SectionFaq` (new — SectionText over Accordion `{ q, a }`, `singleOpen`). The inspector's `Section` is `InspectorSection`. Every old name is a `@deprecated` alias with its old prop names mapped — nothing breaks, removed at the next major. The organisms emit `.kol-section-text-*` / `.kol-section-split-*` (theme 0.54.0; the old `.kol-feature-split-*` selectors sit on the same rules one release). Parity measured headless in the showcase, every node's rect/font/colour before vs after: split and CTA identical; the cards band lost one wrapper div the heading never needed (same 32px box); the composed hero puts every original node on the same pixels. Not folded (follow-up, not a blocker): `NewsletterBand` / `FramedMediaBand` / `FoundryCTA`. Not built: `ContentMedia` inside sections — a section's media is the caller's node, as today.

**Remainder here:** bump kol-component 0.71.0 + kol-theme 0.54.0; Studio is the first adopter — hero on `SectionHero` (text props, or keep the panel), `StudioProcessCard` on `SectionSplit` with `ProfileCard` in the media slot, `FeaturesCardSection` → `SectionCards`, `ConnectCta` → `SectionCta`; retire `StudioAboutCard`

✅ **Remainder executed 2026-08-26 same session:** kol-component ^0.71.0 + kol-theme 0.54.0 in both apps (one kol-component, peers alone). Studio adopted: hero → `SectionHero` (studio HLS video, about copy in the organism's glass panel — copy verbatim, `panelMaxWidth` 600, the second carousel slide dropped with the carousel), `StudioProcessCard` → `SectionSplit` (`ProfileCard` in the media slot, `ratio="auto"`), `FeaturesCardSection` → `SectionCards`, `ConnectCta` → `SectionCta`. `StudioAboutCard.jsx` → `_tmp/2026-08-26-studio-sectionset/`. Web build green. Eyeball of the composed hero is the user's; the hero kicker still reads "Services" (copy untouched — content call).
