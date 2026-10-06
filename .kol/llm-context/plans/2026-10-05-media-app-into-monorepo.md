# The media app (kol-r2b2) moves into the monorepo — scope

**Date:** 2026-10-05 · read-only scope, nothing changed. Sources: `~/dev/projects/kol-r2b2` (the MBP checkout), `kol-olina/apps/media`, this repo.
**Question (user):** scope the move of the media app into this monorepo — the move only, not yet pointing Sanity's media at it.
**Verdict:** small code, one real risk. The app is 854 lines of JSX, seven Pages Functions and one Worker; it deploys by CLI to a Pages project that stays as it is, so no hostname, secret or DNS changes. The risk is the design-system jump: the app sits on kol-component 0.215 and this repo keeps one copy of the tier at 0.239.
**State:** GO given 2026-10-05; **steps 1–4 DONE the same day.** Baseline captured at 0.215, the app moved to `apps/media` with `.dev.vars` copied, bumped to the repo's versions (two Button aliases migrated; `IconFrame variant` is still a live prop; both deep imports resolve), built, and rendered against the live API at 1440 and 390 with 0 console errors — buckets, folders and files list as before. **What the package changed on its own** (kol-component 0.215 → 0.239 `MediaLibrary`): the browse header's ROW · COLUMN and grid/list toggles are gone, replaced by a search field and a `…` menu; the column rows are tighter; a focus ring sits on the browser on load. That is the next step the user named — adopting the current media packages — not a defect of the move, so no ticket. Records filed (§4): `media-history/`, `docs/documentation/09-media/`, four operations docs, `ARCHITECTURE.md` §8. Fonts are a symlink to the root set (the theme's variable JetBrains Mono files are there). Screenshots: `_tmp/2026-10-05-media-move/`. **Left:** step 5 (the user's deploy from `apps/media`), step 6 (retiring the old repo and its dotfiles lobby rows).

The Sanity half stays in `2026-10-02-media-app-and-sanity-media-scope.md`, parked.

---

## 1. What moves

| From `kol-r2b2/` | To `apps/media/` | Note |
|---|---|---|
| `src/` (8 files, 854 lines) · `index.html` · `vite.config.js` · `index.css` | same | the app |
| `functions/api/` (7 files) | same | the API, compiled by `wrangler pages deploy` in the same step |
| `wrangler.toml` | same | Pages project `kol-media-admin`, R2 binding `MEDIA_BUCKET` |
| `workers/cdn-proxy/` | same | the Worker behind `b2.` `b2v.` `cdn.` `vault.kolkrabbi.io`; its own `wrangler.toml`, deployed by `deploy:cdn` |
| `scripts/` (6) · `manifests/` (3 tsv) · `config/r2-cors.json` | same | bucket operations and records |
| `public/favicon` · `public/touch-icons` · `manifest.webmanifest` | same | |
| `public/fonts` (6.9 MB, real files) | symlink to root `public/fonts` | if the root set covers what the app uses — checked at step 2 |
| `.dev.vars.example` | same | `.dev.vars` itself (the admin password) is copied by hand, never committed |
| `eslint.config.js` | same | |

Stays behind: `_media/` (49 MB local mirror, not source), `node_modules`, `pnpm-lock.yaml` (this repo's lockfile takes over), `baseline-390.png` · `p1-column.png` (old evidence).

## 2. What the monorepo needs

- **`pnpm-workspace.yaml`:** `allowBuilds: { workerd: true }` — wrangler's runtime has a build script, and pnpm 10 refuses it silently without this (olina found install exits 1). `esbuild` is already ignored harmlessly.
- **Root scripts:** `dev:media` (vite, port **5177**, `/api` proxied to `admin.kolkrabbi.io` as today) · `media:cf` (`wrangler pages dev`, functions locally) · `media:deploy` · `media:cdn-deploy`.
- **Turbo:** `build` picks the app up through `apps/*`; nothing to add.
- **React:** the app is on ^19.2.5; the workspace pins 19.2.8. Fine.

## 3. The design-system jump

| Package | r2b2 today | this repo | 
|---|---|---|
| kol-component | ^0.215.0 | ^0.239.1 |
| kol-framework | 0.44.0 (exact) | ^0.49.0 |
| kol-icons | ^0.27.0 | ^0.33.1 |
| kol-theme | ^0.145.0 | 0.166.0 |
| kol-media-client | ^0.4.0 | ^0.4.0 |

Known from reading the source: six deprecated-alias uses from the 10-02 retirement list (`Button variant="ghost"` · `variant="secondary"` · `IconFrame variant="primary"` ×4), and two deep imports that can move between versions — `@kolkrabbi/kol-component/hooks/useMediaQuery` and `@kolkrabbi/kol-framework/src/theme.js`. The web app's own jump of this size (10-02) found one build break and two silent ones, so the law from that day applies: **render the app at its current versions first, then bump, then diff.**

## 4. Where its records go

The repo carries its own context, docs and lobby. None of it is deleted; it is filed where this repo keeps such things.

| kol-r2b2 | Lands as |
|---|---|
| `.kol/llm-context/ARCHITECTURE.md` §1–4 (two buckets, the repo is never the store · API-first · one deploy target · Basic Auth) | a `§8 — Media app` block in this repo's `ARCHITECTURE.md` |
| `AGENT-CONTEXT.md` · `HISTORY.md` · 19 session logs · `playbook/` · `llm-plan/` (2) | `.kol/llm-context/media-history/`, as they are |
| `docs/documentation/06-buckets` · `07-app` · `00-system` | `docs/documentation/09-media/` |
| `docs/operations/03-deploy.md` · `04-r2-cors.md` · `01-setup-summary.md` · `02-bitwarden-setup.md` | `docs/operations/02-infrastructure/` |
| `docs/documentation/01-colors` · `02-typography` · `03-breakpoints` · `04-components` · `05-icons` | `_tmp/` — the app's old notes on the design system, which `ui.kolkrabbi.io` owns |
| `lobby/` (0 queued · 1 done · 33 receipts · the ledger) | `.kol/llm-context/media-history/lobby/`; new tickets about the app file from here as kol-website |

The dotfiles lobby registry lists `kol-r2b2` at `~/dev/projects/kol-r2b2/lobby` with its own flag (`01-registry.md`, `05-lookup.md`, `ref/lobby.md`). Those rows retire when the repo does — a dotfiles ticket, or the user's edit.

## 5. Deploy stays where it is

There is no git integration: a deploy is `vite build && wrangler pages deploy dist`, run locally, to the Pages project `kol-media-admin`. The hostnames `admin.kolkrabbi.io` and `media.kolkrabbi.io`, the R2 binding and the secrets (`ADMIN_PASSWORD` · `B2_KEY_ID` · `B2_APP_KEY` · `B2_BUCKET`) are on that project and do not move. The first deploy from `apps/media` is the proof the move is complete. Brand's `mediaClient.js` reads the admin API by hostname and needs nothing.

## 6. Steps

1. **Baseline.** Build the app in its own repo at its current versions and capture its views at 1440 and 390 (the browse columns, kind overview, upload, settings) with `/api` on production.
2. **Move the files** (§1), add the workspace setting and the scripts (§2). Fonts: symlink if the root set covers the app, else keep its folder.
3. **Bump to this repo's versions**, migrate the six aliases and whatever the build and the render turn up, and diff against the baseline. Anything the package broke goes out as one ticket, after everything is rendered.
4. **File the records** (§4) and add `§8` to `ARCHITECTURE.md`.
5. **User:** `pnpm media:deploy` from the new place; both hostnames checked. The CDN worker is not redeployed — nothing in it changes.
6. **User:** the old repo is retired when he is satisfied; until then it is the untouched fallback.

## 9. Queued after the move (user, 2026-10-05)

1. **One hostname: `media.kolkrabbi.io` only; `admin.` retires.** *Code DONE 2026-10-05 and built; the deploy itself is the user's (the agent is not permitted to deploy to production): `READ_ONLY_HOST` gone, R2 writable everywhere the login allows; `functions/_middleware.js` 301s every `admin.` request to the same path on `media.`; brand's Library link and the dev proxy repointed; ARCHITECTURE §8 amended. After the deploy: a kol-ds-ui ticket for `kol-media-client`'s `adminBase` default (its own comment says it moves to `media.` once media fronts the app), the dotfiles edits, then detach `admin.` through the Cloudflare API and delete the redirect.* Two hosts for one app is backwards. Olina's model: the app IS the admin, writes are gated by Basic auth in `functions/api/_middleware.js`, not by hostname. Here: `READ_ONLY_HOST` in `apps/media/src/lib/api.js` goes (buckets writable everywhere the auth allows); `apps/media/vite.config.js` proxies to `media.`; `apps/brand/src/pages/Library.jsx` reads the API at `media.`; dotfiles `bin/bucket-tree.sh` and the `kol-bucket-r2` / `kol-cdn-overview` skills name `admin.` and need the same edit (a dotfiles ticket); `ARCHITECTURE.md` §8 amended. Cloudflare side (the user's): remove the `admin.` custom domain from the Pages project and its DNS record. Order: deploy first from `apps/media` (step 5), then this.
2. **Adopt the current media packages — DONE 2026-10-06, deployed.** `App.jsx` is the shape of kol-ds-ui's own `apps/media` on the live API: `PageShell mode="fixed"` (kol-shell ^0.61.0 added) around ONE `MediaLibrary variant="explorer"` with the explorer's keys, `onKinds` → `KindOverview`, `settingsFooter` → the theme chip, `fileActions` (rename · move · remove on `/api/rename` + `/api/object`) and `onDropFiles` on `/api/upload`, the S sheet on kol-shell's `ShortcutsOverlay`; `UploadZone` stays as the pick-files pool. Gone: the stacked `library` surface, the app's own phone tabs, `useMediaQuery`; `settings.js` no longer forces the wall's layout off. Measured at 1440 and 390 against the live API: header, crumb, search, columns, K/F/B/S keys, 0 errors. **One defect, ticketed:** `autoFocus` scrolls the fixed page by the header's 102px on load → `explorer-autofocus-scrolls-the-fixed-page`; `autoFocus` is off until it returns (the port's one stopgap). `phoneTabs` is off like the DS's app — on, its pill sat over the crumb at 390.
3. **Sanity media onto the bucket** — the 10-02 plan, still parked; its base-code pick (permanent keys + D1, olina's model) is unchanged by the move.

## 7. Out of scope

- Sanity media onto the bucket, D1 and permanent keys, one-admin-or-two — all in the 10-02 plan.
- A `media` page on the workshop hub — the user's call (default out, from the hub plan).
- Any change to what the app does.

## 8. Needed from the user

- The go.
- `.dev.vars` copied into `apps/media/` (or his word that I may copy it from the old checkout).
- Step 5, and the dotfiles registry rows when the old repo retires.
