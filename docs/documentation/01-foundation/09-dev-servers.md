---
Title: Dev Servers
Date: 2026-03-10
Status: Active
Content-Type: reference
Category: foundation
tags: [foundation, dev-servers, vite, sanity, remotion, webpack, ports]
---

## Overview

The monorepo runs multiple independent dev servers. Each app has its own bundler, port, and Turbo script. They can run simultaneously without conflict.

---

## Server Reference

| App | Command | Bundler | Port | Language | Notes |
|-----|---------|---------|------|----------|-------|
| `apps/web` | `yarn dev:web` | Vite | 5173 | JSX | Main public site. Tailwind v4 via `@tailwindcss/vite`. |
| `apps/studio` | `yarn dev:studio` | Sanity CLI | 3333 | TS | Sanity Studio for CMS content editing. |
| `apps/foundry` | `yarn dev:foundry` | Vite | 5174 | JSX | Standalone foundry app (may embed in web later). |
| `apps/video` | `yarn dev:video` | Webpack (Remotion) | 3000 | TS | Remotion Studio for programmatic video. Tailwind v4 via `@tailwindcss/postcss`. |

All commands are Turbo wrappers defined in root `package.json` (e.g. `"dev:web": "turbo run dev --filter=web"`).

---

## Shared Dependencies

All apps consume `@kol/ui` (design tokens, components, CSS) from `packages/ui/`. React 19 is hoisted at the monorepo root — apps declare it as a `peerDependency`, not a direct dependency.

### CSS Entry Pattern

Each app has its own CSS entry file importing from `@kol/ui`:

```css
@import "tailwindcss";
@import "@kol/ui/theme.css";
@import "@kol/ui/css/components.css";
@import "@kol/ui/css/utilities.css";
```

Additional CSS modules (`prose.css`, `docs.css`, `analytics.css`, `chess.css`) are imported only where needed.

---

## Bundler Notes

### Vite (web, foundry)
- Tailwind v4 via `@tailwindcss/vite` plugin
- `import.meta.env` available for environment variables
- `import.meta.glob` available for dynamic imports (used by Icon/Illustration atoms)

### Webpack (video / Remotion)
- Tailwind v4 via `@tailwindcss/postcss` (PostCSS plugin, not Vite plugin)
- `import.meta.glob` is **not available** — `@kol/ui` barrel imports that transitively pull in Icon/Illustration will fail
- `remotion.config.ts` overrides css-loader with `url: false` so font `url()` paths resolve at runtime
- Fonts loaded via symlink: `apps/video/public/fonts/` → `apps/web/public/fonts/`

### Sanity CLI (studio)
- Sanity's own build pipeline, not configurable
- TypeScript required

---

## Related Documentation

- [Build System](04-build-system.md) — Turborepo pipeline, caching, build order
- [Creative Tooling](../../operations/03-creative-tooling/01-creative-tooling.md) — Remotion, Playwright recording, GLIF, Figma MCP

---

**Last Updated:** 2026-03-10
