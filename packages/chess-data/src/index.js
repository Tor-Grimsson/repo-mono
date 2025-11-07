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
