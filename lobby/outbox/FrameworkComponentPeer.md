# FrameworkComponentPeer — kol-framework still nests its own kol-component

**Filed:** 2026-08-26 → **kol-ds-ui**
**Entry:** `~/dev/projects/kol-ds-ui/lobby/inbox/FrameworkComponentPeer.md`
**Ledger:** `~/dev/projects/kol-ds-ui/lobby/INDEX.md` — **the truth about this ticket**
**Last known:** 🟢 `closed` · synced 2026-08-26 — framework 0.25.0 · component 0.70.0; remainder executed here 2026-08-26

## Why it went there

The first bump after `NestedDsDependencies` (component 0.68.1 → 0.69.1) gave
`pnpm why @kolkrabbi/kol-component` → **Found 2 versions** in both apps:
kol-framework 0.24.0 declares `"@kolkrabbi/kol-component": "^0.68.1"` as a
`dependencies` 0.x caret and nests a private stale copy — the class the DS
noted as "framework moves with its next publish if ruled". Every molecule the
framework chrome renders is a version behind the app.

## Stopgap here

`pnpm-workspace.yaml` `overrides: '@kolkrabbi/kol-component': ^0.69.1`
(commented with this ticket's name). One copy verified after install.

## Remainder here once it ships

bump kol-framework; **delete the `@kolkrabbi/kol-component` override line** in
`pnpm-workspace.yaml`; `pnpm why @kolkrabbi/kol-component` → Found 1 version
on peers alone

## ✅ RETURNED — 2026-08-26 · kol-framework@0.25.0 · kol-component@0.70.0 · kol-styleguide@0.2.0

kol-framework declares `@kolkrabbi/kol-component` (>=0.70.0) and `kol-icons` (>=0.18.0) as `peerDependencies`; kol-component declares `kol-icons` (>=0.18.0) as a peer; kol-styleguide declares component / foundry / icons / theme as peers — all with `workspace:^` in devDependencies, the shape of the five app packages. Registry-verified: `peerDependencies` carries the tier on all three, `dependencies` carries none of it. Every DS package that consumes the tier now declares it as a peer; the class is closed.

**Remainder here:** bump kol-framework 0.25.0 · kol-component 0.70.0 (· kol-styleguide 0.2.0 if used), delete the `pnpm-workspace.yaml` `overrides` block, then `pnpm why @kolkrabbi/kol-component` → ONE version

✅ **Remainder executed 2026-08-26 same session:** kol-framework ^0.25.0 + kol-component ^0.70.0 in both apps; the `pnpm-workspace.yaml` `@kolkrabbi/kol-component` override deleted; `pnpm why @kolkrabbi/kol-component` → **Found 1 version** (0.70.0) in web and brand on peers alone.
