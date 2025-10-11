# Normalize Light/Dark Modes (Shadcn/Tailark Alignment)

## Goals
- Align light/dark theming with proven patterns used by shadcn/ui and Tailark.
- Consolidate all color logic into tokens so components never rely on inline scripts.
- Ensure runtime theme toggles keep `.dark` and `data-theme` synchronized for CSS + component consumers.

## Scope
- `packages/ui/theme.css`
- `apps/web/src/index.css`
- `apps/web/src/components/sections/foundry/*`
- `apps/web/src/components/layout/Navbar.jsx`

## Plan

### 1. Token Architecture (Shadcn-style)
- Expand `@theme` tokens to include explicit surface scale (`--surface-100/900`) and text scale (`--foreground`, `--muted`, etc.) mirroring shadcn.
- Restore `--color-accent-red` to a dedicated red palette and create separate `--accent`/`--accent-foreground` pairs for both themes.
- Define missing `--surface-border`, `--surface-primary`, `--surface-secondary`, etc., then map them in the dark override using Tailark-style values.

### 2. Component Consumption
- Refactor button, pill, and control classes to consume the new semantic tokens (`background: var(--surface-primary)`, `color: var(--foreground)`), eliminating hard-coded black/white.
- Replace inline `backgroundColor` logic in Foundry sections with utility classes or props that reference the token names (e.g., `className="surface-card"`).
- Update utilities in `apps/web/src/index.css` so `bgAbsolute*`, `hoverFlipTheme`, etc., point to the shared tokens instead of absolute rgb(a) values.

### 3. Theme Toggle Behavior
- On initial load, read `localStorage.theme` and fall back to `window.matchMedia('(prefers-color-scheme: dark)')` like shadcn’s ThemeProvider.
- When toggling, set both `document.documentElement.classList` and `dataset.theme` so `[data-theme]` selectors activate alongside `.dark`.
- Broadcast a `CustomEvent('theme-change')` (or React context update) for components that need to respond without re-rendering.

### 4. Documentation & Usage
- Document the token naming and usage guidelines in `docs/` (e.g., “always prefer `var(--surface-*)`” similar to shadcn’s README).
- Provide example component snippets demonstrating light/dark-safe implementation for future contributors.

### 5. Regression Coverage
- QA checklist: homepage hero, Foundry cards, work detail portable text, and nav hover states in both themes.
- Optional: add a Cypress/Playwright smoke test toggling themes to verify body background and primary text colors match expected tokens.

## Dependencies / Risks
- Components expecting the old `bgAbsolute*` utilities will need class updates once utilities are renamed.
- Token expansion must stay Tailwind-v4 compatible; use CSS vars only.

## Deliverables
- Updated `theme.css` with shadcn/Tailark-inspired token structure.
- Refactored Foundry and button components free of inline theme logic.
- Navbar/theme toggle respecting tokens, `.dark`, and `data-theme`.
- Short doc covering new token taxonomy and best practices.

### 6. CSS Layer Realignment
- Keep `packages/ui/theme.css` focused solely on `@theme` tokens, font-face declarations, and base resets.
- Move component recipes (button, card, typography, tags) into a new `packages/ui/css/components.css` using `@layer components`.
- Collect reusable utilities/animations (`flex-center`, `slider`, keyframes) into `packages/ui/css/utilities.css`.
- Limit app-specific utilities to `apps/web/src/index.css`; promote shared patterns to the new shared layers.
- Update consuming apps to import the new layer files after `theme.css`.

## Implementation Notes
- 2025-10-10: Introduced shared theme helpers (`applyTheme`, `getInitialTheme`, `subscribeToSystemTheme`) to keep `.dark` and `data-theme` in sync and broadcast `theme-change`.
- 2025-10-10: Updated UI tokens/utilities to drive light/dark modes via `--surface-*` and `--foreground*` variables.
- 2025-10-10: Added `/styleguide` route showcasing tokens/components, reused shared ThemeToggle + official wordmark.
- 2025-10-10: Planned CSS layer realignment to separate tokens, components, and utilities across shared/app layers.
