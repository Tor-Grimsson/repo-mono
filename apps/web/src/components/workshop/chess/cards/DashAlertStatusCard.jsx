import { Icon } from '@kol/ui'

// DashAlertStatusCard: Status card with trend badge and alerts
const DashAlertStatusCard = ({
  label = "Win Rate",
  value = "47.1%",
  trend = "up", // 'up' or 'down'
  trendValue = "+2.3%",
  alerts = [], // Array of { title, description }
  footer = "Month-over-month win rate comparison",
  className = ""
}) => {
  const isPositive = trend === 'up'

  return (
    <div className={`flex flex-col gap-6 p-6 bg-fg-02 border border-fg-08 rounded min-h-[420px] ${className}`}>
      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-col gap-1">
          <span className="kol-mono-xs text-fg-60">{label}</span>
          <span className="kol-heading-lg">{value}</span>
        </div>
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded border border-fg-16 bg-fg-04">
          <Icon
            name={isPositive ? 'trending-up' : 'trending-down'}
            size={20}
            className="text-fg-64"
          />
          <span className="kol-mono-sm font-medium">{trendValue}</span>
        </div>
      </div>

      <div className="flex flex-col gap-6 flex-1">
        {alerts.map((alert, idx) => (
          <div key={idx} className="flex flex-col gap-1">
            <span className="kol-heading-xs">{alert.title}</span>
            <span className="kol-mono-sm text-fg-64">{alert.description}</span>
          </div>
        ))}
      </div>

      {footer && (
        <div className="pt-4 border-t border-fg-08">
          <span className="kol-mono-xs text-fg-60">{footer}</span>
        </div>
      )}
    </div>
  )
}

export default DashAlertStatusCard
