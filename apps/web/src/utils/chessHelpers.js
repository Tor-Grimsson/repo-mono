/**
 * Chess Data Helper Functions
 *
 * Utilities for parsing and formatting chess.com data for visualization components.
 * Used by ChessComponents.jsx to transform raw data from @kol/chess-data.
 */

/**
 * Extracts human-readable opening name from chess.com ECO URL
 *
 * @param {string} url - Full chess.com opening URL
 * @returns {string} - Formatted opening name
 *
 * @example
 * parseEcoUrl("https://www.chess.com/openings/Kings-Gambit-Declined-Queens-Knight-Defense-3.Nf3")
 * // Returns: "Kings Gambit Declined"
 */
export const parseEcoUrl = (url) => {
  if (!url || typeof url !== 'string') return 'Unknown Opening'

  try {
    // Extract the path after /openings/
    const match = url.match(/\/openings\/([^?#]+)/)
    if (!match) return 'Unknown Opening'

    let openingPath = match[1]

    // Remove move notation (anything after a number followed by a period)
    // e.g., "3.Nf3" or "4.Bc4"
    openingPath = openingPath.replace(/-\d+\.[A-Za-z0-9]+.*$/, '')

    // Replace hyphens with spaces
    openingPath = openingPath.replace(/-/g, ' ')

    // Limit to first 4 words for readability (avoid overly long names)
    const words = openingPath.split(' ')
    const displayName = words.slice(0, 4).join(' ')

    return displayName || 'Unknown Opening'
  } catch (error) {
    console.warn('Failed to parse ECO URL:', url, error)
    return 'Unknown Opening'
  }
}

/**
 * Converts time control string to total seconds
 * Handles various chess.com formats: "180", "180+2", "1/259200"
 *
 * @param {string} control - Time control string from chess.com
 * @returns {number} - Total seconds (base time + average increment)
 *
 * @example
 * parseTimeControl("180")      // Returns: 180 (3 minutes)
 * parseTimeControl("180+2")    // Returns: 182 (3min + 2sec increment)
 * parseTimeControl("1/259200") // Returns: 259200 (3 days in seconds)
 */
export const parseTimeControl = (control) => {
  if (!control || typeof control !== 'string') return 0

  try {
    // Format: "base+increment" (e.g., "180+2")
    if (control.includes('+')) {
      const [base, increment] = control.split('+').map(Number)
      // Add increment once as average contribution
      return base + increment
    }

    // Format: "moves/seconds" for daily games (e.g., "1/259200" = 1 move per 3 days)
    if (control.includes('/')) {
      const [, seconds] = control.split('/').map(Number)
      return seconds || 0
    }

    // Format: simple seconds (e.g., "180")
    const parsed = Number(control)
    return isNaN(parsed) ? 0 : parsed
  } catch (error) {
    console.warn('Failed to parse time control:', control, error)
    return 0
  }
}

/**
 * Formats termination category key to human-readable label
 *
 * @param {string} key - Termination category from data (e.g., "win-resignation")
 * @returns {string} - Formatted label (e.g., "Win by Resignation")
 *
 * @example
 * formatTermination("win-resignation")  // Returns: "Win by Resignation"
 * formatTermination("loss-checkmate")   // Returns: "Loss by Checkmate"
 * formatTermination("draw-stalemate")   // Returns: "Draw by Stalemate"
 */
export const formatTermination = (key) => {
  if (!key || typeof key !== 'string') return 'Unknown'

  try {
    const [result, reason] = key.split('-')

    // Capitalize first letter of each word
    const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1)

    const formattedResult = capitalize(result)
    const formattedReason = capitalize(reason)

    return `${formattedResult} by ${formattedReason}`
  } catch (error) {
    console.warn('Failed to format termination:', key, error)
    return 'Unknown'
  }
}

/**
 * Formats YYYY-MM month string to readable label
 *
 * @param {string} month - Month string in YYYY-MM format
 * @returns {string} - Formatted month label (e.g., "Jan 2025")
 *
 * @example
 * formatMonthLabel("2025-01") // Returns: "Jan 2025"
 * formatMonthLabel("2024-12") // Returns: "Dec 2024"
 */
export const formatMonthLabel = (month) => {
  if (!month || typeof month !== 'string') return 'Unknown'

  try {
    const [year, monthNum] = month.split('-')
    const monthIndex = parseInt(monthNum, 10) - 1

    const monthNames = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ]

    const monthName = monthNames[monthIndex]

    if (!monthName) return month // Fallback to original if invalid

    return `${monthName} ${year}`
  } catch (error) {
    console.warn('Failed to format month label:', month, error)
    return month
  }
}

/**
 * Formats a compact number with K/M suffix
 * (Already exists in ChessComponents.jsx, duplicated here for completeness)
 *
 * @param {number} value - Number to format
 * @returns {string} - Formatted string (e.g., "1.2K", "2.5M")
 */
export const formatCompactNumber = (value) => {
  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(1).replace(/\.0$/, '')}M`
  }
  if (value >= 1000) {
    const formatted = (value / 1000).toFixed(value >= 10000 ? 0 : 1)
    return `${formatted.replace(/\.0$/, '')}K`
  }
  return value.toLocaleString()
}

/**
 * Formats a percentage value with consistent decimal places
 * (Already exists in ChessComponents.jsx, duplicated here for completeness)
 *
 * @param {number} value - Percentage value (0-100)
 * @returns {string} - Formatted percentage string
 */
export const formatPercent = (value) => {
  if (!Number.isFinite(value)) return '0'
  const formatted = value >= 10 ? value.toFixed(0) : value.toFixed(1)
  return formatted.replace(/\.0$/, '')
}

/**
 * Calculates win rate for specific opening in a given month
 * Requires filtering gameMeta by month and ECO URL
 *
 * @param {Object} month - Monthly summary object
 * @param {string} ecoUrl - ECO opening URL to filter by
 * @param {Array} gameMeta - Full game metadata array
 * @returns {number} - Win rate as percentage (0-100)
 */
export const calculateWinRateForEco = (month, ecoUrl, gameMeta) => {
  if (!month || !ecoUrl || !gameMeta) return 0

  try {
    // Filter games for this month and opening
    const relevantGames = gameMeta.filter(
      game => game.month === month.month && game.eco === ecoUrl
    )

    if (relevantGames.length === 0) return 0

    const wins = relevantGames.filter(game => game.playerResult === 'win').length

    return (wins / relevantGames.length) * 100
  } catch (error) {
    console.warn('Failed to calculate win rate for ECO:', ecoUrl, error)
    return 0
  }
}

/**
 * Gets time class label with proper capitalization
 *
 * @param {string} timeClass - Time class key ("blitz", "bullet", "rapid", "daily")
 * @returns {string} - Formatted label ("Blitz", "Bullet", "Rapid", "Daily")
 */
export const formatTimeClass = (timeClass) => {
  if (!timeClass || typeof timeClass !== 'string') return 'Unknown'
  return timeClass.charAt(0).toUpperCase() + timeClass.slice(1)
}

/**
 * Converts time control seconds to human-readable format
 *
 * @param {number} seconds - Time in seconds
 * @returns {string} - Formatted time (e.g., "3min", "5min", "10min")
 */
export const formatTimeControlDisplay = (seconds) => {
  if (!seconds || seconds <= 0) return '0s'

  // For daily games (very large numbers)
  if (seconds >= 86400) {
    const days = Math.floor(seconds / 86400)
    return `${days}d`
  }

  // For rapid/blitz/bullet
  if (seconds >= 60) {
    const minutes = Math.floor(seconds / 60)
    return `${minutes}min`
  }

  return `${seconds}s`
}
