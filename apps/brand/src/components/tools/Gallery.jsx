import { useEffect, useState } from 'react'

export default function Gallery() {
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const [focused, setFocused] = useState(null)

  useEffect(() => {
    document.title = 'Gallery'
    fetch('/__photos.json')
      .then(r => (r.ok ? r.json() : Promise.reject(r.statusText)))
      .then(setData)
      .catch(setError)
  }, [])

  useEffect(() => {
    const onKey = e => { if (e.key === 'Escape') setFocused(null) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  /* Fixed-dark viewer: a photo wall reads against black in BOTH themes, so
   * this uses the theme-INDEPENDENT absolute tier, not surface-inverse (which
   * flips with the theme and would turn the wall white in dark mode).
   * Dim stops are color-mixed against absolute-white — the DS ships no
   * fixed-white opacity ladder (fg-absolute-* is black-based). */
  const INK = 'var(--kol-color-absolute-white)'
  const dim = (pct) => `color-mix(in srgb, ${INK} ${pct}%, transparent)`

  const shell = {
    minHeight: '100vh',
    background: 'var(--kol-color-absolute-black)',
    color: dim(80),
    fontFamily: 'var(--kol-font-family-mono)',
  }

  if (error) {
    return (
      <div style={{ ...shell, padding: 24 }}>
        Gallery unavailable: {String(error)}. Is the dev server running and the{' '}
        <code>photoIndexPlugin</code> registered in <code>vite.config.js</code>?
      </div>
    )
  }

  if (!data) return <div style={{ ...shell, padding: 24 }}>Loading…</div>

  if (!data.groups.length) {
    return (
      <div style={{ ...shell, padding: 24 }}>
        No photos found. Drop folders into <code>public/images/&lt;group&gt;/</code> and reload.
      </div>
    )
  }

  const total = data.groups.reduce((n, g) => n + g.count, 0)

  const onThumbClick = src => e => {
    // let cmd/ctrl/shift/middle-click open in new tab as before
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return
    e.preventDefault()
    setFocused(prev => (prev === src ? null : src))
  }

  return (
    <div style={shell}>
      <header
        style={{
          position: 'sticky',
          top: 0,
          background: 'color-mix(in srgb, var(--kol-color-absolute-black) 92%, transparent)',
          backdropFilter: 'blur(8px)',
          borderBottom: `1px solid ${dim(12)}`,
          padding: '12px 20px',
          zIndex: 10,
          display: 'flex',
          alignItems: 'baseline',
          gap: 20,
          flexWrap: 'wrap',
        }}
      >
        {/* Casing authored here, not forced by CSS (no-auto-casing law). */}
        <strong style={{ fontSize: 14, letterSpacing: 0.5 }}>
          GALLERY
        </strong>
        <span style={{ fontSize: 12, opacity: 0.5 }}>
          {total} {total === 1 ? 'image' : 'images'} · {data.groups.length}{' '}
          {data.groups.length === 1 ? 'group' : 'groups'}
        </span>
        <nav style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginLeft: 'auto' }}>
          {data.groups.map(g => (
            <a
              key={g.name}
              href={`#${encodeURIComponent(g.name)}`}
              style={{ color: dim(64), textDecoration: 'none', fontSize: 13 }}
            >
              {g.name} <span style={{ opacity: 0.5 }}>{g.count}</span>
            </a>
          ))}
        </nav>
      </header>

      {data.groups.map(g => (
        <section key={g.name} id={g.name} style={{ padding: '24px 16px' }}>
          {/* No text-transform: the group name is data (a folder name) and
            * renders in the case it was authored on disk. */}
          <h2
            style={{
              fontSize: 12,
              letterSpacing: 1.2,
              opacity: 0.55,
              margin: '0 0 10px',
              paddingLeft: 4,
            }}
          >
            {g.name} <span style={{ opacity: 0.55 }}>· {g.count}</span>
          </h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
              gap: 2,
              gridAutoFlow: 'dense',
            }}
          >
            {g.files.map(src => {
              const isFocused = focused === src
              return (
                <a
                  key={src}
                  href={src}
                  target="_blank"
                  rel="noreferrer"
                  title={src.split('/').pop()}
                  onClick={onThumbClick(src)}
                  style={{
                    display: 'block',
                    aspectRatio: '1',
                    overflow: 'hidden',
                    background: isFocused ? 'var(--kol-color-absolute-black)' : dim(8),
                    gridColumn: isFocused ? 'span 3' : 'auto',
                    gridRow: isFocused ? 'span 3' : 'auto',
                    cursor: isFocused ? 'zoom-out' : 'zoom-in',
                    transition: 'background 120ms ease',
                  }}
                >
                  <img
                    src={src}
                    loading="lazy"
                    alt=""
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: isFocused ? 'contain' : 'cover',
                      objectPosition: 'center top',
                      display: 'block',
                    }}
                  />
                </a>
              )
            })}
          </div>
        </section>
      ))}
    </div>
  )
}
