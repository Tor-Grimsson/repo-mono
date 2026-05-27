# Session: Monorepo merge — Phase 3 (@kol/component created + primitive extraction begun)

**Date:** 2026-05-27
**Agent:** Grim
**Status:** Phase 3 in progress. `@kol/component` created; 4 primitives extracted (Divider + 3 zero-CSS); full 14-component collision map produced; critical path identified. All code in `~/dev/projects/kol-monorepo`.

## Done
- **Created `packages/component` (`@kol/component`)** — raw-JSX export pkg mirroring `@kol/ui` (type module, `main ./src/index.js`, peerDeps react/react-dom). Added as dep to `@kol/ui` + `apps/brand`; pnpm links it (workspace now 11 projects).
- **Divider extracted** (proof slice): moved to `@kol/component`; `@kol/ui` re-exports `{ Divider } from '@kol/component'` so web's ~147 import sites are untouched. Fixed 4 internal `@kol/ui` relative importers (SectionToggle, atoms/foundry/PairingCard, organisms/foundry/FontPreviewItem, organisms/filters/ContentFilters). Brand's 3 importers (PageSection, molecules/ContentFilters, Acyr) repointed to the package + brand's local `atoms/Divider.jsx` deleted.
- **3 zero-CSS-risk primitives extracted (web-side):** DropdownTagFilter, QuantityInput, QuantityStepper — byte-identical web/brand, inline-style only, no relative importers. Moved to `@kol/component`, `@kol/ui` re-exports. Brand's dormant copies + `apps/brand/src/data/components.js` metadata left for Unit 5.
- Forced build green (5/5, 0 cached) after each unit.

## Key findings
- **turbo cache trap (important):** raw-source pkgs (`@kol/ui`, `@kol/component`) have no build script → not in turbo's `^build` input graph → `pnpm build` reports a CACHED "5/5 green / FULL TURBO" even when their source is broken. A cached pass hid a real `Could not resolve "../atoms/Divider.jsx"`. **Gate Phase 3 with `pnpm exec turbo run build --force`.** Almost certainly what fooled prior agents into thinking broken states were green.
- **Collision map (14 components, via classifier subagent):**
  - **SAFE** (identical + inline-style): DropdownTagFilter, QuantityInput, QuantityStepper — ✅ done.
  - **LIGHT** (token rename / dead import): SectionLabel (`kol-heading-md` vs `kol-sans-heading-03`), ToggleCheckbox (`kol-mono-xs` vs `kol-helper-12`), ToggleSwitch (brand adds `variant=plain`; web has dead `TogglePill` import), Pill (identical code but emits `pill-*`, not `kol-*`).
  - **HARD** (real API + CSS divergence): Badge, Button, Dropdown, Input, Slider, Tag, ToggleBracket.
- **Critical path:** every remaining component emits custom classes, and web's class vocabulary (`btn-*`, `pill-*`, `kol-mono-xs`) ≠ brand canonical (`kol-btn*`, `kol-*`, `kol-helper-12`). **Web must adopt `@kol/theme`'s canonical component + typography CSS before any canonical-class component renders correctly in web.** This is the next big step and the first broad web-visual change.
- **Merge-not-clobber:** web's Tag (sizes/icon/onRemove/variants), Button (`selected`/`control`), Slider (`displayWidth`), and Dropdown vs brand's floating-ui popover — several web primitives are RICHER than brand's. "Canonical wins" must mean fold web's features UP into the canonical component, not regress the live site.

## Next steps
1. **Web CSS convergence (Option A):** additively import `@kol/theme` canonical `kol-components-*.css` + canonical typography into web; check class collisions; migrate components to canonical classes; delete web's superseded component CSS at the end. Playwright light/dark snapshot of web before/after = visual gate (user's eyes).
2. **LIGHT batch** (mechanical once web has canonical CSS).
3. **HARD batch**, porting web's richer features up into the canonical components.
4. **Unit 5:** brand drops dormant dupes + `components.js` `file:` paths point at the package.
5. **Unit 6:** evict `ShellTocContext`/`ShellFullHeightContext` from `@kol/ui/layout` → `apps/web`.

## Web CSS convergence (task 8) — base layer landed, verified inert
- `apps/web/src/index.css`: declared `@layer kol-base;` as the FIRST statement (lowest priority), then imported `@kol/theme/kol-components-atoms.css` + `kol-components-molecules.css` with `layer(kol-base)`, before web's `@kol/ui/css/components.css`.
- **Why the layer:** web wraps ALL its component CSS in `@layer components`; canonical is unlayered → unlayered beats layered → naive import would restyle web everywhere. Lowest `kol-base` layer makes canonical an INERT fallback (web's `components` layer outranks it). Verified in built CSS: `@layer kol-base` @byte 7095 < `@layer components` @byte 36102; build 5/5 green.
- **Typography NOT converged:** `kol-typography*.css` carry `@font-face`/`:root`/`@theme` (would clash with web's tokens/fonts). The few canonical type classes (kol-helper-12, kol-sans-heading-03, kol-mono-12/14/16) get handled per-component, not by importing those files.

## Peel model (the remaining reconciles)
- **Different-name** (Button `btn-*`→`kol-btn*`, Input `input-*`→`kol-control`, Badge `dash-body`→`kol-badge`, Dropdown): canonical emits NEW class names → canonical kol-base CSS applies automatically; web's old-name CSS goes dead → delete as cleanup. No cascade fight.
- **Same-name** (Pill `pill-*`, Tag `tag-control`, Toggle* `toggle-*`, Slider `control-slider`/`slider-black`, SectionLabel `section-label-wrapper`): web wins until I DELETE web's rule from `@layer components` → canonical (kol-base) takes over. Gate each: rule-diff web vs canonical — identical → safe delete (no visual change); drifted → Playwright snapshot.
- **Pill: code MOVED** to @kol/component + re-exported + web importers repointed (OverviewHero, FeaturedItemsCarousel). Inert, build green. Its CSS rule-diff showed DRIFT (web `border-radius:9999px` + size-only padding vs canonical `var(--kol-radius-full)` + variant padding), so web's `pill-*` deletion is deferred to the batched CSS-convergence pass — not done piecemeal.
- **Refined model:** code-move is inert ONLY for identical-code components (Divider, safe-3, Pill). Drifted/different-API components (the other 9) restyle web when their code converts to canonical — that's the de-drift, gated by ONE Playwright review, not 11 micro-gates.
- **Typography blocker — RESOLVED for mono.** New `packages/theme/kol-type-mono-classes.css` (class-only, font-agnostic) holds `.kol-mono-N`/`.kol-helper-N`, lifted out of `kol-typography-mono.css` (which keeps @font-face/:root/@theme). Umbrella `kol-theme.css` imports both (brand unaffected — verified mono classes still present); web imports the class file into `layer(kol-base)`. Web now has kol-mono-12/14/16 + kol-helper-12, rendered in web's RightGroteskMono (fonts stay per-app — `--kol-font-family-mono` differs: web=RightGroteskMono, brand=JetBrains; that divergence is BY DESIGN). Build 5/5 green; `kol-mono-12`/`kol-helper-12` confirmed in web's built CSS. Unblocks Button/Input/Dropdown/Slider/ToggleCheckbox.
- **Still pending typography:** `kol-sans-heading-03` (SectionLabel lg) needs `--kol-font-family-sans-compact` + `--kol-text-heading-03`, both MISSING from web (web has `--kol-font-family-rgrot-compact` under a different name). Handle at SectionLabel — likely map to web's existing token or keep web's `kol-heading-md`.
- **Web CSS bug noted (for SectionLabel reconcile):** web's components.css `.kol-label-compact-*` use `--kol-font-family-rgrot-narrow` (wrong); canonical (kol-components-atoms, now in web's kol-base) uses `--kol-font-family-mono` — correct once that wins.

## Reconcile order (foundation complete)
Foundation done: @kol/component + re-export shim + kol-base canonical component CSS + canonical mono type classes — all in web, all inert. Now reconcile components (canonical wins styling; port web's richer features up). Minor first (ToggleCheckbox, ToggleSwitch), then major (Badge, Button, Dropdown, Input, Slider, Tag). Each: pick canonical (brand) version → @kol/component → @kol/ui re-export → repoint importers → delete web+brand dupes. CSS converges as web's old same-name rules get deleted (the peel). One Playwright review at the end (#7).

## Reconcile progress
- ✅ **ToggleCheckbox** — canonical (brand) version moved to @kol/component; web's label converges kol-mono-xs → kol-helper-12 (now available in web). @kol/ui re-exports; brand Components.jsx repointed; web dup deleted. Build green.
- ✅ **ToggleSwitch** — canonical (brand) has `variant="plain"` + no dead import; web's had a dead `TogglePill` import. Adopted brand's; re-exported; brand LogoCard.jsx + Components.jsx repointed; web dup deleted. Build green.
- ⬜ **SectionLabel** (minor): lg textClass `kol-heading-md` (web) vs `kol-sans-heading-03` (brand). Latter needs `--kol-font-family-sans-compact` + `--kol-text-heading-03` (MISSING from web; web has `--kol-font-family-rgrot-compact`). Decide: map/alias or keep web's kol-heading-md for lg.
- ⬜ **HARD feature-merges** (each changes live web UI → fold web's richer features UP, gate at Playwright review): Badge (icon port-up), Button (btn-*→kol-btn*, control→ghost/quiet, selected prop), Dropdown (web simple → brand floating-ui popover), Input (input-* → kol-control shell), Slider (web displayWidth + brand editable readout), Tag (web sizes/icon/onRemove), ToggleBracket (kol-control shell).

- ✅ **ToggleBracket** — adopted brand's `kol-control kol-control--filled kol-control-md` shell (canonical) over web's bespoke `toggle-bracket` classes. Same API (label/value/onChange/onToggle/variant). Web's 2 usages (workshop TogglesPreview, WavyCircleControls) use default variant → restyle to kol-control shell (review-gated). @kol/ui re-exports; brand Components.jsx repointed; web dup deleted. Build green.

Components deduped so far: Divider, DropdownTagFilter, QuantityInput, QuantityStepper, Pill, ToggleCheckbox, ToggleSwitch, ToggleBracket (8) + the package. Tree GREEN + clean.

## Confirmed feature-merge decisions (user, 2026-05-27) — "port-up, don't regress"
1. **Button** — adopt `kol-btn*`, map `control`→`ghost`, KEEP `selected` prop. (user: "not a nuclear warhead" — don't overthink.)
2. **Badge** — canonical `kol-badge` (8 variants/3 sizes) + port web's icon support up.
3. **Dropdown** — adopt brand's floating-ui popover (web gains `@floating-ui/react` dep).
4. **Input** — canonical `kol-control` shell + port web's icon-left up. ⚠️ **user note: Input + Dropdown + Button share the kol-control primary style but differ on responsive-size breakpoints (some size-responsive, some not) — "a whole thing." Reconcile the control-shell SIZING across the trio consistently, not per-component-blind.**
5. **Slider** — ⚠️ **user note: the MINIMAL variant (web's `control-slider-minimal`) is 99% of usage — PRESERVE it.** Merge brand's editable readout in as secondary; do not regress to brand's subtle-only.
6. **Tag** — canonical Tag = web's RICH version (sizes/icon/onRemove/variants) ported up; it's the superset.
- SectionLabel: keep web's `kol-heading-md` for lg (avoid missing sans tokens).
- Prerequisite: Icon → @kol/component (blocks Button/Dropdown/SectionLabel).

## Icon move DONE (foundation 100% complete)
Icon relocated `packages/ui/src/atoms/icons/` → `packages/component/src/icons/` (Icon.jsx + 166 svgs + svg-options); 20 importers repointed to `import { Icon } from '@kol/component'`; `@kol/ui` re-exports; Icon.jsx self-contained (no circular dep). Build 5/5 green. **All foundation + mechanicals done; only the 6 feature-merges remain. Tree GREEN + clean.**

## Feature-merge recipes (analyzed; each = real cross-app reconcile — gate w/ --force; ONE Playwright review at end)
Pattern: pick canonical → write merged version into @kol/component (Icon import = relative `./icons/index.js`) → @kol/ui re-export + delete web dup → repoint web+brand importers → delete brand dup → force build.

- **Tag** (RECIPE READY): canonical = web's rich Tag. ADD `hash` prop **default true** (preserves web's ~20 auto-`#` sites) + `text` fallback (`content = children ?? text`, for brand SwatchControls). Brand's 6 call-sites (molecules/ContentFilters, Components ×4, editor/color/SwatchControls ×2) pass `hash={false}`. Inverse → web's `tag-control-inverse` (retire brand's `control-unified-inverse`). Element = web's span/button. Web importers to repoint: ProseStylesViewer, organisms/filters/ContentFilters.
- **Badge**: canonical = brand `kol-badge` (8 variants/3 sizes) + port up web's icon. Web importers: dashboards (DashListCard/ChartCard/AlertCard/FeaturedCard); brand: Components.jsx:19, Acyr.jsx:5. Verify both call-site APIs.
- **Dropdown**: adopt brand's floating-ui wholesale; add `@floating-ui/react` to apps/web/package.json + pnpm install. Web importer: organisms/foundry/FontPreviewItemAlt; brand: 9 editor files. Check web call-site API vs brand's.
- **Input**: brand `kol-control` shell + port up web's icon-left. ⚠️ control-trio (Button/Dropdown/Input share kol-control sizing; user-flagged responsive-breakpoint inconsistency — reconcile sizing across all 3 together).
- **Slider**: ⚠️ PRESERVE web's `control-slider-minimal` (99% usage); merge brand's editable readout + subtle as secondary. Web importer: organisms/foundry/FontPreviewItemAlt; brand: 7 editor files.
- **Button**: `kol-btn*` (in web kol-base), `control`→`ghost`, KEEP `selected`. Web relative importers: FoundryCTA, PrintBuyButton, ButtonGroup. Control-trio sizing.

**Realization:** Tag (supposedly clearest) needed hash prop + text fallback + inverse-class pick + 6 brand call-site edits. Each merge is ~this involved with live-UI + cross-app impact. Best executed fresh + attentive → Playwright review.

## Progress update (continued same session)
- ✅ **Tag** merged (web's rich API + `hash` default true + `text` fallback; importers repointed; both dups deleted). Build green. NOTE: brand tags now render with `#` — flag at Playwright review for per-site `hash={false}`.
- ✅ **Badge** merged (brand `kol-badge` 8-variant/3-size + web's `icon` ported up; ICON_SIZES sm12/md14/lg16, Icon relative). Web dashboard badges restyle to kol-badge look. Build green.
- ✅ **SectionLabel** merged (web's version, KEPT `kol-heading-md` for lg; Icon relative). Build green.
- **11/15 components deduped** (Divider, DropdownTagFilter, QuantityInput, QuantityStepper, Pill, ToggleCheckbox, ToggleSwitch, ToggleBracket, Tag, Badge, SectionLabel) + Icon + foundation. Tree GREEN. Remaining: Button, Input, Dropdown, Slider.
- 🔑 **Control-trio sizing DECISION (user deferred → my call): FIXED.** Canonical `kol-control`/`kol-btn` fixed padding (4/12, 6/16, 8/20) wins; web controls drop responsive breakpoint scaling. Rationale: user confirmed web's current responsive sizing isn't optimal → porting it up = complexity for no gain. Fixed = simpler, consistent, canonical. No real regression.
- ⚠️ **Dropdown is heavier than recipe'd:** brand's Dropdown depends on a floating-ui POPOVER SUBSYSTEM (`usePopover` hook + MenuItem/MenuDropdownItem + PopoverPanel/Popover). Adopting it = moving that whole subsystem into @kol/component + adding `@floating-ui/react` to apps/web — not just Dropdown.jsx. Biggest single merge of the migration.
- **Final 4 (Button/Input/Dropdown/Slider) = heaviest + highest-visual:** Button restyles ALL web buttons (btn-*→kol-btn*); Dropdown = popover subsystem; Slider depends on Input. Button/Input adopt FIXED kol-control/kol-btn sizing. These need careful execution + THE Playwright review (web's core controls restyle).

## ✅ PHASE 3 PRIMITIVE EXTRACTION COMPLETE (2026-05-27)
All 4 final merges landed (delegated, build-gated): **Button** (kol-btn*, control→ghost mapped in-component, selected ported up), **Input** (kol-control shell + web's iconLeft ported up; SearchInput still wraps it), **Slider** (web's `control-slider-minimal` preserved + displayWidth + brand's editable Input readout merged), **Dropdown** (brand's floating-ui adopted; popover subsystem Popover.jsx/MenuItem.jsx moved into @kol/component; `@floating-ui/react` added to apps/web). Sizing = FIXED (decided). MenuPopover.jsx left in brand (standalone, correct).

**@kol/component final exports:** Divider, DropdownTagFilter, QuantityInput, QuantityStepper, Pill, ToggleCheckbox, ToggleSwitch, ToggleBracket, Icon, Tag, Badge, SectionLabel, Button, Input, Slider, Dropdown, usePopover/PopoverPanel/Tooltip, MenuItem/MenuDropdownItem/MenuDropdownDivider/MenuDropdownNest. **15 colliding components + Icon + popover subsystem unified.**

**Gate (#7):** `pnpm exec turbo run build --force` = **5/5 green, 0 cached** (independently verified). Playwright (dev server localhost:5174): home, /work, atoms-showcase all render **0 console errors**; /work ViewToggle + list render correct in dark (web default). Could NOT auto-expand the workshop atoms collapsibles (synthetic clicks didn't trigger the React SectionToggle) — per-primitive grid shot not captured, but compile + shell + real-page render confirm health.

## ⚠️ CASCADE-LAYER FIX (post-review — buttons/inputs were unstyled on web)
Symptom: web's `kol-btn` buttons + `kol-control` inputs rendered stripped (transparent, no chrome) while pills/tags/toggles looked fine.
Root cause: I'd imported canonical component CSS into a `kol-base` layer declared as the LOWEST layer (to be inert during migration). But lowest = BELOW Tailwind's `base` layer, which holds preflight resets (`button{background:transparent}`, input resets). Layer order beats specificity → preflight won → `kol-btn`/`kol-control` starved. Pills/tags/toggles were unaffected because web's own components.css (`@layer components`, higher) still styled those (web has same-name classes); only the canonical-ONLY classes (kol-btn, kol-control — no web equivalent) got starved.
Fix: `apps/web/src/index.css` — moved the 3 canonical imports from `layer(kol-base)` → `layer(components)` (Tailwind's components layer; above `base` so they beat preflight, below `utilities` so className overrides still win) and dropped the `@layer kol-base;` declaration. Web's components.css (also @layer components, imported after) still wins shared names → pills/tags/toggles unchanged. Build verified: `@layer kol-base` gone (0), `kol-btn-primary` present + ordered after `@layer base`.
**Lesson:** canonical component CSS for web must live in Tailwind's `components` layer, NOT a custom lower layer — or preflight eats it.

**To eyeball live (restyle is real, all review-gated as intended):** web buttons btn-*→kol-btn*; web dropdowns → floating-ui popover (portal, check-icon active rows); foundry sliders → editable Input readouts (were read-only spans); dashboard badges → kol-badge look; brand tags now show `#` (web tags unchanged — flag per-brand-site hash={false} if unwanted).

**Remaining to fully close Phase 3:** verify brand carries zero duplicated primitive source (#5 — merges deleted dups inline; confirm); evict ShellTocContext/ShellFullHeightContext from @kol/ui/layout → apps/web (#6). Carried from Phase 0: user owes Vercel project + brand.kolkrabbi.io DNS.

## State of @kol/component

## State of @kol/component
`packages/component/src/`: index.js, Divider.jsx, DropdownTagFilter.jsx, QuantityInput.jsx, QuantityStepper.jsx. Exports flat from `.`.
