import { useCallback, useEffect, useMemo, useState } from 'react'
import { Dropdown, Input, Table, Tag } from '@kol/ui'
import {
  getGameMeta,
  getMonthlySummary,
  getGamePgnByIdAsync
} from '@kol/chess-data'

const MAX_VISIBLE_GAMES = 5

const GameArchiveTable = ({ onGameLoad }) => {
  console.log('[GameArchiveTable] Component rendering. onGameLoad defined?', typeof onGameLoad)

  const monthFormatter = useMemo(
    () =>
      new Intl.DateTimeFormat('en', {
        month: 'short',
        year: 'numeric'
      }),
    []
  )

  const games = useMemo(() => getGameMeta(), [])
  const monthlySummary = useMemo(() => getMonthlySummary(), [])

  const monthOptions = useMemo(() => {
    const formatted = (monthlySummary || [])
      .filter((entry) => entry?.month && entry.month !== 'unknown')
      .map((entry) => ({
        label: monthFormatter.format(new Date(`${entry.month}-01T00:00:00Z`)),
        value: entry.month
      }))
      .reverse()
    return [
      { label: 'All Months', value: 'all' },
      ...formatted
    ]
  }, [monthlySummary, monthFormatter])

  const timeClassOptions = useMemo(() => {
    const unique = Array.from(
      new Set((games || []).map((game) => game.timeClass).filter(Boolean))
    )
    return [
      { label: 'All Time Classes', value: 'all' },
      ...unique.map((timeClass) => ({
        label: timeClass.charAt(0).toUpperCase() + timeClass.slice(1),
        value: timeClass
      }))
    ]
  }, [games])

  const resultOptions = useMemo(() => {
    const unique = Array.from(
      new Set((games || []).map((game) => game.playerResult).filter(Boolean))
    )
    return [
      { label: 'All Results', value: 'all' },
      ...unique.map((result) => ({
        label: result.charAt(0).toUpperCase() + result.slice(1),
        value: result
      }))
    ]
  }, [games])

  const [selectedMonth, setSelectedMonth] = useState(() => monthOptions[1]?.value ?? 'all')
  const [selectedTimeClass, setSelectedTimeClass] = useState('all')
  const [selectedResult, setSelectedResult] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [showAllGames, setShowAllGames] = useState(false)

  useEffect(() => {
    const defaultMonth = monthOptions[1]?.value ?? 'all'
    setSelectedMonth(defaultMonth)
  }, [monthOptions])

  useEffect(() => {
    setShowAllGames(false)
  }, [selectedMonth, selectedTimeClass, selectedResult, searchTerm])

  const filteredGames = useMemo(() => {
    if (!games) return []

    const term = searchTerm.trim().toLowerCase()

    return games
      .filter((game) => {
        if (selectedMonth !== 'all' && game.month !== selectedMonth) return false
        if (selectedTimeClass !== 'all' && game.timeClass !== selectedTimeClass) return false
        if (selectedResult !== 'all' && game.playerResult !== selectedResult) return false

        if (!term) return true

        const haystack = [
          game.player?.username,
          game.opponent?.username,
          game.timeControl,
          game.eco
        ]
          .filter(Boolean)
          .join(' ')
          .toLowerCase()

        return haystack.includes(term)
      })
      .sort(
        (a, b) => (b.endTime ?? 0) - (a.endTime ?? 0)
      )
  }, [games, selectedMonth, selectedTimeClass, selectedResult, searchTerm])

  const tableRows = useMemo(() => {
    if (showAllGames || filteredGames.length <= MAX_VISIBLE_GAMES) {
      return filteredGames
    }
    return filteredGames.slice(0, MAX_VISIBLE_GAMES)
  }, [filteredGames, showAllGames])

  const canShowAll = filteredGames.length > MAX_VISIBLE_GAMES

  const monthLabel = useMemo(() => {
    if (selectedMonth === 'all') return 'All games'
    try {
      return monthFormatter.format(new Date(`${selectedMonth}-01T00:00:00Z`))
    } catch {
      return selectedMonth
    }
  }, [monthFormatter, selectedMonth])

  const formatDate = useCallback((timestamp) => {
    if (!timestamp) return '—'
    const date = new Date(timestamp * 1000)
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }, [])

  const formatTime = useCallback((timestamp) => {
    if (!timestamp) return ''
    const date = new Date(timestamp * 1000)
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    })
  }, [])

  const formatResult = useCallback((result) => {
    if (!result) return 'Pending'
    switch (result) {
      case 'win':
        return 'Win'
      case 'draw':
        return 'Draw'
      case 'stalemate':
        return 'Stalemate'
      case 'resigned':
        return 'Resigned'
      default:
        return result.charAt(0).toUpperCase() + result.slice(1)
    }
  }, [])

  const handleLoadGame = useCallback(async (game) => {
    console.log('[GameArchiveTable] handleLoadGame called with game:', game.id)
    const pgn = await getGamePgnByIdAsync(game.id)
    console.log('[GameArchiveTable] Retrieved PGN:', pgn ? `${pgn.length} chars` : 'NULL')
    if (!pgn) {
      console.error('[GameArchiveTable] No PGN found for game:', game.id)
      return
    }
    const loadedGame = {
      ...game,
      pgn
    }
    console.log('[GameArchiveTable] Loading game:', loadedGame.id, 'Has PGN?', !!loadedGame.pgn)
    if (onGameLoad) {
      console.log('[GameArchiveTable] Calling onGameLoad callback')
      onGameLoad(loadedGame)
    } else {
      console.error('[GameArchiveTable] onGameLoad callback is not defined!')
    }
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [onGameLoad])

  const columns = useMemo(
    () => [
      {
        header: 'Date',
        accessor: 'date',
        className: 'dt-cell-text analysis-table__cell',
        render: (game) => (
          <div className="flex items-center gap-3">
            <span>{formatDate(game.endTime)}</span>
            {game.endTime ? (
              <span className="dataTableToken bg-fg-08 hidden md:inline-flex">{formatTime(game.endTime)}</span>
            ) : null}
          </div>
        )
      },
      {
        header: 'Opponent',
        accessor: 'opponent',
        className: 'dt-cell-text analysis-table__cell',
        render: (game) => <span>{game.opponent?.username ?? 'Opponent'}</span>
      },
      {
        header: 'Result',
        accessor: 'result',
        className: 'dt-cell-text analysis-table__cell',
        render: (game) => {
          const label = game.terminationCategory
            ? game.terminationCategory.replace('win-', 'win by ').replace(/-/g, ' ')
            : formatResult(game.playerResult)
          return <span className="dataTableToken bg-fg-08">{label}</span>
        }
      },
      {
        header: 'Color',
        accessor: 'color',
        className: 'dt-cell-text analysis-table__cell hidden lg:table-cell',
        headerClassName: 'dt-cell-title hidden lg:table-cell',
        render: (game) => (
          <span
            className={`dataTablePill ${
              game.playerColor === 'white' ? 'dataTablePill-light' : 'dataTablePill-dark'
            }`}
          >
            {game.playerColor === 'white' ? 'White' : 'Black'}
          </span>
        )
      },
      {
        header: 'Time Control',
        accessor: 'timeControl',
        className: 'dt-cell-text analysis-table__cell hidden md:table-cell',
        headerClassName: 'dt-cell-title hidden md:table-cell',
        render: (game) => {
          const label = game.timeClass
            ? game.timeClass.charAt(0).toUpperCase() + game.timeClass.slice(1)
            : '—'
          return <span>{label}</span>
        }
      },
      {
        header: 'Rating',
        accessor: 'ratings',
        className: 'dt-cell-text analysis-table__cell hidden lg:table-cell',
        headerClassName: 'dt-cell-title hidden lg:table-cell',
        render: (game) => (
          <div className="flex items-center gap-3">
            <span className="dataTablePill dataTablePill-dark">
              {game.player?.rating ?? '—'}
            </span>
            <span>{game.opponent?.rating ?? '—'}</span>
          </div>
        )
      },
      {
        header: 'Link',
        accessor: 'url',
        className: 'dt-cell-text analysis-table__actions-cell',
        headerClassName: 'dt-cell-title analysis-table__actions-header',
        render: (game) => {
          console.log('[GameArchiveTable] Rendering button for game:', game.id)
          return (
            <div className="analysis-table__actions">
              <button
                type="button"
                className="analysis-table__link analysis-table__link-button"
                onClick={(e) => {
                  console.log('[GameArchiveTable] BUTTON CLICKED!', game.id)
                  e.preventDefault()
                  e.stopPropagation()
                  handleLoadGame(game)
                }}
              >
                <span className="hidden sm:inline">Load here</span>
                <span className="inline sm:hidden">Load</span>
              </button>
              {game.url ? (
                <a
                  href={game.url}
                  className="analysis-table__link"
                  target="_blank"
                  rel="noreferrer"
                >
                  Chess.com →
                </a>
              ) : (
                <span className="analysis-table__meta">No link</span>
              )}
            </div>
          )
        }
      }
    ],
    [formatDate, formatTime, formatResult, handleLoadGame]
  )

  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h3 className="kol-heading-subsection">Game Archive</h3>
          <Tag>
            {`${tableRows.length} shown · ${filteredGames.length.toLocaleString()} total`}
          </Tag>
        </div>
        <p className="kol-body-text text-auto/70 leading-relaxed">
          Filter {monthLabel} by time class, result, or opponent to locate the
          next study candidate. Use search to match usernames, ECO codes, or time controls.
        </p>
      </div>

      <div className="flex flex-col gap-4 md:gap-0 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col sm:flex-row gap-3 flex-wrap">
          <Dropdown
            options={monthOptions}
            value={selectedMonth}
            onChange={setSelectedMonth}
            className="analysis-control w-full sm:w-auto"
          />
          <Dropdown
            options={timeClassOptions}
            value={selectedTimeClass}
            onChange={setSelectedTimeClass}
            className="analysis-control w-full sm:w-auto"
          />
          <Dropdown
            options={resultOptions}
            value={selectedResult}
            onChange={setSelectedResult}
            className="analysis-control w-full sm:w-auto"
          />
        </div>
        <div className="w-full md:w-auto md:min-w-[280px]">
          <Input
            placeholder="Search opponent, ECO, or control…"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            iconLeft="search-16"
          />
        </div>
      </div>

      <div className="analysis-table-wrapper">
        {tableRows.length === 0 ? (
          <div className="analysis-table-empty">
            <p className="kol-body-text text-auto/70">
              No games match the current filters. Try expanding your search criteria.
            </p>
          </div>
        ) : (
          <Table
            caption="Archive of chess games matching current filters"
            columns={columns}
            rows={tableRows}
          />
        )}

        {canShowAll ? (
          <button
            type="button"
            className="analysis-table__toggle"
            onClick={() => setShowAllGames((value) => !value)}
          >
            {showAllGames
              ? 'Show fewer games'
              : `Show all ${filteredGames.length.toLocaleString()} games`}
          </button>
        ) : null}
      </div>
    </section>
  )
}

export default GameArchiveTable
