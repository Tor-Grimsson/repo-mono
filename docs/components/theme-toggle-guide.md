# ThemeToggle Component Guide

The shared `ThemeToggle` atom lives in `packages/ui/src/atoms/ThemeToggle.jsx`. It is responsible for reflecting and mutating the current light/dark theme across every kolkrabbi app that consumes `@kol/ui`.

## Runtime Behavior
- Reads the initial theme with `getInitialTheme()` on mount. That helper prefers a stored value in `localStorage.theme`, then falls back to the OS preference (defaulting to dark when no preference exists).
- When `previewOnly` is `false`, toggling calls `applyTheme(nextTheme)`, which synchronizes:
  - `document.documentElement.classList` (`.dark` flag)
  - `document.documentElement.dataset.theme`
  - `localStorage.theme`
  - `window` `CustomEvent('theme-change')` broadcast for listeners.
- When the browser’s `prefers-color-scheme` setting changes and no explicit theme is stored, the toggle updates its state through `subscribeToSystemTheme`.
- Internal state is kept in sync with every change so the control always reports the active mode label and animation frame.

## Props
- `variant` (`'default' | 'compact' | 'icon'`, default `'default'`)
  - Determines layout, hit-area, and whether a label/segment divider renders.
- `className` (`string`, optional)
  - Appends utility classes to the root `<button>` for layout overrides.
- `previewOnly` (`boolean`, default `false`)
  - When `true`, the component renders its UI using local state but **never** applies mutations via `applyTheme`. This is used by documentation sandboxes (e.g., Styleguide) to avoid contaminating the page’s global theme while still demonstrating motion and labels.

## Variants
- **default**: Labeled pill with divider and animated toggle. Suited for desktop navigation or settings panels.
- **compact**: Streamlined pill that keeps the label but tightens spacing for dense layouts.
- **icon**: Circular icon-only toggle used in mobile chrome; shares the sliding animation but omits the text label.

All variants reuse the same underlying two-icon slider animation and swap icon size based on layout.

## Interaction Details
- Hover: The border color animates between `var(--component-border)` and `var(--component-fg)` via explicit `onMouseOver`/`onMouseOut` handlers. Apps can override this by passing a custom `className` and CSS.
- Copy: The label text flips between `"Dark Mode"` and `"Light Mode"` using the component’s internal `theme` state.
- Accessibility: The component presently relies on visible labels for text variants and the icon glyph for the icon variant. Consumers embedding the icon variant alongside text should supply additional context (e.g., tooltip) if required.

## Usage Patterns
- Import from the shared package: `import { ThemeToggle } from '@kol/ui'`.
- Place in layout shells (navbar, footer) where theme switching is required across routes.
- For demo surfaces (styleguides, docs) use `previewOnly` to prevent global theme mutations while demonstrating the control.
- The toggle assumes `packages/ui/theme.css` is loaded so CSS tokens such as `--component-fg` and `--component-border` resolve correctly.

## Related Utilities
- `packages/ui/src/utils/theme.js` exports `applyTheme`, `getInitialTheme`, and `subscribeToSystemTheme`. ThemeToggle wraps these helpers; other components should rely on the same utilities to stay consistent.
- Downstream listeners can subscribe to the `theme-change` event if they need to react to global mode updates without reaching for React context.

## Known Constraints
- The component does not currently debounce rapid toggles; `applyTheme` updates synchronously.
- Keyboard focus styles fall back to the global focus ring tokens; customize via `className` if a distinct focus treatment is needed.
- The hover border animation uses inline style mutation, so ensure any overriding styles reset the border color on `:hover`/`:focus` states.
