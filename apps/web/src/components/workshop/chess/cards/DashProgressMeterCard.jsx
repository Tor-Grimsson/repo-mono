import { Icon } from '@kol/ui'

// DashProgressMeterCard: Horizontal progress bars with labels and values
const DashProgressMeterCard = ({
  title = "GAME OUTCOMES",
  subtitle = "Top termination types",
  icon = "stat-winner",
  items = [], // Array of { label, value, percent }
  barColor = "#F5D245",
  footer = "Counts represent game terminations",
  className = ""
}) => {
  return (
    <div className={`flex flex-col gap-4 p-6 bg-fg-02 border border-fg-08 rounded min-h-[288px] ${className}`}>
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <Icon name={icon} size={24} className="text-fg-88" />
          <span className="kol-heading-sm">{title}</span>
        </div>
        <span className="kol-mono-xs text-fg-60">{subtitle}</span>
      </div>

      <div className="flex flex-col gap-3">
        {items.map((item, idx) => (
          <div key={idx} className="flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <span className="kol-mono-sm text-fg-80">{item.label}</span>
              <span className="kol-mono-sm text-fg-88">{item.value}</span>
            </div>
            <div className="h-2 bg-fg-08 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full"
                style={{ width: `${item.percent}%`, background: barColor }}
              />
            </div>
          </div>
        ))}
      </div>

      {footer && (
        <div className="mt-auto pt-4 border-t border-fg-08">
          <span className="kol-mono-xs text-fg-60">{footer}</span>
        </div>
      )}
    </div>
  )
}

export default DashProgressMeterCard
