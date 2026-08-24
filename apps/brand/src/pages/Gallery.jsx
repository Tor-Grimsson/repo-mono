import { useEffect, useState } from 'react'
import usePageTitle from '../components/hooks/usePageTitle'

/* Local-images gallery — serves public/images/<group>/ via photoIndexPlugin's
 * /__photos.json (dev middleware; the committed public/__photos.json covers
 * builds). This is a DIFFERENT surface from /library: Library browses the
 * kol-media bucket, this walls the repo's own local photo groups. */
export default function Gallery() {
  usePageTitle('Gallery')
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const [focused, setFocused] = useState(null)

  useEffect(() => {
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

  const shell = 'min-h-screen bg-surface-tertiary'

  if (error) {
    return (
      <div className={`${shell} p-6 kol-mono-12 text-fg-64`}>
        Gallery unavailable: {String(error)}. Is the dev server running and the{' '}
        <code>photoIndexPlugin</code> registered in <code>vite.config.js</code>?
      </div>
    )
  }

  if (!data) {
    return <div className={`${shell} p-6 kol-mono-12 text-fg-64`}>Loading…</div>
  }

  if (!data.groups.length) {
    return (
      <div className={`${shell} p-6 kol-mono-12 text-fg-64`}>
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
    <div className={shell}>
      <header className="sticky top-0 z-10 flex items-baseline gap-5 flex-wrap px-5 py-3 bg-surface-tertiary border-b border-fg-12">
        {/* Casing authored here, not forced by CSS (no-auto-casing law). */}
        <strong className="kol-helper-12 tracking-wider text-fg-88">GALLERY</strong>
        <span className="kol-helper-10 text-fg-48">
          {total} {total === 1 ? 'image' : 'images'} · {data.groups.length}{' '}
          {data.groups.length === 1 ? 'group' : 'groups'}
        </span>
        <nav className="flex gap-3.5 flex-wrap ml-auto">
          {data.groups.map(g => (
            <a
              key={g.name}
              href={`#${encodeURIComponent(g.name)}`}
              className="kol-helper-12 no-underline text-fg-64 hover:text-fg-88"
            >
              {g.name} <span className="text-fg-32">{g.count}</span>
            </a>
          ))}
        </nav>
      </header>

      {data.groups.map(g => (
        <section key={g.name} id={g.name} className="px-4 py-6">
          {/* No text-transform: the group name is data (a folder name) and
            * renders in the case it was authored on disk. */}
          <h2 className="kol-helper-12 tracking-widest mb-2.5 pl-1 text-fg-48">
            {g.name} <span className="text-fg-32">· {g.count}</span>
          </h2>
          <div className="grid gap-0.5 grid-flow-dense [grid-template-columns:repeat(auto-fill,minmax(160px,1fr))]">
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
                  className={`block aspect-square overflow-hidden transition-colors duration-100 ${
                    isFocused
                      ? 'col-span-3 row-span-3 cursor-zoom-out bg-surface-tertiary'
                      : 'cursor-zoom-in bg-fg-08'
                  }`}
                >
                  <img
                    src={src}
                    loading="lazy"
                    alt=""
                    className={`w-full h-full block object-top ${isFocused ? 'object-contain' : 'object-cover'}`}
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
