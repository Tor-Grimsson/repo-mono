# Shared Components

Components used across foundry and specimen pages.

## OverviewHero

**From:** `@kol/ui`

**Purpose:** Page hero with badge, title, description, category pills

**Used in:** FoundryOverview, FoundryTypefaces, FoundrySpecimens, specimen hubs

**Props:**
```javascript
{
  badge: string,
  title: string | ReactNode,
  description: string,
  categories: array
}
```

## FeaturesCardSection

**Location:** `apps/web/src/components/sections/shared/FeaturesCardSection.jsx`

**Purpose:** Grid of feature/navigation cards

**Used in:** FoundryOverview, specimen hubs

**Props:**
```javascript
{
  sectionClassName: string,
  wrapperClassName: string,
  headerClassName: string,
  headerLabel: string,
  headerDescription: string,
  cardsWrapperClassName: string,
  features: array,
  showHeader: boolean,
  showActions: boolean,
  actions: array
}
```

## FoundryFeatureSection

**Location:** `apps/web/src/components/sections/foundry/FoundryFeatureSection.jsx`

**Purpose:** Two-column feature section with text + image

**Used in:** Specimen hubs, foundry pages

**Props:**
```javascript
{
  label: string,
  title: string,
  description: string,
  imagePosition: 'left' | 'right',
  cta: { to: string, label: string, className: string },
  graphic: ReactNode
}
```

## FoundryCTA

**From:** `@kol/ui`

**Purpose:** Call-to-action section

**Used in:** Most foundry and specimen pages

**Props:**
```javascript
{
  heading: string,
  description: string,
  action: { to: string, label: string }
}
```

## FeaturedItemsCarousel

**From:** `@kol/ui`

**Purpose:** Featured carousel with BentoCard slides

**Used in:** FoundryOverview, FoundryTypefaces, FoundrySpecimens

**Features:**
- Auto-rotation (5 seconds)
- Manual navigation
- Background images with text overlay

**Props:**
```javascript
{
  items: array,
  autoRotate: boolean,
  interval: number
}
```

## ChapterNavigation

**Location:** `apps/web/src/components/sections/shared/ChapterNavigation.jsx`

**Purpose:** TOC-style jump links

**Used in:** Málrómur hub

**Props:**
```javascript
{
  title: string,
  description: string,
  chapters: array,
  variant: 'list' | 'cards'
}
```
