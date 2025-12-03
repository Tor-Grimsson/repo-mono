# Grid System

## Specifications

**Málrómur Grid:**
- Columns: 12
- Gutter: 24px
- Margin X: 180px (left/right)
- Column Width: 86px
- Baseline: 24px major, 8px subdivisions

**Default Grid:**
- Columns: 12
- Gutter: 24px
- Margin X: 48px
- Column Width: 108px (auto)
- Baseline: 24px

## GridOverlay Component

**Location:** `apps/web/src/components/specimens/GridOverlay.jsx`

**Features:**
- Column grid (blue at 2% with 10% borders)
- Baseline grid (red at 10%, gray at 20%)
- Toggle button with 3 states
- Absolute positioning (constrained to parent)

**Usage:**
```jsx
<GridOverlay columns={12} gutter={24} marginX={180} columnWidth={86}>
  <SpecimenContent />
</GridOverlay>
```

## Grid Toggle

**Component:** `apps/web/src/components/specimens/GridToggle.jsx`

**States:**
1. Both (columns + baseline)
2. Columns only (default)
3. Hidden

**Position:** Fixed at `bottom-8 right-8`

## Typography Alignment

**Line heights align to 8px baseline:**
- Small text: 20px or 24px
- Body text: 24px
- Subheadings: 32px
- Headings: 56px or 72px

## Grid-Aligned Sections

**Pattern:**
```jsx
<section className="w-full min-h-screen snap-start">
  <div style={{
    paddingLeft: '180px',
    paddingRight: '180px',
    paddingTop: '96px',
    paddingBottom: '96px'
  }}>
    <div className="grid" style={{
      gridTemplateColumns: 'repeat(12, 86px)',
      gap: '24px'
    }}>
      {/* Content using col-span-* and col-start-* */}
    </div>
  </div>
</section>
```

## Current Implementation

**Grid-aligned specimens:**
- Málrómur Selection (all 11 patterns)
- Málrómur Data Tables
- Málrómur Newsletter
- Málrómur Variable Axis

**To be aligned:**
- Málrómur Editorial
- Málrómur Menu
- Málrómur Index
- Other patterns...

## Visual Grid Modes

**Both:**
- Column grid (blue)
- Baseline grid (red major, gray subdivisions)

**Columns only:**
- Column grid only
- Best for layout work

**Hidden:**
- No overlays
- Clean view for presentation
