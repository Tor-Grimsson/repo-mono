# PageSection stops padding x inside the workshop shell

**Filed:** 2026-10-02 → **kol-ds-ui**
**Entry:** `~/dev/projects/kol-ds-ui/lobby/done/page-section-pads-x-inside-the-workshop-shell.md`
**Ledger:** `~/dev/projects/kol-ds-ui/lobby/INDEX.md` — **the truth about this ticket**
**Last known:** 🟢 `closed` · synced 2026-10-02 — kol-theme 0.164.1; remainder executed here the same day

## Why it went there

Every `/workshop/*` page is inset twice on x: `ShellLayout`'s `main` pads
`--kol-pad-section-x` from the rail (since workshop 0.30.0 / theme 0.155.0)
and kol-framework's `PageSection` (`.kol-page`) pads it again — 96px off the
rail at 1440, 44px in at 390, measured here after the 2026-10-02 bump. Both
components are the design system's, and the kol-ds-ui session confirmed it as
a defect on their side and asked for the ticket.

## Stopgap here

`apps/web/src/components/workshop/WorkshopChrome.jsx` wraps `ShellLayout` in
`<div className="[&_.kol-page]:px-0">`. It was `max-lg:` only from 2026-09-02
(the phone half); widened to all widths on 2026-10-02. With it: 24px each side
at 390 and 800, 48px off the rail from 1024 up.

## What stays here

Once it ships: bump, delete the wrapper `div` (and its comment) in
`WorkshopChrome.jsx`, and re-measure `/workshop` at 390, 1100 and 1440.

## 🟠 ADDRESSED — 2026-10-02 · kol-theme@0.164.1

`.shell-main .kol-page { padding-inline: 0; max-width: none; margin-inline: 0 }`
in `kol-components-workshop.css`. The cap went with the pad: inside the shell
the page body's cap is made once, by the shell.

**Remainder here:** none.

✅ **Remainder executed 2026-10-02 same session:** kol-theme 0.164.1 +
kol-component ^0.238.0 in web and brand; the wrapper retired to
`_tmp/2026-10-02-workshop-gutter-wrapper/`. Measured on the built app,
`/workshop` and `/workshop/design-system`: first heading 48px off the nav rail
at 1440 and 1100, 24px in at 390; `.kol-page` x padding 0; no sideways scroll.
Confirmation appended to the entry; the destination closes it.

## ✅ RETURNED — 2026-10-02 · kol-theme@0.164.1

A .kol-page inside .shell-main drops its x padding, its --kol-container-max cap and its auto margin; inside the shell the cap is MainColumn's. kol-website deleted its wrapper and measured 48px off the rail at 1440 and 24px in at 390.

**Remainder here:** none
