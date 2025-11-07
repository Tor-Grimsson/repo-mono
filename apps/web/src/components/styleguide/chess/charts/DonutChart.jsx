// DonutChart: Ring chart with segments and leader lines
const DonutChart = ({ data = [], title = "Operating system", legendItems = [] }) => {
  // Default data if none provided
  const defaultData = [
    { label: 'Windows', value: 20, color: '#5eb3d6' },
    { label: 'macOS', value: 20, color: '#9C64FD' },
    { label: 'Other', value: 20, color: '#E16F2F' },
    { label: 'Linux', value: 20, color: '#0a682a' },
    { label: 'iOS', value: 20, color: '#F5D245' }
  ]

  const segments = data.length > 0 ? data : defaultData
  const total = segments.reduce((sum, seg) => sum + seg.value, 0)

  // Calculate segment paths
  let currentAngle = -90 // Start at top

  const segmentPaths = segments.map((segment, index) => {
    const angle = (segment.value / total) * 360
    const startAngle = currentAngle
    const endAngle = currentAngle + angle

    currentAngle = endAngle

    // Calculate arc path
    const startRad = (startAngle * Math.PI) / 180
    const endRad = (endAngle * Math.PI) / 180

    const outerRadius = 45
    const innerRadius = 30

    const x1 = 50 + outerRadius * Math.cos(startRad)
    const y1 = 50 + outerRadius * Math.sin(startRad)
    const x2 = 50 + outerRadius * Math.cos(endRad)
    const y2 = 50 + outerRadius * Math.sin(endRad)

    const x3 = 50 + innerRadius * Math.cos(endRad)
    const y3 = 50 + innerRadius * Math.sin(endRad)
    const x4 = 50 + innerRadius * Math.cos(startRad)
    const y4 = 50 + innerRadius * Math.sin(startRad)

    const largeArc = angle > 180 ? 1 : 0

    const pathData = [
      `M ${x1} ${y1}`,
      `A ${outerRadius} ${outerRadius} 0 ${largeArc} 1 ${x2} ${y2}`,
      `L ${x3} ${y3}`,
      `A ${innerRadius} ${innerRadius} 0 ${largeArc} 0 ${x4} ${y4}`,
      'Z'
    ].join(' ')

    // Calculate label position (midpoint of arc, extended outward)
    const midAngle = (startAngle + endAngle) / 2
    const midRad = (midAngle * Math.PI) / 180
    const labelRadius = 58
    const labelX = 50 + labelRadius * Math.cos(midRad)
    const labelY = 50 + labelRadius * Math.sin(midRad)

    // Line end points for leader lines
    const lineEndRadius = 52
    const lineEndX = 50 + lineEndRadius * Math.cos(midRad)
    const lineEndY = 50 + lineEndRadius * Math.sin(midRad)

    return {
      path: pathData,
      color: segment.color,
      label: segment.label,
      percentage: ((segment.value / total) * 100).toFixed(0),
      labelX,
      labelY,
      lineEndX,
      lineEndY,
      midAngle
    }
  })

  return (
    <div className="chess-donut-chart">
      <div className="chess-donut-chart__header">
        <span className="chess-donut-chart__title">{title}</span>
        {legendItems.length > 0 && (
          <div className="chess-donut-chart__legend">
            {legendItems.map((item, index) => (
              <span key={index} className="chess-donut-chart__legend-item">
                <span
                  className="chess-donut-chart__legend-dot"
                  style={{ background: item.color }}
                />
                {item.label}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="chess-donut-chart__container">
        <svg viewBox="0 0 100 100" className="chess-donut-chart__svg">
          {/* Segments */}
          {segmentPaths.map((segment, index) => (
            <g key={index}>
              <path
                d={segment.path}
                fill={segment.color}
                opacity="0.85"
              />
            </g>
          ))}

          {/* Leader lines and labels */}
          {segmentPaths.map((segment, index) => {
            // Determine label alignment based on angle
            const isRightSide = segment.midAngle > -90 && segment.midAngle < 90
            const textX = isRightSide ? segment.labelX + 8 : segment.labelX - 8

            return (
              <g key={`label-${index}`}>
                {/* Dashed leader line */}
                <line
                  x1={segment.lineEndX}
                  y1={segment.lineEndY}
                  x2={segment.labelX}
                  y2={segment.labelY}
                  stroke="currentColor"
                  strokeWidth="0.3"
                  strokeDasharray="1 1"
                  opacity="0.4"
                />

                {/* Color box */}
                <rect
                  x={isRightSide ? segment.labelX : segment.labelX - 3}
                  y={segment.labelY - 2}
                  width="3"
                  height="4"
                  fill={segment.color}
                  opacity="0.9"
                />

                {/* Label text */}
                <text
                  x={textX}
                  y={segment.labelY + 1.5}
                  fill="currentColor"
                  fontSize="3.5"
                  fontFamily="var(--kol-font-family-mono)"
                  textAnchor={isRightSide ? 'start' : 'end'}
                  opacity="0.85"
                >
                  {segment.label}: {segment.percentage}%
                </text>
              </g>
            )
          })}
        </svg>

        {/* Optional legend below chart */}
        {segments.length > 0 && (
          <div className="chess-donut-chart__legend-list">
            {segments.map((segment, index) => (
              <div key={index} className="chess-donut-chart__legend-row">
                <input type="checkbox" defaultChecked />
                <span className="chess-donut-chart__legend-label">Label</span>
                <span className="chess-donut-chart__legend-value">35.5K</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default DonutChart
