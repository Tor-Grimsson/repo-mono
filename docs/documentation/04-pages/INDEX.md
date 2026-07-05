---
Title: Public Pages Overview
Status: Active
Last-Updated: 2025-11-11
Category: Application Pages
tags: [pages, index, site-structure, routing, layout]
modified: 2026-02-17T19:07:43+00:00
---

## Chapter Index

Reference hub for every outward-facing route. Use this list to jump to the owning doc:

- [Home](./01-home.md)
- [Studio](./02-studio.md)
- [Stack](./03-stack.md)
- [Work](./04-work.md)
- Collections (Illustrations, Logomarks, Motion) → see `collections/`
- Foundry pages + specimen systems → see `../06-foundry/`
- Workshop routes → see `../05-workshop/INDEX.md`
- [Site Tree](./11-site-tree.md) — the canonical route tree for the whole site + which nav UI exposes it

---

## Page Structure Patterns

### Common Layout Pattern

Most pages follow this structure:

```jsx
<main className="min-h-screen w-full">
  {/* Hero Section */}
  <HeroSection />

  {/* Content Sections */}
  <div className="main-wrapper">
    <Section1 />
    <Section2 />
    <Section3 />
  </div>

  {/* Global CTA */}
  <CtaGlobal />
</main>
```

### Wrapper Classes

- **`main-wrapper`**: Main content container with consistent padding
- **`card-wrapper`**: Card-style section with background and padding
- **`section-wrapper`**: Standard section wrapper

### Max-Width Patterns

- **1400px**: Standard content max-width (foundry, specimens)
- **1200px**: Narrow content (reading, forms)
- **Full-width**: Hero sections, global CTAs

---

## Page Components

### Hero Sections
Each route owns a hero (`HomeHero`, `StudioHero`, `StackHeroTall`, `WorkHeroSection`) pulled from `apps/web/src/components/sections`.

### Content Sections
Cards, grids, or prose modules specific to each page. Cross-link to collections/foundry/workshop where relevant.

### Global Components
- `CtaGlobal`
- `CmsGlobal` (blog feed on Home/Stack)
- Shared layout utilities (`main-wrapper`, `card-wrapper`)

---

## Typography Patterns

### Page Titles
- `kol-display-section` or `kol-display-lg`
- Used in hero sections

### Section Headings
- `kol-heading-lg` for main section titles
- `kol-heading-sm` for subsection titles

### Body Text
- `kol-mono-text` for primary content
- `kol-mono-sm` for supporting text
- `kol-mono-xs` for labels and small text

---

## Related Documentation

- **Design System Typography**: `../02-design-system/03-typography.md`
- **Components**: `../03-components/INDEX.md`
- **Navigation Shell**: `../01-foundation/05-navigation-system.md`

---

## Notes

Each 4.0.x file documents the live React route, associated SEO settings, and future enhancements. Keep descriptions concise—link to component docs instead of repeating implementation details.
