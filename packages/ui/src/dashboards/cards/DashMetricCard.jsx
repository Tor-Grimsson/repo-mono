const DashMetricCard = ({
  label,
  value,
  delta,
  borderColor,
  className = ''
}) => {
  const borderStyle = borderColor
    ? { borderLeftWidth: '3px', borderLeftColor: borderColor }
    : undefined

  return (
    <div
      className={`dash-card ${className}`.trim()}
      style={borderStyle}
    >
      <span className="dash-detail text-fg-64">{label}</span>
      <span className="dash-value">{value}</span>
      {delta && <span className="dash-body text-fg-80">{delta}</span>}
    </div>
  )
}

export default DashMetricCard
