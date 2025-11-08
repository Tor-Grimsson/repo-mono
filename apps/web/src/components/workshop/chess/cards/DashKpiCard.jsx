// DashKpiCard: KPI card with left border accent
const DashKpiCard = ({
  label = "GAMES PLAYED",
  value = "1,234",
  delta = "+69",
  borderColor = "#F5D245",
  className = ""
}) => {
  return (
    <div
      className={`flex flex-col gap-3 p-6 bg-fg-02 border border-fg-08 rounded min-h-[180px] ${className}`}
      style={{ borderLeftWidth: '3px', borderLeftColor: borderColor }}
    >
      <span className="kol-mono-xs text-fg-64 uppercase tracking-widest">{label}</span>
      <span className="kol-heading-lg">{value}</span>
      <span className="kol-mono-sm text-fg-80">{delta}</span>
    </div>
  )
}

export default DashKpiCard
