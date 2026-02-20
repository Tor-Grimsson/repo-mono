# Specimen Architecture

## Purpose

Specimens demonstrate typefaces in real-world contexts - editorial layouts, poetry, data tables, etc.

## Structure

```
/specimen/{typeface}                Hub page (navigation)
/specimen/{typeface}/{pattern}      Individual specimen
```

## Hub vs Selection

**Hub Page:**
- Navigation/landing for typeface
- Links to all specimens
- Quick overview

**Selection Page:**
- Complete scrolling specimen
- Multiple patterns in sequence
- GridOverlay system

## Example: Málrómur

```
/specimen/malromur                  Hub
/specimen/malromur/selection        All 11 patterns (MalromurSelection)
/specimen/malromur/editorial        Pattern 01
/specimen/malromur/data-table       Pattern 02
... 9 more patterns
```

## GridOverlay System

**Component:** `apps/web/src/components/specimens/GridOverlay.jsx`

**Features:**
- Toggleable column grid (12 columns, 24px gutter)
- Baseline grid (24px major, 8px subdivisions)
- Grid toggle button (bottom-right)
- 3 states: both, columns only, hidden

**Usage:**
```jsx
<GridOverlay columns={12} gutter={24} marginX={180} columnWidth={86}>
  <SpecimenCard1 />
  <SpecimenCard2 />
</GridOverlay>
```

## Floating Navigation

**Pattern** (Málrómur Selection):
- Fixed position navigation
- Auto-hide after 10 seconds
- Active section tracking
- Smooth scroll to sections
- Scrolls away naturally when content ends

## File Organization

```
apps/web/src/routes/specimens/
├── malromur/
│   ├── routes/
│   │   ├── MalromurHub.jsx
│   │   ├── MalromurSelection.jsx
│   │   └── MalromurSpecs.jsx
│   ├── comps/
│   │   └── MalromurSpecimens.jsx
│   └── cards/
│       ├── MalromurEditorial.jsx
│       ├── MalromurDataTable.jsx
│       └── ... 9 more cards
├── gullhamrar/
├── dylgjur/
└── ... other typefaces
```

## Common Patterns

**Card-based:**
- Individual specimen = separate component
- Selection file imports all cards
- Easy to reorder, edit, remove

**Grid-aligned:**
- 12 columns × 86px (Málrómur)
- 24px gutter
- 180px margins
- Baseline grid for vertical rhythm
