const Histogram = ({
  data = [],
  barColor = 'var(--kol-accent-primary)'
}) => {
  const maxCount = Math.max(...data.map(d => d.count), 1)

  return (
    <div className="flex min-w-0 h-full min-h-[200px]">
      <div className="flex flex-col justify-between pr-2 shrink-0">
        <span className="dash-caption text-fg-64 text-right">{maxCount}</span>
        <span className="dash-caption text-fg-64 text-right">{Math.round(maxCount / 2)}</span>
        <span className="dash-caption text-fg-64 text-right">0</span>
      </div>

      <div className="flex-1 flex flex-col gap-2 min-w-0 overflow-hidden">
        <div className="flex items-end gap-1 flex-1">
          {data.map((bucket, idx) => {
            const pct = Math.round((bucket.count / maxCount) * 100)
            return (
              <div key={idx} className="flex-1 flex items-end min-w-0 h-full">
                <div
                  className="w-full rounded-t-sm"
                  style={{ height: `${pct}%`, backgroundColor: barColor }}
                />
              </div>
            )
          })}
        </div>

        <div className="flex items-start gap-1">
          {data.map((bucket, idx) => (
            <div key={idx} className="flex-1 flex flex-col items-center min-w-0 overflow-hidden">
              <span className="dash-caption text-fg-64 truncate w-full text-center">{bucket.range}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Histogram
