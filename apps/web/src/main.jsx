import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

/* DEV ONLY: bright-red favicon so dev tabs read at a glance (user order
 * 2026-08-12). Fetches the real mark and recolors its square — the glyph
 * stays. import.meta.env.DEV is compile-time, so none of this ships. */
if (import.meta.env.DEV) {
  fetch('/favicons/favicon.svg')
    .then((r) => r.text())
    .then((svg) => {
      const link = document.querySelector('link[rel="icon"]')
      if (!link) return
      /* dev palette (user 2026-08-12): dark square, red glyph */
      link.href = `data:image/svg+xml,${encodeURIComponent(
        svg.replaceAll('#FAFAFA', '#FF0000')
      )}`
    })
    .catch(() => {})
}

createRoot(document.getElementById('root')).render(<App />)
