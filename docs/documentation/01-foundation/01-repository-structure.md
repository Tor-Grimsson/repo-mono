---
title: Repository Structure
type: reference
status: active
updated: 2026-02-17
description: The kolkrabbi monorepo's directory structure, package organization, and development workflow across apps, shared packages, and configuration.
aliases:
  - repository-structure
tags:
  - project/kol-monorepo
  - domain/foundation
  - domain/repository-structure
related:
  - "[[INDEX|foundation index]]"
  - "[[02-naming-conventions|naming conventions]]"
  - "[[04-build-system|build system]]"
---

# Repository Structure

## Overview

This document describes the kolkrabbi monorepo architecture, directory structure, and organizational principles. The monorepo uses Turborepo for build orchestration, Yarn workspaces for dependency management, and atomic design for component organization.

---

## Architecture Principles

### 1. Monorepo Benefits

**Shared Dependencies:**
- Common packages (`ui`, `content`, `fontviewer`) shared across all apps
- Single `yarn.lock` file for all dependencies
- Consistent versions across entire project
- Simplified dependency updates

**Atomic Updates:**
- Update design system once in `packages/ui`, propagates everywhere
- Fix a bug in a shared component, fix applies to all apps
- Maintain consistency across applications automatically

**Build Efficiency:**
- Turborepo caches build artifacts
- Only rebuilds packages that changed
- Parallel builds across the dependency graph
- Incremental builds for faster development

### 2. Ownership Model

**Each package/app is self-contained:**
- Has its own `package.json`
- Defines its own dependencies
- Exports its own public API
- Owns its own build configuration

**Shared packages are universal:**
- `packages/ui` - Can be used by any app
- `packages/content` - Shared TypeScript types
- `packages/fontviewer` - Reusable component

**Apps are specific:**
- `apps/web` - Marketing site and design system showcase
- `apps/studio` - Sanity Studio CMS

---

## Directory Structure

```
kolkrabbi-monorepo/
├── .git/                          # Git version control
├── .turbo/                        # Turborepo cache configuration
├── .yarn/                         # Yarn cache and plugins
├── .yarnrc.yml                    # Yarn configuration
├── package.json                   # Root package.json (workspaces)
├── yarn.lock                      # Dependency lockfile
├── turbo.json                     # Turborepo pipeline config
├── README.md                      # Project overview
│
├── apps/                          # Applications
│   ├── web/                       # Main marketing site
│   │   ├── src/
│   │   │   ├── App.jsx            # Routes and app structure
│   │   │   ├── main.jsx           # React entry point
│   │   │   ├── routes/            # Page components
│   │   │   │   ├── Home.jsx
│   │   │   │   ├── Work.jsx
│   │   │   │   ├── Foundry.jsx
│   │   │   │   ├── Stack.jsx
│   │   │   │   ├── Styleguide.jsx
│   │   │   │   └── styleguide/    # Styleguide pages
│   │   │   ├── components/        # React components
│   │   │   │   ├── layout/        # Layout components
│   │   │   │   ├── sections/      # Page sections
│   │   │   │   │   ├── home/      # Home page sections
│   │   │   │   │   ├── work/      # Work page sections
│   │   │   │   │   ├── foundry/   # Foundry page sections
│   │   │   │   │   └── collections/ # Collection sections
│   │   │   │   ├── prose/         # Prose typography components
│   │   │   │   ├── styleguide/    # Styleguide-specific components
│   │   │   │   └── ui/            # UI components (from packages/ui)
│   │   │   ├── data/              # Static data and queries
│   │   │   ├── lib/               # Utilities and clients
│   │   │   │   └── sanityClient.js
│   │   │   └── context/           # React context providers
│   │   ├── public/                # Static assets
│   │   │   ├── svg/               # SVG icons and illustrations
│   │   │   └── fonts/             # Font files
│   │   ├── package.json
│   │   └── vite.config.js
│   │
│   └── studio/                    # Sanity Studio CMS
│       ├── src/
│       │   ├── components/        # Studio custom components
│       │   └── schemas/           # Sanity schema definitions
│       ├── sanity.config.ts       # Sanity configuration
│       ├── package.json
│       └── tsconfig.json
│
├── packages/                      # Shared packages
│   ├── ui/                        # Design system components
│   │   ├── src/
│   │   │   ├── atoms/             # Atomic components
│   │   │   │   ├── Button.jsx
│   │   │   │   ├── Input.jsx
│   │   │   │   └── icons/         # Icon SVGs
│   │   │   ├── molecules/         # Molecular components
│   │   │   │   ├── Card.jsx
│   │   │   │   └── Badge.jsx
│   │   │   ├── organisms/         # Organism components
│   │   │   │   └── DataTable.jsx
│   │   │   ├── illustrations/     # Illustration SVGs
│   │   │   │   └── svg/           # Illustration files
│   │   │   └── logos/             # Logomark SVGs
│   │   │       └── svg/           # Logomark files
│   │   ├── css/                   # Design system styles
│   │   │   ├── theme.css          # Design tokens (CSS variables)
│   │   │   ├── components.css     # Component styles
│   │   │   ├── utilities.css      # Utility classes
│   │   │   └── prose.css          # Typography styles
│   │   └── package.json
│   │
│   ├── content/                   # Content types and schemas
│   │   ├── src/
│   │   │   ├── sanity/            # Sanity schema definitions
│   │   │   └── types/             # TypeScript types
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   └── fontviewer/                # Font specimen viewer
│       ├── src/
│       │   └── components/        # Font viewer components
│       ├── package.json
│       └── tsconfig.json
│
└── docs/                          # Documentation
    ├── system/                    # Design system documentation
    │   ├── 0.x.x-metadata-*.md    # Documentation system
    │   ├── 1.x.x-foundation-*.md  # Architecture docs
    │   ├── 2.x.x-design-system-*.md # Design system docs
    │   └── archive/               # Archived/deprecated docs
    ├── archive/                   # Long-term storage
    ├── applications/              # App-specific docs
    ├── blog-posts/                # Blog content
    ├── components/                # Component docs (legacy)
    ├── operations/                # Operational docs
    └── status/                    # Status and roadmap
```

---

## Package Structure

### apps/web (React Application)

**Purpose:** Main marketing website and design system showcase

**Technology Stack:**
- React 19
- Vite (build tool)
- React Router (routing)
- Tailwind CSS v4 (styling)
- Sanity CMS (content management)

**Key Features:**
- Homepage with hero, highlights, and work showcase
- Foundry page for typography demonstrations
- Stack page for technology showcase
- Work portfolio with detail pages
- Styleguide with interactive component demos
- Custom cursor system
- Responsive design (mobile-first)

**Build Configuration:**
```json
{
  "name": "web",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

### apps/studio (Sanity Studio)

**Purpose:** Content management interface

**Technology Stack:**
- Sanity Studio
- TypeScript
- GROQ (query language)

**Key Features:**
- Custom schemas for projects, media, settings
- Real-time collaboration
- Media management
- Preview integration

**Build Configuration:**
```json
{
  "name": "studio",
  "scripts": {
    "dev": "sanity dev",
    "build": "sanity build",
    "deploy": "sanity deploy"
  }
}
```

### packages/ui (Design System)

**Purpose:** Shared component library and design tokens

**Structure:**
- **Atoms:** Basic building blocks (Button, Input, Icon)
- **Molecules:** Simple combinations (Card, Badge)
- **Organisms:** Complex components (DataTable, Navigation)
- **CSS:** Design tokens and utilities
- **Assets:** SVG illustrations and logomarks

**Atomic Design Methodology:**
```
Atoms → Molecules → Organisms → Templates → Pages
```

**Export Pattern:**
```javascript
// packages/ui/src/index.js
export { Button } from './atoms/Button'
export { Card } from './molecules/Card'
export { DataTable } from './organisms/DataTable'
```

**Import in Apps:**
```javascript
import { Button } from '@kol/ui'
```

### packages/content (Content Types)

**Purpose:** Shared TypeScript types and Sanity schemas

**Contents:**
- TypeScript interfaces for all content types
- Sanity schema definitions
- GROQ query helpers
- Content validation

**Usage:**
```typescript
import { Project } from '@kol/content'

// Type-safe content
const project: Project = {
  title: 'Example',
  slug: 'example',
  // ... other fields
}
```

### packages/fontviewer (Font Specimen)

**Purpose:** Interactive font specimen viewer

**Contents:**
- Font preview components
- Variable font controls
- Type specimen displays
- Font feature toggles

---

## Development Workflow

### Working on Shared Packages

**When to modify `packages/ui`:**
- Adding new design system components
- Updating design tokens
- Creating new utility classes
- Modifying component styles

**Process:**
1. Make changes in `packages/ui/src/`
2. Run `yarn build` to compile package
3. Changes automatically available in all apps
4. No need to publish (local workspace)

**Example:**
```bash
# Add new Button variant
# Edit: packages/ui/src/atoms/Button.jsx
# Build: yarn build
# Use: In apps/web/src/components/
```

### Working on Apps

**When to modify `apps/web`:**
- Building new pages
- Creating page-specific components
- Integrating with Sanity CMS
- Adding route logic

**Process:**
1. Modify components in `apps/web/src/components/`
2. Import from `@kol/ui` for shared components
3. Run `yarn dev:web` to see changes
4. Commit to update design system

### Working on Documentation

**When to modify `docs/`:**
- Adding design system documentation
- Creating component docs
- Writing guides and tutorials
- Capturing architectural decisions

**Process:**
1. Add new docs to `docs/system/`
2. Use M.m.p numbering system
3. Update index files
4. Follow writing guidelines

---

## Environment Configuration

### Required Environment Variables

**For apps/web:**
```bash
# .env.local
VITE_SANITY_PROJECT_ID=your_project_id
VITE_SANITY_DATASET=projects
VITE_SANITY_API_TOKEN=your_token
```

**For apps/studio:**
```bash
# .env.local
SANITY_STUDIO_PROJECT_ID=your_project_id
SANITY_STUDIO_DATASET=projects
SANITY_STUDIO_API_TOKEN=your_token
```

### Configuration Files

**Vite (apps/web):**
```javascript
// apps/web/vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
})
```

**TypeScript (packages):**
```json
{
  "extends": "../../tsconfig.json",
  "compilerOptions": {
    "outDir": "./dist",
    "rootDir": "./src"
  }
}
```

---

## Related Documentation

- [Foundation Index](INDEX.md) - Foundation overview
- [Naming Conventions](02-naming-conventions.md) - File and code naming
- [Build System](04-build-system.md) - Turborepo and build pipeline

---

**Last Updated:** 2026-02-17
