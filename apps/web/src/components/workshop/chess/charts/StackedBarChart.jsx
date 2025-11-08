// StackedBarChart: Vertical stacked bars showing distributions
const StackedBarChart = ({ title = "blits", subtitle = "106 months", data = [] }) => {
  // Default data if none provided (12 months)
  const defaultData = Array.from({ length: 12 }, (_, i) => ({
    month: i + 1,
    segments: [
      { value: Math.random() * 30 + 20, color: '#FFFFFF' },
      { value: Math.random() * 20 + 10, color: '#9C64FD' },
      { value: Math.random() * 15 + 5, color: '#5eb3d6' }
    ]
  }))

  const bars = data.length > 0 ? data : defaultData

  return (
    <div className="chess-stacked-bar-chart">
      <div className="chess-stacked-bar-chart__header">
        <div className="chess-stacked-bar-chart__header-top">
          <span className="chess-stacked-bar-chart__icon">⋮⋮</span>
          <button className="chess-stacked-bar-chart__menu">⋯</button>
        </div>
        <span className="chess-stacked-bar-chart__label">Total games</span>
        <h3 className="chess-stacked-bar-chart__title">{title}</h3>
        <span className="chess-stacked-bar-chart__subtitle">{subtitle}</span>
      </div>

      <div className="chess-stacked-bar-chart__bars">
        <svg viewBox="0 0 100 60" preserveAspectRatio="none">
          {bars.map((bar, barIndex) => {
            const barWidth = 100 / bars.length
            const x = barIndex * barWidth + barWidth * 0.2
            const width = barWidth * 0.6

            // Calculate total for this bar
            const total = bar.segments.reduce((sum, seg) => sum + seg.value, 0)

            let currentY = 60

            return (
              <g key={barIndex}>
                {bar.segments.map((segment, segIndex) => {
                  const height = (segment.value / total) * 55
                  const y = currentY - height
                  currentY = y

                  return (
                    <rect
                      key={segIndex}
                      x={x}
                      y={y}
                      width={width}
                      height={height}
                      fill={segment.color}
                      opacity="0.85"
                      rx="0.5"
                    />
                  )
                })}
              </g>
            )
          })}
        </svg>
      </div>
    </div>
  )
}

export default StackedBarChart
