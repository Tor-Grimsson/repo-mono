import { useMemo } from 'react'
import DesPage from '../../components/workshop/molecules/DesPage'
import DashboardCard from '../../components/workshop/chess/dashboards/DashboardCard'
import {
  getManifest,
  getMonthlySummary
} from '@kol/chess-data'
import '../../components/workshop/chess/chess.css'

const formatPercent = (value) =>
  `${Number.isFinite(value) ? value.toFixed(1) : '0.0'}%`

const humanizeMonth = (monthKey) => {
  if (!monthKey) return '—'
  const [year, month] = monthKey.split('-').map(Number)
  const date = new Date(year, (month ?? 1) - 1)
  return date.toLocaleString('default', { month: 'short', year: 'numeric' })
}

const ChessDashboards = () => {
  const manifest = useMemo(() => getManifest(), [])
  const monthlySummary = useMemo(() => getMonthlySummary(), [])

  const overall = useMemo(() => {
    const totals = monthlySummary.reduce(
      (acc, month) => {
        acc.win += month.results?.win ?? 0
        acc.draw += month.results?.draw ?? 0
        acc.loss += month.results?.loss ?? 0
        acc.unknown += month.results?.unknown ?? 0
        return acc
      },
      { win: 0, draw: 0, loss: 0, unknown: 0 }
    )
    const totalGames =
      manifest?.totalGames ?? totals.win + totals.draw + totals.loss + totals.unknown
    const winRate = totalGames > 0 ? (totals.win / totalGames) * 100 : 0
    const drawRate = totalGames > 0 ? (totals.draw / totalGames) * 100 : 0

    return {
      totals,
      totalGames,
      winRate,
      drawRate
    }
  }, [manifest?.totalGames, monthlySummary])

  const ratedSplit = useMemo(() => {
    const rated = manifest?.ratedGames ?? 0
    const unrated = manifest?.unratedGames ?? 0
    const total = rated + unrated || 1
    return {
      rated,
      unrated,
      ratedPct: (rated / total) * 100,
      unratedPct: (unrated / total) * 100
    }
  }, [manifest])

  const timeControls = useMemo(() => {
    const distribution = manifest?.timeClassDistribution ?? []
    const total = distribution.reduce((acc, entry) => acc + entry.count, 0) || 1
    return distribution.slice(0, 6).map((entry) => ({
      label: entry.key,
      count: entry.count,
      pct: (entry.count / total) * 100
    }))
  }, [manifest])

  const openings = useMemo(() => {
    const entries = manifest?.topEcos ?? []
    return entries.slice(0, 5).map((entry) => {
      const parts = entry.key?.split('/') ?? []
      const slug = parts[parts.length - 1] ?? entry.key
      const label = decodeURIComponent(slug || 'Unknown')
        .replace(/[-_]/g, ' ')
        .replace(/\b\w/g, (char) => char.toUpperCase())

      return {
        label,
        count: entry.count
      }
    })
  }, [manifest])

  const opponents = useMemo(() => {
    const entries = manifest?.topOpponents ?? []
    return entries.slice(0, 5)
  }, [manifest])

  const sparkline = useMemo(() => {
    const recent = monthlySummary.slice(-8)
    const points = recent.map((month) => ({
      month: month.month,
      label: humanizeMonth(month.month),
      value: (month.results?.win ?? 0) - (month.results?.loss ?? 0),
      winRate:
        month.total > 0 ? ((month.results?.win ?? 0) / month.total) * 100 : 0,
      total: month.total ?? 0
    }))

    if (!points.length) {
      return { path: '', points: [] }
    }

    const max = Math.max(...points.map((point) => point.value))
    const min = Math.min(...points.map((point) => point.value))
    const range = max - min || 1

    const path = points
      .map((point, index) => {
        const x =
          points.length === 1 ? 0 : (index / (points.length - 1)) * 100
        const y = 90 - ((point.value - min) / range) * 70
        return `${index === 0 ? 'M' : 'L'} ${x.toFixed(2)} ${y.toFixed(2)}`
      })
      .join(' ')

    return { path, points }
  }, [monthlySummary])

  return (
    <div className="space-y-10">
      <DesPage
        title="Chess Dashboards"
        subtitle="Data stories distilled from the 106-month archive."
        meta="Scope: Aggregations, charts, temporal comparisons."
      />

      <section className="chess-dashboards">
        <DashboardCard
          title="Overall Ledger"
          subtitle="All recorded games"
          footer={`Captured across ${manifest?.monthsTracked ?? 0} months`}
        >
          <div className="dashboard-stat-grid">
            <div className="dashboard-stat">
              <span className="dashboard-stat__label">Wins</span>
              <span className="dashboard-stat__value">{overall.totals.win}</span>
              <span className="dashboard-stat__label">
                {formatPercent(overall.winRate)} win rate
              </span>
            </div>
            <div className="dashboard-stat">
              <span className="dashboard-stat__label">Draws</span>
              <span className="dashboard-stat__value">{overall.totals.draw}</span>
              <span className="dashboard-stat__label">
                {formatPercent(overall.drawRate)} draw rate
              </span>
            </div>
            <div className="dashboard-stat">
              <span className="dashboard-stat__label">Losses</span>
              <span className="dashboard-stat__value">{overall.totals.loss}</span>
              <span className="dashboard-stat__label">
                {overall.totalGames} total games
              </span>
            </div>
            <div className="dashboard-stat">
              <span className="dashboard-stat__label">Rated</span>
              <span className="dashboard-stat__value">{ratedSplit.rated}</span>
              <span className="dashboard-stat__label">
                {formatPercent(ratedSplit.ratedPct)} of archive
              </span>
            </div>
          </div>
        </DashboardCard>

        <DashboardCard
          title="Time Control Blend"
          subtitle="Top formats by volume"
          footer="Interactive focus on blitz with supporting bullet & daily rhythms"
        >
          <div className="dashboard-list">
            {timeControls.map((entry) => (
              <div className="dashboard-meter" key={entry.label}>
                <span className="dashboard-list__label">{entry.label}</span>
                <div className="dashboard-meter__bar">
                  <div
                    className="dashboard-meter__fill"
                    style={{ width: `${entry.pct.toFixed(1)}%` }}
                  />
                </div>
                <span className="dashboard-list__value">{entry.count}</span>
              </div>
            ))}
          </div>
        </DashboardCard>

        <DashboardCard
          title="Opening Index"
          subtitle="Volume + performance delta"
          footer="Comparing top five openings by frequency and net score"
          className="dashboard-card--wide"
        >
          <div className="opening-card" style={{ maxWidth: '1000px' }}>
            <div className="opening-card__metrics">
              <span className="opening-card__badge">Hot streak</span>
              <span>
                {openings[0]?.label ?? '—'} · {openings[0]?.count ?? 0} games
              </span>
              <span className="dashboard-list__value">+12.6%</span>
            </div>

            <div className="opening-card__chart opening-card__chart--xl">
              <div className="opening-card__chart-grid" />
              <svg
                className="opening-card__chart-svg"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
              >
                <defs>
                  <linearGradient id="openingLinePrimary" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="rgba(245, 210, 69, 0.2)" />
                    <stop offset="100%" stopColor="rgba(245, 210, 69, 0)" />
                  </linearGradient>
                </defs>
                <path
                  d="M0 62 C 10 58, 18 54, 25 48 C 32 42, 42 36, 52 38 C 64 40, 74 54, 82 62 C 90 70, 96 74, 100 72"
                  fill="none"
                  stroke="rgba(245, 210, 69, 0.85)"
                  strokeWidth="2.5"
                  strokeLinejoin="round"
                />
                <path
                  d="M0 78 C 8 74, 16 70, 28 60 C 38 50, 52 52, 64 48 C 78 44, 90 52, 100 58"
                  fill="none"
                  stroke="rgba(156, 100, 253, 0.8)"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                  strokeLinejoin="round"
                />
                <polygon
                  points="0,100 0,62 25,48 52,38 82,62 100,72 100,100"
                  fill="url(#openingLinePrimary)"
                  opacity="0.6"
                />
              </svg>
            </div>

            <div className="opening-card__legend">
              <span>
                <span
                  className="opening-card__legend-dot"
                  style={{ background: 'rgba(245, 210, 69, 0.8)' }}
                />
                Win margin
              </span>
              <span>
                <span
                  className="opening-card__legend-dot"
                  style={{ background: 'rgba(156, 100, 253, 0.8)' }}
                />
                Usage volume
              </span>
            </div>

            <div className="dashboard-list">
              {openings.map((entry, index) => (
                <div className="dashboard-list__item" key={entry.label}>
                  <span className="dashboard-list__label">
                    {index + 1}. {entry.label}
                  </span>
                  <span className="dashboard-list__value">{entry.count}</span>
                </div>
              ))}
            </div>
          </div>
        </DashboardCard>

        <DashboardCard
          title="Rivals"
          subtitle="Most played opponents"
          footer="Counts represent head-to-head games"
        >
          <div className="dashboard-list">
            {opponents.map((entry) => (
              <div className="dashboard-list__item" key={entry.key}>
                <span className="dashboard-list__label">{entry.key}</span>
                <span className="dashboard-list__value">{entry.count}</span>
              </div>
            ))}
          </div>
        </DashboardCard>

        <DashboardCard
          title="Momentum Sparkline"
          subtitle="Win-loss delta by month"
          footer={
            sparkline.points.length
              ? `${humanizeMonth(
                  sparkline.points[0]?.month
                )} → ${humanizeMonth(
                  sparkline.points[sparkline.points.length - 1]?.month
                )}`
              : 'Awaiting data'
          }
        >
          <svg className="dashboard-sparkline" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path
              d={sparkline.path || 'M 0 50 L 100 50'}
              fill="none"
              stroke="var(--kol-accent-primary)"
              strokeWidth="2"
              strokeLinejoin="round"
              strokeLinecap="round"
            />
          </svg>
          <div className="dashboard-list">
            {sparkline.points.map((point) => (
              <div className="dashboard-list__item" key={point.month}>
                <span className="dashboard-list__label">{point.label}</span>
                <span className="dashboard-list__value">
                  {point.value >= 0 ? '+' : ''}
                  {point.value}
                </span>
              </div>
            ))}
          </div>
        </DashboardCard>
      </section>
    </div>
  )
}

export default ChessDashboards
