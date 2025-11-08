// Graph-11: 3D Column Chart
const Graph11ColumnChart = ({ className = '', minHeight = 320 } = {}) => {
  const columns = [
    { month: 'Jan', value: 25, x: 20 },
    { month: 'Feb', value: 76, x: 101.6 },
    { month: 'Mar', value: 39, x: 183.2 },
    { month: 'Apr', value: 52, x: 264.8 },
    { month: 'May', value: 25, x: 346.4 },
    { month: 'Jun', value: 76, x: 428 }
  ]

  const columnWidth = 56
  const maxHeight = 135
  const baseY = 36

  const wrapperClass = ['chess-chart chess-chart--column', className].filter(Boolean).join(' ')

  return (
    <div
      className={wrapperClass}
      style={{ width: '100%', height: '100%', minHeight: `${minHeight}px` }}
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 600 320"
        fill="none"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Y-axis label */}
        <g transform="translate(16, 72)">
          <text
            x="9"
            y="150"
            fill="currentColor"
            fontSize="12"
            opacity="0.6"
            writingMode="vertical-rl"
            textAnchor="middle"
          >
            Unique visitors
          </text>
        </g>

        {/* Legend */}
        <g transform="translate(86.5, 16)">
          <text x="0" y="12" fill="currentColor" fontSize="12" opacity="0.8">
            Legend Title
          </text>
          
          <g transform="translate(0, 20)">
            <circle cx="5" cy="9" r="5" fill="hsl(210, 100%, 60%)" />
            <text x="18" y="13" fill="currentColor" fontSize="11" opacity="0.8">
              Dataset A
            </text>
            
            <circle cx="93" cy="9" r="5" fill="hsl(280, 100%, 60%)" />
            <text x="106" y="13" fill="currentColor" fontSize="11" opacity="0.8">
              Dataset B
            </text>
            
            <circle cx="169" cy="9" r="5" fill="hsl(160, 100%, 60%)" />
            <text x="182" y="13" fill="currentColor" fontSize="11" opacity="0.8">
              Dataset C
            </text>
          </g>
        </g>

        {/* Chart area */}
        <g transform="translate(72, 80)">
          {columns.map((col, idx) => {
            const height = (col.value / 100) * maxHeight
            const yPos = maxHeight - height
            
            return (
              <g key={idx} transform={`translate(${col.x}, ${baseY})`}>
                {/* Background column (full height for 3D effect) */}
                <rect
                  x="0"
                  y="8"
                  width="28"
                  height="127"
                  fill="hsl(220, 20%, 20%)"
                  opacity="0.3"
                />
                <rect
                  x="28"
                  y="8"
                  width="28"
                  height="127"
                  fill="hsl(220, 20%, 15%)"
                  opacity="0.3"
                />
                
                {/* Top cap for 3D effect */}
                <path
                  d="M 0 0 L 28 0 L 42 8 L 14 8 Z"
                  fill="hsl(220, 20%, 25%)"
                  opacity="0.4"
                />

                {/* Actual value column */}
                <rect
                  x="0"
                  y={yPos + 8}
                  width="28"
                  height={height}
                  fill="hsl(210, 100%, 50%)"
                />
                <rect
                  x="28"
                  y={yPos + 8}
                  width="28"
                  height={height}
                  fill="hsl(210, 100%, 40%)"
                />
                
                {/* Top cap for value */}
                <path
                  d={`M 0 ${yPos} L 28 ${yPos} L 42 ${yPos + 8} L 14 ${yPos + 8} Z`}
                  fill="hsl(210, 100%, 60%)"
                />

                {/* Percentage label */}
                <text
                  x="11"
                  y={yPos - 10}
                  fill="currentColor"
                  fontSize="14"
                  fontWeight="600"
                  textAnchor="start"
                >
                  {col.value}%
                </text>

                {/* Month label */}
                <text
                  x="14"
                  y="175"
                  fill="currentColor"
                  fontSize="14"
                  opacity="0.7"
                  textAnchor="middle"
                >
                  {col.month}
                </text>
              </g>
            )
          })}
        </g>
      </svg>
    </div>
  )
}

export default Graph11ColumnChart
