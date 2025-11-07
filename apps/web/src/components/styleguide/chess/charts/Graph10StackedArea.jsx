// Graph-10: Stacked Area Chart
const Graph10StackedArea = ({ className = '', minHeight = 320 } = {}) => {
  const wrapperClass = ['chess-chart chess-chart--stacked-area', className].filter(Boolean).join(' ')

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
          
          <g transform="translate(0, 20)">
            <circle cx="5" cy="9" r="5" fill="hsl(30, 100%, 50%)" />
            <text x="18" y="13" fill="currentColor" fontSize="11" opacity="0.8">
              Layer 1
            </text>
            
            <circle cx="93" cy="9" r="5" fill="hsl(200, 100%, 50%)" />
            <text x="106" y="13" fill="currentColor" fontSize="11" opacity="0.8">
              Layer 2
            </text>
            
            <circle cx="169" cy="9" r="5" fill="hsl(280, 100%, 50%)" />
            <text x="182" y="13" fill="currentColor" fontSize="11" opacity="0.8">
              Layer 3
            </text>
          </g>
        </g>

        {/* Chart area */}
        <g transform="translate(88, 80)">
          {/* Grid lines */}
          <g opacity="0.1">
            <line x1="0" y1="0" x2="488" y2="0" stroke="currentColor" strokeWidth="1" />
            <line x1="0" y1="36" x2="488" y2="36" stroke="currentColor" strokeWidth="1" />
            <line x1="0" y1="72" x2="488" y2="72" stroke="currentColor" strokeWidth="1" />
            <line x1="0" y1="108" x2="488" y2="108" stroke="currentColor" strokeWidth="1" />
            <line x1="0" y1="144" x2="488" y2="144" stroke="currentColor" strokeWidth="1" />
            <line x1="0" y1="180" x2="488" y2="180" stroke="currentColor" strokeWidth="1" />
          </g>

          {/* Layer 7 (Bottom - darkest) */}
          <path
            d="M 0 50 Q 70 45 140 55 T 280 70 Q 350 75 420 80 T 488 90 L 488 180 L 0 180 Z"
            fill="hsl(30, 100%, 50%)"
            opacity="0.8"
          />

          {/* Layer 6 */}
          <path
            d="M 0 60 Q 70 58 140 62 T 280 72 Q 350 74 420 78 T 488 85 L 488 180 L 0 180 Z"
            fill="hsl(45, 100%, 50%)"
            opacity="0.7"
          />

          {/* Layer 5 */}
          <path
            d="M 0 75 Q 70 72 140 76 T 280 85 Q 350 88 420 92 T 488 98 L 488 180 L 0 180 Z"
            fill="hsl(120, 100%, 40%)"
            opacity="0.6"
          />

          {/* Layer 4 */}
          <path
            d="M 0 95 Q 70 92 140 96 T 280 105 Q 350 108 420 112 T 488 118 L 488 180 L 0 180 Z"
            fill="hsl(180, 100%, 40%)"
            opacity="0.6"
          />

          {/* Layer 3 */}
          <path
            d="M 0 115 Q 70 112 140 116 T 280 125 Q 350 128 420 132 T 488 138 L 488 180 L 0 180 Z"
            fill="hsl(200, 100%, 50%)"
            opacity="0.7"
          />

          {/* Layer 2 */}
          <path
            d="M 0 140 Q 70 138 140 142 T 280 148 Q 350 150 420 154 T 488 158 L 488 180 L 0 180 Z"
            fill="hsl(250, 100%, 55%)"
            opacity="0.6"
          />

          {/* Layer 1 (Top - lightest) */}
          <path
            d="M 0 165 Q 70 163 140 166 T 280 170 Q 350 171 420 173 T 488 176 L 488 180 L 0 180 Z"
            fill="hsl(280, 100%, 60%)"
            opacity="0.5"
          />

          {/* Grid overlay for better readability */}
          <g opacity="0.15">
            <line x1="0" y1="180" x2="504" y2="180" stroke="currentColor" strokeWidth="1" />
          </g>
        </g>
      </svg>
    </div>
  )
}

export default Graph10StackedArea
