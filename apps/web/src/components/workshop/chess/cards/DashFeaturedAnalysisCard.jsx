import { Icon } from '@kol/ui'

// DashFeaturedAnalysisCard: Large card with badge, stats, and chart slot
const DashFeaturedAnalysisCard = ({
  badge = "HOT STREAK",
  title = "Kings Gambit",
  icon = "dashboard-book-open",
  description = "12.6% average win rate over last 12 months • most frequently played opening.",
  metricLabel = "Games tracked",
  metricValue = "1,234",
  chart = null, // Chart component to render
  legends = [], // Array of { label, detail, className }
  className = ""
}) => {
  return (
    <div className={`flex flex-col gap-6 p-6 bg-fg-02 border border-fg-08 rounded min-h-[480px] ${className}`}>
      <div className="flex items-start justify-between">
        <div className="flex flex-col gap-2">
          {badge && (
            <span className="inline-flex items-center px-3 py-1 bg-fg-16 rounded-full kol-mono-xxs text-fg-88 uppercase tracking-wider">
              {badge}
            </span>
          )}
          <div className="flex items-center gap-2">
            {icon && <Icon name={icon} size={24} className="text-fg-88" />}
            <span className="kol-heading-sm capitalize">{title}</span>
          </div>
          {description && (
            <p className="kol-mono-xs text-fg-64">{description}</p>
          )}
        </div>
        {metricValue && (
          <div className="text-right">
            <span className="kol-mono-xs text-fg-60 uppercase tracking-widest">{metricLabel}</span>
            <p className="kol-heading-md">{metricValue}</p>
          </div>
        )}
      </div>

      {/* Chart slot */}
      {chart && (
        <div className="flex-1 flex flex-col gap-3">
          {chart}
        </div>
      )}

      {/* Legends */}
      {legends.length > 0 && (
        <div className="flex flex-wrap gap-6">
          {legends.map((legend, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <span className={`donut-chart__dot ${legend.className}`} aria-hidden="true" />
              <div className="flex flex-col">
                <span className="kol-mono-xxs text-fg-88 uppercase tracking-widest">{legend.label}</span>
                {legend.detail && (
                  <span className="kol-mono-xs text-fg-64">{legend.detail}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default DashFeaturedAnalysisCard
