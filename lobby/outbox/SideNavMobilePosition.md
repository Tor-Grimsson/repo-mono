# SideNavMobilePosition — every consumer page opens one viewport down on phones

**Filed:** 2026-08-25 → **kol-ds-ui**
**Entry:** `~/dev/projects/kol-ds-ui/lobby/inbox/SideNavMobilePosition.md`
**Ledger:** `~/dev/projects/kol-ds-ui/lobby/INDEX.md` — **the truth about this ticket**
**Last known:** 🔵 `filed` · 2026-08-25

## Why it went there

The package SideNav's className carries Tailwind `sticky top-0 self-start h-dvh`; below 768px `kol-framework.css:238` wants `position: fixed` and loses. The drawer stays in flow, the grid gives it an 852px row, content starts at y=852 — probe-verified on brand at 393. DS-internal: brand passes nothing that could cause it. Source: `.kol/llm-context/plans/2026-08-25-mobile-audit-web-brand.md`.

## Remainder here once it ships

bump kol-framework; **delete the stopgap block** at the end of `apps/brand/src/styles/sidenav-collapse.css` (`@media (max-width:767px) .kol-brand-layout .kol-sidenav { position: fixed }`)
