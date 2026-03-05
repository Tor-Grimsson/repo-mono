import { useContext, useLayoutEffect } from 'react'
import { ShellTocContext } from '@kol/ui/layout'
import WorkshopSidebarContent from '../../components/workshop/molecules/WorkshopSidebarContent'
import DesPage from '../../components/workshop/molecules/DesPage'
import DesSection from '../../components/workshop/molecules/DesSection'
import DesCard from '../../components/workshop/molecules/DesCard'
import { SectionToggle, Divider, Table } from '@kol/ui'
import useSectionExpansion from '../../components/workshop/useSectionExpansion'

const luminance = (hex) => {
  if (!hex) return null
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
  if (L1 === null || L2 === null) return null
  const lighter = Math.max(L1, L2)
  const darker = Math.min(L1, L2)
  return (lighter + 0.05) / (darker + 0.05)
}

const getContrastLabel = (ratio) => {
  if (ratio === null) return '—'
  if (ratio >= 7) return 'AAA body'
  if (ratio >= 4.5) return 'AA body'
  if (ratio >= 3) return 'AA large'
  return 'Fail'
}

const statusCopy = {
  recommended: { label: 'Recommended', className: 'kol-table-pill-dark', border: true },
  support: { label: 'Support', className: 'kol-table-pill-muted', border: false },
  limited: { label: 'Limited Use', className: 'kol-table-pill-light', border: true }
}

const StatusTag = ({ status }) => {
  const config = statusCopy[status] ?? statusCopy.support
  const borderClass = config.border ? 'border border-auto' : ''
  return (
    <span className={`kol-table-pill ${config.className} ${borderClass}`.trim()}>
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
  const shellColor = theme === 'light' ? 'var(--kol-color-median-dark)' : 'var(--kol-color-median-light)'
  const metaColor = theme === 'light' ? 'var(--kol-color-median-light)' : 'var(--kol-color-median-dark)'

  return (
    <div className="rounded-2xl border border-auto p-4 space-y-3 transition-colors" style={{ backgroundColor: shellColor }}>
      <div className="flex items-center justify-between gap-8">
        <span className="kol-mono-xs uppercase whitespace-nowrap">{label}</span>
        <ContrastBadge ratio={contrast} tone={metaColor} />
      </div>
      <div
        className="rounded-xl h-20 flex items-center justify-center"
        style={{
          backgroundColor: data.bgToken ? `var(${data.bgToken})` : data.hex,
          color: data.textToken ? `var(${data.textToken})` : data.textHex
        }}
      >
        <span className="kol-text">Sample Text</span>
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
    {pair.note ? <p className="kol-mono-text text-sm opacity-70">{pair.note}</p> : null}
  </div>
)

const LayerVariant = ({ label, token, value }) => (
  <div className="rounded-2xl border border-auto p-4 space-y-3" style={{ color: 'var(--kol-surface-on-primary)' }}>
    <span className="kol-label-compact">{label}</span>
    <div className="rounded-xl h-16" style={{ backgroundColor: `var(${token})` }}></div>
    <div className="space-y-1 text-[10px] opacity-80">
      <div>{token}</div>
      <div>{value}</div>
    </div>
  </div>
)

const LayerCard = ({ layer }) => (
  <div className="space-y-4" style={{ color: 'var(--kol-surface-on-primary)' }}>
    <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
      <h4 className="text-control uppercase tracking-[0.2em]">{layer.name}</h4>
      <span className="kol-label opacity-70">Layer utility</span>
    </div>
    <p className="kol-mono-text opacity-70">{layer.description}</p>
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <LayerVariant label="On light surfaces" token={layer.light.token} value={layer.light.value} />
      <LayerVariant label="On dark surfaces" token={layer.dark.token} value={layer.dark.value} />
    </div>
  </div>
)

const wrapTokens = (text) => {
  // Match --kol-* tokens in var() or standalone
  const parts = text.split(/(--kol-[a-z0-9-]+)/g)
  return parts.map((part, i) =>
    part.startsWith('--kol-') ? (
      <span key={i} className="kol-table-token bg-fg-08">{part}</span>
    ) : part
  )
}

const renderColorCell = (mode) => (row) => {
  const value = row[mode]
  if (!value) {
    return <span className="kol-mono-text opacity-60">—</span>
  }

  // Check if this is a border utility by looking at the token
  const isBorderUtility = row.token && row.token.includes('border-surface')

  return (
    <div className="flex items-center gap-3">
      {isBorderUtility ? (
        <span
          className="w-6 h-6 rounded flex items-center justify-center"
          style={{
            backgroundColor: mode === 'dark' ? '#f8f8f8' : '#0d0d0d',
            border: `2px solid ${value.hex}`
          }}
        />
      ) : (
        <span
          className="w-6 h-6 rounded border border-auto"
          style={{ backgroundColor: value.hex }}
        />
      )}
      <span className="kol-mono-text text-xs">{wrapTokens(value.label)}</span>
    </div>
  )
}

const Section = ({ id, title, expandedSections, toggleSection, children }) => (
  <div className="space-y-4" id={id}>
    <SectionToggle
      label={title}
      isExpanded={expandedSections[id]}
      onToggle={() => toggleSection(id)}
    />
    {expandedSections[id] ? (
      <div className="space-y-8 pt-2">
        {children}
      </div>
    ) : null}
  </div>
)

const semanticTokenPairs = [
  {
    id: 'surface-primary',
    category: 'surface',
    name: 'Surface Primary',
    status: 'recommended',
    background: {
      token: '--kol-surface-primary',
      light: '#fafafa',
      dark: '#121215'
    },
    foreground: {
      token: '--kol-surface-on-primary',
      light: '#121215',
      dark: '#fafafa'
    },
    usage: 'App background, primary containers, and hero sections.'
  },
  {
    id: 'surface-secondary',
    category: 'surface',
    name: 'Surface Secondary',
    status: 'recommended',
    background: {
      token: '--kol-surface-secondary',
      light: '#f8f8f8',
      dark: '#19191d'
    },
    foreground: {
      token: '--kol-surface-on-secondary',
      light: '#19191d',
      dark: '#f8f8f8'
    },
    usage: 'Raised cards, neutral panels, and drawer surfaces.'
  },
  {
    id: 'surface-tertiary',
    category: 'surface',
    name: 'Surface Tertiary',
    status: 'limited',
    background: {
      token: '--kol-surface-tertiary',
      light: '#ffffff',
      dark: '#0e0e11'
    },
    foreground: {
      token: '--kol-surface-on-tertiary',
      light: '#0e0e11',
      dark: '#ffffff'
    },
    usage: 'Dividers, table rows, and chrome where typography is large.',
    note: 'Meets contrast for ≥18px text or iconic content.'
  },
  {
    id: 'surface-inverse',
    category: 'surface',
    name: 'Surface Inverse',
    status: 'recommended',
    background: {
      token: '--kol-surface-inverse',
      light: '#0e0e11',
      dark: '#fcfbf8'
    },
    foreground: {
      token: '--kol-surface-on-inverse',
      light: '#fcfbf8',
      dark: '#0e0e11'
    },
    usage: 'Navigation bars, hero banners, and inverted callouts.'
  },
  {
    id: 'container-primary',
    category: 'container',
    name: 'Container Primary',
    status: 'recommended',
    background: {
      token: '--kol-container-primary',
      light: '#f5f5f5',
      dark: '#19191d'
    },
    foreground: {
      token: '--kol-container-on-primary',
      light: '#19191d',
      dark: '#f5f5f5'
    },
    usage: 'Default component backgrounds inside cards and panels.'
  },
  {
    id: 'container-secondary',
    category: 'container',
    name: 'Container Secondary',
    status: 'support',
    background: {
      token: '--kol-container-secondary',
      light: '#eeeeee',
      dark: '#202026'
    },
    foreground: {
      token: '--kol-container-on-secondary',
      light: '#202026',
      dark: '#eeeeee'
    },
    usage: 'Nested panels, input shells, and subdued containers.'
  },
  {
    id: 'container-elevated',
    category: 'container',
    name: 'Container Elevated',
    status: 'support',
    background: {
      token: '--kol-container-elevated',
      light: '#f5f5f5',
      dark: '#242427'
    },
    foreground: {
      token: '--kol-container-on-elevated',
      light: '#242427',
      dark: '#f5f5f5'
    },
    usage: 'Modals, dropdowns, tooltips, and other elevated UI.'
  },
  {
    id: 'support-split',
    category: 'support',
    name: 'Support Split',
    status: 'support',
    background: {
      token: '--kol-color-median-light',
      light: '#f8f8f8',
      dark: '#0d0d0d'
    },
    foreground: {
      token: '--kol-color-median-dark',
      light: '#0d0d0d',
      dark: '#f8f8f8'
    },
    usage: 'Alternating bands, footer panels, and split layouts.',
    note: 'Automatically inverts foreground/background in dark mode.'
  },
  {
    id: 'support-absolute-black',
    category: 'support',
    name: 'Absolute Black',
    status: 'support',
    background: {
      token: '--kol-color-absolute-black',
      light: '#000000',
      dark: '#000000'
    },
    foreground: {
      token: '--kol-color-median-light',
      light: '#f8f8f8',
      dark: '#f8f8f8'
    },
    usage: 'Full-bleed hero treatments and emergency contrast moments.',
    note: 'Use sparingly—pure black can overpower adjacent UI.'
  },
  {
    id: 'support-absolute-white',
    category: 'support',
    name: 'Absolute White',
    status: 'support',
    background: {
      token: '--kol-color-absolute-white',
      light: '#ffffff',
      dark: '#ffffff'
    },
    foreground: {
      token: '--kol-color-median-dark',
      light: '#0d0d0d',
      dark: '#0d0d0d'
    },
    usage: 'Hero typography, editorial callouts, and photographic overlays.'
  },
  {
    id: 'accent-primary',
    category: 'accent',
    name: 'Accent Primary',
    status: 'recommended',
    background: {
      token: '--kol-accent-primary',
      light: '#f5d245',
      dark: '#f5d245'
    },
    foreground: {
      token: '--kol-accent-on-primary',
      light: '#1e1e21',
      dark: '#1e1e21'
    },
    usage: 'Primary calls to action, links, and highlight elements.',
    note: 'Stays constant across themes for brand recognition.'
  },
  {
    id: 'accent-primary-strong',
    category: 'accent',
    name: 'Accent Primary Strong',
    status: 'support',
    background: {
      token: '--kol-accent-primary-strong',
      light: '#f5bb1d',
      dark: '#f5bb1d'
    },
    foreground: {
      token: '--kol-accent-on-primary',
      light: '#1e1e21',
      dark: '#1e1e21'
    },
    usage: 'Hover and active states for accent components.'
  },
  {
    id: 'accent-primary-muted',
    category: 'accent',
    name: 'Accent Primary Muted',
    status: 'support',
    background: {
      token: '--kol-accent-primary-muted',
      light: 'rgba(245, 210, 69, 0.18)',
      dark: 'rgba(245, 210, 69, 0.24)'
    },
    foreground: {
      token: '--kol-accent-on-primary',
      light: '#1e1e21',
      dark: '#1e1e21'
    },
    usage: 'Badges, subtle highlight panels, and chips.'
  },
  {
    id: 'status-danger',
    category: 'status',
    name: 'Status Danger',
    status: 'recommended',
    background: {
      token: '--kol-status-danger',
      light: '#9b3928',
      dark: '#bc583f'
    },
    foreground: {
      token: '--kol-status-on-danger',
      light: '#ffffff',
      dark: '#ffffff'
    },
    usage: 'Destructive CTAs, error banners, and blocking alerts.'
  },
  {
    id: 'status-danger-strong',
    category: 'status',
    name: 'Status Danger Strong',
    status: 'support',
    background: {
      token: '--kol-status-danger-strong',
      light: '#bc583f',
      dark: '#9b3928'
    },
    foreground: {
      token: '--kol-status-on-danger',
      light: '#ffffff',
      dark: '#ffffff'
    },
    usage: 'Active/pressed states for destructive actions.'
  },
  {
    id: 'status-danger-muted',
    category: 'status',
    name: 'Status Danger Muted',
    status: 'support',
    background: {
      token: '--kol-status-danger-muted',
      light: 'rgba(155, 57, 40, 0.18)',
      dark: 'rgba(188, 88, 63, 0.24)'
    },
    foreground: {
      token: '--kol-status-on-danger',
      light: '#ffffff',
      dark: '#ffffff'
    },
    usage: 'Subtle error backgrounds, focus rings, and data viz accents.'
  }
]

const brandPrimitives = [
  { token: '--kol-color-brand-light', light: { label: '#fcfbf8', hex: '#fcfbf8' }, dark: { label: '#fcfbf8', hex: '#fcfbf8' }, usage: 'Base brand neutral; feeds --kol-surface-primary.' },
  { token: '--kol-color-brand-dark', light: { label: '#1e1e21', hex: '#1e1e21' }, dark: { label: '#1e1e21', hex: '#1e1e21' }, usage: 'Brand charcoal; feeds --kol-surface-on-* tokens.' },
  { token: '--kol-color-brand-yellow', light: { label: '#f5d245', hex: '#f5d245' }, dark: { label: '#f5d245', hex: '#f5d245' }, usage: 'Primary accent primitive.' },
  { token: '--kol-color-brand-yellow-deep', light: { label: '#f5bb1d', hex: '#f5bb1d' }, dark: { label: '#f5bb1d', hex: '#f5bb1d' }, usage: 'Accent strong states and pressed feedback.' },
  { token: '--kol-color-brand-orange', light: { label: '#a83e01', hex: '#a83e01' }, dark: { label: '#a83e01', hex: '#a83e01' }, usage: 'Warm accent bridging yellow and red primitives for gradients and data visualisation.' },
  { token: '--kol-color-brand-red', light: { label: '#bc583f', hex: '#bc583f' }, dark: { label: '#bc583f', hex: '#bc583f' }, usage: 'Origin for status danger ramp.' },
  { token: '--kol-color-median-light', light: { label: '#f8f8f8', hex: '#f8f8f8' }, dark: { label: '#f8f8f8', hex: '#f8f8f8' }, usage: 'Support band (light).' },
  { token: '--kol-color-median-dark', light: { label: '#0d0d0d', hex: '#0d0d0d' }, dark: { label: '#0d0d0d', hex: '#0d0d0d' }, usage: 'Support band (dark).' },
  { token: '--kol-color-absolute-white', light: { label: '#ffffff', hex: '#ffffff' }, dark: { label: '#ffffff', hex: '#ffffff' }, usage: 'Absolute white primitive for imagery and hero treatments.' },
  { token: '--kol-color-absolute-black', light: { label: '#000000', hex: '#000000' }, dark: { label: '#000000', hex: '#000000' }, usage: 'Absolute black primitive for imagery and hero treatments.' }
]

const neutralRamp = [
  { token: '--kol-color-neutral-50', light: { label: '#fafafa', hex: '#fafafa' }, dark: { label: '#fafafa', hex: '#fafafa' }, usage: 'Highest neutral highlight; rarely used directly.' },
  { token: '--kol-color-neutral-100', light: { label: '#f5f5f5', hex: '#f5f5f5' }, dark: { label: '#f5f5f5', hex: '#f5f5f5' }, usage: 'Feeds --kol-surface-secondary and container primary.' },
  { token: '--kol-color-neutral-200', light: { label: '#eeeeee', hex: '#eeeeee' }, dark: { label: '#eeeeee', hex: '#eeeeee' }, usage: 'Feeds --kol-surface-tertiary and container secondary.' },
  { token: '--kol-color-neutral-300', light: { label: '#e0e0e0', hex: '#e0e0e0' }, dark: { label: '#e0e0e0', hex: '#e0e0e0' }, usage: 'Legacy ramp reference; prefer semantic tokens.' },
  { token: '--kol-color-neutral-400', light: { label: '#bfbfbf', hex: '#bfbfbf' }, dark: { label: '#bfbfbf', hex: '#bfbfbf' }, usage: 'Hover borders and thin outlines.' },
  { token: '--kol-color-neutral-500', light: { label: '#757575', hex: '#757575' }, dark: { label: '#757575', hex: '#757575' }, usage: 'Muted body copy and metadata.' },
  { token: '--kol-color-neutral-600', light: { label: '#616161', hex: '#616161' }, dark: { label: '#616161', hex: '#616161' }, usage: 'Extended neutral reference.' },
  { token: '--kol-color-neutral-700', light: { label: '#424242', hex: '#424242' }, dark: { label: '#424242', hex: '#424242' }, usage: 'Feeds `--foreground-muted`.' },
  { token: '--kol-color-neutral-800', light: { label: '#212121', hex: '#212121' }, dark: { label: '#212121', hex: '#212121' }, usage: 'Deep neutral for overlays/shadows.' },
  { token: '--kol-color-neutral-900', light: { label: '#1e1e21', hex: '#1e1e21' }, dark: { label: '#1e1e21', hex: '#1e1e21' }, usage: 'Base charcoal used for brand dark foreground.' }
]

const opacityHexScale = [
  {
    level: '01',
    token: '--kol-opacity-hex-01',
    inverseToken: '--kol-opacity-hex-inverse-01',
    light: { label: '#fcfbfb', hex: '#fcfbfb' },
    dark: { label: '#111112', hex: '#111112' },
    lightInverse: { label: '#111112', hex: '#111112' },
    darkInverse: { label: '#fcfbfb', hex: '#fcfbfb' },
    usage: '1% opacity - lightest overlays, hairline highlights'
  },
  {
    level: '02',
    token: '--kol-opacity-hex-02',
    inverseToken: '--kol-opacity-hex-inverse-02',
    light: { label: '#f4f4f5', hex: '#f4f4f5' },
    dark: { label: '#171719', hex: '#171719' },
    lightInverse: { label: '#171719', hex: '#171719' },
    darkInverse: { label: '#f4f4f5', hex: '#f4f4f5' },
    usage: '2% opacity - subtle highlights'
  },
  {
    level: '04',
    token: '--kol-opacity-hex-04',
    inverseToken: '--kol-opacity-hex-inverse-04',
    light: { label: '#ebebeb', hex: '#ebebeb' },
    dark: { label: '#1b1b1e', hex: '#1b1b1e' },
    lightInverse: { label: '#1b1b1e', hex: '#1b1b1e' },
    darkInverse: { label: '#ebebeb', hex: '#ebebeb' },
    usage: '4% opacity - subtle hover states'
  },
  {
    level: '08',
    token: '--kol-opacity-hex-08',
    inverseToken: '--kol-opacity-hex-inverse-08',
    light: { label: '#dbdbdb', hex: '#dbdbdb' },
    dark: { label: '#242427', hex: '#242427' },
    lightInverse: { label: '#242427', hex: '#242427' },
    darkInverse: { label: '#dbdbdb', hex: '#dbdbdb' },
    usage: '8% opacity - light overlays, subtle backgrounds'
  },
  {
    level: '12',
    token: '--kol-opacity-hex-12',
    inverseToken: '--kol-opacity-hex-inverse-12',
    light: { label: '#a3a3a4', hex: '#a3a3a4' },
    dark: { label: '#2e2e30', hex: '#2e2e30' },
    lightInverse: { label: '#2e2e30', hex: '#2e2e30' },
    darkInverse: { label: '#a3a3a4', hex: '#a3a3a4' },
    usage: '12% opacity - muted overlays'
  },
  {
    level: '16',
    token: '--kol-opacity-hex-16',
    inverseToken: '--kol-opacity-hex-inverse-16',
    light: { label: '#5b5b5d', hex: '#5b5b5d' },
    dark: { label: '#363639', hex: '#363639' },
    lightInverse: { label: '#363639', hex: '#363639' },
    darkInverse: { label: '#5b5b5d', hex: '#5b5b5d' },
    usage: '16% opacity - medium overlays'
  },
  {
    level: '24',
    token: '--kol-opacity-hex-24',
    inverseToken: '--kol-opacity-hex-inverse-24',
    light: { label: '#363639', hex: '#363639' },
    dark: { label: '#5b5b5d', hex: '#5b5b5d' },
    lightInverse: { label: '#5b5b5d', hex: '#5b5b5d' },
    darkInverse: { label: '#363639', hex: '#363639' },
    usage: '24% opacity - pressed states'
  },
  {
    level: '32',
    token: '--kol-opacity-hex-32',
    inverseToken: '--kol-opacity-hex-inverse-32',
    light: { label: '#2e2e30', hex: '#2e2e30' },
    dark: { label: '#a3a3a4', hex: '#a3a3a4' },
    lightInverse: { label: '#a3a3a4', hex: '#a3a3a4' },
    darkInverse: { label: '#2e2e30', hex: '#2e2e30' },
    usage: '32% opacity - emphasis overlays'
  },
  {
    level: '64',
    token: '--kol-opacity-hex-64',
    inverseToken: '--kol-opacity-hex-inverse-64',
    light: { label: '#242427', hex: '#242427' },
    dark: { label: '#dbdbdb', hex: '#dbdbdb' },
    lightInverse: { label: '#dbdbdb', hex: '#dbdbdb' },
    darkInverse: { label: '#242427', hex: '#242427' },
    usage: '64% opacity - strong overlays'
  },
  {
    level: '80',
    token: '--kol-opacity-hex-80',
    inverseToken: '--kol-opacity-hex-inverse-80',
    light: { label: '#1b1b1e', hex: '#1b1b1e' },
    dark: { label: '#ebebeb', hex: '#ebebeb' },
    lightInverse: { label: '#ebebeb', hex: '#ebebeb' },
    darkInverse: { label: '#1b1b1e', hex: '#1b1b1e' },
    usage: '80% opacity - very strong overlays'
  },
  {
    level: '88',
    token: '--kol-opacity-hex-88',
    inverseToken: '--kol-opacity-hex-inverse-88',
    light: { label: '#171719', hex: '#171719' },
    dark: { label: '#f4f4f5', hex: '#f4f4f5' },
    lightInverse: { label: '#f4f4f5', hex: '#f4f4f5' },
    darkInverse: { label: '#171719', hex: '#171719' },
    usage: '88% opacity - near-opaque overlays'
  },
  {
    level: '96',
    token: '--kol-opacity-hex-96',
    inverseToken: '--kol-opacity-hex-inverse-96',
    light: { label: '#111112', hex: '#111112' },
    dark: { label: '#fcfbfb', hex: '#fcfbfb' },
    lightInverse: { label: '#fcfbfb', hex: '#fcfbfb' },
    darkInverse: { label: '#111112', hex: '#111112' },
    usage: '96% opacity - almost solid overlays'
  }
]

const foregroundOverlayRows = [
  { token: '.bg-fg', dark: { label: '#fafafa', hex: '#fafafa' }, light: { label: '#121215', hex: '#121215' }, usage: 'Solid foreground overlay (tags, pills, badges).' },
  { token: '.bg-fg-02', dark: { label: 'rgba(250,250,250,0.02)', hex: 'rgba(250,250,250,0.02)' }, light: { label: 'rgba(18,18,21,0.02)', hex: 'rgba(18,18,21,0.02)' }, usage: 'Hairline highlights, subtle overlays.' },
  { token: '.bg-fg-04', dark: { label: 'rgba(250,250,250,0.04)', hex: 'rgba(250,250,250,0.04)' }, light: { label: 'rgba(18,18,21,0.04)', hex: 'rgba(18,18,21,0.04)' }, usage: 'Hover pre-states and light scrims.' },
  { token: '.bg-fg-08', dark: { label: 'rgba(250,250,250,0.08)', hex: 'rgba(250,250,250,0.08)' }, light: { label: 'rgba(18,18,21,0.08)', hex: 'rgba(18,18,21,0.08)' }, usage: 'Icon button backgrounds, subtle pills.' },
  { token: '.bg-fg-16', dark: { label: 'rgba(250,250,250,0.16)', hex: 'rgba(250,250,250,0.16)' }, light: { label: 'rgba(18,18,21,0.16)', hex: 'rgba(18,18,21,0.16)' }, usage: 'Pressed states and filled toggles.' },
  { token: '.bg-fg-32', dark: { label: 'rgba(250,250,250,0.32)', hex: 'rgba(250,250,250,0.32)' }, light: { label: 'rgba(18,18,21,0.32)', hex: 'rgba(18,18,21,0.32)' }, usage: 'Focus rings and emphasis overlays.' },
  { token: '.bg-fg-64', dark: { label: 'rgba(250,250,250,0.64)', hex: 'rgba(250,250,250,0.64)' }, light: { label: 'rgba(18,18,21,0.64)', hex: 'rgba(18,18,21,0.64)' }, usage: 'High-contrast badges and feature banners.' }
]

const borderSurfaceRows = [
  {
    token: '.border-surface',
    dark: { label: 'var(--kol-surface-primary)', hex: '#121215' },
    light: { label: 'var(--kol-surface-primary)', hex: '#fafafa' },
    usage: 'Default outline for `.bg-fg` elements; keeps borders visible on accent pills.'
  },
  {
    token: '.border-surface-02',
    dark: { label: 'color-mix(var(--kol-surface-primary) 2%, transparent)', hex: 'rgba(18, 18, 21, 0.02)' },
    light: { label: 'color-mix(var(--kol-surface-primary) 2%, transparent)', hex: 'rgba(250, 250, 250, 0.02)' },
    usage: 'Hairline outlines on subtle cards.'
  },
  {
    token: '.border-surface-04',
    dark: { label: 'color-mix(var(--kol-surface-primary) 4%, transparent)', hex: 'rgba(18, 18, 21, 0.04)' },
    light: { label: 'color-mix(var(--kol-surface-primary) 4%, transparent)', hex: 'rgba(250, 250, 250, 0.04)' },
    usage: 'Hover outlines for neutral components.'
  },
  {
    token: '.border-surface-08',
    dark: { label: 'color-mix(var(--kol-surface-primary) 8%, transparent)', hex: 'rgba(18, 18, 21, 0.08)' },
    light: { label: 'color-mix(var(--kol-surface-primary) 8%, transparent)', hex: 'rgba(250, 250, 250, 0.08)' },
    usage: 'Default border for `.bg-fg-08` chips and overlays.'
  },
  {
    token: '.border-surface-16',
    dark: { label: 'color-mix(var(--kol-surface-primary) 16%, transparent)', hex: 'rgba(18, 18, 21, 0.16)' },
    light: { label: 'color-mix(var(--kol-surface-primary) 16%, transparent)', hex: 'rgba(250, 250, 250, 0.16)' },
    usage: 'Emphasized borders for focus states or interactive cards.'
  },
  {
    token: '.border-surface-32',
    dark: { label: 'color-mix(var(--kol-surface-primary) 32%, transparent)', hex: 'rgba(18, 18, 21, 0.32)' },
    light: { label: 'color-mix(var(--kol-surface-primary) 32%, transparent)', hex: 'rgba(250, 250, 250, 0.32)' },
    usage: 'High-contrast borders for banners and callouts.'
  },
  {
    token: '.border-surface-64',
    dark: { label: 'color-mix(var(--kol-surface-primary) 64%, transparent)', hex: 'rgba(18, 18, 21, 0.64)' },
    light: { label: 'color-mix(var(--kol-surface-primary) 64%, transparent)', hex: 'rgba(250, 250, 250, 0.64)' },
    usage: 'Ultra high-contrast outlines; reserve for special emphasis.'
  }
]

const stateUtilities = [
  {
    utility: 'hover:bg-surface-primary-hover',
    token: '--kol-surface-primary-hover',
    darkLabel: 'color-mix(var(--kol-surface-primary) 95%, var(--kol-surface-on-primary) 5%)',
    lightLabel: 'color-mix(var(--kol-surface-primary) 95%, var(--kol-surface-on-primary) 5%)',
    usage: 'Hover states for primary surfaces (5% foreground blend).'
  },
  {
    utility: 'active:bg-surface-primary-active',
    token: '--kol-surface-primary-active',
    darkLabel: 'color-mix(var(--kol-surface-primary) 90%, var(--kol-surface-on-primary) 10%)',
    lightLabel: 'color-mix(var(--kol-surface-primary) 90%, var(--kol-surface-on-primary) 10%)',
    usage: 'Pressed states for primary surfaces (10% foreground blend).'
  },
  {
    utility: 'hover:bg-container-primary-hover',
    token: '--kol-container-primary-hover',
    darkLabel: 'color-mix(var(--kol-container-primary) 95%, var(--kol-container-on-primary) 5%)',
    lightLabel: 'color-mix(var(--kol-container-primary) 95%, var(--kol-container-on-primary) 5%)',
    usage: 'Hover tint for card interiors and neutral controls.'
  },
  {
    utility: 'active:bg-container-primary-active',
    token: '--kol-container-primary-active',
    darkLabel: 'color-mix(var(--kol-container-primary) 90%, var(--kol-container-on-primary) 10%)',
    lightLabel: 'color-mix(var(--kol-container-primary) 90%, var(--kol-container-on-primary) 10%)',
    usage: 'Pressed states for container-backed controls.'
  },
  {
    utility: 'hover:border-hover',
    token: '--kol-border-hover',
    darkLabel: 'color-mix(var(--kol-surface-on-primary) 16%, transparent)',
    lightLabel: 'color-mix(var(--kol-surface-on-primary) 16%, transparent)',
    usage: 'Hover outline for neutral components.'
  },
  {
    utility: 'active:border-active',
    token: '--kol-border-active',
    darkLabel: 'var(--kol-accent-primary-strong)',
    lightLabel: 'var(--kol-accent-primary-strong)',
    usage: 'Pressed border for accent/destructive controls.'
  },
  {
    utility: 'focus-visible:border-focus',
    token: '--kol-border-focus',
    darkLabel: 'var(--kol-accent-primary)',
    lightLabel: 'var(--kol-accent-primary)',
    usage: 'Accessible focus ring colour (accent yellow).'
  }
]

const lightDarkMatrix = [
  {
    combo: '.bg-auto',
    dark: '--component-surface → var(--kol-surface-primary) (#121215)',
    light: '--component-surface → var(--kol-surface-primary) (#fafafa)',
    notes: 'Wrapper background auto-syncs with the active surface.'
  },
  {
    combo: '.surface-inverse .bg-auto',
    dark: '--component-surface → var(--kol-surface-inverse) (#fcfbf8)',
    light: '--component-surface → var(--kol-surface-inverse) (#0e0e11)',
    notes: 'Add `.surface-inverse` to the parent to flip the palette.'
  },
  {
    combo: '.text-auto',
    dark: '--component-fg → #fafafa (maps to --kol-surface-on-primary)',
    light: '--component-fg → #121215 (maps to --kol-surface-on-primary)',
    notes: 'Sets parent `color`; children inherit automatically.'
  },
  {
    combo: '.surface-inverse .text-auto',
    dark: '--component-fg → #0e0e11',
    light: '--component-fg → #fcfbf8',
    notes: 'Ensures copy stays legible on inverted sections.'
  },
  {
    combo: 'border border-auto',
    dark: 'var(--kol-border-default) → rgba(250,250,250,0.08)',
    light: 'var(--kol-border-default) → rgba(18,18,21,0.08)',
    notes: 'Pair with Tailwind `border` utility to control width.'
  },
  {
    combo: '.surface-inverse .border-auto',
    dark: 'var(--kol-border-default) → rgba(18,18,21,0.08)',
    light: 'var(--kol-border-default) → rgba(250,250,250,0.08)',
    notes: 'Borders pivot with the surrounding surface context.'
  },
  {
    combo: '.divider-auto',
    dark: '1px rule, rgba(250,250,250,0.10)',
    light: '1px rule, rgba(18,18,21,0.10)',
    notes: 'Use `w-full` (horizontal) or `w-px h-full` (vertical).'
  },
  {
    combo: '.bg-fg-32',
    dark: 'rgba(250,250,250,0.32)',
    light: 'rgba(18,18,21,0.32)',
    notes: 'Foreground-driven overlay for badges, chips, and focus states.'
  },
  {
    combo: '.surface-inverse .bg-fg-32',
    dark: 'rgba(18,18,21,0.32)',
    light: 'rgba(250,250,250,0.32)',
    notes: 'Opacity ramps flip alongside the surface context.'
  },
  {
    combo: '.surface-panel.surface-inverse',
    dark: 'Panel shell stays dark; internal tokens switch to inverse pairing.',
    light: 'Panel shell stays light; internal tokens switch to dark pairing.',
    notes: 'Use for cards that need light-on-dark interiors without new markup.'
  }
]

const troubleshootingSteps = [
  {
    title: 'Check the surface wrapper first',
    detail: 'If a class “isn’t working”, confirm the ancestor surface. `.surface-inverse` or support bands remap the entire component context.'
  },
  {
    title: 'Use the quartet together',
    detail: 'Cards need `.bg-auto`, `.text-auto`, `border border-auto`, and optional `.divider-auto`. Missing one often causes contrast surprises.'
  },
  {
    title: 'Prefer semantic surfaces over raw neutrals',
    detail: 'Using `--kol-color-neutral-*` directly can bypass theme overrides. Reach for `--kol-surface-*` or container tokens unless you need an absolute primitive.'
  },
  {
    title: 'Inspect computed variables',
    detail: 'Devtools shows the resolved `--component-*` values. If they look wrong, trace up the DOM for `.surface-inverse` or support wrappers overriding the context.'
  }
]

const colorSections = [
  { id: 'semantic-library', label: 'Semantic Token Library' },
  { id: 'primitives', label: 'Brand Primitives & Neutral Ramp' },
  { id: 'utilities-states', label: 'Utilities & States' },
  { id: 'utility-tokens', label: 'Utility Token Library' },
  { id: 'accessibility', label: 'Contrast & Accessibility' },
  { id: 'troubleshooting', label: 'Troubleshooting & Debugging' }
]

const COLOR_SECTION_DEFAULTS = colorSections.reduce((acc, section) => {
  acc[section.id] = false
  return acc
}, {})

const renderPairSwatch = (mode) => (row) => {
  const value = row[mode]
  if (!value) return <span className="kol-mono-text opacity-60">—</span>
  return (
    <div className="flex items-center gap-3">
      <span
        className="rounded-lg border border-auto flex items-center justify-center flex-shrink-0"
        style={{ width: '40px', height: '40px', backgroundColor: value.bgHex, color: value.fgHex }}
      >
        <span className="text-[10px] uppercase opacity-80" style={{ fontFamily: 'var(--kol-font-family-mono)' }}>Aa</span>
      </span>
      <div className="text-[10px] space-y-0.5 min-w-0" style={{ fontFamily: 'var(--kol-font-family-mono)', color: 'var(--kol-surface-on-primary)', opacity: 0.7 }}>
        <div className="break-all">{value.bgHex}</div>
        <div className="break-all">{value.fgHex}</div>
      </div>
    </div>
  )
}

const renderContrastCell = (mode) => (row) => {
  const ratio = row[mode]
  if (!ratio) return <span className="kol-mono-text opacity-60">—</span>
  return (
    <div className="flex flex-col gap-1">
      <span className="kol-mono-text text-xs">{ratio.toFixed(2)}:1</span>
      <span className="kol-mono-text text-[10px] uppercase tracking-[0.2em] opacity-70">{row[`${mode}Label`]}</span>
    </div>
  )
}

const isHex = (value) => typeof value === 'string' && /^#([0-9a-fA-F]{3}){1,2}$/.test(value)

const createPairRow = (pair) => ({
  id: pair.id,
  name: pair.name,
  status: pair.status,
  note: pair.note,
  bgToken: pair.background.token,
  fgToken: pair.foreground.token,
  dark: { bgHex: pair.background.dark, fgHex: pair.foreground.dark },
  light: { bgHex: pair.background.light, fgHex: pair.foreground.light },
  usage: pair.usage
})

const rowsForCategory = (category) => semanticTokenPairs.filter((pair) => pair.category === category).map(createPairRow)

const buildContrastRows = () =>
  semanticTokenPairs.map((pair) => {
    const darkRatio = isHex(pair.background.dark) && isHex(pair.foreground.dark)
      ? getContrastRatio(pair.background.dark, pair.foreground.dark)
      : null
    const lightRatio = isHex(pair.background.light) && isHex(pair.foreground.light)
      ? getContrastRatio(pair.background.light, pair.foreground.light)
      : null

    return {
      id: pair.id,
      name: pair.name,
      dark: darkRatio,
      darkLabel: getContrastLabel(darkRatio),
      light: lightRatio,
      lightLabel: getContrastLabel(lightRatio),
      note: pair.note ?? ''
    }
  })

const primitiveColumns = [
  { header: 'Token', accessor: 'token', render: (row) => (<span className="kol-table-token bg-fg-08">{row.token}</span>), className: 'kol-table-cell-text' },
  { header: 'Dark Theme', accessor: 'dark', render: renderColorCell('dark'), className: 'kol-table-cell-meta-strong' },
  { header: 'Light Theme', accessor: 'light', render: renderColorCell('light'), className: 'kol-table-cell-meta-strong' },
  { header: 'Usage', accessor: 'usage', className: 'kol-table-cell-meta', style: { maxWidth: '280px' } }
]

const pairedColumns = [
  {
    header: 'Pair',
    accessor: 'name',
    headerClassName: 'kol-table-cell-title kol-table-pair',
    className: 'kol-table-cell-text kol-table-pair',
    render: (row) => (
      <div className="space-y-1">
        <div className="flex items-center gap-2 whitespace-nowrap">
          <span className="kol-mono-xs uppercase whitespace-nowrap">{row.name}</span>
          {row.status ? <StatusTag status={row.status} /> : null}
        </div>
        {row.note ? <p className="kol-table-meta">{row.note}</p> : null}
      </div>
    )
  },
  { header: 'Background Token', accessor: 'bgToken', render: (row) => (<span className="kol-table-token bg-fg-08 break-all">{row.bgToken}</span>), className: 'kol-table-cell-meta-strong' },
  { header: 'Foreground Token', accessor: 'fgToken', render: (row) => (<span className="kol-table-token bg-fg-08 break-all">{row.fgToken}</span>), className: 'kol-table-cell-meta-strong' },
  { header: 'Dark Theme', accessor: 'dark', render: renderPairSwatch('dark'), className: 'kol-table-cell-meta-strong' },
  { header: 'Light Theme', accessor: 'light', render: renderPairSwatch('light'), className: 'kol-table-cell-meta-strong' },
  { header: 'Usage', accessor: 'usage', className: 'kol-table-cell-meta', style: { maxWidth: '280px' } }
]

const overlayColumns = [
  { header: 'Utility', accessor: 'token', render: (row) => (<span className="kol-table-token bg-fg-08">{row.token}</span>), className: 'kol-table-cell-text' },
  { header: 'Dark Theme', accessor: 'dark', render: renderColorCell('dark'), className: 'kol-table-cell-meta-strong' },
  { header: 'Light Theme', accessor: 'light', render: renderColorCell('light'), className: 'kol-table-cell-meta-strong' },
  { header: 'Usage', accessor: 'usage', className: 'kol-table-cell-meta', style: { maxWidth: '280px' } }
]

const stateColumns = [
  { header: 'Utility', accessor: 'utility', render: (row) => (<span className="kol-table-token bg-fg-08">{row.utility}</span>), className: 'kol-table-cell-text' },
  { header: 'Token', accessor: 'token', render: (row) => (<span className="kol-table-token bg-fg-08">{row.token}</span>), className: 'kol-table-cell-meta-strong' },
  { header: 'Dark Theme', accessor: 'darkLabel', render: (row) => (<span className="kol-table-meta-strong">{wrapTokens(row.darkLabel)}</span>), className: 'kol-table-cell-meta-strong' },
  { header: 'Light Theme', accessor: 'lightLabel', render: (row) => (<span className="kol-table-meta-strong">{wrapTokens(row.lightLabel)}</span>), className: 'kol-table-cell-meta-strong' },
  { header: 'Usage', accessor: 'usage', className: 'kol-table-cell-meta', style: { maxWidth: '280px' } }
]

const matrixColumns = [
  { header: 'Class / Combination', accessor: 'combo', className: 'kol-table-cell-title whitespace-pre-line' },
  { header: 'Dark Theme Output', accessor: 'dark', className: 'kol-table-cell-meta-strong' },
  { header: 'Light Theme Output', accessor: 'light', className: 'kol-table-cell-meta-strong' },
  { header: 'Notes', accessor: 'notes', className: 'kol-table-cell-meta' }
]

const contrastColumns = [
  { header: 'Pair', accessor: 'name', className: 'kol-table-cell-text' },
  { header: 'Dark Theme', accessor: 'dark', render: renderContrastCell('dark'), className: 'kol-table-cell-meta-strong' },
  { header: 'Light Theme', accessor: 'light', render: renderContrastCell('light'), className: 'kol-table-cell-meta-strong' },
  { header: 'Notes', accessor: 'note', className: 'kol-table-cell-meta' }
]

const contrastRows = buildContrastRows()

const COLORS_DOC_LINKS = [
  { id: '2.1.0-colors', label: 'Color System' },
  { id: '2.1.1-colors-cheat-sheet', label: 'Color System Cheat Sheet' }
]

const Colors = () => {
  const { sections: expandedSections, toggleSection, allExpanded, toggleAll } = useSectionExpansion('colors', COLOR_SECTION_DEFAULTS)
  const setTocContent = useContext(ShellTocContext)
  useLayoutEffect(() => {
    setTocContent(<WorkshopSidebarContent links={COLORS_DOC_LINKS} allExpanded={allExpanded} onToggleAll={toggleAll} />)
    return () => setTocContent(null)
  }, [setTocContent, allExpanded, toggleAll])

  const surfaceRows = rowsForCategory('surface')
  const containerRows = rowsForCategory('container')
  const supportRows = rowsForCategory('support')
  const accentRows = rowsForCategory('accent')
  const statusRows = rowsForCategory('status')

  return (
    <div className="space-y-10">
      <DesPage
        title="Color System"
        subtitle="2.1.0 Design System: Color System — Kolkrabbi defaults to dark mode. Start with the semantic tokens below before reaching for raw primitives so surfaces, typography, and states stay in sync."
        meta="Semantic Library · Primitives · Utilities · Accessibility · Troubleshooting"
      />

      {/* Quick nav */}
      <div className="flex flex-wrap gap-x-4 gap-y-1 kol-mono-xs text-fg-48">
        <a href="#semantic-library" className="hover:text-fg-80">Semantic</a>
        <a href="#primitives" className="hover:text-fg-80">Primitives</a>
        <a href="#utilities-states" className="hover:text-fg-80">Utilities</a>
        <a href="#utility-tokens" className="hover:text-fg-80">Tokens</a>
        <a href="#accessibility" className="hover:text-fg-80">Accessibility</a>
        <a href="#troubleshooting" className="hover:text-fg-80">Troubleshooting</a>
      </div>

      <div className="space-y-8">
        <Section
        id="semantic-library"
        title="Semantic Token Library"
        expandedSections={expandedSections}
        toggleSection={toggleSection}
      >
        <DesSection
          name="Semantic Token Library"
          description="Paired background and foreground tokens for pages, components, support bands, accents, and status states."
        />
        <div className="space-y-4">
          <DesCard
            name="Page Surfaces"
            description="Core surfaces powering layouts and global backgrounds."
          />
          <Table caption="Surface tokens" columns={pairedColumns} rows={surfaceRows} />
        </div>

        <div className="space-y-4">
          <DesCard
            name="Component Containers"
            description="Component-level backgrounds for cards, drawers, modals, and panels."
          />
          <Table caption="Container tokens" columns={pairedColumns} rows={containerRows} />
        </div>

        <div className="space-y-4">
          <DesCard
            name="Support Surfaces"
            description="Split backgrounds and absolute contrast utilities for special layouts."
          />
          <Table caption="Support surfaces" columns={pairedColumns} rows={supportRows} />
        </div>

        <div className="space-y-4">
          <DesCard
            name="Accents"
            description="Brand accent ramp tied to semantic states and CTA behavior."
          />
          <Table caption="Accent tokens" columns={pairedColumns} rows={accentRows} />
        </div>

        <div className="space-y-4">
          <DesCard
            name="Status"
            description="Danger ramp with hover/active/muted counterparts."
          />
          <Table caption="Status tokens" columns={pairedColumns} rows={statusRows} />
        </div>
      </Section>

      <Section
        id="primitives"
        title="Brand Primitives & Neutral Ramp"
        expandedSections={expandedSections}
        toggleSection={toggleSection}
      >
        <DesSection
          name="Brand Primitives & Neutral Ramp"
          description="Raw primitives underpinning the semantic tokens above. Use them for data visualisation or when authoring new semantic tokens."
        />
        <div className="space-y-4">
          <DesCard
            name="Brand Primitives"
            description="Core brand colors, support bands, and absolute contrast primitives."
          />
          <Table caption="Brand primitives" columns={primitiveColumns} rows={brandPrimitives} />
        </div>

        <div className="space-y-4">
          <DesCard
            name="Neutral Ramp"
            description="50-900 neutral scale feeding surface and foreground tokens."
          />
          <Table caption="Neutral ramp" columns={primitiveColumns} rows={neutralRamp} />
        </div>

        <div className="space-y-4">
          <DesCard
            name="Opacity Hex Scale"
            description="Hardcoded hex values simulating opacity overlays. Theme-adaptive with automatic inverse variants for both standard and inverse contexts."
          />
          <Table caption="Opacity hex scale" columns={primitiveColumns} rows={opacityHexScale} />
        </div>
      </Section>

      <Section
        id="utilities-states"
        title="Utilities & States"
        expandedSections={expandedSections}
        toggleSection={toggleSection}
      >
        <DesSection
          name="Context-Aware Utilities"
          description="`.bg-auto`, `.text-auto`, `border-auto`, and `.divider-auto` follow the current surface context. Tip: Wrap sections with `.bg-surface-inverse` to flip the entire token stack."
        />

        <div className="space-y-4">
          <DesCard
            name=".text-auto"
            description="Adaptive text/icon colour"
            details="color: var(--kol-surface-on-primary)"
          />
          <div className="py-8 p-4 rounded bg-surface-primary border border-auto">
            <div className="text-auto kol-mono-xs">Parent with `.text-auto` → children inherit foreground</div>
          </div>
        </div>

        <div className="space-y-4">
          <DesCard
            name=".bg-auto"
            description="Adaptive background colour"
            details="background-color: var(--kol-surface-primary)"
          />
          <div className="py-8 p-4 rounded bg-surface-primary border border-auto">
            <div className="p-4 rounded bg-auto border border-auto">
              <span className="text-auto kol-mono-xs">Default surface background</span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <DesCard
            name="border-auto"
            description="Adaptive 10% border"
            details="border-color: var(--kol-border-default)"
          />
          <div className="py-8 p-4 rounded bg-surface-primary border border-auto">
            <div className="p-4 rounded border border-auto">
              <span className="text-auto kol-mono-xs">Default border</span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <DesCard
            name=".divider-auto"
            description="1px divider using the adaptive border colour"
            details="border-color: var(--kol-border-default); border-width: 1px"
          />
          <div className="py-8 p-4 rounded bg-surface-primary border border-auto">
            <div>
              <span className="text-auto kol-mono-xs">Horizontal: add `w-full`</span>
              <Divider className="mt-2 w-full" />
            </div>
          </div>

          <div className="py-8 p-4 rounded bg-surface-primary border border-auto">
            <div>
              <span className="text-auto kol-mono-xs">Vertical: `w-px h-full bg-fg-08`</span>
              <div className="flex items-stretch gap-4 mt-2" style={{ height: '192px' }}>
                <div className="text-auto kol-mono-xs flex-1">A</div>
                <div className="w-px self-stretch bg-fg-08"></div>
                <div className="text-auto kol-mono-xs flex-1">B</div>
              </div>
            </div>
          </div>
        </div>

      </Section>

      <Section
        id="utility-tokens"
        title="Utility Token Library"
        expandedSections={expandedSections}
        toggleSection={toggleSection}
      >
        <DesSection
          name="Utility Token Library"
          description="Reference tables for overlay, border, and state utility tokens."
        />

        <div className="space-y-4">
          <DesCard
            name="Foreground Overlays (.bg-fg*)"
            description="Overlay scale derived from the current foreground token."
          />
          <Table caption="Foreground overlays" columns={overlayColumns} rows={foregroundOverlayRows} />
        </div>

        <div className="space-y-4">
          <DesCard
            name="Surface Border Utilities"
            description="Contrast-preserving borders that follow the current surface tokens."
          />
          <Table caption="Surface border utilities" columns={overlayColumns} rows={borderSurfaceRows} />
        </div>

        <div className="space-y-4">
          <DesCard
            name="State Utilities"
            description="Hover, active, and focus helpers introduced in Phase 4 of the refactor."
          />
          <Table caption="State utilities" columns={stateColumns} rows={stateUtilities} />
        </div>
      </Section>

      <Section
        id="accessibility"
        title="Contrast & Accessibility"
        expandedSections={expandedSections}
        toggleSection={toggleSection}
      >
        <DesSection
          name="Contrast & Accessibility"
          description="Contrast instrumentation plus a matrix of how utilities resolve in each theme."
        />
        <div className="space-y-4">
          <DesCard
            name="Contrast Ratios"
            description="Computed WCAG ratios for every paired token."
          />
          <Table caption="Contrast ratios" columns={contrastColumns} rows={contrastRows} />
        </div>

        <div className="space-y-4">
          <DesCard
            name="Light/Dark Interaction Matrix"
            description="Quick reference for context-aware utilities when debugging unexpected colours."
          />
          <Table caption="Light and dark mode matrix" columns={matrixColumns} rows={lightDarkMatrix} />
        </div>
      </Section>

      <Section
        id="troubleshooting"
        title="Troubleshooting & Debugging"
        expandedSections={expandedSections}
        toggleSection={toggleSection}
      >
        <DesSection
          name="Troubleshooting & Debugging"
          description="Common checks when a colour utility isn’t behaving as expected."
        />
        <div className="space-y-4">
          <DesCard
            name="Debug Checklist"
            description="Run through these steps before reaching for hardcoded overrides."
          />
          <ul className="space-y-3">
            {troubleshootingSteps.map((step, index) => (
              <li
                key={index}
                className={index < 3 ? 'flex gap-3 kol-mono-text text-sm opacity-80' : 'kol-mono-xs opacity-60 mt-2'}
              >
                {index < 3 ? (
                  <>
                    <span>+</span>
                    <span>
                      <strong>{step.title}:</strong> {step.detail}
                    </span>
                  </>
                ) : (
                  <span>
                    <strong>{step.title}:</strong> {step.detail}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
        <p className="kol-mono-xxs opacity-40">
          Still stuck? Inspect the computed styles in devtools. Look for the resolved <code>--component-*</code> variables—if they’re not what you expect, trace up the DOM tree for a surface wrapper overriding the context.
        </p>
        </Section>
      </div>
    </div>
  )
}

export default Colors
