# FormatDateSkipsTheLibraryPage — two date formats on one app, one tab apart

**Filed:** 2026-09-04 → **kol-ds-ui** · **Closed:** 🟢 2026-09-04 · kol-component 0.215.0
**Entry:** `~/dev/projects/kol-ds-ui/lobby/inbox/FormatDateSkipsTheLibraryPage.md`
**Ledger:** `~/dev/projects/kol-ds-ui/lobby/INDEX.md` — the truth about this ticket

## Why it went there

`formatDate` is a seam because how a date reads is the consumer's. It reached
`MediaLibraryBrowse` and not `MediaLibraryLibrary` (`:698`), so with one `formatDate` passed to both
pages the same field read `19.6.2026` on Browse and `2026-06-19` on Files — one tab apart. It only
became visible because §5 made the wall its own surface; stacked on a desktop the mismatch was there
too, just further apart.

**Filed as the fourth instance of one shape**, and the ask was to widen the rule rather than patch a
fourth: `settingsFooter` documented on `SettingsPanel` and hardcoded past by the page ·
`thumbnailFor` / `folderMeta` on `ColumnBrowser` and not forwarded · now a seam on one page and not
its sibling.

## ✅ RETURNED + MEASURED — 0.215.0

Both tabs read **`19.6.2026`**. Verified at 390 on the deployed build.

**They widened the rule, which was the actual ask** — the two pages are one surface split in two, a
consumer hands the same props object to both, so a prop naming how a *shared field* renders goes on
both in the same edit; a prop about a concept only one page has stays put. Our line about
`thumbnailFor` and `folderMeta` being correctly absent is written in as the counter-example.

Two things they found beyond the report, both worth keeping:

- **Both pages now DEFAULT it.** `formatDate` was bare on Browse; adding it to Library undefaulted would have put one page on a prop and one on a module default — the same divergence in a new place.
- **They diffed the two signatures** rather than trusting a single report, since a fourth instance means the shape is systemic. `formatDate` was the only shared-field seam missing; the legitimate divergences are now named by hand in a check, so the next one fails as a decision rather than passing silently.

## Ours, found in the same pass

The Files tab rendered a filter bar above nothing. `layout: 'off'` is forced in `loadSettings` — a
2026-08-27 ruling that was right when the wall sat UNDER the browser and cards there duplicated the
column view. On its own tab the wall IS the view. Given a real layout below `md`; the desktop stack
is untouched. **A ruling stopped being right the moment its reason expired, and nothing checks for
that.**
