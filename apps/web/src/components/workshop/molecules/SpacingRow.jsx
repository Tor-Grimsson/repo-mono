import DesCard from './DesCard'

const SpacingRow = ({ token, rem, label }) => {
  const sizeStyle = {
    width: `var(${token})`,
    height: '12px'
  }

  return (
    <div className="space-y-4">
      <DesCard
        name={label}
        description={`${rem} (${token})`}
      />

      <div className="py-8 p-4 rounded bg-surface-primary border border-auto">
        <div className="flex items-center gap-6">
          <div className="h-3 rounded-full" style={{ ...sizeStyle, backgroundColor: 'var(--kol-surface-on-primary)' }} />
          <span className="kol-mono-xs opacity-70">{token}</span>
        </div>
      </div>
    </div>
  )
}

export default SpacingRow
