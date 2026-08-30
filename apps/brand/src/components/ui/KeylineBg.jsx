/**
 * KeylineBg — the icon gallery's keyline guide: Material-style
 * paint-by-numbers on the 24×24 grid (dashed diagonals + three keyline
 * rounded-rects + centre circle), yellow on a dark ground, magenta on a light
 * one. Absolutely fills whatever box it is drawn in, so it scales with the
 * glyph it sits behind.
 */
export default function KeylineBg({ bgLight }) {
  const diag = '#0A8DA4'
  const key  = bgLight ? '#CA3ABC' : '#F2D24B'
  return (
    <svg
      width="100%" height="100%" viewBox="0 0 24 24"
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
    >
      <g stroke={diag} strokeWidth="0.1" strokeDasharray="0.4 0.6" opacity="1" fill="none">
        <path d="M0 0 L24 24" />
        <path d="M24 0 L0 24" />
      </g>
      <g stroke={key} strokeWidth="0.1" strokeDasharray="0.4 0.6" opacity="1" fill="none">
        <rect x="4" y="2" width="16" height="20" rx="1" />
        <rect x="3" y="3" width="18" height="18" rx="1" />
        <rect x="2" y="4" width="20" height="16" rx="1" />
        <circle cx="12" cy="12" r="4" />
      </g>
    </svg>
  )
}
