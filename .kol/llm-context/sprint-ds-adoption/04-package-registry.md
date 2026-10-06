# @kolkrabbi Package Registry — what the DS ships on npm

> **Agents: this is the full published surface of kol-design-system. Check THIS (and
> re-enumerate the scope) before declaring anything "not shipped".** Snapshot
> 2026-07-15; versions move — re-run the enumeration when it matters:
>
> ```sh
> curl -s "https://registry.npmjs.org/-/v1/search?text=%40kolkrabbi&size=50"
> ```
>
> Naming caution: internal `@kol/content` = Sanity schemas (this repo). Upstream
> `@kolkrabbi/kol-content` = content/CMS components. Unrelated — don't confuse.

## The 18 packages (as of 2026-07-15)

| Package | v | What it is | In web/brand? |
|---|---|---|---|
| `kol-theme` | 0.11.0 | Tokens + base CSS — the canonical cascade layer everything builds on; 0.9.2 deletes the OS-follow auto-dark block (user ruling: light-first until migration completion) | ✅ web+brand |
| `kol-component` | 0.12.0 | Core components, atoms→organisms (~110 exports: Button, Input, ContentFilters, Divider, Table, Carousel, Section, …); 0.12.0 adds FoundryCTA (centered CTA tier) | ✅ web |
| `kol-icons` | 0.7.0 | `<Icon/>` + kol-icon-set-v1 + `registerIcons` + legacy inventory. Vite-only | ✅ web |
| `kol-framework` | 0.5.0 | App shell — AppShell, Layout, PageSection, SideNav, ShellHeader, ThemeToggle, heroes, PortalFooter | ✅ web |
| `kol-workshop` | 0.1.6 | Workshop/docs system — markdown engine (`./engine`), search, tag graph, docs viewer/shell | ✅ web |
| `kol-store` | 0.1.1 | Commerce — ProductDetailLayout, PriceDisplay, Print* cards, DiagonalMarqueeRiver | ✅ web |
| `kol-brand` | 0.1.2 | Studio brand manifest + brand SVGs with `<Asset>` loader (`./svg`) | ✅ web |
| `kol-chess` | 0.4.1 | Chess system — board, pieces, playback, PGN engine, game data (`./data`); 0.4.x adds interactive board input + sidelines + edit palette | ✅ web |
| `kol-dashboards` | 0.1.0 | Analytics — SVG charts (no d3), metric cards, DashboardGrid, MetricsDashboard | ✅ web |
| `kol-content` | 0.4.0 | Content/CMS system for /stack + /work streams — **SourcesReferences**, ArticleCard/Header, AuthorLine, ShareButtons, PortableTextRenderer, StackHero, **WorkCard, WorkListItem, ParallaxShelf, ScrollDriftGallery, WorkViewToggle** | ✅ web (/work + stack surfaces) |
| `kol-foundry` | 0.5.0 | Type-specimen apparatus — TypefaceHero, axis playground, glyph inspector, catalog grid + font-metric utils + glyphData exports | ✅ web (foundry surface, 2026-07-16) |
| `kol-specimen` | 0.1.0 | **DEPRECATED — `kol-foundry` is canonical.** npm `deprecated` flag live on the registry (2026-07-15) — never adopt it | ⬜ never |
| `kol-styleguide` | 0.1.0 | Brand-manual specimens — ColorAnatomy, ComboLab, LogoCard/Scaling, ClearspaceDiagram, TypeBlock, AssetTable (raided from apps/brand) | ⬜ not yet |
| `kol-brand-template` | 0.2.0 | Brand-manifest schema + placeholder impl — defineBrand, validateBrand, emitBrandColorCss. No React | ⬜ |
| `kol-loader` | 0.3.0 | ⚠️ Legacy icon loader (341-icon registry) — superseded by `kol-icons` | ⬜ (elder `@kol/loader` retires at Step 5) |
| `kol-media-client` | 0.1.0 | Read-only kol-media CDN client — listMedia/mediaUrl/proxied. No React | ⬜ |
| `kol-scrape` | 0.1.0 | Presence/press scraper CLI. Zero deps | ⬜ (tooling, not a web dep) |
| `design-editor` | 0.1.0 | Prebuilt design-editor app (dist bundle + css) | ⬜ |

## Standing consumption pattern (raw-JSX packages)

Registry installs ship raw `src/` JSX: add the dep + `@source "../node_modules/@kolkrabbi/<pkg>/src"`
line in `apps/web/src/index.css` + `optimizeDeps.exclude` entry in `apps/web/vite.config.js`.
CSS-only `kol-theme` is exempt.

## Recon notes (2026-07-15)

- `SourcesReferences` (kol-content) has shipped since 2026-07-09 — self-contained (no prose.css), replaces elder `SourcesSection`+`SourcesItem`+prose.css trio. `meta`→`note`.
- `kol-content`'s Work* set overlaps the entire `/work` surface (shelf, list, view toggle) — Step-3 relevance beyond sources.
- `kol-framework` 0.4.0 still exports no `useTheme` (ThemeToggle only) — the ×3 `@kol/ui` useTheme consumers stay put; lobby gap stands.
