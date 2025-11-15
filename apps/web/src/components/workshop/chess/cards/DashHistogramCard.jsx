// DashHistogramCard: Histogram distribution chart
const DashHistogramCard = ({
  title = "Rating Distribution",
  subtitle = "Frequency of ratings in buckets",
  data = [], // Array of { range, count, percentage }
  className = ""
}) => {
  const maxCount = Math.max(...data.map(d => d.count), 1)

  return (
    <div className={`flex flex-col gap-6 p-6 bg-fg-02 border border-fg-08 rounded h-full overflow-hidden ${className}`}>
      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h3 className="kol-heading-sm">{title}</h3>
          <p className="kol-text-sm text-fg-64">{subtitle}</p>
        </div>
      </div>

      {/* Histogram bars */}
      <div className="flex items-end justify-between gap-1 h-48">
        {data.map((bucket, idx) => {
          const height = (bucket.count / maxCount) * 100
          return (
            <div key={idx} className="flex-1 flex flex-col items-center gap-1">
              <div className="w-full flex flex-col justify-end items-center" style={{ height: '100%' }}>
                <div
                  className="w-full bg-accent-primary rounded-t-sm"
                  style={{ height: `${height}%` }}
                />
              </div>
            </div>
          )
        })}
      </div>

      {/* Labels */}
      <div className="flex items-start justify-between gap-1">
        {data.map((bucket, idx) => (
          <div key={idx} className="flex-1 flex flex-col items-center">
            <span className="kol-mono-xxs text-fg-64">{bucket.range}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default DashHistogramCard
