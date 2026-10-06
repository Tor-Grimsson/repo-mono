# Session: Workshop PageSection pilot + shell full-bleed

**Date:** 2026-07-09
**Agent:** Claude (Grim)
**Summary:** Pulled the 4 pushed `@kolkrabbi/*` updates, then executed the workshop-content-flow plan's Step 0 + pilot: DashboardComponents accordion → framework PageSections, shell de-clamped to full-bleed, framework container model adopted, Right Grotesk fonts shipped to web. Plan doc: `plans/workshop-content-flow.md`.

## Changes Made

### Files Modified
- `package.json` / lockfile — `@kolkrabbi/kol-component` 0.6.0, `kol-icons` 0.5.0, `kol-theme` 0.6.0, `kol-framework` 0.3.2 (`pnpm update -r --latest`); build 5/5 green after.
- `apps/web/src/index.css` — +2 imports (`kol-framework.css`, `kol-typography.css`, both `layer(components)` before web CSS so web wins all 11 class collisions); +`:root { --kol-container-max: 1600px }`.
- `apps/web/src/routes/workshop/DashboardComponents.jsx` — full transform: 14 `SectionToggle`+gate accordions → open `PageSection`s (old keys kept as `id`s); `useSectionExpansion`/`SectionToggle`/EXPAND-ALL wiring deleted from page; `DesPage` header → intro `PageSection` (strings verbatim). Demo bodies untouched.
- `apps/web/src/components/shell/ShellLayout.jsx` — `mx-auto max-w-[1800px]` removed from 3-col wrap (full-bleed); MainColumn stays plain `w-full` (framework owns measure); right TOC track 160→**224px**.
- `apps/web/src/components/shell/ShellHeader.jsx` — `mx-auto max-w-[1800px]` removed from both header rows (wordmark row + tab row).
- `packages/ui/css/components.css` — deleted the ≥1600 media width bumps (rails 320/256, logo 320) — unrequested; rails/logo back to base widths at all viewports. Font-size bumps + 48px gap kept.
- `apps/web/public/fonts/` — +`Right-Grotesk/` (98 woff2) +`Right-Grotesk-Text/` (12) copied from brand public; kills the "rejected by sanitizer" 404s, `kol-prose-*` now renders Right Grotesk.

### Features Added/Removed
- **Accordion UX removed** on `/workshop/dashboard/components` — everything renders open, flowing like brand's styleguide.
- **Framework container model live in web**: shell full-bleed, `.kol-page` self-clamps at 1600 + self-centers with native 64px/pad-x padding + 720px header measure. (First attempt fought this with a MainColumn clamp + zeroed padding — corrected same session.)
- **Right-rail float experiment reverted** — tried absolute + right-offset variants, settled back to in-grid sticky, only wider (224px).

## Current State

### Working
- Pilot page 100% framework idiom; fonts loading; build green; user render-verified through iterations.
- Plan doc `plans/workshop-content-flow.md` is the tracker — Step 0 ✓, pilot ✓, Slice 2 ✓, audit section added.

### Known Issues
- **Type audit findings (flagged, untouched):** web runs two parallel type systems — legacy `theme.css` no-space families (flat .woff) vs KOL canon (spaced families, full cuts). Legacy `RightGrotesk` declared TWICE at weight 500 (Narrow dead). Convergence = own slice.
- **Un-swept pages** (docs, Design System, Components, Overview) now sit in an unclamped main until converted; `DesPage`/`DesSection` still in use there.
- `@kol/ui` `SectionToggle` + `useSectionExpansion`/`WorkshopExpansionContext`/`StyleguideExpansionProvider` still alive (other consumers) — retire at end of sweep.

## Next Steps
1. **Slice 1 remainder:** DashboardOverview card fixes (2 dead cards out, metrics card in, `/metrics` use-case block) + `dashboard/chess` dupe-out (nav line + redirect).
2. **Slice 3 sweep:** Design System + Components pages → same PageSection treatment; then retire expansion machinery globally.
3. Legacy→canon type convergence (own slice, see plan audit section).
