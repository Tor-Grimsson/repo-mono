# CSS Duplicate Audit — 2026-03-04

> Audit of `packages/ui/css/` for duplicate class definitions across CSS files.
> Follows the table consolidation work from 2026-03-01 (see session log).

---

## Files Audited

| File | Lines | Layer | Purpose |
|---|---|---|---|
| `blog.css` | 368 | `@layer blog` | Blog post content (Sanity rich text) |
| `prose.css` | 815 | (none) | Canonical prose typography system (3 variants) |
| `docs.css` | 512 | (none) | Documentation page content rendering |
| `components.css` | ~1700 | (none) | Shell layout, nav, buttons, cards, table |
| `analytics.css` | 513 | (none) | Dashboard cards, metric cards, donut charts |
| `chess.css` | 1211 | (none) | Chess board, playback, hero dashboard |
| `utilities.css` | 737 | `@layer utilities` | Color system utilities, opacity scales, layout helpers |

---

## ~~Duplicate Cluster 1 — `.kol-prose` (blog.css vs prose.css)~~ ✅ DONE

**Resolved 2026-03-04.** blog.css was dead code (never imported anywhere). Moved to `docs/a-torg/a-dead-code`. prose.css is the sole canonical source.

---

## ~~Duplicate Cluster 2 — `.kol-caption-label` + `.kol-caption-text`~~ ✅ DONE

**Resolved 2026-03-04.** blog.css was dead code. prose.css is the sole canonical source.

---

## ~~Duplicate Cluster 3 — `.code-block-wrapper` + `.code-block` + `.code-filename`~~ ✅ DONE

**Resolved 2026-03-04.** Consolidated 3 CodeBlock components into one `CodeBlock` in `@kol/ui`. Unified CSS into `kol-codeblock*` classes in `components.css`. Deleted old classes from both `prose.css` and `docs.css`. Also deleted `docs-codeblock*` / `docs-copy-button` from docs.css. Blog.css code-block classes still need cleanup (see Cluster 1 / blog.css migration).

---

## ~~Duplicate Cluster 4 — `.sources-*` system~~ ✅ DONE

**Resolved 2026-03-04.** blog.css was dead code. prose.css is the sole canonical source.

---

## Duplicate Cluster 5 — `chess-hero-metric` (chess.css) vs `metric-card` (analytics.css)

**Severity: LOW — 1 consumer each**

Nearly identical card pattern — same layout, tokens, colors, and delta badges.

| Property | analytics.css `metric-card` | chess.css `chess-hero-metric` |
|---|---|---|
| Layout | flex column, gap 8px, pad 20px | flex column, gap 8px, pad 20px |
| Background | `var(--kol-surface-secondary)` | `var(--kol-surface-secondary)` |
| Border | `1px solid color-mix(on-secondary 8%)` | `1px solid color-mix(on-secondary 8%)` |
| min-height | 140px | 140px |
| border-radius | 12px | 12px |
| `__label` size | mono, 0.75rem, 0.12em, uppercase | mono, 0.85rem, 0.08em |
| `__value` | heading, 2rem, 600, -0.02em | heading, 2rem, 600, -0.02em |
| `__delta--up` | `color-mix(#0a682a 20%), #5dd27f` | `color-mix(#0a682a 20%), #5dd27f` |
| `__delta--down` | `color-mix(#d25d5d 20%), #f59090` | `color-mix(#d25d5d 20%), #f59090` |

Consumers: `MetricCard.jsx` (analytics), `ChessHero.jsx` (chess).

**Action:** Unify `chess-hero-metric` into `metric-card`. Rename classes in `ChessHero.jsx`.

---

## Priority Summary

| Priority | Cluster | Status |
|---|---|---|
| ~~P1~~ | `.kol-prose` full prose system | ✅ Done (blog.css was dead code) |
| ~~P1~~ | `.kol-caption-label/text` | ✅ Done (blog.css was dead code) |
| ~~P1~~ | `.code-block*` + `.code-filename` | ✅ Done (consolidated to `kol-codeblock*` in components.css) |
| ~~P1~~ | `.sources-*` full system | ✅ Done (blog.css was dead code) |
| **P2** | `chess-hero-metric` → `metric-card` | **Remaining** — unify chess.css → analytics.css, small |

---

## Notes

- blog.css uses `@layer blog` which gives its rules lower specificity than unlayered prose.css — but Sanity blog components explicitly wrap content in blog-layer contexts, so blog.css definitions can still win for blog content.
- `components.css` has no overlapping definitions with any of the above — it's clean.
- `docs.css` defines its own article system (`.docs-article h2/h3/h4/p/a/code/ul/ol`) which is intentionally separate from `.kol-prose` — different use case (documentation reader vs long-form prose). Not flagged as a duplicate.
- Legacy tokens in blog.css (`var(--foreground)`, `var(--surface-border)`, `var(--font-family-mono)`, etc.) need migration to `var(--kol-*)` regardless of deduplication.
