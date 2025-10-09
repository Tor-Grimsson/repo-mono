# kolkrabbi.io Monorepo (Yarn + React/Vite/Tailwind4)

**Rules**
- Apps use **React + Vite + Tailwind 4** with **.jsx** (no TS).
- Only **Sanity Studio + schemas** use **TypeScript**.
- Yarn workspaces (npm only when required).

## Workspaces
- `apps/web` — marketing (React/Vite/TW4, .jsx)
- `apps/studio` — Sanity Studio (TS)
- `apps/foundry` — foundry shell (React/Vite/TW4, .jsx) — optional
- `packages/ui` — shared UI (JS, .jsx) + **`theme.css` (master Tailwind tokens)**
- `packages/content` — Sanity schemas + GROQ (TS)
- `packages/fontviewer` — your viewer package (JS)

See **docs/RULES_STRUCTURE.md** for the single source of truth.


## Multiple Studios
- You now have **apps/studio-cms1** and **apps/studio-cms2**.
- Both import schemas from **@kol/content** but can point to **different Sanity projects/datasets** via their own `.env` files.
- Run them independently:
  - `yarn workspace studio-cms1 run dev`
  - `yarn workspace studio-cms2 run dev`
