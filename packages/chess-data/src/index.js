import { manifest, monthlySummary, gameMeta, sampleGames } from '../generated/index.js'

export const getManifest = () => manifest

export const getMonthlySummary = () => monthlySummary

export const getGameMeta = () => gameMeta

export const getSampleGames = () => sampleGames

export const findGamesByMonth = (month) =>
  gameMeta.filter((game) => game.month === month)

export const findGameById = (id) => gameMeta.find((game) => game.id === id)
export const getGameMonthById = (id) => findGameById(id)?.month ?? null

export const getGamePgnById = (id) => {
  const sampleMatch = sampleGames.find((game) => game.id === id && Boolean(game?.pgn))
  if (sampleMatch) return sampleMatch.pgn
  const metaMatch = gameMeta.find((game) => game.id === id && Boolean(game?.pgn))
  return metaMatch?.pgn ?? null
}

// Load PGN data for a specific month dynamically
export const loadMonthlyPgn = async (month) => {
  try {
    const data = await import(`../generated/pgn/by-month/${month}.json`)
    return data.default || data
  } catch (err) {
    console.warn(`[chess-data] Failed to load PGN data for month: ${month}`, err)
    return null
  }
}

// Get PGN for a game by loading the monthly file
export const getGamePgnByIdAsync = async (id) => {
  // First check sampleGames (fast, synchronous)
  const sampleMatch = sampleGames.find((game) => game.id === id && Boolean(game?.pgn))
  if (sampleMatch) return sampleMatch.pgn

  // Get the month for this game
  const month = getGameMonthById(id)
  if (!month) return null

  // Load the monthly PGN file
  const monthlyData = await loadMonthlyPgn(month)
  if (!monthlyData) return null

  // Return the PGN for this specific game
  return monthlyData[id] ?? null
}
