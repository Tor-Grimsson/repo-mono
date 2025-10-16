# Figma Design Tokens Analysis

**Date:** 2024-10-04  
**Figma File:** 2.0 Website - Library  
**Comparison with:** CSS Audit + theme.css proposal

---

## Executive Summary

The Figma file contains design tokens and a component library that reveals **significant differences** from the CSS audit. This is valuable data to fill in the blanks!

### Key Findings:
- ✅ **Typography uses Inter** (not Right Grotesk as primary)
- ⚠️ **Different color naming** (Neutral/KL-*, DT-*, LT-* system)
- ✅ **Yellow brand color confirmed**: `#F5D245` (Y2) and `#F5BB1D` (Y3)
- ✅ **Background color**: `#FCFBF8` (LT-0) - matches our audit
- ⚠️ **Dark color**: `#1E1E21` (DT-1) - matches our brand-dark!
- ❌ **Red/Orange accent colors** not in CSS audit: `#BC583F` (R4), `#9C523F` (R5)

---

## 1. Color Tokens Comparison

### Figma Variables vs CSS Audit

| Figma Token | Hex Value | CSS Equivalent | Match? |
|-------------|-----------|----------------|--------|
| **Neutrals** ||||
| `Neutral/KL-2` | #FAF9F5 | `--color-bg-primary` (#fafafa) | ⚠️ Close |
| `Neutral/KL-3` | #F7F6F2 | - | ❌ Missing |
| `Neutral/KL-5` | #EDEBE4 | - | ❌ Missing |
| `Neutral/KL-6` | #E5E3D8 | `--color-border` (#e0e0e0) | ⚠️ Close |
| `Neutral/DT-2` | #262A33 | - | ❌ Missing |
| `Neutral/DT-4` | #4F535C | `--color-text-secondary` (#6b6b6b) | ⚠️ Close |
| `Neutral/DT-7` | #D2D3D6 | - | ❌ Missing |
| **Backgrounds** ||||
| `LT-0 (bg)` | #FCFBF8 | `--color-brand-light` | ✅ Match! |
| `LT-1` | #F5F3EF | `--color-bg-secondary` (#f0f0f0) | ⚠️ Close |
| `DT-1` | #1E1E21 | `--color-brand-dark` | ✅ Match! |
| `DT-1 [70%]` | #1D1D20 | - | ❌ Missing |
| `DT-2` | #262A33 | `--color-bg-secondary` (dark) (#2a2a2e) | ⚠️ Close |
| **Brand Colors** ||||
| `Brand/Y3 [Brand]` | #F5BB1D | - | ❌ New! |
| `Y2 [Y-1 web]` | #F5D245 | `--color-brand-yellow`, `--color-accent` | ✅ Match! |
| `Brand/R4 [Brand]` | #BC583F | - | ❌ New! |
| `R4 [R-1 web]` | #BC583F | - | ❌ New! |
| `Brand/R5` | #9C523F | - | ❌ New! |
| **Navy** ||||
| `Brand Colors/Primary/ND700` | #202A42 | - | ❌ New! |
| **Opacity Layers** ||||
| `Opa %/Light/Light-04%-08` | #FFFFFF 4-8% | `--color-hover` rgba | ⚠️ Concept match |
| `Opa %/Dark/Dark-04%-08` | #000000 4-8% | `--color-hover` rgba | ⚠️ Concept match |

### Analysis

**What's Missing from CSS:**
1. **Cream/Neutral Scale** - KL-2, KL-3, KL-5, KL-6 (warmer neutrals)
2. **Dark Neutrals** - DT-2, DT-4, DT-7 (cooler grays)
3. **Red/Orange Accents** - R4 (#BC583F), R5 (#9C523F)
4. **Secondary Yellow** - Y3 (#F5BB1D) - slightly darker than Y2
5. **Navy** - ND700 (#202A42)

**What Matches:**
- Primary background LT-0 (#FCFBF8) = brand-light ✅
- Primary dark DT-1 (#1E1E21) = brand-dark ✅
- Primary yellow Y2 (#F5D245) = brand-yellow ✅

---

## 2. Typography Tokens Comparison

### Figma Variables

| Token | Font | Size | Weight | Line Height |
|-------|------|------|--------|-------------|
| HTML/XLarge | Inter Semi Bold | 138px | 600 | 144px |
| HTML/Large | Inter Semi Bold | 105px | 600 | 112px |
| HTML/Medium | Inter Semi Bold | 80px | 600 | 88px |
| HTML/Small | Inter Semi Bold | 64px | 600 | 72px |
| HTML/H1 | Inter Semi Bold | 56px | 600 | 64px |
| HTML/H2 | Inter Semi Bold | 47px | 600 | 56px |
| HTML/H3 | Inter Semi Bold | 36px | 600 | 44px |
| HTML/H4 | Inter Semi Bold | 28px | 600 | 32px |
| HTML/H5 | Inter Medium | 22px | 500 | 28px |
| HTML/H6 | Inter Semi Bold | 16px | 600 | 24px |

### CSS Audit Findings

**Fonts Used:**
- Right Grotesk (Tight, Narrow, Tall, Compact, Bold)
- Inter Tight (in foundry/staging)
- System fonts

**Font Sizes:**
- 12px, 14px, 16px, 18px, 20px, 24px, 32px, 36px, 40px, 48px, 56px, 60px, 72px, 80px, 96px, 120px

### Critical Differences

**❌ MAJOR FINDING**: Figma uses **Inter Semi Bold/Medium** for all headings!
- CSS uses **Right Grotesk** variations
- Foundry uses **Inter Tight**
- Figma uses **Inter** (standard)

**Typography Scale:**
- Figma has **larger sizes**: 138px, 105px (not in CSS)
- Figma uses **specific line heights** (CSS mostly doesn't specify)
- Figma uses **Semi Bold (600)** consistently (CSS uses various weights)

---

## 3. Components in Figma

Based on the metadata, Figma has comprehensive components for:

### Buttons
- Button CTA A (sizes: L, M, S)
- Button CTA B (sizes: L, M, S)
- Button Text + Icon
- Button Groups (on/off states)

### Labels & Badges
- Labels (Default, Primary)
- Badges (Default, Primary, Link)
- Tags (sizes: off/on, with contrast variants)

### Navigation
- Nav items
- Subnav
- Social icons

### Cards
- Card sizes: XSmall, Small, Default, Medium, Large, XLarge
- Card variants: Default, Muted, Primary

### Form Elements
- Text inputs
- Text areas
- Select fields
- Checkboxes
- Radio buttons
- Submit buttons

### Icons
- 24 icons shown
- Multiple sizes: 18px, 20px, 24px, 32px, 40px

---

## 4. Recommendations for theme.css

### IMMEDIATE UPDATES NEEDED:

#### 1. **Add Missing Color Tokens**

```css
@theme {
  /* Cream/Neutral Scale (warmer) */
  --color-neutral-kl-2: #FAF9F5;
  --color-neutral-kl-3: #F7F6F2;
  --color-neutral-kl-5: #EDEBE4;
  --color-neutral-kl-6: #E5E3D8;
  
  /* Dark Neutrals (cooler) */
  --color-neutral-dt-2: #262A33;
  --color-neutral-dt-4: #4F535C;
  --color-neutral-dt-7: #D2D3D6;
  
  /* Brand Accent Colors */
  --color-brand-yellow-light: #F5BB1D;  /* Y3 */
  --color-brand-red: #BC583F;           /* R4 */
  --color-brand-red-dark: #9C523F;      /* R5 */
  --color-brand-navy: #202A42;          /* ND700 */
  
  /* Update existing */
  --color-brand-light: #FCFBF8;  /* LT-0 - confirmed! */
  --color-brand-dark: #1E1E21;   /* DT-1 - confirmed! */
  --color-brand-yellow: #F5D245; /* Y2 - confirmed! */
}
```

#### 2. **Typography System - DECISION NEEDED**

**Question:** Which font should be primary?
- **Option A**: Inter (matches Figma) - cleaner, more standard
- **Option B**: Right Grotesk (matches CSS) - more distinctive, brand-specific
- **Option C**: Hybrid - Right Grotesk for display, Inter for body text

**Recommendation:** Use **Right Grotesk for headings**, **Inter for body** (best of both worlds)

```css
@theme {
  --font-family-heading: 'RightGrotesk', sans-serif;
  --font-family-body: 'Inter', sans-serif;
  --font-family-system: system-ui, sans-serif;
}
```

#### 3. **Add Figma Typography Scale**

```css
@theme {
  /* Figma Display Sizes */
  --font-size-display-xl: 8.625rem;    /* 138px */
  --font-size-display-lg: 6.5625rem;   /* 105px */
  --font-size-display-md: 5rem;        /* 80px */
  --font-size-display-sm: 4rem;        /* 64px */
  
  /* Keep existing H1-H6 sizes close to Figma */
}
```

---

## 5. Figma File Structure

The file has excellent organization:

**Pages:**
1. **styleguide** (2723-245940) - Main style reference
   - HTML Headings
   - Button styles
   - Labels
   - Badges
   - Cards
   - Navigation
   - Icons
   - Forms
   - Rich text
   - Color samples
   
2. **Components** - Reusable component library
   - Buttons
   - Social icons
   - Labels
   
3. **Color System** - Neutrals with light/dark variants

4. **Text Contrast** - Accessibility examples

5. **Brand Assets** - Logos, social images, favicons

---

## 6. Questions to Resolve

### Color System
- [ ] Should we use Figma's warmer neutral scale (KL-*) or cooler CSS grays?
- [ ] Do you want the red/orange accents (R4, R5)? Where would they be used?
- [ ] Should we include the navy color (ND700)?
- [ ] Which yellow: Y2 (#F5D245) or Y3 (#F5BB1D) or both?

### Typography
- [ ] **CRITICAL**: Inter or Right Grotesk as primary font?
- [ ] Should we add the larger display sizes (138px, 105px)?
- [ ] Use Figma's specific line heights?

### Component Priority
Based on Figma, these components exist:
- [ ] Which components should we build first?
- [ ] Should we match Figma components exactly?

---

## 7. Proposed Action Plan

### Phase 1: Validate with User (TODAY)
1. User reviews this comparison
2. Decides on font strategy (Inter vs Right Grotesk)
3. Confirms which colors to include
4. Identifies any Figma components to prioritize

### Phase 2: Update theme.css
1. Add missing color tokens from Figma
2. Update typography scale with Figma sizes
3. Add font-weight tokens (Semi Bold 600, Medium 500)
4. Create semantic color mappings

### Phase 3: Extract Figma Components (if needed)
1. Use `get_code` to extract specific components
2. Generate React components from Figma designs
3. Compare with CSS patterns and merge best of both

---

## 8. Key Takeaways

**Good News:**
- ✅ Core brand colors match! (dark, light, yellow)
- ✅ Figma has comprehensive component library
- ✅ Well-organized design system

**Requires Decisions:**
- ⚠️ Font choice: Inter vs Right Grotesk
- ⚠️ Color palette: CSS grays vs Figma creams/neutrals
- ⚠️ Should we add red/orange/navy accents?

**Next Steps:**
- User needs to review and make decisions
- Then we can update theme.css with Figma tokens
- Build test page combining best of CSS + Figma

