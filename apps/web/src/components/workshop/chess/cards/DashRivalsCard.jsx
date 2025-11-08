import { Icon } from '@kol/ui'

// DashRivalsCard: Ranked list card with rivals/opponents
const DashRivalsCard = ({
  title = "RIVALS",
  subtitle = "Most played opponents",
  icon = "dashboard-dual-opponent",
  badge = "#1",
  items = [], // Array of { name, count }
  footer = "Counts represent head-to-head games",
  className = ""
}) => {
  return (
    <div className={`flex flex-col gap-4 p-6 bg-fg-02 border border-fg-08 rounded min-h-[288px] ${className}`}>
      <div className="flex justify-between items-start">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Icon name={icon} size={24} className="text-fg-88" />
            <span className="kol-heading-sm">{title}</span>
          </div>
          <span className="kol-mono-xs text-fg-60">{subtitle}</span>
        </div>
        {badge && <span className="kol-mono-sm text-fg-80">{badge}</span>}
      </div>

      <div className="flex flex-col gap-3">
        {items.map((item, idx) => (
          <div key={idx} className="flex justify-between items-center">
            <span className="kol-mono-sm text-fg-80">{item.name}</span>
            <span className="kol-mono-sm text-fg-88">{item.count}</span>
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

export default DashRivalsCard
