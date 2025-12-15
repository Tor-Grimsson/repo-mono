import { useEffect, useMemo, useState } from 'react'
import { useParams, Navigate, Link } from 'react-router-dom'
import SEO from '../../components/layout/SEO'
import { Pill, FoundryCTA, PrintBuyButton, Button, LinkWithIcon, Divider } from '@kol/ui'
import { getPrintBySlug, formatPrice, formatEdition } from '../../data/prints'

export default function PrintDetail() {
  const { slug } = useParams()
  const print = getPrintBySlug(slug)
  const [activeTab, setActiveTab] = useState('description')

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [slug])

  if (!print) {
    return <Navigate to="/prints" replace />
  }

  const specs = [
    { label: 'Edition', value: formatEdition(print.edition) },
    { label: 'Year', value: print.year },
    { label: 'Category', value: print.category },
    { label: 'Sizes', value: print.sizes?.join(', ') || 'A3' },
  ]

  const tabs = [
    { id: 'description', label: 'Description' },
    { id: 'details', label: 'Details' },
    { id: 'shipping', label: 'Shipping' },
  ]

  const galleryImages = useMemo(() => {
    const extras = (print.images || []).filter(Boolean)
    if (print.image && !extras.includes(print.image)) {
      extras.unshift(print.image)
    }
    return extras.length > 0 ? extras : [print.image].filter(Boolean)
  }, [print])

  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const [quantity, setQuantity] = useState(1)
  useEffect(() => {
    setActiveImageIndex(0)
    setQuantity(1)
  }, [slug])

  const activeImage = galleryImages[activeImageIndex]
  const sizeOptions = print.sizes?.length ? print.sizes : ['A3']
  const sizeSelectId = `print-size-${print.id}`
  const hasPurchaseOption = Boolean(print.stripePaymentLink || print.printOnDemandUrl)
  const inquiryHref = `mailto:hello@kolkrabbi.io?subject=${encodeURIComponent(`Print inquiry — ${print.name}`)}`

  const getTabButtonId = (tabId) => `print-${print.slug}-tab-${tabId}`
  const getTabPanelId = (tabId) => `print-${print.slug}-panel-${tabId}`

  const renderTabContent = () => {
    if (activeTab === 'details') {
      return (
        <dl className="grid grid-cols-3 gap-4">
          <div>
            <dt className="kol-helper-uc-xs text-fg-48 mb-1">Edition</dt>
            <dd className="kol-mono-sm">{print.edition === 'open' ? 'Open' : 'Limited'}</dd>
          </div>
          <div>
            <dt className="kol-helper-uc-xs text-fg-48 mb-1">Year</dt>
            <dd className="kol-mono-sm">{print.year}</dd>
          </div>
          <div>
            <dt className="kol-helper-uc-xs text-fg-48 mb-1">Sizes</dt>
            <dd className="kol-mono-sm">{sizeOptions.join(', ')}</dd>
          </div>
        </dl>
      )
    }

    if (activeTab === 'shipping') {
      return (
        <div className="space-y-4">
          <p>Prints are carefully packaged in protective tubes.</p>
          <p>International delivery typically takes 5-10 business days.</p>
          <p>Tracking information is provided as soon as your order ships.</p>
        </div>
      )
    }

    return (
      <p>
        {print.description}
      </p>
    )
  }

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
      <main className="min-h-screen w-full overflow-x-hidden bg-surface-primary text-auto">
        <section className="grid h-dvh w-full gap-0 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
          {/* Media Column */}
          <div className="relative flex h-dvh bg-surface-secondary">
            <div className="relative flex-1 flex items-center justify-center px-8 py-24 lg:px-16 lg:py-32">
              {activeImage ? (
                <img
                  src={activeImage}
                  alt={print.name}
                  className="max-h-full max-w-full object-contain rounded"
                  loading="lazy"
                />
              ) : (
                <div className="size-full flex items-center justify-center">
                  <span className="kol-mono-sm text-fg-24">No image</span>
                </div>
              )}

              {galleryImages.length > 1 && (
                <div className="absolute inset-x-0 bottom-0 flex gap-3 overflow-x-auto bg-surface-primary/80 px-6 py-4">
                  {galleryImages.map((img, index) => (
                    <button
                      key={`${img}-${index}`}
                      type="button"
                      aria-label={`View image ${index + 1}`}
                      onClick={() => setActiveImageIndex(index)}
                      className={`h-20 aspect-[4/5] overflow-hidden rounded border-2 transition-all ${
                        index === activeImageIndex ? 'border-auto opacity-100' : 'border-transparent opacity-40 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="" className="size-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Details Column */}
          <div className="h-dvh flex flex-col text-left px-6 pt-20 pb-8 sm:px-10 lg:px-16 lg:pt-24 lg:pb-12 bg-surface-primary overflow-visible">
            <div className="mx-auto flex flex-1 w-full max-w-[640px] flex-col gap-6 overflow-visible">
              <header className="reveal space-y-4" style={{ '--reveal-delay': '0.1s' }}>
                <p className="kol-helper-uc-xs text-accent-primary">
                  {print.category}
                </p>
                <h1 className="kol-heading-md uppercase">{print.name}</h1>

                {print.tags && print.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {print.tags.map((tag) => (
                      <Pill key={tag} variant="subtle" size="sm">
                        {tag}
                      </Pill>
                    ))}
                  </div>
                )}
              </header>

              <div className="reveal" style={{ '--reveal-delay': '0.2s' }}>
                <Divider />
                <dl className="py-3">
                  {specs.map((spec, index) => (
                    <div key={spec.label}>
                      <div className="flex items-center justify-between gap-6 py-3">
                        <dt className="kol-helper-uc-xs text-fg-48 whitespace-nowrap">{spec.label}</dt>
                        <dd className="kol-mono-sm text-right text-fg-64">{spec.value}</dd>
                      </div>
                      {index < specs.length - 1 && <Divider />}
                    </div>
                  ))}
                </dl>
                <Divider />
              </div>

              <div className="reveal space-y-4" style={{ '--reveal-delay': '0.3s' }}>
                <nav className="border-b border-auto" role="tablist" aria-label="Print details">
                  <div className="flex flex-wrap gap-6">
                    {tabs.map((tab) => (
                      <button
                        key={tab.id}
                        type="button"
                        id={getTabButtonId(tab.id)}
                        role="tab"
                        aria-selected={activeTab === tab.id}
                        aria-controls={getTabPanelId(tab.id)}
                        tabIndex={activeTab === tab.id ? 0 : -1}
                        onClick={() => setActiveTab(tab.id)}
                        className={`kol-mono-sm pb-3 border-b-2 transition-colors ${
                          activeTab === tab.id
                            ? 'border-auto text-auto'
                            : 'border-transparent text-fg-48 hover:text-auto'
                        }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>
                </nav>

                <div
                  role="tabpanel"
                  id={getTabPanelId(activeTab)}
                  aria-labelledby={getTabButtonId(activeTab)}
                  className="kol-mono-text text-fg-64 leading-relaxed space-y-4"
                >
                  {renderTabContent()}
                </div>
              </div>

              <div className="reveal mt-auto space-y-6 border-t border-auto pt-6" style={{ '--reveal-delay': '0.4s' }}>
                <div className="flex flex-wrap items-baseline gap-3">
                  <span className="kol-heading-lg">{formatPrice(print.price)}</span>
                  {print.priceISK && (
                    <span className="kol-mono-sm text-fg-48">
                      ({formatPrice(print.priceISK, 'ISK')})
                    </span>
                  )}
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label
                      htmlFor={sizeSelectId}
                      className="kol-helper-uc-xs text-fg-48"
                    >
                      Size
                    </label>
                  <select
                    id={sizeSelectId}
                    className="w-full rounded border border-auto bg-surface-primary px-4 py-3 kol-mono-sm text-auto"
                  >
                      {sizeOptions.map((size) => (
                        <option key={size} value={size}>{size}</option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="print-quantity"
                      className="kol-helper-uc-xs text-fg-48"
                    >
                      Quantity
                    </label>
                    <input
                      id="print-quantity"
                      type="number"
                      min={1}
                      max={10}
                      value={quantity}
                      onChange={(event) => {
                        const parsed = Number(event.target.value)
                        const clamped = Number.isFinite(parsed) ? Math.min(10, Math.max(1, parsed)) : 1
                        setQuantity(clamped)
                      }}
                      className="w-full rounded border border-auto bg-surface-primary px-4 py-3 kol-mono-sm text-auto"
                    />
                  </div>
                </div>

                {hasPurchaseOption ? (
                  <PrintBuyButton
                    print={print}
                    layout="stack"
                    size="lg"
                    className="w-full"
                  />
                ) : (
                  <Button
                    variant="primary"
                    size="lg"
                    href={inquiryHref}
                    className="w-full justify-center"
                    uppercase
                  >
                    Inquire to purchase
                  </Button>
                )}

                <p className="kol-mono-xs text-fg-48">
                  Worldwide shipping available. Prints ship safely in protective tubes within 5–10 business days.
                </p>

                <LinkWithIcon
                  to="/prints"
                  iconName="arrow-left"
                  iconPosition="left"
                  className="text-fg-48 hover:text-auto"
                >
                  Back to all prints
                </LinkWithIcon>
              </div>
            </div>
          </div>
        </section>

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
