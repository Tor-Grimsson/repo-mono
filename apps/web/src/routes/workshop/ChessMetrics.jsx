import { useContext, useLayoutEffect, useMemo, useState, useCallback } from 'react'
import { ShellTocContext } from '../../components/shell'
import { Dropdown, Button, Checkbox } from '@kol/ui'
import { getMonthlySummary, getManifest, loadFullDataset } from '@kol/chess-data'
import DesPage from '../../components/workshop/molecules/DesPage'
import WorkshopSidebarContent from '../../components/workshop/molecules/WorkshopSidebarContent'
import {
  DashboardGrid,
  GridCard,
  DashMetricCard,
  DashStackedBarCard,
  DashListCard,
  DashSlotCard,
  DashChartCard,
  DashFeaturedCard,
  DashAlertCard,
  Histogram,
  Candlestick,
  ScatterPlot,
  LineChart,
  DonutChart,
  Sparkline,
  Heatmap
} from '@kol/ui/dashboards'
import {
  computeLightweightMetrics,
  computeFullMetrics,
  filterGames
} from '../../utils/chessMetrics'
import { formatCompactNumber, formatMonthLabel } from '../../utils/chessHelpers'

import '@kol/ui/css/chess.css'

const TIME_CLASS_COLORS = {
  blitz: 'var(--kol-palette-blue)',
  bullet: 'var(--kol-palette-yellow)',
  daily: 'var(--kol-palette-green)',
  rapid: 'var(--kol-palette-orange)',
  classical: 'var(--kol-palette-purple)'
}

const DASHBOARD_DOC_LINKS = [
  { id: '5.6.0-dashboard', label: 'Dashboard System' },
  { id: '5.0.0-workshop-index', label: 'Workshop Index' }
]

// ---------------------------------------------------------------------------
// Block Registry — each block has an ID, render function, category, tier, and
// a "natural" column width used for packing in custom/all modes.
// ---------------------------------------------------------------------------

const CATEGORIES = [
  { key: 'metrics', label: 'Metrics' },
  { key: 'charts', label: 'Charts' },
  { key: 'lists', label: 'Lists' },
  { key: 'featured', label: 'Featured' }
]

// Render helpers — (light, full, filtered, manifest) args
const BLOCK_RENDERS = {
  'win-rate': (l) => (
    <DashMetricCard className="h-full" label="Win rate" value={`${l.winRate.toFixed(1)}%`}
      delta={`${l.wins.toLocaleString()} wins`} borderColor="var(--kol-palette-green)" />
  ),
  'draw-rate': (l) => (
    <DashMetricCard className="h-full" label="Draw rate" value={`${l.drawRate.toFixed(1)}%`}
      delta={`${l.draws.toLocaleString()} draws`} borderColor="var(--kol-palette-blue)" />
  ),
  'avg-rating': (l) => (
    <DashMetricCard className="h-full" label="Avg rating" value={l.avgRating.toLocaleString()}
      delta={`Opp avg ${l.avgOpponentRating.toLocaleString()}`} borderColor="var(--kol-palette-purple)"
      sparkline={l.ratingTrend.length > 2
        ? <Sparkline data={l.ratingTrend.map(d => d.count)} height={28} fill color="var(--kol-palette-purple)" />
        : null} />
  ),
  'total-games': (l) => (
    <DashMetricCard className="h-full" label="Total games" value={formatCompactNumber(l.totalGames)}
      delta={`${l.uniqueOpponents.toLocaleString()} opponents`} borderColor="var(--kol-palette-orange)" />
  ),
  'months-tracked': (l) => (
    <DashMetricCard className="h-full" label="Months tracked" value={l.monthsTracked.toLocaleString()}
      delta="Continuous record" />
  ),
  'unique-opponents': (l) => (
    <DashMetricCard className="h-full" label="Unique opponents" value={l.uniqueOpponents.toLocaleString()}
      delta="Across all time" />
  ),
  'current-rating': (_l, f) => (
    <DashMetricCard className="h-full" label="Current rating"
      value={f.ratingStats.current.toLocaleString()}
      delta={`${f.ratingStats.change >= 0 ? '+' : ''}${f.ratingStats.change} vs last 10`}
      borderColor="var(--kol-palette-blue)" />
  ),
  'peak-rating': (_l, f) => (
    <DashMetricCard className="h-full" label="Peak rating"
      value={f.ratingStats.peak.toLocaleString()}
      delta={`${(f.ratingStats.peak - f.ratingStats.current).toLocaleString()} above now`}
      borderColor="var(--kol-palette-red)" />
  ),
  'win-rate-90d': (_l, f) => (
    <DashMetricCard className="h-full" label="Win rate (90d)"
      value={`${f.recentPerformance.currentWinRate.toFixed(1)}%`}
      delta={`${f.recentPerformance.current.win.toLocaleString()}/${f.recentPerformance.current.total.toLocaleString()} games`}
      borderColor="var(--kol-palette-green)" />
  ),
  'games-90d': (_l, f, _fg, m) => (
    <DashMetricCard className="h-full" label="Games (90d)"
      value={formatCompactNumber(f.gamesLast90Days)}
      delta={`${formatCompactNumber(m.totalGames)} lifetime`}
      borderColor="var(--kol-palette-orange)" />
  ),
  'win-streak': (_l, f) => (
    <DashMetricCard className="h-full" label="Longest win streak"
      value={`${f.streakStats.longestWinStreak} games`} delta="All-time best run" />
  ),
  'games-this-year': (_l, f) => (
    <DashMetricCard className="h-full" label="Games this year"
      value={f.gamesThisYear.toLocaleString()} delta="Calendar year volume" />
  ),

  'stacked-wdl': (l) => {
    const wdlSegments = [
      { value: l.wins, label: 'Wins', color: 'var(--kol-palette-green)' },
      { value: l.draws, label: 'Draws', color: 'var(--kol-palette-blue)' },
      { value: l.losses, label: 'Losses', color: 'var(--kol-palette-red)' }
    ]
    return (
      <div className="dash-card h-full flex flex-col">
        <div className="dash-body text-fg-88">Win/Draw/Loss</div>
        <div className="dash-detail text-fg-64">Overall outcome breakdown</div>
        <div className="flex-1 flex items-center justify-center min-h-0">
          <DonutChart segments={wdlSegments} size={240} thickness={32}
            centerLabel={`${l.winRate.toFixed(1)}%`} />
        </div>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 justify-center">
          {wdlSegments.map((seg, i) => (
            <div key={i} className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: seg.color }} />
              <span className="dash-caption text-fg-64">{seg.label}</span>
            </div>
          ))}
        </div>
      </div>
    )
  },
  'rating-trend': (l) => (
    <DashChartCard className="h-full" title="Rating trend" subtitle="Average player rating by month">
      <LineChart
        data={l.ratingTrend.map(d => ({ y: d.count }))}
        xLabels={l.ratingTrend.filter((_, i, arr) => i === 0 || i === arr.length - 1 || i === Math.floor(arr.length / 2)).map(d => formatMonthLabel(d.range))}
        fill showArea
      />
    </DashChartCard>
  ),
  'mode-focus': (l) => {
    const top = l.timeClassItems[0]
    return (
      <DashStackedBarCard className="h-full" title="Mode focus" icon="chess-rook"
        value={`${top?.percent ?? 0}%`} label={top?.label ?? 'Mode'} trend="up"
        data={l.compactStackedData}
        footerLeft={`${l.monthsTracked} months`} footerRight="Game history" />
    )
  },
  'rating-distribution': (_l, f) => (
    <DashChartCard className="h-full" title="Rating distribution" subtitle="Player rating buckets (100-point intervals)">
      <Histogram data={f.ratingHistogram} barColor="var(--kol-palette-teal)" />
    </DashChartCard>
  ),
  'rating-candlestick': (_l, f) => (
    <DashChartCard className="h-full" title="Rating range per month"
      subtitle="High/low/open/close comparison" metricLabel="Player rating"
      badge={`\u00B1${f.ratingStats.volatility}`}
      currentValue={`Current ${f.ratingStats.current.toLocaleString()}`}
      legends={[
        { label: 'Positive month', color: 'var(--kol-palette-yellow)' },
        { label: 'Neutral month', color: 'var(--kol-palette-purple)' }
      ]}
      footer="Derived from game dataset">
      <Candlestick data={f.candlestickData} />
    </DashChartCard>
  ),
  'opponent-scatter': (_l, f) => (
    <DashChartCard className="h-full" title="Opponent strength vs time control"
      subtitle="Avg opponent rating per time control" icon="stopwatch">
      <ScatterPlot data={f.scatterPoints.filter((p) => p.x <= 720)}
        maxX={720} maxY={f.scatterScale.maxY}
        xLabels={[60, 180, 300, 600]} yLabels={[1000, 1500, 2000, 2500]} />
    </DashChartCard>
  ),
  'opponent-histogram': (_l, f) => (
    <DashChartCard className="h-full" title="Opponent rating spread" subtitle="Binned by 100 points">
      <Histogram data={f.opponentHistogram} barColor="var(--kol-palette-teal)" />
    </DashChartCard>
  ),

  'results-ledger': (l) => (
    <DashListCard className="h-full" variant="meter" title="Results ledger"
      subtitle="Outcome mix" icon="stat-winner" items={l.resultsLedger}
      barColor="var(--kol-palette-green)" footer="Win/draw/loss percentages across all games" />
  ),
  'time-class-share': (l) => (
    <DashListCard className="h-full" variant="meter" title="Time class share"
      subtitle="Distribution by mode" icon="stopwatch"
      items={l.timeClassItems.map((item) => ({
        label: item.label, value: item.value, percent: item.percent,
        color: TIME_CLASS_COLORS[item.key]
      }))}
      footer="Percentages from total recorded games" />
  ),
  'termination-mix': (_l, f, fg) => (
    <DashListCard className="h-full" variant="meter" title="Termination mix"
      subtitle="Most common endings" icon="dashboard-roadmap"
      items={f.terminationItems} barColor="var(--kol-palette-orange)"
      footer={`${fg.length.toLocaleString()} games analysed`} />
  ),
  'top-openings': (_l, f) => (
    <DashSlotCard className="h-full" title="Top openings" subtitle="Ranked by usage"
      icon="dashboard-bookmark"
      chart={f.ratingHistogram.length > 0
        ? <Histogram data={f.ratingHistogram.slice(0, 6)} barColor="var(--kol-palette-blue)" />
        : null}
      items={f.openingItems}
      footer={{ label: 'Unique openings', value: f.openingItems.length.toString() }} />
  ),
  'rivals': (_l, f) => (
    <DashListCard className="h-full" variant="text" title="Rivals list"
      subtitle="Most frequent opponents" icon="dashboard-dual-opponent"
      badge={f.rivalItems[0]?.label ? `vs ${f.rivalItems[0].label}` : null}
      items={f.rivalItems} />
  ),
  'peak-by-mode': (_l, f) => (
    <DashListCard className="h-full" variant="ratings" title="Peak rating by mode"
      icon="stat-crown" items={f.peakRatingItems} />
  ),
  'result-mix': (_l, f) => (
    <DashListCard className="h-full" variant="meter" title="Result mix"
      subtitle="Last 120 games" icon="stat-winner" items={f.resultMeters}
      barColor="var(--kol-palette-green)"
      footer="Wins, draws, and losses with percentages" />
  ),
  'time-control-leaderboard': (_l, f) => (
    <DashListCard className="h-full" variant="text" title="Time control leaderboard"
      subtitle="Win rate by mode" icon="dashboard-roadmap"
      items={f.timeControlLeaderboard}
      footer={`${f.timeControlLeaderboard.length} modes tracked`} />
  ),
  'tough-opponents': (_l, f) => (
    <DashListCard className="h-full" variant="text" title="Tough opponents"
      subtitle="Recent high-rated rivals" icon="dashboard-dual-opponent"
      items={f.toughOpponents}
      footer="Sorted by opponent average rating (last 200 games)" />
  ),
  'best-win': (_l, f) => (
    <DashListCard className="h-full" variant="ratings" title="Best wins"
      subtitle="Highest-rated opponent beaten" icon="stat-crown"
      items={f.bestWinByTimeClass} />
  ),

  'featured-overview': (l, f) => {
    const overview = f?.featuredOverview
    const histogram = f?.ratingHistogram || []
    return (
      <DashFeaturedCard className="h-full" badge="Metrics dataset"
        title={overview?.topModeLabel || 'Chess Insights'}
        icon="dashboard-book-open"
        description={`Covering ${l.totalGames.toLocaleString()} games with live data.`}
        metricLabel="Rated games"
        metricValue={overview ? overview.ratedGames.toLocaleString() : formatCompactNumber(l.totalGames)}
        chart={histogram.length > 0 ? <Histogram data={histogram} /> : null}
        legends={overview?.legends || []} />
    )
  },
  'monthly-momentum': (_l, f) => (
    <DashSlotCard className="h-full" title="Monthly momentum" subtitle="Latest 12 months"
      icon="trending"
      chart={<LineChart
        data={f.monthListItems.map(m => ({ y: parseFloat(m.value) || 0 }))}
        height={100} showArea
      />}
      items={f.monthListItems}
      footer={{ label: 'Average rating', value: f.ratingStats.average.toLocaleString() }} />
  ),
  'win-rate-alert': (_l, f) => {
    const rp = f.recentPerformance
    const trend = rp.currentWinRate >= rp.previousWinRate ? 'up' : 'down'
    const delta = rp.currentWinRate - rp.previousWinRate
    const deltaLabel = `${delta >= 0 ? '+' : ''}${delta.toFixed(1)} pts`
    return (
      <DashAlertCard className="h-full" label="Recent win rate"
        value={`${rp.currentWinRate.toFixed(1)}%`} trend={trend} trendValue={deltaLabel}
        alerts={[
          { title: `Strongest: ${f.bestTimeClass.label}`,
            description: `${f.bestTimeClass.winRate}% wins across ${f.bestTimeClass.games.toLocaleString()} games` },
          { title: `Needs work: ${f.weakestTimeClass.label}`,
            description: `${f.weakestTimeClass.winRate}% wins • ${f.weakestTimeClass.games.toLocaleString()} games` }
        ]}
        footer="Comparing last 90 days vs prior quarter" />
    )
  },
  'activity-heatmap': (_l, f) => (
    <DashChartCard className="h-full" title="Activity heatmap"
      subtitle="Games played by day and hour (UTC)">
      <Heatmap
        data={f.activityHeatmap}
        rows={['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']}
        cols={Array.from({ length: 24 }, (_, i) => i % 6 === 0 ? `${i}h` : '')}
        fill
      />
    </DashChartCard>
  )
}

// Block metadata (id, category, tier, natural column width for packing)
const BLOCKS = [
  // Metrics (1-col each, paired in layouts)
  { id: 'win-rate', label: 'Win rate', category: 'metrics', tier: 'light', cols: 1 },
  { id: 'draw-rate', label: 'Draw rate', category: 'metrics', tier: 'light', cols: 1 },
  { id: 'avg-rating', label: 'Avg rating', category: 'metrics', tier: 'light', cols: 1 },
  { id: 'total-games', label: 'Total games', category: 'metrics', tier: 'light', cols: 1 },
  { id: 'months-tracked', label: 'Months tracked', category: 'metrics', tier: 'light', cols: 1 },
  { id: 'unique-opponents', label: 'Unique opponents', category: 'metrics', tier: 'light', cols: 1 },
  { id: 'current-rating', label: 'Current rating', category: 'metrics', tier: 'full', cols: 1 },
  { id: 'peak-rating', label: 'Peak rating', category: 'metrics', tier: 'full', cols: 1 },
  { id: 'win-rate-90d', label: 'Win rate (90d)', category: 'metrics', tier: 'full', cols: 1 },
  { id: 'games-90d', label: 'Games (90d)', category: 'metrics', tier: 'full', cols: 1 },
  { id: 'win-streak', label: 'Longest win streak', category: 'metrics', tier: 'full', cols: 1 },
  { id: 'games-this-year', label: 'Games this year', category: 'metrics', tier: 'full', cols: 1 },
  // Charts
  { id: 'stacked-wdl', label: 'W/D/L stacked bars', category: 'charts', tier: 'light', cols: 2 },
  { id: 'rating-trend', label: 'Rating trend', category: 'charts', tier: 'light', cols: 4 },
  { id: 'mode-focus', label: 'Mode focus stacked', category: 'charts', tier: 'light', cols: 3 },
  { id: 'rating-distribution', label: 'Rating distribution', category: 'charts', tier: 'full', cols: 4 },
  { id: 'rating-candlestick', label: 'Rating range per month', category: 'charts', tier: 'full', cols: 3 },
  { id: 'opponent-scatter', label: 'Opponent strength scatter', category: 'charts', tier: 'full', cols: 3 },
  { id: 'opponent-histogram', label: 'Opponent rating spread', category: 'charts', tier: 'full', cols: 2 },
  { id: 'activity-heatmap', label: 'Activity heatmap', category: 'charts', tier: 'full', cols: 4 },
  // Lists
  { id: 'results-ledger', label: 'Results ledger', category: 'lists', tier: 'light', cols: 2 },
  { id: 'time-class-share', label: 'Time class share', category: 'lists', tier: 'light', cols: 2 },
  { id: 'termination-mix', label: 'Termination mix', category: 'lists', tier: 'full', cols: 2 },
  { id: 'top-openings', label: 'Top openings', category: 'lists', tier: 'full', cols: 2 },
  { id: 'rivals', label: 'Rivals list', category: 'lists', tier: 'full', cols: 2 },
  { id: 'peak-by-mode', label: 'Peak rating by mode', category: 'lists', tier: 'full', cols: 2 },
  { id: 'result-mix', label: 'Result mix (recent)', category: 'lists', tier: 'full', cols: 2 },
  { id: 'time-control-leaderboard', label: 'Time control leaderboard', category: 'lists', tier: 'full', cols: 2 },
  { id: 'tough-opponents', label: 'Tough opponents', category: 'lists', tier: 'full', cols: 2 },
  { id: 'best-win', label: 'Best wins', category: 'lists', tier: 'full', cols: 2 },
  // Featured
  { id: 'featured-overview', label: 'Featured overview', category: 'featured', tier: 'light+full', cols: 3 },
  { id: 'monthly-momentum', label: 'Monthly momentum', category: 'featured', tier: 'full', cols: 4 },
  { id: 'win-rate-alert', label: 'Recent win rate alert', category: 'featured', tier: 'full', cols: 2 }
]

const BLOCK_META = Object.fromEntries(BLOCKS.map((b) => [b.id, b]))
const ALL_IDS = BLOCKS.map((b) => b.id)

// ---------------------------------------------------------------------------
// Layout templates — each slot is { span, blocks[], wrapper? }
// 'pair' = side-by-side in grid-cols-2, 'stack' = vertical flex-col
// ---------------------------------------------------------------------------

// Pack arbitrary block IDs into gap-free layout slots
const packBlocks = (blockIds) => {
  const slots = []
  // Separate 1-col blocks from multi-col blocks
  const smallBlocks = []
  const largeBlocks = []
  for (const id of blockIds) {
    const meta = BLOCK_META[id]
    if (!meta) continue
    if (meta.cols === 1) smallBlocks.push(id)
    else largeBlocks.push(id)
  }

  // Greedy row packing: fill rows of 4 columns
  let remaining = 4
  const rowBuffer = []

  const flushRow = () => {
    slots.push(...rowBuffer.splice(0))
    remaining = 4
  }

  // First pass: place large blocks, fill gaps with small blocks
  for (const id of largeBlocks) {
    const meta = BLOCK_META[id]
    const cols = meta.cols

    if (cols > remaining) {
      // Fill remaining space with small blocks
      while (remaining > 0 && smallBlocks.length > 0) {
        if (remaining >= 2 && smallBlocks.length >= 2) {
          const a = smallBlocks.shift()
          const b = smallBlocks.shift()
          rowBuffer.push({ span: '2x1', blocks: [a, b], wrapper: 'pair' })
          remaining -= 2
        } else if (remaining === 1 && smallBlocks.length >= 2) {
          const a = smallBlocks.shift()
          const b = smallBlocks.shift()
          rowBuffer.push({ span: '1x2', blocks: [a, b], wrapper: 'stack' })
          remaining -= 1
        } else if (remaining >= 1 && smallBlocks.length >= 1) {
          const a = smallBlocks.shift()
          rowBuffer.push({ span: '1x1', blocks: [a] })
          remaining -= 1
        } else {
          break
        }
      }
      flushRow()
    }

    if (cols === 4) {
      rowBuffer.push({ span: '4x2', blocks: [id] })
      remaining = 0
      flushRow()
    } else if (cols === 3) {
      rowBuffer.push({ span: '3x2', blocks: [id] })
      remaining -= 3
    } else if (cols === 2) {
      rowBuffer.push({ span: '2x2', blocks: [id] })
      remaining -= 2
    }

    if (remaining === 0) flushRow()
  }

  // Fill any remaining row space with small blocks
  while (remaining > 0 && smallBlocks.length > 0) {
    if (remaining >= 2 && smallBlocks.length >= 2) {
      const a = smallBlocks.shift()
      const b = smallBlocks.shift()
      rowBuffer.push({ span: '2x1', blocks: [a, b], wrapper: 'pair' })
      remaining -= 2
    } else if (remaining >= 2 && smallBlocks.length === 1) {
      const a = smallBlocks.shift()
      rowBuffer.push({ span: '1x1', blocks: [a] })
      remaining -= 1
    } else if (remaining === 1 && smallBlocks.length >= 2) {
      const a = smallBlocks.shift()
      const b = smallBlocks.shift()
      rowBuffer.push({ span: '1x2', blocks: [a, b], wrapper: 'stack' })
      remaining -= 1
    } else if (remaining >= 1 && smallBlocks.length >= 1) {
      const a = smallBlocks.shift()
      rowBuffer.push({ span: '1x1', blocks: [a] })
      remaining -= 1
    } else {
      break
    }
  }
  if (rowBuffer.length > 0) flushRow()

  // Any leftover small blocks get paired into new rows
  while (smallBlocks.length > 0) {
    remaining = 4
    while (remaining > 0 && smallBlocks.length > 0) {
      if (remaining >= 2 && smallBlocks.length >= 2) {
        const a = smallBlocks.shift()
        const b = smallBlocks.shift()
        slots.push({ span: '2x1', blocks: [a, b], wrapper: 'pair' })
        remaining -= 2
      } else {
        const a = smallBlocks.shift()
        slots.push({ span: '1x1', blocks: [a] })
        remaining -= 1
      }
    }
  }

  return slots
}

const PRESETS = {
  analysis: [
    'featured-overview', 'stacked-wdl',
    'win-rate', 'draw-rate', 'avg-rating', 'total-games',
    'results-ledger', 'termination-mix', 'top-openings',
    'time-class-share', 'rating-distribution',
    'rivals', 'peak-by-mode',
    'months-tracked', 'unique-opponents', 'mode-focus'
  ],
  performance: [
    'current-rating', 'peak-rating', 'win-rate-90d', 'games-90d',
    'monthly-momentum', 'rating-candlestick',
    'win-streak', 'games-this-year',
    'result-mix', 'time-control-leaderboard',
    'opponent-scatter', 'opponent-histogram', 'activity-heatmap',
    'win-rate-alert', 'tough-opponents', 'best-win'
  ],
  all: ALL_IDS
}

const PRESET_OPTIONS = [
  { key: 'analysis', label: 'Analysis' },
  { key: 'performance', label: 'Performance' },
  { key: 'all', label: 'All' },
  { key: 'custom', label: 'Custom' }
]

const LockedPlaceholder = () => (
  <div className="dash-card h-full flex items-center justify-center text-fg-48 kol-mono-xs">
    Fetch dataset to unlock
  </div>
)

const ChessMetrics = () => {
  const setTocContent = useContext(ShellTocContext)
  useLayoutEffect(() => {
    setTocContent(<WorkshopSidebarContent links={DASHBOARD_DOC_LINKS} />)
    return () => setTocContent(null)
  }, [setTocContent])

  const monthlySummary = useMemo(() => getMonthlySummary(), [])
  const manifest = useMemo(() => getManifest(), [])

  // Period selection — single month dropdown + optional scope range
  const [selectedMonth, setSelectedMonth] = useState('all')
  const [scopeOpen, setScopeOpen] = useState(false)
  const [scopeFrom, setScopeFrom] = useState('all')
  const [scopeTo, setScopeTo] = useState('all')

  // Full dataset state
  const [datasetLoaded, setDatasetLoaded] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [gameMeta, setGameMeta] = useState(null)

  // Post-fetch filters
  const [timeClassFilter, setTimeClassFilter] = useState('all')
  const [resultFilter, setResultFilter] = useState('all')

  // Preset / custom block selection
  const [activePreset, setActivePreset] = useState('analysis')
  const [customPanelOpen, setCustomPanelOpen] = useState(false)
  const [customBlocks, setCustomBlocks] = useState(() => new Set(PRESETS.analysis))

  // Sorted month keys (ascending: oldest → newest)
  const allMonthKeys = useMemo(() =>
    (monthlySummary || []).filter(e => e?.month && e.month !== 'unknown').map(e => e.month).sort(),
    [monthlySummary]
  )

  // Month options for single-month dropdown
  const monthOptions = useMemo(() => {
    const options = [{ label: `All time (${formatCompactNumber(manifest.totalGames)} games)`, value: 'all' }]
    const reversed = [...allMonthKeys].reverse()
    for (const m of reversed) {
      const entry = (monthlySummary || []).find(e => e.month === m)
      options.push({
        label: `${formatMonthLabel(m)} (${entry?.total ?? 0})`,
        value: m
      })
    }
    return options
  }, [monthlySummary, manifest, allMonthKeys])

  // Scope range dropdown options
  const scopeFromOptions = useMemo(() => [
    { label: `All time`, value: 'all' },
    ...monthOptions.slice(1)
  ], [monthOptions])

  const scopeToOptions = useMemo(() => [
    { label: 'Present', value: 'all' },
    ...monthOptions.slice(1)
  ], [monthOptions])

  // Scope takes precedence over single month when active
  const scopeActive = scopeFrom !== 'all' || scopeTo !== 'all'

  const selectedMonths = useMemo(() => {
    if (scopeActive) {
      const from = scopeFrom === 'all' ? allMonthKeys[0] : scopeFrom
      const to = scopeTo === 'all' ? allMonthKeys[allMonthKeys.length - 1] : scopeTo
      return allMonthKeys.filter(m => m >= from && m <= to)
    }
    if (selectedMonth === 'all') return []
    return [selectedMonth]
  }, [scopeActive, scopeFrom, scopeTo, selectedMonth, allMonthKeys])

  // Tier 1: lightweight metrics
  const lightMetrics = useMemo(
    () => computeLightweightMetrics(monthlySummary, selectedMonths),
    [monthlySummary, selectedMonths]
  )

  // Tier 2: full dataset metrics
  const filteredGames = useMemo(() => {
    if (!gameMeta) return null
    return filterGames(gameMeta, {
      months: selectedMonths,
      timeClass: timeClassFilter,
      result: resultFilter
    })
  }, [gameMeta, selectedMonths, timeClassFilter, resultFilter])

  const fullMetrics = useMemo(
    () => filteredGames ? computeFullMetrics(filteredGames) : null,
    [filteredGames]
  )

  const handleFetchDataset = useCallback(async () => {
    setIsLoading(true)
    try {
      const data = await loadFullDataset()
      setGameMeta(data)
      setDatasetLoaded(true)
    } catch (err) {
      console.warn('[ChessMetrics] Failed to load dataset', err)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const timeClassOptions = [
    { label: 'All time classes', value: 'all' },
    { label: 'Blitz', value: 'blitz' },
    { label: 'Bullet', value: 'bullet' },
    { label: 'Rapid', value: 'rapid' },
    { label: 'Daily', value: 'daily' }
  ]

  const resultOptions = [
    { label: 'All results', value: 'all' },
    { label: 'Wins', value: 'win' },
    { label: 'Draws', value: 'draw' },
    { label: 'Losses', value: 'loss' }
  ]

  // Compute the layout slots for the current preset/selection
  // All modes go through packBlocks for consistent grid behaviour
  const layoutSlots = useMemo(() => {
    const ids = activePreset === 'custom' ? [...customBlocks] : (PRESETS[activePreset] || ALL_IDS)
    return packBlocks(ids)
  }, [activePreset, customBlocks])

  const handleToggleBlock = useCallback((id) => {
    setCustomBlocks((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }, [])

  const handlePresetChange = useCallback((key) => {
    if (key === 'custom') {
      if (activePreset === 'custom') {
        setCustomPanelOpen((prev) => !prev)
      } else {
        setActivePreset('custom')
        setCustomPanelOpen(true)
      }
    } else {
      setActivePreset(key)
      setCustomPanelOpen(false)
      setCustomBlocks(new Set(PRESETS[key]))
    }
  }, [activePreset])

  // Render a single block by ID — returns JSX or null/placeholder
  const renderBlockById = (id) => {
    const meta = BLOCK_META[id]
    const renderFn = BLOCK_RENDERS[id]
    if (!meta || !renderFn) return null

    const needsFull = meta.tier === 'full' || meta.tier === 'light+full'
    const hasLight = lightMetrics != null
    const hasFull = fullMetrics != null

    if (meta.tier === 'light' && hasLight) {
      return renderFn(lightMetrics, null, filteredGames, manifest)
    }
    if (meta.tier === 'full' && hasFull) {
      return renderFn(lightMetrics, fullMetrics, filteredGames, manifest)
    }
    if (meta.tier === 'light+full' && hasLight) {
      return renderFn(lightMetrics, fullMetrics, filteredGames, manifest)
    }
    if (needsFull && !hasFull) {
      return <LockedPlaceholder />
    }
    return null
  }

  // Render a layout slot (may contain 1 or 2 blocks, with optional wrapper)
  const renderSlot = (slot, idx) => {
    const { span, blocks, wrapper } = slot

    // Check if ANY block in this slot can render
    const contents = blocks.map((id) => ({ id, jsx: renderBlockById(id) }))
    const hasContent = contents.some((c) => c.jsx !== null)
    if (!hasContent) return null

    if (wrapper === 'pair') {
      // Side-by-side metric pair
      return (
        <GridCard key={`slot-${idx}`} span={span}>
          <div className="grid grid-cols-2 gap-4 h-full">
            {contents.map((c) => (
              <div key={c.id} className="h-full">{c.jsx}</div>
            ))}
          </div>
        </GridCard>
      )
    }

    if (wrapper === 'stack') {
      // Vertically stacked
      return (
        <GridCard key={`slot-${idx}`} span={span}>
          <div className="flex flex-col gap-4 h-full">
            {contents.map((c) => (
              <div key={c.id} className="flex-1">{c.jsx}</div>
            ))}
          </div>
        </GridCard>
      )
    }

    // Single block
    return (
      <GridCard key={`slot-${idx}`} span={span}>
        {contents[0].jsx}
      </GridCard>
    )
  }

  return (
    <>
      <DesPage
        title="Chess Metrics"
        subtitle="Explore chess performance data with period-based filtering."
        meta="Metrics • Dashboard • Interactive data"
      />

      <div className="space-y-6">
        {/* Preset selector */}
        <div className="analysis-controls">
          <div className="analysis-control-group">
            {PRESET_OPTIONS.map((opt) => (
              <Button key={opt.key} variant="outline"
                selected={activePreset === opt.key}
                onClick={() => handlePresetChange(opt.key)}
                {...(opt.key === 'custom' && { iconRight: customPanelOpen ? 'chevron-up' : 'chevron-down', iconSize: 12, iconGap: 12 })}>
                {opt.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Custom checkbox panel */}
        {activePreset === 'custom' && customPanelOpen && (
          <div className="space-y-3">
            {CATEGORIES.map((cat) => {
              const catBlocks = BLOCKS.filter((b) => b.category === cat.key)
              return (
                <div key={cat.key} className="dash-card p-4">
                  <div className="kol-mono-xs text-fg-64 mb-2">{cat.label}</div>
                  <div className="flex flex-wrap gap-x-4 gap-y-1">
                    {catBlocks.map((block) => {
                      const isFullTier = block.tier === 'full' || block.tier === 'light+full'
                      return (
                        <label key={block.id} className="flex items-center gap-1.5 kol-mono-xs text-fg-80 cursor-pointer">
                          <Checkbox
                            checked={customBlocks.has(block.id)}
                            onChange={() => handleToggleBlock(block.id)}
                          />
                          {block.label}{isFullTier && !datasetLoaded ? '\u2020' : ''}
                        </label>
                      )
                    })}
                  </div>
                </div>
              )
            })}
            <div className="kol-mono-xs text-fg-48">{'\u2020'} = requires dataset fetch</div>
          </div>
        )}

        {/* Period picker + fetch + filters */}
        <div className="analysis-controls">
          <div className="analysis-control-group">
            {!scopeActive && (
              <Dropdown
                options={monthOptions}
                value={selectedMonth}
                onChange={setSelectedMonth}
                className="analysis-control w-full sm:w-auto"
              />
            )}
            {datasetLoaded && (
              <>
                <Dropdown
                  options={timeClassOptions}
                  value={timeClassFilter}
                  onChange={setTimeClassFilter}
                  className="analysis-control w-full sm:w-auto"
                />
                <Dropdown
                  options={resultOptions}
                  value={resultFilter}
                  onChange={setResultFilter}
                  className="analysis-control w-full sm:w-auto"
                />
              </>
            )}
            <Button variant="outline"
              selected={scopeActive}
              onClick={() => setScopeOpen(prev => !prev)}
              iconRight={scopeOpen ? 'chevron-up' : 'chevron-down'}
              iconSize={12} iconGap={12}>
              {scopeActive
                ? `${formatMonthLabel(scopeFrom === 'all' ? allMonthKeys[0] : scopeFrom)} – ${formatMonthLabel(scopeTo === 'all' ? allMonthKeys.at(-1) : scopeTo)}`
                : 'Scope'}
            </Button>
          </div>
          {!datasetLoaded && (
            <Button variant="secondary"
              onClick={handleFetchDataset} disabled={isLoading}>
              {isLoading ? 'Loading\u2026' : `Fetch Dataset (${formatCompactNumber(manifest.totalGames)} games)`}
            </Button>
          )}
          {datasetLoaded && filteredGames && (
            <span className="kol-mono-xs text-fg-64">
              {filteredGames.length.toLocaleString()} games
            </span>
          )}
        </div>

        {/* Scope range panel */}
        {scopeOpen && (
          <div className="dash-card p-4">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="kol-mono-xs text-fg-64">From</span>
                <Dropdown options={scopeFromOptions} value={scopeFrom} onChange={setScopeFrom}
                  className="analysis-control w-full sm:w-auto" />
              </div>
              <div className="flex items-center gap-2">
                <span className="kol-mono-xs text-fg-64">To</span>
                <Dropdown options={scopeToOptions} value={scopeTo} onChange={setScopeTo}
                  className="analysis-control w-full sm:w-auto" />
              </div>
              {scopeActive && (
                <Button variant="outline" size="sm"
                  onClick={() => { setScopeFrom('all'); setScopeTo('all') }}>
                  Clear
                </Button>
              )}
            </div>
          </div>
        )}

        {/* Block grid */}
        {lightMetrics && (
          <DashboardGrid layout="4-col">
            {layoutSlots.map((slot, idx) => renderSlot(slot, idx))}
          </DashboardGrid>
        )}
      </div>
    </>
  )
}

export default ChessMetrics
