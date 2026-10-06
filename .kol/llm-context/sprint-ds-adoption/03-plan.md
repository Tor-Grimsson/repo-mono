# Execution Plan — Website → kol-design-system Adoption

> The executable plan. Findings/evidence live in `02-parity-audit.md`; live status on
> `01-board.md`. Update the board as steps land — this file is the *how*, the board is
> the *where are we*.

## Ground rules (every step)

- **Per-site repoints only.** Never blanket-alias `@kol/component`→upstream (R1 hard-crashes on the `@kol/ui/atoms` re-export). `@kol/*` and `@kolkrabbi/kol-*` coexist — that's the safety mechanism.
- **Build gate:** `pnpm exec turbo run build --force` (plain build cache-lies on raw-source pkgs).
- **Visual gate:** Playwright/manual pass on the touched surface before moving on. The live site is the acceptance test.
- **Old package stays until its consumers are verified** — delete at the end of a step, never mid-step.

---

## Step 1 — Foundation (global, low risk)

**1a · Registry-install spike (FIRST — riskiest unproven mechanism).**
Throwaway: `pnpm add @kolkrabbi/kol-icons` to apps/web, add `optimizeDeps.exclude: ['@kolkrabbi/kol-icons']` to `apps/web/vite.config.js`, render one `<Icon name="…">` from it on any dev page. Proves `import.meta.glob` works from a **registry install** (only `workspace:*` is proven anywhere — DS showcase). Dev + build both. Then revert the throwaway render.
- **Fails →** STOP. Options: DS pre-bundles icons data, or monorepo consumes via `file:`/workspace-link. Escalate to user; don't improvise.

**1b · Brand theme one-liner.**
`apps/brand/src/index.css:5`: `@import "@kol/theme/kol-theme.css"` → `@kolkrabbi/kol-theme/kol-theme.css` (file is byte-identical upstream except the `@layer components` wrap).
- **Gate (R4, brand-only):** visual pass on brand — anywhere brand CSS overrides `.kol-*` chrome, precedence shifts.

**1c · Web's four direct theme imports.**
`apps/web/src/index.css:8-13`: repoint the four `@kol/theme/kol-*.css` imports (`kol-components-atoms`, `kol-components-molecules`, `kol-type-mono-classes`, `kol-opaque`) → `@kolkrabbi/kol-theme/*`. They're 1:1 and web already layer-wraps them — expected no-op.
- **NOT in scope:** `@kol/ui/theme.css` (web's elder theme entry, carries web-only token vocabulary — accent, fonts, v3.1 cruft). It waits for Step 4. Also `packages/ui/theme.css:6` imports `@kol/theme/kol-base-tokens.css` — leave; dies with the elder.

**Step-1 exit:** spike proven · brand + web building green · visual gates passed · board updated.

---

## Step 2 — Proving ground: `/workshop` + `/docs` (safe to break)

Repoint the subtree's `@kol/ui` imports → `@kolkrabbi/kol-component` / `kol-icons` / `kol-framework` per-site. ~95 files / ~103 import sites, overwhelmingly the bare `@kol/ui` specifier — mechanical. `/docs*` routes are pure redirects into `/workshop/docs*`; no separate surface.

**Install:** `@kolkrabbi/kol-component` + `@kolkrabbi/kol-icons` + `@kolkrabbi/kol-framework` in apps/web; extend `optimizeDeps.exclude`. Satisfy peers (react-router-dom present; check framer-motion/gsap/hls.js/opentype.js — pnpm will warn).

**File groups** (from the audit sweep):
1. `src/components/shell/` (4 files) — ShellHeader (`Icon, SearchInput, useTheme, KolWordmark, KolLogomark`), ShellDrawer (`KolWordmark`), ShellSidebar (`Icon`), ShellSearchOverlay (`SearchInput`). ⚠️ shell renders on EVERY workshop/docs page — do first, verify hard. `useTheme` → `kol-framework`.
2. `src/components/workshop/docs/` (2 files) — DocsFrontmatter (`Icon, Tag`), TagModeOverlay (`Icon, Input, Tag`).
3. `src/routes/workshop/*.jsx` (~36 pages) — docs pages (`CodeBlock, Divider, Icon, Tag, Button, ToggleSwitch, Input`), styleguide pages (`SectionToggle, OverviewCard, Table, Tag, Icon, SectionLabel, LinkWithIcon`), apparat/mirrors (`Icon, DraggableControlPanel, OverviewCard`). Chess/dashboard pages keep `@kol/ui/dashboards` + `@kol/chess-data` (residue — do NOT touch).
4. `src/components/workshop/**` previews (~53 files) — one or more `@kol/ui` exports each.

**Known fixes inside this step:**
- **R1:** `QuantityStepperPreview.jsx` → `<QuantityInput controls="split" …>` (onChange contract identical).
- Icon re-export: repoint `packages/component/src/icons/index.js` OR import icons direct from `@kolkrabbi/kol-icons` at each site (prefer direct — the point is retiring the chain).
- Some `@kol/ui` names have **no upstream equivalent yet** (layer C of the elder map: SearchInput exists upstream; but ControlButton, SectionToggle, OverviewCard, LinkWithIcon etc. — check the C-list in `02-parity-audit.md` §elder). Where upstream lacks the component, **leave that import on `@kol/ui`** and tally it — that tally becomes the upstream gap-list (lobby briefs), NOT a blocker.

**Gates:** build green · visual pass /workshop + /docs (nav, search overlay, docs reader, styleguide pages, previews) · icon console.warn noise acceptable (R5, non-blocking) · board updated with the gap-tally.

---

## Step 3 — Roll outward: `/work` + portfolio, then home + shell

Same mechanic as Step 2 on the load-bearing surfaces. Only start after Step 2 has soaked (user verdict on /workshop stability). Order: `/work` + `/work/:slug` → collections/print surfaces → home + top-level shell. Small batches, visual gate each.

---

## Step 4 — Collapse the elder (`@kol/ui`)

1. Delete **layer A** (16-atom passthrough) + **layer B** (stale dupes: ViewToggle, CodeBlock, Table, ContentFilters, FeaturedItemsCarousel, CarouselNavigation) — all consumers repointed in Steps 2–3.
2. Migrate **C/D/E** consumers: C → upstream where peers exist / lobby-brief the gaps; D → `@kolkrabbi/kol-component` foundry subpath; E → `kol-framework` (drop deprecated `ThemeToggle`).
3. Untangle `@kol/ui/theme.css` (the elder theme entry): web-only vocabulary (accent, fonts) moves to an app-level CSS file; base-token import dies with the file; upstream `kol-theme` covers the shared tier.
4. **R2:** upstream re-adds `export { GRAPHIC_RAW } from './graphicData.js'` (one barrel line, DS-repo change + publish) — else refactor brand's AssetTable + ClearspaceDiagram.
5. What remains in `packages/ui` = residue only (chess, dashboards, print, collections/CDN loaders, SanityImage, app CSS).

---

## Step 5 — Retire the emptied packages

- Delete `@kol/theme`, `@kol/component`, `@kol/loader` once `grep -r "@kol/(theme|component|loader)"` across apps returns nothing.
- **Residue home (open decision):** lean app-local package (working name `@kol/app-ui`) vs folding into `apps/web/src`. Decide here, not before.
- Keep: `@kol/content`, `@kol/fontviewer`, `@kol/chess-data`.
- Sync docs: MEMORY.md architecture section, `docs/documentation` styleguide references, board final state.

---

## Rollback posture

Every step is a working-tree edit set the user commits — no publishes from this repo, no schema, no data. Rollback = revert the repoint edits; the old `@kol/*` packages are intact until Step 5. The only external dependency is the DS repo re-adding `GRAPHIC_RAW` (R2) and any lobby-brief gap components — both additive upstream, neither blocks a rollback here.
