---
title: Deploy
type: playbook
status: active
updated: 2026-08-27
audience: internal
description: Ship the app and the API to Cloudflare Pages — the one command, what it actually does, the permission rule an agent needs, and how to verify both hostnames afterwards.
aliases:
  - deploy
tags:
  - domain/workflow
  - project/kol-monorepo
  - provider/cloudflare
providers:
  - Cloudflare Pages
  - Cloudflare R2
related:
  - "[[INDEX|operations]]"
  - "[[06-media-setup-summary|setup summary]]"
  - "[[../../documentation/09-media/02-app/INDEX|the app]]"
---

# Deploy

One command ships the UI **and** the API together. There is no git integration and no CI — a deploy is a local build pushed straight to Cloudflare Pages.

## 0. Prerequisites

- `wrangler` authenticated. Check: `pnpm exec wrangler whoami`
- Dependencies installed (`pnpm install`).
- Nothing else. There is no deploy key, no token in the environment, and no pipeline to wait on.

## 1. Verify before shipping

Cheap, and it catches the things a browser would show you a minute later.

```sh
npx eslint src
node src/lib/settings.test.mjs
node src/lib/api.moveKey.test.mjs
```

A green build is **not** proof the app renders. It cannot catch a prop mismatch against a design-system component, a render-phase side effect, or a CSS override whose selector has stopped matching. Look at the running app before you ship a visual change — see [[../../documentation/09-media/02-app/04-local-overrides|local overrides]] for why.

## 2. Deploy

```sh
pnpm deploy
```

That is `vite build && wrangler pages deploy dist`, which:

1. Builds the SPA into `dist/`.
2. Uploads changed assets only (unchanged files are reported as "already uploaded").
3. Compiles `functions/` into Pages Functions — so `/api/*` ships in the same step.
4. Prints a unique preview URL, e.g. `https://<hash>.kol-media-admin.pages.dev`.

The Pages project is **`kol-media-admin`** — the old name, kept because it is the live project. The repo is `kol-r2b2`. Don't rename one to match the other.

Wrangler warns that the working directory has uncommitted changes. That is expected and harmless; the deploy ships the build, not the git state.

## 3. Verify both hostnames

The preview URL is not the deploy target — two custom domains are:

```sh
curl -s -o /dev/null -w "%{http_code}\n" https://admin.kolkrabbi.io/
curl -s -o /dev/null -w "%{http_code}\n" https://media.kolkrabbi.io/
```

Both must be `200`. `admin.` is the writable admin surface and the API base; `media.` is the same bundle read-only. A change that only shows on one of them is a hostname problem, not a build problem — `READ_ONLY_HOST` in `src/lib/api.js` is the switch.

Then hard-reload in the browser. The bundle is fingerprinted, but `index.html` and the CDN edge can both serve a moment behind.

## 4. If an agent is deploying

`pnpm deploy` is an outward-facing action and is blocked by default in auto mode. The permission rule lives in **global** settings (`~/.dotfiles/claude/settings.json`, symlinked to `~/.claude/settings.json`):

```json
"Bash(pnpm deploy:*)",
"Bash(pnpm exec wrangler pages deploy:*)"
```

Editing that file is itself gated: the user opens a window with `config-grant <minutes>`, and the file must be written through its **resolved** path, not the symlink. A rule added mid-session does not apply to that session — it takes effect on the next start.

## 5. Rollback

Pages keeps every deployment. Roll back from the Cloudflare dashboard (Workers & Pages → `kol-media-admin` → Deployments → *Rollback*), or simply redeploy from a known-good working tree — a deploy is a full replacement, not a patch.

## Verification checklist

- [ ] Lint and both test files green
- [ ] `pnpm deploy` printed "Deployment complete"
- [ ] `admin.kolkrabbi.io` → 200
- [ ] `media.kolkrabbi.io` → 200
- [ ] The change is visible after a hard reload
- [ ] Writes still work on `admin.` and are still absent on `media.`

## What is not here

Live state — which version is deployed, what shipped today, what is still local — is **agent state**, in `.kol/llm-context/AGENT-CONTEXT.md`. This doc is the process; that file is the position.
