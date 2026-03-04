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

## Duplicate Cluster 1 — `.kol-prose` (blog.css vs prose.css)

**Severity: HIGH — 31 JSX consumers**

Both files define `.kol-prose` and all child selectors (h2, h3, h4, p, a, blockquote, ul, ol, li, code, img/figure).

| Element | blog.css (legacy) | prose.css (canonical) |
|---|---|---|
| Tokens | `var(--foreground)`, `var(--surface-border)`, `var(--font-family-mono)` — **non-`--kol-*`** | `var(--kol-*)` tokens throughout |
| h2 font | `rgrot-narrow`, 48px fixed | `rgrot-tight`, clamp(32px, 4vw, 48px) |
| h3 font | `rgrot-narrow`, 40px fixed | `rgrot-tight`, clamp(24px, 3vw, 32px) |
| p size | 18px fixed, 170% lh | clamp(16px, 1.8vw, 18px), 160% lh |
| Lists | disc/decimal, native list-style | Custom `+` markers (ul), `counter()` (ol) |
| Links | underline with `--surface-border` color | accent-primary color |
| Blockquote | `3px solid var(--foreground)` | `4px solid var(--kol-accent-primary)` |
| Layer | `@layer blog` | No layer |

Blog.css wins in `@layer blog` contexts (Sanity blog posts via `PortableTextBlog.jsx`, `StackArticle.jsx`). Prose.css wins everywhere else (workshop prose specs, docs, articles).

**Action:** Migrate blog.css `.kol-prose` to `--kol-*` tokens. Either deduplicate by using prose.css as the base + blog-specific overrides, or rename to `.blog-prose` if the blog intentionally needs different specs.

---

## Duplicate Cluster 2 — `.kol-caption-label` + `.kol-caption-text` (blog.css vs prose.css)

**Severity: MEDIUM — 3 consumers each**

| Property | blog.css | prose.css |
|---|---|---|
| `.kol-caption-label` font-size | 11px | 12px |
| `.kol-caption-label` font-weight | 700 | 500 |
| `.kol-caption-label` letter-spacing | 0.12em | 0.05em |
| `.kol-caption-label` `::before` | 8×8px square with bg | none |
| `.kol-caption-text` font-family | (inherited) | mono |
| `.kol-caption-text` font-weight | (inherited) | 300 |
| `.kol-caption-text` font-style | italic | (not set) |

Consumers: `ImageBlock.jsx`, `VideoBlock.jsx`, `portable-text/components.jsx`.

**Action:** Unify into prose.css definition. Delete blog.css versions.

---

## ~~Duplicate Cluster 3 — `.code-block-wrapper` + `.code-block` + `.code-filename`~~ ✅ DONE

**Resolved 2026-03-04.** Consolidated 3 CodeBlock components into one `CodeBlock` in `@kol/ui`. Unified CSS into `kol-codeblock*` classes in `components.css`. Deleted old classes from both `prose.css` and `docs.css`. Also deleted `docs-codeblock*` / `docs-copy-button` from docs.css. Blog.css code-block classes still need cleanup (see Cluster 1 / blog.css migration).

---

## Duplicate Cluster 4 — `.sources-*` system (blog.css vs prose.css)

**Severity: MEDIUM — 2-3 consumers + SourcesSection molecule**

Both files define the full sources/references system.

| Class | blog.css | prose.css |
|---|---|---|
| `.sources-section` | `border-top: 2px solid var(--surface-border)` | `border-top: 1px solid var(--kol-border-default)` |
| `.source-item` | exists (card with hover translateX) | not defined |
| `.source-number` | `var(--foreground-muted)` | `var(--kol-color-fg-64)` |
| `.sources-list` | `gap: var(--spacing-4)` (legacy) | `gap: 0.5rem` |

Consumers: `SourcesList.jsx` in both `prose/blocks/` and `portable-text/`, plus `SourcesSection.jsx` molecule in `@kol/ui`.

**Action:** Delete blog.css versions. Prose.css is canonical, and `@kol/ui` already has a `SourcesSection` component.

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

| Priority | Cluster | Source → Target | Effort |
|---|---|---|---|
| **P1** | `.kol-prose` full prose system | blog.css → prose.css | Medium |
| **P1** | `.kol-caption-label/text` | blog.css → prose.css | Small |
| **P1** | `.code-block*` + `.code-filename` | blog.css → prose.css | Small |
| **P1** | `.sources-*` full system | blog.css → prose.css | Small |
| **P2** | `chess-hero-metric` → `metric-card` | chess.css → analytics.css | Small |

All P1 items are blog.css → prose.css consolidation. The 2026-03-01 session log already flagged blog.css as needing full token migration and dedup against prose.css — this audit confirms the exact scope.

---

## Notes

- blog.css uses `@layer blog` which gives its rules lower specificity than unlayered prose.css — but Sanity blog components explicitly wrap content in blog-layer contexts, so blog.css definitions can still win for blog content.
- `components.css` has no overlapping definitions with any of the above — it's clean.
- `docs.css` defines its own article system (`.docs-article h2/h3/h4/p/a/code/ul/ol`) which is intentionally separate from `.kol-prose` — different use case (documentation reader vs long-form prose). Not flagged as a duplicate.
- Legacy tokens in blog.css (`var(--foreground)`, `var(--surface-border)`, `var(--font-family-mono)`, etc.) need migration to `var(--kol-*)` regardless of deduplication.
