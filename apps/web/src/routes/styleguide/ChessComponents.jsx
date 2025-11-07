import { useState, useMemo } from 'react'
import { Icon, Checkbox } from '@kol/ui'
import DesPage from '../../components/styleguide/molecules/DesPage'
import DesCard from '../../components/styleguide/molecules/DesCard'
import ChessBoard from '../../components/styleguide/chess/apparatus/ChessBoard'
import '../../components/styleguide/chess/chess.css'

const donutSeriesData = [
  { label: 'Windows', count: 48210, colorClass: 'donut-color-windows' },
  { label: 'macOS', count: 31640, colorClass: 'donut-color-macos' },
  { label: 'Linux', count: 15880, colorClass: 'donut-color-linux' },
  { label: 'ChromeOS', count: 9240, colorClass: 'donut-color-chrome' },
  { label: 'Other', count: 6120, colorClass: 'donut-color-other' }
]

const FEATURED_AXIS_LABELS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
const FEATURED_CHART_POINTS = FEATURED_AXIS_LABELS.length

const donutSeriesTotal = donutSeriesData.reduce((sum, item) => sum + item.count, 0)
const DONUT_CHART_VIEWBOX = 320
const DONUT_CHART_CENTER = DONUT_CHART_VIEWBOX / 2
const DONUT_CHART_RADIUS = 120
const DONUT_CHART_STROKE = 32
const DONUT_CHART_CIRCUMFERENCE = 2 * Math.PI * DONUT_CHART_RADIUS
const FEATURED_CHART_HEIGHT = 50
const FEATURED_CHART_STROKE = 4
const LINE_CHART_HEIGHT = 40
const lineChartSeries = [10, 18, 15, 22, 21, 26, 30]

const candlestickSeries = [
  { high: 78, low: 18, open: 32, close: 58, variant: 'accent' },
  { high: 92, low: 26, open: 40, close: 74, variant: 'accent' },
  { high: 72, low: 28, open: 38, close: 48, variant: 'accent' },
  { high: 86, low: 32, open: 50, close: 70, variant: 'neutral' },
  { high: 68, low: 24, open: 30, close: 54, variant: 'accent' },
  { high: 84, low: 30, open: 46, close: 68, variant: 'neutral' },
  { high: 76, low: 26, open: 34, close: 62, variant: 'accent' },
  { high: 88, low: 34, open: 52, close: 72, variant: 'neutral' },
  { high: 70, low: 28, open: 40, close: 50, variant: 'accent' },
  { high: 90, low: 32, open: 48, close: 78, variant: 'neutral' },
  { high: 82, low: 30, open: 38, close: 66, variant: 'accent' },
  { high: 88, low: 34, open: 54, close: 76, variant: 'accent' }
]

const scatterPoints = Array.from({ length: 60 }).map((_, idx) => ({
  x: (Math.sin(idx * 5.13) + 1) * 80 + Math.random() * 15,
  y: (Math.cos(idx * 3.17) + 1) * 900 + Math.random() * 500,
  id: idx
}))

const formatCompactNumber = (value) => {
  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(1).replace(/\.0$/, '')}M`
  }
  if (value >= 1000) {
    const formatted = (value / 1000).toFixed(value >= 10000 ? 0 : 1)
    return `${formatted.replace(/\.0$/, '')}K`
  }
  return value.toLocaleString()
}

const formatPercent = (value) => {
  if (!Number.isFinite(value)) return '0'
  const formatted = value >= 10 ? value.toFixed(0) : value.toFixed(1)
  return formatted.replace(/\.0$/, '')
}

const ChessComponents = () => {
  const [hoverData, setHoverData] = useState(null)
  const [stackedHoverData, setStackedHoverData] = useState(null)
  const [checkedItems, setCheckedItems] = useState(() => donutSeriesData.map(() => true))

  // Memoized chart data - generates once and never changes
  const chartData = useMemo(() => {
    const points = 90
    const mobile = []
    const desktop = []

    // Generate raw data
    for (let i = 0; i < points; i++) {
      const x = i / points
      const noise1 = Math.sin(x * Math.PI * 8) * 15
      const noise2 = Math.sin(x * Math.PI * 20) * 8
      const noise3 = Math.sin(x * Math.PI * 35) * 4
      const trend = 20 + x * 10
      const random = Math.sin(i * 12.9898) * 3 // Deterministic "random"

      mobile.push(30 + trend + noise1 + noise2 + noise3 + random)
      desktop.push(25 + trend + noise1 * 0.8 + noise2 * 0.6 + noise3 * 0.5 + random * 0.8)
    }

    // Normalize to fit in 5-45 range (with padding in 0-50 viewBox)
    const allValues = [...mobile, ...desktop]
    const min = Math.min(...allValues)
    const max = Math.max(...allValues)
    const range = max - min

    const normalizedMobile = mobile.map(v => 5 + ((v - min) / range) * 40)
    const normalizedDesktop = desktop.map(v => 5 + ((v - min) / range) * 40)

    return { mobile: normalizedMobile, desktop: normalizedDesktop, points }
  }, []) // Empty deps - only generate once

  // Memoized stacked area chart data
  const stackedChartData = useMemo(() => {
    const points = 90
    const windows = []
    const macos = []
    const linux = []

    // Generate raw data for three platforms
    for (let i = 0; i < points; i++) {
      const x = i / points
      const noise1 = Math.sin(x * Math.PI * 6) * 8
      const noise2 = Math.sin(x * Math.PI * 15) * 5
      const random = Math.sin(i * 7.531) * 2

      windows.push(45 + noise1 + noise2 + random)
      macos.push(25 + noise1 * 0.7 + noise2 * 0.8 + random * 0.9)
      linux.push(15 + noise1 * 0.5 + noise2 * 0.6 + random * 0.7)
    }

    // Calculate stacked values (each layer starts where previous ends)
    const stackedWindows = windows.map((v, i) => v)
    const stackedMacos = macos.map((v, i) => v + stackedWindows[i])
    const stackedLinux = linux.map((v, i) => v + stackedMacos[i])

    // Normalize all to fit in viewBox
    const allValues = [...stackedLinux]
    const max = Math.max(...allValues)

    const normalizedWindows = stackedWindows.map(v => (v / max) * 45)
    const normalizedMacos = stackedMacos.map(v => (v / max) * 45)
    const normalizedLinux = stackedLinux.map(v => (v / max) * 45)

    return {
      windows: normalizedWindows,
      macos: normalizedMacos,
      linux: normalizedLinux,
      rawWindows: windows,
      rawMacos: macos,
      rawLinux: linux,
      points
    }
  }, [])

  const featuredChartData = useMemo(() => {
    const winMarginRaw = [29, 48, 14, 42, 13, 11, 45]
    const usageVolumeRaw = [18, 12, 20, 36, 42, 26, 17]

    const allValues = [...winMarginRaw, ...usageVolumeRaw]
    const min = Math.min(...allValues)
    const max = Math.max(...allValues)
    const range = max - min || 1

    const normalize = (series) => series.map(value => {
      const scaled = (value - min) / range
      return 8 + scaled * 32
    })

    return {
      winMargin: normalize(winMarginRaw),
      usageVolume: normalize(usageVolumeRaw)
    }
  }, [])

  // Generate smooth Bézier curve path
  const generateSmoothPath = (values, height = FEATURED_CHART_HEIGHT) => {
    if (values.length < 2) return ''

    const points = values.map((val, i) => ({
      x: (i / (values.length - 1)) * 100,
      y: height - val
    }))

    // Create smooth curve using simplified cubic Bézier
    let path = `M ${points[0].x},${points[0].y}`

    for (let i = 0; i < points.length - 1; i++) {
      const current = points[i]
      const next = points[i + 1]
      const controlPointDistance = (next.x - current.x) * 0.5

      const cp1x = current.x + controlPointDistance
      const cp1y = current.y
      const cp2x = next.x - controlPointDistance
      const cp2y = next.y

      path += ` C ${cp1x},${cp1y} ${cp2x},${cp2y} ${next.x},${next.y}`
    }

    return path
  }

  const mobileLinePath = generateSmoothPath(chartData.mobile)
  const desktopLinePath = generateSmoothPath(chartData.desktop)
  const mobileAreaPath = mobileLinePath + ' L 100,50 L 0,50 Z'
  const desktopAreaPath = desktopLinePath + ' L 100,50 L 0,50 Z'

  // Generate stacked area paths - properly closed areas
  const generateStackedAreaPath = (topValues, bottomValues = null) => {
    const topPath = generateSmoothPath(topValues)

    if (!bottomValues) {
      // Base layer - close to bottom
      return topPath + ' L 100,50 L 0,50 Z'
    }

    // Upper layers - close by following bottom curve backwards
    const bottomPoints = bottomValues.map((val, i) => ({
      x: (i / (bottomValues.length - 1)) * 100,
      y: 50 - val
    })).reverse()

    let reversePath = ''
    for (let i = 0; i < bottomPoints.length - 1; i++) {
      const current = bottomPoints[i]
      const next = bottomPoints[i + 1]
      const controlPointDistance = (current.x - next.x) * 0.5

      const cp1x = current.x - controlPointDistance
      const cp1y = current.y
      const cp2x = next.x + controlPointDistance
      const cp2y = next.y

      if (i === 0) {
        reversePath += ` L ${current.x},${current.y}`
      }
      reversePath += ` C ${cp1x},${cp1y} ${cp2x},${cp2y} ${next.x},${next.y}`
    }

    return topPath + reversePath + ' Z'
  }

  const windowsLinePath = generateSmoothPath(stackedChartData.windows)
  const macosLinePath = generateSmoothPath(stackedChartData.macos)
  const linuxLinePath = generateSmoothPath(stackedChartData.linux)

  const windowsAreaPath = generateStackedAreaPath(stackedChartData.windows)
  const macosAreaPath = generateStackedAreaPath(stackedChartData.macos, stackedChartData.windows)
  const linuxAreaPath = generateStackedAreaPath(stackedChartData.linux, stackedChartData.macos)

  const featuredWinPath = generateSmoothPath(featuredChartData.winMargin)
  const featuredUsagePath = generateSmoothPath(featuredChartData.usageVolume)
  const featuredWinAreaPath = `${featuredWinPath} L 100,${FEATURED_CHART_HEIGHT} L 0,${FEATURED_CHART_HEIGHT} Z`
  const featuredUsageAreaPath = `${featuredUsagePath} L 100,${FEATURED_CHART_HEIGHT} L 0,${FEATURED_CHART_HEIGHT} Z`

  const donutActiveTotal = donutSeriesData.reduce((sum, item, idx) => sum + (checkedItems[idx] ? item.count : 0), 0)
  const hasActiveSegments = donutActiveTotal > 0
  const donutArcTotal = hasActiveSegments ? donutActiveTotal : 1
  let accumulatedCount = 0
  const donutSegments = donutSeriesData.map((item, idx) => {
    const isActive = Boolean(checkedItems[idx])
    const arcValue = isActive && hasActiveSegments ? item.count : 0
    const offsetRatio = arcValue > 0 ? accumulatedCount / donutArcTotal : 0
    if (arcValue > 0) {
      accumulatedCount += arcValue
    }
    const percentOfAll = Number(((item.count / donutSeriesTotal) * 100).toFixed(1))
    return {
      ...item,
      isActive,
      percentOfAll,
      arcRatio: arcValue > 0 ? arcValue / donutArcTotal : 0,
      offsetRatio
    }
  })
  const donutActiveShare = hasActiveSegments ? (donutActiveTotal / donutSeriesTotal) * 100 : 0
  const lineChartPath = lineChartSeries.reduce((acc, value, index) => {
    const x = (index / (lineChartSeries.length - 1)) * 100
    const y = LINE_CHART_HEIGHT - value
    const command = index === 0 ? 'M' : 'L'
    return `${acc} ${command} ${x},${y}`
  }, '').trim()
  const candlestickMin = Math.min(...candlestickSeries.map(item => item.low))
  const candlestickMax = Math.max(...candlestickSeries.map(item => item.high))
  const candlestickRange = candlestickMax - candlestickMin || 1
  const scaleCandlestick = (value) => ((value - candlestickMin) / candlestickRange) * 100
  const candlestickColors = {
    accent: {
      body: 'var(--kol-accent-primary)',
      wick: 'var(--kol-accent-primary)'
    },
    neutral: {
      body: 'var(--kol-surface-on-primary)',
      wick: 'var(--kol-surface-on-primary)'
    }
  }
  const scatterMaxX = 180
  const scatterMaxY = 2400

  return (
    <div className="flex flex-col gap-12">
      <DesPage
        title="Chess Components"
        subtitle="Individual dashboard elements with descriptions and usage patterns"
        meta="Component library • Cards • Charts • Patterns"
      />

      <div className="grid grid-cols-2 gap-6">
        {/* Left Column: KPI + Stacked Bar Mini */}
        <div className="flex flex-col gap-6">
          {/* KPI Card with Border Accent */}
          <div className="flex flex-col gap-6">
            <DesCard
              name="KPI Card with Border Accent"
              description="Metric card with left border accent (3px yellow), displays key performance indicator with label, value, and delta."
            />
            <div
              className="flex flex-col gap-3 p-6 bg-fg-02 border border-fg-08 rounded min-h-[180px]"
              style={{ borderLeftWidth: '3px', borderLeftColor: '#F5D245' }}
            >
              <span className="kol-mono-xs text-fg-64 uppercase tracking-widest">GAMES PLAYED</span>
              <span className="kol-heading-lg">1,234</span>
              <span className="kol-mono-sm text-fg-80">+69</span>
            </div>
          </div>

          {/* Stacked Bar Mini Card */}
          <div className="flex flex-col gap-6">
            <DesCard
              name="Stacked Bar Mini Card"
              description="Compact card with heading, large value display, and multi-layer stacked bar chart. Each bar shows 3 opacity levels."
            />
            <div className="flex flex-col gap-4 p-6 bg-fg-02 border border-fg-08 rounded min-h-[180px]">
              <span className="kol-heading-sm">WIN RATE</span>
              <span className="kol-heading-lg">47.4%</span>

              <div className="flex-1 flex items-end gap-1">
                {Array.from({ length: 12 }).map((_, i) => (
                  <div key={i} className="flex-1 flex flex-col justify-end gap-0.5">
                    <div className="bg-fg-32 rounded-sm" style={{ height: `${Math.random() * 60}%` }} />
                    <div className="bg-fg-24 rounded-sm" style={{ height: `${Math.random() * 40}%` }} />
                    <div className="bg-fg-16 rounded-sm" style={{ height: `${Math.random() * 30}%` }} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Time Series Chart */}
        <div className="flex flex-col gap-6">
          <DesCard
            name="Time Series Chart Card"
            description="Large chart with title, subtitle, time period selector buttons, multi-line graph with grid, and x-axis date labels."
          />
          <div className="flex flex-col gap-6 p-6 bg-fg-02 border border-fg-08 rounded min-h-[600px]">
            {/* Header */}
            <div className="flex justify-between items-start">
              <div className="flex flex-col gap-1.5">
                <span className="kol-heading-md">Total Visitors</span>
                <span className="kol-mono-xs text-fg-64">Total for the last 3 months</span>
              </div>

              {/* Time Selector */}
              <div className="flex">
                <button className="px-4 h-9 bg-fg-08 border border-fg-12 rounded-l kol-mono-xs">
                  Last 3 months
                </button>
                <button className="px-4 h-9 border-t border-r border-b border-fg-08 kol-mono-xs text-fg-64">
                  Last 30 days
                </button>
                <button className="px-4 h-9 border-t border-r border-b border-fg-08 rounded-r kol-mono-xs text-fg-64">
                  Last 7 days
                </button>
              </div>
            </div>

            {/* Chart Area */}
            <div className="flex-1 flex flex-col gap-2">
              <div
                className="flex-1 relative"
                onMouseMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect()
                  const x = ((e.clientX - rect.left) / rect.width)
                  const index = Math.round(x * (chartData.points - 1))

                  // Generate date labels
                  const dates = ['Apr 2', 'Apr 8', 'Apr 14', 'Apr 21', 'Apr 28', 'May 5', 'May 12', 'May 19', 'May 25', 'Jun 2', 'Jun 8', 'Jun 15', 'Jun 22', 'Jun 30']
                  const dateIndex = Math.floor(x * (dates.length - 1))

                  const xPos = (index / (chartData.points - 1)) * 100
                  const yMobile = 50 - chartData.mobile[index]
                  const yDesktop = 50 - chartData.desktop[index]

                  setHoverData({
                    x: e.clientX - rect.left,
                    y: e.clientY - rect.top,
                    date: dates[dateIndex],
                    mobile: Math.round(chartData.mobile[index] * 10),
                    desktop: Math.round(chartData.desktop[index] * 10),
                    index,
                    xPos,
                    yMobile,
                    yDesktop
                  })
                }}
                onMouseLeave={() => setHoverData(null)}
              >
                {/* Grid lines */}
                <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="h-px bg-fg-08" />
                  ))}
                </div>

                {/* Area chart with gradient */}
                <svg viewBox="0 0 100 50" className="w-full h-full" preserveAspectRatio="none">
                  <defs>
                    {/* Gradient for Mobile (brighter blue) */}
                    <linearGradient id="mobileGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#4169E1" stopOpacity="0.5" />
                      <stop offset="100%" stopColor="#4169E1" stopOpacity="0" />
                    </linearGradient>
                    {/* Gradient for Desktop (darker blue) */}
                    <linearGradient id="desktopGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#1E3A8A" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#1E3A8A" stopOpacity="0" />
                    </linearGradient>
                  </defs>

                  {/* Desktop area (back layer) */}
                  <path
                    d={desktopAreaPath}
                    fill="url(#desktopGradient)"
                  />
                  {/* Desktop line */}
                  <path
                    d={desktopLinePath}
                    fill="none"
                    stroke="#2563EB"
                    strokeWidth="0.4"
                  />

                  {/* Mobile area (front layer) */}
                  <path
                    d={mobileAreaPath}
                    fill="url(#mobileGradient)"
                  />
                  {/* Mobile line */}
                  <path
                    d={mobileLinePath}
                    fill="none"
                    stroke="#60A5FA"
                    strokeWidth="0.4"
                  />

                  {/* Hover dots */}
                  {hoverData && (
                    <>
                      {/* Mobile dot */}
                      <circle
                        cx={hoverData.xPos}
                        cy={hoverData.yMobile}
                        r="1.2"
                        fill="#60A5FA"
                        stroke="#1E293B"
                        strokeWidth="0.5"
                        className="pointer-events-none"
                      />
                      {/* Desktop dot */}
                      <circle
                        cx={hoverData.xPos}
                        cy={hoverData.yDesktop}
                        r="1.2"
                        fill="#2563EB"
                        stroke="#1E293B"
                        strokeWidth="0.5"
                        className="pointer-events-none"
                      />
                    </>
                  )}
                </svg>

                {/* Tooltip */}
                {hoverData && (
                  <div
                    className="absolute bg-[#0a0a0a] border border-fg-16 rounded p-3 pointer-events-none z-10"
                    style={{
                      left: `${hoverData.x}px`,
                      top: `${Math.max(80, hoverData.y - 80)}px`,
                      transform: 'translateX(-50%)'
                    }}
                  >
                    <div className="flex flex-col gap-2 min-w-[120px]">
                      <span className="kol-mono-xs text-fg-88">{hoverData.date}</span>
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-[#60A5FA]" />
                          <span className="kol-mono-xs text-fg-64">Mobile</span>
                        </div>
                        <span className="kol-mono-xs text-fg-88">{hoverData.mobile}</span>
                      </div>
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-[#2563EB]" />
                          <span className="kol-mono-xs text-fg-64">Desktop</span>
                        </div>
                        <span className="kol-mono-xs text-fg-88">{hoverData.desktop}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* X-axis labels */}
              <div className="flex justify-between">
                {['Apr 2', 'Apr 8', 'Apr 14', 'Apr 21', 'Apr 28', 'May 5', 'May 12', 'May 19', 'May 25', 'Jun 2', 'Jun 8', 'Jun 15', 'Jun 22', 'Jun 30'].map((date, idx) => (
                  <span key={idx} className="kol-mono-xxs text-fg-64">{date}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Large Chart Card */}
        <div className="flex flex-col gap-6">
          <DesCard
            name="Large Chart Card"
            description="Primary visualization card with header metrics, chart area placeholder, and legend. Uses flexible layout with min-height."
          />
          <div className="flex flex-col gap-6 p-6 bg-fg-02 border border-fg-08 rounded min-h-[480px]">
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-2">
                <span className="kol-mono-xs text-fg-64 uppercase tracking-widest">WIN RATE</span>
                <span className="kol-heading-xl">47.4%</span>
              </div>
              <span className="kol-mono-sm text-fg-64">106 months</span>
            </div>

            {/* Stacked Area Chart */}
            <div className="flex-1 flex flex-col gap-2 overflow-hidden">
              <div
                className="flex-1 relative min-h-0"
                onMouseMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect()
                  const x = ((e.clientX - rect.left) / rect.width)
                  const index = Math.round(x * (stackedChartData.points - 1))

                  const dates = ['Apr 2', 'Apr 8', 'Apr 14', 'Apr 21', 'Apr 28', 'May 5', 'May 12', 'May 19', 'May 25', 'Jun 2', 'Jun 8', 'Jun 15', 'Jun 22', 'Jun 30']
                  const dateIndex = Math.floor(x * (dates.length - 1))

                  const xPos = (index / (stackedChartData.points - 1)) * 100
                  const yWindows = 50 - stackedChartData.windows[index]
                  const yMacos = 50 - stackedChartData.macos[index]
                  const yLinux = 50 - stackedChartData.linux[index]

                  setStackedHoverData({
                    x: e.clientX - rect.left,
                    y: e.clientY - rect.top,
                    date: dates[dateIndex],
                    windows: Math.round(stackedChartData.rawWindows[index] * 10),
                    macos: Math.round(stackedChartData.rawMacos[index] * 10),
                    linux: Math.round(stackedChartData.rawLinux[index] * 10),
                    index,
                    xPos,
                    yWindows,
                    yMacos,
                    yLinux
                  })
                }}
                onMouseLeave={() => setStackedHoverData(null)}
              >
                {/* Grid lines */}
                <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="h-px bg-fg-08" />
                  ))}
                </div>

                {/* Stacked Area Chart */}
                <svg viewBox="0 0 100 50" className="w-full h-full" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="windowsGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#60A5FA" stopOpacity="0.6" />
                      <stop offset="100%" stopColor="#60A5FA" stopOpacity="0.1" />
                    </linearGradient>
                    <linearGradient id="macosGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#34D399" stopOpacity="0.6" />
                      <stop offset="100%" stopColor="#34D399" stopOpacity="0.1" />
                    </linearGradient>
                    <linearGradient id="linuxGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.6" />
                      <stop offset="100%" stopColor="#F59E0B" stopOpacity="0.1" />
                    </linearGradient>
                  </defs>

                  {/* Windows (bottom layer) */}
                  <path d={windowsAreaPath} fill="url(#windowsGradient)" />
                  <path d={windowsLinePath} fill="none" stroke="#60A5FA" strokeWidth="0.4" />

                  {/* macOS (middle layer) */}
                  <path d={macosAreaPath} fill="url(#macosGradient)" />
                  <path d={macosLinePath} fill="none" stroke="#34D399" strokeWidth="0.4" />

                  {/* Linux (top layer) */}
                  <path d={linuxAreaPath} fill="url(#linuxGradient)" />
                  <path d={linuxLinePath} fill="none" stroke="#F59E0B" strokeWidth="0.4" />

                  {/* Hover dots */}
                  {stackedHoverData && (
                    <>
                      <circle cx={stackedHoverData.xPos} cy={stackedHoverData.yWindows} r="1.2" fill="#60A5FA" stroke="#1E293B" strokeWidth="0.5" />
                      <circle cx={stackedHoverData.xPos} cy={stackedHoverData.yMacos} r="1.2" fill="#34D399" stroke="#1E293B" strokeWidth="0.5" />
                      <circle cx={stackedHoverData.xPos} cy={stackedHoverData.yLinux} r="1.2" fill="#F59E0B" stroke="#1E293B" strokeWidth="0.5" />
                    </>
                  )}
                </svg>

                {/* Tooltip */}
                {stackedHoverData && (
                  <div
                    className="absolute bg-[#0a0a0a] border border-fg-16 rounded p-3 pointer-events-none z-10"
                    style={{
                      left: `${stackedHoverData.x}px`,
                      top: `${Math.max(100, stackedHoverData.y - 100)}px`,
                      transform: 'translateX(-50%)'
                    }}
                  >
                    <div className="flex flex-col gap-2 min-w-[120px]">
                      <span className="kol-mono-xs text-fg-88">{stackedHoverData.date}</span>
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-[#60A5FA]" />
                          <span className="kol-mono-xs text-fg-64">Windows</span>
                        </div>
                        <span className="kol-mono-xs text-fg-88">{stackedHoverData.windows}</span>
                      </div>
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-[#34D399]" />
                          <span className="kol-mono-xs text-fg-64">macOS</span>
                        </div>
                        <span className="kol-mono-xs text-fg-88">{stackedHoverData.macos}</span>
                      </div>
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-[#F59E0B]" />
                          <span className="kol-mono-xs text-fg-64">Linux</span>
                        </div>
                        <span className="kol-mono-xs text-fg-88">{stackedHoverData.linux}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#60A5FA]" />
                <span className="kol-mono-xs text-fg-64">Windows</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#34D399]" />
                <span className="kol-mono-xs text-fg-64">macOS</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#F59E0B]" />
                <span className="kol-mono-xs text-fg-64">Linux</span>
              </div>
            </div>
          </div>
        </div>

        {/* Compact Stacked Bar Card */}
        <div className="flex flex-col gap-6 row-span-1">
          <DesCard
            name="Compact Stacked Bar Card"
            description="Small card with icon menu, title, subtitle, and mini stacked bar visualization. Good for sidebar displays."
          />
          <div className="flex flex-col p-6 bg-fg-02 border border-fg-08 rounded h-full">
            {/* Header with title and icon */}
            <div className="flex justify-between items-center mb-6">
              <span className="kol-heading-md">blits</span>
              <div className="h-6 flex justify-center items-center overflow-visible">
                <Icon name="chess-rook" size={24} className="text-fg-88" />
              </div>
            </div>

            {/* Stacked bar chart with 16 columns - fills available height */}
            <div className="flex-1 flex items-stretch gap-1 min-h-0">
              {[10, 30, 50, 30, 80, 50, 80, 90, 100, 95, 100, 90, 95, 100, 100, 100].map((height, i) => (
                <div key={i} className="flex-1 flex flex-col justify-end items-start gap-1" style={{ height: '100%' }}>
                  <div className="w-full flex flex-col justify-start gap-1" style={{ height: `${height}%` }}>
                    <div className="w-full flex-1 bg-white" />
                    <div className="w-full h-2.5 bg-[#6366F1]" />
                    <div className="w-full flex-1 bg-[#475569]" />
                  </div>
                </div>
              ))}
            </div>

            {/* Footer with labels */}
            <div className="flex justify-between items-start mt-6">
              <span className="kol-mono-xs text-fg-64">106 months</span>
              <span className="kol-mono-xs text-fg-64">Total games</span>
            </div>
          </div>
        </div>

      {/* Donut Chart Card 1 */}
      <div className="flex flex-col gap-6">
        <DesCard
          name="Donut Chart Card 1"
          description="Distribution visualization with interactive donut chart, live legend, and checkbox list that toggles individual segments."
        />
        <div className="flex flex-col gap-6 p-6 bg-fg-02 border border-fg-08 rounded min-h-[400px]">
          <div className="flex flex-wrap justify-between gap-4">
            <div className="flex flex-col gap-1">
              <span className="kol-mono-sm text-fg-80 uppercase tracking-wider">Operating System</span>
              <span className="kol-mono-xs text-fg-64">Active installs across tracked devices</span>
            </div>
            <div className="flex flex-wrap gap-4 kol-mono-xs text-fg-64">
              {donutSegments.map((segment) => (
                <div key={segment.label} className="flex items-center gap-2">
                  <span
                    className={`donut-chart__dot ${segment.colorClass} ${segment.isActive ? '' : 'is-muted'}`}
                    aria-hidden="true"
                  />
                  <div className="flex items-center gap-1">
                    <span className={segment.isActive ? '' : 'text-fg-48'}>{segment.label}</span>
                    <span className="kol-mono-xxs text-fg-48">
                      ({formatPercent(segment.percentOfAll)}%)
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex-1 flex flex-col items-center justify-center">
            <div className="relative w-64 h-64 flex items-center justify-center">
              <svg
                viewBox={`0 0 ${DONUT_CHART_VIEWBOX} ${DONUT_CHART_VIEWBOX}`}
                className="w-full h-full"
                role="img"
                aria-label="Operating system distribution donut chart"
              >
                <circle
                  cx={DONUT_CHART_CENTER}
                  cy={DONUT_CHART_CENTER}
                  r={DONUT_CHART_RADIUS}
                  stroke="var(--kol-border-subtle)"
                  strokeWidth={DONUT_CHART_STROKE}
                  fill="none"
                />
                {donutSegments.map((segment) => (
                  segment.arcRatio > 0 ? (
                    <circle
                      key={segment.label}
                      cx={DONUT_CHART_CENTER}
                      cy={DONUT_CHART_CENTER}
                      r={DONUT_CHART_RADIUS}
                      strokeWidth={DONUT_CHART_STROKE}
                      className={`donut-chart__segment ${segment.colorClass}`}
                      strokeDasharray={`${segment.arcRatio * DONUT_CHART_CIRCUMFERENCE} ${DONUT_CHART_CIRCUMFERENCE}`}
                      strokeDashoffset={-segment.offsetRatio * DONUT_CHART_CIRCUMFERENCE}
                      strokeLinecap="round"
                      transform={`rotate(-90 ${DONUT_CHART_CENTER} ${DONUT_CHART_CENTER})`}
                    />
                  ) : null
                ))}
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 text-center px-6 pointer-events-none">
                <span className="kol-mono-xxs text-fg-64 uppercase tracking-widest">Active installs</span>
                <span className="kol-heading-lg">
                  {hasActiveSegments ? formatCompactNumber(donutActiveTotal) : '0'}
                </span>
                <span className="kol-mono-xs text-fg-64">
                  {hasActiveSegments ? `${formatPercent(donutActiveShare)}% of total` : 'Enable a segment'}
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            {donutSegments.map((segment, idx) => (
              <div key={segment.label} className="flex items-center justify-between gap-4 py-2 border-b border-fg-04">
                <div className="flex items-center gap-3 flex-1">
                  <Checkbox
                    checked={segment.isActive}
                    onChange={(checked) => {
                      setCheckedItems((prev) => {
                        const next = [...prev]
                        next[idx] = checked
                        return next
                      })
                    }}
                    aria-label={`Toggle ${segment.label}`}
                  />
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                      <span
                        className={`donut-chart__dot ${segment.colorClass} ${segment.isActive ? '' : 'is-muted'}`}
                        aria-hidden="true"
                      />
                      <span className={`kol-mono-xs ${segment.isActive ? 'text-fg-80' : 'text-fg-48'}`}>
                        {segment.label}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 w-28 rounded-full bg-fg-04 overflow-hidden">
                        <div
                          className={`donut-chart__bar-fill ${segment.colorClass} ${segment.isActive ? '' : 'is-muted'}`}
                          style={{ width: `${segment.percentOfAll}%` }}
                          aria-hidden="true"
                        />
                      </div>
                      <span className="kol-mono-xxs text-fg-60">
                        {formatPercent(segment.percentOfAll)}%
                      </span>
                    </div>
                  </div>
                </div>
                <span className={`kol-mono-xs ${segment.isActive ? 'text-fg-88' : 'text-fg-48'}`}>
                  {formatCompactNumber(segment.count)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Circular Gradient Chart Card */}
      <div className="flex flex-col gap-6">
        <DesCard
          name="Circular Gradient Chart Card"
          description="Multi-ring circular chart with conic gradients. Each ring uses gradient colors and white opacity masks to create donut effect."
        />
        <div className="flex flex-col gap-6 p-6 bg-fg-02 border border-fg-08 rounded h-full">
          <div className="flex flex-col gap-2">
            <span className="kol-heading-sm">OVERALL LEDGER</span>
            <span className="kol-mono-xs text-fg-60">All recorded games</span>
          </div>

          <div className="flex-1 flex items-center justify-center min-h-0">
            <div className="w-80 h-80 relative">
              {/* Background layer for outer ring */}
              <div className="w-80 h-80 left-0 top-0 absolute rounded-full border-[18px] border-fg-02" style={{ borderRadius: '50%' }} />
              {/* Outer ring - 18px thick, starts at 0deg (12 o'clock), goes 83.33% (300deg) */}
              <svg viewBox="0 0 320 320" className="w-80 h-80 absolute left-0 top-0">
                <circle cx="160" cy="160" r="151" fill="none" stroke="url(#outerGrad)" strokeWidth="18" strokeLinecap="round" strokeDasharray="795.4 158.8" transform="rotate(-90 160 160)" />
                <defs>
                  <linearGradient id="outerGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#F5D245" />
                    <stop offset="33%" stopColor="#E8A87C" />
                    <stop offset="66%" stopColor="#D891BC" />
                    <stop offset="100%" stopColor="#B57FE8" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="w-[284px] h-[284px] left-[18px] top-[18px] absolute bg-[#1a1a1a] rounded-full" />

              {/* Background layer for middle ring */}
              <div className="w-[260px] h-[260px] left-[30px] top-[30px] absolute rounded-full border-[18px] border-fg-02" style={{ borderRadius: '50%' }} />
              {/* Middle ring */}
              <svg viewBox="0 0 260 260" className="w-[260px] h-[260px] absolute left-[30px] top-[30px]">
                <circle cx="130" cy="130" r="121" fill="none" stroke="url(#middleGrad)" strokeWidth="18" strokeLinecap="round" strokeDasharray="538.3 221.5" transform="rotate(-90 130 130)" />
                <defs>
                  <linearGradient id="middleGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#B57FE8" />
                    <stop offset="50%" stopColor="#A070D8" />
                    <stop offset="100%" stopColor="#8B7FD8" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="w-[224px] h-[224px] left-[48px] top-[48px] absolute bg-[#1a1a1a] rounded-full" />

              {/* Background layer for inner ring */}
              <div className="w-[200px] h-[200px] left-[60px] top-[60px] absolute rounded-full border-[18px] border-fg-02" style={{ borderRadius: '50%' }} />
              {/* Inner ring */}
              <svg viewBox="0 0 200 200" className="w-[200px] h-[200px] absolute left-[60px] top-[60px]">
                <circle cx="100" cy="100" r="91" fill="none" stroke="url(#innerGrad)" strokeWidth="18" strokeLinecap="round" strokeDasharray="333.8 238.8" transform="rotate(-90 100 100)" />
                <defs>
                  <linearGradient id="innerGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#8B7FD8" />
                    <stop offset="50%" stopColor="#6BA5C8" />
                    <stop offset="100%" stopColor="#6BB88C" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="w-[164px] h-[164px] left-[78px] top-[78px] absolute bg-[#1a1a1a] rounded-full" />

              {/* Background layer for innermost ring */}
              <div className="w-[140px] h-[140px] left-[90px] top-[90px] absolute rounded-full border-[18px] border-fg-02" style={{ borderRadius: '50%' }} />
              {/* Innermost arc */}
              <svg viewBox="0 0 140 140" className="w-[140px] h-[140px] absolute left-[90px] top-[90px]">
                <circle cx="70" cy="70" r="61" fill="none" stroke="url(#innermostGrad)" strokeWidth="18" strokeLinecap="round" strokeDasharray="95.8 287.5" transform="rotate(-90 70 70)" />
                <defs>
                  <linearGradient id="innermostGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#BFDC5A" />
                    <stop offset="33%" stopColor="#F5E84A" />
                    <stop offset="66%" stopColor="#E8C87C" />
                    <stop offset="100%" stopColor="#C8A87C" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="w-[104px] h-[104px] left-[108px] top-[108px] absolute bg-[#1a1a1a] rounded-full" />
            </div>
          </div>

          <div className="pt-4 border-t border-fg-08">
            <span className="kol-mono-xs text-fg-60">Counts represent head-to-head games</span>
          </div>
        </div>
      </div>

      {/* RIVALS List Card */}
      <div className="flex flex-col gap-6">
        <DesCard
          name="RIVALS List Card"
          description="Ranked list card with header section showing title and rank badge, list of 5 items with names and counts, footer with description text."
        />
        <div className="flex flex-col gap-4 p-6 bg-fg-02 border border-fg-08 rounded min-h-[288px]">
          <div className="flex justify-between items-start">
            <div className="flex flex-col gap-2">
              <span className="kol-heading-sm">RIVALS</span>
              <span className="kol-mono-xs text-fg-60">Section: What is Foundry?</span>
            </div>
            <span className="kol-mono-sm text-fg-80">#1</span>
          </div>

          <div className="flex flex-col gap-3">
            {['cizn', 'grim', 'dock', 'tabla', 'sank'].map((name, idx) => (
              <div key={idx} className="flex justify-between items-center">
                <span className="kol-mono-sm text-fg-80">{name}</span>
                <span className="kol-mono-sm text-fg-88">38</span>
              </div>
            ))}
          </div>

          <div className="mt-auto pt-4 border-t border-fg-08">
            <span className="kol-mono-xs text-fg-60">Counts represent head-to-head games</span>
          </div>
        </div>
      </div>

      {/* Horizontal Meter Card */}
      <div className="flex flex-col gap-6">
        <DesCard
          name="OVERALL LEDGER Meter Card"
          description="Progress meter card with header, 4 horizontal bars showing label, filled progress bar (yellow #F5D245), and value. Footer with description."
        />
        <div className="flex flex-col gap-4 p-6 bg-fg-02 border border-fg-08 rounded min-h-[288px]">
          <div className="flex flex-col gap-2">
            <span className="kol-heading-sm">OVERALL LEDGER</span>
            <span className="kol-mono-xs text-fg-60">All recorded games</span>
          </div>

          <div className="flex flex-col gap-3">
            {[
              { label: 'blitz', value: 25324, pct: 100 },
              { label: 'blitz', value: 25324, pct: 100 },
              { label: 'blitz', value: 25324, pct: 80 },
              { label: 'blitz', value: 25324, pct: 70 }
            ].map((meter, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <span className="kol-mono-sm text-fg-80 min-w-[60px]">{meter.label}</span>
                <div className="flex-1 h-3 bg-fg-08 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${meter.pct}%`, background: '#F5D245' }}
                  />
                </div>
                <span className="kol-mono-sm text-fg-88 min-w-[60px] text-right">{meter.value}</span>
              </div>
            ))}
          </div>

          <div className="mt-auto pt-4 border-t border-fg-08">
            <span className="kol-mono-xs text-fg-60">Counts represent head-to-head games</span>
          </div>
        </div>
      </div>

      {/* Badge Card with Status */}
      <div className="flex flex-col gap-6">
        <DesCard
          name="Featured Analysis Card with Badge"
          description="Large highlighted analysis card with badge label, narrative text, and dual-layer area chart comparing win margin vs usage volume."
        />
        <div className="flex flex-col gap-6 p-6 bg-fg-02 border border-fg-08 rounded min-h-[480px]">
          <div className="flex items-start justify-between">
            <div className="flex flex-col gap-2">
              <span className="inline-flex items-center px-3 py-1 bg-fg-16 rounded-full kol-mono-xxs text-fg-88 uppercase tracking-wider">
                HOT STREAK
              </span>
              <span className="kol-heading-sm">Kings Gambit Momentum</span>
              <p className="kol-mono-xs text-fg-64">
                +12.6% win margin over 90 day window • usage climbing steadily with each training block.
              </p>
            </div>
            <div className="text-right">
              <span className="kol-mono-xs text-fg-60 uppercase tracking-widest">Games tracked</span>
              <p className="kol-heading-md">4,812</p>
            </div>
          </div>

          <div className="flex-1 flex flex-col gap-3">
            <div className="relative w-full h-64 bg-fg-02 border border-fg-04 rounded overflow-hidden">
              <svg
                viewBox={`0 0 100 ${FEATURED_CHART_HEIGHT}`}
                preserveAspectRatio="none"
                className="absolute inset-0 w-full h-full"
                role="img"
                aria-label="Kings Gambit win margin versus usage volume"
              >
                <rect width="100" height={FEATURED_CHART_HEIGHT} fill="var(--kol-surface-secondary)" />
                <defs>
                  <linearGradient id="featuredWinFill" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="var(--kol-accent-primary)" stopOpacity="0.45" />
                    <stop offset="100%" stopColor="var(--kol-accent-primary)" stopOpacity="0" />
                  </linearGradient>
                  <linearGradient id="featuredUsageFill" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="var(--kol-status-danger)" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="var(--kol-status-danger)" stopOpacity="0" />
                  </linearGradient>
                </defs>

                {[10, 20, 30, 40].map((y) => (
                  <line
                    key={y}
                    x1="0"
                    x2="100"
                    y1={FEATURED_CHART_HEIGHT - y}
                    y2={FEATURED_CHART_HEIGHT - y}
                    stroke="var(--kol-border-subtle)"
                    strokeDasharray="1 2"
                    strokeWidth="0.3"
                  />
                ))}

                <path d={featuredUsageAreaPath} fill="url(#featuredUsageFill)" />
                <path d={featuredWinAreaPath} fill="url(#featuredWinFill)" />

                <path
                  d={featuredUsagePath}
                  stroke="var(--kol-status-danger)"
                  strokeWidth={FEATURED_CHART_STROKE}
                  fill="none"
                  strokeLinecap="round"
                  vectorEffect="non-scaling-stroke"
                />
                <path
                  d={featuredWinPath}
                  stroke="var(--kol-accent-primary)"
                  strokeWidth={FEATURED_CHART_STROKE}
                  fill="none"
                  strokeLinecap="round"
                  vectorEffect="non-scaling-stroke"
                />
              </svg>
            </div>
            <div className="flex justify-between items-start pt-2">
              {FEATURED_AXIS_LABELS.map(label => (
                <div key={label} className="flex flex-col items-center gap-2 min-w-[32px]">
                  <span className="w-px h-3 bg-fg-16" />
                  <span className="kol-mono-xxs text-fg-64">{label}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-6">
              {[{ label: 'Win margin', className: 'donut-color-windows' }, { label: 'Usage volume', className: 'donut-color-macos' }].map((item) => (
                <div key={item.label} className="flex items-center gap-2">
                  <span className={`donut-chart__dot ${item.className}`} aria-hidden="true" />
                  <div className="flex flex-col">
                    <span className="kol-mono-xxs text-fg-88 uppercase tracking-widest">{item.label}</span>
                    <span className="kol-mono-xs text-fg-60">
                      {item.label === 'Win margin' ? '+12.6% avg' : '↑ 18% MoM'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Simple Metric Card */}
      <div className="flex flex-col gap-6">
        <DesCard
          name="Simple Metric Card"
          description="Minimal card showing single metric with label, large value, and delta. No border accent."
        />
        <div className="flex flex-col gap-3 p-6 bg-fg-02 border border-fg-08 rounded">
          <span className="kol-mono-xs text-fg-64 uppercase tracking-widest">TOTAL GAMES</span>
          <span className="kol-heading-lg">1,234</span>
          <span className="kol-mono-sm text-fg-80">-20%</span>
        </div>
      </div>

      {/* Alert/Status Card */}
      <div className="flex flex-col gap-6">
        <DesCard
          name="Alert Status Card"
          description="Information card with warning messages, arrows, and horizontal divider. Shows trend indicators and action-needed alerts."
        />
        <div className="flex flex-col gap-6 p-6 bg-fg-02 border border-fg-08 rounded min-h-[420px]">
            <div className="flex items-start justify-between gap-4">
              <div className="flex flex-col gap-1">
                <span className="kol-mono-xs text-fg-60">1,234</span>
                <span className="kol-heading-lg">1,234</span>
              </div>
              <div className="inline-flex items-center gap-1 px-2 py-[2px] rounded border border-fg-08 text-fg-80 bg-fg-04">
                <span className="inline-flex items-center justify-center w-6 h-6">
                  <Icon name="trending" size={16} />
                </span>
                <span className="kol-mono-xs">-20%</span>
              </div>
            </div>

          <div className="flex flex-col gap-6 flex-1">
            {[1, 2].map((item) => (
              <div key={item} className="flex flex-col gap-1">
                <span className="kol-heading-xs">Down 20% this period ↘</span>
                <span className="kol-mono-sm text-fg-64">Acquisition needs attention</span>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-fg-08">
            <span className="kol-mono-xs text-fg-60">Counts represent head-to-head games</span>
          </div>
        </div>
      </div>

      {/* Line Chart Card */}
      <div className="flex flex-col gap-6">
        <DesCard
          name="Line Chart Card with List"
          description="Card with heading, SVG line chart (yellow stroke), numbered list of items with values, and footer summary row."
        />
        <div className="flex flex-col gap-4 p-6 bg-fg-02 border border-fg-08 rounded">
          <div className="flex flex-col gap-2">
            <span className="kol-heading-sm">OVERALL LEDGER</span>
            <span className="kol-mono-xs text-fg-60">All recorded games</span>
          </div>

          <div className="relative w-full h-32 bg-fg-02 border border-fg-04 rounded overflow-hidden">
            <svg
              viewBox={`0 0 100 ${LINE_CHART_HEIGHT}`}
              preserveAspectRatio="none"
              className="absolute inset-0 w-full h-full"
              role="img"
              aria-label="Overall ledger line chart"
            >
              {[10, 20, 30].map((y) => (
                <line
                  key={y}
                  x1="0"
                  x2="100"
                  y1={LINE_CHART_HEIGHT - y}
                  y2={LINE_CHART_HEIGHT - y}
                  stroke="var(--kol-border-subtle)"
                  strokeWidth="0.4"
                  strokeDasharray="2 2"
                />
              ))}

              <path
                d={lineChartPath}
                fill="none"
                stroke="var(--kol-accent-primary)"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
          </div>

          <div className="flex flex-col gap-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex justify-between items-center">
                <span className="kol-mono-xs text-fg-80">{i}. All recorded games</span>
                <span className="kol-mono-xs text-fg-88">675</span>
              </div>
            ))}
          </div>

          <div className="mt-2 pt-4 border-t border-fg-08">
            <div className="flex justify-between items-center">
              <span className="kol-mono-xs text-fg-80">blitz</span>
              <span className="kol-mono-xs text-fg-88">25324</span>
            </div>
          </div>
      </div>
    </div>

      {/* Candlestick Ledger Card */}
      <div className="flex flex-col gap-6">
        <DesCard
          name="Candlestick Ledger Card"
          description="Ledger view with badge, center label, and candlestick visualization comparing win margin ranges."
        />
        <div className="flex flex-col gap-6 p-6 bg-fg-02 border border-fg-08 rounded">
          <div className="flex items-center justify-between gap-4">
            <div className="flex flex-col gap-1">
              <span className="kol-heading-sm">OVERALL LEDGER</span>
              <span className="kol-mono-xs text-fg-60">All recorded games</span>
            </div>
            <span className="kol-mono-xs text-fg-64">Kings Gambit</span>
            <div className="inline-flex items-center gap-1 px-2 py-[2px] rounded border border-fg-08 text-fg-80 bg-fg-04">
              <span className="inline-flex items-center justify-center w-6 h-6">
                <Icon name="trending" size={16} />
              </span>
              <span className="kol-mono-xs">-20%</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="kol-mono-xs text-fg-64 uppercase tracking-widest">↘ -20%</span>
            <span className="kol-mono-xs text-fg-64">+12.6%</span>
          </div>

          <div className="relative w-full h-72 bg-fg-02 border border-fg-04 rounded overflow-hidden p-4">
            {[20, 40, 60, 80].map((y) => (
              <div
                key={y}
                className="absolute left-4 right-4"
                style={{
                  borderTop: '1px dashed var(--kol-border-subtle)',
                  top: `${(100 - y)}%`,
                  opacity: 0.4
                }}
              />
            ))}
            <div className="absolute left-4 right-4 top-4 bottom-4 flex items-end gap-3">
              {candlestickSeries.map((item, idx) => {
                const colors = candlestickColors[item.variant] || candlestickColors.accent
                const scaledHigh = scaleCandlestick(item.high)
                const scaledLow = scaleCandlestick(item.low)
                const scaledOpen = scaleCandlestick(item.open)
                const scaledClose = scaleCandlestick(item.close)
                const wickHeight = Math.max(scaledHigh - scaledLow, 1)
                const bodyHeight = Math.max(Math.abs(scaledClose - scaledOpen), 3)
                const bodyBottom = Math.min(scaledOpen, scaledClose)

                return (
                  <div key={idx} className="relative flex-1 h-full">
                    <span
                      className="absolute left-1/2 -translate-x-1/2 w-[1.5px]"
                      style={{
                        height: `${wickHeight}%`,
                        bottom: `${scaledLow}%`,
                        background: colors.wick
                      }}
                    />
                    <span
                      className="absolute left-1/2 -translate-x-1/2 w-2 rounded-sm"
                      style={{
                        height: `${bodyHeight}%`,
                        bottom: `${bodyBottom}%`,
                        background: colors.body
                      }}
                    />
                  </div>
                )
              })}
            </div>
          </div>

          <div className="flex items-center gap-4 pt-2">
            {[
              { label: 'win margin', className: 'donut-color-windows' },
              { label: 'win margin', className: 'donut-color-macos' }
            ].map((legend, idx) => (
              <div key={`${legend.label}-${idx}`} className="flex items-center gap-2">
                <span className={`donut-chart__dot ${legend.className}`} aria-hidden="true" />
                <span className="kol-mono-xs text-fg-64">{legend.label}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-2">
            {[1, 2].map((i) => (
              <div key={i} className="flex justify-between items-center">
                <span className="kol-mono-xs text-fg-80">{i}. All recorded games</span>
                <span className="kol-mono-xs text-fg-88">675</span>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-fg-08">
            <span className="kol-mono-xs text-fg-60">Counts represent head-to-head games</span>
          </div>
        </div>
      </div>

      {/* Scatter Plot Card */}
      <div className="flex flex-col gap-6">
        <DesCard
          name="Scatter Plot Ledger Card"
          description="Scatter plot comparing win margin vs time, with full XY grid, axes, and captions."
        />
        <div className="flex flex-col gap-4 p-6 bg-fg-02 border border-fg-08 rounded h-full min-h-[520px]">
          <div className="flex flex-col gap-1">
            <span className="kol-heading-sm">OVERALL LEDGER</span>
            <span className="kol-mono-xs text-fg-60">All recorded games</span>
          </div>

          <div className="relative flex-1 bg-fg-02 border border-fg-04 rounded overflow-hidden px-4 pt-4 pb-10">
            <div className="absolute left-4 right-4 top-4 bottom-16">
              {[0, 1000, 2000].map((yValue) => (
                <div key={yValue} className="absolute left-0 right-0" style={{ bottom: `${(yValue / scatterMaxY) * 100}%` }}>
                  <div className="flex items-center gap-2">
                    <span className="kol-mono-xs text-fg-64 w-10 text-right">{yValue === 0 ? '0' : `${Math.round(yValue / 1000)}K`}</span>
                    <div className="flex-1 border-t border-fg-16 opacity-60" />
                  </div>
                </div>
              ))}

              {[40, 80, 120, 160].map((xValue) => (
                <div key={xValue} className="absolute top-0 bottom-0" style={{ left: `${(xValue / scatterMaxX) * 100}%` }}>
                  <div className="relative h-full">
                    <div className="absolute inset-y-0 left-0 border-l border-fg-12 opacity-40" />
                    <span className="absolute -bottom-8 -translate-x-1/2 kol-mono-xs text-fg-64">{xValue}</span>
                  </div>
                </div>
              ))}

              {scatterPoints.map(point => (
                <span
                  key={point.id}
                  className="absolute block w-2 h-2 rounded-full"
                  style={{
                    background: '#4cd8e8',
                    left: `${(point.x / scatterMaxX) * 100}%`,
                    bottom: `${(point.y / scatterMaxY) * 100}%`,
                    transform: 'translate(-50%, 50%)'
                  }}
                />
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4">
            {[
              { label: 'win margin', className: 'donut-color-windows' },
              { label: 'win margin', className: 'donut-color-macos' }
            ].map((legend, idx) => (
              <div key={`${legend.label}-${idx}`} className="flex items-center gap-2">
                <span className={`donut-chart__dot ${legend.className}`} aria-hidden="true" />
                <span className="kol-mono-xs text-fg-64">{legend.label}</span>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-fg-08">
            <span className="kol-mono-xs text-fg-60">Counts represent head-to-head games</span>
          </div>
        </div>
      </div>

      {/* Design System Reference */}
      <div className="flex flex-col gap-6">
        <DesCard
          name="Design System Tokens Used"
          description="All components use consistent design tokens from the Kolkrabbi system."
        />
        <div className="flex flex-col gap-4 p-6 bg-fg-02 border border-fg-08 rounded">
          <div className="flex flex-col gap-3">
            <div>
              <span className="kol-mono-sm text-fg-88">Colors:</span>
              <ul className="kol-mono-xs text-fg-64 mt-2 space-y-1 pl-4">
                <li>• bg-fg-02 (2% foreground background)</li>
                <li>• border-fg-08 (8% foreground border)</li>
                <li>• border-fg-04 (4% subtle border)</li>
                <li>• text-fg-60, text-fg-64, text-fg-80, text-fg-88</li>
              </ul>
            </div>

            <div className="h-px bg-fg-08" />

            <div>
              <span className="kol-mono-sm text-fg-88">Typography:</span>
              <ul className="kol-mono-xs text-fg-64 mt-2 space-y-1 pl-4">
                <li>• kol-heading-sm, kol-heading-md, kol-heading-lg, kol-heading-xl</li>
                <li>• kol-mono-xxs, kol-mono-xs, kol-mono-sm</li>
              </ul>
            </div>

            <div className="h-px bg-fg-08" />

            <div>
              <span className="kol-mono-sm text-fg-88">Spacing:</span>
              <ul className="kol-mono-xs text-fg-64 mt-2 space-y-1 pl-4">
                <li>• p-6 (24px padding always)</li>
                <li>• gap-2, gap-3, gap-4, gap-6 for vertical rhythm</li>
                <li>• rounded (4px border-radius always)</li>
              </ul>
            </div>

            <div className="h-px bg-fg-08" />

            <div>
              <span className="kol-mono-sm text-fg-88">Accent Colors:</span>
              <ul className="kol-mono-xs text-fg-64 mt-2 space-y-1 pl-4">
                <li>• Yellow: #F5D245 (primary accent, meters, borders)</li>
                <li>• Purple: #9C64FD (secondary data)</li>
                <li>• Blue: #5eb3d6 (tertiary data)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      </div>

      {/* ChessBoard at bottom */}
      <div className="flex flex-col gap-6">
        <DesCard
          name="Baseline Board"
          description="Core renderer used across the chess experience. Configurable via FEN strings and size presets, this version showcases the default surface styling."
        />
        <ChessBoard />
      </div>
    </div>
  )
}

export default ChessComponents
