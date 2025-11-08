// DashStackedBarMiniCard: Compact card with stacked bar chart
const DashStackedBarMiniCard = ({
  title = "WIN RATE",
  value = "47.1%",
  data = [], // Array of { win, draw, loss, total } objects
  className = ""
}) => {
  return (
    <div className={`flex flex-col gap-4 p-6 bg-fg-02 border border-fg-08 rounded min-h-[180px] ${className}`}>
      <span className="kol-heading-sm">{title}</span>
      <span className="kol-heading-lg">{value}</span>

      <div className="flex-1 flex items-end gap-1">
        {data.map((item, i) => {
          const winRate = item.total > 0 ? (item.win / item.total) * 100 : 0
          const drawRate = item.total > 0 ? (item.draw / item.total) * 100 : 0
          const lossRate = item.total > 0 ? (item.loss / item.total) * 100 : 0

          return (
            <div key={i} className="flex-1 flex flex-col justify-end gap-0.5">
              <div className="bg-fg-32 rounded-sm" style={{ height: `${winRate}%` }} />
              <div className="bg-fg-24 rounded-sm" style={{ height: `${drawRate}%` }} />
              <div className="bg-fg-16 rounded-sm" style={{ height: `${lossRate}%` }} />
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default DashStackedBarMiniCard
