# SideNavMobilePosition — every consumer page opens one viewport down on phones

**Filed:** 2026-08-25 → **kol-ds-ui**
**Entry:** `~/dev/projects/kol-ds-ui/lobby/inbox/SideNavMobilePosition.md`
**Ledger:** `~/dev/projects/kol-ds-ui/lobby/INDEX.md` — **the truth about this ticket**
**Last known:** 🟢 `closed` · synced 2026-08-26 — kol-framework 0.23.0; remainder executed here 2026-08-26

## Why it went there

The package SideNav's className carries Tailwind `sticky top-0 self-start h-dvh`; below 768px `kol-framework.css:238` wants `position: fixed` and loses. The drawer stays in flow, the grid gives it an 852px row, content starts at y=852 — probe-verified on brand at 393. DS-internal: brand passes nothing that could cause it. Source: `.kol/llm-context/plans/2026-08-25-mobile-audit-web-brand.md`.

## Remainder here once it ships

bump kol-framework; **delete the stopgap block** at the end of `apps/brand/src/styles/sidenav-collapse.css` (`@media (max-width:767px) .kol-brand-layout .kol-sidenav { position: fixed }`)

## ✅ RETURNED — 2026-08-26 · kol-framework@0.23.0

The aside box moved into `.kol-sidenav` (kol-framework.css) — `position: sticky; top: 0; align-self: start; height: 100dvh; display: flex; flex-direction: column; z-index: var(--kol-z-sticky)` — and the seven utilities left the className; only the colour utilities ride the element now. Same law as 0.15.2 hop fix, one element up: a utility outranks every rule in this layered sheet, so the 767px drawer block `position: fixed` could never win while `sticky` sat on the element. Declared in the rule, the drawer block beats it by source order. Verified by replaying the exact change on brand production DOM (stopgap rule deleted, utilities stripped, the rule + drawer block injected in file order): 393 → aside `fixed` at x=-280, content top 0; 1280 → `sticky`, 256 wide, holds at top through a 600px page scroll. 20 gates clean.

**Remainder here:** bump kol-framework >=0.23.0; delete the stopgap block at the end of `apps/brand/src/styles/sidenav-collapse.css`; re-walk brand at 393

✅ **Remainder executed 2026-08-26 same session:** kol-framework ^0.23.0 in both apps; the stopgap block deleted from `apps/brand/src/styles/sidenav-collapse.css` (file is 35 lines, two rules). Brand re-walked at 393: aside `fixed` at x=-280, content top 0 (was 852); 1280: `sticky`, 256 wide. Two things the re-walk surfaced now that content starts at the top, both fixed here: the package hamburger (fixed 12,12 40×40) sat on the Gallery page's own sticky header → `pl-16 md:pl-5`; four `/assets` ledes overflowed their column on `packages/component/src/graphics/svg/…` path tokens (document 449 wide) → `break-words` on the PageSection lede. `/assets` measures 393 wide.
