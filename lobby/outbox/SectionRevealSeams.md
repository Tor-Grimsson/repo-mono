# SectionRevealSeams — per-element class seams so `.reveal` can stamp the set again

**Filed:** 2026-08-26 → **kol-ds-ui**
**Entry:** `~/dev/projects/kol-ds-ui/lobby/inbox/SectionRevealSeams.md`
**Ledger:** `~/dev/projects/kol-ds-ui/lobby/INDEX.md` — **the truth about this ticket**
**Last known:** 🟢 `closed` · synced 2026-08-26 — component 0.79.0 · content 0.9.3; remainder executed here 2026-08-26

## Why it went there

Every DS adoption since 08-12 cut this site's `.reveal` entrance because the
organisms expose no per-element class/style seam: Home · Studio · foundry
in-development cards (08-12), Stack article header (08-15), Studio process
split (08-15), Stack hero (08-26), Home foundry degraded to one block. The
reveal stays app-side (`animations.css` + the `App.jsx` observer — user
ruling 2026-08-26); the DS only needs to let a class + `--reveal-delay` land
on each part. Ask: `itemClassName` / `itemStyle(index)` on `SectionCards`,
`className` + `style` on `SectionCardItem`, `headlineClass` + per-slot style
on `SectionText`, per-part seams on kol-content `ArticleHeader`.

## Remainder here once it ships

bump; re-stamp the six surfaces from the retired locals' delays
(`_tmp/2026-08-12-chrome-fork-retirement/FeaturesCardSection-local-fork.jsx`,
`_tmp/2026-08-15-anatomy-adoption/ArticleHeader.jsx`,
`_tmp/2026-08-26-sectionhero-round2/StackHero.jsx`); Home foundry back to
per-element

## ✅ RETURNED — 2026-08-26 · kol-component@0.79.0 · kol-content@0.9.3

Seams, not motion — nothing animates in the DS. `SectionText` takes `slotClass` / `slotStyle` maps keyed `label · headline · body · actions`, forwarded by `SectionHero` (all three routes), `SectionSplit`, `SectionFaq`, `SectionCta` (every row / the centred block) and the `SectionCards` header; `SectionCards` takes `itemClassName` + `itemStyle` (an object or `(index) => style`) onto each card and forwards them; `SectionCardItem` accepts `className` + `style` on its root (all three root forms). kol-content `ArticleHeader` takes `partClassName` / `partStyle` keyed `tags · title · meta · excerpt · hero`. A consumer with no reveal system passes nothing and sees today's render — the Section Set measured unchanged. Reference pages carry the rows.

**Remainder here:** bump kol-component 0.79.0 + kol-content 0.9.3, re-stamp: cards `itemClassName="reveal" itemStyle={(i) => ({ "--reveal-delay": `${i * 0.15}s` })}` (Home · Studio · in-development), Stack header `partClassName={{ tags: "reveal", … }}` + delays 0 / 0.1 / 0.2 / 0.25 / 0.3, Studio process split + Home foundry `slotClass` / `slotStyle`, Stack hero `slotStyle={{ headline: { "--reveal-delay": "0.2s" }, body: { "--reveal-delay": "0.3s" } }}`

✅ **Remainder executed 2026-08-26 same session:** component ^0.79.0 + content ^0.9.3 (+ 0.78.0's one-cap ride-along). Re-stamped: Home · Studio · in-development cards `itemClassName="reveal"` + `index × 0.15s` (Home's action row `reveal-group` as the old fork had) · Stack article header ×2 `partClassName`/`partStyle` 0 / 0.1 / 0.2 / 0.25 / 0.3 · Studio process split `slotClass`/`slotStyle` 0 / 0.1 / 0.2 / 0.3 · Home foundry per-element 0.3 → 0.6 (the one-block `columnClassName="reveal"` gone) · Stack hero headline 0.2 / body 0.3. Home's `ctas=` → `actions=` on the way. Build green; eyeball is the user's.
