# Design System Mobility Plan

## Goal
Make `@kol/ui` portable as a standalone design system that other projects can consume. The core idea: `theme.css` + `atoms.css` should be self-contained enough to drop into any Tailwind v4 project and get the full KOL type scale, color system, and base components.

---

## Current CSS Layer Stack

| File | Contents | Status |
|------|----------|--------|
| `theme.css` | All `--kol-*` tokens, `@font-face`, dark mode overrides | Already portable for Tailwind v4 consumers |
| `components.css` | Everything mixed: typography scales, buttons, inputs, tags, tables, controls, cards, shell layout | Needs splitting |
| `utilities.css` | Utility classes (`bg-opacity-hex-*`, etc.) | Keep as-is |
| `docs.css` | Content rendering (`docs-article`, `docs-title`, etc.) | App-specific, keep separate |
| `prose.css` | Prose rendering | App-specific, keep separate |

---

## Target Layer Stack

```
theme.css       → tokens + font faces + dark mode     (already done)
atoms.css       → base design system components        (NEW — carved from components.css)
components.css  → app-level molecules, organisms       (trimmed)
utilities.css   → utility classes                      (unchanged)
docs.css        → content rendering                    (unchanged)
prose.css       → prose rendering                      (unchanged)
```

### Consumer import for another project
```css
@import "@kol/ui/theme.css";     /* tokens, fonts, dark mode */
@import "@kol/ui/css/atoms.css"; /* base design system */
```

---

## What Goes in `atoms.css`

Carved from the top of `components.css` (~lines 1–2000):

- **Typography scales** — `kol-display-*`, `kol-heading-*`, `kol-body-*`, `kol-mono-*`, `kol-label-*` (including legacy aliases)
- **Text helpers** — uppercase helpers, normal case helpers, fine helpers, text color utilities
- **Nav underline animation** — the underline slide animation used on nav links
- **Pill / Badge** — `.pill`, `.pill--*` size/color variants
- **Tag** — `.tag`, `.tag--*` color variants
- **Button** — `.btn`, `.btn--*` size variants, nav-link style button
- **Input** — `.input`, `.input--*` size variants, outline style
- **Icon swap animation** — initial/hover states for icon transitions
- **Divider** — if any explicit `.divider` class exists here

## What Stays in `components.css`

- **Tables** — `kol-table-*` system (structural, cell, content, utility, responsive classes)
- **Control components** — sliders, dropdowns, toggles, checkboxes, toggle brackets
- **Theme toggle / Language toggle** — horizontal swap animations
- **Navigation button** — `.shell-nav-*` nav button styles
- **Cards** — foundry cards (light, dark, inverted)
- **Foundry-specific molecules** — frequency modulator layout, radial editor controls
- **Shell layout** — all `shell-*` classes (page header, tabrow, sidebar, nav items, drawer)

---

## Known Caveats

### 1. Tailwind v4 dependency
`theme.css` opens with `@import "tailwindcss"` and uses `@theme {}`. Any consumer needs Tailwind v4. This is acceptable for modern projects — just needs to be documented.

### 2. Font paths are hardcoded
`@font-face` in `theme.css` references `/fonts/PPRightGrotesk-*.woff` etc. — absolute paths assuming fonts live at the web root. A consuming project would need to either:
- Host fonts at the same path, or
- Override `@font-face` declarations with their own paths

Long-term fix: consider a separate `fonts.css` that consuming projects can replace, or document the expected font structure.

### 3. No `tokens.css` needed
`theme.css` already IS the tokens file. No need to create a separate `tokens.css` — the `@theme {}` block registers all `--kol-*` properties as both Tailwind theme values and CSS custom properties simultaneously.

---

## Implementation Steps

1. **Audit `components.css`** — identify exact line ranges for atom-level vs molecule/organism-level sections
2. **Create `packages/ui/css/atoms.css`** — move identified atom sections into new file
3. **Trim `components.css`** — remove moved sections, update any internal comments
4. **Update `apps/web/src/index.css`** — replace `@import "@kol/ui/css/components.css"` with both imports in order:
   ```css
   @import "@kol/ui/css/atoms.css";
   @import "@kol/ui/css/components.css";
   ```
5. **Update `packages/ui/package.json` exports** — expose `./css/atoms.css` as a named export if not already covered by the wildcard
6. **Smoke test** — visually verify workshop pages, docs pages, and home page after the split
7. **Document font requirements** — add a note to `theme.css` or a README about font path assumptions
