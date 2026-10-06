# ColumnBrowserCursorStart — cursor default draws a second highlight

**Filed:** 2026-08-27 → **kol-ds-ui**
**Entry:** `~/dev/projects/kol-ds-ui/lobby/inbox/ColumnBrowserCursorStart.md`
**Ledger:** `~/dev/projects/kol-ds-ui/lobby/INDEX.md` — **the truth about this ticket**
**Last known:** 🟢 `closed` · synced 2026-08-27 — `kol-component@0.97.1`

## Why it went there
The shipped `ColumnBrowser` initialises its keyboard cursor at row 0; cursor and selected share the ruled `bg-fg-04`, so with a bucket open the root column shows two highlighted folders. The organism is the DS's now — no local copy to patch.

## What stays here
Bump `kol-component` on publish. Nothing else.

## ✅ RETURNED — 2026-08-27 · kol-component 0.97.1

The cursor is not drawn until the keyboard is used: arrows arm it, a click seeds it. Measured on the demo: at rest only the open folder is lit in column 0 and nothing in column 1; ArrowDown lights the cursor row (and opens it, Finder's move).

**Remainder here:** bump kol-component 0.97.1; no consumer change

## ✅ RETURNED + DONE — 2026-08-27

DS: the cursor is not drawn until the keyboard is used (arrows arm it, a click seeds it). Here: bumped to 0.97.1, no consumer change.
