# SideNavGrabResize — grab-edge resize + snap-collapse for SideNav

**Filed:** 2026-08-06 → **kol-ds-ui**
**Entry:** `~/dev/projects/kol-ds-ui/lobby/done/SideNavGrabResize.md`
**Ledger:** `~/dev/projects/kol-ds-ui/lobby/INDEX.md` — **the truth about this ticket**
**Last known:** 🟢 `closed` · synced 2026-08-09 — shipped in `@kolkrabbi/kol-framework@0.14.0` (grab edge in SideNav, snap-collapse renderer rebuilt, three `--kol-sidenav-*` tokens); 0.15.0 then replicated brand's whole SideNav into the package, 0.15.1 exported `useDragResize`. ✅ **Remainder executed 2026-08-09:** brand adopted the package SideNav wholesale (`background={false}`) — the entire fork incl. the Button toggle retired to `_tmp/2026-08-09-brand-sidenav-fork-elder/`; `styles/sidenav-collapse.css` reduced to the fg-02 rail plane + the accent override — the `@layer components` cascade defect found during adoption was filed back in-session and fixed same-day in framework 0.15.2 (component boxes moved into package rules), so no workaround survives here

## Why it went there

The user doesn't love the floating chevron Button ("I don't love the sidebar
toggle", 2026-08-06) and asked for the kol-mirror grab handle instead — drag
the rail's edge to resize, drag under a threshold to snap collapsed,
double-click to reset. Prior art cited:
`kol-mirror/src/pages/MirrorPlayground.jsx#L21-L76`. `SideNav` and the
`data-sidenav` contract live in kol-framework, so the gesture belongs there —
a brand-local build would fork the package's own rail. His call, same day:
"I would let kol-ds handle it."

## What stays here

- **On ship: adopt in brand's SideNav** —
  `apps/brand/src/components/framework/SideNav.jsx#L104-L114` retires the DS
  Button toggle; `styles/sidenav-collapse.css` sheds whatever rules the package
  version supersedes.
- Until then the Button toggle stands; nothing else is owed from this side.
