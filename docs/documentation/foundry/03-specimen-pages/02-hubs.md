# Specimen Hubs

## Purpose

Hub pages are entry points for each typeface's specimen collection.

## Hub Pages (7)

1. **Málrómur** - `/specimen/malromur` (11 patterns)
2. **Gullhamrar** - `/specimen/gullhamrar` (poetry)
3. **Dylgjur** - `/specimen/dylgjur` (selection)
4. **Silfurbarki** - `/specimen/silfurbarki` (preview)
5. **Rót** - `/specimen/rot` (design systems)
6. **Orðspor** - `/specimen/ordspor` (layout)
7. **Tröllatunga** - (coming soon)

## Hub Structure

### Components
- OverviewHero
- FeaturesCardSection (Quick Links)
- FoundryFeatureSection (About)
- ChapterNavigation (Jump links to patterns)
- FoundryCTA

### Sections

**1. Hero:**
- Typeface name (rendered in font)
- Badge (Variable Serif, etc.)
- Category pills
- Description

**2. Quick Links:**
- Complete Selection
- Specifications
- Licensing

**3. About Section:**
- Design philosophy
- Best use cases
- Technical overview

**4. Chapter Navigation:**
- Links to patterns on Selection page
- Example: Editorial → `/specimen/malromur/selection#editorial`

**5. CTA:**
- Download or view licensing

## Málrómur Hub Example

**Prose Chapters (11):**
1. Title Page
2. Editorial
3. Data Tables
4. Menu
5. Newsletter
6. Index
7. Chapter
8. TOC
9. Scientific
10. Legislative
11. Variable Axis

**Navigation:**
```jsx
<ChapterNavigation
  title="Prose Styles"
  description="Jump to specific patterns"
  chapters={[
    {
      title: 'Editorial',
      subtitle: 'Magazine & Journal Layout',
      description: '...',
      href: '/specimen/malromur/selection#editorial'
    },
    // ... 10 more
  ]}
  variant="list"
/>
```

## File Pattern

```javascript
// routes/specimens/malromur/routes/MalromurHub.jsx
export default function MalromurHub() {
  return (
    <>
      <SEO title="..." />
      <main>
        <OverviewHero {...} />
        <FeaturesCardSection {...} />
        <FoundryFeatureSection {...} />
        <ChapterNavigation {...} />
        <FoundryCTA {...} />
      </main>
    </>
  )
}
```
