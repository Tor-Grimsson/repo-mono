# MediaKindsExportPath — `utilities/mediaKinds` and `utilities/ratios` resolve to files that do not exist

**Filed:** 2026-08-27 → **kol-ds-ui**
**Entry:** `~/dev/projects/kol-ds-ui/lobby/inbox/MediaKindsExportPath.md`
**Ledger:** `~/dev/projects/kol-ds-ui/lobby/INDEX.md` — **the truth about this ticket**
**Last known:** 🟢 `closed` in kol-ds-ui — kol-component 0.118.1, 2026-08-27

## Why it went there
The package's `exports` map is the package's. `./utilities/*` points at `*.jsx`; the two files promoted in 0.118.0 are `.js`, so the specifier cannot resolve — the same fault fixed for `id3` / `frontmatter` in 0.114.0.

## What stays here
`src/lib/settings.js` restates `KINDS` + `DEFAULT_KINDS` as two literals (nothing else is forked). On publish: bump; import them from `@kolkrabbi/kol-component/utilities/mediaKinds` and delete the stopgap.

---

## ✅ RETURNED — 2026-08-27 · kol-component 0.118.1

🟢 `closed` in **kol-ds-ui** — Explicit `exports` entries for every `.js` utility — `utilities/mediaKinds`, `utilities/ratios` (beside the 0.114.0 `id3` / `frontmatter` ones) — so the subpaths resolve without the barrel. 22 gates clean.

**Remainder here:** bump kol-component 0.118.1; drop the two restated literals in `src/lib/settings.js` and import `KINDS` / `DEFAULT_KINDS` from `@kolkrabbi/kol-component/utilities/mediaKinds`.

## ✅ RETURNED + DONE — 2026-08-27 · kol-component 0.118.1

Explicit `exports` entries added for every `.js` utility — `mediaKinds`, `ratios` and `markdownToHtml` beside `id3` / `frontmatter`. Bumped; `src/lib/settings.js` imports `KINDS` / `DEFAULT_KINDS` from `@kolkrabbi/kol-component/utilities/mediaKinds` and the two restated literals are gone. Lint, `settings.test.mjs` and `pnpm build` green. Heard from the kol-ds-ui session, not the ledger.
