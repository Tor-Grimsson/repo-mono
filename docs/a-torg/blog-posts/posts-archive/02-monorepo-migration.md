# Consolidating Four Projects into One Monorepo: A Migration Story

When you're a small team building multiple interconnected products, there comes a moment when you realize: **we're fighting our own architecture**. For us, that moment arrived when updating a single design token required opening four different repositories, making four separate PRs, and hoping everything stayed in sync.

The solution seemed obvious: consolidate everything into a monorepo. The execution? That's where things got interesting.

## The Problem: Death by a Thousand Tabs

Our setup consisted of four independent projects:
1. **kolkrabbi.io** - The main website (React, custom CSS, Sanity CMS)
2. **Foundry** - A standalone design tool application (React, different CSS conventions)
3. **Font Viewer** - An interactive typography exploration tool (vanilla JS, custom build)
4. **Sanity Studios** - Two separate CMS instances with duplicated schemas

Each project lived in its own repository, had its own dependencies, its own deployment pipeline, and its own interpretation of "our brand colors."

The daily workflow looked like this:
```bash
# Morning routine
cd ~/git/kolkrabbi && git pull
cd ~/git/kolkrabbi-foundry && git pull
cd ~/git/kolkrabbi-fontviewer && git pull
cd ~/git/kolkrabbi-staging && git pull

# Update a shared component? Good luck.
# Change happens in one repo
# Copy-paste to other repos
# Hope you didn't miss any differences
# Inevitably find bugs in production
```

[IMAGE: Screenshot of 4 terminal windows showing different project directories, illustrating the fragmented workflow]

The symptoms of architectural drift were everywhere:
- **Dependency hell**: One project on React 18, another still on 17
- **Build tool chaos**: Vite, Webpack, and custom scripts all doing slightly different things
- **Content model divergence**: Sanity schemas that should have been identical had drifted apart
- **CSS duplication**: The same `.button` class written four different ways

We weren't just maintaining four projects—we were maintaining four *versions* of the same product. It was unsustainable.

## The Decision: Monorepo or Microservices?

Before committing to a monorepo, we evaluated alternatives:

**Microservices with shared packages?** Too much overhead for a small team. Managing npm publishing, versioning, and coordinating updates across services would be worse than the status quo.

**Git submodules?** A recipe for merge conflicts and confusion. Submodules work for large teams with dedicated infra, not for us.

**Monorepo?** Scary at first (what if everything breaks?), but the benefits were compelling:
- Single dependency tree (one `yarn install`)
- Atomic commits across projects (change a schema and update all consumers in one PR)
- Shared tooling and build configuration
- Easier refactoring (move code between packages without publishing)

We chose the monorepo, but with a critical constraint: **migration must be incremental**. We couldn't afford a "big bang" rewrite that might never ship.

## The Plan: Crawl, Walk, Run

We broke the migration into distinct phases, each delivering value independently:

### Phase 1: Establish the Foundation
Create the monorepo structure without migrating real projects:
```
kolkrabbi-monorepo/
├── apps/           # Future home for applications
├── packages/       # Shared code
├── docs/           # Documentation and rules
├── package.json    # Workspace configuration
└── turbo.json     # Build pipeline
```

We used **Yarn workspaces** for dependency management and **Turborepo** for orchestrating builds:

```json
{
  "name": "kolkrabbi-monorepo",
  "private": true,
  "workspaces": [
    "apps/*",
    "packages/*"
  ],
  "scripts": {
    "dev": "turbo run dev",
    "build": "turbo run build",
    "lint": "turbo run lint"
  }
}
```

This foundation let us test the build system before migrating real code.

### Phase 2: Extract Shared Content Schemas
The easiest win was consolidating Sanity schemas. Both studios defined the same document types (`project`, `fontFamily`, `font`) but with slight variations:

```typescript
// Before: Duplicated in two studios
// studio-cms1/schemas/project.ts
export default {
  name: 'project',
  type: 'document',
  fields: [
    { name: 'title', type: 'string' },
    { name: 'description', type: 'text' }
  ]
}

// studio-cms2/schemas/project.ts - SLIGHTLY DIFFERENT
export default {
  name: 'project',
  type: 'document',
  fields: [
    { name: 'title', type: 'string' },
    { name: 'description', type: 'text' },
    { name: 'featured', type: 'boolean' } // Added in one studio, not the other
  ]
}
```

We created `packages/content` to hold the single source of truth:

```typescript
// packages/content/schemas/project.ts
export default {
  name: 'project',
  type: 'document',
  fields: [
    { name: 'title', type: 'string' },
    { name: 'slug', type: 'slug' },
    { name: 'description', type: 'text' },
    { name: 'featured', type: 'boolean' },
    { name: 'client', type: 'string' },
    { name: 'year', type: 'number' },
    { name: 'heroImage', type: 'image' },
    { name: 'modules', type: 'array', of: [
      { type: 'hero' },
      { type: 'richText' },
      { type: 'galleryGrid' }
    ]}
  ]
}
```

Both studios now import from `@kol/content`, ensuring they stay in sync.

[IMAGE: Diagram showing two studio instances both importing from a shared packages/content folder]

### Phase 3: Create a Shared Design System
This is where Design System 2.0 (covered in the previous post) came in. We created `packages/ui` with:
- `theme.css` - Tailwind v4 design tokens
- Shared components (buttons, cards, typography primitives)
- Utility functions (theme management, responsive helpers)

The key insight: **start with tokens, not components**. If projects can't agree on colors and spacing, they'll never agree on button styles.

### Phase 4: Migrate the Font Viewer
The font viewer was the simplest application to migrate because it had no backend dependencies:

```bash
# Simple file migration
cp -r ~/git/kolkrabbi-fontviewer/src packages/fontviewer/src
cp -r ~/git/kolkrabbi-fontviewer/public packages/fontviewer/public
```

We refactored it to use shared design tokens:
```javascript
// Before: Hardcoded styles
const containerStyle = {
  backgroundColor: '#ffffff',
  color: '#171717',
  padding: '2rem'
};

// After: Using theme tokens
const containerStyle = {
  backgroundColor: 'var(--color-surface-primary)',
  color: 'var(--color-content-primary)',
  padding: 'var(--spacing-8)'
};
```

This provided proof-of-concept that shared tokens could work across different applications.

### Phase 5: Migrate the Main Website
The website migration was the most complex because it included:
- React Router setup with nested routes
- Sanity GROQ queries for content
- PortableText rendering
- Server-side data fetching

We took an incremental approach, starting with static routes:

```jsx
// apps/web/src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/work" element={<WorkList />} />
        <Route path="/work/:slug" element={<WorkDetail />} />
        <Route path="/fonts" element={<FontList />} />
      </Routes>
    </BrowserRouter>
  );
}
```

Content fetching was centralized in a `sanity` utility:

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
      heroImage
    }
  `);
}
```

We migrated the home page last because it had the most custom animations and dependencies. This turned out to be wise—by the time we got to it, we'd learned all the patterns and could migrate it cleanly in one session.

### Phase 6: Migrate Foundry
Foundry was tricky because it had its own routing and state management:

```jsx
// apps/foundry/src/App.jsx
function App() {
  const [activeSection, setActiveSection] = useState('overview');
  
  return (
    <div className="foundry-container">
      <Sidebar 
        activeSection={activeSection}
        onSectionChange={setActiveSection}
      />
      <MainContent section={activeSection} />
    </div>
  );
}
```

We preserved its structure but swapped out all hardcoded styles for shared tokens:

```jsx
// Before: Hardcoded dark mode
<Card style={{ 
  backgroundColor: isDark ? '#171717' : '#ffffff',
  color: isDark ? '#fafafa' : '#171717'
}}>

// After: Semantic tokens handle dark mode automatically
<Card className="bg-surface-secondary text-content-primary">
```

This required careful testing—Foundry's UI is dense with controls, and we needed to ensure nothing broke.

[IMAGE: Side-by-side comparison of Foundry before and after migration, showing consistent theming]

### Phase 7: Configure Studio Instances
The studios were last because they had the least code to migrate—just configuration:

```typescript
// apps/studio-cms1/sanity.config.ts
import { defineConfig } from 'sanity';
import { schemas } from '@kol/content';

export default defineConfig({
  projectId: process.env.SANITY_STUDIO_PROJECT_ID!,
  dataset: process.env.SANITY_STUDIO_DATASET!,
  schema: {
    types: schemas
  }
});
```

Both studios now share schemas, ensuring content models stay synchronized.

## The Tools: What Made It Possible

Several tools were critical to successful migration:

**Yarn Workspaces** handled dependency deduplication. Instead of four `node_modules` folders totaling 2GB, we have one at 600MB.

**Turborepo** orchestrated builds with caching:
```json
{
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**"]
    },
    "dev": {
      "cache": false,
      "persistent": true
    }
  }
}
```

This means `turbo build` automatically builds dependencies in the right order, caching results to avoid redundant work.

**Internal packages** used `@kol/*` namespace:
```json
{
  "name": "@kol/ui",
  "version": "0.0.0",
  "exports": {
    "./theme.css": "./theme.css",
    "./Button": "./src/components/Button.jsx"
  }
}
```

The `exports` field gave us fine-grained control over what could be imported.

## The Challenges: What We Learned the Hard Way

Not everything went smoothly. Here are the pitfalls we encountered:

**Import path confusion**: Moving from four repos to one meant old imports broke. We used ESLint to catch `../../packages/ui` (wrong) vs `@kol/ui` (right).

**Circular dependencies**: When everything is in one repo, it's easier to create import cycles. We enforced a strict layer architecture:
- `packages/ui` → no app imports
- `packages/content` → no app imports  
- `apps/*` → can import from packages

**Turbo cache invalidation**: Early on, Turbo's cache would serve stale builds. We learned to use `--force` during active development and trust caching in CI only.

**Environment variables**: Each app needed its own `.env` file, but they lived at the root. We used a naming convention:
```bash
# .env
VITE_SANITY_PROJECT_ID_WEB=xyz
VITE_SANITY_PROJECT_ID_FOUNDRY=abc
VITE_SANITY_DATASET_WEB=production
```

**Git history loss**: Migrating code meant losing per-file git history. We documented this in `MIGRATION-STATUS.md` so future devs know where to look for historical context.

## The Payoff: What We Gained

Three months after completing migration, the benefits are undeniable:

**Development velocity**: Updating a shared component now takes minutes instead of hours. No more syncing changes across repos.

**Consistency**: Everything uses the same design tokens, the same components, the same patterns. The entire product feels cohesive.

**Confidence**: Atomic commits mean we can change a schema and update all consumers in a single PR. No more "hope it works in production."

**Onboarding**: New developers (or LLMs assisting us) can learn one architecture and apply it everywhere.

**Build times**: Turborepo's caching means clean builds take 30 seconds instead of 5 minutes.

But the biggest win is psychological: **we stopped fighting our tools and started shipping features**.

## Advice for Your Migration

If you're considering a similar consolidation, here's what we'd recommend:

1. **Start with a clear migration plan**. Document phases, deliverables, and success criteria. Ours lives in `docs/status/migration-status-board.md`.

2. **Migrate shared code first**. Get your content schemas and design tokens into shared packages before touching applications.

3. **Keep old repos around**. We didn't delete the original repos for 3 months. This safety net gave us confidence to move fast.

4. **Write LLM-friendly rules**. Our `LLM_RULES.md` and `RULES_STRUCTURE.md` ensure any AI assistant (or human) can understand the architecture in 5 minutes.

5. **Test incrementally**. We deployed each migrated app to staging immediately. Early deployments catch integration issues.

6. **Document everything**. Three months from now, you won't remember why you made certain decisions. Write it down.

7. **Accept imperfection**. Our first migrated app had issues. We fixed them and learned for the next one. Don't let perfection paralysis stop you.

## What's Next

Migration is complete, but the monorepo continues to evolve:
- Exploring **shared API layer** for Sanity queries
- Adding **end-to-end testing** with Playwright
- Considering **container-based deployments** to simplify CI/CD
- Investigating **incremental static regeneration** for better performance

But these are optimizations, not crises. The foundation is solid, and we can build with confidence.

The monorepo was scary to commit to, but in hindsight, it was the right call. Our only regret? Not doing it sooner.

---

## Sources
1. Migration Status Documentation - `docs/status/migration-status-board.md`
2. Agent Context & Session Logs - `docs/AGENT-CONTEXT.md`, `docs/SESSION-LOGS/`
3. Monorepo Structure Rules - `docs/RULES_STRUCTURE.md`
4. LLM Rules & Guidelines - `LLM_RULES.md`
5. Content Package Migration - `docs/SESSION-LOGS/2025-10-04-content-package.md`
6. UI Package Consolidation - `docs/SESSION-LOGS/2025-10-04-ui-package.md`
7. Home Page Migration Plan - `docs/SESSION-LOGS/2025-10-07-HOME-MIGRATION-PLAN.md`
