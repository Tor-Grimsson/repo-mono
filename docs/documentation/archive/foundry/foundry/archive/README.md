# Archive - Old Foundry Documentation

These files have been superseded by the reorganized documentation structure.

**Date Archived:** November 24, 2025
**Reason:** Documentation restructure for better organization and clarity

## Migration Guide

### Old File → New Location

| Old File | New Location | Notes |
|----------|--------------|-------|
| 4.5.0-foundry-pages.md | `../02-foundry-pages/01-overview-page.md`<br>`../02-foundry-pages/03-specimens-page.md` | Split into multiple files |
| 4.5.1-foundry-prose-styles-specimen.md | `../03-specimen-pages/03-malromur.md` | Merged with Málrómur docs |
| 4.5.2-specimens.md | `../03-specimen-pages/01-architecture.md`<br>`../03-specimen-pages/05-grid-system.md` | Split by topic |
| 4.5.2-foundry-navigation-structure-research.md | `../01-overview/02-navigation.md` | Research archived, decision kept |
| 4.5.2.1-typeface-slugs.md | Archived | Superseded by current implementation |
| 4.5.2.2-malromur-specimen-sections.md | `../03-specimen-pages/03-malromur.md`<br>`../03-specimen-pages/05-grid-system.md` | Merged and split |
| 4.5.3-specimen-hubs.md | `../03-specimen-pages/02-hubs.md` | Minimal changes |
| 4.5.3-foundry-font-viewer-component.md | `../04-components/01-font-metrics.md` | Reorganized |
| 4.5.4-foundry-structure.md | `../01-overview/03-data.md`<br>`../02-foundry-pages/04-typeface-detail-pages.md`<br>`../05-data-configuration/01-typeface-config.md` | Split by concern |
| 4.5.5-foundry-specimens.md | `../03-specimen-pages/04-catalog.md` | Updated with current routes |
| 4.5.6-foundry-typeface-library.md | `../02-foundry-pages/02-typefaces-page.md` | Minor updates |
| 4.6.0-glyph-metrics-components.md | `../04-components/01-font-metrics.md` | Merged with font metrics docs |

## New Documentation Structure

```
foundry/
├── README.md                          Entry point
├── 01-overview/                       Architecture & patterns
│   ├── 01-architecture.md
│   ├── 02-navigation.md
│   └── 03-data.md
├── 02-foundry-pages/                  Product pages
│   ├── 01-overview-page.md
│   ├── 02-typefaces-page.md
│   ├── 03-specimens-page.md
│   └── 04-typeface-detail-pages.md
├── 03-specimen-pages/                 Showcase pages
│   ├── 01-architecture.md
│   ├── 02-hubs.md
│   ├── 03-malromur.md
│   ├── 04-catalog.md
│   └── 05-grid-system.md
├── 04-components/                     Reusable components
│   ├── 01-font-metrics.md
│   ├── 02-shared-components.md
│   └── 03-specimen-components.md
└── 05-data-configuration/             Config files
    ├── README.md
    ├── 01-typeface-config.md
    └── 02-specimens-data.md
```

## Why Reorganize?

**Problems with old structure:**
- Confusing numbering (4.5.0, 4.5.2.1, 4.5.2.2)
- Duplicate information across files
- Mixed concerns (specimens, foundry pages, components)
- Outdated information
- No clear entry point

**New structure benefits:**
- Clear hierarchy with numbered folders
- Single source of truth for each topic
- Separated concerns
- Updated with November 2025 implementation
- README as navigation hub

## Finding Information

Start at [../README.md](../README.md) for navigation and quick reference.

## Preservation

These files are preserved for historical reference and to track the evolution of the foundry documentation.
