# Yarn + Vite + Tailwind 4 Cheat Sheet

## Install in a specific app
```bash
yarn workspace web add react react-dom
yarn workspace web add -D vite @vitejs/plugin-react tailwindcss postcss autoprefixer
```

## Run scripts
```bash
yarn dev:web
yarn dev:studio
yarn dev:foundry
yarn build
```

## Add internal packages
```bash
yarn workspace web add @kol/ui@workspace:*
yarn workspace foundry add @kol/content@workspace:*
```

## Tailwind 4 theme (shared)
- Master tokens live in **`@kol/ui/theme.css`**
- Import order in app CSS:
```css
@import "tailwindcss";
@import "@kol/ui/theme.css";
/* app overrides */
```

## Only TS in Sanity
- `apps/studio` and `packages/content` extend `tsconfig.base.json`
- `.jsx` apps ignore TS


---

# What happens when you run `yarn build` (step-by-step)

1) You run `yarn build` at the root.
2) Turbo reads `turbo.json` and sees the `build` pipeline.
3) It builds **dependencies first** for each app/package (`dependsOn: ["^build"]`), e.g. `@kol/ui` and `@kol/content` before `web`/`foundry`.
4) It runs builds in **parallel** where possible, but respects dependency order.
5) Each package emits to `dist/**` (as declared in `outputs`), enabling **caching**.
6) Re-running `yarn build` without changes will be **instant** due to Turbo's cache.
