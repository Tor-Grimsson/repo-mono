# FontFolderNaming — lowercase-kebab the theme font paths, drop the Text reservation

**Filed:** 2026-08-14 → **kol-ds-ui**
**Entry:** `~/dev/projects/kol-ds-ui/lobby/inbox/FontFolderNaming.md`
**Ledger:** `~/dev/projects/kol-ds-ui/lobby/INDEX.md` — **the truth about this ticket**
**Last known:** 🟢 `closed` · synced 2026-08-14 — theme 0.41.0 (BREAKING: font paths)

## Why it went there

`public/fonts/` here is now one convention (lowercase kebab: `jetbrains-mono/`,
`tg-foundry/`, `tg-typefaces/`) except `Right-Grotesk/` — kol-theme's
`@font-face` URLs hardcode that path (98 srcs), so the rename must ship theme-side
in a coordinated wave. Same ticket asks the theme to drop the `"Right Grotesk
Text"` reservation: nothing anywhere renders the family, and this repo already
retired the two files it pointed at (`_tmp/2026-08-14-fonts-dead/`).

## What stays here

- **On ship:** rename `public/fonts/Right-Grotesk/` → `right-grotesk/`, bump.
- Nothing else.

## Return — 🟢 2026-08-14

Shipped **theme 0.41.0**, flagged BREAKING: all 98 srcs → `/fonts/right-grotesk/`,
the Text pair deleted. **Remainder here:** rename `public/fonts/Right-Grotesk/` →
`right-grotesk/` on the theme ≥0.41.0 bump. Nothing else.

✅ **Remainder executed** — `public/fonts/right-grotesk/` in place; the case-only rename was recorded in the tree 2026-08-26 (theme 0.52.1).
