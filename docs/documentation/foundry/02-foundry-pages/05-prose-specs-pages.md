# Prose Specifications Pages

**Routes:** `/foundry/prose-specs/{system}` (3 pages)
**Components:** Individual route files with shared patterns

## Pages

1. `/foundry/prose-specs/stack` - Stack Prose
2. `/foundry/prose-specs/documentation` - Documentation Prose
3. `/foundry/prose-specs/malromur` - Málrómur Prose

## Shared Structure

All pages follow consistent layout with standardized components.

### Sections

1. **OverviewHero** - Badge, title, description, categories
2. **Featured Image** - Full-width specimen image (440px/640px)
3. **FoundryFeatureSection** - About section with graphic
4. **ProseStylesViewer** - Visual example with variant switching
5. **Specifications Tables** - Typography specs with UnitSelector
6. **Implementation Notes** - CSS implementation details
7. **FoundryCTA** - Bottom call-to-action

## Key Components

### ProseStylesViewer
- Location: `packages/ui/src/molecules/ProseStylesViewer.jsx`
- Features: Variant switching, baseline grid toggle
- Supports controlled/uncontrolled modes

### UnitSelector
- Location: `packages/ui/src/atoms/UnitSelector.jsx`
- Toggles between px and rem units
- Used inline with table titles

## Typography Systems

### Stack Prose
- **Font:** Right Grotesk Tight + Inter Tight
- **Purpose:** Articles and blogs
- **Grid:** 8pt baseline
- **Elements:** H1-H6, body variants, quotes, lists, captions

### Documentation Prose
- **Font:** Right Grotesk
- **Purpose:** Wiki-style documentation
- **Grid:** 8pt baseline
- **Rendering:** Uses `.docs-article` CSS wrapper
- **Elements:** H1-H3, body, code blocks, captions, lists

### Málrómur Prose
- **Font:** Málrómur (variable serif)
- **Purpose:** Editorial systems
- **Grid:** 8pt baseline (4pt for small sizes)
- **Elements:** Unified 14-element system consolidating 8 editorial contexts
- **Coverage:** TOC, editorial, menu, chapter, title page, running head, footnotes, image caption

## Route Files

Each route file is self-contained with:
- Hero configuration
- Specimen images
- Prose style data arrays
- Visual example content
- Table specifications
- Implementation notes

Example structure:

```javascript
import { useState } from 'react'
import { OverviewHero, ProseStylesViewer, Table, UnitSelector, FoundryCTA, FoundryFeatureSection } from '@kol/ui'

export default function ProseSpecs() {
  const [showUnits, setShowUnits] = useState('px')

  const proseStyles = [/* typography data */]
  const proseExampleElements = [/* visual content */]

  return (
    <main>
      <OverviewHero {...} />
      <section>{/* Featured Image */}</section>
      <section><FoundryFeatureSection {...} /></section>
      <ProseStylesViewer>{proseExampleContent}</ProseStylesViewer>
      <section>{/* Specs Tables with UnitSelector */}</section>
      <section>{/* Implementation Notes */}</section>
      <FoundryCTA {...} />
    </main>
  )
}
```

## Data Structure

Typography specifications use consistent format:

```javascript
{
  element: 'H1 - Page Title',
  className: 'prose-h1',
  size: 48,          // px
  weight: 500,
  leading: 56,       // px
  tracking: 0,       // 1/1000em
  fontStyle: 'normal'
}
```

## Adding New Prose System

1. Create route file in `apps/web/src/routes/foundry/prose-specs/`
2. Define typography specs array
3. Create visual example elements
4. Add featured image and about section
5. Configure hero and CTA
6. Add route in `App.jsx`
