# RowVariantNamesAndSpecs — variant naming · a row field slot · the stale showcase

**Filed:** 2026-08-29 → **kol-ds-ui**
**Entry:** `~/dev/projects/kol-ds-ui/lobby/inbox/RowVariantNamesAndSpecs.md`
**Ledger:** `~/dev/projects/kol-ds-ui/lobby/INDEX.md` — **the truth about this ticket**
**Last known:** 🔵 `filed` · 2026-08-29

## Why it went there

Putting `/prints`' list on `ContentRow variant="work"` made the naming problem
concrete: the variant that fit was the one named for another page, and `print`
turned out byte-identical to `catalog`. User ruled the names are the defect, not
the boxes. Two more asks rode along — a `specs` slot so print fields (year ·
material · edition) need no seventh variant, and an accurate overview of the
system, because the showcase page advertises features that never shipped.

## What stays here

`/prints` on `variant="work"` with `ratio="1 / 1.41421"` (A-series). No local
fork — the shape is right, only its name is wrong.

## Remainder here once it ships

bump; move `/prints` and `/work` onto the shape names and pass `specs`.
`material` / `edition` / `size` turned out to be **catalog-wide, not per-record**
(user 2026-08-29), so there is nothing per-row for `specs` to show here — the
ticket was corrected the same day so the DS does not size the API around prints.
The real values are now recorded in `data/prints.js` → `printInfo.materials.stocks`
(three stocks; the 210gsm is A3-only) and rendered in the detail's Materials tab,
replacing a single stale "Hahnemühle 308gsm" line.

## ✅ RETURNED — 2026-08-30

Closed in **kol-ds-ui**, shipped in **kol-theme 0.96.0** + **kol-component 0.131.0**.

All three asks done. §1 landed differently than asked and the difference matters
here: "name by SHAPE" could not work, because one variant name drives both
`ContentCard` and `ContentRow` and their shapes diverge by design. The user
re-ruled it — **name by what the content IS**. Six page names → four kinds:

| was | now |
|---|---|
| `default` | `file` |
| `print` | `catalog` (folded — `flip` + `fade` are props now) |
| `work` | `showcase` |
| `typeface` | `showcase layout="canvas"` |

**Every old name still works as an alias**, so nothing here breaks on the bump.
§2 `specs` shipped as a `<dl>` on the row's trailing edge, every horizontal kind.
§3 shipped as a live page, not a report: `/sets/content-set-reference` in the
showcase — every kind in both forms, real components, box values from source,
and where each renders.

## Remainder here — 📌 YES

On the next bump, `apps/web`:

1. `/prints` — `routes/prints/PrintsGrid.jsx`: the list's `<ContentRow
   variant="work">` becomes `variant="showcase"`; the grid's `<ContentCard
   variant="print">` becomes `variant="catalog"` **and must add `flip` and
   `fade`**, which were the print variant's and are now props. Without them the
   grid silently loses its 3D turn and its image fade-in. `ratio="1 / 1.41421"`
   stays as it is.
2. `/work` — `routes/Work.jsx`, `routes/WorkDetail.jsx`: `variant="work"` →
   `variant="showcase"`. `specs` is available for type · year if wanted.
3. `/stack` — unaffected, `article` kept its name.
4. Foundry surfaces — `variant="typeface"` → `variant="showcase"` plus
   `layout="canvas"` (card) / `layout="column"` (row).

None of this is urgent: the aliases hold. But they are **prop values**, so the
retirements gate cannot see them — nothing will remind either repo at 30 days
the way it does for `BentoCard`. This receipt is the only reminder.

`specs` needs nothing here — `material` / `edition` / `size` are catalog-wide,
per your same-day correction.
