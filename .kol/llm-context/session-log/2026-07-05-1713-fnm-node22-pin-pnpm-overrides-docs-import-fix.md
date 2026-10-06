# Session: fnm Node-22 pin + pnpm-overrides relocation + docs-import repoint

**Date:** 2026-07-05
**Agent:** Claude (Grim)
**Summary:** Diagnosed and fixed the `pnpm dev` studio crash — root cause was Homebrew silently upgrading global Node to v26, which the old Sanity CLI toolchain (bundled `yargs`) can't run under. Pinned this repo to Node 22 via fnm, relocated the ignored pnpm overrides, and repointed a docs import that the earlier docs reorg had broken. The version-manager infrastructure itself (fnm wiring + a new docs category) was hoisted to `~/.dotfiles` — see that repo's log.

## Changes Made

### Files Modified (this repo)
- `.nvmrc` — **new**, `22`. fnm auto-switches to Node 22 on `cd` into the repo (via the `--use-on-cd` hook wired in dotfiles' `shell/.zshrc`).
- `package.json` — removed the dead `"pnpm": { overrides }` block (pnpm 10.33 no longer reads the `pnpm` field from package.json — it was silently ignored, so the single-React pin wasn't being enforced); added `"engines": { "node": ">=22" }` as an advisory declaration.
- `pnpm-workspace.yaml` — added `overrides: { react: 19.2.6, react-dom: 19.2.6 }` (the correct home in pnpm 10; moved from the dead package.json block).
- `apps/web/src/routes/workshop/Documentations.jsx` — repointed the broken build-time import (and the copy-path button string) from `@docs/documentation/landing.md?raw` → `INDEX.md`. The 2026-07-05 docs reorg hard-deleted `landing.md` (folded into `INDEX.md`) but never updated this consumer, so `pnpm dev` threw a Vite import-analysis error once the studio finally booted.

### Hoisted to `~/.dotfiles` (separate repo, logged there — `session-log/2026-07-05-1707-…`)
- **fnm** added to `brewfile-cli`; the `eval "$(fnm env --use-on-cd)"` hook added to `shell/.zshrc` (global, both machines).
- New **`docs/23-version-management/`** category authored (concept, fnm playbook, manager landscape, shell-rc mechanics) — the cross-language runtime-pinning concept this crash motivated.

## Current State

### Working
- `pnpm dev` boots all three apps — web (5173), brand (5174), and the **studio (3333)** that was crashing. Verified: `node -v` → `v22.23.1` inside the repo, studio starts on `vite@6.4.2`.
- React single-version pin is enforced again (overrides now read from `pnpm-workspace.yaml`).
- Workshop docs landing loads (`INDEX.md` instead of the deleted `landing.md`).

### Known Issues
- **Sanity v4 lands 2026-07-15**, requires Node 20+ (we're on 22, already clear) — but it's a major bump coming in ~10 days; a newer bundled `yargs` will moot this whole crash class when taken.
- `INDEX.md` is a routing index (wikilink table); the workshop's `parseDocsMarkdown` may render it plainer than the old curated `landing.md`. Cosmetic, left as-is — the docs landing is due for redesign around a real content source anyway.
- **Bigger open question raised (not scheduled):** as KOL DS ships as npm packages piping their own docs in, the build-time `?raw` in-repo-docs model breaks down. Externalizing docs to a fetched source (bucket/registry + push-hook) becomes worth it *only* once docs leave this repo — until then, same-repo build-time import is the simpler/safer default (a rename fails loudly at build instead of a silent runtime 404).

## Next Steps
1. **User: commit** — this repo + `~/.dotfiles` (separate commits; all uncommitted, user owns git).
2. Video migration Phase 3 (Sanity CMS patch) — still the standing pre-existing next step, unrelated to this session.
3. Fix the 4 `apps/brand` bio/CV data-staleness items when brand work resumes (see Ongoing status).
