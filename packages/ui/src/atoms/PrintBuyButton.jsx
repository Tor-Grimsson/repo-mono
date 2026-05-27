import { Button } from '@kol/component'

/**
 * PrintBuyButton - Smart buy button for print store
 * Renders appropriate buttons based on available fulfillment options
 *
 * @param {Object} print - The print data object
 * @param {string} print.stripePaymentLink - Stripe payment link (self-fulfilled)
 * @param {string} print.printOnDemandUrl - POD service link
 * @param {number} print.price - Price in EUR
 * @param {number} print.priceISK - Optional price in ISK
 * @param {'row'|'stack'} layout - Button layout direction
 * @param {'sm'|'md'|'lg'} size - Button size
 * @param {boolean} showPrice - Whether to show price in button text
 * @param {string} className - Additional CSS classes
 */
export default function PrintBuyButton({
  print,
  layout = 'row',
  size = 'md',
  showPrice = true,
  className = ''
}) {
  const { stripePaymentLink, printOnDemandUrl, price, currency = 'EUR' } = print

  const hasStripe = !!stripePaymentLink
  const hasPOD = !!printOnDemandUrl
  const hasAnyOption = hasStripe || hasPOD

  const formatPrice = (amount) => {
    if (typeof amount !== 'number') return ''
    try {
      return new Intl.NumberFormat(
        currency === 'ISK' ? 'is-IS' : 'en-US',
        {
          style: 'currency',
          currency,
          maximumFractionDigits: 0
        }
      ).format(amount)
    } catch {
      return currency === 'ISK' ? `${amount} kr` : `${currency} ${amount}`
    }
  }

  const layoutClass = layout === 'stack'
    ? 'flex flex-col gap-3'
    : 'flex flex-row gap-3'

  // No payment options configured
  if (!hasAnyOption) {
    return (
      <div className={`${className}`}>
        <Button
          variant="secondary"
          size={size}
          disabled
        >
          Coming Soon
        </Button>
      </div>
    )
  }

  return (
    <div className={`${layoutClass} ${className}`}>
      {/* Primary: Self-fulfilled via Stripe */}
      {hasStripe && (
        <Button
          variant="primary"
          size={size}
          href={stripePaymentLink}
          target="_blank"
          rel="noopener noreferrer"
        >
          {showPrice ? `Buy ${formatPrice(price)}` : 'Buy Now'}
        </Button>
      )}

      {/* Secondary: Print-on-demand */}
      {hasPOD && (
        <Button
          variant={hasStripe ? 'secondary' : 'primary'}
          size={size}
          href={printOnDemandUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          Order Print
        </Button>
      )}
    </div>
  )
}
