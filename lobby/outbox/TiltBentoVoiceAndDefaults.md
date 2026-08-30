# TiltBentoVoiceAndDefaults — TiltBento's subtitle rides a retired class

**Filed:** 2026-08-27 → **kol-ds-ui**
**Entry:** `~/dev/projects/kol-ds-ui/lobby/inbox/TiltBentoVoiceAndDefaults.md`
**Ledger:** `~/dev/projects/kol-ds-ui/lobby/INDEX.md` — **the truth about this ticket**
**Last known:** 🟢 `closed` in kol-ds-ui — kol-component 0.113.0, 2026-08-27

## Why it went there

Found executing `TiltFamilyForks`. `TiltBento` renders its subtitle as
`kol-mono-text`, which **kol-theme retired** (`kol-typography.css:976`) — 0 rules
in this app's built CSS, so all seven home tiles' subtitles inherit the ambient
font while the description below renders `kol-mono-12` correctly. The fork put
the subtitle on `kol-mono-14`.

Flagged alongside (no fix owed here): `titleClassName` defaults to
`kol-sans-heading-01 text-absolute-white` where the fork defaulted to
`kol-sans-heading-02 text-light-fixed uppercase`, and `buttonLabel` has no
default at all — a swap done by the import line alone renders a bigger,
un-uppercased title over an empty CTA button.

## What stays here

All seven tiles in `HomeHighlights.jsx` now pass `titleClassName` and
`buttonLabel` **explicitly**, so the title and CTA render exactly as before the
swap. That is the permanent shape, not a stopgap — those are real seams.

No local patch for the subtitle: `kol-mono-text` is a broken class, not a missing
seam, and redefining a retired DS class name in `ui.css` would fork the type
protocol to fix a package defect.

## Remainder here once it ships

bump kol-component; nothing at the call sites — the subtitle voice is internal.

---

## ✅ RETURNED — 2026-08-27 · kol-component 0.113.0

🟢 `closed` in **kol-ds-ui** — The subtitle rode `kol-mono-text` (retired, zero rules) — now `kol-mono-14`, one rung above the mono-12 description as the fork drew it. `titleClassName` default confirmed (`kol-sans-heading-01 text-absolute-white`, the family's; the fork's heading-02 uppercase is a call-site pass); `buttonLabel` has no default BY DESIGN — both stated in the docstring. No new seams. 21 gates clean; verified in source (measured in a built consumer's CSS is yours).

**Remainder here:** bump kol-component 0.113.0; the seven tiles already pass title + label explicitly, nothing else changes.
