# Parity Audit — `@kol/*` (monorepo) → `@kolkrabbi/kol-*` (kol-design-system)

> **Step 0 of the sprint** (see `00-INDEX.md`). Read alongside the board (`01-board.md`).
> Generated 2026-07-08 from a 5-agent read-only sweep of both repos, independently
> reviewed/corrected same day. This is the evidence; `03-plan.md` is the executable plan.

## Verdict — GREEN, fully incremental

Nothing here is atomic or a rewrite. The keystone (theme tokens) is **1:1**, the two
package sets have **different names so they coexist**, all upstream packages are
**already on public npm**, and every risk is small and named. apps/web rides on the
web-only elder `@kol/ui` (largely dead passthrough + stale dupes over `@kol/component`);
apps/brand consumes `@kol/component` + `@kol/loader` directly. So the work is: repoint
import sites `@kol/*` → `@kolkrabbi/kol-*` **per-site**, collapse the `@kol/ui` elder, then
retire the emptied workspace packages.

## Global prerequisites (before any JS-package swap)

_(§1 corrected 2026-07-08 review — the original stated the wrong mechanism and the opposite fix.)_

1. **`import.meta.glob` must survive dependency handling — `optimizeDeps.exclude`, not include.** The packages publish raw source (no `dist`); raw **JSX is a non-issue** (Vite core esbuild-transforms `.jsx` wherever it lives, node_modules included). The real hazard is **`import.meta.glob`** (confirmed in `kol-icons` `iconData.js`/`index.js`/`Icon.jsx` and `kol-component` `graphics/`): it's a Vite plugin-pipeline feature that esbuild **pre-bundling doesn't understand**, and registry-installed packages get pre-bundled by default. Fix: `optimizeDeps.exclude: ['@kolkrabbi/kol-icons', '@kolkrabbi/kol-component', '@kolkrabbi/kol-framework']` so they're served from source through the plugin pipeline. **CSS-only `kol-theme` is exempt.** ⚠️ **Unproven mechanism:** the only consumption mode proven anywhere is `workspace:*` (the DS's own showcase — symlinked deps are auto-excluded from pre-bundling). Nobody has yet consumed the glob-bearing packages from a **registry install**. Prove it first thing in Step 1 with a throwaway `pnpm add` + render of one `<Icon>`.
2. **`@layer components` precedence shift — brand only.** Upstream `kol-theme` wraps its cascade in `@layer components`. **apps/web already applies `layer(components)` manually** on its `@kol/theme/*` imports (`apps/web/src/index.css:8-10`) — no shift there. **apps/brand** imports `kol-theme.css` unlayered today → its `.kol-*` chrome drops below unlayered app CSS after the swap. Visual-check brand's `.kol-*` overrides. Token *values* unaffected either way.
3. **Peer-dep hygiene is clean** — all packages declare `react`/`react-dom` as **peerDependencies** (no dual-React from a registry install). `kol-component` peers on `react-router-dom`/`framer-motion`/`gsap`/`hls.js`/`opentype.js` (apps must satisfy — pnpm will surface gaps) and brings two new runtime deps (`@floating-ui/react`, `embla-carousel-react`).

## Publish channel — resolved

| Fact | Detail |
|---|---|
| **Installable today?** | **Yes.** All 8 `@kolkrabbi/*` published to public npmjs.org (kol-theme/component 0.5.0, framework 0.3.1, icons 0.4.0). No private registry, no auth, no `link:`. |
| **Publish flow** | Changesets (`changeset publish`, access public); `workspace:*` internal deps rewritten to semver on publish. |
| **Shape** | Raw `src` JSX/CSS, no `dist` (see prereq 1). DS root package.json: *"consumers install published versions (no linking)."* |
| **Dev loop** | Consume pinned published versions. Only workspace-link the DS repo if iterating on both at once (then republish + bump to ship). |

## Per-package matrix

### `@kol/theme` → `@kolkrabbi/kol-theme` — 1:1, PIVOTAL ✅
- 160 `--kol-*` tokens in A, **all 160 present upstream with identical values**. Zero missing, zero renamed, zero value drift. Upstream adds 2 component-scoped styleguide tokens (`--kol-sg-label-w`, `--kol-sg-gap`) — harmless.
- Both raw-source CSS, `style: ./kol-theme.css`, same 11 `@import`s. Only diff = the `@layer components` wrap (prereq 2).
- **Swap risk: nil (token layer).** This is what makes everything else incremental.

### `@kol/loader` → `@kolkrabbi/kol-icons` — LOW ✅
- **Coverage:** B is a strict superset — 1000 vs 961 unique basenames, **0 currently-rendering names lost.** The 18 "missing" names are editor-local (`tool-*`, `align-*` via a separate `EditorIcon`), a false positive (`graph`), or already-broken in A (`share-2`).
- **`<Icon>` API: prop-identical** (name/size/variant stroke\|solid/className/style/children). Call sites untouched.
- **Deltas (behavioral, non-breaking):** async/hook rendering — icons stream via a dynamic-import chunk; layout-reserved span, no shift, but **guard SSR/snapshot tests**. ~53 legacy-set names each log one `console.warn` (32 of 85 used names are silent v1). `registerIcons` added (new capability).
- **Blast radius:** repoint `packages/component/src/icons/index.js` (the one re-export web rides on) + apps/brand's 7 direct imports. `packages/component/src/icons/Icon.jsx` is dead code.

### `@kol/component` → `@kolkrabbi/kol-component` — 41/43 safe ✅⚠️
- 43 names consumed (brand direct: 38 names/90 sites; web transitive via `@kol/ui`). **41 swap-safe** (prop-identical or additive-only deltas). Taxonomy relocations (atoms↔molecules) are invisible — export names unchanged.
- **2 MISSING upstream** → see risk register: `QuantityStepper`, `GRAPHIC_RAW`.
- Additive-only prop gains (back-compat): `QuantityInput +controls`, `Button +iconComponent/+pressed`, `Dropdown +defaultOpen`, `SegmentedToggle +ariaLabel`, `ViewToggle +iconVariant`.
- **No app-specific items** — everything imported is genuine DS.

### `@kol/ui` (elder, web-only) — collapse, don't port ✅
apps/brand imports **nothing** from it; only apps/web (146 root + few subpath imports). Three layers + residue:

| Layer | Members | Action |
|---|---|---|
| **A · dead passthrough** | 16 atoms literally `export … from '@kol/component'` (Button, Divider, Dropdown, Input, Pill, Tag, Slider, Icon, toggles, Badge, …) | repoint app imports direct to `@kolkrabbi/kol-component`; delete the passthrough |
| **B · stale duplicates** | ViewToggle, CodeBlock, Table, ContentFilters, FeaturedItemsCarousel, CarouselNavigation | canonical copies already in `@kol/component`/upstream → delete local `.jsx`, use DS |
| **C · belongs in kol-component** | SearchInput, Checkbox, ControlButton, TogglePill, UnitSelector, PlayPauseButton, LinkWithIcon, DropdownFixed (fold into Dropdown), ButtonGroup, OverviewCard/Hero, LinkCard, SectionToggle, StickyNavCard, QuickLinksGrid, ControlPanel/Draggable, AsciiClouds, Sources*, KolWordmark/Logomark/Lockup | generic; upstream has peers — migrate or lobby-brief the gaps |
| **D · kol-component `./foundry`** | GlyphItem/Grid/Category, FeatureCard/Grid, PairingCard/List, StyleCard/StylesGrid, TypefaceCard, FontControlsPanel, DisplaySpecimen, VariableFontDisplay, SpecimenHero, FoundryCTA, FontPreviewItem(Alt), `./data` glyphSets/Categories | upstream foundry supersedes → repoint |
| **E · kol-framework** | SidebarMenuItem, ThemeToggleButton, useTheme + theme runtime (applyTheme/getInitialTheme/subscribeToSystemTheme). `ThemeToggle` is `@deprecated` — drop | shell/theme tier → `@kolkrabbi/kol-framework` |

**App-specific RESIDUE — stays local, no DS home** (upstream keeps these only in `showcase/`, never packaged):
- **Chess** — ChessPiece + `@kol/chess-data` + chess.css + local SVG sets.
- **Dashboards (biggest)** — 8 Dash*Card, 7 charts, DashboardGrid/GridCard, DashTooltip, useChartTooltip/useCountUp, formatMetric* + dashboard.css. Feeds `/metrics`. _(Verify DashboardAnalysis/Performance — imported but likely unrouted/dead.)_
- **Print store** — PrintBuyButton, PrintGridCard(Gsap) — site commerce data.
- **Collections / asset-library** — CollectionCard/Grid + CDN-SVG loaders Logomark/Illustration/Grid (catalog-coupled; loader mechanism overlaps DS `Graphic`, mergeable later).
- **CMS** — SanityImage (`@sanity/client`-coupled; DS must not depend on Sanity → app or `@kol/content`).
- **App CSS** — docs.css, chess.css, dashboard.css.

## Risk register (the named landmines)

| # | Risk | Where | Fix |
|---|---|---|---|
| R1 | **`QuantityStepper` deleted upstream** (merged into `QuantityInput controls="split"`; onChange contract identical) | `apps/web` QuantityStepperPreview.jsx render + `packages/ui/src/atoms/index.js:16` **re-export → hard module-eval crash if `@kol/ui` is blanket-repointed to upstream** | swap call site to `QuantityInput controls="split"`; remove the re-export line. **Do NOT blanket-alias `@kol/component`→upstream** — repoint per-site. |
| R2 | **`GRAPHIC_RAW` removed from upstream barrel** (data still internal) | apps/brand AssetTable.jsx + ClearspaceDiagram.jsx | cheapest: upstream re-add `export { GRAPHIC_RAW } from './graphicData.js'`; else refactor 2 brand files off raw-string access |
| R3 | `import.meta.glob` in registry-installed pkgs breaks under esbuild pre-bundling (JSX itself is fine) — registry-install consumption unproven anywhere | app vite config | prereq 1 — `optimizeDeps.exclude` the JS packages; prove with a throwaway install before committing to Step 2 |
| R4 | `@layer components` precedence drop on `.kol-*` chrome — **brand only** (web already layers manually, `index.css:8-10`) | brand CSS overriding DS classes | prereq 2 — visual gate brand |
| R5 | Icon async pop-in / legacy console.warns | SSR/snapshot tests + noise | guard tests; migrate 53 legacy names toward v1 or `registerIcons` later (non-blocking) |

## Sequenced plan

**Moved to `03-plan.md`** — the full executable version (per-step files, gates, rollback). Summary: 1 foundation (registry spike + theme) → 2 proving ground `/workshop`+`/docs` → 3 roll outward → 4 collapse `@kol/ui` → 5 retire packages.

## Open decisions — resolved by this audit
- **Publish channel:** consume pinned published npm versions (installable today). ✅
- **Theme atomicity:** not atomic — incremental (tokens 1:1). ✅
- **Still open:** exact residue home (lean `@kol/app-ui` package vs inline app code) — decide at Step 5.
