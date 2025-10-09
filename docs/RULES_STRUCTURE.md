# kolkrabbi.io — Rules & Structure (Single Source of Truth)

## Naming
- folders: `lowercase-kebab`
- components: `PascalCase.jsx`
- hooks: `useCamelCase.js`
- utils: `camelCase.js`
- Sanity types: `camelCase` doc names

## Monorepo
```
apps/
  web/        # public website (React/Vite/TW4, .jsx)
  studio/     # Sanity Studio (TS)
  foundry/    # foundry app (React/Vite/TW4, .jsx)
packages/
  ui/         # shared styled components + theme.css
  content/    # Sanity schemas + GROQ (TS)
  fontviewer/ # your viewer (JS)
```
- Root: Yarn workspaces, single `node_modules/`, Turbo pipeline

## Routing (web)
- `/` home
- `/work/` list → `/work/{slug}` (from `project`)
- `/foundry/` (if embedded) or separate app
- `/fonts/` families → optional styles
- `/tools/fontviewer/` (optional dedicated route)

## CSS (Tailwind v4)
- No config file; tokens in **`@theme`** block
- **Shared tokens** in `@kol/ui/theme.css`
- Import in each app’s `index.css`:
```css
@import "tailwindcss";
@import "@kol/ui/theme.css";
```
- App-specific overrides can follow

## Sanity Content Model (summary)
- `project` (formerly `caseStudy`)
- `fontFamily`, `font`
- modules: `hero`, `richText`, `galleryGrid`, `specimenEmbed`
- settings: `navigation`, `siteSettings`

## Webtree (current)
```
kolkrabbi/
├─ apps/
│  ├─ web/
│  ├─ studio/
│  └─ foundry/
└─ packages/
   ├─ ui/
   ├─ content/
   └─ fontviewer/
```
