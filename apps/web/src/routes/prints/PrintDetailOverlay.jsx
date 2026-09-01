import { useEffect, useMemo, useState } from 'react'
import { isTypingTarget } from '../../lib/keys'
import { motion } from 'framer-motion'
import SEO from '../../components/layout/SEO'
import { Button, Divider, Dropdown, TabsRow, Tooltip } from '@kolkrabbi/kol-component'
import { Icon } from '@kolkrabbi/kol-icons'
import { PrintBuyButton } from '@kolkrabbi/kol-store'
import { formatPrice, paypalLinks, printPricing, printInfo } from '../../data/prints'

// Size + edition options for dropdown
const editionOptions = [
  { value: 'A1-limited', label: '594 × 841mm — Limited (8)', size: '594x841', edition: 'limited' },
  { value: 'A2-limited', label: '420 × 594mm — Limited (20)', size: '420x594', edition: 'limited' },
  { value: 'A3-limited', label: '297 × 420mm — Limited (30)', size: '297x420', edition: 'limited' },
  { value: 'A3-open', label: '297 × 420mm — Open Edition', size: '297x420', edition: 'open' },
]

// Shipping region options
const shippingOptions = [
  { value: 'eu', label: 'EU Shipping' },
  { value: 'intl', label: 'International' }
]

export default function PrintDetailOverlay({ print, onClose, keysEnabled = true }) {
  const [activeTab, setActiveTab] = useState('overview')
  const [selectedOption, setSelectedOption] = useState('A1-limited')
  const [shippingRegion, setShippingRegion] = useState('eu')

  // Get current pricing based on selection
  const currentPricing = printPricing[selectedOption] || printPricing['A3-open']
  const currentEdition = editionOptions.find(o => o.value === selectedOption)
  const shippingCost = shippingRegion === 'eu' ? currentPricing.shippingEU : currentPricing.shippingIntl
  const totalPrice = currentPricing.art + shippingCost

  const galleryItems = useMemo(() => {
    const normalizeKey = (src = '') => {
      const match = src.match(/(.+)-(\d{3,4})\.(?:jpe?g|png|webp)$/i)
      return match ? match[1] : src
    }

    const heroImage = print.image
    const detailImages = (print.detailImages || []).filter(Boolean)
    const extras = (print.images || []).filter(Boolean)
    const items = []
    const seenKeys = new Set()

    const addItem = (src, variant, options = {}) => {
      if (!src) return
      const normalizedKey = normalizeKey(src)
      const primaryKey = options.strict ? src : normalizedKey
      if (options.strict) {
        if (seenKeys.has(primaryKey) || seenKeys.has(normalizedKey)) return
        seenKeys.add(primaryKey)
        seenKeys.add(normalizedKey)
      } else {
        if (seenKeys.has(primaryKey)) return
        seenKeys.add(primaryKey)
      }
      items.push({ src, variant })
    }

    addItem(heroImage, 'primary', { strict: true })

    detailImages.forEach((img, index) => {
      addItem(img, `detail-${index + 1}`, { strict: true })
    })

    extras.forEach((img) => {
      if (normalizeKey(img) !== normalizeKey(heroImage)) {
        addItem(img, 'default')
      }
    })

    return items
  }, [print.detailImages, print.image, print.images])

  const primarySrcSet = useMemo(() => {
    const pool = [print.image, ...(print.images || [])].filter(Boolean)
    const seen = new Set()
    const entries = pool.reduce((acc, src) => {
      if (seen.has(src)) return acc
      const match = src.match(/-(\d+)\.(?:jpe?g|png|webp)$/i)
      if (!match) return acc
      seen.add(src)
      acc.push(`${src} ${match[1]}w`)
      return acc
    }, [])
    return entries.length ? entries.join(', ') : undefined
  }, [print.image, print.images])

  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const activeGalleryItem = galleryItems[activeImageIndex]
  const activeImage = activeGalleryItem?.src
  const isDetailView = activeGalleryItem?.variant?.startsWith('detail')
  const usePrimarySrcSet = activeGalleryItem?.variant === 'primary'

  useEffect(() => {
    setActiveImageIndex(0)
  }, [print?.id])

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  /* Escape, and the image stepper (2026-08-28).
   *
   * BARE ← / → step the images of THIS print, wrapping both ends. SHIFT+arrow
   * is the ROUTE's — it changes print — and is yielded below, not forwarded:
   * both listeners sit on `window`, so handling it in both steps two prints.
   *
   * `a` / `p` / `r` are not read here at all: they belong to the grid behind
   * this overlay and keep working while it is open, which is the point. */
  useEffect(() => {
    const handleKey = (e) => {
      /* the shortcuts sheet is a layer ABOVE this one and owns Escape while it
       * is up — without this, one Escape closes the sheet AND the print */
      if (!keysEnabled) return
      if (isTypingTarget(e) || e.metaKey || e.ctrlKey || e.altKey) return
      if (e.key === 'Escape') { onClose(); return }
      if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return
      /* SHIFT+arrow is the ROUTE's key (it changes print). Yielding it here is
       * load-bearing: both listeners are on `window`, so handling it in both
       * places steps TWO prints per press. */
      if (e.shiftKey) return

      const delta = e.key === 'ArrowRight' ? 1 : -1
      e.preventDefault()
      const count = galleryItems.length
      if (count < 2) return
      setActiveImageIndex((i) => (i + delta + count) % count)
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [onClose, keysEnabled, galleryItems.length])

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'edition', label: 'Edition' },
    { id: 'materials', label: 'Materials' },
    { id: 'shipping', label: 'Shipping' },
  ]

  const hasPurchaseOption = Boolean(print.stripePaymentLink || print.printOnDemandUrl)
  const inquiryHref = `mailto:hello@kolkrabbi.io?subject=${encodeURIComponent(`Print inquiry — ${print.name} (${currentEdition?.label || 'A3 Open'}, ${shippingRegion === 'eu' ? 'EU' : 'International'})`)}`
  const paypalPurchaseLink = paypalLinks[`${selectedOption}-${shippingRegion}`]

  const renderTabContent = () => {
    if (activeTab === 'overview') {
      return (
        <div className="space-y-4">
          <p className="kol-mono-14">{print.description}</p>
          <p className="kol-mono-12 text-fg-48">{printInfo.overview.description}</p>
          <dl className="grid grid-cols-2 gap-4 pt-2">
            <div>
              <dt className="kol-helper-10 uppercase text-fg-48 mb-1">Year</dt>
              <dd className="kol-mono-14">{print.year}</dd>
            </div>
            <div>
              <dt className="kol-helper-10 uppercase text-fg-48 mb-1">Category</dt>
              <dd className="kol-mono-14">{print.category}</dd>
            </div>
          </dl>
        </div>
      )
    }
    if (activeTab === 'edition') {
      return (
        <div className="space-y-3 kol-mono-12 text-fg-64">
          <p>{printInfo.edition.intro}</p>
          <dl className="grid grid-cols-2 gap-4 pt-2">
            <div>
              <dt className="kol-helper-10 uppercase text-fg-48 mb-1">594 × 841mm</dt>
              <dd className="kol-mono-14">Limited — {printInfo.edition.counts['594x841']} copies</dd>
            </div>
            <div>
              <dt className="kol-helper-10 uppercase text-fg-48 mb-1">420 × 594mm</dt>
              <dd className="kol-mono-14">Limited — {printInfo.edition.counts['420x594']} copies</dd>
            </div>
            <div>
              <dt className="kol-helper-10 uppercase text-fg-48 mb-1">297 × 420mm</dt>
              <dd className="kol-mono-14">Limited — {printInfo.edition.counts['297x420']} copies</dd>
              <dd className="kol-mono-12 text-fg-32 mt-0.5">A series (√2:1)</dd>
            </div>
            <div>
              <dt className="kol-helper-10 uppercase text-fg-48 mb-1">297 × 420mm</dt>
              <dd className="kol-mono-14">Open Edition</dd>
            </div>
            <div>
              <dt className="kol-helper-10 uppercase text-fg-48 mb-1">Artist Proofs</dt>
              <dd className="kol-mono-14">{printInfo.edition.artistProofs}</dd>
            </div>
          </dl>
        </div>
      )
    }
    if (activeTab === 'materials') {
      return (
        <div className="space-y-3 kol-mono-12 text-fg-64">
          <dl className="grid grid-cols-1 gap-4 pt-2">
            {/* the three stocks, not one line naming a paper that is not
              * always the one used (user 2026-08-29) */}
            <div>
              <dt className="kol-helper-10 uppercase text-fg-48 mb-1">Paper</dt>
              {printInfo.materials.stocks.map((stock) => (
                <dd key={stock.name} className="kol-mono-14 mb-2 last:mb-0">
                  {stock.name} {stock.weight}
                  <span className="block kol-mono-12 text-fg-48">{stock.note} · {stock.sizes}</span>
                </dd>
              ))}
            </div>
            <div>
              <dt className="kol-helper-10 uppercase text-fg-48 mb-1">Print Type</dt>
              <dd className="kol-mono-14">{printInfo.materials.printType}</dd>
            </div>
            <div>
              <dt className="kol-helper-10 uppercase text-fg-48 mb-1">Certificate</dt>
              <dd className="kol-mono-14">{printInfo.materials.certificate}</dd>
            </div>
          </dl>
        </div>
      )
    }
    if (activeTab === 'shipping') {
      return (
        <div className="space-y-3 kol-mono-12 text-fg-64">
          <p>{printInfo.shipping.intro}</p>
          <dl className="grid grid-cols-2 gap-4 pt-2">
            <div>
              <dt className="kol-helper-10 uppercase text-fg-48 mb-1">EU Shipping</dt>
              <dd className="kol-mono-14">€{currentPricing.shippingEU}</dd>
            </div>
            <div>
              <dt className="kol-helper-10 uppercase text-fg-48 mb-1">International</dt>
              <dd className="kol-mono-14">€{currentPricing.shippingIntl}</dd>
            </div>
          </dl>
          {/* <p className="pt-2">{printInfo.shipping.vatNote}</p> */}
        </div>
      )
    }
    return null
  }

  return (
    <>
      <SEO
        title={`${print.name} — Art Print`}
        description={print.description}
        ogTitle={`${print.name} — Kolkrabbi Prints`}
        ogDescription={print.description}
        ogImage={print.image || 'https://kolkrabbi.io/img/open-graph/open-graph-01.png'}
        ogUrl={`https://kolkrabbi.io/prints/${print.slug}`}
        canonical={`https://kolkrabbi.io/prints/${print.slug}`}
      />

      {/* Backdrop — theme-invariant 80% scrim (fg-absolute scale) */}
      <motion.div
        className="fixed inset-0 z-[80] bg-fg-absolute-80"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        onClick={onClose}
      />

      {/* Content - animated with margins */}
      <motion.div
        className="fixed inset-4 md:inset-8 lg:inset-12 z-[85] rounded-lg overflow-hidden bg-surface-primary"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <Tooltip label="Close" triggerClassName="absolute top-4 right-4 z-[90] inline-flex">
          <button
            onClick={onClose}
            className="p-3 rounded-full bg-surface-secondary hover:bg-surface-tertiary transition-colors"
            aria-label="Close"
          >
            <span className="text-auto" style={{ lineHeight: 0 }}>
              <Icon name="x" size={20} />
            </span>
          </button>
        </Tooltip>

        {/* Two-column layout - fits viewport */}
        <section className="grid h-full w-full gap-0 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">

            {/* Media Column - flex-col to stack image + thumbnails */}
            <div className="flex flex-col h-full bg-surface-secondary">
              {/* Image area - absolute positioning for definite height.
                * Below `lg` the section is ONE column, so this box has no
                * intrinsic height to give the row: the image inside is
                * `absolute inset-0`. Without a definite height here the media
                * row collapses to the thumbnail strip — the only thing left in
                * flow — and the gallery disappears on a phone. */}
              <div className="flex-1 relative min-h-[45svh] lg:min-h-0">
                <div className="absolute inset-0 flex items-center justify-center p-6 lg:p-10 overflow-hidden">
                  {activeImage && (
                    <img
                      src={activeImage}
                      alt={isDetailView ? `${print.name} detail view` : print.name}
                      className="rounded max-h-full max-w-full object-contain"
                      loading="lazy"
                      srcSet={usePrimarySrcSet ? primarySrcSet : undefined}
                      sizes={usePrimarySrcSet ? '100vw' : undefined}
                    />
                  )}
                </div>
              </div>

              {/* Gallery thumbnails - in document flow, not absolute */}
              <div className="flex gap-3 overflow-x-auto bg-surface-primary/80 px-6 py-3 shrink-0">
                {galleryItems.map((item, index) => {
                  const isActive = index === activeImageIndex
                  return (
                    <button
                      key={`${item.variant}-${index}`}
                      type="button"
                      aria-label={item.variant === 'detail' ? 'View detail crop' : `View image ${index + 1}`}
                      onClick={() => setActiveImageIndex(index)}
                      className={`h-14 aspect-[4/5] overflow-hidden rounded border-2 transition-all flex-shrink-0 ${
                        isActive ? 'border-auto opacity-100' : 'border-transparent opacity-40 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={item.src}
                        alt=""
                        className="size-full object-cover"
                      />
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Details Column */}
            <div className="h-full overflow-y-auto text-left px-6 py-6 lg:px-10 lg:py-8 bg-surface-primary">
              <div className="mx-auto w-full max-w-[560px] h-full flex flex-col justify-between">

                {/* TOP SECTION */}
                <div className="space-y-5">
                  {/* Header */}
                  <header className="space-y-4">
                    <p className="kol-helper-10 uppercase text-accent-primary">{print.category}</p>
                    <h1 className="kol-sans-heading-02 uppercase">{print.name}</h1>
                  </header>

                  <Divider />

                  {/* Tabs */}
                  <div className="space-y-4">
                    <nav className="border-b border-auto" aria-label="Print details">
                      <TabsRow tabs={tabs} value={activeTab} onChange={setActiveTab} />
                    </nav>
                    <div className="kol-mono-14 text-fg-64 space-y-4">
                      {renderTabContent()}
                    </div>
                  </div>
                </div>

                {/* BOTTOM SECTION - Purchase */}
                <div className="space-y-5 border-t border-auto pt-5">
                  <div className="flex flex-wrap items-baseline gap-3">
                    <span className="kol-sans-heading-01">{formatPrice(totalPrice)}</span>
                    <span className="kol-mono-12 text-fg-48 mb-8">(€{currentPricing.art} + €{shippingCost} shipping)</span>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <label className="kol-helper-10 uppercase text-fg-48">Size & Edition</label>
                      <Dropdown
                        options={editionOptions.map(o => ({ value: o.value, label: o.label }))}
                        value={selectedOption}
                        onChange={setSelectedOption}
                        size="md"
                        className="w-full"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="kol-helper-10 uppercase text-fg-48">Shipping</label>
                      <Dropdown
                        options={shippingOptions}
                        value={shippingRegion}
                        onChange={setShippingRegion}
                        size="md"
                        className="w-full"
                      />
                    </div>
                  </div>

                  {hasPurchaseOption ? (
                    <PrintBuyButton print={print} layout="stack" size="lg" className="w-full" />
                  ) : (
                    <div className="flex flex-col gap-3">
                      {paypalPurchaseLink ? (
                        <Button
                          variant="primary"
                          size="md"
                          href={paypalPurchaseLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full justify-center"
                          uppercase
                        >
                          Purchase
                        </Button>
                      ) : (
                        <Button
                          variant="primary"
                          size="md"
                          disabled
                          className="w-full justify-center"
                          uppercase
                        >
                          Unavailable
                        </Button>
                      )}
                      <Button variant="secondary" size="md" href={inquiryHref} className="w-full justify-center">
                        Inquire
                      </Button>
                    </div>
                  )}

                  <p className="kol-mono-12 text-fg-48">
                    If you are based in Iceland, please reach out directly to arrange pickup or delivery and skip shipping charges.
                  </p>
                </div>
              </div>
            </div>
          </section>
      </motion.div>
    </>
  )
}
