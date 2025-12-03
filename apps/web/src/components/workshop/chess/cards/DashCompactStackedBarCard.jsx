import { Icon } from '@kol/ui'

// DashCompactStackedBarCard: Small card with icon, metric, and stacked bars
const DashCompactStackedBarCard = ({
  title = "blitz",
  icon = "chess-rook",
  value = "47.1%",
  label = "win rate",
  trend = "up", // 'up', 'down', or null
  data = [], // Array of { win, draw, loss, total } objects
  footerLeft = "106 months",
  footerRight = "Total games",
  className = ""
}) => {
  return (
    <div className={`flex flex-col p-6 bg-fg-02 border border-fg-08 rounded h-full ${className}`}>
      {/* Header with title and icon */}
      <div className="flex justify-between items-center mb-6">
        <span className="kol-heading-md">{title}</span>
        <div className="h-6 flex justify-center items-center overflow-visible">
          <Icon name={icon} size={24} className="text-fg-88" />
        </div>
      </div>

      {/* Win rate metric */}
      <div className="flex items-end gap-3 mb-4">
        <span className="kol-heading-lg">{value}</span>
        <span className="kol-mono-xs text-fg-64 mb-1 uppercase tracking-widest">{label}</span>
        {trend && (
          <Icon
            name={trend === 'up' ? 'trending-up' : 'trending-down'}
            size={16}
            className="text-fg-64 mb-1"
          />
        )}
      </div>

      {/* Stacked bar chart - fills available height */}
      <div className="flex-1 flex items-end gap-1" style={{ minHeight: '160px' }}>
        {data.map((month, i) => {
          const maxHeight = 140 // pixels
          const winPx = month.total > 0 ? (month.win / month.total) * maxHeight : 0
          const drawPx = month.total > 0 ? (month.draw / month.total) * maxHeight : 0
          const lossPx = month.total > 0 ? (month.loss / month.total) * maxHeight : 0

          return (
            <div key={i} className="flex-1 flex flex-col justify-end gap-px">
              <div className="w-full bg-white" style={{ height: `${winPx}px` }} />
              <div className="w-full bg-[#6366F1]" style={{ height: `${drawPx}px` }} />
              <div className="w-full bg-[#475569]" style={{ height: `${lossPx}px` }} />
            </div>
          )
        })}
      </div>

      {/* Footer with labels */}
      <div className="flex justify-between items-start mt-6">
        <span className="kol-mono-xs text-fg-64">{footerLeft}</span>
        <span className="kol-mono-xs text-fg-64">{footerRight}</span>
      </div>
    </div>
  )
}

export default DashCompactStackedBarCard
