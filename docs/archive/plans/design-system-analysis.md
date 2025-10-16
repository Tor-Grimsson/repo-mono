> **Archived 2025-10-16:** Findings incorporated into `docs/system/2.0-color-system.md`, `3.0-typography.md`, and `4.0-css-architecture.md`.

COMPREHENSIVE DESIGN SYSTEM ANALYSIS: kolkrabbi vs Industry Leaders

  EXECUTIVE SUMMARY

  After analyzing Material Design 3, Carbon Design, Radix Colors, shadcn/ui, and Ant Design
  against our system, I've identified 12 critical gaps, 7 inconsistencies, and 15 improvement 
  opportunities.

  ---
  1. TOKEN NAMING CONVENTIONS

  Material Design 3

  --md-sys-color-primary
  --md-sys-color-on-primary
  --md-sys-color-primary-container
  --md-sys-color-on-primary-container
  --md-sys-color-outline
  --md-sys-color-surface-variant
  Pattern: --{namespace}-{category}-{semantic}
  Strength: "on-" prefix for foreground colors creates clear relationships

  Carbon Design

  --cds-layer-01
  --cds-layer-02
  --cds-text-primary
  --cds-border-subtle
  --cds-background
  Pattern: --{namespace}-{role}-{variant}
  Strength: Layer-based system (01, 02, 03) for stacking contexts

  Radix Colors

  --blue-4  /* backgrounds */
  --blue-11 /* text */
  --gray-6  /* borders */
  Pattern: --{color}-{step} (1-12 scale)
  Strength: Numbered scales with semantic meaning per step

  shadcn/ui

  --background
  --foreground
  --primary
  --primary-foreground
  --muted
  --muted-foreground
  --border
  Pattern: Flat semantic names with -foreground suffix
  Strength: Simple, predictable, pairs everything

  Ant Design

  --ant-color-primary
  --ant-color-text
  --ant-color-bg-elevated
  --ant-color-split
  Pattern: --{namespace}-color-{semantic}

  OUR SYSTEM (kolkrabbi)

  /* MIXED PATTERNS - PROBLEM! */
  --color-brand-dark           /* ← brand colors */
  --color-neutral-500          /* ← numbered neutrals */
  --surface-primary            /* ← semantic surfaces */
  --foreground                 /* ← flat semantic */
  --component-fg               /* ← component tokens */
  --accent-primary             /* ← accent system */

  ❌ GAP #1: Inconsistent Naming Convention

  We mix FOUR different patterns:
  1. --color-{category}-{variant} (brand, neutral)
  2. --{semantic}-{variant} (surface-primary)
  3. --{flat-semantic} (foreground)
  4. --component-{role} (component-fg)

  Industry Standard: Pick ONE pattern and stick to it

  === --{namespace}-{category}-{semantic}

  ---
  2. OPACITY & TRANSPARENCY SCALES

  Material Design 3

  - Uses percentage suffixes: -2 = 8%, -4 = 12%
  - Linear progression for elevation

  Carbon Design

  - Uses semantic names: -subtle, -moderate, -strong
  - No numbered opacity utilities

  Radix Colors

  - Built into color steps (step 4 = subtle bg, step 11 = high contrast text)
  - No separate opacity system

  shadcn/ui

  - No opacity utilities - relies on Tailwind's built-in opacity classes

  OUR SYSTEM

  .bg-fg-02  /* 2% */
  .bg-fg-04  /* 4% */
  .bg-fg-08  /* 8% */
  .bg-fg-12  /* 12% */
  .bg-fg-16  /* 16% */
  .bg-fg-24  /* 24% */
  .bg-fg-32  /* 32% */
  .bg-fg-64  /* 64% */
  .bg-fg-96  /* 96% */

  ✅ STRENGTH: We have a comprehensive opacity scale

  ❌ GAP #2: Inconsistent scale jumps

  - 02 → 04 → 08 = doubling pattern
  - 08 → 12 → 16 = +4 increments
  - 16 → 24 → 32 → 64 → 96 = irregular jumps

  Industry Standard: Either geometric (2, 4, 8, 16, 32, 64) OR linear (10, 20, 30, 40...)

  ===lets do geometric

  ❌ GAP #3: Missing semantic aliases

  Material calls 8% "subtle", 24% "moderate". We just have numbers.

  ===im fine with numbers it's more descriptive to me visually

  ---
  3. SURFACE & LAYER ARCHITECTURE

  Material Design 3

  --md-sys-color-surface         /* base */
  --md-sys-color-surface-variant /* elevated */
  --md-sys-color-surface-container-lowest
  --md-sys-color-surface-container-low
  --md-sys-color-surface-container
  --md-sys-color-surface-container-high
  --md-sys-color-surface-container-highest
  Pattern: 5-step elevation system

  Carbon Design

  --cds-layer-01  /* base */
  --cds-layer-02  /* raised */
  --cds-layer-03  /* elevated */
  Pattern: 3-step layer system

  Radix Colors

  - No explicit "surface" tokens
  - Uses color steps (gray-1 = bg, gray-2 = subtle, gray-3 = UI element bg)

  shadcn/ui

  --background
  --card  /* slightly elevated */
  --popover /* more elevated */
  --muted /* alternative surface */

  OUR SYSTEM

  --surface-primary    /* #fcfbf8 light / #121215 dark */
  --surface-secondary  /* #f5f5f5 light / #19191d dark */
  --surface-tertiary   /* #eeeeee light / #202026 dark */
  --surface-inverse    /* #1e1e21 light / #f5f5f5 dark */

  ✅ STRENGTH: Clear 3-tier system + inverse

  ❌ GAP #4: No elevation system

  We lack intermediate surfaces for:
  - Dropdown menus (should be elevated above tertiary)
  - Modals/dialogs (should be highest elevation)
  - Tooltips/popovers

  Material has 7 levels, Carbon has 3, we have 3 + no overlay tokens

  === I don't use shadows, but it good to have them, 3 is enough, base raised elevated 1 2 3 like carbon design is logical to me.

  ❌ GAP #5: Missing "container" vs "surface" distinction

  Material separates:
  - Surface: Page backgrounds
  - Container: Component backgrounds

  We conflate these concepts.

  === Lets fix that

  ---
  4. FOREGROUND/BACKGROUND PAIRING

  Material Design 3 ⭐️ GOLD STANDARD

  --md-sys-color-primary
  --md-sys-color-on-primary  /* ← ALWAYS paired */

  --md-sys-color-surface
  --md-sys-color-on-surface  /* ← ALWAYS paired */
  Every background has an "on-" foreground pair

  Carbon Design

  --cds-layer-01
  --cds-text-primary  /* ← Not explicitly paired, but works contextually */

  shadcn/ui ⭐️ GOLD STANDARD

  --primary
  --primary-foreground

  --secondary
  --secondary-foreground

  --muted
  --muted-foreground

  --card
  --card-foreground
  Every surface has a -foreground pair

  OUR SYSTEM

  --surface-primary  /* ✓ Has foreground */
  --foreground       /* ← But not named surface-primary-foreground */

  --surface-secondary  /* ✗ NO PAIRED FOREGROUND */
  --surface-tertiary   /* ✗ NO PAIRED FOREGROUND */
  --surface-inverse    /* ✓ Has foreground-inverse */

  --accent-primary              /* ✓ */
  --accent-primary-foreground   /* ✓ Correct pattern! */

  ❌ GAP #6: Incomplete Foreground Pairing

  === follow material "on" sounds logical

  We only pair:
  - ✓ surface-primary + foreground
  - ✓ surface-inverse + foreground-inverse
  - ✓ accent-primary + accent-primary-foreground

  But missing:
  - ✗ surface-secondary-foreground
  - ✗ surface-tertiary-foreground
  - ✗ status-danger doesn't follow -foreground convention (it's --status-danger-foreground,
  inconsistent with accent pattern)

  ❌ GAP #7: Naming Inconsistency

  === follow material

  - Accent: --accent-primary-foreground ✓
  - Surface: --foreground (not --surface-primary-foreground) ✗
  - Inverse: --foreground-inverse (not --surface-inverse-foreground) ✗

  ---
  5. BORDER SYSTEM

  Material Design 3

  --md-sys-color-outline
  --md-sys-color-outline-variant  /* subtle */
  2 border weights: default & subtle

  Carbon Design

  --cds-border-subtle
  --cds-border-strong
  --cds-border-interactive
  3 semantic border types

  shadcn/ui

  --border  /* default */
  --ring    /* focus rings */

  OUR SYSTEM

  /* Tokens: */
  --component-border  /* 10% foreground */

  /* Utilities: */
  .border-auto       /* uses --component-border */
  .border-fg         /* 100% foreground */
  .border-fg-08      /* 8% */
  .border-fg-12      /* 12% */
  .border-fg-24      /* 24% */
  /* ... full scale to 96 */

  ✅ STRENGTH: Comprehensive border opacity scale

  ❌ GAP #8: Missing Border Semantic Variants

  We have no equivalent to:
  - --border-subtle (lighter than default)
  - --border-strong (heavier than default)
  - --border-interactive (for hover/focus)
  - --border-disabled

  ❌ GAP #9: The Original Problem - No Surface-Based Borders

  Every other system solves this with separate outline colors

  Material: Uses outline (different from text colors)
  Carbon: --cds-border-* are independent from text colors
  Radix: Border colors are separate scale steps
  shadcn: --border is its own token

  We only have foreground-based borders, creating the visibility problem.

  === lets fix this problem, create missing class set and missing semantic variants

  ---
  6. CONTEXT SWITCHING MECHANISM

  Material Design 3

  /* Automatic based on theme */
  .light-theme { --md-sys-color-surface: #fff; }
  .dark-theme { --md-sys-color-surface: #000; }
  Single class switch, all tokens update

  Carbon Design

  [data-carbon-theme="white"] { /* light tokens */ }
  [data-carbon-theme="g100"] { /* dark tokens */ }
  Data attribute theming

  Radix Colors

  .light { /* light scale */ }
  .dark { /* dark scale */ }
  Class-based

  shadcn/ui

  :root { /* light tokens */ }
  .dark { /* dark tokens */ }
  Root + .dark override

  OUR SYSTEM

  :root { /* light tokens in @theme */ }
  .dark { /* dark overrides */ }

  /* PLUS context utilities: */
  .surface-inverse {
    --component-fg: var(--foreground-inverse);
    --component-surface: var(--surface-inverse);
  }
  .surface-default {
    --component-fg: var(--foreground);
    --component-surface: var(--surface-primary);
  }

  ✅ STRENGTH: We have TWO layers of context

  === is it a strenght? it keeps causing trouble, I just want a more flexible system. If it is a strength let's keep it, if not lets loose it.

  1. Theme (light/dark)
  2. Surface (default/inverse)

  ❌ GAP #10: Confusing Double-Context System

  === lets change it to standard. .light .dark

  No other system does this!

  Everyone else: Theme = global, surfaces inherit automatically
  Us: Theme = global, BUT surfaces can override via .surface-inverse

  This creates the confusion you mentioned: "does the div know its background?"

  The component token abstraction (--component-fg) is unique to us - nobody else does this
  intermediate layer.

  ---
  7. OPACITY SCALE COMPARISON

  | System    | Scale Pattern                              | Count    |
  |-----------|--------------------------------------------|----------|
  | Material  | 2, 4, 8, 12, 16, 24                        | 6 steps  |
  | Carbon    | No opacity utilities (uses semantic names) | N/A      |
  | Radix     | Built into color steps                     | 12 steps |
  | shadcn    | Uses Tailwind (0, 5, 10...100)             | 21 steps |
  | kolkrabbi | 02, 04, 08, 12, 16, 24, 32, 64, 96         | 9 steps  |

  ❌ GAP #11: Non-Standard Scale

  - Material stops at 24%
  - We go to 96%
  - But we skip 40%, 48%, 56%, 72%, 80%, 88%

  Question: Do we actually USE 64% and 96%? Or are these theoretical?

  === they are theoretical, I wanted to know I could step up and down opacity, making it work as a non destructive greyscale.

⏺ Bash(grep -r "bg-fg-64\|bg-fg-96" apps/web/src --include="*.jsx" | wc -l)
  ⎿  2

⏺ Only 2 uses! Let me check what they are:

⏺ Bash(grep -r "bg-fg-64\|bg-fg-96" apps/web/src --include="*.jsx")
  ⎿ apps/web/src/routes/styleguide/Colors.jsx:    { token: '.bg-fg-64', dark: { label: 'rgba(245,
    245,245,0.64)', hex: '#f5f5f5' }, light: { label: 'rgba(30,30,33,0.64)', hex: '#1e1e21' }, us
    age: 'High-contrast badges, overlays.' },
    … +3 lines (ctrl+o to expand)



⏺ They're only documented, never used in actual components!

  ---
  8. MISSING UTILITIES

  | Utility Type            | Material                | Carbon                 | Radix
  | shadcn           | kolkrabbi                     |
  |-------------------------|-------------------------|------------------------|------------------
  |------------------|-------------------------------|
  | Background opacity      | ✓ (6 steps)             | ✗                      | ✓ (12 steps)
  | ✓ (Tailwind)     | ✓ (9 steps)                   |
  | Border opacity          | ✓ (outline-variant)     | ✓ (subtle/strong)      | ✓ (border steps)
  | ✓ (border)       | ✓ (9 steps fg-based)          |
  | Surface-based borders   | ✓                       | ✓                      | ✓
  | ✓                | ✗ MISSING                     |
  | Elevation/shadow tokens | ✓ (5 levels)            | ✓ (layer system)       | ✓ (scale steps)
  | ✓ (card/popover) | ✗ Only 4 shadows, no semantic |
  | State variants          | ✓ (hover/focus/pressed) | ✓ (interactive states) | ✓ (step-based)
  | ✓ (hover/focus)  | ✗ MISSING                     |
  | Container vs Surface    | ✓                       | ✓                      | ✗
  | ✓ (card/popover) | ✗ MISSING                     |

 ====  table is broken, can't read it. 


  ❌ GAP #12: No State Variant Utilities

=== let's create these missing states

  /* Other systems have: */
  --color-primary-hover
  --border-interactive-hover
  --surface-hover

  /* We have nothing - devs add opacity inline */

  ---
  9. DOCUMENTATION INCONSISTENCIES

  ❌ INCONSISTENCY #1: Foreground Border Table Incomplete

  Docs show: .border-fg, .border-fg-08, .border-fg-12, .border-fg-24 (4 variants)
  Actually implemented: Full scale 02-96 (10 variants)

  Why: Table only shows "common uses" but doesn't indicate more exist

  ❌ INCONSISTENCY #2: .surface-default Not in Surface Tokens Table

  Issue you raised: It's a utility for surface context but not listed with surface tokens
  Root cause: It's not a token (no CSS custom property), it's a utility class

  ❌ INCONSISTENCY #3: Deprecated Tokens Still in Use

  /* Marked @deprecated but still defined: */
  --surface-100 through --surface-900
  --accent (use --accent-primary)
  --surface-border (use --component-border)

  ❌ INCONSISTENCY #4: Component Token Layer Undocumented

  The --component-fg / --component-surface abstraction layer is implemented but never explained in
   docs.

  Users don't know:
  - What --component-* tokens are
  - Why they exist vs --foreground / --surface-primary
  - When to use which

  ❌ INCONSISTENCY #5: Opacity Scale Justification Missing

  Why these specific values? (02, 04, 08, 12, 16, 24, 32, 64, 96)
  - Material explains theirs (elevation levels)
  - Radix explains theirs (semantic steps)
  - We have no rationale documented

  ❌ INCONSISTENCY #6: No Contrast Ratio Data

  - Material provides WCAG contrast ratios for every pairing
  - shadcn shows foreground colors per background
  - We have no contrast guidance

  ❌ INCONSISTENCY #7: Missing Use Case Examples

  Docs show WHAT utilities exist, but not WHEN to use them:
  - When to use .bg-fg-08 vs .bg-fg-12?
  - When to use surface-secondary vs surface-tertiary?
  - No component examples showing "use this token here"

====  we can do a complete documentation re-write after we re-work the system and generate new classes

  ---
  10. IMPROVEMENT OPPORTUNITIES

  🔥 CRITICAL (Fix Now)

  1. Add border-surface-* utilities (the original problem)
  .border-surface-08 { border-color: color-mix(in srgb, var(--component-surface) 8%, transparent);
   }
  .border-surface-12 { border-color: color-mix(in srgb, var(--component-surface) 12%,
  transparent); }
  .border-surface-24 { border-color: color-mix(in srgb, var(--component-surface) 24%,
  transparent); }
  .border-surface-32 { border-color: color-mix(in srgb, var(--component-surface) 32%,
  transparent); }

  2. Consolidate naming convention
  Choose ONE pattern for all tokens (recommend --{category}-{semantic}-{variant})

  3. Complete foreground pairing
  Add:
  --surface-secondary-foreground
  --surface-tertiary-foreground

  4. Document the component token system
  Explain the --component-* layer in a dedicated section

  5. Fix documentation gaps
  - Show all border-fg variants (not just 4)
  - Add .surface-default to appropriate table with explanation
  - Add use-case guidance for every token

  ⚠️ HIGH PRIORITY (Plan for Next Phase)

  6. Add elevation system
  --surface-elevated-01  /* dropdowns */
  --surface-elevated-02  /* modals */
  --surface-elevated-03  /* tooltips */

  7. Add semantic border variants
  --border-subtle: color-mix(in srgb, var(--foreground) 5%, transparent);
  --border-moderate: var(--component-border);  /* alias to existing */
  --border-strong: color-mix(in srgb, var(--foreground) 20%, transparent);

  8. Add state variants
  --surface-primary-hover
  --surface-primary-active
  --border-hover
  --border-focus

  9. Rationalize opacity scale
  Either:
  - Option A: Match Material (02, 04, 08, 12, 16, 24) - stop at 24
  - Option B: Linear scale (10, 20, 30, 40, 50...) - easier mental model
  - Option C: Keep current but document WHY each value exists

  10. Add contrast ratio documentation
  For each surface + foreground pair, document WCAG contrast

  💡 NICE TO HAVE (Future Iterations)

  11. Separate container tokens
  --container-primary    /* for component backgrounds */
  --container-secondary
  --container-elevated

  12. Add transition tokens
  --transition-color: color 200ms ease;
  --transition-bg: background-color 200ms ease;

  13. Semantic opacity aliases
  --opacity-subtle: 0.08;  /* maps to 08 */
  --opacity-moderate: 0.16; /* maps to 16 */
  --opacity-strong: 0.32;   /* maps to 32 */

  14. Remove deprecated tokens
  Actually delete --surface-100 through --surface-900 after migration

  15. Add CSS custom property fallbacks
  --foreground: var(--color-text-primary, #1e1e21);  /* fallback for safety */

  ---
  SUMMARY: CRITICAL FINDINGS

  What We Do Better Than Others

  1. ✅ Comprehensive opacity scale (9 steps vs Material's 6)
  2. ✅ Dual-layer context system (theme + surface) - unique approach
  3. ✅ Well-documented utilities (better than Carbon/Radix)

  What Others Do Better

  1. ❌ Consistent naming (everyone else has ONE pattern)
  2. ❌ Complete foreground pairing (Material/shadcn pair EVERYTHING)
  3. ❌ Independent border colors (everyone has borders separate from text)
  4. ❌ Elevation systems (Material has 7 levels, we have 3)
  5. ❌ State variants (everyone has hover/focus/pressed)

  The Core Architectural Problem

  Our --component-* token layer is too clever

  It's an abstraction nobody else uses. While it enables neat tricks (.surface-inverse switching),
   it creates confusion:
  - "Does the div know its background?"
  - "Why border-fg-24 doesn't show?"
  - "What's the difference between --foreground and --component-fg?"

  Recommendation: Either:
  - Option A: Keep it but HEAVILY document it
  - Option B: Simplify to match industry patterns (remove component layer, use explicit tokens
  like shadcn)

  ---
  Should I now create the implementation plan for fixing these issues, starting with the critical
  border-surface-* utilities?



  I think I answered everything "====answer"
