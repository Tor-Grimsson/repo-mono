# 🏁 Milestone: Foundry ownership + polish

**Date:** 2026-07-28
**Agent:** Grim (Fable 5)
**Arc:** Page-audit apply batch → foundry composition vendored into web → icon-set curation round 2 → geometry/type laws pinned → user-driven polish barrage, iterating locally by the end.
**Delivered:** Web owns all foundry composition (`src/foundry-system/` + vendored ContentFilters + the SectionTitle header system); DS packages carry the block laws (pinned icon squares, dropdown sm default, toggle glyph pairing); v1 icon set regrouped and fed; foundry pages restyled end to end per user rulings.

## What closed
- Page-audit findings → APPLIED + probe-proofed (`_tmp/page-audit/04/05-*-PROOF.png`): dropdown sm law (then md on typefaces per ruling), footer/404/CTA orphan classes → kol roles, axis card 24px→60vh, weight-card hover-flip 1:1, dice icon → `type`, view toggle filled/bare
- Foundry ownership → 12 sections vendored to `src/foundry-system/`, ContentFilters to `components/ui/` (6 call sites), `SectionTitle.jsx` = THE section opener (secondary icon square + md text button); `@kolkrabbi/kol-foundry` dep = engine-only; dead twins in `routes/foundry/components/` DELETED; leftover t-shirt classes conformed
- Icon set (kol-icons 0.8.5+0.8.6) → 10 user picks + filled slider twin promoted; socials 1→10 (web's local vendoring deleted); new `typography/` + `editing/` groups; tools 26→19
- Geometry law (theme 0.11.24) → icon-only buttons = pinned squares sm28/md32/lg36, glyph-size independent; ThemeToggle glyph paired per rung (framework 0.5.10) + lg on large desktop at all 3 web sites
- Card type-roles → 9/10 card families on `kol-card-*` / `kol-mono-*` per the wrap law; opacity-hierarchy purged
- Section headers → renamed to section names + icons per user table (Styles/italic-a · Variable Font/slider-02 · Font Preview/type-02 · Glyph Viewer/underline · Character Sets/grid · Details/info · Pairings/overlap · OpenType/variant-01 · All Typefaces/library)
- Polish rulings landed: 65/35 preview split @ 5:4, 128px specimen lines, fg-02 card hovers, content width 1800, hero +64px with content hidden (flag in TypefacePage), preview-row hover, count hidden-until-filtering, filter tags sm, search = primary fill (no outline), fg-80 header icons, library hover = pure hover
- Parked (all at `plans/web-audit-5d-inventory.md` tail): hero pixel-ladder ruling · vertical-divider seat · BentoCard title + ArticleCardMini clamp rulings · stack/work rendered-audit gap (needs live data)
- DS shipping today (publish mine, git/deploy his): theme 0.11.8→24 · component 0.12.7→19 · foundry 0.5.1→4 · icons 0.8.5/6 · framework 0.5.9/10 · specimen page

## The arc (brief)
- Started as the page-audit apply batch (3 marked screenshots → fixes with browser probes as proof)
- Pivoted on the user law **"don't maintain cross/inter-repo systems"**: composition churn (13 component publishes in one day) forced the foundry vendoring — after which every tweak was a local HMR edit
- Conduct laws hardened: no opacity-as-hierarchy · magic numbers lose to the control ladder · corrections clarify, never retract · one system per behavior, no slightly-different twins
- Spans: `2026-07-28-MILESTONE-web-5d-audit.md` → this log; playbooks `2026-07-28-typography-truth.md` + `2026-07-28-page-audit.md` both complete
