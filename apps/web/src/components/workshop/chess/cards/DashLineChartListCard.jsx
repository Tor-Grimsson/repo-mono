import { Icon } from '@kol/ui'

// DashLineChartListCard: Card with line chart and item list
const DashLineChartListCard = ({
  title = "RATING PROGRESSION",
  subtitle = "Average rating over last 12 months",
  icon = "trending",
  chart = null, // SVG chart component or element
  items = [], // Array of { label, value }
  footer = null, // { label, value } or null
  className = ""
}) => {
  return (
    <div className={`flex flex-col gap-4 p-6 bg-fg-02 border border-fg-08 rounded ${className}`}>
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <Icon name={icon} size={20} className="text-fg-88" />
          <span className="kol-mono-sm uppercase tracking-wider">{title}</span>
        </div>
        {subtitle && (
          <span className="kol-mono-xs text-fg-60">{subtitle}</span>
        )}
      </div>

      {/* Chart slot */}
      {chart && (
        <div className="relative w-full flex-1 min-h-[180px] bg-fg-02 border border-fg-04 rounded overflow-hidden p-7">
          {chart}
        </div>
      )}

      {/* Item list */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {items.map((item, idx) => (
          <div key={idx} className="flex flex-col gap-1">
            <span className="kol-mono-xxs text-fg-80">{item.label}</span>
            <span className="kol-mono-xxs text-fg-88">{item.value}</span>
          </div>
        ))}
      </div>

      {/* Footer */}
      {footer && (
        <div className="mt-2 pt-4 border-t border-fg-08">
          <div className="flex justify-between items-center">
            <span className="kol-mono-xs text-fg-80">{footer.label}</span>
            <span className="kol-mono-xs text-fg-88">{footer.value}</span>
          </div>
        </div>
      )}
    </div>
  )
}

export default DashLineChartListCard
