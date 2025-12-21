import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import SEO from '../../components/layout/SEO'
import { Pill, PrintBuyButton, Button, Divider } from '@kol/ui'
import { formatPrice, formatEdition } from '../../data/prints'

export default function PrintDetailOverlay({ print, onClose }) {
  const [activeTab, setActiveTab] = useState('description')
  const [quantity, setQuantity] = useState(1)

  // Same image twice as placeholder - will add actual different photos later
  const galleryImages = [print.image, print.image]
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const activeImage = galleryImages[activeImageIndex]

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  // Escape key
  useEffect(() => {
    const handleEscape = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [onClose])

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

  const sizeOptions = print.sizes?.length ? print.sizes : ['A3']
  const hasPurchaseOption = Boolean(print.stripePaymentLink || print.printOnDemandUrl)
  const inquiryHref = `mailto:hello@kolkrabbi.io?subject=${encodeURIComponent(`Print inquiry — ${print.name}`)}`

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
    return <p>{print.description}</p>
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

      {/* Backdrop - only animation */}
      <motion.div
        className="fixed inset-0 z-[80] bg-surface-primary/95"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={onClose}
      />

      {/* Content - fixed layout, no animation */}
      <div className="fixed inset-0 z-[85] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="min-h-screen w-full bg-surface-primary">

          {/* Close button */}
          <button
            onClick={onClose}
            className="fixed top-6 right-6 z-[90] p-3 rounded-full bg-surface-secondary hover:bg-surface-tertiary transition-colors"
            aria-label="Close"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-fg-primary">
              <path d="M15 5L5 15M5 5L15 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>

          {/* Fixed two-column layout */}
          <section className="grid min-h-screen w-full gap-0 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">

            {/* Media Column */}
            <div className="relative flex min-h-[50vh] lg:min-h-screen bg-surface-secondary">
              <div className="relative flex-1 flex items-center justify-center px-8 py-24 lg:px-16 lg:py-32">
                {activeImage && (
                  <img
                    src={activeImage}
                    alt={print.name}
                    className="max-h-full max-w-full object-contain rounded"
                  />
                )}

                {/* Gallery thumbnails */}
                <div className="absolute inset-x-0 bottom-0 flex gap-3 overflow-x-auto bg-surface-primary/80 px-6 py-4">
                  {galleryImages.map((img, index) => (
                    <button
                      key={index}
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
              </div>
            </div>

            {/* Details Column */}
            <div className="flex flex-col text-left px-6 pt-12 pb-8 sm:px-10 lg:px-16 lg:pt-24 lg:pb-12 bg-surface-primary">
              <div className="mx-auto flex flex-1 w-full max-w-[640px] flex-col gap-6">

                {/* Header */}
                <header className="space-y-4">
                  <p className="kol-helper-uc-xs text-accent-primary">{print.category}</p>
                  <h1 className="kol-heading-md uppercase">{print.name}</h1>
                  {print.tags?.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {print.tags.map((tag) => (
                        <Pill key={tag} variant="subtle" size="sm">{tag}</Pill>
                      ))}
                    </div>
                  )}
                </header>

                {/* Specs */}
                <div>
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

                {/* Tabs */}
                <div className="space-y-4">
                  <nav className="border-b border-auto" role="tablist" aria-label="Print details">
                    <div className="flex flex-wrap gap-6">
                      {tabs.map((tab) => (
                        <button
                          key={tab.id}
                          type="button"
                          role="tab"
                          aria-selected={activeTab === tab.id}
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
                  <div className="kol-mono-text text-fg-64 leading-relaxed space-y-4">
                    {renderTabContent()}
                  </div>
                </div>

                {/* Purchase */}
                <div className="mt-auto space-y-6 border-t border-auto pt-6">
                  <div className="flex flex-wrap items-baseline gap-3">
                    <span className="kol-heading-lg">{formatPrice(print.price)}</span>
                    {print.priceISK && (
                      <span className="kol-mono-sm text-fg-48">({formatPrice(print.priceISK, 'ISK')})</span>
                    )}
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <label className="kol-helper-uc-xs text-fg-48">Size</label>
                      <select className="w-full rounded border border-auto bg-surface-primary px-4 py-3 kol-mono-sm text-auto">
                        {sizeOptions.map((size) => (
                          <option key={size} value={size}>{size}</option>
                        ))}
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="kol-helper-uc-xs text-fg-48">Quantity</label>
                      <input
                        type="number"
                        min={1}
                        max={10}
                        value={quantity}
                        onChange={(e) => setQuantity(Math.min(10, Math.max(1, Number(e.target.value) || 1)))}
                        className="w-full rounded border border-auto bg-surface-primary px-4 py-3 kol-mono-sm text-auto"
                      />
                    </div>
                  </div>

                  {hasPurchaseOption ? (
                    <PrintBuyButton print={print} layout="stack" size="lg" className="w-full" />
                  ) : (
                    <Button variant="primary" size="lg" href={inquiryHref} className="w-full justify-center" uppercase>
                      Inquire to purchase
                    </Button>
                  )}

                  <p className="kol-mono-xs text-fg-48">
                    Worldwide shipping available. Prints ship safely in protective tubes within 5–10 business days.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  )
}
