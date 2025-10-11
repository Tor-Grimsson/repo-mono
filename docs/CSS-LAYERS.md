# CSS Layer Guidelines

This project uses Tailwind v4’s layer model to separate design tokens from reusable components and app-specific utilities. Follow the structure below when adding or modifying styles.

## Shared Layers (`packages/ui`)

### `theme.css`
- Imports Tailwind and defines **only** the `@theme` token map (colors, typography, spacing, radii, transitions) plus required `@font-face` declarations.
- Keeps minimal `@layer base` rules (e.g. `body` defaults) that every app needs.
- No component classes or utilities should live here.

### `css/components.css`
- Houses shared component recipes inside `@layer components` (e.g. typography helpers, button styles, pill controls, card shells).
- Consumed automatically by shared React atoms (`packages/ui/src/atoms/*`).
- When you create a new reusable recipe, add it here rather than in app styles.
- Component recipes read contextual variables (`--component-*`) so they automatically adjust when placed inside `.surface-inverse` wrappers.

### `css/utilities.css`
- Contains reusable `@utility` definitions and shared animations/keyframes (e.g. `flex-center`, `text-balance`, slider styling).
- Provides surface helpers like `.surface-panel` and `.surface-inverse`, which remap contextual variables for “light-on-dark” or “dark-on-light” use cases.
- Prefer adding utility classes here whenever multiple apps/components need the same styling hook.

### JS Exports
- `packages/ui/src/utils/theme.js` exposes `applyTheme`, `getInitialTheme`, and `subscribeToSystemTheme`.
- `packages/ui/src/atoms/ThemeToggle.jsx` consumes those helpers; import `ThemeToggle` via `@kol/ui` in any app.

## App Layers (`apps/<app>/src/index.css`)
- Import Tailwind and the three shared layers in this order:
  ```css
  @import "tailwindcss";
  @import "@kol/ui/theme.css";
  @import "@kol/ui/css/components.css";
  @import "@kol/ui/css/utilities.css";
  ```
- Define **app-specific** utilities (e.g. route layout helpers, experimental styles) using Tailwind v4’s `@utility` syntax.
- If a utility becomes reused across domains, promote it to `packages/ui/css/utilities.css` for consistency.
- Avoid redefining shared recipes (buttons, cards, typography) here.
- Wrap light-on-dark sections with `.surface-panel surface-inverse` (or apply a `tone="inverse"` prop when available) so shared components render the correct palette.

## Component Ownership
- Prefer consuming the React atoms in `@kol/ui` (e.g. `<Button variant="primary" />`), which already map to the shared classes.
- If you must use raw classes, import from the shared component layer (e.g. `className="btn-primary"`).
- Keep route-specific styling colocated with the component (e.g. module-scoped CSS or Tailwind classes in JSX), reserving global utilities for reusable patterns.

## Theming & Assets
- Toggle themes through the shared helpers and `<ThemeToggle />` component; do not manipulate `.dark`/`data-theme` manually.
- Tokens drive color changes; new colors should be added to `@theme` and referenced via tokens/utility classes.
- Brand assets such as `/svg/wordmark.svg` should inherit color using token-driven utilities (`wordmarkBrand`) rather than editing the SVG.

Staying within these layers keeps tokens authoritative, component recipes reusable, and app styles focused on local behavior.
