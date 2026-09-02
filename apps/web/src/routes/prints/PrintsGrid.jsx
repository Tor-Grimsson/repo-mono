import { useMemo } from 'react'
import SEO from '../../components/layout/SEO'
import { ContentFilters, ContentCollection, ContentCard, ContentRow, SectionCta, SectionText, Button, Tag } from '@kolkrabbi/kol-component'
import { prints, filterData, printInfo } from '../../data/prints'

/* The row's spec pairs. Edition and material do NOT vary per print — they are
 * catalog-wide — so these read the same on all 24 rows by design (user ruled it
 * twice). Derived from `printInfo` rather than typed here, so the row cannot
 * drift from the detail tab that shows the same facts in full. */
/* The row's pills, the user's wording verbatim (2026-08-30). `hash={false}` —
 * the `#` prefix reads as a hashtag and these are product facts, not topics. */
const ROW_TAGS = [
  'Limited/open edition',
  'Archival paper',
  'Canson',
  'Sihl',
  'Hahnemühle',
  '310gr',
  '210gr',
]

/* Which of a record's three images a card renders. `image` is the flat artwork,
 * `detailImages[0]` the photographed print, `detailImages[1]` the certificate
 * (detail only, never the wall).
 *
 * `kind` is 'random' by default — the wall is a MIX, each card flipped at load
 * (`rolls`, keyed by slug so it holds across re-renders). `a` / `p` pin every
 * card to one. The fallback is defensive: a record with no print photo shows
 * its artwork rather than an empty frame. */
const cardImage = (print, kind, rolls) => {
  const resolved = kind === 'random' ? (rolls?.[print.slug] ?? 'artwork') : kind
  return (resolved === 'print' && print.detailImages?.[0]) || print.image
}

/* The ORDER and the image kind are the route's (`Prints.jsx`) — the overlay
 * needs the same list to step through, and `r` needs something it can re-roll. */
export default function PrintsGrid({ prints: ordered = prints, imageKind = 'random', rolls, onCardClick, activeSlug }) {

  // Build filter groups from print data
  const filterGroups = useMemo(() => [
    {
      label: 'Category',
      key: 'category',
      values: filterData.categories,
      stack: true
    },
    {
      label: 'Year',
      key: 'year',
      values: filterData.years
    }
  ], [])

  // Content-card system (2026-08-27, local first): grid = ContentCard print
  // (image only, as designed on the comparison page), list = the catalog row
  // (print's row IS catalog's). The overlay still gets the card's rect + slug.
  const renderPrints = (filteredItems, _viewMode, layout) => {
    const list = layout === 'list'
    const open = (print) => (e) => onCardClick?.(e.currentTarget.getBoundingClientRect(), print.slug)
    return (
      /* gap: the list form's token is 8, which is /stack's rhythm, not a
       * 168-high row's — /work passes 24 for the same row and this matches it.
       * `cols` is grid-only; the list form ignores it. */
      <ContentCollection
        form={list ? 'list' : 'grid'}
        cols={{ md: 2, lg: 4 }}
        gap={list ? 24 : undefined}
      >
        {filteredItems.map((print) => (list ? (
          <ContentRow
            key={print.id}
            /* `work`, not `article` (2026-08-28): the 168 row with the thumb
             * filling its height. The NAME is the big line — `description` is
             * "<name> print" on all 24 records and reads as noise at that size,
             * so it is the small label that carries the category instead. */
            variant="showcase"
            /* A-series as whole numbers: 17/24 = 0.7083 vs √2's 0.7071, 0.3px
             * at this size. `ratioAxis="height"` holds the 136 WIDTH and lets the
             * height pay (→ 136 x 192), and the rung grows to fit it.
             * Both props are kol-component 0.136.0 — they replaced two
             * `!important`s that were carried here for one session. */
            ratio="17 / 24"
            ratioAxis="height"
            minHeight={224}
            media={<img src={cardImage(print, imageKind, rolls)} alt={print.name} loading="lazy" className="w-full h-full object-cover" />}
            title={print.category}
            /* year rides the trailing `date` slot, as /work's does */
            date={print.year}
            tags={ROW_TAGS.map((t) => (
              <Tag key={t} variant="tertiary" hash={false}>{t}</Tag>
            ))}
            body={print.name}
            bodyClass="work-display-preview text-2xl md:text-6xl leading-tight text-emphasis truncate"
            selected={print.slug === activeSlug}
            onClick={open(print)}
          />
        ) : (
          <ContentCard
            key={print.id}
            variant="catalog"
            media={<img src={cardImage(print, imageKind, rolls)} alt={print.name} loading="lazy" className="w-full h-full object-cover" />}
            selected={print.slug === activeSlug}
            onClick={open(print)}
          />
        )))}
      </ContentCollection>
    )
  }

  return (
    <>
      <SEO
        title="Prints — Art Print Store"
        description="Original art prints available for purchase. Limited editions and open editions in various sizes."
        ogTitle="Art Prints — Kolkrabbi"
        ogDescription="Browse and purchase original art prints, limited editions, and open editions."
        ogImage="https://kolkrabbi.io/img/open-graph/open-graph-01.png"
        ogUrl="https://kolkrabbi.io/prints"
        canonical="https://kolkrabbi.io/prints"
      />
      {/* the page frame is /work's verbatim (measured 2026-08-29): `pt-20 md:pt-56`
        * is where the 224px above the lede comes from — prints had none, which is
        * why its headline sat ~200px higher than work's. `w-full
        * overflow-x-hidden` is prints' own and stays. */}
      <main id="main" className="relative pt-20 md:pt-56 pb-16 md:pb-32 min-h-screen w-full overflow-x-hidden bg-surface-primary">
        {/* Grid Section */}
        {/* the page lede — the SAME block /work opens with (`SectionText`,
          * eyebrow + headline, kol-component), in its wrapper verbatim so the
          * two catalogs start on one rhythm */}
        <div className="kol-page pt-0">
          <div className="max-w-[var(--kol-content-panel)]">
            <SectionText
              eyebrow="Art Prints"
              headline="Limited and open edition prints, archival on cotton rag"
              headlineSize="heading-01"
              headlineAs="h1"
            />
          </div>
        </div>

        <section aria-label="Print catalog" className="kol-page pt-0">
          <ContentFilters
            layoutPlacement="header"
            items={ordered}
            title="All Prints"
            totalCount={prints.length}
            filterGroups={filterGroups}
            renderItem={renderPrints}
            layoutOptions={[{ value: 'list', label: 'LIST' }, { value: 'grid', label: 'GRID' }]}
            layoutClassName="kol-helper-14"
            defaultLayout="grid"
          />
        </section>

        {/* SectionCta ships NO horizontal padding of its own, so the page
          * owns it — same as Home, Studio, Work and Stack. The fifth call site
          * the PageGutterOwnership sweep missed (user 2026-09-02, phone review:
          * the body ran edge to edge at 390). */}
        <div className="kol-page">
          <SectionCta
            variant="centered"
            headline="Custom Commissions"
            body="Interested in a custom piece or collaboration? Get in touch to discuss your project."
            actions={<Button href="mailto:hello@kolkrabbi.io">Get in Touch</Button>}
          />
        </div>
      </main>
    </>
  )
}
