// Graph-12: Area Chart with Multiple Lines
const Graph12AreaChart = ({ className = '', minHeight = 320 } = {}) => {
  const wrapperClass = ['chess-chart chess-chart--area', className].filter(Boolean).join(' ')

  return (
    <div
      className={wrapperClass}
      style={{ width: '100%', height: '100%', minHeight: `${minHeight}px` }}
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 616 320"
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
          
          {/* Legend items */}
          <g transform="translate(0, 20)">
            {/* Item 1 */}
            <circle cx="5" cy="9" r="5" fill="hsl(210, 100%, 60%)" />
            <text x="18" y="13" fill="currentColor" fontSize="11" opacity="0.8">
              Dataset A
            </text>
            
            {/* Item 2 */}
            <circle cx="93" cy="9" r="5" fill="hsl(280, 100%, 60%)" />
            <text x="106" y="13" fill="currentColor" fontSize="11" opacity="0.8">
              Dataset B
            </text>
            
            {/* Item 3 */}
            <circle cx="169" cy="9" r="5" fill="hsl(160, 100%, 60%)" />
            <text x="182" y="13" fill="currentColor" fontSize="11" opacity="0.8">
              Dataset C
            </text>
          </g>
        </g>

        {/* Chart area */}
        <g transform="translate(88, 80)">
          {/* Grid lines */}
          <g opacity="0.1">
            <line x1="0" y1="0" x2="503" y2="0" stroke="currentColor" strokeWidth="1" />
            <line x1="0" y1="40" x2="503" y2="40" stroke="currentColor" strokeWidth="1" />
            <line x1="0" y1="80" x2="503" y2="80" stroke="currentColor" strokeWidth="1" />
            <line x1="0" y1="120" x2="503" y2="120" stroke="currentColor" strokeWidth="1" />
            <line x1="0" y1="160" x2="503" y2="160" stroke="currentColor" strokeWidth="1" />
            <line x1="0" y1="197" x2="503" y2="197" stroke="currentColor" strokeWidth="1" />
          </g>

          {/* Area fills */}
          <defs>
            <linearGradient id="area-gradient-1" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="hsl(210, 100%, 60%)" stopOpacity="0.3" />
              <stop offset="100%" stopColor="hsl(210, 100%, 60%)" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="area-gradient-2" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="hsl(280, 100%, 60%)" stopOpacity="0.2" />
              <stop offset="100%" stopColor="hsl(280, 100%, 60%)" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="area-gradient-3" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="hsl(160, 100%, 60%)" stopOpacity="0.2" />
              <stop offset="100%" stopColor="hsl(160, 100%, 60%)" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Area 1 */}
          <path
            d="M 0 180 L 70 160 L 140 140 L 210 120 L 280 100 L 350 90 L 420 85 L 490 80 L 490 197 L 420 197 L 350 197 L 280 197 L 210 197 L 140 197 L 70 197 L 0 197 Z"
            fill="url(#area-gradient-1)"
          />
          <path
            d="M 0 180 L 70 160 L 140 140 L 210 120 L 280 100 L 350 90 L 420 85 L 490 80"
            stroke="hsl(210, 100%, 60%)"
            strokeWidth="2"
            fill="none"
          />

          {/* Area 2 */}
          <path
            d="M 0 150 L 70 135 L 140 125 L 210 115 L 280 110 L 350 105 L 420 100 L 490 95 L 490 197 L 420 197 L 350 197 L 280 197 L 210 197 L 140 197 L 70 197 L 0 197 Z"
            fill="url(#area-gradient-2)"
          />
          <path
            d="M 0 150 L 70 135 L 140 125 L 210 115 L 280 110 L 350 105 L 420 100 L 490 95"
            stroke="hsl(280, 100%, 60%)"
            strokeWidth="2"
            fill="none"
          />

          {/* Area 3 */}
          <path
            d="M 0 170 L 70 155 L 140 145 L 210 135 L 280 130 L 350 125 L 420 120 L 490 115 L 490 197 L 420 197 L 350 197 L 280 197 L 210 197 L 140 197 L 70 197 L 0 197 Z"
            fill="url(#area-gradient-3)"
          />
          <path
            d="M 0 170 L 70 155 L 140 145 L 210 135 L 280 130 L 350 125 L 420 120 L 490 115"
            stroke="hsl(160, 100%, 60%)"
            strokeWidth="2"
            fill="none"
          />
        </g>
      </svg>
    </div>
  )
}

export default Graph12AreaChart
