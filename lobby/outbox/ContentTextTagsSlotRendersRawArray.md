# ContentTextTagsSlotRendersRawArray — the tags slot prints a joined string, not tags

**Filed:** 2026-09-01 → **kol-ds-ui**
**Entry:** `~/dev/projects/kol-ds-ui/lobby/inbox/ContentTextTagsSlotRendersRawArray.md`
**Ledger:** `~/dev/projects/kol-ds-ui/lobby/INDEX.md` — **the truth about this ticket**
**Last known:** 🟢 `closed` · synced 2026-09-01

## Why it went there

`ContentText.jsx:226` renders every slot as `{values[slot]}`. `tags` is an array of
strings, so React concatenates it into one text node — and the ramp's
`flex flex-wrap gap-2` has no elements to space and no type class to apply. The
user's phone shot of `/` showed `vcappluginchromerecorderheadless` in system sans.
One line, both symptoms, every consumer of the variant.

## What stays here

Nothing — kol-website already passes `tags={article.tags}` as an array of strings,
which is the documented shape.

## Remainder here once it ships

bump; no consumer change.

## ✅ RETURNED — 2026-09-01 · kol-component@0.150.1

An array-valued slot never renders as concatenated text: strings in the tags slot render as the tertiary Tag chip (kol-tag--tertiary kol-tag--sm — the voice the estate's correct tag rows already wear; pre-built elements pass through untouched), and any other slot's array (meta=[date, readingTime]) gets one span per item on a flex-wrap gap-2 seam. Root cause was React writing adjacent strings as text nodes and CSS folding contiguous text into ONE anonymous flex item — gap spaced nothing, type inherited the section's sans.

**Remainder here:** bump kol-component@0.150.1; no consumer change — tags={array of strings} is the documented shape

✅ **Remainder executed 2026-09-01 same session:** component ^0.150.1; chip render not verifiable locally — the Stack section is Sanity-backed and dev port 5180 is not in the CORS allowlist, so it renders empty. Verify on production after push.
