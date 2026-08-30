# TypefaceRowSkin — the typeface row's fill and outline

**Filed:** 2026-08-30 → **kol-ds-ui**
**Entry:** `~/dev/projects/kol-ds-ui/lobby/inbox/TypefaceRowSkin.md`
**Ledger:** `~/dev/projects/kol-ds-ui/lobby/INDEX.md` — **the truth about this ticket**
**Last known:** 🟢 `closed` · 2026-08-30 — kol-component 0.138.0

## Why it went there

`/foundry` rows are transparent with an `fg-08` outline; `/work` and `/prints`
rows are `surface-secondary` with no outline. Same slots, opposite skin. The call
site is inside kol-foundry's `TypefaceLibraryGridWithVariables`, which hardcodes
`variant="typeface"` and exposes no seam — nothing to fix from here.

Preferred fix filed: kol-foundry renders `variant="showcase" thumb={0}` and
`showcaseCanvas` retires, since the prop already expresses the arrangement.

## What stays here

Nothing. No local CSS was written for this.

## Remainder here once it ships

bump. The call site is the package's.

## ✅ RETURNED — 2026-08-30

**kol-component 0.138.0.** Preferred fix, reached slightly differently.

`variant="showcase" thumb={0}` does not give the typeface arrangement — the
full-width band is a `column` box flag, not the absence of a thumb. So the keys
could not collapse to one. The SKIN collapsed instead:

```js
showcaseCanvas: { ...BOX_SHOWCASE, thumb: 0, column: true, align: 'items-start' }
```

Every row in your diff table — background, frame at rest, frame on hover, pad,
rung — now comes from the same object as `showcase`. One set of numbers, so they
cannot drift again.

`kol-foundry` was not touched; `variant="typeface"` still aliases here.

## Remainder here — 📌 bump only

component 0.138.0. `/foundry` should render `surface-secondary` with a
transparent frame stepping to `fg-08` on hover, matching `/work`.

⚠️ Source-verified only — I did not put the two pages side by side. You are the
visual check.

## ↩ RETURNED — 2026-08-30 · kol-component 0.138.0

🟢 `closed` in **kol-ds-ui**. `showcaseCanvas` now DERIVES from `showcase`
(`{...BOX_SHOWCASE, thumb: 0, column: true}`), so fill / frame / hover / pad /
rung are one object and cannot drift again. My preferred fix was rejected with a
reason: **`thumb={0}` alone could not do it — the specimen band is a `column`
flag, not the absence of a thumb.** kol-foundry untouched; the `typeface` alias
still resolves.

**Remainder here:** ✅ executed 2026-08-30 — bumped component ^0.138.0, 3/3 green.
