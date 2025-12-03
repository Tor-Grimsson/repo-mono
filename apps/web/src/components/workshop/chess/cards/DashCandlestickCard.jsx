// DashCandlestickCard: Candlestick chart with rating ranges
const DashCandlestickCard = ({
  title = "RATING RANGE BY MONTH",
  subtitle = "Last 12 months high/low/open/close",
  metricLabel = "Player Rating",
  badge = "↗ +45 pts",
  currentValue = "Current: 1500",
  data = [], // Array of { high, low, open, close, variant: 'accent'|'neutral' }
  legends = [], // Array of { label, className }
  items = [], // Array of { label, value }
  footer = "Counts represent head-to-head games",
  className = ""
}) => {
  const candlestickColors = {
    accent: { wick: '#F5D245', body: '#F5D245' },
    neutral: { wick: '#9C64FD', body: '#9C64FD' }
  }

  // Scale data for display (0-100%)
  const allValues = data.flatMap(d => [d.high, d.low, d.open, d.close])
  const minValue = Math.min(...allValues)
  const maxValue = Math.max(...allValues)
  const range = maxValue - minValue || 1

  const scaleCandlestick = (value) => ((value - minValue) / range) * 80 + 10

  return (
    <div className={`flex flex-col gap-6 p-6 bg-fg-02 border border-fg-08 rounded ${className}`}>
      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-col gap-1">
          <span className="kol-heading-sm">{title}</span>
          <span className="kol-mono-xs text-fg-60">{subtitle}</span>
        </div>
        <div className="flex flex-col items-end gap-2">
          <div className="flex items-center gap-3">
            <span className="kol-mono-xs text-fg-64">{metricLabel}</span>
            <div className="inline-flex items-center gap-1 px-2 py-1 rounded border border-fg-08 text-fg-80 bg-fg-04">
              <span className="kol-mono-sm">{badge}</span>
            </div>
          </div>
          <span className="kol-mono-xs text-fg-64">{currentValue}</span>
        </div>
      </div>

      <div className="relative w-full h-72 bg-fg-02 border border-fg-04 rounded overflow-hidden p-4">
        {/* Grid lines */}
        {[20, 40, 60, 80].map((y) => (
          <div
            key={y}
            className="absolute left-4 right-4"
            style={{
              borderTop: '1px dashed var(--kol-border-subtle)',
              top: `${(100 - y)}%`,
              opacity: 0.4
            }}
          />
        ))}

        {/* Candlesticks */}
        <div className="absolute left-4 right-4 top-4 bottom-4 flex items-end gap-3">
          {data.map((item, idx) => {
            const colors = candlestickColors[item.variant] || candlestickColors.accent
            const scaledHigh = scaleCandlestick(item.high)
            const scaledLow = scaleCandlestick(item.low)
            const scaledOpen = scaleCandlestick(item.open)
            const scaledClose = scaleCandlestick(item.close)
            const wickHeight = Math.max(scaledHigh - scaledLow, 1)
            const bodyHeight = Math.max(Math.abs(scaledClose - scaledOpen), 3)
            const bodyBottom = Math.min(scaledOpen, scaledClose)

            return (
              <div key={idx} className="relative flex-1 h-full">
                <span
                  className="absolute left-1/2 -translate-x-1/2 w-[1.5px]"
                  style={{
                    height: `${wickHeight}%`,
                    bottom: `${scaledLow}%`,
                    background: colors.wick
                  }}
                />
                <span
                  className="absolute left-1/2 -translate-x-1/2 w-2 rounded-sm"
                  style={{
                    height: `${bodyHeight}%`,
                    bottom: `${bodyBottom}%`,
                    background: colors.body
                  }}
                />
              </div>
            )
          })}
        </div>
      </div>

      {/* Legends */}
      {legends.length > 0 && (
        <div className="flex items-center gap-4 pt-2">
          {legends.map((legend, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: legend.color || (idx === 0 ? '#F5D245' : '#9C64FD') }}
                aria-hidden="true"
              />
              <span className="kol-mono-xs text-fg-64">{legend.label}</span>
            </div>
          ))}
        </div>
      )}

      {/* Items list */}
      {items.length > 0 && (
        <div className="flex flex-col gap-2">
          {items.map((item, i) => (
            <div key={i} className="flex justify-between items-center">
              <span className="kol-mono-xs text-fg-80">{i + 1}. {item.label}</span>
              <span className="kol-mono-xs text-fg-88">{item.value}</span>
            </div>
          ))}
        </div>
      )}

      {/* Footer */}
      {footer && (
        <div className="pt-4 border-t border-fg-08">
          <span className="kol-mono-xs text-fg-60">{footer}</span>
        </div>
      )}
    </div>
  )
}

export default DashCandlestickCard
