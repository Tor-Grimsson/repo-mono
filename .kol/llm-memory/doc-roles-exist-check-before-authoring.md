---
name: doc-roles-exist-check-before-authoring
description: "The DS ships doc/card text-role sets (kol-type-roles.css — .kol-doc-* incl. kol-doc-table, .kol-card-*; docs at ui.kolkrabbi.io/docs/type-roles) — check them BEFORE composing any doc/spec/review surface"
metadata: 
  node_type: memory
  type: feedback
  originSessionId: e0c0afe3-1c75-4765-84f2-e062fea1bb87
  modified: 2026-07-29T23:17:16.518Z
---

Built a hand-rolled `<dl>` fact-card for the brand /review page; the user called it out — the DS ships exactly that composition (2026-07-29, "we ship exactly for that").

**Why:** kol-theme carries `kol-type-roles.css` (07-28 epic): `.kol-doc-*` roles (eyebrow · heading · section-title · lede · body · code · **kol-doc-table** with `th` label chrome + `kol-doc-table-value` cells · figure · caption · footer) and `.kol-card-*` roles. Any label→value spec grid, doc header, or review card is already designed there. Live reference: https://ui.kolkrabbi.io/docs/type-roles.

**How to apply:** before authoring ANY doc-shaped UI (spec cards, fact grids, review/report pages) in kol repos, grep `kol-type-roles.css` and check ui.kolkrabbi.io/docs first; compose from `.kol-doc-*`/`.kol-card-*` and DS atoms. Hand-rolling a layout when a shipped role set covers it is the use-what-we-have violation he keeps catching. Related: [[build-green-is-not-verified]].
