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
  legends = [], // Array of { label, className }
  pointColor = "#4cd8e8",
  className = ""
}) => {
  return (
    <div className={`flex flex-col gap-4 p-6 bg-fg-02 border border-fg-08 rounded h-full min-h-[520px] ${className}`}>
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <Icon name={icon} size={24} className="text-fg-88" />
          <span className="kol-heading-sm">{title}</span>
        </div>
        <span className="kol-mono-xs text-fg-60">{subtitle} ({data.length} games)</span>
      </div>

      {/* Scatter plot */}
      <div className="relative flex-1 bg-fg-02 border border-fg-04 rounded overflow-hidden px-4 pt-4 pb-10">
        <div className="absolute left-4 right-4 top-4 bottom-16">
          {/* Y-axis grid lines */}
          {yLabels.map((yValue) => (
            <div key={yValue} className="absolute left-0 right-0" style={{ bottom: `${(yValue / maxY) * 100}%` }}>
              <div className="flex items-center gap-2">
                <span className="kol-mono-xs text-fg-64 w-10 text-right">
                  {yValue === 0 ? '0' : `${Math.round(yValue / 1000)}K`}
                </span>
                <div className="flex-1 border-t border-fg-16 opacity-60" />
              </div>
            </div>
          ))}

          {/* X-axis grid lines */}
          {xLabels.map((xValue) => (
            <div key={xValue} className="absolute top-0 bottom-0" style={{ left: `${(xValue / maxX) * 100}%` }}>
              <div className="relative h-full">
                <div className="absolute inset-y-0 left-0 border-l border-fg-12 opacity-40" />
                <span className="absolute -bottom-8 -translate-x-1/2 kol-mono-xs text-fg-64">{xValue}</span>
              </div>
            </div>
          ))}

          {/* Scatter points */}
          {data.map(point => (
            <span
              key={point.id}
              className="absolute block w-2 h-2 rounded-full"
              style={{
                background: pointColor,
                left: `${(point.x / maxX) * 100}%`,
                bottom: `${(point.y / maxY) * 100}%`,
                transform: 'translate(-50%, 50%)'
              }}
            />
          ))}
        </div>
      </div>

      {/* Legends */}
      {legends.length > 0 && (
        <div className="flex items-center gap-4">
          {legends.map((legend, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <span className={`donut-chart__dot ${legend.className}`} aria-hidden="true" />
              <span className="kol-mono-xs text-fg-64">{legend.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default DashScatterPlotCard
