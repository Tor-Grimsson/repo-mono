# PageGutterOwnership — the page gutter has no owner

**Filed:** 2026-08-30 → **kol-ds-ui**
**Entry:** `~/dev/projects/kol-ds-ui/lobby/inbox/PageGutterOwnership.md`
**Ledger:** `~/dev/projects/kol-ds-ui/lobby/INDEX.md` — **the truth about this ticket**
**Last known:** 🟢 `closed` · returned 2026-08-30 — `.kol-page` already ships; the remainder was the whole ticket

## Why it went there

The user spotted a gutter difference between `/work` and `/foundry` on a skim —
*"I shouldn't have to open dev tools to check this."* The audit that followed
measured every public route at 1280 and 1920 and found the gutter has three
different sources, two different content widths at the same breakpoint, and two
foundry pages 48px apart on identical container classes.

Full measurements + method: `.kol/llm-context/plans/2026-08-30-gutter-and-container-audit.md`

## What stays here

Nothing changed on this side — the audit is report-only. The four routes with no
ruled container (`/metrics`, `/workshop`, `/chess`, `/apparat`) are OURS to
adopt once the DS rules the model; they are named in the ticket as not-the-DS's.

## Remainder here once it ships

bump; put every page container on the ruled owner, delete the per-page
`px-*` / ancestor gutters, and adopt it on the four unruled routes.

## ✅ RETURNED — 2026-08-30

**Nothing built — the owner already ships.** `.kol-page` (kol-framework.css:340):

```css
max-width: var(--kol-container-max);
margin: 0 auto;
padding: 64px var(--kol-pad-section-x);   /* 20 → 32 → 48 */
```

Cap, side gutter and top rung in one rule. Asks 1, 2 and 5 are answered by it —
and **inside** is already the ruling, since the padding sits within the
max-width: content = cap − 2× gutter, so 1704 at 1920, not 1752 or 1800.

Ask 4 is not drift: `/work` at 16 and the typeface column at 24 are both the
user's own rulings on their own surfaces, recorded in ContentRow's source.

## Remainder here — 📌 YES, all of it

Every measurement in your audit is a page **not using `.kol-page`**:

- `/work`, `/prints` — hand-rolled `px-4 md:px-6`. That is the 1752.
- `/foundry`, `/foundry/typefaces/*`, `/studio`, `/foundry/licensing` — gutter
  from an ancestor, container pad 0. The 48px disagreement between two foundry
  pages on identical classes is two different ancestors.
- `/metrics`, `/chess`, `/apparat`, `/workshop` — no ruled container at all.

Swap each to `.kol-page` and all four numbers collapse to one per breakpoint.
Where a page needs to bleed past the gutter, `.kol-full-bleed` is the ruled
escape (container-relative, sidenav-safe — not a `50vw` pull).

`05-layout-systems.md` already names the hand-rolled cap as the anti-pattern:
*"hardcoded `max-w-[Npx]` at call sites — if no cap fits, file it."* Nothing new
needs deciding; the class just has to be used.


✅ **Remainder executed — 2026-08-31 and 2026-09-01.** The 08-31 sweep put
`/work`, `/prints`, `/foundry` and `/foundry/typefaces/*` on `.kol-page`.
Finished 2026-09-01:

- `/studio` — `SectionCards` + `SectionCta` wrapped; their `pt-16`/`pb-16` were
  the same 64px hand-rolled, so vertical rhythm is unchanged.
- `/foundry/licensing` — `SectionCta` wrapped. **`SectionFaq` deliberately NOT
  wrapped**: it ships its own `px-5`, and a first attempt that wrapped both
  double-padded it to 40 at mobile. Measured, then narrowed.
- `/work/:slug` — metadata block `px-4 md:px-8 lg:px-12` → `.kol-page`; the
  gallery carousel keeps its one-sided bleed but on `--kol-pad-section-x`
  instead of a third ladder.
- `/stack/:slug` — the article section → `.kol-page`. `.kol-prose` is
  `max-width: 720px` with NO padding, so the body ran edge to edge at 390.

**The audit under this ticket measured top-level routes only** — `/work/:slug`
and `/stack/:slug` appear nowhere in it. They were missed by the sweep, not
exempt from it; found 2026-09-01 when the user asked why a detail route would be
different. `/metrics` · `/workshop` · `/chess` stay out by the user's own ruling.

**Verified at 390:** `/studio` Services and `/ CONNECT` at 20 ·
`/foundry/licensing` FAQ at 20, CTA inside the gutter · no horizontal overflow
on either. 📌 `/work/:slug` and `/stack/:slug` are Sanity-backed and render
empty on a dev port (not in the CORS allowlist) — **source-correct, eyes owed on
the deployed site.**
