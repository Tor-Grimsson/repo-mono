import { useCallback, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CatalogPage } from '@kolkrabbi/kol-shell'
import { Button, Icon, KindPreview, useModal } from '@kolkrabbi/kol-component'
import usePageTitle from '../components/hooks/usePageTitle'
import { listNotes, saveNote, deleteNote, slugFor } from '../lib/notesStore'

/**
 * Notes — `/notes`, the list. INTERNAL: the routes behind it are password-gated,
 * so a visitor to the public brand site sees the prompt and an empty page.
 *
 * `CatalogPage preset="shelf"`, and the prop shapes are COPIED FROM
 * `SlideDeckManager`, not invented. The first cut used the same preset but made
 * its own prop values up — `header.detail` instead of `subtitle`, no
 * `filtersTitle`, no `iconComponent`, and a `views` array that overrode the
 * preset's own strip. The result rendered as a bare title over an empty page
 * with the action button orphaned at the bottom. The preset is only a preset if
 * you feed it what it expects.
 *
 * FAVOURITES IS A FILTER GROUP, not a view. `views` belongs to the preset —
 * overriding it is what broke the header. A filter group is the slot for "show
 * me a subset", and it is what ContentFilters was built to render.
 *
 * The fetch is still server-side by favourite when the group is active, because
 * doing it in SQL stays correct when there are three hundred notes.
 */
/**
 * A document THUMBNAIL: the note's own markdown, rendered by the DS previewer
 * and scaled down to fit a card's media box.
 *
 * `KindPreview` renders a document at READING size, which is right — it is the
 * same component the media admin's overlay uses at full width. Dropped straight
 * into a 120px thumb you get one enormous letter of the first heading, because
 * nothing has told it the frame is small. The scale is the CONSUMER's to set:
 * only the call site knows how big its frame is.
 *
 * `zoom`, not `transform: scale` — zoom affects layout, so the scaled page
 * occupies the space it draws in and the box clips it honestly. Same mechanic
 * as the deck's `SlideThumb`.
 *
 * THE SCALE IS MEASURED, NOT GUESSED. The first cut hard-coded `zoom: 0.22`
 * against a 640px page, which is only right for one frame width — and the card
 * media box is one size in the grid and another in a list row, so the thumbnail
 * came out too large. A `ResizeObserver` on the frame divides the two, which is
 * correct at every width and needs no number to be kept in sync with the CSS.
 *
 * 640 is the DS's own logical width for a scaled document: kol-theme puts
 * `.kol-doc-page` at `zoom: 0.5` inside the 320px column-browser frame.
 */
const THUMB_PAGE = 640

function NoteThumb({ note }) {
  const frame = useRef(null)
  const [zoom, setZoom] = useState(null)

  useEffect(() => {
    const el = frame.current
    if (!el) return undefined
    const ro = new ResizeObserver(([entry]) => {
      const w = entry.contentRect.width
      if (w) setZoom(w / THUMB_PAGE)
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  return (
    <div ref={frame} className="w-full h-full overflow-hidden bg-surface-primary pointer-events-none">
      {/* nothing until the frame has a width — one blank frame beats a page
          drawn at the wrong scale and then jumping */}
      {zoom != null && (
        <div style={{ width: THUMB_PAGE, zoom }} aria-hidden="true">
          <KindPreview o={{ key: note.slug }} text={note.preview} kind="markdown" />
        </div>
      )}
    </div>
  )
}

/* markdown → a plain first line or two. Not a renderer: the card wants text. */
const previewOf = (raw = '') => raw
  .replace(/^---[\s\S]*?---/, '')      /* frontmatter */
  .replace(/^#{1,6}\s+/gm, '')          /* heading marks */
  .replace(/\*\*|__|[*_`>]/g, '')      /* emphasis + code + quote marks */
  .replace(/^\s*[-+]\s+/gm, '• ')      /* list bullets, kept as a glyph */
  .replace(/\|/g, ' ')                  /* table pipes */
  .replace(/\s+/g, ' ')
  .trim()
  .slice(0, 180)

export default function Notes() {
  usePageTitle('Notes')
  const navigate = useNavigate()

  /* `null` IS the loading state — a separate `busy` boolean meant the effect
     flipped it synchronously on mount, which cascades a second render before
     the fetch has even started. One value, three states: null loading, [] empty,
     [..] loaded. */
  const [notes, setNotes] = useState(null)
  const [error, setError] = useState(null)
  const { prompt, confirm } = useModal()

  /* Fetch inside the effect with an ignore flag — React's own pattern, and the
     one the lint rule wants. Beyond the rule: `listNotes` reaches the password
     prompt SYNCHRONOUSLY on the first call of a session, so calling it straight
     from the effect body opened a dialog mid-render. */
  const [reloadToken, setReloadToken] = useState(0)
  const refresh = useCallback(() => setReloadToken((n) => n + 1), [])

  useEffect(() => {
    let ignore = false
    ;(async () => {
      try {
        /* everything, always — the favourites SUBSET is a filter group and
           ContentFilters does that client-side over what it holds. The server
           filter stays in notesStore for when this list grows past one page. */
        const rows = await listNotes()
        if (ignore) return
        setNotes(rows)
        setError(null)
      } catch (err) {
        if (ignore) return
        setNotes([])
        setError(err.message || String(err))
      }
    })()
    return () => { ignore = true }
  }, [reloadToken])

  /* the DS modal, not `window.prompt` — SlideDeckManager's own note: a one-field
     ask is `useModal`'s prompt, and a browser dialog in a themed app is a
     different product appearing for a second */
  const create = async () => {
    const title = await prompt('Name the new note', 'Untitled note', { okLabel: 'Create' })
    if (!title) return
    const slug = slugFor(title)
    try {
      await saveNote({ slug, title, body: '', favourite: false, assets: [] })
      navigate(`/notes/${slug}`)
    } catch (err) {
      setError(err.message || String(err))
    }
  }

  /* favourite toggles on the CARD, so it is one click from the list — the
     whole point of favouriting is not having to open the thing first */
  const toggleFavourite = async (note) => {
    try {
      const full = notes.find((n) => n.slug === note.slug)
      await saveNote({ slug: note.slug, title: full.title, body: undefined, favourite: !full.favourite, assets: [] })
      refresh()
    } catch (err) {
      setError(err.message || String(err))
    }
  }

  const remove = async (note) => {
    if (!(await confirm(`Delete \u201c${note.title || 'Untitled'}\u201d?`, { okLabel: 'Delete' }))) return
    try { await deleteNote(note.slug); refresh() } catch (err) { setError(err.message || String(err)) }
  }

  return (
    <>
      {error && <p className="kol-mono-12 text-fg-64 px-6 pt-4">{error}</p>}
      <CatalogPage
        preset="shelf"
        /* the preset only DEFAULTS these. `slide` is a 16:9 cover card built for
           decks, so every note rendered a MISSING plate — a note has no cover and
           never will. `article` is the text card: kicker, title, summary, date.
           Keeping the preset gives the page chrome; overriding the two variants
           gives the right card. */
        cardVariant="article"
        rowVariant="article"
        /* LIST stays the default on its own merits — a document listing reads
           as a list, not a wall of tiles. It is no longer a workaround: since
           kol-component 0.210.0 the card renders the note's own content as its
           media (see `media` in toCard), so the grid is honest too. */
        defaultLayout="list"
        header={{
          title: 'Notes',
          subtitle: 'Working notes for this project. Markdown, with images from the media bucket. Stored in the shared database, not in this browser.',
        }}
        /* `bucket` is derived for the filter group to match on — ContentFilters
           filters by a KEY on the item, so a group with no backing field is a
           chip that does nothing. */
        items={(notes ?? []).map((n) => ({ ...n, bucket: n.favourite ? 'Favourites' : 'All' }))}
        filtersTitle="Notes"
        searchKeys={['title']}
        filterGroups={[
          { label: 'Show', key: 'bucket', values: ['All', 'Favourites'] },
        ]}
        iconComponent={Icon}
        toCard={(n) => ({
          key: n.slug,
          title: n.title || 'Untitled',
          /* `article` shows a kicker and a summary rather than a cover */
          kicker: n.favourite ? 'Favourite' : 'Note',
          /* `body`, NOT `summary` — ContentText's slots are title · body ·
             eyebrow · detail · date · size · meta · tags, and an unknown prop is
             silently dropped, which is exactly why every card read empty. The
             value is the API's `preview` (first 240 chars, cut in SQL) with the
             markdown syntax stripped so a heading is not a literal `#`. */
          body: previewOf(n.preview),
          /* THE COVER IS THE CONTENT (content-card-needs-no-cover, shipped in
             kol-component 0.210.0 — the shape is kol-r2b2's, whose component
             `KindPreview` is). A note has no image and never will, so its
             preview IS its first lines.

             `kind` is NOT optional here and that is the trap the DS flagged:
             classification reads the EXTENSION off the key, and a database row
             has no filename, so `text` alone lands on `other` and renders the
             right content as the wrong thing. Worse than the placeholder it
             replaces, and silent. */
          media: n.preview
            ? <NoteThumb note={n} />
            /* `false`, not omitted: omitted still draws the placeholder, which is
               correct for an image that FAILED. A note has nothing to fail. */
            : false,
          date: new Date(n.updated_at).toISOString().slice(0, 10),
          favourited: n.favourite,
          href: `/notes/${n.slug}`,
          onNavigate: (e) => { e.preventDefault(); navigate(`/notes/${n.slug}`) },
          onFavourite: () => toggleFavourite(n),
          onDelete: () => remove(n),
        })}
        actions={<Button size="md" iconRight="plus" onClick={create}>New note</Button>}
      />
    </>
  )
}
