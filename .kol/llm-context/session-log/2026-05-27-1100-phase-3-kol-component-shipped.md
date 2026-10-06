# Session Log: Phase 3 — @kol/component primitive unification (SHIPPED)

**Date:** 2026-05-27
**Status:** Completed — committed + pushed to `main`

## Overview

Drove the brand→monorepo migration's Phase 3 ("the surgery") to completion and shipped it. Extracted all 15 colliding design-system primitives + the Icon system + a floating-ui popover subsystem into a new `@kol/component` package consumed by both `apps/web` (via `@kol/ui` re-export) and `apps/brand`. Killed the primitive drift between the live site and the styleguide. Both apps build green; pushed to main (Vercel rebuilds web + brand; Sanity untouched).

## Key Accomplishments

### 1. New `packages/component` (`@kol/component`)
Raw-JSX export package (mirrors `@kol/ui`). Now the single canonical home for: Divider, DropdownTagFilter, QuantityInput, QuantityStepper, Pill, ToggleCheckbox, ToggleSwitch, ToggleBracket, Tag, Badge, SectionLabel, Button, Input, Slider, Dropdown, Icon, + the popover subsystem (Popover/usePopover/PopoverPanel/Tooltip, MenuItem/MenuDropdownItem/...).

### 2. Re-export shim kept web stable
`@kol/ui` re-exports every extracted primitive, so `apps/web`'s ~147 import sites never changed. `apps/brand` consumes `@kol/component` directly and dropped all its duplicated `atoms/molecules`.

### 3. Feature-merges (canonical wins, port web features up)
- **Button** — `kol-btn*`, maps `control`→`ghost`, keeps `selected`.
- **Tag** — web's rich version (sizes/icon/onRemove) + `hash` prop (default true; brand passes `hash={false}`) + `text` fallback.
- **Badge** — brand's `kol-badge` (8 variants/3 sizes) + web's `icon` ported up.
- **Input/Dropdown/Slider** — canonical `kol-control` shell; Dropdown adopts brand's floating-ui popover (web gained `@floating-ui/react`); Slider preserves web's `control-slider-minimal` variant (99% of usage) + merges brand's editable readout.
- **Control sizing decided FIXED** (kol-control/kol-btn fixed padding); web's responsive breakpoint sizing intentionally dropped.

### 4. Web CSS convergence
`apps/web/src/index.css` imports canonical `kol-components-{atoms,molecules}.css` + new `kol-type-mono-classes.css` into **Tailwind's `components` layer**. Mono type classes split out of `kol-typography-mono.css` so web uses the canonical scale with its OWN font (fonts stay per-app: web=RightGroteskMono, brand=JetBrains).

### 5. Shell relocated
Web-only app-shell (ShellLayout + ShellHeader/Sidebar/Drawer/SearchOverlay + the Toc/FullHeight/TocCollapsed contexts) moved `@kol/ui/layout` → `apps/web/src/components/shell/`; 28 consumers repointed; `@kol/ui` `./layout` export removed.

## Files (summary — full per-component detail in the migration session logs)

- **New:** `packages/component/**` (incl. relocated `icons/` with 166 svgs + popover subsystem), `packages/theme/kol-type-mono-classes.css`, `apps/web/src/components/shell/**`.
- **Deleted:** `packages/ui/src/atoms/{15 primitives}.jsx`, `packages/ui/src/atoms/icons/**`, `packages/ui/src/layout/**`, all brand `components/{atoms,molecules}` dups.
- **Modified:** `apps/web/src/index.css` (CSS layering), `packages/ui/src/atoms/index.js` (re-exports), `packages/theme/kol-typography-mono.css` (classes split out), `apps/web/package.json` (+@floating-ui/react, @kol/component), ~28 web workshop routes (shell import), brand editor/page importers, `pnpm-lock.yaml`.

## Issues Encountered

### 1. turbo cache hid breakage
`turbo run build` reports cached "green" even with broken source in raw-source packages (no build step → not in `^build` graph). **Resolution:** always gate with `pnpm exec turbo run build --force`. Almost certainly what fooled prior agents.

### 2. Cascade-layer trap (buttons/inputs unstyled on web)
Canonical CSS was first imported into a `kol-base` layer declared LOWEST — below Tailwind's `base` (preflight). Layer order beats specificity → preflight's `button{background:transparent}` won → `kol-btn`/`kol-control` rendered stripped (pills/tags/toggles fine because web's own components.css covered them). **Resolution:** moved canonical imports into Tailwind's `components` layer (above `base`, below `utilities`). Build-verified. **Lesson: canonical component CSS for web must live in the `components` layer, never a custom lower layer.**

### 3. Shell-move agent mangled imports mid-run
A delegated agent left a transient malformed import (`@kol../../components/shell`); dev-server HMR surfaced it. It had self-corrected before I stopped it; verified clean + rebuilt 5/5 green.

## Next Steps

- **Watch the Vercel deploy** — restyle goes live (web controls → canonical). Layer fix was global, so all Button/Input/Dropdown/Slider should style correctly now.
- **Cosmetic tails (fix anytime):** brand tags render with `#`; 4 stale `file:` paths in `apps/brand/src/data/components.js`.
- **Phase 0 carryover (user):** create Vercel project + `brand.kolkrabbi.io` DNS.
- **Phases 4–6 (future):** promote loaders/framework/styleguide to packages (4); move the editor in (5); invert upstream — demote kol-system to a client scaffold sourcing from the monorepo (6).
