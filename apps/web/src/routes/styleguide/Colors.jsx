import GuideCard from '../../components/styleguide/atoms/GuideCard'
import ColorSwatch from '../../components/styleguide/molecules/ColorSwatch'
import { colorGroups, layerPairs, utilitySwatches } from '../../data/styleguide/tokens'

const luminance = (hex) => {
  const value = hex.replace('#', '')
  const normalized = value.length === 3
    ? value.split('').map((char) => char + char).join('')
    : value

  const channels = [0, 2, 4].map((index) => parseInt(normalized.slice(index, index + 2), 16) / 255)
  const linear = channels.map((channel) => channel <= 0.03928
    ? channel / 12.92
    : Math.pow((channel + 0.055) / 1.055, 2.4)
  )

  return 0.2126 * linear[0] + 0.7152 * linear[1] + 0.0722 * linear[2]
}

const getContrastRatio = (bgHex, textHex) => {
  if (!bgHex || !textHex) return null
  const L1 = luminance(bgHex)
  const L2 = luminance(textHex)
  const lighter = Math.max(L1, L2)
  const darker = Math.min(L1, L2)
  return parseFloat(((lighter + 0.05) / (darker + 0.05)).toFixed(2))
}

const getContrastLabel = (ratio) => {
  if (ratio === null) return '—'
  if (ratio >= 7) return 'AAA body'
  if (ratio >= 4.5) return 'AA body'
  if (ratio >= 3) return 'AA large'
  return 'Fail'
}

const statusCopy = {
  recommended: { label: 'Recommended', className: 'bgAbsoluteBlack10 textAbsoluteBlack' },
  support: { label: 'Support', className: 'bgAbsoluteBlack5 textAbsoluteBlack' },
  limited: { label: 'Limited Use', className: 'bgAbsoluteBlack textAbsoluteWhite' }
}

const StatusTag = ({ status }) => {
  const config = statusCopy[status] ?? statusCopy.support
  return (
    <span className={`kol-label rounded-full px-3 py-1 text-xs uppercase tracking-[0.2em] ${config.className}`}>
      {config.label}
    </span>
  )
}

const ContrastBadge = ({ ratio, tone }) => (
  <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em]" style={{ color: tone }}>
    {ratio ? (
      <>
        <span>{ratio.toFixed(2)}:1</span>
        <span className="opacity-70">{getContrastLabel(ratio)}</span>
      </>
    ) : (
      <span>—</span>
    )}
  </div>
)

const PairVariant = ({ label, data, theme }) => {
  const contrast = getContrastRatio(data.hex, data.textHex)
  const shellColor = theme === 'light' ? 'var(--surface-support-dark)' : 'var(--surface-support-light)'
  const metaColor = theme === 'light' ? 'var(--surface-support-light)' : 'var(--surface-support-dark)'

  return (
    <div className="rounded-2xl border borderAbsoluteBlack20 p-4 space-y-3 transition-colors" style={{ backgroundColor: shellColor }}>
      <div className="flex items-center justify-between">
        <span className="text-control uppercase tracking-[0.2em]">{label}</span>
      <ContrastBadge ratio={contrast} tone={metaColor} />
      </div>
      <div
        className="rounded-xl h-20 flex items-center justify-center"
        style={{
          backgroundColor: data.bgToken ? `var(${data.bgToken})` : data.hex,
          color: data.textToken ? `var(${data.textToken})` : data.textHex
        }}
      >
        <span className="kol-body">Sample Text</span>
      </div>
      <div className="space-y-1 text-[10px]" style={{ color: metaColor }}>
        {data.bgToken && <div>bg: {data.bgToken}</div>}
        {data.textToken && <div>text: {data.textToken}</div>}
        {data.hex && <div>{data.hex} → {data.textHex}</div>}
      </div>
    </div>
  )
}

const ColorPairCard = ({ pair }) => (
  <div className="space-y-4">
    <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
      <div>
        <h4 className="text-control uppercase tracking-[0.2em]">{pair.name}</h4>
        {pair.usage ? <p className="text-control opacity-60 max-w-xl">{pair.usage}</p> : null}
      </div>
      <StatusTag status={pair.status} />
    </div>
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <PairVariant label="Light Mode" data={pair.light} theme="light" />
      <PairVariant label="Dark Mode" data={pair.dark} theme="dark" />
    </div>
    {pair.note ? <p className="kol-mono-body text-sm opacity-70">{pair.note}</p> : null}
  </div>
)

const LayerVariant = ({ label, token, value }) => (
  <div className="rounded-2xl border borderAbsoluteBlack20 p-4 space-y-3" style={{ color: 'var(--foreground)' }}>
    <span className="text-control uppercase tracking-[0.2em]">{label}</span>
    <div className="rounded-xl h-16" style={{ backgroundColor: `var(${token})` }}></div>
    <div className="space-y-1 text-[10px] opacity-80">
      <div>{token}</div>
      <div>{value}</div>
    </div>
  </div>
)

const LayerCard = ({ layer }) => (
  <div className="space-y-4" style={{ color: 'var(--foreground)' }}>
    <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
      <h4 className="text-control uppercase tracking-[0.2em]">{layer.name}</h4>
      <span className="kol-label opacity-70">Layer utility</span>
    </div>
    <p className="kol-mono-body opacity-70">{layer.description}</p>
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <LayerVariant label="On light surfaces" token={layer.light.token} value={layer.light.value} />
      <LayerVariant label="On dark surfaces" token={layer.dark.token} value={layer.dark.value} />
    </div>
  </div>
)

const Colors = () => {
  return (
    <div className="space-y-10">
      <div>
        <h2 className="kol-heading-section">Color Tokens</h2>
        <p className="kol-mono-body mt-4 max-w-2xl">
          Consolidated semantic pairs for surfaces, accents, and status colours. Each preview displays realtime theme tokens plus computed contrast guidance.
        </p>
      </div>

      {colorGroups.map((group) => (
        <GuideCard key={group.id} padding="lg" className="space-y-6">
          <div className="space-y-2">
            <h3 className="text-xl font-semibold" style={{ color: 'var(--foreground)' }}>{group.title}</h3>
            <p className="kol-mono-body opacity-70">{group.description}</p>
          </div>
          <div className="space-y-8">
            {group.pairs.map((pair) => (
              <ColorPairCard key={pair.id} pair={pair} />
            ))}
          </div>
        </GuideCard>
      ))}

      <GuideCard padding="lg" className="space-y-6">
        <div className="space-y-2">
          <h3 className="text-xl font-semibold" style={{ color: 'var(--foreground)' }}>Layer & Overlay Tokens</h3>
          <p className="kol-mono-body opacity-70">Use these tints to introduce elevation or atmospheric overlays while maintaining theme-aware contrast.</p>
        </div>
        <div className="space-y-8">
          {layerPairs.map((layer) => (
            <LayerCard key={layer.id} layer={layer} />
          ))}
        </div>
      </GuideCard>

      <GuideCard padding="lg" className="space-y-6">
        <div className="space-y-2">
          <h3 className="text-xl font-semibold" style={{ color: 'var(--foreground)' }}>Utility Swatches</h3>
          <p className="kol-mono-body opacity-70">Additional accent and status values for hover, muted, and pressed states.</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {utilitySwatches.map((swatch) => (
            <ColorSwatch
              key={swatch.id}
              name={swatch.name}
              token={swatch.token}
              foreground={swatch.foreground}
              description={swatch.description}
            />
          ))}
        </div>
      </GuideCard>
    </div>
  )
}

export default Colors
