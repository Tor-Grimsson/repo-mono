import { Icon } from '@kol/ui'

// DashScatterPlotCard: Scatter plot with XY grid
const DashScatterPlotCard = ({
  title = "OPPONENT STRENGTH vs TIME CONTROL",
  subtitle = "Rating distribution across time controls",
  icon = "stopwatch",
  data = [], // Array of { x, y, id }
  maxX = 200,
  maxY = 3000,
  xLabels = [40, 80, 120, 160],
  yLabels = [0, 1000, 2000],
  legends = [], // Array of { label, color }
  pointColor = "#4cd8e8",
  className = ""
}) => {
  return (
    <div className={`flex flex-col gap-4 p-6 bg-fg-02 border border-fg-08 rounded ${className}`}>
      {/* Header */}
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <Icon name={icon} size={24} className="text-fg-88" />
          <span className="kol-heading-sm">{title}</span>
        </div>
        <span className="kol-mono-xs text-fg-60">{subtitle} ({data.length} games)</span>
      </div>

      {/* Chart container */}
      <div className="flex">
        {/* Y-axis labels */}
        <div className="flex flex-col justify-between h-80 pr-2 py-1">
          {[...yLabels].reverse().map((yValue) => (
            <span key={yValue} className="kol-mono-xs text-fg-64 text-right w-8">
              {yValue === 0 ? '0' : yValue >= 1000 ? `${(yValue / 1000).toFixed(1).replace('.0', '')}K` : yValue}
            </span>
          ))}
        </div>

        {/* Chart area */}
        <div className="flex-1 flex flex-col">
          <div className="relative h-80 bg-fg-04 rounded overflow-hidden">
            {/* Horizontal grid lines */}
            {yLabels.map((yValue) => (
              <div
                key={yValue}
                className="absolute left-0 right-0 border-t border-fg-12"
                style={{ bottom: `${(yValue / maxY) * 100}%` }}
              />
            ))}

            {/* Vertical grid lines */}
            {xLabels.map((xValue) => (
              <div
                key={xValue}
                className="absolute top-0 bottom-0 border-l border-fg-12"
                style={{ left: `${(xValue / maxX) * 100}%` }}
              />
            ))}

            {/* Scatter points */}
            {data.map(point => (
              <span
                key={point.id}
                className="absolute block w-2.5 h-2.5 rounded-full"
                style={{
                  background: pointColor,
                  left: `${(point.x / maxX) * 100}%`,
                  bottom: `${(point.y / maxY) * 100}%`,
                  transform: 'translate(-50%, 50%)'
                }}
              />
            ))}
          </div>

          {/* X-axis labels */}
          <div className="flex justify-between pt-2 px-0">
            <span className="kol-mono-xs text-fg-64">0</span>
            {xLabels.map((xValue) => (
              <span
                key={xValue}
                className="kol-mono-xs text-fg-64"
                style={{ marginLeft: `${(xValue / maxX) * 100 - (xLabels.indexOf(xValue) === 0 ? 0 : (xLabels[xLabels.indexOf(xValue) - 1] / maxX) * 100)}%` }}
              >
                {xValue}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Legends */}
      {legends.length > 0 && (
        <div className="flex items-center gap-4">
          {legends.map((legend, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: legend.color || '#4cd8e8' }}
                aria-hidden="true"
              />
              <span className="kol-mono-xs text-fg-64">{legend.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default DashScatterPlotCard
