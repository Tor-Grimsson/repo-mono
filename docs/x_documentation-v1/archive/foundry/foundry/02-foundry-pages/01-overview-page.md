# Foundry Overview Page

**Route:** `/foundry`
**File:** `apps/web/src/routes/foundry/FoundryOverview.jsx`

## Purpose

Main landing page for the foundry with featured carousel, navigation, and interactive demos.

## Sections

### 1. Hero
- OverviewHero component
- Badge + category pills
- Foundry description

### 2. Featured Carousel
- 4 typefaces with background images
- Auto-rotation: 5 seconds
- BentoCard + CarouselNavigation

### 3. Navigation Cards
- FeaturesCardSection component
- Links to:
  - All Typefaces
  - Specimens
  - Licensing
  - (4th card varies)

### 4. Interactive Metrics Inspector
- MetricsWithControls component
- Glyph selection
- Weight/size controls
- Real font metrics

### 5. Variable Font Demo
- TextPressureHero component
- Interactive weight slider
- Live typography demo

### 6. CTA
- FoundryCTA component
- "Start Using Our Fonts"

## Components Used

- `OverviewHero`
- `BentoCard`
- `CarouselNavigation`
- `FeaturesCardSection`
- `MetricsWithControls`
- `TextPressureHero`
- `FoundryCTA`

## Featured Typefaces (Carousel)

1. Málrómur
2. Rót
3. Tröllatunga
4. Dylgjur

Images: `/img/typefaces/{typeface}/set-*-01.png`
