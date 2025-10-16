# Session Log: Responsive Tags & Pills Implementation
**Date**: 2025-10-14 03:00
**Agent**: Claude Sonnet 4.5
**Session Type**: Feature implementation - Responsive tag/pill sizing and new variants

## Context
Continued from responsive buttons & typography session. User wanted to implement responsive sizing for tags and pills, following the same pattern used for buttons. Also added new variants for better component flexibility.

## Work Completed

### 1. Created TagStatesPreview Component
**File**: `apps/web/src/components/styleguide/molecules/TagStatesPreview.jsx`

Created new preview component to demonstrate responsive tag/pill sizing:
- Two sections: Tags (Interactive) and Pills (Non-Interactive)
- Shows all variants with 3 breakpoints (Mobile/Tablet/Desktop)
- Both primary and inverse surface contexts
- Uses inline style overrides to show all breakpoints simultaneously

### 2. Integrated TagStatesPreview into Styleguide
**File**: `apps/web/src/routes/styleguide/ComponentsAtoms.jsx`

- Imported TagStatesPreview component
- Added `customPreview: true` to tags-pills section
- Added conditional rendering for tags-pills custom preview

### 3. Implemented Responsive Tag Sizing
**File**: `packages/ui/css/components.css`

Updated `.tag-control` class with responsive sizing (lines 856-894):

**Before:**
- Fixed size: `12px` font, `4px 24px` padding

**After:**
- **Mobile**: `10px` font, `4px 16px` padding
- **Tablet** (≥768px): `11px` font, `4px 20px` padding
- **Desktop** (≥1024px): `12px` font, `4px 24px` padding (matches current size)

Properties maintained:
- Border: `1px solid var(--component-border)`
- Background: `var(--component-surface)`
- Hover states with inverted colors

### 4. Implemented Responsive Pill Sizing
**File**: `packages/ui/css/components.css`

Updated two pill classes with responsive sizing:

**`.pill-inverse`** (lines 465-491):
- Mobile: `10px` font, `4px 16px` padding
- Tablet: `11px` font, `4px 20px` padding
- Desktop: `12px` font, `4px 24px` padding
- Background: `var(--component-fg)` (inverted colors)
- No border

**`.pill-subtle`** (lines 493-518):
- Mobile: `10px` font, `4px 16px` padding
- Tablet: `11px` font, `4px 20px` padding
- Desktop: `12px` font, `4px 24px` padding
- Background: `var(--component-surface-muted)` (muted/subtle)
- No border

### 5. Created New pill-outline Variant
**File**: `packages/ui/css/components.css` (lines 520-546)

Added new non-interactive pill variant with outline styling:
- Responsive sizing (10px → 12px, 4px 16px → 4px 24px)
- Background: `var(--component-surface)`
- Border: `1px solid var(--component-border)`
- No hover states (non-interactive)
- Similar appearance to `tag-control` but without interactivity

**Use case:** Non-interactive labels that need outlined appearance

### 6. Updated Foundry HeroSection
**File**: `apps/web/src/components/sections/foundry/HeroSection.jsx`

Changed tag implementation from interactive Tag component to non-interactive pill:
- Removed `Tag` import from `@kol/ui`
- Changed from `<Tag>{tag}</Tag>` to `<span className="pill-outline">{tag}</span>`
- Makes semantic sense: foundry hero tag is informational, not interactive

### 7. Created tag-control-inverse Variant
**File**: `packages/ui/css/components.css` (lines 896-933)

Added new interactive tag variant with inverse styling:

**Default state:**
- Background: `var(--component-fg)` (dark)
- Color: `var(--component-surface)` (light)
- Border: `1px solid transparent` (invisible but maintains size)

**Hover/Active state:**
- Background: `var(--component-surface)` (light)
- Color: `var(--component-fg)` (dark)
- Border: `1px solid var(--component-border)` (visible)

**Key design decision:** Uses transparent border in default state instead of `border: none` to prevent size shift on hover. This ensures consistent dimensions between default and hover states.

**Transitions:** Explicitly set to `transition: none` on all states to disable animations (per user requirement)

### 8. Updated TagStatesPreview with New Variants
**File**: `apps/web/src/components/styleguide/molecules/TagStatesPreview.jsx`

Updated preview to show all variants:

**Tags (Interactive) Section:**
- Tag Control (both surfaces)
- Tag Control Inverse (both surfaces)

**Pills (Non-Interactive) Section:**
- Pill Inverse (both surfaces)
- Pill Outline (both surfaces)
- Pill Subtle (both surfaces)

All variants shown at all 3 breakpoints on both primary and inverse surfaces.

## Technical Details

### Design Patterns Established

**Interactive vs Non-Interactive:**
- **Tags** (`tag-control`, `tag-control-inverse`): Interactive with hover states
- **Pills** (`pill-inverse`, `pill-subtle`, `pill-outline`): Non-interactive, no hover states

**Naming Convention:**
- `tag-*` = interactive
- `pill-*` = non-interactive
- `-inverse` = inverted color scheme (dark bg by default)
- `-outline` = bordered/outlined appearance
- `-subtle` = muted background

### Border Size Consistency Pattern

Important pattern established: When borders appear/disappear on hover, use transparent border in default state:

```css
/* Wrong - causes size shift */
.element {
  border: none;
}
.element:hover {
  border: 1px solid color;
}

/* Correct - maintains size */
.element {
  border: 1px solid transparent;
}
.element:hover {
  border: 1px solid color;
}
```

This prevents layout shift and maintains consistent hit targets.

### Responsive Sizing Strategy

All tags and pills follow the same responsive pattern:
- **Mobile**: Smallest (10px font, 4px 16px padding)
- **Tablet**: Medium (11px font, 4px 20px padding)
- **Desktop**: Largest (12px font, 4px 24px padding)

This scaling is more subtle than buttons because tags/pills are more compact UI elements.

### Component Token Adaptation

All variants use `--component-*` tokens:
- Automatically adapt to surface context (primary vs inverse)
- When placed inside `.surface-inverse`, component tokens remap
- No manual color overrides needed in markup

## Files Modified Summary

1. **Created**: `apps/web/src/components/styleguide/molecules/TagStatesPreview.jsx`
   - New preview component for tags/pills responsive sizing

2. `apps/web/src/routes/styleguide/ComponentsAtoms.jsx`
   - Added TagStatesPreview import and custom preview integration

3. `packages/ui/css/components.css`
   - Updated `.tag-control` with responsive sizing (lines 856-894)
   - Updated `.pill-inverse` with responsive sizing (lines 465-491)
   - Updated `.pill-subtle` with responsive sizing (lines 493-518)
   - Added `.pill-outline` variant (lines 520-546)
   - Added `.tag-control-inverse` variant (lines 896-933)

4. `apps/web/src/components/sections/foundry/HeroSection.jsx`
   - Changed from Tag component to pill-outline class
   - Removed Tag import

## Design Decisions

### Decision 1: Separate Tag and Pill Classes
**Decision**: Keep tags and pills as separate class hierarchies
**Reasoning**:
- Clear semantic distinction (interactive vs non-interactive)
- Easier to understand and maintain
- Prevents accidental hover states on non-interactive elements
- Naming makes intent explicit

### Decision 2: Transparent Border Pattern
**Decision**: Use `border: 1px solid transparent` instead of `border: none`
**Reasoning**:
- Prevents layout shift on hover
- Maintains consistent element dimensions
- Better user experience (no jumping/shifting)
- Consistent hit target for interactive elements

### Decision 3: No Transitions on tag-control-inverse
**Decision**: Explicitly disable all transitions with `transition: none`
**Reasoning**:
- User requirement: no animations
- Matches desired instant state change behavior
- Explicit override prevents inheritance issues
- Applied to default, hover, and active states

### Decision 4: pill-outline for Foundry Hero
**Decision**: Use non-interactive pill-outline instead of interactive Tag
**Reasoning**:
- Hero tag is informational, not interactive
- No click behavior needed
- Semantic: pills are for display, tags are for interaction
- Cleaner markup (no unused component props)

### Decision 5: Same Responsive Scale for All
**Decision**: Use identical responsive sizing for all tag/pill variants
**Reasoning**:
- Visual consistency across variants
- Predictable behavior
- Easier to maintain and document
- Follows established button pattern

## Current Component Inventory

### Tags (Interactive)
1. **tag-control** - Light background, border, inverts on hover
2. **tag-control-inverse** - Dark background, border appears on hover

### Pills (Non-Interactive)
1. **pill-inverse** - Dark background, no border
2. **pill-subtle** - Muted background, no border
3. **pill-outline** - Light background, border

### Legacy (Deprecated - Not Updated)
- `.tag` - Old semibold uppercase tag (12px fixed)
- `.tag-secondary` - Old secondary tag (12px fixed)
- `.tag-accent` - Old accent tag (12px fixed)
- `.tag-red` - Old danger tag (12px fixed)

Note: Legacy tags still in codebase but not updated with responsive sizing. Should be migrated to new tag-control/pill classes.

## Build Status
✅ Dev server running successfully
✅ All tag/pill variants responsive across breakpoints
✅ Tags properly show hover states
✅ Pills non-interactive as expected
✅ Foundry hero using pill-outline correctly
✅ No layout shift on hover for tag-control-inverse
✅ All variants adapt to inverse surfaces
✅ Styleguide showing all variants with all breakpoints

## Testing Recommendations
1. Test tags/pills on mobile devices (should be smaller)
2. Test tags/pills on tablet (should be medium)
3. Test tags/pills on desktop (should match previous size)
4. Verify tag-control hover behavior (smooth, no shift)
5. Verify tag-control-inverse hover behavior (instant, no shift)
6. Verify pills have no hover effects
7. Check foundry hero tag displays correctly
8. Verify all variants work on inverse surfaces
9. Check styleguide preview shows all breakpoints correctly

## Next Steps
Consider migrating components using legacy `.tag`, `.tag-secondary`, etc. to new responsive tag-control or pill classes. This would require:
1. Audit all usages of legacy tag classes
2. Determine if each should be tag-control (interactive) or pill (non-interactive)
3. Update markup to use new classes
4. Remove legacy tag classes after migration

## References
- Previous session: `2025-10-14-0200-responsive-buttons-typography.md`
- Tag/Pill classes: `packages/ui/css/components.css` (lines 465-546, 856-933)
- Styleguide preview: `apps/web/src/components/styleguide/molecules/TagStatesPreview.jsx`
- Typography system: `packages/ui/css/components.css` (lines 255-293)
- Surface utility classes: `packages/ui/css/utilities.css` (lines 14-31)
