import { useEffect, useState } from 'react'
import PageSection from '../components/framework/PageSection'
import usePageTitle from '../components/hooks/usePageTitle'
import Input from '../components/atoms/Input'
import Button from '../components/atoms/Button'
import Icon from '../components/loaders/icons/Icon'

const ADMIN_BASE  = 'https://admin.kolkrabbi.io'
const PUBLIC_BASE = 'https://media.kolkrabbi.io'

const publicUrl = (key) => `${PUBLIC_BASE}/${key}`

const formatSize = (bytes) => {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  if (bytes < 1024 * 1024 * 1024) return `${(bytes / 1024 / 1024).toFixed(1)} MB`
  return `${(bytes / 1024 / 1024 / 1024).toFixed(2)} GB`
}

const isImage = (ct) => ct?.startsWith('image/')
const isVideo = (ct) => ct?.startsWith('video/')

export default function Library() {
  usePageTitle('Library')

  const [prefix,    setPrefix]    = useState('')
  const [objects,   setObjects]   = useState([])
  const [loading,   setLoading]   = useState(true)
  const [error,     setError]     = useState(null)
  const [copiedKey, setCopiedKey] = useState(null)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError(null)
    const params = new URLSearchParams()
    if (prefix) params.set('prefix', prefix)
    fetch(`${ADMIN_BASE}/api/list?${params}`)
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(`HTTP ${r.status}`))))
      .then((d) => { if (!cancelled) setObjects(d.objects || []) })
      .catch((e) => { if (!cancelled) setError(e.message) })
      .finally(() => { if (!cancelled) setLoading(false) })
    return () => { cancelled = true }
  }, [prefix])

  const handleCopy = async (key) => {
    await navigator.clipboard.writeText(publicUrl(key))
    setCopiedKey(key)
    setTimeout(() => setCopiedKey((k) => (k === key ? null : k)), 1500)
  }

  const totalBytes = objects.reduce((sum, o) => sum + (o.size || 0), 0)

  return (
    <div className="bg-fg-08 min-h-screen">
      <PageSection
        id="library"
        label="Library"
        title="kol-media bucket"
        body="Read-only browse of the kol-media R2 bucket. Click an image to copy its public URL — paste into any kolkrabbi component, hero, or generator. Uploads, renames, and deletes happen on the admin."
      >
        <header className="mt-6 flex items-center gap-3 flex-wrap">
          <Button
            variant="secondary"
            size="sm"
            href="https://admin.kolkrabbi.io"
            iconRight="external-link"
            iconSize={14}
            target="_blank"
            rel="noreferrer"
          >
            Open admin
          </Button>
          <span className="kol-mono-12 text-fg-48">
            {loading ? 'Loading…' : `${objects.length} ${objects.length === 1 ? 'file' : 'files'} · ${formatSize(totalBytes)}`}
          </span>
        </header>

        <section className="mt-6 flex flex-col gap-2 max-w-md">
          <label className="kol-mono-12 text-fg-64">Folder prefix (optional)</label>
          <Input
            value={prefix}
            onChange={(e) => setPrefix(e.target.value)}
            placeholder="e.g. photoshoot/"
            width="100%"
          />
        </section>

        {error ? (
          <p className="kol-mono-12 text-ui-error mt-6">Error: {error}</p>
        ) : objects.length === 0 && !loading ? (
          <p className="kol-mono-12 text-fg-48 mt-6">
            No files{prefix ? ` under "${prefix}"` : ''} yet.
          </p>
        ) : (
          <ul className="mt-6 grid gap-3 grid-cols-[repeat(auto-fill,minmax(180px,1fr))]">
            {objects.map((o) => (
              <li
                key={o.key}
                className="flex flex-col rounded overflow-hidden border bg-fg-02 cursor-pointer group"
                style={{ borderColor: 'var(--kol-fg-12)' }}
                onClick={() => handleCopy(o.key)}
                title="Click to copy public URL"
              >
                <div className="aspect-square flex items-center justify-center bg-fg-04 overflow-hidden relative">
                  {isImage(o.contentType) ? (
                    <img
                      src={publicUrl(o.key)}
                      alt=""
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  ) : isVideo(o.contentType) ? (
                    <video
                      src={publicUrl(o.key)}
                      className="w-full h-full object-cover"
                      muted
                      preload="metadata"
                    />
                  ) : (
                    <span className="kol-mono-12 text-fg-48">
                      {o.contentType?.split('/')[0] || 'file'}
                    </span>
                  )}
                  {copiedKey === o.key && (
                    <div
                      className="absolute inset-0 flex items-center justify-center"
                      style={{ background: 'var(--kol-fg-absolute-48, rgba(0,0,0,0.5))' }}
                    >
                      <span className="kol-mono-14 text-fg-default">Copied</span>
                    </div>
                  )}
                </div>
                <div className="p-2 flex flex-col gap-1">
                  <p className="kol-mono-12 text-fg-default truncate" title={o.key}>{o.key}</p>
                  <p className="kol-mono-12 text-fg-48">{formatSize(o.size)}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </PageSection>
    </div>
  )
}
