// MetricCard: Versatile metric display with optional borders, icons, and deltas
const MetricCard = ({
  icon = null,
  label = "Total games",
  value = "1,234",
  delta = null,
  deltaDirection = null, // 'up', 'down', or null
  footer = null,
  borderColor = null, // e.g., '#F5D245' for yellow
  showMenu = false,
  variant = 'default' // 'default', 'bordered', 'compact'
}) => {
  const getDeltaClass = () => {
    if (!deltaDirection) return 'metric-card__delta--neutral'
    return deltaDirection === 'up'
      ? 'metric-card__delta--up'
      : 'metric-card__delta--down'
  }

  const getDeltaSymbol = () => {
    if (!deltaDirection) return ''
    return deltaDirection === 'up' ? '↗' : '↘'
  }

  const cardClass = `metric-card metric-card--${variant}`

  return (
    <div
      className={cardClass}
      style={borderColor ? { borderLeft: `3px solid ${borderColor}` } : {}}
    >
      {/* Header with icon and menu */}
      {(icon || showMenu) && (
        <div className="metric-card__header">
          {icon && <span className="metric-card__icon">{icon}</span>}
          {showMenu && (
            <button className="metric-card__menu" aria-label="Options">
              ⋯
            </button>
          )}
        </div>
      )}

      {/* Label */}
      <span className="metric-card__label">{label}</span>

      {/* Value */}
      <div className="metric-card__value">{value}</div>

      {/* Delta (change indicator) */}
      {delta && (
        <div className={`metric-card__delta ${getDeltaClass()}`}>
          {getDeltaSymbol()} {delta}
        </div>
      )}

      {/* Footer */}
      {footer && (
        <div className="metric-card__footer">{footer}</div>
      )}
    </div>
  )
}

export default MetricCard
