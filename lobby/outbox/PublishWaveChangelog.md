# PublishWaveChangelog — publish waves ship no readable record

**Filed:** 2026-08-14 → **kol-ds-ui**
**Entry:** `~/dev/projects/kol-ds-ui/lobby/inbox/PublishWaveChangelog.md`
**Ledger:** `~/dev/projects/kol-ds-ui/lobby/INDEX.md` — **the truth about this ticket**
**Last known:** 🟢 `closed` · synced 2026-08-14 — process landed, exercised on the 0.41.0 wave

## Why it went there

A `@kolkrabbi/*` bump carries no statement of what changed, so this repo either
greps installed `node_modules` per item or bumps blind and finds out live. The
expensive class is silent default flips — invisible at the call site, silent at
build time. Three that cost real time here: framework 0.9.0's ThemeToggle
variant `icon`→`button` (6 bare call sites became padded labeled buttons in the
navbar), component 0.14.x's Pill `size`→`sm`, and component 0.28.0's broken
publish. `kol-theme`'s CHANGELOG stops at 0.6.0 against a shipping 0.40.0.

Ask: one changelog line per package per publish, breaking/global-surface changes
called out explicitly, and lobby tickets ticked in the same pass.

**Re-file, not a new finding.** Raised 2026-07-15 as item 2.10 of
`docs/DS-CHANGES-2.0.md` — the pre-lobby batch ledger, never handed over,
retired 2026-08-14 (elder: `_tmp/2026-08-14-ds-changes-ledgers/`).

## What stays here

**Nothing** — entirely a kol-ds-ui process change. If it lands, the standing
warning in `AGENT-CONTEXT.md` ("the kol-ds-ui CHANGELOGs are stale … do not
report 'checked the changelog' as diligence") is the line to retire.

## Return — 🟢 2026-08-14

The rule is in kol-ds-ui's release playbook §0 (entry per package per wave,
BREAKING flags on default flips/token renames/moved asset paths); all 13
stale/empty changelogs resumed with dated gap notes; exercised immediately on
the theme 0.41.0 / icons 0.16.0 / framework 0.20.0 / kol-shell 0.1.0 wave.
**Remainder here: none** — the agent-context warning "the kol-ds-ui CHANGELOGs
are stale" can retire at the next bump.
