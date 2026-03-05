const ScatterPlot = ({
  data = [],
  maxX = 200,
  maxY = 3000,
  xLabels = [],
  yLabels = [],
  pointColor = 'var(--kol-palette-blue)',
  height = 320
}) => {
  const formatY = (v) => v === 0 ? '0' : v >= 1000 ? `${(v / 1000).toFixed(1).replace('.0', '')}K` : v

  return (
    <div className="flex">
      <div className="flex flex-col justify-between pr-2 py-1" style={{ height }}>
        {[...yLabels].reverse().map((yValue) => (
          <span key={yValue} className="dash-caption text-fg-64 text-right w-8">
            {formatY(yValue)}
          </span>
        ))}
      </div>

      <div className="flex-1 flex flex-col min-w-0">
        <div className="relative rounded overflow-hidden" style={{ height }}>
          {yLabels.map((yValue) => (
            <div
              key={yValue}
              className="absolute left-0 right-0 border-t border-fg-08"
              style={{ bottom: `${(yValue / maxY) * 100}%` }}
            />
          ))}

          {xLabels.map((xValue) => (
            <div
              key={xValue}
              className="absolute top-0 bottom-0 border-l border-fg-08"
              style={{ left: `${(xValue / maxX) * 100}%` }}
            />
          ))}

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

        <div className="flex justify-between pt-2">
          <span className="dash-caption text-fg-64">0</span>
          {xLabels.map((xValue) => (
            <span key={xValue} className="dash-caption text-fg-64">{xValue}</span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ScatterPlot
