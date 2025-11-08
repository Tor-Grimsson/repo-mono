// DashSimpleMetricCard: Minimal metric card without border accent
const DashSimpleMetricCard = ({
  label = "MONTHS TRACKED",
  value = "106",
  delta = "100% coverage",
  className = ""
}) => {
  return (
    <div className={`flex flex-col gap-3 p-6 bg-fg-02 border border-fg-08 rounded ${className}`}>
      <span className="kol-mono-xs text-fg-64 uppercase tracking-widest">{label}</span>
      <span className="kol-heading-lg">{value}</span>
      <span className="kol-mono-sm text-fg-80">{delta}</span>
    </div>
  )
}

export default DashSimpleMetricCard
