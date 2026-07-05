---
Title: Page - Home
version: 1.0.0
date: 2025-12-02
status: active
content-type: page-documentation
category: pages
cross-references:
  parent: 4.0.0
  related:
    - 0.1.1-notion-home.md
    - apps/web/src/routes/Home.jsx
tags:
  - pages
  - page-documentation
  - site-structure
  - content
modified: 2026-02-17T21:37:22+00:00
---

## Overview
The Home page serves as the primary landing experience for kolkrabbi.io, introducing visitors to the studio's design system, type foundry, and creative work. The page features a hero video, studio introduction, featured cards, highlights carousel, workshop preview, type foundry feature, newsletter signup, latest writing, and a connect CTA.

**Route:** `/`
**Component:** `apps/web/src/routes/Home.jsx`

## SEO Metadata
- **Title:** Kolkrabbi — Design System, Type Foundry & Studio
- **Description:** Explore Kolkrabbi: A comprehensive design system featuring custom typefaces, interactive specimens, design patterns, and creative explorations.
- **OG Title:** Kolkrabbi — Design System & Type Foundry
- **OG Description:** Discover our design system, custom typefaces, interactive specimens, and creative work.
- **OG Image:** `https://kolkrabbi.io/img/open-graph/open-graph-03.png`

## Page Structure

### Hero Section (`HomeHero`)
Full-viewport hero with looping video background and pinned overlay title.

**Content:**
- Display heading (overlay + pinned): "Vinnustofa"
- Background video (dark mode): `videos/vid-nrml.mov`
- Background video (light mode): `videos/vid-nrml-inverse.mov`

### Studio Intro (`HomeAbout`)
Introduces the studio's purpose and approach.

**Content:**
- Eyebrow: "Kolkrabbi Vinnustofa"
- Title: "Design studio & Atelier based in Reykjavík"
- Headline: "Visual identity and type design"
- Body copy: "Creating distinctive visual identities through thoughtful design systems, custom typography, and strategic creative direction."

### Featured Cards (`HomeCardFeatures`)
Navigation cards to primary site sections with sticky scroll behavior.

**Section label:** "Featured"
**Intro:** "Selected projects and explorations in type design, brand identity, and visual systems."

**Cards:**
1. **Type Foundry** — "Custom typeface design and licensing for distinctive brand typography." → `/foundry`
2. **Client Work** — "Brand identity and digital product design for ambitious companies." → `/work`
3. **Collections** — "Curated explorations in illustration, logomarks, and visual experiments." → `/collections`
4. **Workshop** — "Design system documentation, components, and development resources." → `/workshop`

**Sticky Card Behavior:**
- Cards use `position: sticky` with incrementing `top` values
- Each card stacks on top of previous cards as user scrolls
- Creates layered reveal effect as sections come into view
- Z-index ordering ensures proper stacking (later cards on top)
- Smooth transitions when cards enter sticky state

**Actions:**
- "Explore Projects" (primary) → `/work`
- "Get in Touch" (secondary) → `mailto:hello@kolkrabbi.io`

### Highlights Grid (`HomeHighlights`)
Showcase of featured work and interactive tools.

**Featured Items:**
1. **Málrómur** — Subtitle: "A contemporary variable serif typeface for editorial design." Description: "A contemporary serif typeface optimized for editorial design and professional publishing." → `/foundry/malromur`
2. **Harmonic Radial Dial** — Subtitle: "Interactive sine wave apparatus." Description: "An experimental tool for generating harmonic circular patterns using polar coordinates and sine wave modulation." → `/workshop/apparat/circle-generator`
3. **Chess Analysis** — Subtitle: "Interactive chess game analyzer." Description: "Analyze chess positions and games with interactive visualization tools for strategic insights." → `/workshop/chess/analysis`
4. **Illustrations** — Subtitle: "Visual design explorations." Description: "A collection of illustrated works and conceptual explorations." → `/collections/illustrations`
5. **Analytics Dashboard** — Subtitle: "Performance tracking and visualization." Description: "Comprehensive analytics dashboard with interactive charts, metrics tracking, and data visualization components." → `/workshop/dashboard`
6. **Motion Graphics** — Subtitle: "Experimental motion and generative visuals." Description: "Explore experimental motion graphics, generative animations, and Touch Designer explorations." → `/collections/motion-graphics`

### Workshop Preview (`WorkshopFeatures`)
Overview of design system resources.

**Section label:** "Workshop"
**Intro:** "Design system documentation, component library, and development resources for building with Kolkrabbi."

**Cards:**
- **Workshop Overview** — "Overview of the design system philosophy, principles, and getting started guide." → `/workshop`
- **Documentation** — "Comprehensive documentation covering design tokens, patterns, and implementation guidelines." → `/workshop/docs`
- **Foundations** — "Core design foundations including typography, color systems, spacing, and visual hierarchy." → `/workshop/foundations`
- **Components** — "Complete component library with usage examples, code snippets, and best practices." → `/workshop/components`

**Actions:**
- "Explore Workshop" → `/workshop`
- "View Documentation" → `/workshop/docs`

### Type Foundry Feature (`HomeFoundry`)
Call-to-action for the type foundry section.

**Content:**
- Label: "Type Foundry"
- Heading: "Custom typefaces for distinctive brands"
- Body copy: "Explore our collection of original typefaces designed for editorial, branding, and digital applications. Each font family is crafted with attention to detail and optimized for modern design systems."
- CTA button: "Browse Typefaces" → `/foundry`

### Newsletter Signup (`HomeSignup`)
Email subscription form.

**Content:**
- Heading: "Subscribe to our newsletter"
- Description: "Get updates on new typefaces, design resources, and selected work delivered to your inbox."
- Field placeholder: "Your mail address"
- Primary action: "Subscribe"
- Success state: "Thanks for subscribing!"
- Error state: "Please enter a valid email address."

### Latest Writing (`CmsGlobal`)
Dynamic article feed from Sanity CMS.

**Content:**
- Section title: "Studystack"
- Eyebrow: "Latest writing"
- Search placeholder (when enabled): "Search articles…"
- Empty search state: "No articles match your search yet."
- Loading state: skeleton cards (no copy)

*Note: Articles pull titles/excerpts from Sanity dynamically.*

### Connect CTA (`CtaGlobal`)
Footer call-to-action for project inquiries.

**Content:**
- Section marker: "/ connect"
- Prompt: "Working on a project?"
- Headline: "Let's collaborate"
- Subheading: "Send a message"
- Contact: `hello@kolkrabbi.io`

## Components Used
- `HomeHero` - Full-viewport hero with video background
- `HomeAbout` - Studio introduction section
- `HomeCardFeatures` - Featured navigation cards
- `HomeHighlights` - Highlights grid with project showcases
- `WorkshopFeatures` - Workshop preview cards
- `HomeFoundry` - Type foundry feature section
- `HomeSignup` - Newsletter subscription form
- `CmsGlobal` - Dynamic article feed component
- `CtaGlobal` - Connect CTA footer
- `SEO` - Meta tags and OpenGraph configuration

## Technical Notes
- Video assets must be provided in both standard and inverse variants for dark/light mode theming
- Newsletter signup integrates with backend subscription service
- Latest writing section fetches data from Sanity CMS via `getLatestBlogPosts` query
- All navigation links use client-side routing via React Router
- Hero video loops seamlessly and is optimized for web delivery
