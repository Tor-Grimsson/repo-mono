---
version: 1.0.0
date: 2025-12-02
status: active
content-type: page-documentation
category: pages
cross-references:
  parent: 4.0.0
  related:
    - 0.1.5-notion-foundry.md
    - apps/web/src/routes/foundry/FoundryOverview.jsx
---

# 4.5.0 Page: Foundry

## Overview
The Foundry page showcases Kolkrabbi's type foundry, featuring free and open-source typefaces designed for real-world applications. The page includes interactive font demonstrations, a featured typeface showcase, quick links to resources, and interactive metric visualizations.

**Route:** `/foundry`
**Component:** `apps/web/src/routes/foundry/FoundryOverview.jsx`

## SEO Metadata
- **Title:** Type Foundry — Kolkrabbi
- **Description:** Free, open-source typefaces designed for real-world applications. Download custom fonts under SIL OFL license.
- **OG Title:** Kolkrabbi Type Foundry
- **OG Description:** Discover free, open-source typefaces for design projects.
- **OG Image:** `https://kolkrabbi.io/img/open-graph/open-graph-03.png`

## Page Structure

### Hero Section
Introduction to the foundry with licensing badges.

**Content:**
- Badge: "Type Foundry"
- Heading: "Kolkrabbi Foundry"
- Body copy: "A growing collection of custom typefaces designed for real-world applications. Each font is built as a complete design system with specimens, documentation, and free licensing."

**Supporting Pills:**
- "Free & Open Source"
- "Variable Fonts"
- "SIL OFL 1.1"

### Featured Typeface Section
Spotlight on the primary typeface with large display.

**Label:** "Featured Typeface"
**Status pill:** "Available"

**Content:**
- Typeface heading: "Málrómur"
- Subtitle: "Variable Serif Typeface"
- Description: "An elegant italic typeface with flowing curves and refined character. Perfect for editorial design."
- CTA: "Explore Typeface" → `/foundry/malromur`
- Visual: Large "Aa" display set in TG Málrómur

### Quick Links Grid (`QuickLinksGrid`)
Navigation to key foundry resources.

**Link Cards:**

1. **All Typefaces**
   - Description: "Browse the complete typeface library with detailed specifications and previews."
   - Link: `/foundry/typefaces`
   - CTA: "View Library"

2. **Specimens**
   - Description: "Explore type specimens showing real-world applications and prose styles."
   - Link: `/foundry/specimens`
   - CTA: "View Specimens"

3. **Licensing**
   - Description: "Free for personal and commercial use under SIL Open Font License."
   - Link: `/foundry/licensing`
   - CTA: "Learn More"

### Interactive Metrics Inspector
Live font metrics visualization tool.

**Content:**
- Heading: "Interactive Metrics Inspector"
- Description: "Explore glyph metrics with variable font controls. Adjust weight, italic, and select different characters to see how metrics change."

**Features:**
- Renders `MetricsWithControls` widget
- Uses TG Málrómur variable fonts
- Real-time metric visualization
- Variable font axis controls (weight, italic)
- Character selection interface
- Live glyph measurement display

### Variable Font Demo
Interactive mouse-driven font variation demonstration.

**Content:**
- Heading: "Variable Font Interactive Demo"
- Description: "Move your cursor over the text to see dynamic variable font axis transformations. Width and weight respond to cursor proximity."
- Demo text: "FOUNDRY"

**Behavior:**
- Width and weight axes respond to cursor position
- Smooth transitions between font variations
- Real-time axis value updates
- Visual feedback for interaction zones

### Bottom CTA (`FoundryCTA`)
Call-to-action for font downloads.

**Content:**
- Heading: "Start Using Our Fonts"
- Description: "All fonts are free to download and use in your projects. No registration required."
- Action: "Download Fonts" → `/foundry/typefaces`

## Components Used
- `Hero` - Foundry introduction with badges
- `FeaturedTypeface` - Spotlight section for Málrómur
- `QuickLinksGrid` - Navigation cards to resources
- `MetricsWithControls` - Interactive glyph metrics inspector
- `VariableFontDemo` - Mouse-driven font variation demo
- `FoundryCTA` - Download call-to-action
- `SEO` - Meta tags and OpenGraph configuration

## Interactive Features

### Metrics Inspector
The interactive metrics inspector provides detailed font analysis:

**Capabilities:**
- Glyph outline visualization
- Metric measurements (ascender, descender, cap height, x-height)
- Baseline visualization
- Variable font axis controls
- Character selection
- Real-time updates as parameters change

**Variable Font Axes:**
- Weight adjustment slider
- Italic angle adjustment
- Live metric recalculation
- Visual feedback for axis ranges

### Variable Font Demo
Cursor-interactive demonstration of variable font capabilities:

**Interaction Model:**
- Horizontal cursor position controls width axis
- Vertical cursor position controls weight axis
- Smooth interpolation between axis values
- Visual indicator of active zone
- Touch-responsive for mobile devices

## Typography Showcase

### Display Typography
The featured typeface section uses large-scale display typography:
- Display heading: "Málrómur"
- Large glyph demonstration: "Aa"
- Demonstrates character proportions and style at display sizes

### Font Licensing
All fonts released under **SIL Open Font License 1.1**:
- Free for personal use
- Free for commercial use
- No registration required
- Modification allowed
- Redistribution permitted with attribution

## Technical Implementation

### Font Loading
- Variable fonts loaded via `@font-face` declarations
- Font files served from `/fonts/` directory
- Optimized WOFF2 format for web delivery
- Fallback fonts specified for progressive enhancement

### Interactive Components
- Canvas-based rendering for metrics inspector
- CSS variable font properties for demo
- React hooks for state management
- Real-time updates via animation frames
- Responsive sizing for all viewports

### Performance Optimization
- Lazy loading for heavy interactive components
- Debounced cursor events for smooth performance
- Efficient canvas rendering with requestAnimationFrame
- Font file preloading for instant display

## Content Strategy

### Educational Focus
The page serves multiple educational purposes:
- Introduces visitors to the foundry and its philosophy
- Demonstrates font capabilities through interactive tools
- Provides access to specimens and documentation
- Encourages download and use through clear licensing

### Navigation Hierarchy
1. **Hero** - Establishes foundry identity and licensing model
2. **Featured Typeface** - Showcases primary offering
3. **Quick Links** - Provides pathways to deeper resources
4. **Interactive Tools** - Demonstrates technical capabilities
5. **CTA** - Encourages download and use

## Related Resources
- **Typeface Library** (`/foundry/typefaces`) - Complete font catalog
- **Specimens** (`/foundry/specimens`) - Real-world application examples
- **Licensing** (`/foundry/licensing`) - Detailed licensing information
- **Individual Typeface Pages** (`/foundry/malromur`) - Per-font documentation

## Future Enhancements
- [ ] Additional featured typefaces rotation
- [ ] Font comparison tool
- [ ] Advanced specimen builder
- [ ] Downloadable specimen PDFs
- [ ] Font pairing recommendations
- [ ] OpenType feature demonstrations
- [ ] Web font implementation guides
- [ ] Character set viewers
- [ ] Glyph search functionality

## Technical Notes
- Typeface lists, specimens, and detailed licensing information live on dedicated routes
- Variable font support requires modern browser with CSS Font Loading API
- Metrics inspector requires Canvas API support
- Interactive demos degrade gracefully on older browsers
- All demonstrations use production font files
