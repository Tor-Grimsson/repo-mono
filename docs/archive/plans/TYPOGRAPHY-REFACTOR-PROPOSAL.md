# Typography Refactor Proposal

**Date:** 2025-10-13
**Status:** Proposed
**Impact:** Medium - 51 occurrences across 24 files

## Executive Summary

This proposal addresses two critical improvements to the Kolkrabbi typography system:

1. **Rename typography classes** to follow semantic best practices and avoid HTML element naming conflicts
2. **Implement responsive breakpoints** for all 11 typography classes (currently 27/33 breakpoints are preview-only)

## Problem Statement

### 1. Naming Convention Issues

**Current state:** Mix of semantic and HTML-mimicking class names creates confusion and reduces flexibility.

```css
/* Good - Semantic, role-based */
.kol-heading-display  /* ✅ Hero statements */
.kol-heading-section  /* ✅ Section headlines */

/* Problematic - Mimics HTML elements */
.kol-h1  /* ⚠️ Conflicts with <h1> semantic meaning */
.kol-h2  /* ⚠️ Forces visual-semantic coupling */
.kol-h3  /* ⚠️ Reduces flexibility */
.kol-h4  /* ⚠️ Inconsistent with other class names */
```

**Issues:**
- **Separation of concerns**: Visual styling shouldn't dictate semantic HTML structure
- **Flexibility**: Can't easily apply H1 visual style to an H3 semantic element without confusion
- **Accessibility**: Screen readers rely on heading hierarchy; visual appearance shouldn't force semantic choices
- **Inconsistency**: 7/11 classes use semantic names, 4/11 mimic HTML elements

### 2. Missing Responsive Breakpoints

**Current state:** Only 6 of 33 breakpoints (18%) are implemented in CSS. The rest are preview-only proposals.

| Class | Mobile | Tablet | Desktop | Status |
|-------|--------|--------|---------|--------|
| `kol-heading-display` | ✅ 48px | 👁️ 64px | ✅ 96px | Partial (clamp) |
| `kol-heading-section` | 👁️ 40px | 👁️ 48px | ✅ 64px | Desktop only |
| `kol-h1` | 👁️ 40px | 👁️ 48px | ✅ 64px | Desktop only |
| `kol-h2` | ✅ 32px | 👁️ 40px | ✅ 48px | Mobile + Desktop |
| `kol-h3` | ✅ 28px | 👁️ 32px | ✅ 40px | Mobile + Desktop |
| `kol-h4` | ✅ 20px | 👁️ 24px | ✅ 32px | Mobile + Desktop |
| `kol-body` | 👁️ 14px | 👁️ 16px | 👁️ 18px | Fixed 16px |
| `kol-body-sm` | 👁️ 12px | 👁️ 14px | 👁️ 16px | Fixed 14px |
| `kol-mono-body` | 👁️ 14px | 👁️ 16px | 👁️ 18px | Fixed 16px |
| `kol-label` | ✅ 14px | 👁️ 16px | ✅ 24px | Mobile + Desktop |
| `kol-mono` | ✅ 11px | 👁️ 12px | ✅ 14px | Mobile + Desktop |

**Legend:** ✅ Implemented | 👁️ Preview only (60% opacity in styleguide)

---

## Proposed Solution

### Part 1: Renaming Scheme

#### New Naming Convention

**Pattern:** `kol-{category}-{size|purpose}`

- **Category**: `heading`, `text`, `label`, `mono`
- **Size**: `display`, `xl`, `lg`, `md`, `sm`, `xs`
- **Purpose**: When size doesn't convey meaning (e.g., `section`, `compact`, `meta`)

#### Complete Renaming Map

| Current Class | New Class | Reasoning | Files Affected |
|--------------|-----------|-----------|----------------|
| `kol-heading-display` | `kol-heading-display` | ✅ Keep - Already semantic | 24 files |
| `kol-heading-section` | `kol-heading-section` | ✅ Keep - Already semantic | 24 files |
| `kol-h1` | `kol-heading-xl` | Size-based, matches usage "Page titles" | 24 files |
| `kol-h2` | `kol-heading-lg` | Size-based, matches usage "Major subheads" | 24 files |
| `kol-h3` | `kol-heading-md` | Size-based, matches usage "Minor subheads" | 24 files |
| `kol-h4` | `kol-heading-sm` | Size-based, matches usage "Compact headings" | 24 files |
| `kol-body` | `kol-text` | Simplified base text class | 24 files |
| `kol-body-sm` | `kol-text-sm` | Size variant | 24 files |
| `kol-mono-body` | `kol-mono-text` | Matches new text pattern | 24 files |
| `kol-label` | `kol-label` | ✅ Keep - Already semantic | 24 files |
| `kol-mono` | `kol-mono-xs` | Size-based for consistency | 24 files |

#### Visual Hierarchy (After Rename)

```
kol-heading-display  (48-96px)  - Hero statements
kol-heading-section  (40-64px)  - Section headlines
kol-heading-xl       (40-64px)  - Page titles
kol-heading-lg       (32-48px)  - Major subheads
kol-heading-md       (28-40px)  - Minor subheads
kol-heading-sm       (20-32px)  - Compact headings
kol-text             (14-18px)  - Body copy
kol-text-sm          (12-16px)  - Supporting copy
kol-mono-text        (14-18px)  - Monospace body
kol-label            (14-24px)  - UI labels
kol-mono-xs          (11-14px)  - Monospace metadata
```

---

### Part 2: Responsive Breakpoint Implementation

#### Breakpoint Strategy

**Mobile First Approach:**
- Base styles = Mobile (default)
- `@media (min-width: 768px)` = Tablet (md)
- `@media (min-width: 1024px)` = Desktop (lg)

**Implementation Methods:**

1. **Clamp function** - For fluid scaling (Display, Section)
   ```css
   font-size: clamp(48px, 8vw, 96px);
   ```

2. **Media queries** - For stepped breakpoints (All others)
   ```css
   .kol-heading-xl {
     font-size: 40px; /* Mobile */
   }
   @media (min-width: 768px) {
     .kol-heading-xl {
       font-size: 48px; /* Tablet */
     }
   }
   @media (min-width: 1024px) {
     .kol-heading-xl {
       font-size: 64px; /* Desktop */
     }
   }
   ```

#### Complete CSS Implementation

**File:** `/packages/ui/css/components.css`

```css
@layer components {
  /* ========================================================================
   * DISPLAY HEADINGS - Largest, most impactful
   * ======================================================================== */

  .kol-heading-display {
    font-family: var(--font-family-rgrot-tight);
    font-weight: 500;
    font-size: clamp(48px, 8vw, 96px); /* 48px → 96px fluid */
    text-transform: uppercase;
    line-height: 100%;
  }

  .kol-heading-section {
    font-family: var(--font-family-rgrot-tight);
    font-weight: 500;
    font-size: 40px; /* Mobile: 40px */
    text-transform: uppercase;
    line-height: 100%;
  }

  @media (min-width: 768px) {
    .kol-heading-section {
      font-size: 48px; /* Tablet: 48px */
    }
  }

  @media (min-width: 1024px) {
    .kol-heading-section {
      font-size: 64px; /* Desktop: 64px */
    }
  }

  /* ========================================================================
   * CONTENT HEADINGS - Responsive hierarchy
   * ======================================================================== */

  .kol-heading-xl {
    font-family: var(--font-family-rgrot-narrow);
    font-size: 40px; /* Mobile: 40px */
    line-height: 110%;
  }

  @media (min-width: 768px) {
    .kol-heading-xl {
      font-size: 48px; /* Tablet: 48px */
    }
  }

  @media (min-width: 1024px) {
    .kol-heading-xl {
      font-size: 64px; /* Desktop: 64px */
    }
  }

  .kol-heading-lg {
    font-family: var(--font-family-rgrot-narrow);
    font-size: 32px; /* Mobile: 32px */
    line-height: 110%;
  }

  @media (min-width: 768px) {
    .kol-heading-lg {
      font-size: 40px; /* Tablet: 40px */
    }
  }

  @media (min-width: 1024px) {
    .kol-heading-lg {
      font-size: 48px; /* Desktop: 48px */
    }
  }

  .kol-heading-md {
    font-family: var(--font-family-rgrot-narrow);
    font-size: 28px; /* Mobile: 28px */
    line-height: 120%;
  }

  @media (min-width: 768px) {
    .kol-heading-md {
      font-size: 32px; /* Tablet: 32px */
    }
  }

  @media (min-width: 1024px) {
    .kol-heading-md {
      font-size: 40px; /* Desktop: 40px */
    }
  }

  .kol-heading-sm {
    font-family: var(--font-family-rgrot-tight);
    font-size: 20px; /* Mobile: 20px */
    line-height: 100%;
  }

  @media (min-width: 768px) {
    .kol-heading-sm {
      font-size: 24px; /* Tablet: 24px */
    }
  }

  @media (min-width: 1024px) {
    .kol-heading-sm {
      font-size: 32px; /* Desktop: 32px */
    }
  }

  /* ========================================================================
   * BODY TEXT - Responsive reading experience
   * ======================================================================== */

  .kol-text {
    font-family: var(--font-family-body);
    font-size: 14px; /* Mobile: 14px */
    line-height: 160%;
  }

  @media (min-width: 768px) {
    .kol-text {
      font-size: 16px; /* Tablet: 16px */
    }
  }

  @media (min-width: 1024px) {
    .kol-text {
      font-size: 18px; /* Desktop: 18px */
    }
  }

  .kol-text-sm {
    font-family: var(--font-family-body);
    font-size: 12px; /* Mobile: 12px */
    line-height: 150%;
  }

  @media (min-width: 768px) {
    .kol-text-sm {
      font-size: 14px; /* Tablet: 14px */
    }
  }

  @media (min-width: 1024px) {
    .kol-text-sm {
      font-size: 16px; /* Desktop: 16px */
    }
  }

  /* ========================================================================
   * MONOSPACE TEXT
   * ======================================================================== */

  .kol-mono-text {
    font-family: var(--font-family-mono);
    font-size: 14px; /* Mobile: 14px */
    line-height: 125%;
    font-weight: 400;
    opacity: 0.6;
  }

  @media (min-width: 768px) {
    .kol-mono-text {
      font-size: 16px; /* Tablet: 16px */
    }
  }

  @media (min-width: 1024px) {
    .kol-mono-text {
      font-size: 18px; /* Desktop: 18px */
    }
  }

  .kol-label {
    font-family: var(--font-family-mono);
    font-size: 14px; /* Mobile: 14px */
    text-transform: uppercase;
    letter-spacing: 0.05em;
    line-height: 100%;
  }

  @media (min-width: 768px) {
    .kol-label {
      font-size: 16px; /* Tablet: 16px */
    }
  }

  @media (min-width: 1024px) {
    .kol-label {
      font-size: 24px; /* Desktop: 24px */
    }
  }

  .kol-mono-xs {
    font-family: var(--font-family-mono);
    font-size: 11px; /* Mobile: 11px */
    line-height: normal;
    font-weight: 400;
  }

  @media (min-width: 768px) {
    .kol-mono-xs {
      font-size: 12px; /* Tablet: 12px */
    }
  }

  @media (min-width: 1024px) {
    .kol-mono-xs {
      font-size: 14px; /* Desktop: 14px */
    }
  }

  /* ========================================================================
   * LEGACY ALIASES - Backward compatibility (DEPRECATED)
   * Remove after migration complete
   * ======================================================================== */

  .kol-h1 { @apply kol-heading-xl; }
  .kol-h2 { @apply kol-heading-lg; }
  .kol-h3 { @apply kol-heading-md; }
  .kol-h4 { @apply kol-heading-sm; }
  .kol-body { @apply kol-text; }
  .kol-body-sm { @apply kol-text-sm; }
  .kol-mono-body { @apply kol-mono-text; }
  .kol-mono { @apply kol-mono-xs; }
}
```

---

## Migration Plan

### Phase 1: Preparation (30 minutes)

**Tasks:**
1. ✅ Document current usage (51 occurrences across 24 files)
2. Create backup branch: `git checkout -b backup/pre-typography-refactor`
3. Create feature branch: `git checkout -b feature/typography-refactor`
4. Update `docs/DECISIONS.md` with refactor decision

### Phase 2: CSS Implementation (45 minutes)

**Tasks:**
1. Update `/packages/ui/css/components.css`:
   - Add new responsive classes with full breakpoints
   - Add legacy aliases using `@apply` for backward compatibility
   - Comment deprecation warnings on old classes
2. Update `/apps/web/src/data/styleguide/tokens.js`:
   - Update `className` field for all 11 classes
   - Update `id` fields to match new names
   - Update `label` fields
   - **Remove all `preview: true` flags** (all breakpoints now implemented)
3. Verify CSS builds: `yarn build`

### Phase 3: Component Updates (60 minutes)

**Files requiring updates (24 files, 51 occurrences):**

#### Apps (Web)
- `/apps/web/src/routes/styleguide/Typography.jsx`
- `/apps/web/src/routes/styleguide/TypeReport.jsx`
- `/apps/web/src/routes/styleguide/Spacing.jsx`
- `/apps/web/src/routes/styleguide/Components.jsx`
- `/apps/web/src/routes/styleguide/Logo.jsx`
- `/apps/web/src/routes/styleguide/Introduction.jsx`
- `/apps/web/src/routes/styleguide/Colors.jsx`
- `/apps/web/src/components/sections/work/WorkHeroSection.jsx`
- `/apps/web/src/components/sections/work/ProjectsList.jsx`
- `/apps/web/src/components/sections/work/ProjectsGrid.jsx`
- `/apps/web/src/components/sections/work/ProjectDial.jsx`
- `/apps/web/src/components/sections/work-detail/DetailHero.jsx`
- `/apps/web/src/components/sections/work-detail/ProjectText.jsx`
- `/apps/web/src/components/sections/blog/ArticleCardHero.jsx`
- `/apps/web/src/components/sections/home/HeroSection.jsx`
- `/apps/web/src/components/sections/home/WorkCard.jsx`
- `/apps/web/src/components/sections/cta/CtaWork.jsx`
- `/apps/web/src/components/sections/cta/CtaHome.jsx`
- `/apps/web/src/components/sections/stack-detail/StackHero.jsx`
- `/apps/web/src/components/sections/stack-detail/RichTextStack.jsx`
- `/apps/web/src/data/styleguide/typeAudit.js`

#### Packages (Shared)
- `/packages/ui/src/atoms/SectionTitle.jsx`

**Update method:**
- Use global find/replace with `Edit` tool's `replace_all` flag
- Order of operations:
  1. `kol-h1` → `kol-heading-xl`
  2. `kol-h2` → `kol-heading-lg`
  3. `kol-h3` → `kol-heading-md`
  4. `kol-h4` → `kol-heading-sm`
  5. `kol-body` → `kol-text` (careful: excludes `kol-body-sm`, `kol-mono-body`)
  6. `kol-body-sm` → `kol-text-sm`
  7. `kol-mono-body` → `kol-mono-text`
  8. `kol-mono` → `kol-mono-xs` (excludes `kol-mono-body`, `kol-mono-text`)

### Phase 4: Testing (30 minutes)

**Visual QA:**
1. Start dev server: `yarn dev:web`
2. Navigate to `/styleguide/typography` - Verify all 11 classes render correctly
3. Test responsive breakpoints at 375px (mobile), 768px (tablet), 1024px (desktop)
4. Verify **all preview flags removed** (all text at 100% opacity)
5. Check all affected routes:
   - `/` (home)
   - `/work` (work list)
   - `/work/:slug` (project detail)
   - `/styleguide/*` (all styleguide pages)

**Build test:**
```bash
yarn build
# Should complete with no errors
```

### Phase 5: Legacy Cleanup (Optional - After Testing)

**After migration verified (1-2 weeks):**
1. Remove legacy aliases from `components.css`
2. Remove `@apply` directives
3. Update documentation references
4. Search for any remaining old class names: `git grep "kol-h[1-4]"`

---

## Impact Analysis

### Files Changed
- **CSS:** 1 file (`packages/ui/css/components.css`)
- **Data:** 1 file (`apps/web/src/data/styleguide/tokens.js`)
- **Components:** 24 files (51 occurrences)
- **Documentation:** 2 files (this proposal + `DECISIONS.md`)

### Breaking Changes
- **None initially** - Legacy aliases provide backward compatibility
- **After cleanup phase** - Old class names will be removed

### Performance Impact
- **Positive:** Responsive breakpoints improve mobile performance (smaller font sizes)
- **Neutral:** CSS file size increase minimal (~2KB for media queries)
- **Positive:** Remove preview flags improves styleguide performance (less opacity calculations)

### Accessibility Impact
- **Positive:** Separates visual styling from semantic HTML structure
- **Positive:** Mobile-first responsive sizing improves readability on small devices
- **Positive:** Consistent naming reduces developer confusion

---

## Benefits

### Developer Experience
1. **Clarity:** No confusion between CSS classes and HTML elements
2. **Flexibility:** Any heading level can use any visual style
3. **Consistency:** All classes follow same naming pattern
4. **Documentation:** Size-based names are self-documenting

### Design System
1. **Scalability:** Easy to add new sizes (e.g., `kol-heading-xs`)
2. **Maintainability:** Clear hierarchy and purpose
3. **Responsive:** All classes adapt to viewport size
4. **Complete:** No more "preview" breakpoints in styleguide

### User Experience
1. **Mobile optimization:** Appropriate text sizes for small screens
2. **Desktop enhancement:** Larger, impactful typography on large screens
3. **Fluid scaling:** Smooth transitions between breakpoints
4. **Performance:** Optimized font sizes reduce layout shifts

---

## Alternatives Considered

### Alternative 1: Keep Current Names, Add Breakpoints Only
**Rejected:** Doesn't solve semantic confusion and inconsistent naming

### Alternative 2: Use Tailwind Classes Instead
**Rejected:** Loses design system control and brand-specific styling

### Alternative 3: Number-Based Naming (kol-heading-1, kol-heading-2)
**Rejected:** Still implies hierarchy similar to HTML elements

---

## Success Criteria

- [ ] All 11 typography classes renamed following semantic pattern
- [ ] All 33 breakpoints implemented in CSS (27 new breakpoints added)
- [ ] Zero preview flags in styleguide tokens.js
- [ ] All 51 component occurrences updated
- [ ] Styleguide renders correctly at mobile/tablet/desktop breakpoints
- [ ] Production build completes successfully
- [ ] No visual regressions on live routes

---

## Timeline

**Total estimated time:** 2.5 - 3 hours

| Phase | Duration | Checkpoint |
|-------|----------|------------|
| Preparation | 30 min | Branch created, docs updated |
| CSS Implementation | 45 min | components.css updated, builds pass |
| Component Updates | 60 min | All 24 files updated |
| Testing | 30 min | Visual QA complete, no regressions |
| Cleanup (optional) | Future | Legacy aliases removed |

---

## Open Questions

1. Should we update the styleguide labels to match new class names? (e.g., "H1" → "Heading XL")
2. Do we want to add intermediate breakpoints (e.g., `sm` at 640px)?
3. Should `kol-body` → `kol-text` or `kol-body-base` to maintain "body" terminology?
4. Timeline for removing legacy aliases after migration?

---

## Approval Checklist

- [ ] Naming scheme approved
- [ ] Breakpoint strategy approved
- [ ] Migration timeline approved
- [ ] Testing criteria approved
- [ ] Ready to implement

---

**Next Steps:**
1. Review this proposal
2. Approve/adjust naming scheme
3. Approve/adjust breakpoint implementation
4. Begin Phase 1 when ready
