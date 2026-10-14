import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CatalogPage } from '@kolkrabbi/kol-shell'
import { Button, Icon, useModal } from '@kolkrabbi/kol-component'
import usePageTitle from '../components/hooks/usePageTitle'
import { DECKS } from '../data/decks'

const slugify = (s) => s.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

/**
 * SlideDeckManager — `/slide-deck`, on the DS's `CatalogPage` (kol-shell).
 *
 * Was `PageSection` + a hand-rolled flex header + a hand-rolled
 * `ContentCollection` grid until 2026-09-03. That header row was the thing the
 * user pointed at — *"is this supposed to be content filters? it doesnt look
 * right at all"* — and it was not: two Buttons and a count span in a flex div.
 * `SettingsScaffold`'s own ruling is the law here: **a row that looks like
 * ContentFilters must BE ContentFilters**, and `CatalogPage` is the shipped
 * page that composes PageShell → PageHeader → ContentFilters → the grid. The
 * old file is in `_tmp/2026-09-03-brand-ds-forks-retired/`.
 *
 * `preset="shelf"` — kol-shell 0.50.0 / kol-component 0.178.0
 * (slide-variant-and-shelf-preset): the eleven props this page carried are the
 * preset now, and `slide` is a fifth content kind carrying the 16:9 stage, the
 * plate on the page surface and the filling row thumb. `toCard` returns FIELDS
 * AND HANDLERS; the page renders the slots in the media admin's idiom. Do not
 * hand-build the action JSX back — a slot supplied here overrides the preset's.
 *
 * Create · rename · delete · export are the PRODUCT half of this scope and
 * carry unmade decisions; `New deck` renders disabled so the shape is visible
 * without pretending the behaviour exists.
 */
export default function SlideDeckManager() {
  usePageTitle('Slide deck')
  const navigate = useNavigate()
  const { prompt, confirm } = useModal()
  /* the registry is a module constant; the page holds the live list so create,
     delete and favourite are real on screen. Nothing persists past a reload —
     that is the storage question, not this page's. */
  const [decks, setDecks] = useState(DECKS)
  const [favs, setFavs] = useState(() => new Set())

  /* New deck: the DS modal is a one-field prompt (useModal), so the dialog asks
     for the name and creates the record on the one template that exists. A
     slide-count / template / colour dialog is a DS ask, not a hand-rolled form. */
  const createDeck = async () => {
    const name = await prompt('Name the new deck', 'Untitled deck', { okLabel: 'Create' })
    if (!name) return
    const slug = slugify(name) || `deck-${Date.now()}`
    setDecks((d) => [...d, { slug, name, detail: 'New deck. No renderer yet.', slides: 0, bytes: 0, updated: new Date().toISOString().slice(0, 10), template: 'runway' }])
  }
  const deleteDeck = async (deck) => {
    if (!(await confirm(`Delete “${deck.name}”?`, { okLabel: 'Delete' }))) return
    setDecks((d) => d.filter((x) => x.slug !== deck.slug))
  }
  const toggleFav = (slug) => setFavs((f) => { const n = new Set(f); n.has(slug) ? n.delete(slug) : n.add(slug); return n })

  return (
    <CatalogPage
      preset="shelf"
      header={{
        /* no eyebrow: it is the SITE register's label (kol-website's "USE CASES")
           per PageHeader's docstring; an app page carries title + subtitle only */
        title: 'Decks',
        subtitle: 'Every deck in the brand book. Open one to view or present it; templates define the layouts a new deck starts from.',
      }}
      items={decks}
      filtersTitle="Decks"
      searchKeys={['name', 'detail', 'template']}
      filterGroups={[
        { label: 'Template', key: 'template', values: [...new Set(DECKS.map((d) => d.template))] },
      ]}
      iconComponent={Icon}
      toCard={(deck) => ({
        key: deck.slug,
        title: deck.name,
        detail: deck.detail,
        date: deck.updated,
        bytes: deck.bytes,
        count: deck.slides,
        cover: deck.cover,
        favourited: favs.has(deck.slug),
        href: `/slide-deck/${deck.slug}`,
        onNavigate: (e) => { e.preventDefault(); navigate(`/slide-deck/${deck.slug}`) },
        /* the export target once one exists; the handler is what makes the
           preset render the download affordance at all */
        onDownload: () => {},
        onFavourite: () => toggleFav(deck.slug),
        onDelete: () => deleteDeck(deck),
      })}
      actions={
        <>
          {/* the preset cannot reach these — the action row's Buttons are the
              consumer's JSX, so `size` stays at the call site. No `variant` on
              either: an explicit variant wins over the wrapper's tone (the law),
              so both inherit the root tone. */}
          <Button size="md" iconRight="plus" onClick={createDeck}>New deck</Button>
          <Button size="md" href="/slide-deck/template">Templates</Button>
        </>
      }
    />
  )
}
