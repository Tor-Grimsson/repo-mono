# Specimens Library Page

**Route:** `/foundry/specimens`
**File:** `apps/web/src/routes/foundry/FoundrySpecimens.jsx`

## Purpose

Browse all specimen pages with filtering.

## Sections

### 1. Hero
- OverviewHero
- "Type Specimens"

### 2. Featured Carousel
- 5 featured specimens with images
- Auto-rotation: 5 seconds

### 3. Specimen Filters
- SpecimenFilters component
- View modes: Specimen Hubs, All Specimens, By Typeface
- Filters: Typeface, Category

### 4. Specimen Grid
- TypefaceCard components
- Shows hubs or individual specimens based on view mode

### 5. CTA
- FoundryCTA

## View Modes

**Specimen Hubs** (default):
- Shows 7 typeface hubs
- Each links to hub page

**All Specimens:**
- Shows all 20+ individual specimens
- Direct links to specimen pages

**By Typeface:**
- Filter by typeface and/or category
- Shows matching specimens

## Data Source

`apps/web/src/data/foundry/specimens.js`
- specimenHubs (7)
- allSpecimens (20+)
- allSpecimenData (combined)

## Featured Specimens (Carousel)

1. Málrómur Complete Selection
2. Gullhamrar Icelandic Poetry
3. Dylgjur Complete Selection
4. Silfurbarki Preview
5. Orðspor Layout Grid Systems
