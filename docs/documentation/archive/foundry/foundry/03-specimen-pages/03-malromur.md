# Málrómur Specimens

Most comprehensive specimen collection with 11 prose patterns.

## Routes

- `/specimen/malromur` - Hub page
- `/specimen/malromur/selection` - All 11 patterns (scrolling)
- `/specimen/malromur/specs` - Technical specs
- `/specimen/malromur/{pattern}` - Individual patterns

## Structure

### MalromurSelection
**File:** `routes/specimens/malromur/routes/MalromurSelection.jsx`

```jsx
<div className="overflow-x-hidden">
  <MalromurSpecimens />
  <FeaturesCardSection />  {/* CTA outside grid */}
</div>
```

### MalromurSpecimens
**File:** `routes/specimens/malromur/comps/MalromurSpecimens.jsx`

```jsx
<div className="bg-surface-secondary">
  {/* Floating Navigation */}
  <div className="fixed top-24 z-[9999]">...</div>

  {/* Grid Overlay */}
  <GridOverlay columns={12} gutter={24} marginX={180} columnWidth={86}>
    <div id="title-page"><MalromurTitlePage /></div>
    <div id="editorial"><MalromurEditorial /></div>
    <div id="data-tables"><MalromurDataTable /></div>
    {/* ... 8 more patterns */}
  </GridOverlay>
</div>
```

## 11 Prose Patterns

1. **Title Page** - Book frontmatter
2. **Editorial** - Magazine layout with sidebar
3. **Data Tables** - Scientific observations
4. **Menu** - Restaurant design
5. **Newsletter** - Multi-column bulletin
6. **Index** - Back-of-book index
7. **Chapter** - Book chapter opening
8. **TOC** - Table of contents
9. **Scientific** - Academic paper
10. **Legislative** - Legal documents
11. **Variable Axis** - Weight variations

## Grid System

- **Columns**: 12
- **Gutter**: 24px
- **Margin X**: 180px
- **Column Width**: 86px
- **Baseline**: 8px increments (24px major)

## Floating Navigation

**Features:**
- Fixed at `top-24`
- Auto-hide after 10 seconds
- Active section tracking (center of viewport)
- Nested sticky pattern (fixed + sticky children)
- Scrolls away when specimens end

**Implementation:**
```jsx
<div id="floating-nav" className="fixed top-24 z-[9999]">
  <div className="sticky rounded p-6">
    <div className="sticky inset-0 bg-fg-04 backdrop-blur-sm" />
    <div className="sticky flex flex-col gap-4">
      {sections.map(section => (
        <button onClick={() => scrollToSection(section.id)}>
          {section.label}
        </button>
      ))}
    </div>
  </div>
</div>
```

## Variable Axis Section

**Features:**
- 46 Icelandic words
- Random distribution: 20% uppercase, 65% italic
- Full weight range (200-800)
- FitText component with canvas metrics
- Each word fills exactly 12 columns

**FitText:**
- Binary search for optimal font size
- Canvas measureText() for precise height
- Responsive to window resize
- No overflow/clipping
