# Migration Status Board — brand → monorepo

> **Live scoreboard** for the brand→monorepo integration. Reconstructed 2026-05-27
> from the archived plan + live session logs (the prior `docs/status/` references
> were dangling — this file resolves them).
>
> - **Full plan (phases 0–6):** `docs/archive/kol-client-history/migration-plan.md` (archived, read-only — frozen mid-Phase-3, so trust THIS board for status).
> - **Decisions + risk register:** same plan, §0 "Decisions locked" + §5 "Risk register".

## Source-of-truth directive (locked)

**`apps/brand` IS the canonical, complete design system. It is the source of
truth. Brand WINS every overlap. Lift-and-move, NOT reconcile.** Packages
(`@kol/*`) are the destination; monorepo `@kol/ui` is the "elder" carrying
fork-era token cruft to be migrated out. End state: `apps/web` + `apps/brand`
import the *same* `@kol/*` modules, so the styleguide physically cannot drift
from the website.

## Scoreboard

| Phase | What | Status |
|---|---|---|
| **0** | Land whole repo → `apps/brand`, self-contained | ✅ DONE — `brand.kolkrabbi.io` + `studio.kolkrabbi.io` live |
| **0.5** | yarn → pnpm (kills dual-React via `pnpm.overrides`) | ✅ DONE |
| **1** | Extract `@kol/theme` (tokens) | ✅ DONE |
| **2** | Migrate `apps/web` onto `@kol/theme` | ⚠️ PARTIAL — surface base unified; the deferred token reconcile (opacity-hex/neutral/container/median) was **done by the later `--kol-oq-*` opaque-scale work**. Open: Playwright visual-snapshot gate not formally run (expected no-op) |
| **3** | Promote primitives → `@kol/component` (the surgery) | ✅ DONE + pushed to main (archived plan says "begun" — stale; live logs confirm shipped) |
| **4** | loaders → packages; brand portal carries zero *shared* DS source | ✅ **DONE** (2026-05-27) — Icon dual-home unified into `@kol/loader` (variant-aware Icon; holds canonical stroke/solid mirror + legacy + web app-specific set as one union; `@kol/component` re-exports it; web's import path unchanged). Build green 5/5; web home smoked clean (0 errors, no missing-icon). framework/styleguide/decks **DESCOPED** → stay in brand. |
| **5** | Move the editor in (last, on purpose) | ✅ **DONE** (2026-05-27) — editor in `apps/brand` consumes shared DS via `@kol/component` + `@kol/loader`. Smoked all 4 modes (compose/palette/pattern/type) on dev :5174 — all route + render clean. Fixed a pre-existing dup-key bug (`editor/modes/pattern/ColorPicker.jsx` keyed swatches by hex → positional key). |
| **6** | Invert upstream — demote kol-system to a scaffold that syncs FROM the monorepo | ⬜ EXTERNAL — out of this repo. Lives in `~/dev/projects/kol-system` + the `/init-scaffold`/`/init-client` skills. Monorepo packages are already canonical (Phases 1–5); only the external scaffold-template demotion + skill rewrite remain. |

## Phase 4 detail

**Done (lift-and-move, build green 5/5):**
- `@kol/loader` — Icon + 367 SVGs + registry + `SVG_ENTRIES` glob export.
- Middle-layer fold → `@kol/component` — brand atoms/molecules/primitives/organisms-Table/hooks moved in + barrel-exported, ~30 consumers repointed.
- `loaders/graphics` → `packages/component/src/graphics/` (`Graphic` + `GRAPHICS` + `GRAPHIC_RAW`); 3 consumers repointed. `loaders/` now holds only `decks`.

**Icon dual-home — DONE (2026-05-27):** unified into `@kol/loader`. Loader's `Icon` is now variant-aware (`variant: 'stroke'|'solid'`, default stroke) and resolves from a union: canonical staging mirror (`stroke/` 880 + `solid/` 848) → legacy loader `svg/` (367) → web app-specific `svg-web/` (164, chess/dashboard/docs/12px). Web's Icon (corrected count: 164, not 573 — the 573 included `svg-options/` the Icon never loaded) all fold in → **0 dropped**. `@kol/component/icons/index.js` re-exports `Icon` from `@kol/loader`; web's `@kol/ui`→`@kol/component` import path unchanged. Build green 5/5; web home smoked clean. 169 web∩staging shared names now render canonical art (intended drift-kill convergence). Dead-but-harmless: `@kol/component/src/icons/{Icon.jsx,svg/}` (bypassed by re-export). _staging set still duplicated in `apps/brand/src/_staging` (curation source) — optional later cleanup.

**DESCOPED (decision 2026-05-27 — stay in `apps/brand`, brand-data/presentation coupled, NOT extracted to packages):**
- `framework` (BrandLayout, PageSection, SideNav, ThemeToggle, BrandHero).
- `styleguide` (Swatch, Asset*, LogoCard, *Mocks, TypeBlock, ColorRamp).
- `loaders/decks` (SlideDeck), `TypeBlockToolbar`, `usePageTitle`, `tools/Gallery`.
- → kills the planned `@kol/framework` / `@kol/styleguide` / `@kol/docs` packages. Brand keeps them as app code.

## Build gate (always)

`pnpm exec turbo run build --force` — plain `pnpm build` cache-LIES on raw-source
packages (`@kol/ui`/`@kol/component` have no build step → not in the `^build` graph).

## Live records
- Latest checkpoints → `docs/llm-context-protocol/session-logs/`
- Memory → `brand-monorepo-migration`, `turbo-cache-raw-source-packages`, `kol-oq-opaque-scale`
