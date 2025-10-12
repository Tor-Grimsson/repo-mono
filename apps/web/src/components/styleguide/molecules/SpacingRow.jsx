const SpacingRow = ({ token, rem, label }) => {
  const sizeStyle = {
    width: `var(${token})`,
    height: '12px'
  }

  return (
    <div
      className="surface-panel rounded-2xl border px-4 py-3 flex items-center gap-6"
      style={{ borderColor: 'var(--surface-border)' }}
    >
      <div
        className="h-3 rounded-full"
        style={{ ...sizeStyle, backgroundColor: 'var(--foreground)' }}
      />
      <div className="flex flex-col text-xs opacity-70">
        <span className="font-semibold text-xs opacity-100">{label}</span>
        <span>{token}</span>
        <span>{rem}</span>
      </div>
    </div>
  )
}

export default SpacingRow
