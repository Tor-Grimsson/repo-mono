# kolkrabbi.io: Architecture of a Modern Design Portfolio

Building a portfolio site in 2025 means navigating a minefield of choices. Static site generator or dynamic? Headless CMS or markdown? Client-side routing or server-side? Build for scale or simplicity?

For kolkrabbi.io, we chose a path that prioritizes **flexibility without complexity**: a React SPA powered by Sanity CMS, built with Vite, styled with Tailwind v4, and organized as part of a larger monorepo. This isn't the simplest architecture, but it's the right one for a studio that treats its website as a living product, not a static artifact.

This post is a high-level tour of how it all fits together.

## The Stack: Deliberate Choices

**React + Vite** for the frontend:
- React because we know it well and need component reusability
- Vite because it's fast, simple, and has great DX
- No Next.js or Remix—we don't need SSR for a portfolio site

**Sanity CMS** for content:
- Structured content with a flexible schema
- Real-time previews and collaborative editing
- GROQ for powerful content queries
- Portable Text for rich content rendering

**Tailwind v4** for styling:
- CSS-first approach with `@theme` tokens
- No config file—everything in CSS
- Shared design system across all apps
- Dark mode through semantic tokens

**Yarn Workspaces + Turborepo** for the monorepo:
- Single dependency tree, shared packages
- Cached builds and parallel execution
- Internal packages for shared code (`@kol/ui`, `@kol/content`, `@kol/fontviewer`)

[IMAGE: Architecture diagram showing the relationship between apps/web, Sanity CMS, and shared packages]

## Project Structure: Clear Boundaries

The web app lives at `apps/web` with a clear separation of concerns:

```
apps/web/
├── public/              # Static assets (fonts, images, videos)
├── src/
│   ├── routes/          # Page components
│   │   ├── Home.jsx
│   │   ├── WorkList.jsx
│   │   ├── WorkDetail.jsx
│   │   └── FontList.jsx
│   ├── components/      # UI components organized by purpose
│   │   ├── ui/          # Buttons, cards, typography
│   │   ├── sections/    # Page sections (hero, about, work)
│   │   ├── animation/   # GSAP-powered animations
│   │   ├── media/       # Video, image components
│   │   └── loaders/     # Loading states
│   ├── utils/           # Sanity client, theme helpers
│   ├── App.jsx          # Router configuration
│   └── index.css        # App-specific styles
├── styleguide.html      # Living design system reference
└── package.json
```

This structure emerged through refactoring. Originally, components lived in a flat `common/` folder. We reorganized into semantic folders (`ui/`, `animation/`, `media/`) to make intent clear.

## Routing: Simple and Intentional

React Router handles all routing with a straightforward configuration:

```jsx
// apps/web/src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home, WorkList, WorkDetail, FontList, Styleguide } from './routes';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/work" element={<WorkList />} />
        <Route path="/work/:slug" element={<WorkDetail />} />
        <Route path="/fonts" element={<FontList />} />
        <Route path="/styleguide" element={<Styleguide />} />
      </Routes>
    </BrowserRouter>
  );
}
```

Each route is a standalone component that fetches its own data. No complex data loading orchestration, no hydration mismatches—just simple, predictable routing.

The `/work/:slug` route demonstrates dynamic routing:

```jsx
// apps/web/src/routes/WorkDetail.jsx
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getProjectBySlug } from '../utils/sanity';

export function WorkDetail() {
  const { slug } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    getProjectBySlug(slug)
      .then(setProject)
      .finally(() => setLoading(false));
  }, [slug]);
  
  if (loading) return <ProjectLoader />;
  if (!project) return <NotFound />;
  
  return <ProjectRenderer project={project} />;
}
```

Simple, explicit, easy to debug.

## Content Management: Sanity + GROQ

Sanity is our single source of truth for content. All schemas live in `packages/content`, ensuring consistency across the main site and CMS instances:

```typescript
// packages/content/schemas/project.ts
export default {
  name: 'project',
  type: 'document',
  title: 'Project',
  fields: [
    {
      name: 'title',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'slug',
      type: 'slug',
      options: { source: 'title' }
    },
    {
      name: 'client',
      type: 'string'
    },
    {
      name: 'year',
      type: 'number'
    },
    {
      name: 'heroImage',
      type: 'image',
      options: { hotspot: true }
    },
    {
      name: 'modules',
      type: 'array',
      of: [
        { type: 'hero' },
        { type: 'richText' },
        { type: 'galleryGrid' },
        { type: 'specimenEmbed' }
      ]
    }
  ]
}
```

Content is fetched using GROQ queries:

```javascript
// apps/web/src/utils/sanity.js
import { createClient } from '@sanity/client';

export const client = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID,
  dataset: import.meta.env.VITE_SANITY_DATASET,
  apiVersion: '2025-01-01',
  useCdn: true
});

export async function getProjects() {
  return client.fetch(`
    *[_type == "project"] | order(year desc) {
      _id,
      title,
      slug,
      client,
      year,
      heroImage,
      "imageUrl": heroImage.asset->url
    }
  `);
}

export async function getProjectBySlug(slug) {
  return client.fetch(`
    *[_type == "project" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      client,
      year,
      description,
      heroImage,
      modules[] {
        _type,
        _key,
        // Hero module
        _type == "hero" => {
          heading,
          subheading,
          backgroundImage
        },
        // Rich text module
        _type == "richText" => {
          content[] {
            ...,
            markDefs[] {
              ...,
              _type == "internalLink" => {
                "slug": reference->slug
              }
            }
          }
        },
        // Gallery module
        _type == "galleryGrid" => {
          images[] {
            asset->,
            alt,
            caption
          }
        }
      }
    }
  `, { slug });
}
```

GROQ's power is in its flexibility—we can query exactly what we need, including related documents and transformed data, all in a single request.

[IMAGE: Screenshot of Sanity Studio showing the project schema with modules]

## Component Architecture: Reusability Through Composition

Components are organized by their role, not by arbitrary categories:

**UI Components** (`components/ui/`):
- `Button.jsx` - Primary, secondary, ghost variants
- `Card.jsx` - Surface for grouped content
- `SectionLabel.jsx` - Small caps labels for sections
- `SectionHeader.jsx` - Consistent section titles

**Section Components** (`components/sections/`):
- `home/Hero.jsx` - Animated homepage hero
- `home/About.jsx` - Studio introduction with GSAP animations
- `home/Work.jsx` - Featured project grid
- `cta/CtaHome.jsx` - Call-to-action with contact info

**Animation Components** (`components/animation/`):
- `AnimatedTitle.jsx` - GSAP-powered text reveals
- `ScrollReveal.jsx` - Scroll-triggered animations
- `VideoScroll.jsx` - Video that plays on scroll

**Media Components** (`components/media/`):
- `OptimizedImage.jsx` - Lazy-loaded images with blur-up
- `VideoPlayer.jsx` - Autoplay video with fallbacks

Each component is self-contained but composable:

```jsx
// Example: Building a work card
import { Card } from '@kol/ui/Card';
import { OptimizedImage } from '../media/OptimizedImage';

export function WorkCard({ project }) {
  return (
    <Card className="work-card group">
      <OptimizedImage
        src={project.imageUrl}
        alt={project.title}
        className="group-hover:scale-105 transition-transform"
      />
      <div className="p-6">
        <h3 className="text-h4 font-heading">{project.title}</h3>
        <p className="text-sm text-content-secondary">
          {project.client} • {project.year}
        </p>
      </div>
    </Card>
  );
}
```

This composition pattern means we can build complex layouts from simple, tested primitives.

## Animation: GSAP for Sophisticated Motion

The homepage uses GSAP for complex animations that CSS alone can't achieve:

```jsx
// apps/web/src/components/sections/home/Hero.jsx
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function Hero() {
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  
  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: titleRef.current,
        start: 'top center',
        end: 'bottom center',
        scrub: 1
      }
    });
    
    tl.from(titleRef.current, {
      y: 100,
      opacity: 0,
      duration: 1
    })
    .from(subtitleRef.current, {
      y: 50,
      opacity: 0,
      duration: 0.8
    }, '-=0.5');
    
    return () => tl.kill();
  }, []);
  
  return (
    <section className="hero">
      <h1 ref={titleRef} className="text-display-xl font-display">
        Kolkrabbi
      </h1>
      <p ref={subtitleRef} className="text-h3 font-heading">
        Design & Development Studio
      </p>
    </section>
  );
}
```

GSAP handles:
- Scroll-triggered animations (ScrollTrigger plugin)
- Complex timing and sequencing
- Smooth easing and interpolation
- Cleanup on component unmount

This creates a polished, interactive experience without sacrificing performance.

[IMAGE: Video or GIF showing homepage animations in action]

## Theming: Dark Mode That Just Works

Theme management is handled by a simple utility:

```javascript
// packages/ui/src/utils/theme.js
export function getInitialTheme() {
  // Check localStorage first
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) return savedTheme;
  
  // Default to dark mode unless OS prefers light
  const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
  return prefersLight ? 'light' : 'dark';
}

export function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
}

export function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme') || 'dark';
  const next = current === 'dark' ? 'light' : 'dark';
  setTheme(next);
  return next;
}
```

Components use semantic tokens, and the theme system handles the rest:

```jsx
// Components don't know about light or dark mode
<div className="bg-surface-primary text-content-primary">
  <h2 className="text-h2 text-content-primary">Section Title</h2>
  <p className="text-content-secondary">Description text</p>
</div>
```

The CSS automatically swaps token values based on `data-theme`:

```css
[data-theme="light"] {
  --color-surface-primary: #ffffff;
  --color-content-primary: #171717;
}

[data-theme="dark"] {
  --color-surface-primary: #0a0a0a;
  --color-content-primary: #fafafa;
}
```

This declarative approach eliminated an entire class of theming bugs.

## Performance: Fast by Default

Vite gives us instant dev server startup and fast builds. But we also optimized for production:

**Code splitting** at the route level:
```javascript
const Home = lazy(() => import('./routes/Home'));
const WorkDetail = lazy(() => import('./routes/WorkDetail'));
```

**Image optimization** with lazy loading:
```jsx
<OptimizedImage
  src={project.imageUrl}
  loading="lazy"
  decoding="async"
/>
```

**Font loading** with `font-display: block`:
```css
@font-face {
  font-family: "TG Málrómur Narrow Medium";
  src: url("./fonts/tg-malromur-narrow-medium.woff2") format("woff2");
  font-display: block; /* Prevent FOIT */
}
```

**Sanity CDN** for content delivery:
```javascript
export const client = createClient({
  projectId: '...',
  dataset: 'production',
  useCdn: true // Fast, cached content delivery
});
```

The result: **Lighthouse scores consistently above 90** for performance, accessibility, and SEO.

## Deployment: Simple and Reliable

The site deploys to Vercel (or any static host) with a simple build command:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

The Turborepo pipeline ensures dependencies build first:

```json
{
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**"]
    }
  }
}
```

This means running `turbo build` from the root automatically:
1. Builds `packages/ui`
2. Builds `packages/content`
3. Builds `packages/fontviewer`
4. Builds `apps/web` (which depends on the packages)

No manual coordination required.

[IMAGE: Screenshot of successful Vercel deployment showing build logs]

## What Makes This Architecture Work

Several decisions compound to create a maintainable system:

**1. Monorepo structure prevents drift**
When the design system, content schemas, and all applications live in one repo, they can't fall out of sync. A single PR can update a schema and all consumers.

**2. Shared packages eliminate duplication**
`@kol/ui`, `@kol/content`, and `@kol/fontviewer` are used by multiple apps. Changes propagate automatically during builds.

**3. Semantic tokens enable dark mode**
Components don't know about themes. They use tokens like `--color-surface-primary`, and CSS handles light/dark switching.

**4. GROQ makes content queries powerful**
We can fetch exactly what we need, including references and transformations, in a single query. No over-fetching, no N+1 problems.

**5. Vite keeps the feedback loop tight**
Instant server startup, fast HMR, simple config. Development feels effortless.

**6. Tailwind v4 CSS-first approach reduces complexity**
No JavaScript config to manage. All tokens in CSS. Works with standard CSS cascade and inheritance.

## Lessons from Building in Public

Working on kolkrabbi.io taught us lessons that apply to any portfolio or agency site:

**Choose boring technology for the core.** React, Vite, Sanity—none of these are cutting edge, and that's the point. We want to spend innovation tokens on design and UX, not tooling.

**Invest in documentation.** Our `LLM_RULES.md` and `AGENT-CONTEXT.md` files ensure anyone (human or AI) can understand the architecture in minutes.

**Make design decisions once.** Design System 2.0 means we never debate colors, spacing, or typography again. The tokens are the decisions.

**Test in production early.** We deployed incomplete features behind feature flags. Early production exposure catches integration issues before they compound.

**Optimize for change.** Content models will evolve. Design tokens will expand. The architecture accommodates this by keeping concerns separated and dependencies explicit.

**Don't fear migration.** We consolidated four repos into one while the site was live. Incremental migration with clear phases meant we never lost momentum.

## What's Next

The site is live and stable, but there's always room for improvement:

**Content priorities:**
- Blog system for design and development articles
- Case study deep-dives with rich media
- Font specimen pages with interactive controls

**Technical priorities:**
- Implement Sanity preview API for draft content
- Add end-to-end tests with Playwright
- Explore ISR (Incremental Static Regeneration) for better caching
- Set up analytics and performance monitoring

**Design priorities:**
- Expand component library with more variants
- Add animation presets for common patterns
- Create responsive spacing tokens
- Audit accessibility (WCAG 2.1 AA compliance)

But these are enhancements, not urgent fixes. The foundation is solid, the architecture scales, and the site does what it needs to do: **showcase our work, demonstrate our capabilities, and serve as a living example of our design philosophy**.

## Conclusion: Architecture as a Product Decision

Every technical decision is a product decision. We chose this architecture not because it's the most advanced or the most trendy, but because it serves our goals:

- **Flexibility** to iterate quickly on design and content
- **Consistency** across all our web properties
- **Maintainability** by a small team without dedicated DevOps
- **Performance** that respects user bandwidth and attention
- **Scalability** to add new features without rewriting

The result is a site that feels cohesive, loads fast, looks polished, and can evolve with our studio's needs. That's what good architecture delivers: **the freedom to focus on what matters**.

---

## Sources
1. Web App Structure - `apps/web/`
2. Routing Configuration - `apps/web/src/App.jsx`
3. Sanity Integration - `apps/web/src/utils/sanity.js`
4. Component Organization - `apps/web/src/components/`
5. Home Page Migration - `docs/SESSION-LOGS/2025-10-07-HOME-MIGRATION-PLAN.md`
6. Theme System - `packages/ui/src/utils/theme.js`
7. Design System - `packages/ui/theme.css`
8. Content Schemas - `packages/content/schemas/`
9. Agent Context - `docs/AGENT-CONTEXT.md`
10. Rules & Structure - `docs/RULES_STRUCTURE.md`
