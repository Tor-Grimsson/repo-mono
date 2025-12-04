import { useEffect } from 'react'
import { useParams, Navigate, Link } from 'react-router-dom'
import SEO from '../components/layout/SEO'
import { PrintBuyButton, Tag, Pill, FoundryCTA } from '@kol/ui'
import { getPrintBySlug, prints, formatPrice, formatEdition } from '../data/prints'

export default function PrintDetail() {
  const { slug } = useParams()
  const print = getPrintBySlug(slug)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [slug])

  // Get other prints for "More prints" section
  const otherPrints = prints.filter(p => p.slug !== slug).slice(0, 3)

  if (!print) {
    return <Navigate to="/prints" replace />
  }

  const isLimited = print.edition && print.edition.startsWith('limited')

  return (
    <>
      <SEO
        title={`${print.name} — Art Print`}
        description={print.description}
        ogTitle={`${print.name} — Kolkrabbi Prints`}
        ogDescription={print.description}
        ogImage={print.image || 'https://kolkrabbi.io/img/open-graph/open-graph-03.png'}
        ogUrl={`https://kolkrabbi.io/prints/${print.slug}`}
        canonical={`https://kolkrabbi.io/prints/${print.slug}`}
      />
      <main className="min-h-screen w-full overflow-x-hidden bg-surface-primary">
        {/* Breadcrumb */}
        <div className="max-w-[1400px] mx-auto px-6 md:px-8 pt-28 pb-4">
          <nav className="flex items-center gap-2 kol-mono-sm text-fg-48">
            <Link to="/prints" className="hover:text-fg-primary transition-colors">
              Prints
            </Link>
            <span>/</span>
            <span className="text-fg-primary">{print.name}</span>
          </nav>
        </div>

        {/* Main Content */}
        <div className="max-w-[1400px] mx-auto px-6 md:px-8 pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
            {/* Image Column */}
            <div className="relative">
              <div className="sticky top-28">
                <div className="aspect-[3/4] bg-surface-secondary rounded overflow-hidden">
                  {print.image ? (
                    <img
                      src={print.image}
                      alt={print.name}
                      className="size-full object-cover"
                    />
                  ) : (
                    <div className="size-full bg-surface-tertiary flex items-center justify-center">
                      <span className="kol-mono-sm text-fg-24">No image</span>
                    </div>
                  )}
                </div>
                {/* Edition badge */}
                {isLimited && (
                  <div className="absolute top-4 left-4">
                    <Pill variant="inverse">{formatEdition(print.edition)}</Pill>
                  </div>
                )}
              </div>
            </div>

            {/* Details Column */}
            <div className="flex flex-col gap-8 lg:pt-8">
              {/* Title and Price */}
              <div className="space-y-4">
                <h1 className="kol-display-sm text-auto">{print.name}</h1>
                <div className="flex items-baseline gap-4">
                  <span className="kol-heading-lg text-auto">{formatPrice(print.price)}</span>
                  {print.priceISK && (
                    <span className="kol-mono-sm text-fg-48">
                      ({formatPrice(print.priceISK, 'ISK')})
                    </span>
                  )}
                </div>
              </div>

              {/* Buy Buttons */}
              <div className="py-4 border-t border-b border-auto">
                <PrintBuyButton print={print} size="lg" layout="stack" />
              </div>

              {/* Description */}
              <div className="space-y-4">
                <h2 className="kol-mono-text font-medium">About this print</h2>
                <p className="kol-mono-text text-fg-64 leading-relaxed">
                  {print.description}
                </p>
              </div>

              {/* Details */}
              <div className="space-y-4">
                <h2 className="kol-mono-text font-medium">Details</h2>
                <dl className="grid grid-cols-2 gap-4">
                  <div>
                    <dt className="kol-mono-xs text-fg-48 mb-1">Category</dt>
                    <dd className="kol-mono-sm">{print.category}</dd>
                  </div>
                  <div>
                    <dt className="kol-mono-xs text-fg-48 mb-1">Year</dt>
                    <dd className="kol-mono-sm">{print.year}</dd>
                  </div>
                  <div>
                    <dt className="kol-mono-xs text-fg-48 mb-1">Edition</dt>
                    <dd className="kol-mono-sm">{formatEdition(print.edition)}</dd>
                  </div>
                  <div>
                    <dt className="kol-mono-xs text-fg-48 mb-1">Available Sizes</dt>
                    <dd className="kol-mono-sm">{print.sizes?.join(', ') || 'A3'}</dd>
                  </div>
                </dl>
              </div>

              {/* Tags */}
              {print.tags && print.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {print.tags.map((tag) => (
                    <Tag key={tag} variant="muted" size="sm">
                      {tag}
                    </Tag>
                  ))}
                </div>
              )}

              {/* Shipping Info */}
              <div className="p-4 bg-surface-secondary rounded">
                <h3 className="kol-mono-sm font-medium mb-2">Shipping</h3>
                <p className="kol-mono-xs text-fg-64">
                  Prints are carefully packaged in protective tubes. Shipping calculated at checkout.
                  International delivery typically takes 5-10 business days.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* More Prints Section */}
        {otherPrints.length > 0 && (
          <div className="max-w-[1400px] mx-auto px-6 md:px-8 py-16 border-t border-auto">
            <div className="flex items-center justify-between mb-8">
              <h2 className="kol-heading-sm">More Prints</h2>
              <Link
                to="/prints"
                className="kol-mono-sm text-fg-48 hover:text-fg-primary transition-colors"
              >
                View all →
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {otherPrints.map((p) => (
                <Link
                  key={p.id}
                  to={`/prints/${p.slug}`}
                  className="group relative aspect-[3/4] bg-surface-secondary rounded overflow-hidden border border-auto hover:border-hover transition-all"
                >
                  {p.image && (
                    <img
                      src={p.image}
                      alt={p.name}
                      className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  )}
                  <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
                    <h3 className="kol-mono-text text-white">{p.name}</h3>
                    <p className="kol-mono-sm text-white/80">{formatPrice(p.price)}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        <FoundryCTA
          heading="Custom Commissions"
          description="Interested in a custom piece or collaboration? Get in touch to discuss your project."
          action={{
            to: 'mailto:hello@kolkrabbi.io',
            label: 'Get in Touch'
          }}
        />
      </main>
    </>
  )
}
