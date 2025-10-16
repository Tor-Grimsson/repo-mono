# CSS Design Audit - kolkrabbi Projects

**Date:** 2024-10-04  
**Audited Projects:** kolkrabbi, kolkrabbi-fontviewer, kolkrabbi-foundry, kolkrabbi-staging

---

## Executive Summary

Analyzed 8 CSS files across 4 projects. Found **significant overlap** in design patterns but with **inconsistent naming** and **duplicated values**. All projects use similar color schemes and typography, but implementation varies wildly.

### Key Findings:
- ✅ **Shared DNA**: All projects use similar color palettes (light/dark modes)
- ✅ **Common Typography**: Right Grotesk font family variations appear across projects
- ❌ **Naming Chaos**: Same colors have different variable names across projects
- ❌ **Duplication**: Identical CSS rules repeated in multiple files
- ✅ **Tailwind Ready**: Some projects already using Tailwind v4 `@theme`

---

## 1. Color Tokens Analysis

### Background Colors

| Color Value | Project 1 (kolkrabbi) | Project 2 (fontviewer) | Project 3 (foundry) | Project 4 (staging) |
|-------------|------------------------|------------------------|---------------------|---------------------|
| `#ffffff` | - | `--bg-primary` (light) | `--bg-primary` (light) | - |
| `#000000` | - | `--bg-primary` (dark) | `--bg-primary` (dark) | - |
| `#f8f8f8` / `#fafafa` | - | `--bg-secondary` | `--bg-secondary` / `--color-bg-primary` | - |
| `#f0f0f0` | - | `--hover` | `--hover` / `--color-bg-secondary` | - |
| `#111111` / `#1e1e21` | - | `--bg-secondary` (dark) | `--bg-secondary` (dark) / `--color-brand-dark` | `--color-dark` |
| `#dfdff0` / `#dfdff2` | `#dfdff0` (body) | - | - | - |
| `#fcfbf8` | - | - | `--color-brand-light` | `--color-light` |

**Problems:**
- Same white (#ffffff) called different things: `--bg-primary`, `--fv-white`, `--color-absolute`
- Similar light grays use inconsistent naming: `--bg-secondary`, `--hover`, `--color-bg-primary`
- Brand colors only defined in foundry/staging but used conceptually everywhere

### Text Colors

| Color Value | Usage Across Projects |
|-------------|----------------------|
| `#000000` | `--text-primary`, `--fv-black`, `--color-text-primary` |
| `#ffffff` | `--text-primary` (dark mode) |
| `#666666` | `--text-secondary` |
| `#cccccc` | `--text-secondary` (dark mode) |
| `#999999` / `#9a9a9a` | `--text-muted` |
| `#888888` / `#8a8a8d` | `--text-muted` (dark mode) |

**Problems:**
- Same black has 3+ different variable names
- Gray scale lacks systematic naming (no scale like gray-100, gray-200, etc.)

### Accent Colors

| Color Value | Project | Variable Name | Usage |
|-------------|---------|---------------|-------|
| `#ffff00` | All except kolkrabbi | `--accent` | Tags, highlights |
| `#f5d245` | foundry, staging | `--color-yellow`, `--color-brand-yellow`, `--color-accent` | Primary brand color |
| `#edff66` | kolkrabbi | `--color-yellow-300` | - |
| `#4fb7dd` | kolkrabbi | `--color-blue-400` | - |
| `#5724ff` | kolkrabbi | `--color-violet-300` | - |

**Problems:**
- Yellow accent has 2 different hex values: `#ffff00` vs `#f5d245`
- kolkrabbi has unique blues/violets not used elsewhere

### Border Colors

| Color Value | Variable Name |
|-------------|---------------|
| `#e5e5e5` / `#e0e0e0` | `--border` |
| `#333333` | `--border` (dark mode) |
| `rgba(0,0,0,0.1)` | Inline in fontviewer |
| `rgba(255,255,255,0.15)` | `--border` (dark mode in foundry) |

**Problems:**
- Same semantic purpose, different hex values
- Some use solid colors, some use rgba

---

## 2. Typography Analysis

### Font Families

**Right Grotesk Variations (Core Brand Font):**
- ✅ Used across ALL projects
- ❌ Inconsistent @font-face declarations
- ❌ Different naming conventions:
  - kolkrabbi: `right-grotesk-medium`, `right-grotesk-tight`, `right-grotesk-tall`
  - foundry/staging: `RightGroteskNarrow`, `RightGroteskTight`, `RightGroteskTall`, `RightGroteskCompact`, `RightGroteskBold`

**Variations Found:**
1. Compact (Regular)
2. Bold
3. Narrow (Medium)
4. Tall (Black)
5. Tight (Medium)

**System Fonts:**
- kolkrabbi: Uses "general", "circular-book" (custom fonts)
- fontviewer: Uses system-ui stack
- foundry/staging: Uses 'Inter Tight' from Google Fonts

**Problems:**
- No consistent "body" font choice
- @font-face paths inconsistent (`/fonts/` in some, relative in others)
- Missing font fallbacks in some declarations

### Font Size Scale

**Found across projects (px values):**
- Micro: 12px, 14px
- Small: 16px, 18px, 20px
- Base: 24px
- Medium: 32px, 36px, 40px
- Large: 48px, 56px, 60px, 72px
- XL: 80px, 96px, 120px
- Display: 600px (fontviewer glyph display)

**No consistent scale** - each project has different size sets

### Typography Utility Classes

**kolkrabbi** has custom utilities:
- `heroHeading`, `aboutSubtext`, `animatedTitle`, `bentoTitle`

**foundry/staging** has semantic classes:
- `.kol-heading-display`, `.kol-heading-section`, `.kol-heading-subsection`, `.kol-heading-slug`, `.kol-heading-eyebrow`, `.kol-label-track`, `.kol-meta-label`, `.kol-meta-value`, `.kol-cta-title`, `.kol-subheading-year`

**This is GOOD** - foundry/staging have a design system emerging!

---

## 3. Spacing & Layout

### Spacing Values (px)

**Most Common:**
- 4px, 5px, 6px, 7px, 8px
- 10px, 12px, 14px, 16px, 20px
- 24px, 30px, 40px
- 60px, 80px

**Defined Tokens:**
- foundry: `--spacing-section: 5rem` (80px), `--spacing-container: 2.5rem` (40px)

**Problems:**
- Mostly hardcoded values, not using a systematic scale
- No 4px/8px based scale (Tailwind default)

### Border Radius

**Values found:**
- 0 (sharp corners in some places)
- 4px, 5px, 6px, 8px
- 20px (tags)
- Utility values: `rounded-md`, `rounded-lg`, `rounded-3xl`

**No consistent rounding strategy**

### Shadows

- foundry has: `--fv-panel-shadow: 0 10px 24px rgba(0, 0, 0, 0.18)`
- Most projects don't define shadow tokens

---

## 4. Component Patterns

### Buttons

**Common Classes:**
- `.btn-primary` - solid background
- `.btn-secondary` - outlined

**Variations:**
- kolkrabbi: Uses Tailwind utilities in custom classes
- fontviewer/foundry: Custom CSS classes
- All have hover states with opacity or background change

### Navigation

**Shared Pattern:**
- Fixed navbar at top
- `backdrop-filter: blur()` for glass effect
- Border bottom separator

**Inconsistent:**
- Padding values vary (15-20px)
- z-index values (1000, 99999)

### Tags

- Appears in foundry/fontviewer
- Yellow background (`--accent`)
- Rounded pill shape (20px border-radius)
- Uppercase text with letter-spacing

### Cards/Containers

**Common pattern:**
- Border: 1px solid `--border`
- Border-radius: 8px
- Background: `--bg-secondary`
- Padding: 40-60px

---

## 5. Dark Mode Strategy

### Implementation:

**fontviewer/foundry/staging:**
```css
:root { /* light mode vars */ }
[data-theme="dark"] { /* dark mode vars */ }
.dark { /* dark mode vars */ }
```

**kolkrabbi:**
```css
@theme {
  --color-blue-50: #fafafa;
  /* etc */
}
```

**Problem:** Two different dark mode strategies
- CSS variables with `[data-theme]` attribute
- Tailwind v4 color scale approach

---

## 6. Animations & Transitions

### Common Durations:
- 0.2s, 0.3s (most interactions)
- 0.5s (longer animations)

### Easing:
- `ease`, `ease-in-out` (standard)
- `cubic-bezier(0.65, 0.05, 0.36, 1)` (custom in kolkrabbi)

### Animated Elements:
- Button hover states
- Theme toggles
- kolkrabbi has custom keyframe animations:
  - `indicator-line` animation
  - `three-body` loader
  - `spin78236`, `wobble1`, `wobble2`

---

## 7. Tailwind Usage

### Current State:

**kolkrabbi:**
- ✅ Uses Tailwind v4 with `@theme` block
- ✅ Custom `@utility` definitions
- ✅ Proper Tailwind imports

**foundry:**
- ✅ Uses Tailwind v4 with `@theme` block
- ✅ `@layer` organization
- ✅ Custom component classes in `@layer components`
- ✅ Dark variant with `@variant dark (&:is(.dark *))`

**fontviewer:**
- ❌ Uses `@import "tailwindcss"` but minimal Tailwind utilities
- ✅ Mostly custom CSS with BEM-like naming (`.font-viewer-*`)

**staging:**
- ✅ Uses Tailwind v4 with `@theme` block
- ✅ `@layer components` for design system
- ⚠️ Fewer tokens defined than foundry

---

## 8. Special Features

### FontViewer (Specialized Tool):
- Has extensive CSS for font metrics display
- Slider styling (webkit/moz specific)
- Metrics overlay system
- Control panel with glassmorphism

### kolkrabbi:
- Mask-based image effects
- Custom loading animations
- Story overlay effects

---

## Recommendations

### Priority 1: Unify Color System
Create single source of truth with:
- Brand colors: dark, light, yellow
- Semantic colors: bg-primary, bg-secondary, text-primary, etc.
- Dark mode variants
- Proper naming convention

### Priority 2: Typography Scale
- Standardize Right Grotesk variations
- Define type scale (14px → 96px)
- Create typography component classes
- Use foundry's `.kol-*` pattern as base

### Priority 3: Spacing System
- Adopt 4px base scale
- Create spacing tokens
- Use Tailwind spacing where possible

### Priority 4: Component Library
- Extract common patterns (buttons, nav, cards)
- Standardize hover/active states
- Create `packages/ui` components

### Priority 5: Dark Mode
- Choose one strategy (recommend `data-theme` attribute)
- Ensure all components support it
- Test thoroughly

---

## Next Steps

1. Create unified `packages/ui/theme.css` based on this audit
2. Build test page in `apps/web` to validate tokens
3. Extract reusable components to `packages/ui`
4. Migrate projects one by one to use shared system

