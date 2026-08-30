# SectionCtaEditorial — cap the editorial CTA at 1600, row labels on the eyebrow voice

**Filed:** 2026-08-26 → **kol-ds-ui**
**Entry:** `~/dev/projects/kol-ds-ui/lobby/inbox/SectionCtaEditorial.md`
**Ledger:** `~/dev/projects/kol-ds-ui/lobby/INDEX.md` — **the truth about this ticket**
**Last known:** 🟢 `closed` · synced 2026-08-26 — component 0.76.4; remainder executed here 2026-08-26

## Why it went there

The `/ CONNECT` band (`SectionCta variant="editorial"`) runs edge to edge with
no inner cap, and its two row labels use `kol-helper-16` instead of the set's
eyebrow voice. User ruled: cap 1600, labels on the eyebrow. Both are the
organism's own chrome — the consumer passes copy only.

## Remainder here once it ships

bump; eyeball the page foot on Home / Studio / Stack

## ✅ RETURNED — 2026-08-26 · kol-component@0.76.4

`SectionCta` editorial: the inner grid is `max-w-[1600px] mx-auto` — the surface stays full width, the wordmark and the rows stop hugging the viewport edges (measured at 2000: section 2000 wide, inner 1600, centred). `promptLabel` / `contactLabel` drop their `text-auto kol-helper-16` for the SectionText default — helper-12 · meta · uppercase by role — so the band wears the one eyebrow the set has.

**Remainder here:** bump kol-component 0.76.4; ConnectCta needs nothing

✅ **Remainder executed 2026-08-26 same session:** component ^0.76.4 (+ theme 0.58.0 riding along) in both apps; `ConnectCta` unchanged. Builds green; page-foot eyeball is the user's.
