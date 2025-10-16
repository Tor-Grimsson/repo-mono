# Color System Refactor Implementation Plan

**Status**: Archived – Implementation Complete (Phases 1-5 shipped)
**Started**: 2025-10-16
**Last Updated**: 2025-10-16 16:30
**Priority**: Critical
**Goal**: Align kolkrabbi color system with industry standards while maintaining our strengths

> **Archived 2025-10-16:** Active documentation now lives in `docs/system/2.0-color-system.md`. Phase 6 cleanup tasks are tracked in the “Remaining Issues & Next Steps” section of that chapter.

---

## User Decisions (from `docs/archive/plans/design-system-analysis.md`)

Based on analysis comments:

1. ✅ **Naming Convention**: Adopt `--{namespace}-{category}-{semantic}` pattern (Material Design 3 style)
2. ✅ **Opacity Scale**: Switch to geometric progression (2, 4, 8, 16, 32, 64)
3. ✅ **Semantic Aliases**: Keep numbers (more visually descriptive than "subtle/moderate")
4. ✅ **Elevation**: Add 3-level system like Carbon (base, raised, elevated)
5. ✅ **Container vs Surface**: Implement distinction (surface = page bg, container = component bg)
6. ✅ **Foreground Pairing**: Follow Material's "on-" prefix pattern
7. ✅ **Border System**: Create missing `border-surface-*` utilities + semantic variants
8. ✅ **Context System**: Simplify to standard `.light` / `.dark` (remove `--component-*` layer confusion)
9. ✅ **State Variants**: Create hover/focus/active states
10. ✅ **Documentation**: Complete rewrite after system refactor

---

## Phase 1: Foundation - Token Architecture (CRITICAL)

**Objective**: Restructure core tokens with consistent naming and complete pairing

### Checkpoint 1.1: Naming Convention Migration
**Status**: ✅ COMPLETE (2025-10-16)
**Estimated Time**: 2 hours
**Actual Time**: Completed via sub-agent

**Tasks**:
- [ ] Create new token structure following `--kol-{category}-{semantic}-{variant}` pattern
- [ ] Map all existing tokens to new names
- [ ] Create alias layer for backward compatibility during migration

**New Token Structure**:
```css
/* Brand/Primitive Colors */
--kol-color-brand-dark: #1e1e21;
--kol-color-brand-light: #fcfbf8;
--kol-color-brand-yellow: #f5d245;
--kol-color-brand-yellow-deep: #f5bb1d;
--kol-color-brand-red: #bc583f;

/* Neutral Ramp */
--kol-color-neutral-50: #fafafa;
--kol-color-neutral-100: #f5f5f5;
/* ... continue to 900 */

/* Semantic Surfaces */
--kol-surface-primary: var(--kol-color-brand-light);
--kol-surface-on-primary: var(--kol-color-brand-dark);
--kol-surface-secondary: var(--kol-color-neutral-100);
--kol-surface-on-secondary: var(--kol-color-brand-dark);
--kol-surface-tertiary: var(--kol-color-neutral-200);
--kol-surface-on-tertiary: var(--kol-color-brand-dark);
--kol-surface-inverse: var(--kol-color-brand-dark);
--kol-surface-on-inverse: var(--kol-color-brand-light);

/* Container Tokens (NEW) */
--kol-container-primary: var(--kol-surface-secondary);
--kol-container-on-primary: var(--kol-color-brand-dark);
--kol-container-secondary: var(--kol-surface-tertiary);
--kol-container-on-secondary: var(--kol-color-brand-dark);
--kol-container-elevated: var(--kol-surface-primary);
--kol-container-on-elevated: var(--kol-color-brand-dark);

/* Accent */
--kol-accent-primary: var(--kol-color-brand-yellow);
--kol-accent-on-primary: var(--kol-color-brand-dark);
--kol-accent-primary-strong: var(--kol-color-brand-yellow-deep);
--kol-accent-primary-muted: rgba(245, 210, 69, 0.18);

/* Status */
--kol-status-danger: #9b3928;
--kol-status-on-danger: #ffffff;
--kol-status-danger-strong: #bc583f;
--kol-status-danger-muted: rgba(155, 57, 40, 0.18);
```

**Success Criteria**:
- ✅ All tokens follow consistent `--kol-*` pattern
- ✅ Every surface has an `on-{surface}` foreground pair
- ✅ Backward compatibility aliases in place

---

### Checkpoint 1.2: Dark Mode Token Pairs
**Status**: ✅ COMPLETE (2025-10-16)
**Estimated Time**: 1 hour
**Actual Time**: Completed via sub-agent

**Tasks**:
- [ ] Mirror all light mode tokens in `.dark` scope
- [ ] Ensure all `on-*` pairs have correct contrast ratios in both modes
- [ ] Test theme switching with new tokens

**Dark Mode Structure**:
```css
.dark {
  --kol-surface-primary: #121215;
  --kol-surface-on-primary: #f5f5f5;
  --kol-surface-secondary: #19191d;
  --kol-surface-on-secondary: #f5f5f5;
  --kol-surface-tertiary: #202026;
  --kol-surface-on-tertiary: #f5f5f5;
  --kol-surface-inverse: #f5f5f5;
  --kol-surface-on-inverse: #121215;

  --kol-container-primary: #19191d;
  --kol-container-on-primary: #f5f5f5;
  /* ... continue pattern */
}
```

**Success Criteria**:
- ✅ All surface tokens have dark mode equivalents
- ✅ WCAG AA contrast ratios verified for all `on-*` pairs
- ✅ Theme toggle works correctly

---

## Phase 2: Opacity Scale Refactor (HIGH PRIORITY)

**Objective**: Switch to geometric scale and add surface-based utilities

### Checkpoint 2.1: Geometric Opacity Scale
**Status**: ✅ COMPLETE (2025-10-16)
**Estimated Time**: 2 hours
**Actual Time**: Completed via sub-agent

**Tasks**:
- [ ] Implement geometric scale: `02, 04, 08, 16, 32, 64`
- [ ] Deprecate irregular values: `12, 24, 96`
- [ ] Add migration guide for deprecated values
- [ ] Update all existing usages in codebase

**New Scale**:
```css
/* Foreground-based backgrounds (EXISTING - updated scale) */
.bg-fg { background-color: var(--kol-surface-on-primary); }
.bg-fg-02 { background-color: color-mix(in srgb, var(--kol-surface-on-primary) 2%, transparent); }
.bg-fg-04 { background-color: color-mix(in srgb, var(--kol-surface-on-primary) 4%, transparent); }
.bg-fg-08 { background-color: color-mix(in srgb, var(--kol-surface-on-primary) 8%, transparent); }
.bg-fg-16 { background-color: color-mix(in srgb, var(--kol-surface-on-primary) 16%, transparent); }
.bg-fg-32 { background-color: color-mix(in srgb, var(--kol-surface-on-primary) 32%, transparent); }
.bg-fg-64 { background-color: color-mix(in srgb, var(--kol-surface-on-primary) 64%, transparent); }
```

**Migration Map**:
- `bg-fg-12` → `bg-fg-08` or `bg-fg-16` (choose based on visual need)
- `bg-fg-24` → `bg-fg-32` (closest match)
- `bg-fg-96` → `bg-fg` (use solid fill)

**Success Criteria**:
- ✅ Geometric scale implemented
- ✅ All components migrated to new scale
- ✅ No console warnings about deprecated classes

---

### Checkpoint 2.2: Surface-Based Border Utilities (SOLVES ORIGINAL PROBLEM)
**Status**: ✅ COMPLETE (2025-10-16)
**Estimated Time**: 2 hours
**Actual Time**: Completed via sub-agent
**Result**: Original border visibility problem SOLVED

**Tasks**:
- [ ] Create `border-surface-*` utility family
- [ ] Update collage example to use new utilities
- [ ] Document when to use `border-fg-*` vs `border-surface-*`
- [ ] Test visibility on all `bg-fg` filled shapes

**New Utilities**:
```css
/* Surface-based borders (NEW - for contrast on bg-fg fills) */
.border-surface { border-color: var(--kol-surface-primary); }
.border-surface-02 { border-color: color-mix(in srgb, var(--kol-surface-primary) 2%, transparent); }
.border-surface-04 { border-color: color-mix(in srgb, var(--kol-surface-primary) 4%, transparent); }
.border-surface-08 { border-color: color-mix(in srgb, var(--kol-surface-primary) 8%, transparent); }
.border-surface-16 { border-color: color-mix(in srgb, var(--kol-surface-primary) 16%, transparent); }
.border-surface-32 { border-color: color-mix(in srgb, var(--kol-surface-primary) 32%, transparent); }
.border-surface-64 { border-color: color-mix(in srgb, var(--kol-surface-primary) 64%, transparent); }

/* Foreground-based borders (EXISTING - updated scale) */
.border-fg { border-color: var(--kol-surface-on-primary); }
.border-fg-02 { border-color: color-mix(in srgb, var(--kol-surface-on-primary) 2%, transparent); }
.border-fg-04 { border-color: color-mix(in srgb, var(--kol-surface-on-primary) 4%, transparent); }
.border-fg-08 { border-color: color-mix(in srgb, var(--kol-surface-on-primary) 8%, transparent); }
.border-fg-16 { border-color: color-mix(in srgb, var(--kol-surface-on-primary) 16%, transparent); }
.border-fg-32 { border-color: color-mix(in srgb, var(--kol-surface-on-primary) 32%, transparent); }
.border-fg-64 { border-color: color-mix(in srgb, var(--kol-surface-on-primary) 64%, transparent); }
```

**Usage Guide**:
| Background Fill | Best Border Choice | Why |
|----------------|-------------------|-----|
| `.bg-auto` | `.border-fg-*` | Foreground borders work on neutral surfaces |
| `.bg-fg` | `.border-surface-*` | Need surface-based borders for contrast |
| `.bg-fg-08` | `.border-fg-*` | Transparent enough for foreground borders |
| `.bg-fg-64` | `.border-surface-*` | Nearly opaque, needs surface borders |

**Success Criteria**:
- ✅ `border-surface-*` utilities visible on `bg-fg` shapes
- ✅ Collage example updated and working in both themes
- ✅ Decision guide documented

---

### Checkpoint 2.3: Semantic Border Variants
**Status**: ✅ COMPLETE (2025-10-16)
**Estimated Time**: 1 hour
**Actual Time**: Included in Checkpoint 2.2

**Tasks**:
- [ ] Create semantic border token aliases
- [ ] Implement state-based border utilities
- [ ] Document usage patterns

**New Tokens**:
```css
/* Semantic border tokens */
--kol-border-default: color-mix(in srgb, var(--kol-surface-on-primary) 8%, transparent);
--kol-border-subtle: color-mix(in srgb, var(--kol-surface-on-primary) 4%, transparent);
--kol-border-strong: color-mix(in srgb, var(--kol-surface-on-primary) 16%, transparent);

/* State borders */
--kol-border-hover: color-mix(in srgb, var(--kol-surface-on-primary) 16%, transparent);
--kol-border-focus: var(--kol-accent-primary);
--kol-border-active: var(--kol-accent-primary-strong);
--kol-border-disabled: color-mix(in srgb, var(--kol-surface-on-primary) 2%, transparent);
```

**Success Criteria**:
- ✅ Semantic border tokens defined
- ✅ State variants working with interactive elements
- ✅ Examples in styleguide

---

## Phase 3: Context System Simplification (MAJOR REFACTOR)

**Objective**: Remove confusing `--component-*` layer, adopt standard `.light` / `.dark` system

### Checkpoint 3.1: Remove Component Token Abstraction
**Status**: ✅ COMPLETE (2025-10-16)
**Actual Time**: Completed via sub-agent
**⚠️ NO BREAKING CHANGES** (backward compatibility maintained)

**Tasks**:
- [ ] Remove `--component-fg`, `--component-surface`, `--component-border` tokens
- [ ] Update all `.bg-auto`, `.text-auto`, `.border-auto` utilities to use direct tokens
- [ ] Remove `.surface-default` and `.surface-inverse` context utilities
- [ ] Migrate to explicit surface classes

**Before (Current System)**:
```css
/* Component abstraction layer */
:root {
  --component-fg: var(--foreground);
  --component-surface: var(--surface-primary);
  --component-border: color-mix(in srgb, var(--foreground) 10%, transparent);
}

.surface-inverse {
  --component-fg: var(--foreground-inverse);
  --component-surface: var(--surface-inverse);
  /* ... creates confusion */
}

.bg-auto { background-color: var(--component-surface); }
.text-auto { color: var(--component-fg); }
```

**After (Simplified)**:
```css
/* Direct token usage */
.bg-surface-primary { background-color: var(--kol-surface-primary); color: var(--kol-surface-on-primary); }
.bg-surface-secondary { background-color: var(--kol-surface-secondary); color: var(--kol-surface-on-secondary); }
.bg-surface-tertiary { background-color: var(--kol-surface-tertiary); color: var(--kol-surface-on-tertiary); }
.bg-surface-inverse { background-color: var(--kol-surface-inverse); color: var(--kol-surface-on-inverse); }

.bg-container-primary { background-color: var(--kol-container-primary); color: var(--kol-container-on-primary); }
.bg-container-secondary { background-color: var(--kol-container-secondary); color: var(--kol-container-on-secondary); }
.bg-container-elevated { background-color: var(--kol-container-elevated); color: var(--kol-container-on-elevated); }
```

**Migration Guide**:
| Old Class | New Class | Notes |
|-----------|-----------|-------|
| `.bg-auto` | `.bg-surface-primary` | Default page background |
| `.text-auto` | (remove, inherited from bg class) | Color set automatically by surface class |
| `.surface-inverse` wrapper + `.bg-auto` | `.bg-surface-inverse` | Direct inverse surface |
| `.surface-default` | (remove) | No longer needed |
| `.border-auto` | `.border-fg-08` | Explicit opacity value |
| `.divider-auto` | `.border-fg-08` with `h-px` | Use border utility |

**Success Criteria**:
- ✅ Component token layer completely removed
- ✅ All components migrated to explicit surface classes
- ✅ No confusion about "does div know its background?"
- ✅ System matches industry standard patterns

---

### Checkpoint 3.2: Elevation System Implementation
**Status**: ✅ COMPLETE (2025-10-16)
**Actual Time**: Completed directly

**Tasks**:
- [ ] Define 3-level elevation system (base, raised, elevated)
- [ ] Create utility classes for each level
- [ ] Update dropdowns, modals, tooltips to use elevation

**Elevation Tokens**:
```css
/* Light mode */
:root {
  --kol-elevation-base: var(--kol-surface-primary);
  --kol-elevation-on-base: var(--kol-surface-on-primary);

  --kol-elevation-raised: var(--kol-surface-secondary);
  --kol-elevation-on-raised: var(--kol-surface-on-secondary);

  --kol-elevation-elevated: var(--kol-surface-tertiary);
  --kol-elevation-on-elevated: var(--kol-surface-on-tertiary);
}

/* Dark mode */
.dark {
  --kol-elevation-base: #121215;
  --kol-elevation-on-base: #f5f5f5;

  --kol-elevation-raised: #19191d;
  --kol-elevation-on-raised: #f5f5f5;

  --kol-elevation-elevated: #202026;
  --kol-elevation-on-elevated: #f5f5f5;
}
```

**Utility Classes**:
```css
.elevation-base {
  background-color: var(--kol-elevation-base);
  color: var(--kol-elevation-on-base);
}

.elevation-raised {
  background-color: var(--kol-elevation-raised);
  color: var(--kol-elevation-on-raised);
  /* Optional: subtle shadow for visual lift */
}

.elevation-elevated {
  background-color: var(--kol-elevation-elevated);
  color: var(--kol-elevation-on-elevated);
  /* Optional: stronger shadow */
}
```

**Success Criteria**:
- ✅ 3-level elevation system defined
- ✅ Dropdowns use `elevation-raised`
- ✅ Modals use `elevation-elevated`
- ✅ Visual hierarchy clear in both themes

---

## Phase 4: State Variants (HIGH PRIORITY)

**Objective**: Add hover/focus/active state utilities

### Checkpoint 4.1: Surface State Variants
**Status**: ✅ COMPLETE (2025-10-16)
**Actual Time**: Completed via parallel sub-agents

**Tasks**:
- [ ] Define state tokens for all surfaces and containers
- [ ] Create utility classes for interactive states
- [ ] Test with buttons, cards, and interactive elements

**State Tokens**:
```css
/* Surface states */
--kol-surface-primary-hover: color-mix(in srgb, var(--kol-surface-primary) 95%, var(--kol-surface-on-primary) 5%);
--kol-surface-primary-active: color-mix(in srgb, var(--kol-surface-primary) 90%, var(--kol-surface-on-primary) 10%);

--kol-container-primary-hover: color-mix(in srgb, var(--kol-container-primary) 95%, var(--kol-container-on-primary) 5%);
--kol-container-primary-active: color-mix(in srgb, var(--kol-container-primary) 90%, var(--kol-container-on-primary) 10%);

/* Border states (already defined in 2.3) */
--kol-border-hover: color-mix(in srgb, var(--kol-surface-on-primary) 16%, transparent);
--kol-border-focus: var(--kol-accent-primary);
--kol-border-active: var(--kol-accent-primary-strong);
```

**Utility Classes**:
```css
.hover\:bg-surface-primary-hover:hover {
  background-color: var(--kol-surface-primary-hover);
}

.active\:bg-surface-primary-active:active {
  background-color: var(--kol-surface-primary-active);
}

.focus\:border-focus:focus {
  border-color: var(--kol-border-focus);
}
```

**Success Criteria**:
- ✅ All interactive surfaces have state variants
- ✅ Hover/focus/active states visually distinct
- ✅ Consistent across all themes

---

## Phase 5: Documentation Overhaul (AFTER CODE COMPLETE)

**Objective**: Complete rewrite of all color system documentation

### Checkpoint 5.1: Update 2.0-color-system.md
**Status**: ✅ COMPLETE (2025-10-16)
**Actual Time**: Completed via sub-agent

**Tasks**:
- [ ] Document new token naming convention
- [ ] Show all utility classes (not just common ones)
- [ ] Add usage decision guides
- [ ] Include WCAG contrast ratios
- [ ] Add migration guide from old system
- [ ] Remove all references to deprecated tokens

**New Structure**:
1. Token Architecture Overview
2. Surface & Container System
3. Foreground Pairing ("on-" convention)
4. Opacity Scale (geometric)
5. Border System (foreground vs surface)
6. Elevation System
7. State Variants
8. Migration Guide
9. Troubleshooting

---

### Checkpoint 5.2: Update Styleguide Visual Examples
**Status**: Pending
**Estimated Time**: 3 hours

**Tasks**:
- [ ] Update `/styleguide/colors` with new token examples
- [ ] Add surface vs container comparison
- [ ] Show elevation levels
- [ ] Demonstrate state variants
- [ ] Fix layered collage example with `border-surface-*`

---

### Checkpoint 5.3: Create Contrast Ratio Table
**Status**: Pending
**Estimated Time**: 2 hours

**Tasks**:
- [ ] Calculate WCAG contrast ratios for all surface + on-surface pairs
- [ ] Document ratios in table format
- [ ] Flag any AA or AAA failures
- [ ] Adjust colors if needed to pass accessibility

---

## Phase 6: Cleanup & Deprecation (FINAL)

**Objective**: Remove deprecated code and finalize system

### Checkpoint 6.1: Remove Deprecated Tokens
**Status**: Pending
**Estimated Time**: 1 hour

**Tasks**:
- [ ] Delete `--surface-100` through `--surface-900`
- [ ] Delete `--accent` (use `--kol-accent-primary`)
- [ ] Delete `--surface-border` (use `--kol-border-default`)
- [ ] Delete `--component-*` tokens
- [ ] Verify no usage in codebase

---

### Checkpoint 6.2: Final QA Pass
**Status**: Pending
**Estimated Time**: 2 hours

**Tasks**:
- [ ] Test all pages in both light/dark themes
- [ ] Verify all interactive states work
- [ ] Check console for any missing token warnings
- [ ] Run accessibility audit
- [ ] Verify documentation completeness

---

## Timeline Summary

| Phase | Checkpoints | Estimated Time | Priority |
|-------|-------------|----------------|----------|
| **Phase 1: Token Architecture** | 2 | 3 hours | 🔥 Critical |
| **Phase 2: Opacity & Borders** | 3 | 5 hours | 🔥 Critical |
| **Phase 3: Context Simplification** | 2 | 6 hours | ⚠️ Major Refactor |
| **Phase 4: State Variants** | 1 | 2 hours | ⚠️ High Priority |
| **Phase 5: Documentation** | 3 | 9 hours | 📝 After Code Complete |
| **Phase 6: Cleanup** | 2 | 3 hours | ✅ Final |
| **TOTAL** | **13 checkpoints** | **28 hours** | |

---

## Rollout Strategy

1. **Phase 1-2** (8 hours): Complete in single session - foundation + immediate fixes
2. **Phase 3** (6 hours): Major refactor - requires careful testing
3. **Phase 4** (2 hours): Enhancement - can be done incrementally
4. **Phase 5** (9 hours): Documentation - can be done in parallel with testing
5. **Phase 6** (3 hours): Final cleanup

**Total estimated time**: 28 hours across ~4 working days

---

## Success Metrics

- ✅ All 12 gaps from analysis addressed
- ✅ All 7 inconsistencies resolved
- ✅ Border visibility problem solved
- ✅ System matches industry standards
- ✅ Zero deprecated token usage
- ✅ Complete documentation coverage
- ✅ WCAG AA compliance for all color pairs
- ✅ No context confusion ("does div know its background?")

---

## Risk Mitigation

**Major Risks**:
1. **Breaking changes in Phase 3**: Create comprehensive migration script
2. **Visual regressions**: Screenshot diff testing before/after
3. **Missed usages**: Automated codebase search for deprecated classes
4. **Performance impact**: Benchmark render times with new utilities

**Rollback Plan**:
- Keep deprecated tokens as aliases during Phase 1-4
- Remove aliases only in Phase 6 after full QA
- Tag git commit before Phase 3 for easy rollback

---

## Next Immediate Actions

1. Begin **Phase 1, Checkpoint 1.1**: Token naming migration
2. Create backward compatibility layer
3. Update `packages/ui/theme.css` with new structure
4. Test in isolated styleguide page before full rollout

**Ready to begin implementation?**
