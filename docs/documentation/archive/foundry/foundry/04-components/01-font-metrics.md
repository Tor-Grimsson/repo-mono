# Font Metrics Components

## MetricsWithControls

**Location:** `apps/web/src/components/fontviewer/MetricsWithControls.jsx`

**Purpose:** Interactive font metrics viewer with controls.

**Used in:** FoundryOverview page

**Features:**
- Glyph slider (A-Z, a-z)
- Text input (custom characters)
- Font size slider (48-320px)
- Weight slider (variable fonts)
- Style slider (Italic ↔ Roman)
- Real-time metrics overlay
- Font info pills (variable axes)

**Props:**
```javascript
{
  italicFontUrl: string,
  romanFontUrl: string,
  title: string,
  subtitle: string,
  className: string
}
```

## MetricsViewerCard

**Location:** `apps/web/src/components/fontviewer/MetricsViewerCard.jsx`

**Purpose:** Card-based metrics viewer for marketing pages.

**Features:**
- Click to select glyph
- Hover to preview
- Character grid with rounded cards
- Font metadata panel
- Uses existing Extraction component

## GlyphMetricsGrid

**Location:** `apps/web/src/components/fontviewer/GlyphMetricsGrid.jsx`

**Purpose:** Comprehensive glyph inspector (Figma spec).

**Used in:** All 7 typeface detail pages

**Layout:**
- Left: 504px glyph viewer (316px glyph)
- Right: 832px dual stacked grids
- Table-like grid (touching borders)

**Features:**
- Click/hover selection
- Real font metrics
- Uppercase + Latin1 grid (top)
- Lowercase + LatinExtended grid (bottom)
- Unicode metadata

**Props:**
```javascript
{
  fontUrl: string,
  fontFamily: string,
  fontStyle: 'normal' | 'italic',
  initialGlyph: string,
  uppercaseGlyphs: array,
  lowercaseGlyphs: array
}
```

## Metrics Displayed

All components show:
- Baseline
- Ascender
- Descender
- Cap height
- X-height
- Left/right bearings (rotate for italic)
- Metric values in font units
