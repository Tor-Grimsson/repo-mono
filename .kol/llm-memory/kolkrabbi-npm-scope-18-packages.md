---
name: kolkrabbi-npm-scope-18-packages
description: "The DS ships ~18 packages under the @kolkrabbi npm scope — always enumerate the whole scope, never just the ones installed in kol-website"
metadata: 
  node_type: memory
  type: project
  originSessionId: d74575bf-c808-4845-a750-0fe95984eb6e
---

The kol-design-system publishes to npm as the `@kolkrabbi` scope — **18 packages as of 2026-07-15**, far more than the handful kol-website consumes (component/theme/framework/icons/workshop/store/brand/chess/dashboards). Others include `kol-content` (article-content components, ships `SourcesReferences`), `kol-styleguide`, `kol-foundry`, `kol-brand-template`, `kol-specimen`, `kol-loader`, `kol-media-client`, `kol-scrape`, `design-editor`.

**Why:** On 2026-07-15 Grim declared "SourcesReferences didn't ship" after checking only kol-component/theme/framework — it had been live in `@kolkrabbi/kol-content@0.1.0` since 2026-07-09. User was rightly flabbergasted.

**How to apply:** When asked whether the DS ships something, enumerate the scope first: `curl -s "https://registry.npmjs.org/-/v1/search?text=%40kolkrabbi&size=50"`. Don't confuse internal `@kol/content` (Sanity schemas) with upstream `@kolkrabbi/kol-content` (content components).

**Package status is NOT just the npm flag:** `kol-specimen` is DEPRECATED by user ruling (kol-foundry is canonical) even though npm carries no `deprecated` flag on it — Grim called it an "open ruling" twice on 2026-07-15 and got roasted. Read status from version activity (frozen 0.1.0 vs foundry's moving 0.4.x) + the user's rulings in `sprint-ds-adoption/04-package-registry.md`, not just registry metadata.
