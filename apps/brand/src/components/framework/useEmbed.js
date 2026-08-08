import { useLocation } from 'react-router-dom'

/**
 * useEmbed — the ONE embed flag, ported from kol-ds-ui's showcase
 * (showcase/src/lib/useEmbed.js). `?embed=1` on any brand URL renders the
 * page's MAIN CONTENT ONLY: no SideNav, no drawer chrome. For iframing brand
 * pages into other repos (the website's /workshop/brand/* pages).
 *
 * LATCHED per document: once a document boots embedded it stays embedded, so
 * following an in-frame link can't pop the host's chrome into the iframe
 * mid-session. A fresh document (new URL, no flag) is un-embedded again —
 * the latch is module scope, not storage.
 */

let latched = false

export default function useEmbed() {
  const { search } = useLocation()
  if (!latched) {
    const raw = new URLSearchParams(search).get('embed')
    latched = raw !== null && raw !== '0' && raw !== 'false'
  }
  return latched
}
