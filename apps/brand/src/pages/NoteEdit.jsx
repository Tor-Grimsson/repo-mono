import { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { PageShell } from '@kolkrabbi/kol-shell'
import { Button, Input, KindPreview, LabeledControlSection, MediaLibrary, Textarea, ViewToggle } from '@kolkrabbi/kol-component'
import usePageTitle from '../components/hooks/usePageTitle'
import { loadNote, saveNote, slugFor } from '../lib/notesStore'
import { mediaClient } from '../lib/mediaClient'

/**
 * NoteEdit — `/notes/:slug`. Title, a markdown body, attachments, favourite.
 *
 * MARKDOWN, rendered by the DS's own `markdownToHtml`. What is stored is the
 * text you typed, so a note is still readable in a `d1 execute` dump years from
 * now — which a rich-text blob is not.
 *
 * TWO TIERS, deliberately, and the same split the deck editor uses:
 *   localStorage — the DRAFT. Every keystroke, no network, no password.
 *   the database — the SAVE. Explicit, one write, one event.
 * Autosaving to D1 on every keystroke would spend a 100k/day write budget on
 * typing and would need the password held open. The draft means you never lose
 * work; the save means you meant it.
 *
 * A draft NEWER than the saved copy is surfaced rather than silently applied —
 * silently restoring a draft over a note edited on another machine is how you
 * lose the other machine's work.
 *
 * TWO ROUTES, ONE COMPONENT. `/notes/new` is the WRITE page: a blank note that
 * does not exist yet, so there is nothing to load and the slug is minted from
 * the title on first save. `/notes/:slug` opens an existing one. The alternative
 * — a "New note" button hidden inside the listing — made writing something the
 * second thing you could do on the page rather than the first.
 */
const DRAFT = (slug) => `kol.note.${slug}`

export default function NoteEdit({ mode: routeMode = 'edit' }) {
  const { slug: routeSlug } = useParams()
  const navigate = useNavigate()
  const isNew = routeMode === 'new'
  const slug = routeSlug

  const [note, setNote] = useState(isNew
    ? { slug: null, title: '', body: '', favourite: false, assets: [] }
    : null)
  const [mode, setMode] = useState('write')
  const [status, setStatus] = useState(isNew ? '' : 'Loading…')
  const [picking, setPicking] = useState(false)
  const savedAt = useRef(0)

  usePageTitle(note ? `${note.title || 'Note'} — Notes` : 'Note')

  useEffect(() => {
    if (isNew) return undefined
    let cancelled = false
    loadNote(slug)
      .then((n) => {
        if (cancelled) return
        savedAt.current = n.updated_at
        /* a draft only wins if it is NEWER than what the server holds */
        let draft = null
        try {
          const raw = localStorage.getItem(DRAFT(slug))
          if (raw) draft = JSON.parse(raw)
        } catch { /* private mode — the note still loads from the server */ }
        if (draft && draft.at > n.updated_at) {
          setNote({ ...n, ...draft.note })
          setStatus('Unsaved draft from this browser restored.')
        } else {
          setNote(n)
          setStatus('')
        }
      })
      .catch((err) => { if (!cancelled) setStatus(err.message || String(err)) })
    return () => { cancelled = true }
  }, [slug, isNew])

  /* the draft, on every change — cheap, local, no credential */
  const patch = (partial) => {
    setNote((prev) => {
      const next = { ...prev, ...partial }
      /* an unsaved new note has no slug to key a draft on; it lives in state
         until the first save mints one */
      if (slug) {
        try { localStorage.setItem(DRAFT(slug), JSON.stringify({ at: Date.now(), note: next })) } catch { /* quota */ }
      }
      return next
    })
  }

  const save = async () => {
    if (isNew && !note.title.trim()) { setStatus('Give it a title first.'); return }
    setStatus('Saving…')
    /* the slug is minted from the TITLE on first save, so a new note has no
       identity until it is worth having one */
    const target = slug ?? slugFor(note.title)
    try {
      const res = await saveNote({
        slug: target,
        title: note.title,
        body: note.body,
        favourite: note.favourite,
        assets: note.assets ?? [],
      })
      savedAt.current = res.updated_at
      /* the draft has served its purpose — leaving it would make the next load
         think there are unsaved changes forever */
      if (slug) { try { localStorage.removeItem(DRAFT(slug)) } catch { /* nothing to clear */ } }
      setStatus('Saved.')
      /* a new note becomes a real one: move to its URL so a reload finds it */
      if (isNew) navigate(`/notes/${target}`, { replace: true })
    } catch (err) {
      setStatus(err.message || String(err))
    }
  }

  if (!note) return <PageShell width="capped"><p className="kol-mono-12 text-fg-64 pt-6">{status}</p></PageShell>

  return (
    <PageShell width="capped">
      <div className="pt-6 flex items-center gap-2">
        <Button size="sm" quiet iconLeft="chevron-left" onClick={() => navigate('/notes')}>Library</Button>
        <span className="flex-1" />
        <ViewToggle variant="text" viewMode={mode} onViewChange={setMode}
          options={[{ value: 'write', label: 'Write' }, { value: 'preview', label: 'Preview' }]} />
        <Button size="sm" quiet iconOnly={note.favourite ? 'star-solid' : 'star'} aria-label="Favourite"
          title="Favourite" onClick={() => patch({ favourite: !note.favourite })} />
        <Button size="sm" onClick={save}>Save</Button>
      </div>

      {status && <p className="kol-helper-10 text-fg-48 pt-2">{status}</p>}

      <div className="mt-4 flex flex-col gap-4">
        {/* `filled`, not `property` — the property variant is the inspector's
            hugging field with a dim affordance, which at `lg` on a page reads as
            a label floating on nothing. A title field is a field. */}
        <Input variant="filled" size="lg" className="w-full" placeholder="Title"
          value={note.title} onChange={(e) => patch({ title: e.target.value })} />

        {/* the DS atom, not a hand-rolled `<textarea>` with control classes stuck
            on it. Mine had no visible ground in dark mode: `kol-control` is the
            shell and the FILL comes from the variant, which a raw element cannot
            ask for. `Textarea` also brings the resize grip that works in Firefox. */}
        {mode === 'write' ? (
          <Textarea
            variant="filled"
            size="md"
            rows={18}
            className="w-full"
            value={note.body}
            onChange={(e) => patch({ body: e.target.value })}
            placeholder="Write in markdown. # heading, **bold**, - list"
          />
        ) : (
          /* THE SAME PREVIEWER THE LIBRARY CARD USES, so a note reads here
             exactly as its thumbnail draws it. The first cut called
             `markdownToHtml` into a bare `.kol-prose` div, which renders the
             frontmatter fence as an `<hr>` and the keys as a paragraph — the
             workshop shows frontmatter as a labelled field block, and that block
             is `DocFrontmatter`, which `KindPreview` reaches for on `markdown`.
             Wiring `parseFrontmatter` + `DocPage` here by hand would be a second
             copy of four lines that already ship. */
          <KindPreview o={{ key: slug ?? 'note' }} text={note.body} kind="markdown" />
        )}

        <LabeledControlSection label="Attachments">
          <div className="flex items-center gap-2">
            <Button size="xs" quiet iconLeft="image" onClick={() => setPicking(true)}>Attach from bucket</Button>
            <span className="kol-helper-10 text-fg-48">{(note.assets ?? []).length} attached</span>
          </div>
          {!!(note.assets ?? []).length && (
            <div className="flex flex-wrap gap-2">
              {note.assets.map((key) => (
                <button key={key} type="button" title={key} className="group relative"
                  onClick={() => patch({ assets: note.assets.filter((k) => k !== key) })}>
                  <img src={mediaClient.mediaUrl(key, 'r2')} alt="" loading="lazy"
                    className="w-20 h-14 object-cover rounded-[var(--kol-radius-sm)] opacity-64 group-hover:opacity-100" />
                </button>
              ))}
            </div>
          )}
          {/* the SAME picker the deck editor uses; it hands back a URL, and we
              store the KEY so a CDN hostname change cannot orphan it */}
          <MediaLibrary
            variant="modal"
            open={picking}
            client={mediaClient}
            accept="image"
            onClose={() => setPicking(false)}
            onSelect={(url) => {
              const key = url.replace(/^https?:\/\/[^/]+\//, '')
              patch({ assets: [...new Set([...(note.assets ?? []), key])] })
            }}
          />
        </LabeledControlSection>
      </div>
    </PageShell>
  )
}
