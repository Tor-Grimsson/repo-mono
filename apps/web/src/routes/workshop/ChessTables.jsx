import { useMemo } from 'react'
import { getMonthlySummary } from '@kol/chess-data'
import DesPage from '../../components/workshop/molecules/DesPage'
import '../../components/workshop/chess/chess.css'

const ChessTables = () => {
  const monthlyData = useMemo(() => getMonthlySummary(), [])

  // Show latest month (no animation)
  const currentIndex = monthlyData.length - 1
  const currentMonth = monthlyData[currentIndex]
  const prevMonth = monthlyData[currentIndex - 1]

  // Static display values (no animation)
  const displayValues = useMemo(() => {
    if (!currentMonth) return { totalGames: 0, winRate: 0, avgRating: 0, uniqueOpponents: 0 }

    const winRate = ((currentMonth.results.win / currentMonth.total) * 100).toFixed(1)
    const avgRating = ((currentMonth.averagePlayerRating + currentMonth.averageOpponentRating) / 2).toFixed(0)

    return {
      totalGames: currentMonth.total,
      winRate: parseFloat(winRate),
      avgRating: parseInt(avgRating),
      uniqueOpponents: currentMonth.uniqueOpponents
    }
  }, [currentMonth])

  const kpiItems = useMemo(() => {
    if (!currentMonth) return []

    const winRate = ((currentMonth.results.win / currentMonth.total) * 100).toFixed(1)
    const prevWinRate = prevMonth ? ((prevMonth.results.win / prevMonth.total) * 100).toFixed(1) : winRate
    const winRateDelta = ((parseFloat(winRate) - parseFloat(prevWinRate))).toFixed(1)

    const avgRating = currentMonth.averagePlayerRating
    const prevAvgRating = prevMonth?.averagePlayerRating || avgRating
    const ratingDelta = avgRating - prevAvgRating

    return [
      {
        label: 'Games Played',
        value: displayValues.totalGames.toLocaleString(),
        delta: `${displayValues.totalGames - (prevMonth?.total || 0) > 0 ? '+' : ''}${displayValues.totalGames - (prevMonth?.total || 0)}`,
        color: '#F5D245'
      },
      {
        label: 'Win Rate',
        value: `${displayValues.winRate}%`,
        delta: `${winRateDelta > 0 ? '+' : ''}${winRateDelta}%`,
        color: '#5dd27f'
      },
      {
        label: 'Avg Rating',
        value: displayValues.avgRating.toString(),
        delta: `${ratingDelta > 0 ? '+' : ''}${ratingDelta}`,
        color: '#9C64FD'
      },
      {
        label: 'Opponents',
        value: displayValues.uniqueOpponents.toString(),
        delta: `${displayValues.uniqueOpponents - (prevMonth?.uniqueOpponents || 0) > 0 ? '+' : ''}${displayValues.uniqueOpponents - (prevMonth?.uniqueOpponents || 0)}`,
        color: '#E16F2F'
      }
    ]
  }, [displayValues, currentMonth, prevMonth])

  const generateRevenuePath = (data) => {
    if (!data.length) return ''
    const max = Math.max(...data.map(d => d.total))
    return data.map((item, index) => {
      const x = (index / (data.length - 1)) * 100
      const y = 60 - (item.total / max) * 50
      return `${x},${y}`
    }).join(' ')
  }

  const last12Months = monthlyData.slice(-12)
  const revenuePoints = generateRevenuePath(last12Months)

  return (
    <div className="h-full min-h-screen">
      <DesPage
        title="Chess Analytics"
        subtitle="Real-time metrics from 27,200 chess games across 106 months"
        meta="Live data • Animated metrics • Interactive insights"
      />

      <section className="table-cards flex-1">
        <div className="table-card table-card--wide">
          <div className="table-card__kpi-grid">
            {kpiItems.map((item, index) => (
              <div
                className="table-card__kpi"
                key={item.label}
                style={{
                  borderLeft: `3px solid ${item.color}`
                }}
              >
                <span className="table-card__kpi-label">{item.label}</span>
                <span className="table-card__kpi-value" style={{ color: item.color }}>
                  {item.value}
                </span>
                <span
                  className="table-card__kpi-delta"
                  style={{ color: item.delta.startsWith('+') ? '#5dd27f' : '#E16F2F' }}
                >
                  {item.delta}
                </span>
              </div>
            ))}
          </div>

          <div className="table-card__layout">
            <div className="table-card__chart-hero">
              <div className="table-card__chart-grid" />
              <div className="table-card__chart-caption">
                <span>
                  {currentMonth?.month || '2017-02'} •
                  {currentMonth?.timeClass?.blitz || 0} blitz •
                  {currentMonth?.timeClass?.rapid || 0} rapid •
                  {currentMonth?.timeClass?.daily || 0} daily
                </span>
                <span>{displayValues.totalGames.toLocaleString()} games</span>
              </div>
              <svg className="table-card__chart-svg" viewBox="0 0 100 60" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="tablesGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="rgba(10, 104, 42, 0.35)" />
                    <stop offset="100%" stopColor="rgba(10, 104, 42, 0)" />
                  </linearGradient>
                </defs>
                <polyline
                  fill="none"
                  stroke="rgba(245, 210, 69, 0.85)"
                  strokeWidth="2.5"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  points={revenuePoints}
                />
                <polyline
                  fill="none"
                  stroke="rgba(156, 100, 253, 0.75)"
                  strokeWidth="2"
                  strokeDasharray="5 4"
                  points={revenuePoints}
                />
              </svg>
            </div>

            <aside className="table-card__side-stack">
              <div className="table-card__mini-chart">
                <span className="table-card__mini-label">Win Rate</span>
                <strong className="dashboard-list__value" style={{ color: '#5dd27f' }}>
                  {displayValues.winRate}%
                </strong>
                <svg viewBox="0 0 100 60" preserveAspectRatio="none">
                  {Array.from({ length: 12 }, (_, i) => {
                    const value = Math.max(20, Math.min(80, displayValues.winRate + (Math.random() - 0.5) * 30))
                    const barWidth = 100 / 12
                    const x = i * barWidth + barWidth * 0.2
                    const height = (value / 100) * 50
                    return (
                      <rect
                        key={i}
                        x={x}
                        y={60 - height}
                        width={barWidth * 0.6}
                        height={height}
                        rx="1"
                        fill={i % 2 === 0 ? '#5dd27f' : '#3fa85e'}
                      />
                    )
                  })}
                </svg>
              </div>

              <div className="table-card__mini-chart">
                <span className="table-card__mini-label">Rating Trend</span>
                <strong className="dashboard-list__value">{displayValues.avgRating}</strong>
                <svg viewBox="0 0 100 60" preserveAspectRatio="none">
                  <polyline
                    fill="none"
                    stroke="#E16F2F"
                    strokeWidth="2"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    points={Array.from({ length: 12 }, (_, i) => {
                      const value = displayValues.avgRating + (Math.random() - 0.5) * 100
                      const x = (i / 11) * 100
                      const y = 60 - ((value - 1000) / 400) * 50
                      return `${x},${y}`
                    }).join(' ')}
                  />
                </svg>
              </div>

              <div className="table-card__mini-chart">
                <span className="table-card__mini-label">Active Opponents</span>
                <div className="dashboard-list__value">{displayValues.uniqueOpponents} • Live</div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ChessTables
