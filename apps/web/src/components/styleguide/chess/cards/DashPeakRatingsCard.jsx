import { Icon } from '@kol/ui'

// DashPeakRatingsCard: Peak ratings by time control
const DashPeakRatingsCard = ({
  title = "Peak Ratings",
  icon = "stat-crown",
  items = [], // Array of { name, rating, games, color }
  className = ""
}) => {
  return (
    <div className={`flex flex-col p-6 bg-fg-02 border border-fg-08 rounded h-full ${className}`}>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <span className="kol-heading-md">{title}</span>
        <Icon name={icon} size={24} className="text-fg-88" />
      </div>

      {/* Time controls with ratings */}
      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.name} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-3 h-3 rounded-full ${item.color}`} />
              <span className="kol-mono-sm text-fg-80">{item.name}</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="kol-heading-md">{item.rating}</span>
              <span className="kol-mono-xs text-fg-64">{item.games} games</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default DashPeakRatingsCard
