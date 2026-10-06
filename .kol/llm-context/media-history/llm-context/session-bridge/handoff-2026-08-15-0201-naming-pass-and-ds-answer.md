# Handoff — 2026-08-15 02:05

## Goal of the current arc

The bucket arc is **closed** — both B2 buckets front Kolkrabbi hostnames, the admin browses all three with per-bucket settings, and the repo consumes the design system instead of forking it. What remains is one deferred decision (subdomain naming) and one filing waiting on another repo.

## Last actions taken (causal trail, newest first)

- Session log + AGENT-CONTEXT refreshed; stale "NOT deployed" / "cutover not started" status replaced with reality.
- Filed `media-library-non-av-blindness` to `kol-ds-ui/lobby/inbox/` with ledger row and history line.
- Deployed the three-bucket admin; verified 433 · 3443 · 4095 live and the settings strings present in the shipped bundle.
- Installed the DS packages, retired 34 vendored files, switched to deep tier imports (barrel drags `react-router-dom`).
- Built `src/lib/settings.js` + `SettingsPanel` + `KindPreview`; moved display state out of `FileList` into per-bucket settings.
- Moved chess data out of `@kolkrabbi/kol-chess` into `kol-chess`; user published DS **0.6.0** components-only.
- Applied the hostname cutover across 219 files in four repos; deployed `workers/cdn-proxy/`.

## Current state / open decision points

- **Subdomain naming — the one live decision.** User's sketch: `r2.kolkrabbi.io`, `b2-k.kolkrabbi.io`, `b2-v.kolkrabbi.io`, and `admin.` renamed because it implies restricted access it doesn't have (reads are public; only writes are gated). **Constraint:** `media.kolkrabbi.io` is R2's public domain, so the admin cannot take that name without moving R2 first — which would break the two consumer apps until they're updated. A rename means a second cutover sweep; `scripts/cdn-cutover.sh` already models it.
- **Waiting on nobody.** The DS filing is queued in their lobby; nothing here blocks on it.
- Consumer repos were rewritten but not redeployed beyond kol-website's build check.

## Next intended action

Ask which subdomain scheme, then run it: add the new Worker custom domains, extend `scripts/cdn-cutover.sh` with the new patterns, sweep, redeploy. Keep the old hostnames attached during the move — both resolve, so there's no flag day.

## Working memory not yet in AGENT-CONTEXT

- The user's read on `admin.` is right and worth carrying: it names a private tool but serves a public browser. Whatever it becomes should say "browse", not "admin".
- `kol-apps` is mostly retired folders, `kol-chess` is the chess home but reads chess.com directly — neither is a live CDN consumer. Live ones are `kol-website`, `kol-ds-ui` (published packages, so they lag by a release), `kol-vault` (markdown embeds only).
- Two greps failed this session by searching too narrow a scope — `node_modules` excluded (missed the whole chess dependency chain) and `packages`/`apps` only (missed `showcase/`). When asking "does X reference Y", check the dependency graph, not just `src/`.
- `pnpm cdn-cutover` takes ~37s because `kol-vault` is large; `--exclude-dir` pruning is what got it there from >2min.
- The DS's `MediaLibrary` header comment claims it consolidated four forks. This repo was the fifth and the source of the originals — worth remembering when reading upstream docs that describe consumer relationships.
