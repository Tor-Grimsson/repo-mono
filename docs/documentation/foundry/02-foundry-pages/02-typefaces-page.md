# All Typefaces Page

**Route:** `/foundry/typefaces`
**File:** `apps/web/src/routes/foundry/FoundryTypefaces.jsx`

## Purpose

Browse all typefaces with filtering and variable font preview.

## Sections

### 1. Hero
- OverviewHero
- "All Typefaces" with category pills

### 2. Featured Carousel
- Same 4 typefaces as Overview
- Specimen images as backgrounds

### 3. Typeface Library Grid
- TypefaceLibraryGridWithVariables component
- Filters: Classification, Styles, Typefaces, Axes
- View modes: Card, List
- Variable font preview when typeface selected

### 4. In Development Section
- Coming soon typefaces
- Grayed out cards

### 5. CTA
- FoundryCTA

## Filters

**Classification:**
- Serif, Sans Serif, Display, Monospace

**Styles:**
- Variable (wght, slnt)
- Variable (wght, wdth)
- Regular

**Typefaces:**
- TG Málrómur, TG Rót, etc.
- Mutually exclusive (one at a time)

**Axes** (appears when multi-axis typeface selected):
- wght, wdth

## View Modes

**Card View:**
- 4-column grid
- "Ðð" preview
- Hover shows pangram

**List View:**
- Stacked horizontal items
- Alphabet preview with intelligent clipping
- Metadata (classification, year, styles)

## Variable Preview

When a typeface is selected:
- Shows TypefaceVariablePreview for each weight
- Interactive sliders (size, leading, spacing)
- Editable preview text
