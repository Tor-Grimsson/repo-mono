# SectionTextBodyMono — the section family's body voice is mono, sans is opt-in

**Filed:** 2026-08-27 → **kol-ds-ui**
**Entry:** `~/dev/projects/kol-ds-ui/lobby/inbox/SectionTextBodyMono.md`
**Ledger:** `~/dev/projects/kol-ds-ui/lobby/INDEX.md` — **the truth about this ticket**
**Last known:** 🟢 `closed` · synced 2026-08-27 — kol-theme 0.60.0; remainder executed here 2026-08-27

## Why it went there

With the organism overrides gone, every section lede falls to
`SectionText`'s ruled body — sans 16. User ruled: mono by default, sans via
the seam. That's the `.kol-section-text-body` rule in kol-theme.

## Remainder here once it ships

bump kol-theme; drop `bodyClass="kol-mono-16"` from the Stack hero if the
default lands on 16

## ✅ RETURNED — 2026-08-27 · kol-theme 0.60.0

.kol-section-text-body is the mono-16 rung (JetBrains Mono 16 / 22, 72% ink unchanged) — the DS picked 16, the section scale where the Stack hero's lede already sat; sans is opt-in through bodyClass / slotClass. Every section rendering SectionText bare follows (hero, split, faq, cta, newsletter). Measured on the section set: split and newsletter bodies at JetBrains Mono 16px / 22px.

**Remainder here:** bump kol-theme 0.60.0; Stack.jsx drops bodyClass="kol-mono-16" on its hero (the default lands on 16)

✅ **Remainder executed 2026-08-27 same session:** kol-theme 0.60.0 in both apps; the Stack hero's `bodyClass="kol-mono-16"` dropped (default is 16 now). Builds green.
