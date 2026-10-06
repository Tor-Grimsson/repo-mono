---
title: Dev Servers
type: reference
status: active
updated: 2026-10-05
description: Dev server ports, commands, and bundlers for every app in the monorepo — web, studio, brand, metrics, media, and video.
aliases:
  - dev-servers
tags:
  - project/kol-monorepo
  - domain/foundation
  - domain/dev-servers
audience: internal
---

## Overview

The monorepo runs multiple independent dev servers. Each app has its own bundler, port, and Turbo script. They can run simultaneously without conflict.

---

## Server Reference

| App | Command | Bundler | Port (preferred) | Language | Notes |
|-----|---------|---------|------|----------|-------|
| `apps/web` | `pnpm dev` (turbo filter `web`) | Vite | 5173 | JSX | Main public site. Tailwind v4 via `@tailwindcss/vite`. |
| `apps/studio` | `pnpm dev` (turbo filter `studio`) | Sanity CLI | 3333 | TS | Sanity Studio for CMS content editing. |
| `apps/brand` | `pnpm dev` (turbo filter `brand`) | Vite | 5174 | JSX | Brand site + editor. |
| `apps/metrics` | `pnpm dev:metrics` (turbo filter `metrics`) | Vite | 5176 | JSX | The metrics dashboard (added 2026-10-05). Not part of the root `pnpm dev`. Its `api/` functions only run on Vercel, so locally `/api` is proxied to the deployed ones — the target is the `API` constant in `apps/metrics/vite.config.js`. |
| `apps/media` | `pnpm dev:media` (turbo filter `media`) | Vite | 5177 | JSX | The media admin (moved in from kol-r2b2 2026-10-05). Not part of the root `pnpm dev`. `/api` is proxied to `admin.kolkrabbi.io`; `pnpm media:cf` runs the functions locally through wrangler. |
| `apps/video` | — | Webpack (Remotion) | 3000 | TS | Remotion Studio for programmatic video. Tailwind v4 via `@tailwindcss/postcss`. |

All dev servers are **network-open** (`host: true` / `--host 0.0.0.0`) and ports are **preferred, not pinned** (`strictPort: false` — vite hops to the next free port if taken; changed 2026-07-08).

> ⚠️ **Sanity CORS is allowlisted per-origin.** On a hopped port the page renders but Sanity
> data fetches fail with CORS errors. Add dev origins in Sanity Manage → API → CORS.

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

**Last Updated:** 2026-10-05
