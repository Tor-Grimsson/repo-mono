// HorizontalMeterCard: Card with horizontal progress bars (OVERALL LEDGER style)
const HorizontalMeterCard = ({
  title = "OVERALL LEDGER",
  subtitle = "All recorded games",
  items = [],
  footer = null
}) => {
  // Default items if none provided
  const defaultItems = [
    { label: 'blitz', value: 25324, max: 25324, color: '#F5D245' },
    { label: 'blitz', value: 25324, max: 25324, color: '#F5D245' },
    { label: 'blitz', value: 25324, max: 25324, color: '#F5D245' },
    { label: 'blitz', value: 25324, max: 25324, color: '#F5D245' }
  ]

  const meterItems = items.length > 0 ? items : defaultItems

  return (
    <div className="horizontal-meter-card">
      {/* Header */}
      <div className="horizontal-meter-card__header">
        <h3 className="horizontal-meter-card__title">{title}</h3>
        {subtitle && (
          <span className="horizontal-meter-card__subtitle">{subtitle}</span>
        )}
      </div>

      {/* Meter items */}
      <div className="horizontal-meter-card__meters">
        {meterItems.map((item, index) => {
          const percentage = item.max > 0 ? (item.value / item.max) * 100 : 0

          return (
            <div key={index} className="horizontal-meter-card__meter">
              <span className="horizontal-meter-card__meter-label">{item.label}</span>
              <div className="horizontal-meter-card__meter-bar">
                <div
                  className="horizontal-meter-card__meter-fill"
                  style={{
                    width: `${percentage}%`,
                    background: item.color || '#F5D245'
                  }}
                />
              </div>
              <span className="horizontal-meter-card__meter-value">{item.value}</span>
            </div>
          )
        })}
      </div>

      {/* Footer */}
      {footer && (
        <div className="horizontal-meter-card__footer">{footer}</div>
      )}
    </div>
  )
}

export default HorizontalMeterCard
