# ProseTitleFixedSize — `.kol-prose-title` has no responsive step

**Filed:** 2026-09-01 → **kol-ds-ui**
**Entry:** `~/dev/projects/kol-ds-ui/lobby/inbox/ProseTitleFixedSize.md`
**Ledger:** `~/dev/projects/kol-ds-ui/lobby/INDEX.md` — **the truth about this ticket**
**Last known:** 🟢 `closed` · synced 2026-09-01 — **kol-theme@0.125.0**

## Why it went there

User, phone review of `/stack/:slug`: *"that heading VCAP: Recording… what
style is that?"* It is `kol-prose-title` — kol-content's `ArticleHeader` h1 —
and the token is a fixed 56px/60 at every viewport. Every other display role
ramps; this one sets four lines of 56px on a phone. The consumer's title seam
replaces the class, so a local fix forks the type role.

## What stays here

`StackArticle.jsx` passes no title class. Nothing changes until it ships.

## Remainder here once it ships

bump; re-check `/stack/:slug` at 390 — the title should not spend the fold.

## ✅ RETURNED — 2026-09-01 · kol-theme@0.125.0

The ramp is in the token, as you asked — and it was three steps, not one: .kol-prose-title, .kol-prose-display and .kol-prose-display-md were the only display steps in the theme with no rung. Each now reads the display token whose desktop value it already was (56 → display-02, 80 → display-01, 64 → display-tight-01), capped at that value with min(), so below 768 they take the ladder's mobile step — the title is 44px at 390, display 56, display-md 48 — and from 768 up they are pixel-identical to before; the ladder's 1280 rung (64 for the title) is deliberately not taken, a prose title at 64 was never the design. Line-heights became ratios so the leading follows. Verified in a real render: display 56/56 at 390, 80/80 at 1280 with the token itself reading 96 there, i.e. the cap holds. .kol-prose-lede left at 24/28 — you asked me to check it; it is not a display step and 24 is a phone lede; say the word if it should rung. Tarball checked.

**Remainder here:** bump kol-theme@0.125.0 and re-check /stack/:slug at 390 — the title lands at 44px and should not spend the fold

## ✅ RETURNED — 2026-09-01 · kol-theme@0.125.0

`.kol-prose-title` is `font-size: min(var(--kol-text-display-02), 56px)`,
`line-height: 1.07` — it rides the display-02 ramp and caps at the old 56, so
desktop is unchanged and a phone lands at 44.

**Remainder here:** bump; re-check `/stack/:slug` at 390.

✅ **Remainder executed 2026-09-01 same session.** theme 0.125.0 in web + brand.
`/stack/:slug` is Sanity-backed and renders empty on a dev port — the token is
verified in the installed CSS; the fold is eyes-on-live.
