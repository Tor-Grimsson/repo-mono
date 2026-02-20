# Specimen Components

Components specific to specimen pages.

## GridOverlay

**Location:** `apps/web/src/components/specimens/GridOverlay.jsx`

**Purpose:** Toggleable grid system for specimens

**Features:**
- Column grid (12 columns, configurable)
- Baseline grid (24px major, 8px subdivisions)
- 3-state toggle (both, columns, hidden)
- Absolute positioning

**Props:**
```javascript
{
  columns: number,          // default: 12
  gutter: number,           // default: 24
  marginX: number,          // default: 48
  columnWidth: number,      // default: 108
  baselineGrid: number,     // default: 24
  children: ReactNode
}
```

**Usage:**
```jsx
<GridOverlay columns={12} gutter={24} marginX={180} columnWidth={86}>
  <SpecimenContent />
</GridOverlay>
```

## GridToggle

**Location:** `apps/web/src/components/specimens/GridToggle.jsx`

**Purpose:** Toggle button for grid visibility

**Features:**
- Icon-based button (2×2 grid icon)
- Fixed position (bottom-right)
- 3 states with visual feedback

**Props:**
```javascript
{
  gridMode: 'both' | 'columns' | 'none',
  onToggle: (mode) => void
}
```

## Card Pattern

**Used in:** GullhamrarSelection, DylgjurSelection, Rest selections

**Example:**
```jsx
// Individual card component
export default function TitlePageCard({ columns, gutter, marginX }) {
  return (
    <section className="w-full min-h-screen"
             style={{ paddingLeft: `${marginX}px`, paddingRight: `${marginX}px` }}>
      <div className="grid" style={{
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gap: `${gutter}px`
      }}>
        {/* Card content */}
      </div>
    </section>
  )
}
```

## Floating Navigation

**Pattern** (Málrómur):

```jsx
<div id="floating-nav" className="fixed top-24 z-[9999]">
  <div className="sticky rounded p-6">
    <div className="sticky inset-0 bg-fg-04 backdrop-blur-sm" />
    <div className="sticky flex flex-col gap-4">
      {sections.map(section => (
        <button
          onClick={() => scrollToSection(section.id)}
          className={activeSection === section.id ? 'active' : ''}
        >
          {section.label}
        </button>
      ))}
    </div>
  </div>
</div>
```

**Features:**
- Fixed positioning with nested sticky
- Auto-hide after 10 seconds
- Active section tracking
- Smooth scroll behavior
- Constrained to parent component

## Common Patterns

**Section with ID:**
```jsx
<div id="editorial">
  <MalromurEditorial />
</div>
```

**Grid-aligned section:**
```jsx
<section style={{
  paddingLeft: '180px',
  paddingRight: '180px',
  paddingTop: '96px',
  paddingBottom: '96px'
}}>
  <div className="grid" style={{
    gridTemplateColumns: 'repeat(12, 86px)',
    gap: '24px'
  }}>
    <div className="col-span-7">Content</div>
    <div className="col-span-5">Sidebar</div>
  </div>
</section>
```
