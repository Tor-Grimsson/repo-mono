# MotionSheetLocalisation — the reveal family + `.animatedWord`'s rest state left for kol-theme

**Filed:** — · **returned** 2026-08-28 from **kol-ds-ui**
**Entry:** filed AT the DS off a user ruling (the estate's motion localises into one DS sheet) — this repo never staged it, so this stub is the receipt only.
**Ledger:** `~/dev/projects/kol-ds-ui/lobby/INDEX.md` — **the truth about this ticket**
**Last known:** 🟢 `closed` · 2026-08-28 — kol-theme 0.89.0 · kol-component 0.128.0

## What came back

kol-theme minted `kol-animation.css` (imported by `kol-theme.css` at
`layer(components)`) and took two things out of `apps/web/src/styles/animations.css`:

1. **The reveal family** — `.kol-reveal` / `-group` / `-from-left` / `-from-right`
   + `.is-visible`, with `--kol-reveal-delay` alongside `--reveal-delay`. **The bare
   `.reveal*` names ship as aliases**, so every call site here and `App.jsx`'s
   IntersectionObserver kept working with no migration. A `prefers-reduced-motion`
   block came with it — the original had none. This file's own header had marked
   the family a DS candidate since 2026-07-28.
2. **`.animatedWord`'s rest state** → `.kol-animated-word` (both names emitted).
   This was a real defect: the DS's `atoms/AnimatedTitle` queried `.animatedWord`
   and animated FROM a state only THIS app's stylesheet declared, so outside
   kol-website the component rendered static and visible with no error.

**Not taken:** `.animate-on-scroll` / `.animate-in` (an older duplicate of
`.reveal`, carrying an `!important`) and the two `@utility` directives —
`@utility` is Tailwind v4 syntax, not plain CSS, so a theme sheet cannot carry it.

## Remainder here

✅ executed 2026-08-28 same session — bumped theme 0.89.0 · component ^0.128.0 in
both apps (one copy verified, all three builds green). `styles/animations.css`
**127 → 73 lines**: the whole Reveal Animations section deleted, and
`.animatedTitle .animatedWord` trimmed to its TYPE (the DS owns opacity /
transform / color now). What is left is only what the theme cannot carry — the
two `@utility` directives, `.mask-clip-path`, and this app's typography.

Taken in the same pass, on the DS's flag: **`components/ui/AnimatedTitle.jsx` was
a fork of the DS component** (75 lines vs 116; the DS props are a strict superset
— `stagger` / `start` / `end` / `immediate` / reduced-motion on top of the four it
took). Retired to `_tmp/2026-08-28-animated-title-fork/`; its one call site,
`sections/home/HomeAbout.jsx`, imports `AnimatedTitle` from `@kolkrabbi/kol-component`.

⚠ Left standing, flagged not fixed: `.animate-on-scroll` / `.animate-in` has
**zero call sites** in either app. Dead, and it carries an `!important`.
