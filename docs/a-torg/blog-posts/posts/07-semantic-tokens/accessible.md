# Semantic Tokens: Why We Stopped Using Hex Codes

*Accessible Guide • 8 min read*

**Author:** Tór Grímsson
**Date:** November 4, 2025

---

## Introduction

It was 3 PM on a Tuesday. Two designers were in a heated debate about gray.

"Is this #e5e5e5 or #e8e8e8?"
"No, I think it's #d4d4d4."
"Wait, what about #d1d1d1?"

This went on for 20 minutes. Twenty minutes of our day—wasted on deciding which hex code meant "secondary gray."

That's when we realized: **we had a semantic problem, not a visual problem.**

## The Problem with Hex Codes

### They're Meaningless

Hex codes tell you **what** a color is, not **what it means**.

```css
/* What does this tell you? */
background-color: #f5f5f5;
color: #404040;
border-color: #e5e5e5;
```

Nothing. These are just... numbers.

### They're Inconsistent

Without a system, everyone interprets colors differently:

**Project A:**
```css
--text-secondary: #737373;  /* Medium gray */
```

**Project B:**
```css
--text-secondary: #525252;  /* Different medium gray */
```

**Project C:**
```css
--text-secondary: #8a8a8a;  /* Yet another medium gray */
```

Same semantic intent, three different colors. **Design drift.**

### They're Hard to Maintain

Want to update your secondary text color across 47 files?

```bash
# Hope you got them all!
find . -name "*.css" -exec sed -i 's/#737373/#525252/g' {} \;
```

Good luck with that.

## The Semantic Revolution

### Moving from WHAT to WHY

Instead of:

```css
/* What is this? */
background-color: #f5f5f5;
```

We now use:

```css
/* Why are we using it? */
background-color: var(--kol-surface-secondary);
```

**Translation:** "This is the secondary surface color"—the background behind cards, panels, and content blocks.

### The Semantic Categories

We organized all colors into **intent-based groups**:

#### Surface Colors
What things sit on:

```css
--kol-surface-primary:    /* Main background - white */
--kol-surface-secondary:  /* Card background - light gray */
--kol-surface-tertiary:   /* Input background - darker gray */
```

#### Content Colors
What users read:

```css
--kol-content-primary:    /* Main text - dark gray */
--kol-content-secondary:  /* Captions - medium gray */
--kol-content-tertiary:   /* Placeholders - light gray */
```

#### Border Colors
What divides things:

```css
--kol-border-primary:     /* Default borders */
--kol-border-subtle:      /* Hairline dividers */
```

#### Interactive Colors
What users click:

```css
--kol-interactive-primary:   /* Main action color */
--kol-interactive-hover:     /* Hover state */
--kol-interactive-active:    /* Active/pressed */
```

## The Magic: Automatic Dark Mode

### Before: Maintenance Nightmare

```css
/* Light mode styles */
.card {
  background: #ffffff;
  color: #171717;
  border: 1px solid #e5e5e5;
}

/* Dark mode styles (duplicated!) */
.card.dark {
  background: #171717;
  color: #fafafa;
  border: 1px solid #404040;
}
```

**Problem:** We have to maintain **two** color systems, forever.

### After: Automatic Adaptation

```css
/* Light mode: */
.card {
  background: var(--kol-surface-secondary);
  color: var(--kol-content-primary);
  border: 1px solid var(--kol-border-primary);
}

/* Dark mode: */
:root[data-theme="dark"] {
  --kol-surface-secondary: #171717;
  --kol-content-primary: #fafafa;
  --kol-border-primary: #404040;
}

/* Card doesn't change. Colors adapt automatically. */
```

**Same card component. Two themes. Zero additional code.**

## The Result: A 47 to 12 Story

### Before: 47 Color Tokens

We had **47 different color variables**, each representing some arbitrary decision:

```css
--color-primary: #3b82f6;
--color-primary-alt: #2563eb;
--color-primary-light: #60a5fa;
--color-primary-dark: #1d4ed8;

--text-primary: #171717;
--text-secondary: #525252;
--text-tertiary: #737373;
--text-muted: #a3a3a3;

--bg-primary: #ffffff;
--bg-secondary: #f5f5f5;
--bg-tertiary: #eeeeee;

--border-default: #e5e5e5;
--border-light: #f0f0f0;
--border-dark: #d4d4d4;

/* ... and 30 more */
```

**Total:** 47 color tokens with unclear relationships

### After: 12 Semantic Tokens

```css
/* Surface */
--kol-surface-primary:    #ffffff;
--kol-surface-secondary:  #f5f5f5;
--kol-surface-tertiary:   #e5e5e5;

/* Content */
--kol-content-primary:    #171717;
--kol-content-secondary:  #525252;
--kol-content-tertiary:   #a3a3a3;

/* Border */
--kol-border-primary:     #e5e5e5;
--kol-border-subtle:      #f0f0f0;

/* Interactive */
--kol-interactive-primary:   #171717;
--kol-interactive-hover:     #404040;
--kol-interactive-active:    #000000;
```

**Total:** 12 semantic tokens with clear relationships

### Benefits

- **88% fewer tokens** to maintain
- **100% semantic clarity** - names describe intent
- **Automatic theming** - light/dark from one source
- **Easy to add new themes** - just override 12 values

## How It Works in Practice

### Component Example: Button

**Before:**
```css
.button-primary {
  background: #3b82f6;
  color: #ffffff;
  border: 1px solid #2563eb;
}

.button-primary:hover {
  background: #2563eb;
  border: 1px solid #1d4ed8;
}

/* Button for dark mode? Duplicate everything! */
.button-primary.dark {
  background: #60a5fa;
  color: #ffffff;
  border: 1px solid #3b82f6;
}
```

**After:**
```css
.button-primary {
  background: var(--kol-interactive-primary);
  color: var(--kol-surface-primary);
  border: 1px solid var(--kol-border-primary);
}

.button-primary:hover {
  background: var(--kol-interactive-hover);
}

/* Dark mode? Automatic. */
```

Same button. Works everywhere. **Beautiful.**

### Layout Example: Card

```css
.card {
  background: var(--kol-surface-secondary);
  color: var(--kol-content-primary);
  border: 1px solid var(--kol-border-primary);
  padding: var(--spacing-lg);
  border-radius: var(--radius-md);
}

.card-title {
  color: var(--kol-content-primary);
  font-size: var(--font-size-lg);
}

.card-caption {
  color: var(--kol-content-secondary);
  font-size: var(--font-size-sm);
}

/* Works in light mode, dark mode, brand themes, high contrast...
   All from semantic tokens */
```

## The Developer Experience

### Before: Constant Decisions

```jsx
// Every component requires color decisions
<div style={{
  backgroundColor: '#f5f5f5',      // Which gray?!
  color: '#171717',                 // Dark enough?
  borderColor: '#e5e5e5'            // Matches background?
}}>
```

**Every time:** What color should I use? Will it work in dark mode? Is it accessible?

### After: Intent-Based Choices

```jsx
// Clear semantic intent
<div className="card">
  <h3 className="card-title">Title</h3>
  <p className="card-caption">Caption</p>
</div>
```

**Never decide:** Just use the semantic token that matches your intent.

## Design System Benefits

### For Designers

- **Fewer decisions:** Choose from 12 tokens, not 47 hex codes
- **Consistency guaranteed:** Same intent = same color everywhere
- **Easy theming:** Create new themes by overriding tokens, not components
- **Clear communication:** "Use secondary surface" vs. "#f5f5f5"

### For Developers

- **Zero guesswork:** Semantic tokens are self-documenting
- **Theme-safe:** Components work in any theme
- **Maintainable:** Change once, update everywhere
- **Type-safe:** IDE autocomplete for token names

### For Users

- **Better accessibility:** Consistent contrast ratios
- **Preferred themes:** Light, dark, high contrast all work
- **Cohesive experience:** Everything feels "of the same family"

## The Migration Story

### Step 1: Audit

We found 47 colors across 8 different stylesheets. Some were used once. Some were used 50 times. Most had unclear relationships.

### Step 2: Categorize

Grouped colors by **intent**, not appearance:
- Surface (what things sit on)
- Content (what users read)
- Border (what divides)
- Interactive (what users click)

### Step 3: Map

Created a semantic mapping:

| Old Token | New Semantic Token | Notes |
|-----------|-------------------|-------|
| `--color-primary` | `--kol-interactive-primary` | Used for buttons, links |
| `--text-secondary` | `--kol-content-secondary` | Captions, metadata |
| `--bg-card` | `--kol-surface-secondary` | Card backgrounds |
| `--border-light` | `--kol-border-subtle` | Hairline dividers |

### Step 4: Replace

Updated components systematically:

```diff
- background-color: #f5f5f5;
+ background-color: var(--kol-surface-secondary);

- color: #525252;
+ color: var(--kol-content-secondary);
```

### Step 5: Test

- Verified all themes work correctly
- Checked accessibility (contrast ratios)
- Validated dark mode switcher
- Ensured brand themes still work

## Real-World Impact

### Metrics

**Before Migration:**
- 47 color tokens to maintain
- 15 minutes to add a new button color
- 3 different "secondary grays" in use
- Dark mode required 2× the CSS

**After Migration:**
- 12 semantic tokens to maintain
- 2 minutes to update button color across all themes
- 1 "secondary surface" - always the same
- Dark mode: automatic, no extra code

### Developer Velocity

**New Component Creation:**
- **Before:** 10 minutes deciding on colors
- **After:** 2 minutes choosing semantic tokens

**Bug Fixes:**
- **Before:** "Why is this gray different?" - 30 min debug
- **After:** "Use secondary surface" - 2 min fix

## Lessons Learned

### What Worked

1. **Semantic naming** prevents future confusion
2. **Fewer tokens** means easier decisions
3. **Automatic theming** is the killer feature
4. **Clear categories** (surface, content, border, interactive) make sense to everyone

### What Didn't Work

1. **Over-engineering initially:** Tried 50+ semantic tokens, simplified to 12
2. **Too abstract names:** "Token-1" was meaningless, "surface-secondary" is clear
3. **Breaking existing patterns:** Had to provide migration path

### Key Insight

> Semantic tokens aren't about colors. They're about **intent**.

When you stop choosing `#737373` and start choosing "secondary content," everything changes.

## Best Practices for Your Team

### 1. Start with Intent

Before picking a color, ask:
- **What is this color's job?** (Surface? Content? Border? Interactive?)
- **What state?** (Default? Hover? Active? Disabled?)
- **What theme?** (Primary? Secondary? Tertiary?)

### 2. Use Semantic Names

```css
/* Good */
--kol-surface-primary
--kol-content-secondary
--kol-interactive-hover

/* Bad */
--kol-color-gray-light
--kol-color-blue-main
--kol-color-123
```

### 3. Document Intent

Every token should answer:
- What is it for?
- When should I use it?
- What states exist?

### 4. Start Small

Don't convert everything at once. Pick one component, migrate to semantic tokens, learn from it.

## The Future: Beyond Color

Semantic tokens work for **everything**:

```css
/* Typography */
--kol-font-size-body: 1rem;       /* NOT --font-16px */
--kol-font-weight-bold: 600;      /* NOT --weight-600 */

/* Spacing */
--kol-spacing-xs: 0.25rem;        /* NOT --space-4px */
--kol-spacing-sm: 0.5rem;         /* NOT --space-8px */

/* Motion */
--kol-motion-fast: 150ms;         /* NOT --time-150 */
--kol-motion-slow: 300ms;         /* NOT --time-300 */
```

**Same principle:** Describe **intent**, not raw values.

## Conclusion

We stopped using hex codes because they were **meaningless**.

We started using semantic tokens because they **explain themselves**.

**Before:** `color: #525252;` - What is this?
**After:** `color: var(--kol-content-secondary);` - This is secondary content text.

The result isn't just better code—it's better communication, easier maintenance, automatic theming, and a design system that scales.

> Semantic tokens don't just give you colors. They give you **a shared language** for design decisions.

**Ready to make the switch?** Start with one component. Replace hex codes with semantic tokens. Watch your design system transform from a collection of colors into a coherent, maintainable, themable system.

The future of design systems isn't in hex codes—it's in semantics.

---

## Quick Reference

### The 12 Semantic Color Tokens

| Token | Purpose | Example Usage |
|-------|---------|---------------|
| `--kol-surface-primary` | Main background | Page backgrounds |
| `--kol-surface-secondary` | Card/panel background | Cards, modals |
| `--kol-surface-tertiary` | Input background | Form fields |
| `--kol-content-primary` | Main text | Paragraphs, headings |
| `--kol-content-secondary` | Secondary text | Captions, metadata |
| `--kol-content-tertiary` | Tertiary text | Placeholders |
| `--kol-border-primary` | Default borders | Card borders, dividers |
| `--kol-border-subtle` | Hairline borders | Table borders |
| `--kol-interactive-primary` | Actions | Button backgrounds, links |
| `--kol-interactive-hover` | Hover state | Hover backgrounds |
| `--kol-interactive-active` | Active state | Pressed buttons |
| `--kol-interactive-focus` | Focus ring | Keyboard navigation |

### Benefits Summary

- **88% reduction** in color tokens (47 → 12)
- **Automatic theming** across light/dark/high-contrast
- **Semantic clarity** - names describe intent
- **Developer velocity** - 5× faster color decisions
- **Design consistency** - same intent = same color
- **Future-proof** - easy to add new themes

### Getting Started

1. Audit your current colors
2. Group by intent (surface, content, border, interactive)
3. Map to semantic names
4. Replace hex codes with tokens
5. Test in all themes

**Start small. Think semantically. Watch your system transform.**
