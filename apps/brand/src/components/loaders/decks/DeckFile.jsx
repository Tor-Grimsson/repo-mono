import { useRef, useState } from 'react'
import { Button, FullscreenOverlay, LabeledControlSection } from '@kolkrabbi/kol-component'
import { slideToPngBlob, deckToPdfBlob } from './slideExport'
import { saveDeck, loadDeck } from './deckStore'

/**
 * DeckFile — save, load, import and export behind one modal.
 *
 * Replaces the bare PNG button (user 2026-09-03: *"what is this? export to png?
 * that is not good, we rather have export import save load modal setup"*). A
 * download button sitting in a toolbar implies export is the only file
 * operation a deck has, which was exactly the problem.
 *
 * WHAT IS HERE AND WHY:
 *   Export PNG (this slide / every slide) — the raster path, already built.
 *   Export deck (.json)                   — the document, losslessly.
 *   Import deck (.json)                   — the same, back in.
 *
 * THREE TIERS, not competing. localStorage is the AUTOSAVE (every keystroke,
 * one browser). The deck FILE is the portable copy — offline, versionable, no
 * account. The DATABASE (Cloudflare D1, since 2026-09-04) is the shared copy
 * that survives the machine. The database is deliberately not the autosave
 * target: that would spend a 100k/day write budget on keystrokes and need a
 * credential held open all session.
 *
 * PDF is here as of 2026-09-04, on the user's ruling. It was the one thing that
 * existed nowhere in the estate (kol-fxr confirmed), so it cost a dependency:
 * `pdf-lib`, dynamically imported so a deck that never exports one does not pay
 * for it. Pages are the slide's native size and each is the rasterised slide,
 * because the SVG path already solves fonts by embedding them.
 *
 * Every slide export is SEQUENTIAL, not `Promise.all`: each one rasterises a
 * full 3840x2160 canvas, and firing fourteen at once spikes memory for no gain
 * on what is a one-off action.
 */
const stamp = () => new Date().toISOString().slice(0, 10)

function saveBlob(blob, filename) {
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}

export default function DeckFile({ open, onClose, slug, slides = [], active = 0, onImport }) {
  const [busy, setBusy] = useState(null)
  const [error, setError] = useState(null)
  const [progress, setProgress] = useState(null)
  const fileRef = useRef(null)

  const run = async (key, fn) => {
    setBusy(key); setError(null)
    try { await fn() } catch (err) { setError(err.message || String(err)) } finally { setBusy(null) }
  }

  const exportOne = () => run('one', async () => {
    const blob = await slideToPngBlob(slides[active].doc, 2)
    saveBlob(blob, `${slug}-${String(active + 1).padStart(2, '0')}.png`)
  })

  const exportAll = () => run('all', async () => {
    for (let i = 0; i < slides.length; i += 1) {
      const blob = await slideToPngBlob(slides[i].doc, 2)
      saveBlob(blob, `${slug}-${String(i + 1).padStart(2, '0')}.png`)
    }
  })

  const exportPdf = () => run('pdf', async () => {
    setProgress(null)
    const blob = await deckToPdfBlob(slides, { onProgress: (i, n) => setProgress(`${i + 1}/${n}`) })
    saveBlob(blob, `${slug}-${stamp()}.pdf`)
    setProgress(null)
  })

  /* no prompt here — `adminAuth` asks once per tab and every admin call shares it */
  const saveCloud = () => run('cloudsave', async () => {
    await saveDeck({ slug, name: slug, slides })
  })

  const loadCloud = () => run('cloudload', async () => {
    const { doc } = await loadDeck(slug)
    onImport?.(doc.slides)
    onClose?.()
  })

  const exportJson = () => run('json', async () => {
    const payload = { kind: 'kol.deck', version: 1, slug, exported: new Date().toISOString(), slides }
    saveBlob(new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' }), `${slug}-${stamp()}.json`)
  })

  const importJson = (file) => run('import', async () => {
    const parsed = JSON.parse(await file.text())
    /* validate before replacing — an unchecked import silently swaps the deck
       for whatever the file happened to contain, and there is no undo across a
       reload of a draft that has already autosaved over itself */
    if (parsed?.kind !== 'kol.deck' || !Array.isArray(parsed.slides)) {
      throw new Error('Not an Kolkrabbi deck file.')
    }
    if (!parsed.slides.every((s) => s?.doc && Array.isArray(s.doc.layers))) {
      throw new Error('The file is an Kolkrabbi deck but its slides are malformed.')
    }
    onImport?.(parsed.slides)
    onClose?.()
  })

  return (
    <FullscreenOverlay open={open} onClose={onClose}>
      <div className="w-[520px] max-w-[92vw] flex flex-col gap-5 p-6">
        <p className="kol-eyebrow text-fg-80">Deck file</p>

        <LabeledControlSection label="Export">
          <div className="flex flex-wrap gap-2">
            <Button size="sm" variant="ghost" iconLeft="download" disabled={!!busy || !slides.length} onClick={exportOne}>
              {busy === 'one' ? 'Exporting…' : 'PNG, this slide'}
            </Button>
            <Button size="sm" variant="ghost" iconLeft="download" disabled={!!busy || !slides.length} onClick={exportAll}>
              {busy === 'all' ? `Exporting ${slides.length}…` : `PNG, all ${slides.length}`}
            </Button>
            <Button size="sm" variant="ghost" iconLeft="download" disabled={!!busy || !slides.length} onClick={exportPdf}>
              {busy === 'pdf' ? (progress ? `PDF ${progress}` : 'Building PDF…') : 'PDF, whole deck'}
            </Button>
            <Button size="sm" variant="ghost" iconLeft="file" disabled={!!busy} onClick={exportJson}>
              {busy === 'json' ? 'Saving…' : 'Deck file (.json)'}
            </Button>
          </div>
        </LabeledControlSection>

        <LabeledControlSection label="Cloud">
          <div className="flex items-center gap-2">
            <Button size="sm" variant="ghost" iconLeft="upload" disabled={!!busy || !slides.length} onClick={saveCloud}>
              {busy === 'cloudsave' ? 'Saving…' : 'Save to cloud'}
            </Button>
            <Button size="sm" variant="ghost" iconLeft="download" disabled={!!busy} onClick={loadCloud}>
              {busy === 'cloudload' ? 'Loading…' : 'Load from cloud'}
            </Button>
          </div>
          <span className="kol-helper-10 text-fg-48">Asks for the media admin password once per tab.</span>
        </LabeledControlSection>

        <LabeledControlSection label="Import">
          <div className="flex items-center gap-2">
            <Button size="sm" variant="ghost" iconLeft="folder" disabled={!!busy} onClick={() => fileRef.current?.click()}>
              {busy === 'import' ? 'Reading…' : 'Open deck file'}
            </Button>
            <span className="kol-helper-10 text-fg-48">Replaces the deck in this browser.</span>
          </div>
          <input
            ref={fileRef}
            type="file"
            accept="application/json,.json"
            hidden
            onChange={(e) => { const f = e.target.files?.[0]; e.target.value = ''; if (f) importJson(f) }}
          />
        </LabeledControlSection>

        {error && <p className="kol-mono-12 text-fg-64">{error}</p>}

        <div className="flex justify-end">
          <Button size="sm" variant="ghost" onClick={onClose}>Close</Button>
        </div>
      </div>
    </FullscreenOverlay>
  )
}
