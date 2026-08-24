# RecordManager — CMS record table + FieldRow detail panel

**Filed:** 2026-08-06 → **kol-ds-ui**
**Entry:** `~/dev/projects/kol-ds-ui/lobby/done/RecordManager.md`
**Ledger:** `~/dev/projects/kol-ds-ui/lobby/INDEX.md` — **the truth about this ticket**
**Last known:** 🟢 `closed` · synced 2026-08-09 — shipped in `@kolkrabbi/kol-component@0.25.0` (RecordManager organism + FieldRow molecule + StatusChip; MediaLibrary is the picker, client injected). ✅ **Remainder here: CLOSED as superseded 2026-08-14 (user).** Neither consumer wants the organism. `Library.jsx` adopted `MediaLibrary` on 2026-08-01 and is 58 lines — done, different component. `SlideDeckManager.jsx` is 71 lines over a static one-entry `DECKS` constant, one `MediaRow`, every action (`Rename`/`Export`/`Delete`) a `disabled` placeholder — RecordManager is a CMS editing surface (drag-reorder, status dropdowns, slide-over FieldRow panel) and there is no editable state here to justify it. Revisit only if decks become real editable data

## Why it went there

The surface is DS-tier: a reorderable record table (⠿ drag rows, status
Tag-with-dropdown, thumbnail + mono slug cells) and a slide-over detail panel
whose real unit is a new **FieldRow** molecule (text / status / select / media /
file controls behind one label-left contract). Building it here would fork
`Table`, `MediaRow`, `Tag` and `MediaLibrary` locally — every one of which the
DS already ships. Reference: Framer's CMS, three screenshots staged in the DS
lobby's `_assets/` (list light · detail light · detail dark).

## What stays here

- ~~**On ship: adopt.** The slide-deck manager (`data/decks.js` registry, rows on
  `MediaRow`) and the Library surfaces are the first consumers; whatever local
  manager markup the organism supersedes retires to `_tmp/`.~~ **Void 2026-08-14** —
  see the Last known line. Neither surface has the editable state the organism exists for.
- Nothing else — the brief is greenfield, no local copy exists to delete.
