# CardFeatureHoverZoom — card visual zooms slightly on hover

**Filed:** 2026-08-12 → **kol-ds-ui**
**Entry:** `~/dev/projects/kol-ds-ui/lobby/done/CardFeatureHoverZoom.md`
**Ledger:** `~/dev/projects/kol-ds-ui/lobby/INDEX.md` — **the truth about this ticket**
**Last known:** 🟢 `closed` · synced 2026-08-12 — shipped in `@kolkrabbi/kol-theme@0.40.0` + `@kolkrabbi/kol-component@0.38.0`: visual zooms 1.03 on card hover (300ms, same clock as the border), chrome in kol-theme, reduced-motion opts out. ✅ **Remainder executed 2026-08-12 same session, wider than filed:** the fork pair had FOUR consumers, not one — Home + Studio + foundry InDevelopmentSection (section) + WorkshopFeatures (direct CardFeatureItem). All four now on the DS pair; the fork's default content moved app-side to `src/data/featureCards.js` (`useFeatureCards()`, theme-variant CDN URLs); Studio's dead `actions`+`showActions={false}` combo dropped. Both fork files → `_tmp/2026-08-12-chrome-fork-retirement/`. Build 3/3 green. ⚠ Two deltas to eyeball: the section header steps heading-02→heading-03 (DS spec) and the per-card `.reveal` stagger is gone (DS renders cards bare)

## Why it went there

User ruling on the home feature cards: hover should zoom the graphic slightly.
The cards render through a diverged LOCAL fork pair (`sections/shared/
FeaturesCardSection.jsx` + `workshop/molecules/CardFeatureItem.jsx`) of
components the DS already ships newer — adding the zoom locally would deepen
the fork, so the behavior goes upstream: visual scales ~1.03 on card hover,
same 300ms clock as the existing border-brighten, overflow-hidden wrapper,
reduced-motion aware.

## Remainder here once it ships

Bump kol-component, swap `Home.jsx` to the DS `FeaturesCardSection`, retire
both local files to `_tmp/` (ContentFilters-shape adoption), eyeball `/` live.
