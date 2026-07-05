---
Title: Foundation Index
Version: 1.1.0
Date: 2026-02-17
Status: Active
Content-Type: index
tags: [foundation, index, architecture, monorepo]
Category: foundation
---

# Foundation Index

## Overview

| GitHub | Figma |
|--------|-------|
| [monorepo](https://github.com/Tor-Grimsson/repo-mono) | design file (coming soon) |

This section contains foundational documentation for the kolkrabbi monorepo, covering repository architecture, naming conventions, build systems, and core utilities. These documents establish the structural and organizational principles that underpin the entire project.

---

## Foundation Topics

| Title | Focus |
|-------|-------|
| Foundation Index (this doc) | Overview and navigation |
| [Repository Structure](01-repository-structure.md) | Monorepo architecture, packages, apps, directory tree |
| [Naming Conventions](02-naming-conventions.md) | File, code, asset, and git naming standards |
| [Markdown Parser](03-markdown-parser.md) | Documentation parser implementation |
| [Build System](04-build-system.md) | Turborepo, caching, CI/CD |
| [Navigation System](05-navigation-system.md) | Site navigation, routing, layout |
| [CSS Architecture](06-css-architecture.md) | Layer model, import order, recipe ownership |
| [Writing Guidelines](07-writing-guidelines.md) | Documentation writing standards and conventions |
| [Social Crawlers & OG Metadata](08-social-crawlers.md) | Edge injection proxy for OG metadata |
| [Dev Servers](09-dev-servers.md) | All dev server ports, commands, bundlers |

---

## Quick Reference

### Monorepo Structure
```
kolkrabbi-monorepo/
├── apps/
│   ├── web/              # Marketing site (React, Vite)
│   └── studio/           # Sanity CMS
├── packages/
│   ├── ui/               # Design system (@kol/ui)
│   ├── content/          # Content types & schemas
│   └── fontviewer/       # Font specimen viewer
└── docs/                 # Documentation
```

### Key Packages

**@kol/ui** - Design system component library
- Atoms, molecules, organisms (atomic design)
- CSS design tokens and utilities
- SVG illustrations and logomarks

**@kol/content** - Shared TypeScript types and Sanity schemas

**@kol/fontviewer** - Interactive font specimen viewer

### Development Commands

```bash
# Run web app
yarn dev:web

# Run studio
yarn dev:studio

# Build all packages
yarn build

# Lint all code
yarn lint
```

---

## Architecture Principles

### Monorepo Benefits
- **Shared dependencies**: Single `yarn.lock`, consistent versions
- **Atomic updates**: Change once, propagates everywhere
- **Build efficiency**: Turborepo caching, parallel builds

### Ownership Model
- Each package/app is self-contained with own `package.json`
- Shared packages (`ui`, `content`) are universal
- Apps (`web`, `studio`) are specific implementations

---

## Related Documentation

**Design System:**
- [Design System Index](../02-design-system/INDEX.md) - Design tokens, components

**Operations:**
- [Operations Index](../../operations/INDEX.md) - Development workflow, infrastructure, creative tooling

**Docs:**
- [Docs Overview](../00-docs/INDEX.md) - How this documentation works

---

**Last Updated:** 2026-02-17
