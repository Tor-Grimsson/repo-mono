---
name: kol-sources-manifest-broken-under-pnpm
description: "Never trust kol-theme's kol-sources.css @source manifest in pnpm repos — declare explicit app-side @source lines per installed raw-JSX package or package utilities silently vanish"
metadata: 
  node_type: memory
  type: project
  originSessionId: 46c85840-2463-4371-a378-4c69b9e5eb13
  modified: 2026-08-08T22:26:21.122Z
---

kol-theme ships `kol-sources.css`, an `@source` manifest meant to register every raw-JSX `@kolkrabbi/*` package with Tailwind v4. Its paths are sibling-relative (`../kol-workshop/src`) and resolve against the file's real location — under pnpm that's kol-theme's own virtual-store dir, which contains none of the sibling packages. Result: zero package utilities generated, silent (chrome renders unstyled/stacked; found 2026-08-08 when the workshop shell collapsed).

**Why:** Tailwind skips node_modules in auto-detection; every raw-JSX package needs an explicit `@source`, and the DS-shipped manifest can't deliver it under pnpm.

**How to apply:** in each app's entry CSS, declare `@source "../node_modules/@kolkrabbi/<pkg>/src";` per installed raw-JSX package — the pattern kol-ds-ui's own showcase uses. Both kol-website apps carry the full list as of 2026-08-08. When a new raw-JSX package is installed, add its line in the same edit as the dependency ([[build-green-is-not-verified]] — the failure is dev-AND-build-green, visually broken).
