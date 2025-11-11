# kolkrabbi.io: Why We Built Our Portfolio the Hard (But Better) Way

*Accessible Guide • 10 min read*

**Author:** Tór Grímsson
**Date:** November 4, 2025

---

## Introduction

Building a portfolio in 2025 is overwhelming. Do you go static, dynamic, SSR, SPA, Headless, Markdown? It feels like a minefield of over-engineered choices!

For kolkrabbi.io, we made a deliberate choice: we wanted flexibility and power without sacrificing sanity. Our site isn't a static artifact; it's a living product of our studio. So, we chose an architecture that looks complex on paper but is surprisingly simple to maintain: a React Single Page App (SPA), powered by Sanity CMS, styled with Tailwind v4, and all tucked neatly into a monorepo.

Here's the high-level tour of how we made it all work.

## The Stack: Deliberate Trade-Offs

We chose our tools based on two simple questions: **Does it speed up our design iteration?** and **Does it prevent future breakage?**

| The Tool | Why We Chose It | The Human Benefit |
|----------|----------------|-------------------|
| **React + Vite** | Fast, reliable component model. We skipped complex Next.js/Remix because we don't need Server-Side Rendering (SSR). | **Instant Feedback Loop:** Vite makes the development server start instantly. We spend less time waiting and more time designing. |
| **Sanity CMS** | Structured, modular content with the powerful GROQ query language. | **Total Content Control:** We can build unique layouts for every project without touching a line of code, and query exactly the data we need—no over-fetching. |
| **Tailwind v4** | CSS-first approach using semantic tokens like `bg-surface-primary`. | **Effortless Dark Mode:** Components use simple descriptive names, and the theme system handles swapping colors automatically. It just works. |
| **Monorepo (Turborepo)** | Houses all our code (the website, the design system, the content schemas) in one place. | **Zero Design Drift:** If we update a button's style in our shared component package, the website inherits the change instantly. Everything stays 100% in sync. |

## The Monorepo Magic: A Single Source of Truth

The most powerful part of our setup is the monorepo. Our design system primitives (`@kol/ui`), our content definitions (`@kol/content`), and the website itself all share the same repository.

When we update a content schema in Sanity, the developer who writes the new page component sees that change immediately. When we build the app, Turborepo automatically handles the correct build order (packages first, then the web app). This makes complex integrations simple and eliminates dependency hell.

### What This Means in Practice

Instead of managing four separate repositories:
```
~/git/
├── kolkrabbi/          # Website
├── kolkrabbi-foundry/  # Design tool
├── kolkrabbi-fontviewer/ # Font tool
└── kolkrabbi-studio/   # CMS
```

We have one unified codebase:
```
kolkrabbi-monorepo/
├── apps/web/           # Main website
├── apps/foundry/       # Design tool
├── packages/ui/        # Shared components
└── packages/content/   # Shared schemas
```

## Content Structure: No More Markdown Blobs

We treat our projects like magazines, not blogs. That means we need control over modules (rich text, gallery grids, video embeds). Sanity lets us define a Project Schema with a flexible modules array:

```typescript
// packages/content/schemas/project.ts
{
  name: 'modules',
  type: 'array',
  of: [
    { type: 'hero' },         // Our custom hero component
    { type: 'richText' },     // Rich content block
    { type: 'galleryGrid' }   // Complex image layout
  ]
}
```

This structured approach means:
- **The website always knows how to render the content beautifully**
- **The content creators always know what options they have**
- **Developers can query exactly the data they need**

## Development Philosophy: Simple, Explicit, Fast

We deliberately chose the simplest tools for core tasks to save our complexity budget for design and animation.

### Routing: Explicit and Predictable

We use basic React Router. There are no magical server-side wrappers or complex data loaders. A page component, like our `/work/:slug` detail page, simply uses a React `useEffect` hook to fetch its data when it loads.

```javascript
// apps/web/src/routes/WorkDetail.jsx - Simple, explicit data fetching
useEffect(() => {
  getProjectBySlug(slug) // Fetch the data
    .then(setProject)
    .finally(() => setLoading(false));
}, [slug]);
// ... returns the renderer
```

This approach is:
- **Predictable:** Easy to debug what's happening
- **Explicit:** No hidden magic or framework assumptions
- **Fast:** Minimal overhead, maximum clarity

### Animation: When CSS Isn't Enough

We prioritize performance, but a design studio needs polish. For sophisticated motion—like scroll-triggered reveals or complex text sequencing—we turn to GSAP. It gives us smooth, performant control over complex timelines that CSS alone can't manage, creating a premium feel without sacrificing speed.

## Performance: Fast by Default

High Lighthouse scores weren't an afterthought; they were built-in:

- **Vite's optimized bundling**
- **Sanity's CDN for fast content delivery**
- **Lazy-loaded, optimized images** (via our OptimizedImage component)
- **Route-level code splitting** to only load the JavaScript a user needs

### The Business Impact

These technical decisions translate to:
- **Better SEO rankings** from fast load times
- **Lower bounce rates** from smooth interactions
- **Higher conversion** from professional polish
- **Reduced hosting costs** from efficient assets

## The Architecture Decision Matrix

### Why Not a Static Site Generator?

**Static sites are great, but they come with trade-offs:**
- Hard to manage complex, interconnected content
- Build times increase as content grows
- Limited dynamic functionality
- Requires rebuilding for every content change

**Our portfolio needs:**
- Dynamic project layouts
- Rich media galleries
- Interactive components
- Future blog integration

### Why Not Next.js/Remix?

**SSR frameworks are powerful, but:**
- Added complexity we don't need
- Server-side rendering unnecessary for a portfolio
- Larger bundle sizes
- More potential failure points

**Our portfolio works great as an SPA:**
- Fast navigation between pages
- No server required
- Simple deployment
- Easy to host anywhere

## Content Management: Sanity Studio in Action

### The Editor Experience

Sanity Studio gives our team a powerful, flexible content management interface:
- **Real-time collaboration** when multiple people edit
- **Live preview** of content changes
- **Flexible schemas** for different content types
- **Custom input components** for complex data

### Content Models That Scale

Our content architecture supports:
- **Hierarchical content** (projects → modules → components)
- **Reusable components** (hero, rich text, gallery)
- **Flexible metadata** (SEO, social sharing, analytics)
- **Future extensibility** (new content types without code changes)

## The Design System Connection

The portfolio isn't just a website—it's a showcase of our design system in action.

### Semantic Tokens in Production

Every color, spacing value, and typography scale in the portfolio is driven by our design tokens:

```css
/* This class uses semantic tokens */
.hero-section {
  background: var(--color-surface-primary);
  color: var(--color-content-primary);
  padding: var(--spacing-8);
}
```

**The benefit?** When we update our design system, the website updates automatically.

### Component Library as Documentation

The portfolio demonstrates how to use our components in real contexts:
- Navigation patterns in production
- Content layouts at scale
- Responsive behavior
- Accessibility implementation

## Deployment & DevOps: Keeping It Simple

### One-Command Deploys

Our deployment process is beautifully simple:

```bash
# Build everything
turbo run build

# Deploy to Vercel
vercel deploy --prod
```

That's it. No complex CI/CD pipelines, no container orchestration, no managed Kubernetes.

### What Makes This Work

- **Vercel** handles CDN, SSL, and global distribution
- **Turborepo** ensures correct build order
- **GitHub Actions** runs tests and builds on every PR
- **Sanity** manages content separately from code

## Lessons for Other Portfolios

### Start with Content Strategy

Before choosing technology, define your content needs:
- How will you structure projects?
- What metadata do you need?
- How will content evolve over time?
- Who will manage content?

### Choose Boring Technology

We used React, Vite, and Sanity—not because they're trendy, but because they're mature, well-supported, and solve our specific problems.

### Invest in Design Systems

A portfolio is more than pages—it's a demonstration of your design philosophy. Invest in the system, not just the surface.

### Plan for Growth

Your portfolio will evolve. Choose architecture that can grow with you:
- Can you add a blog easily?
- Will it handle increased traffic?
- Can you experiment with new features?
- Will it stay maintainable as you add content?

## The Business Value: Beyond the Code

This architecture delivers real business value:

### For the Studio

- **Faster content updates** (non-developers can add projects)
- **Consistent brand presentation** (design system enforced)
- **Easy experimentation** (new layouts without rebuilding)
- **Reduced maintenance overhead** (single codebase)

### For Clients

- **Professional presentation** (fast, polished experience)
- **Accessible content** (optimized for all devices)
- **Easy to find information** (clear navigation and structure)
- **Mobile-first experience** (responsive design)

### For Developers

- **Clean, maintainable codebase** (clear architecture)
- **Fast development** (good tooling and DX)
- **Easy to extend** (well-organized codebase)
- **Reliable deployment** (simple, proven process)

## What We Learned

### What Worked Well

1. **Monorepo from the start** prevented integration headaches
2. **Semantic tokens** made theming effortless
3. **Simple routing** eliminated edge cases
4. **GROQ queries** provided flexibility without complexity
5. **Component composition** enabled rapid page development

### What We'd Do Differently

1. **Add TypeScript earlier** would have caught more errors
2. **More aggressive code splitting** for faster initial loads
3. **Accessibility testing from day one** (now a priority)
4. **User testing early** would have shaped the IA differently

### The Key Insight

**Architecture is a product decision.** We chose this stack not because it's technically superior, but because it serves our business goals.

## What's Next

The portfolio is complete, but it will continue evolving:

### Near-Term Enhancements

- Blog system for design articles
- Case study deep-dives
- Client testimonials section
- Search functionality

### Long-Term Vision

- Interactive project showcases
- Dynamic pricing calculator
- Client portal integration
- Multi-language support

### The Foundation

The architecture we've built supports all of this. We didn't choose technology for today's needs—we chose technology for tomorrow's opportunities.

## Conclusion: Architecture as a Product Decision

We chose this specific architecture—the monorepo, the SPA, the headless CMS—not because it's the trendiest, but because it delivers on our business goals:

- **Freedom to Iterate:** We can change designs and content quickly
- **Iron-Clad Consistency:** All our digital properties look and feel the same
- **Future-Proof:** The modular, separate-concerns structure means we can add new features (like a blog or a store) without having to rewrite the core

The result is a site that feels cohesive, loads fast, looks polished, and can evolve seamlessly with our studio. That's what good architecture gives you: **the freedom to focus on the work that truly matters**.

---

### Quick Reference

**Technology Stack:**
- React (component framework)
- Vite (build tool)
- Sanity CMS (content management)
- Tailwind v4 (styling)
- Turborepo (monorepo management)

**Key Principles:**
- Simple over complex
- Explicit over implicit
- Flexible over rigid
- Maintainable over trendy

**Business Value:**
- Fast iteration cycles
- Consistent brand presentation
- Reduced maintenance overhead
- Future-proof architecture