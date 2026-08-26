# NestedDsDependencies — app packages nest their own stale kol-component / kol-framework; DS fixes never reach this site

**Filed:** 2026-08-26 → **kol-ds-ui**
**Entry:** `~/dev/projects/kol-ds-ui/lobby/inbox/NestedDsDependencies.md`
**Ledger:** `~/dev/projects/kol-ds-ui/lobby/INDEX.md` — **the truth about this ticket**
**Last known:** 🔵 `filed` · 2026-08-26

## Why it went there

The 2026-08-26 bump (component ^0.68.1 · framework ^0.23.0 · theme 0.51.0) changed nothing on the workshop surfaces: the ShellHeader active tab never scrolled (setter trap: zero `scrollLeft` writes on a fresh load) and the docs reader's CodeBlock rendered `white-space: pre` with no line stamps. kol-workshop 0.22.0 declares framework `^0.20.0` and component `^0.39.0` as `dependencies` — 0.x carets that can never reach the current — so pnpm nests **framework 0.20.1 + component 0.39.0** beneath it and `ShellLayout` / `DocumentationReader` import those. Same trap in kol-chess (component 0.38.0), kol-content (0.63.0), kol-foundry (0.52.0), kol-store (**0.8.0**, exact). Only kol-dashboards declares peers. The fix is packaging at the DS — `peerDependencies`, republish — not anything here.

## Stopgap here

Root `package.json` → `pnpm.overrides` forces one copy each of `@kolkrabbi/kol-component` `^0.68.1` · `kol-framework` `^0.23.0` · `kol-theme` `0.51.0` · `kol-icons` `^0.18.0`. Verified at 393 with it: Dashboard tab lands 79–177 in the strip (scrollLeft 268); docs CodeBlock `pre-wrap`, 311/311, 9 stamped lines, 44px lane; `/prints` · `/workshop/chess` · `/foundry/typefaces/malromur` zero console errors. Every named import the five packages take from component/framework/icons exists in the current barrels (54 names, 0 missing).

## Remainder here once it ships

bump the five republished packages; **delete the `pnpm.overrides` block** in root `package.json`; `pnpm install`; confirm `pnpm why @kolkrabbi/kol-component` lists one version

## ✅ RETURNED — 2026-08-26 · kol-workshop@0.23.0 · kol-chess@0.7.0 · kol-content@0.9.0 · kol-foundry@0.6.0 · kol-store@0.2.0

The DS tier is a peer in all five. kol-component · kol-theme · kol-icons (+ kol-framework in workshop) moved from `dependencies` — a 0.x caret, so pnpm nested a private stale copy under each package (component 0.39.0 under workshop, 0.8.0 under store) — to `peerDependencies` with `>=` floors: component >=0.68.1 · framework >=0.23.0 · theme >=0.51.0 · icons >=0.18.0, the versions the ticket's 54-name import walk was made against; `workspace:^` in devDependencies for the showcase — the kol-dashboards / kol-shell shape. Registry-verified on all five: `peerDependencies` carries the tier, `dependencies` carries none of it (workshop keeps kol-brand ^0.1.2, not a DS-tier package). The floors are honest, not lenient — a consumer below them gets a peer warning until it bumps. Not touched, same class, outside the five: kol-framework → component/icons, kol-component → icons and kol-styleguide → component/foundry/icons/theme still declare `dependencies`; framework moves with its next publish if ruled. Topology doc §Dependencies now states the rule; every changelog flags it BREAKING.

**Remainder here:** bump to kol-workshop 0.23.0 · kol-chess 0.7.0 · kol-content 0.9.0 · kol-foundry 0.6.0 · kol-store 0.2.0, delete the root `pnpm.overrides` block, then `pnpm why @kolkrabbi/kol-component` → ONE version (the ticket's own bar)
