# brand.kolkrabbi.io — Monorepo Integration Plan

**Status:** proposed · not started
**Created:** 2026-05-27 · **Revised:** 2026-05-27 (post-review)
**Author:** Grim
**Goal:** Attach this repo (the canonical Kolkrabbi styleguide + editor) to the
`kol-monorepo` as an unlisted `brand.kolkrabbi.io`, and in doing so **stop the
design-system drift between this system and the live website** — permanently,
by making both consume the same packages rather than two frozen copies.

> Slow and steady. Every phase ships on its own, `apps/web` stays green at every
> step, and nothing is big-bang. Each phase is independently revertible.

---

## 0. The topology (why this plan looks the way it does)

All the Kolkrabbi repos share one root; they're different stages of evolution.

- **`kol-system`** (`~/dev/projects/kol-system`) — current source of truth.
  Split into `kol-theme`, `kol-component`, `kol-loader`, `kol-framework`,
  `kol-styleguide`, `kol-editor`, `kol-docs`, `kol-brand`, `kol-client`.
  **Not under git, not published** — pure scaffolding template. Consumed by
  `/init-scaffold` + `/init-client` via **file copy**. Each consumer is a
  frozen snapshot. This is the drift engine.
- **This repo** (`kol-client-kolkrabbi`) — a materialized snapshot of
  kol-system. DS files are **byte-identical** to kol-system (verified:
  `Button.jsx`, `kol-color.css` diff clean). In sync. This is "the canonical
  system, made visible." **Canonical wins — components, editor, and tokens.**
- **`kol-monorepo`** — the **elder**. Forked earliest and grew its own branch;
  carries fork-era token cruft (e.g. `--kol-opacity-hex-*`, a legacy flattened
  greyscale of `--kol-fg-*`-on-primary, lightly consumed). Yarn + Turbo
  workspace; ships `kolkrabbi.io` (`apps/web`), `studio`, `video`, all
  Vercel-deployed.

**The elder's one genuine advantage is packaging, not content:**

| Dimension | Winner | Why |
|---|---|---|
| Token vocabulary / components / editor | **This repo / kol-system** | Newer, in sync across all the user's repos; monorepo carries legacy token cruft to be migrated out. |
| **Packaging & maintenance** | **Monorepo** | Real workspace package (`@kol/ui` w/ `exports`, peerDeps, live-linked). kol-system is "copy folders, not under git." |

**But `@kol/ui` is a grab-bag, not a clean DS package** (verified from
`apps/web`'s 147 `@kol/ui` imports). It mixes:
- true primitives (Button, Divider, Slider, Pill, Tag, Input, Dropdown, Table, Toggle\*)
- app-shell runtime contexts (`ShellTocContext`, `ShellFullHeightContext`)
- hooks (`useTheme`)
- app-specific organisms (`CollectionCard`, `PrintGridCard`, `ChessPiece`, `PairingsList`, `FoundryCTA`, `OverviewHero`)
- the **icon system** (`Icon` is the single most-imported symbol at 30 uses, plus `glyphSets`, `Logomark`)

So extracting canonical primitives is **surgery, not a lift** — call-sites
import primitives and app-junk in the same statement, and the icon API is the
highest-frequency thing to reconcile (see Phase 3).

**Decisions locked:**

1. Canonical = this repo's KOL system (kol-system) — **components, editor, AND tokens.**
2. Scope of `brand.kolkrabbi.io` = **whole repo, incl. the `/editor` tool** (end state; lands late — see Phase 5).
3. Canonical **maintenance model** = the monorepo's live workspace packages.
4. **kol-system gets demoted** to a client-scaffold template that syncs *from*
   the monorepo. Copy-down stays where it belongs — one-shot client deliverables
   (Another Creation, etc.) — and stops being the source of truth for things we
   maintain forever.

**End state:** one live-linked design system in `kol-monorepo/packages/*`.
`apps/web` and `apps/brand` import the *same* modules, so the styleguide
physically cannot drift from the website.

---

## 1. Stack skew (reconcile when the app lands)

| Concern | This repo | Monorepo | Resolution |
|---|---|---|---|
| Pkg manager | pnpm | **yarn 1.22 + turbo** | Convert `apps/brand` to a yarn workspace member; drop `pnpm-lock.yaml`. |
| React | 19.2.5 | 19.0.3 | Kept brand on 19.2. Hermetic in Phase 0 (no shared render tree), and yarn deduped cleanly (every app's range allows 19.2). The "single version" rule bites only once brand consumes shared components — revisit at Phase 3. |
| Router | react-router-dom **7** | **6** | Brand stays on v7. `@kol/ui` peerDeps already allow `6 \|\| 7`. Bump `apps/web` 6→7 later (separate, optional). |
| Vite | 8 | 5 | Kept brand on 8 (svgr + plugin-react pinned to it). Installs + builds clean alongside web's 5 — separate per-app builds. Don't force-align. |
| Tailwind | 4 (CSS-first) | 4 (CSS-first) | Same major; wiring differs — see §2. |
| Tokens registration | `:root` vars + hand-written utility classes | Tailwind `@theme {}` (generates `bg-kol-*` utilities) | Canonical `@kol/theme` must expose **both** — `@theme` for utility generation *and* the `:root` vars components read. The one non-trivial token-wiring reconciliation. |

---

## 2. Token reconciliation (light — canonical wins)

The high-volume tokens **already match**, so this is far lighter than a rename
sweep:

- `--kol-surface-primary` / `--kol-surface-on-primary` etc. — **identical hex
  both repos** (`#fafafa` / `#121215`). Free.
- `--kol-accent-primary` (`#f5d245`) — matches. Free.

What `apps/web` carries that gets migrated **to canonical, then deleted**:

| Monorepo token | Disposition |
|---|---|
| `--kol-opacity-hex-{01..96}` (+ `-inverse`) | **Legacy** flattened greyscale of `fg-*`-on-primary. Lightly consumed. Re-point the few consumers to `--kol-fg-*` (or, where a consumer genuinely needs an opaque value over a known bg, the flattened equivalent), then delete. |
| `--kol-container-*` (component tier) | Verify consumption; default to collapsing onto `--kol-surface-*`. **If** the two-tier split proves load-bearing in `apps/web`, fold it into the canonical theme rather than dropping it. |
| `--kol-palette-*` (charts/tags/data-viz) | Likely a genuine keeper for `apps/web`'s dashboards/chess. **Fold UP** into the canonical theme, don't drop. |
| `--kol-status-*`, `--kol-color-neutral-*`, state `*-hover/active`, `--kol-font-family-*` | Verify per-group at migration; default migrate→canonical, fold up anything serving a real `apps/web` feature. |

Rule of thumb: **monorepo-only tokens default to migrate-and-delete; fold up
into the canonical theme only the specific groups that serve a live `apps/web`
feature.** Don't assume — verify each group's consumption before dropping.

---

## 3. Phased plan

Each phase: **ship → gate → next.** Gate = `turbo build` green + the named
visual check. Never start a phase until the prior gate passes. The high-churn
editor moves **last** (Phase 5), onto already-extracted packages.

### Phase 0 — Land the whole repo, self-contained (ships brand.kolkrabbi.io)

**Scope corrected during execution:** the portal can't be sliced from the
editor — `BrandLayout` (the wrapper every page renders inside) imports
`editor/library/LibraryProvider`, `SlideDeck` pulls `editor/modes/palette`,
`Demo` is an editor sandbox, and `App.jsx` routes `/editor/:mode`. Excluding the
editor would mean detaching providers now and re-attaching at Phase 5 — churn
for nothing. So Phase 0 copies the **whole repo, editor included, self-contained**
(still importing its own `src/components` + `src/styles`). "Editor last" still
holds where it matters: it's the last surface to swap onto `@kol/*` (Phase 5).

Versions: kept brand on this repo's own set (React 19.2, Vite 8, svgr) rather
than forcing it down to web's — brand is hermetic in Phase 0 (imports nothing
shared), separate Vite build, separate deploy, so there's no dual-React render
tree to break, and yarn dedupes React across the workspace anyway. Reconcile
versions only when sharing forces it.

**Status (2026-05-27):**
- ✅ Copied `src` (incl. 134-file editor) + `public` + `vite-plugins` +
  `scripts` + `vite.config.js` + `eslint.config.js` → `apps/brand/`.
- ✅ Wrote `apps/brand/package.json` (workspace member `brand`, this repo's
  deps verbatim), `vercel.json` (SPA rewrite + `X-Robots-Tag: noindex`),
  `index.html` (+ `robots noindex` meta).
- ✅ Added `dev:brand` to root `package.json`. (turbo auto-discovers the app.)
- ✅ `yarn install` clean (23s; Vite 8 coexists with web's Vite 5).
- ✅ `yarn build` green.
- 🐛 First deploy crashed at runtime — `w.H is null` (dual React). Workspace
  hoisting left react 19.2.3 at root, react-dom 19.2.6 at root, react 19.2.6
  nested in `apps/brand` — so react-dom pulled a *different* react copy than the
  app code. Fixed with `resolve.dedupe: ['react','react-dom']` in
  `apps/brand/vite.config.js` (build-time only; no dep/lockfile change).
- ✅ Verified: headless load of the built `dist` mounts clean — root renders
  ~34KB, 0 page errors, 0 console errors.
- ⬜ **User:** commit `apps/brand/vite.config.js`, push, redeploy. Then create
  the Vercel project + map `brand.kolkrabbi.io` + DNS (dashboard/auth — not
  scriptable from here).

- ⚠ **Stall risk:** this is the cheapest, highest-value phase, so it's the most
  likely place to stop — and stopping here ships a deployed *third* copy of the
  DS, making drift worse. Phases 1–4 are what actually pay off; don't treat 0 as
  done.

### Phase 0.5 — yarn → pnpm migration (done 2026-05-27)

Surfaced from the React dual-copy crash: the bug was a yarn-1 hoisting artifact,
and the user had standardized on pnpm everywhere else. Migrated the whole
monorepo yarn→pnpm, which also subsumes the React fix (open question #4). It was
**not** a clean swap — the Sanity shake-out I'd flagged materialized.

Changes:
- Root `package.json`: `packageManager` → `pnpm@10.33.0`; removed `workspaces`
  field; added `pnpm.overrides` pinning `react`/`react-dom` to `19.2.6` (the
  deterministic single-React guarantee — kills the dual-copy bug regardless of
  layout; brand's `resolve.dedupe` is now redundant insurance).
- New `pnpm-workspace.yaml` (`apps/*`, `packages/*`).
- New `.npmrc`: `link-workspace-packages=true` (link `@kol/*` by name, since the
  repo uses `^x` ranges not `workspace:*`) + `public-hoist-pattern` for
  `*react*` / `*styled-components*` / `@emotion/*` (Sanity's plugins import
  these from transitive packages without declaring them; strict isolation can't
  resolve them). Kept the **isolated** linker — `shamefully-hoist` and
  `node-linker=hoisted` both regressed other apps (esbuild EPIPE; web's opentype).
- `apps/studio/package.json`: added `@kol/content` — a real **phantom dependency**
  studio imported but never declared (yarn's flat tree hid it).
- `packages/fontviewer/.../FontLoader.js`: `import opentype` → `import * as
  opentype` (pnpm resolves opentype.js's CJS-wrapped `.mjs`, whose default
  rollup/Vite 5 can't see; `parse` is a named export).
- Deleted `yarn.lock`; `pnpm-lock.yaml` generated.

Verified: `pnpm install` clean; **all 5 build tasks green** (web, studio, brand,
@kol/chess-data, @kol/fontviewer); brand runtime re-smoked headless (mounts
clean, 0 errors).

### Phase 1 — Extract `@kol/theme` (tokens) as a shared package — done 2026-05-27

- New `packages/theme` (`@kol/theme`): the 9 canonical files moved out of
  `apps/brand/src/styles` verbatim (umbrella `kol-theme.css` + kol-color,
  kol-opacity, kol-typography, kol-typography-mono, kol-utilities,
  kol-components-{atoms,molecules,organisms}). `package.json` exports `.` →
  umbrella + `./*` wildcard.
- `apps/brand/src/index.css`: `@import "./styles/kol-theme.css"` →
  `@import "@kol/theme/kol-theme.css"`; added `@kol/theme` workspace dep.
  `kol-site.css` (marketing chrome) stays in brand. `apps/web` untouched.
- **Fonts:** `@font-face` URLs are absolute (`/fonts/…`), so they still resolve
  to each app's `public/` — no font move needed. Fonts-in-package is a later
  refinement.
- **`:root` only, no `@theme` yet:** brand uses `:root` vars + hand-written
  utility classes, so the package ships those verbatim. The `@theme`-registration
  reconciliation (§1) is a **Phase 2** concern — it only matters when `apps/web`
  (which uses `@theme`-generated `bg-kol-*` utilities) consumes the package.
- **Gate met:** brand builds on `@kol/theme` (same 2470 modules), runtime smoke
  clean (0 errors), and a screenshot confirms it renders identically (logomark,
  Right Grotesk display type, colors, chrome).
- Cosmetic follow-up: `apps/brand/src/data/components.js` has display-label
  strings still pointing at `src/styles/kol-*.css` (now in `@kol/theme`).
- Interim state (expected): two theme sources coexist — `@kol/theme` (brand) and
  `@kol/ui`'s `theme.css` (web). Phase 2 collapses web onto `@kol/theme`.

### Phase 2 — Migrate `apps/web` onto `@kol/theme` (light)

- `apps/web` switches its six `@kol/ui/css/*` + theme imports to consume
  `@kol/theme` for tokens.
- Re-point the legacy `opacity-hex-*` (and any other migrate-and-delete tokens
  per §2) to canonical; fold up the keepers (palette, etc.).
- Surfaces/accent already match, so most of the surface area is no-op.
- **Gate:** Playwright visual snapshot of `apps/web` clean before/after.

**Status (2026-05-27) — surface base unified; remainder deferred:**
- ✅ New `packages/theme/kol-base-tokens.css` — brand-NEUTRAL surface tiers +
  absolutes (light `:root` + dark `:is([data-theme="dark"], .dark)`). Both
  `apps/web` and `apps/brand` now consume it for page bg/fg → those colors can no
  longer drift.
- ⚠️ **Correction to the "surfaces/accent match" premise:** accent does NOT match
  in mechanism. Web hardcodes `#f5d245`; brand's accent is brand-neutral
  (`var(--kol-surface-on-primary)`, rebound by `kol-brand-color.css`). A shared
  file carrying yellow would poison brand's neutral scaffold layer. So the shared
  base is **surfaces + absolutes only**; accent + fonts stay per-app by design.
- 🔭 **Deferred (user direction):** the actual web→canonical token reconciliation
  for `opacity-hex-*` / `status` / `palette` / `container`. Left in `@kol/ui` as-is;
  per-group consumption verification (§7 #3) still required before any fold-up/delete.
  `opacity-hex` stays untouched until explicitly revisited.
- ✅ web + brand both build green; built-CSS parity confirmed (surfaces light+dark,
  web accent/fonts intact, brand accent via brand layer).
- ⬜ Playwright before/after visual snapshot not yet run (values byte-identical;
  snapshot is the formal gate, expected no-op).
- Session log: `docs/llm-context/session-log/2026-05-27-phase-2-shared-surface-base.md`.

### Phase 3 — Promote primitives to `@kol/component` (the surgery)

- New `packages/component` (`@kol/component`): kol-component's 12 atoms / 17
  molecules / Table.
- **Untangle the grab-bag**: separate true primitives from app-shell contexts
  (`ShellTocContext`/`ShellFullHeightContext` → move to `apps/web`), hooks
  (`useTheme`), and app organisms (`CollectionCard`, `ChessPiece`, etc. → stay
  in a shrunken `@kol/ui` layered on top of `@kol/component`).
- **Reconcile the icon system first** — `Icon` is the #1 import (30 uses) and
  the two repos' icon APIs differ; this is its own sub-task, not a footnote.
- `apps/brand` imports primitives from the package; drops local
  `src/components/{atoms,molecules,organisms}`.
- **Name collisions** (Button, Badge, Divider, Input, Slider, Tag, Pill,
  SectionLabel, ViewToggle, Toggle\*): canonical wins; reconcile `apps/web`
  call-sites. Watch the **Button casing flip** — monorepo `<Button>` defaults
  `uppercase: true`; canonical has no such prop, so ~23 web buttons switch to
  as-authored casing (correct per ARCHITECTURE.md §2, but needs a visual pass
  and possibly re-casing the strings at call-sites). Variants also differ
  (`ghost` vs `control`) — remap explicitly.
- **Gate:** both apps green; one set of primitives.

**Status (2026-05-27) — prep started, two collisions pre-settled in `@kol/ui`:**
- ✅ **Icon API reconciled.** Web `Icon.jsx` adopted canonical's recursive
  `./svg/**/*.svg` glob + `00-kol/` collision-winning overlay; dropped the dead
  `responsive` prop (0 call-sites). Zero behavior change today (flat dir, empty
  overlay), API now unified + forward-compatible. 29 `<Icon>` sites untouched.
- ✅ **Button casing "flip" defused.** Premise was stale — web already defaulted
  `uppercase=false`; only 1 consumer opted in (not 23). Removed the `uppercase`
  prop + `caseClass` logic (Button always `normal-case`, per ARCHITECTURE §2);
  dropped the prop from `PrintDetailOverlay` Inquire button.
- ⬜ **Still CSS-coupled (lands with the package + CSS move):** Button class
  prefix `btn-*` → `kol-btn-*`, variant `control` → `ghost`/`quiet`. NOT a blind
  JS edit — would break every web button without the `kol-btn*` CSS.
- ⬜ Next collision: Badge (both repos define it).
- Session log: `docs/llm-context/session-log/2026-05-27-phase-3-icon-button-reconcile.md`.

**Status (2026-05-27, cont.) — `@kol/component` created, extraction begun:**
- ✅ New `packages/component` (`@kol/component`): raw-JSX export pkg mirroring `@kol/ui`; added as dep to `@kol/ui` + `apps/brand`.
- ✅ Divider extracted as the proof slice — `@kol/ui` re-export shim works, web's ~147 import sites untouched; fixed 4 internal `@kol/ui` relative importers; brand deduped. Both apps build green (forced).
- ✅ 3 zero-CSS-risk primitives extracted web-side: DropdownTagFilter, QuantityInput, QuantityStepper.
- 🗺️ Full 14-component collision map (classifier subagent): 3 SAFE (done), 4 LIGHT (token rename — SectionLabel/ToggleCheckbox/ToggleSwitch/Pill), 7 HARD (Badge/Button/Dropdown/Input/Slider/Tag/ToggleBracket — real API+CSS divergence; several web primitives RICHER than canonical → fold UP, don't regress the live site).
- 🔑 **Critical path:** web must adopt `@kol/theme` canonical component + typography CSS before any canonical-class component renders right in web — the next step + first broad web restyle (Playwright-gated).
- ⚠️ **Gate caveat:** `turbo run build` cache-hits stale on raw-source pkgs (`@kol/ui`/`@kol/component` have no build step → not in `^build` graph). Gate Phase 3 with `pnpm exec turbo run build --force`.
- Session log: `docs/llm-context/session-log/2026-05-27-phase-3-kol-component-extraction.md`.

### Phase 4 — Promote loaders / framework / styleguide; dissolve brand's portal copies

- `@kol/loader` (icons + logos/marks/graphics), `@kol/framework` (chrome),
  `@kol/styleguide` (presentation), `@kol/docs` (reference).
- `apps/brand` (portal) imports all of them; carries **zero duplicated DS source**.
- **Gate:** `apps/brand/src` (portal) contains only app code.

### Phase 5 — Move the editor in (last, deliberately)

- The editor is the high-churn surface (near-daily DS work) and depends on ~20
  shared modules across component/styleguide/loader/framework. Moving it last
  means it lands **once**, onto already-extracted packages.
- Brief freeze of editor edits in this repo for the single move; copy
  `src/editor` → `apps/brand`, swap its DS imports to the `@kol/*` packages
  (`EditorButton` and friends stay editor-local).
- **Gate:** editor runs in `apps/brand` against shared packages; manual smoke of
  every mode (compose/palette/pattern/type).

### Phase 6 — Invert the upstream

- Monorepo packages become canonical. **Demote kol-system to a client-scaffold
  template that syncs FROM the monorepo.**
- Update `/init-scaffold` + `/init-client` to source from the monorepo packages
  instead of `kol-system/packages`.
- **Gate:** a fresh `/init-client` produces a working client (Another Creation
  pattern) from monorepo-sourced packages.

---

## 4. Packaging granularity (recommendation)

Mirror kol-system's split in the monorepo — `@kol/theme`, `@kol/component`,
`@kol/loader`, `@kol/framework`, `@kol/styleguide` — and let the existing
`@kol/ui` shrink to the **website-specific organism layer** (collections,
prints, chess, dashboards) that depends on `@kol/component`. App-shell contexts
and `apps/web`-only concerns move out of the package into `apps/web`. This makes
Phase 6 trivial (boundaries already match kol-system) and lets clients pull only
what they need. Alternative: one fat `@kol/ui`. **Recommendation: split-mirror.**

---

## 5. Risk register / rollback

| Risk | Mitigation |
|---|---|
| Dual React versions break hooks | Single hoisted version enforced in Phase 0 (monorepo bumps to 19.2). |
| Phase 0 stall ships a deployed third DS copy | Phase 0 is portal-only and explicitly not "done"; the payoff is Phases 1–4. |
| `@kol/ui` grab-bag entanglement | Phase 3 untangles primitives from shell/hooks/organisms before extraction; icon API reconciled first. |
| Button casing flip / variant remap on `apps/web` | Visual pass + call-site review in Phase 3; re-case strings where needed. |
| Editor (high churn, 252 files) | Moved last (Phase 5), lands once onto stable packages; only the editor freezes, briefly. |
| `@theme` vs `:root` Tailwind wiring | `@kol/theme` exposes both; verified on brand (Phase 1) before web (Phase 2). |
| Continued DS dev during migration | Development continues in this repo/kol-system as today; phases pull at known checkpoints. Only the editor needs a freeze, for its single move. |

## 6. Validation

- `turbo run build` green across all apps at every gate.
- Playwright visual snapshots (both repos already have Playwright) gate Phase 2 + 3.
- Manual smoke of `brand.kolkrabbi.io` (all portal pages after 0/4; every editor
  mode after 5).

## 7. Open questions

1. Bump `apps/web` router 6→7, or leave brand on its own 7?
2. Git + (optionally) publish the monorepo packages in Phase 6, or keep
   workspace-only and have init skills copy from the monorepo checkout?
3. Per-token-group verification (§2): which monorepo-only groups (`container`,
   `palette`, `status`, neutrals) are genuinely consumed by `apps/web` and must
   be folded up vs. dropped? Confirm before Phase 2 deletes anything.
4. ~~**Workspace React spread**~~ — RESOLVED in Phase 0.5. The yarn→pnpm
   migration + `pnpm.overrides` pinning react/react-dom to 19.2.6 forces one
   deterministic React workspace-wide. The dual-copy bug is structurally dead.
