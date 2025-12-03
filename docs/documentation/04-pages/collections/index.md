---
version: 1.0.0
date: 2025-12-02
status: active
content-type: page-documentation
category: pages
cross-references:
  parent: 4.0.0
  related:
    - 0.1.6-notion-collections.md
    - apps/web/src/routes/collections/CollectionsOverview.jsx
    - 4.4.1-illustrations.md
    - 4.4.2-logomarks.md
    - 4.4.3-motion-graphics.md
---

# 4.6.0 Page: Collections

## Overview
The Collections page serves as a curated showcase of Kolkrabbi's visual explorations including illustrations, logomarks, grids, and motion graphics. Features a hero introduction, featured items carousel, quick links to individual collections, and a bottom CTA to the main portfolio.

**Route:** `/collections`
**Component:** `apps/web/src/routes/collections/CollectionsOverview.jsx`

## SEO Metadata
- **Title:** Collections — Kolkrabbi
- **Description:** Explore our curated collections of illustrations, logomarks, and motion graphics showcasing visual design explorations.
- **OG Title:** Design Collections
- **OG Description:** Discover our visual design collections: illustrations, logomarks, and motion graphics.
- **OG Image:** `https://kolkrabbi.io/img/open-graph/open-graph-03.png`

## Page Structure

### Hero Section (`OverviewHero`)
Introduction to the collections with category overview.

**Content:**
- Badge: "Collections"
- Title: "Kolkrabbi Collections"
- Description: "A curated showcase of visual explorations including illustrations, logomarks, and experimental design work."
- Category list: "Illustrations", "Logo Marks", "Visual Experiments"

### Featured Items Carousel
Rotating showcase of featured work from all collections.

**Counter label:** "Featured Work"

**Motion Study Items (Inline Data):**

1. **Fluid Dynamics**
   - Subtitle: "Real-time fluid simulation"
   - Description: "Real-time fluid dynamics simulation with particle systems."

2. **Shader Experiments**
   - Subtitle: "GLSL studies"
   - Description: "Collection of custom GLSL shader experiments."

3. **Particle Systems**
   - Subtitle: "Dynamic particles"
   - Description: "Complex particle system with multiple attractors."

**Dynamic Content:**
- Additional featured items pull from `illustrations`, `logomarks`, and `grids` data files
- Names and descriptions update when datasets change
- Carousel rotates through all featured items
- Counter displays current item index

### Quick Links Grid
Navigation cards to individual collection pages.

**Collection Cards:**

1. **Illustrations**
   - Description: "Browse the complete illustration portfolio featuring visual explorations and conceptual work."
   - Link: `/collections/illustrations`
   - CTA: "View Gallery"

2. **Grids**
   - Description: "Explore modular grid explorations, editorial arrangements, and responsive layout experiments."
   - Link: `/collections/grids`
   - CTA: "View Grids"

3. **Logomarks**
   - Description: "Explore a curated selection of logomark designs and brand identity experiments."
   - Link: `/collections/logomarks`
   - CTA: "View Marks"

4. **Motion Graphics**
   - Description: "Discover animated design work and motion graphics showcasing dynamic visual storytelling."
   - Link: `/collections/motion-graphics`
   - CTA: "View Motion"

### Bottom CTA (`FoundryCTA`)
Call-to-action to main portfolio.

**Content:**
- Heading: "Explore More Work"
- Description: "View our full portfolio of design work, including client projects and experimental explorations."
- Action: "View Portfolio" → `/work`

## Components Used
- `OverviewHero` - Collections introduction hero
- `FeaturedItemsCarousel` - Rotating showcase of featured work
- `QuickLinksGrid` - Navigation cards to collections
- `FoundryCTA` - Portfolio call-to-action
- `SEO` - Meta tags and OpenGraph configuration

## Collection Categories

### Illustrations
Visual design explorations and conceptual work.
- **Page:** 4.4.1-illustrations.md
- **Route:** `/collections/illustrations`
- **Content:** Portfolio of illustrated works, conceptual explorations, and visual studies

### Logomarks
Logomark designs and brand identity experiments.
- **Page:** 4.4.2-logomarks.md
- **Route:** `/collections/logomarks`
- **Content:** Collection of logo designs, brand marks, and identity system explorations

### Grids
Modular grid systems and editorial layout explorations.
- **Route:** `/collections/grids`
- **Content:** Grid system experiments, editorial layouts, and responsive design patterns

### Motion Graphics
Experimental animation and dynamic visual work.
- **Page:** 4.4.3-motion-graphics.md
- **Route:** `/collections/motion-graphics`
- **Content:** Motion graphics, generative animations, and TouchDesigner explorations

## Interactive Features

### Featured Carousel
The carousel provides an engaging way to browse highlighted work:

**Behavior:**
- Auto-advances through featured items
- Manual navigation via controls
- Counter shows current position (e.g., "1/12")
- Smooth transitions between items
- Pause on hover for detailed viewing
- Touch-swipe support for mobile devices

**Content Sources:**
- Motion study data (inline)
- Illustration data files
- Logomark data files
- Grid exploration data files

### Navigation Pattern
Collections use a hub-and-spoke navigation model:
- Collections overview (hub) → Individual collections (spokes)
- Quick links provide direct access to each collection
- Featured carousel showcases work from all collections
- Bottom CTA encourages exploration of client work

## Content Management

### Dynamic Content
Featured carousel pulls from data modules:
- `illustrations.js` - Illustration portfolio data
- `logomarks.js` - Logomark collection data
- `grids.js` - Grid exploration data
- Inline motion study definitions

**To Update Featured Items:**
Edit the respective data files to change names, descriptions, and featured status. The carousel automatically reflects these changes.

### Static Content
Hero copy, category descriptions, and quick link text are defined in the component. Update `CollectionsOverview.jsx` to modify this content.

## Design Patterns

### Visual Hierarchy
1. **Hero** - Establishes collections identity
2. **Featured Carousel** - Showcases best work across categories
3. **Quick Links** - Provides organized navigation
4. **CTA** - Encourages further exploration

### Content Strategy
- Featured carousel creates visual interest and engagement
- Quick links provide clear pathways to specific collections
- Category badges help visitors understand content organization
- Bottom CTA maintains flow to main portfolio

## Technical Implementation

### Carousel Functionality
- React-based carousel component
- State management for current index
- Timer for auto-advance
- Event handlers for manual controls
- Responsive breakpoints for mobile/desktop views

### Data Integration
- Featured items sourced from multiple data modules
- Centralized data management for collections
- Lazy loading for performance
- Optimized image delivery

### Performance Considerations
- Image lazy loading for carousel items
- Preloading for next/previous items
- Efficient re-rendering with React keys
- Optimized transitions and animations

## Related Pages

### Individual Collections
- **4.4.1** - Illustrations collection page
- **4.4.2** - Logomarks collection page
- **4.4.3** - Motion Graphics collection page
- *Grid explorations* (route exists, documentation TBD)

### Portfolio Integration
- Collections featured on `/work` page archive rows
- Cross-references from project detail pages
- Integration with main portfolio navigation

## Future Enhancements
- [ ] Collection filtering by type or style
- [ ] Search functionality across collections
- [ ] Collection tagging system
- [ ] Related items suggestions
- [ ] Lightbox view for detailed inspection
- [ ] Download options for selected items
- [ ] Share functionality for individual pieces
- [ ] Collection RSS feeds
- [ ] Favorite/bookmark system

## Content Guidelines

### Adding New Collections
To add a new collection category:
1. Create data file for collection items
2. Add quick link card in `QuickLinksGrid`
3. Update category list in hero
4. Create dedicated collection page/route
5. Add featured items to carousel data
6. Update this documentation

### Maintaining Collections
- Keep data files up to date with new work
- Rotate featured carousel items regularly
- Update descriptions to reflect current focus
- Ensure image assets are optimized
- Test carousel functionality after updates

## Technical Notes
- Featured carousel data structure must include: title, subtitle, description, image/video path
- Quick link cards require: title, description, route, CTA text
- All collection routes must handle empty states gracefully
- Image paths should be relative to public directory
- Video assets for motion graphics should include fallback images
