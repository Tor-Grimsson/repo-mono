import { useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ContentFilters, ContentCollection, ContentCard, ContentRow, ViewToggle, Dropdown, Divider, Button } from '@kolkrabbi/kol-component'
import { PageHeader } from '@kolkrabbi/kol-shell'
import { useTheme, ThemeToggle } from '@kolkrabbi/kol-framework'
import { Icon, KOL_ICON_SET_V1, getCut } from '@kolkrabbi/kol-icons'
import PageSection from '../components/framework/PageSection'
import usePageTitle from '../components/hooks/usePageTitle'
import KeylineBg from '../components/ui/KeylineBg'

/* Icon-set registry. `kol-icon-set-v1` is the only set that exists today; the
 * component is parameterised for the ones that do not, which is the whole
 * point of the route taking a `:set` segment — a route that carries none
 * falls back to it.
 *
 * The group index comes FROM the package (`KOL_ICON_SET_V1`, built by
 * import.meta.glob over the SVG folder) — never a hand-transcribed name list.
 * A transcription drifts the moment an icon is added; this cannot. */
const DEFAULT_SET = 'kol-icon-set-v1'

export const ICON_SETS = {
  'kol-icon-set-v1': {
    label: 'kol-icon-set-v1',
    title: 'Icons',
    groups: KOL_ICON_SET_V1,
  },
}

/* The gallery's own group order and display names — folder slugs are the data,
 * these are what a reader sees on the filter chips. */
const ORDER = ['chevron', 'arrow', 'arrow-diagonal', 'caret', 'add-remove', 'transfer', 'traffic', 'nav', 'singletons',
  'layout', 'files', 'device', 'components', 'code', 'tools', 'notify', 'eye-lock', 'atomic',
  'shape-primitives', 'shape-forms', 'misc']
const LABELS = { 'add-remove': 'Add / remove', 'eye-lock': 'Eye · lock', 'shape-primitives': 'Shape primitives', 'shape-forms': 'Shape forms' }
const label = (f) => LABELS[f] ?? f.replace(/-/g, ' ').replace(/^\w/, (c) => c.toUpperCase())

/* The glyph is drawn ONCE at its native 128 and the size control scales it
 * from the centre of the placeholder (user 2026-08-27) — no re-render per
 * size, and the keyline guide scales with it. */
const NATIVE = 128
const SIZES = [16, 20, 24, 32, 48, 64, 128].map((v) => ({ value: v, label: String(v) }))
const GROUNDS = [
  { value: 'dark', label: 'Dark ground', icon: 'mode-toggle-01' },
  { value: 'light', label: 'Light ground', icon: 'brightness' },
]
/* the guide is a TEXT strip in the layout strip's own voice (user 2026-08-27:
 * "GUIDE CLEAR in the same style as ICONS on the left") — the bare strip only
 * exists inside ContentFilters, so its classes are mirrored here verbatim */
const GUIDE = [{ value: true, label: 'GUIDE' }, { value: false, label: 'CLEAR' }]

/* TYPE — Stroke | Solid, the set's own fact (kol-icons ≥0.24.0 `getCut`, IconSetCut
 * 2026-08-27 — user: "TYPE (stroke solid)? then TAGS"). Chip labels are cased here. */
const CUT_LABEL = { stroke: 'Stroke', solid: 'Solid' }
const TYPES = ['Stroke', 'Solid']
const LAYOUTS = [{ value: 'list', label: 'LIST' }, { value: 'grid', label: 'GRID' }]

/* The card's media: the specimen ground (fixed, like the DS gallery's — a
 * light or dark plate the theme never touches) with the glyph centred on it.
 * SQUARE by its own aspect (user: "6 columns square graphic placeholder") —
 * the card runs `ratio="auto"` so this box, not the catalog's A4 frame, sets
 * the height; a card ratio that yields a square only at one column width is
 * not a square. */
function Glyph({ name, size, bgLight, guide }) {
  return (
    <div
      className="w-full aspect-square flex items-center justify-center"
      style={{ background: bgLight ? '#FFFFFF' : '#0E0E11', color: bgLight ? '#0E0E11' : '#FFFFFF' }}
    >
      <span
        className="relative block shrink-0"
        style={{ width: NATIVE, height: NATIVE, transform: `scale(${size / NATIVE})` }}
      >
        {guide && <KeylineBg bgLight={bgLight} />}
        <Icon name={name} size={NATIVE} />
      </span>
    </div>
  )
}

/**
 * IconsGallery — THE icons page: `/icons` carries no segment and takes the
 * default set; `/icons/:set` names one.
 *
 * The app tier's catalog page, as kol-monitor / kol-mirror / kol-fxr render it
 * (user 2026-08-27): the shell `PageHeader`, `ContentFilters` (title · filter ·
 * search, the gallery's own controls in the header's right slot, LIST / GRID
 * under the divider), `ContentCollection` six across, `ContentCard catalog`
 * with the glyph in the media slot, its name as the title and its group as
 * the detail; the list form is `ContentRow catalog`. The folder groups are
 * filter chips, one at a time — no per-group sections, no dividers.
 *
 * The controls are the one thing the family does not own, and they ride the
 * seam kol-r2b2's FileList uses for its own: ground and guide are icon
 * `ViewToggle`s, size is a `Dropdown`.
 */
export default function IconsGallery() {
  const { set } = useParams()
  const meta = ICON_SETS[set ?? DEFAULT_SET]
  usePageTitle(meta?.label ?? 'Icons')

  /* the ground follows the app theme until the toggle names one (user 2026-08-27) */
  const { theme } = useTheme()
  const [groundOverride, setGroundOverride] = useState(null)
  const ground = groundOverride ?? theme
  const [guide, setGuide] = useState(false)
  const [size, setSize] = useState(NATIVE)
  const [copied, setCopied] = useState(null)

  const copy = (name) => {
    navigator.clipboard?.writeText(name).catch(() => {})
    setCopied(name)
    setTimeout(() => setCopied((c) => (c === name ? null : c)), 1200)
  }

  const orderedFolders = useMemo(() => {
    if (!meta) return []
    return Object.keys(meta.groups).sort((a, b) => {
      const ia = ORDER.indexOf(a), ib = ORDER.indexOf(b)
      return (ia < 0 ? 999 : ia) - (ib < 0 ? 999 : ib) || a.localeCompare(b)
    })
  }, [meta])

  /* `group` carries the DISPLAY label so the chips read as the gallery always
   * labelled them ("Add / remove", not "add-remove"). */
  const items = useMemo(
    () => orderedFolders.flatMap((folder) =>
      meta.groups[folder].map((name) => ({ name, group: label(folder), folder, type: CUT_LABEL[getCut(name)] ?? 'Stroke' }))),
    [orderedFolders, meta],
  )

  if (!meta) {
    return (
      <PageSection id="icons-gallery" label="Icons" title="Unknown set">
        <p className="kol-mono-12 text-fg-48 mt-6">No icon set named “{set}”.</p>
      </PageSection>
    )
  }

  const bgLight = ground === 'light'

  return (
    <PageSection id={`icons-${set ?? DEFAULT_SET}`}>
      <PageHeader
        size="sm"
        voice="mono"
        title={meta.title}
        subtitle={`${items.length} icons across ${orderedFolders.length} groups (${meta.label}), resolved straight from the package (@kolkrabbi/kol-icons). Single stroke cut, currentColor. Click any icon to copy its name.`}
        subtitleMaxWidth="800px"
        /* the cluster shares the lede's baseline row (kol-shell 0.15.0) */
        actions={
          <div className="flex items-center gap-2">
            <Dropdown tone="sunken" options={SIZES} value={size} onChange={setSize} className="w-48" />
            <Button variant="secondary" tone="sunken" size="sm" iconOnly="nav-settings" iconSize={14} aria-label="Settings" onClick={() => {}} />
            <ThemeToggle variant="button" tone="sunken" size="sm" label={false} fill="subtle" />
          </div>
        }
      />

      <ContentFilters
        tone="sunken"
        items={items}
        title="Icons"
        totalCount={items.length}
        searchKeys={['name']}
        /* TYPE first — the short group takes the first column; TAGS flows after it */
        filterGroups={[
          { label: 'Type', key: 'type', values: TYPES },
          { label: 'Tags', key: 'group', values: orderedFolders.map(label) },
        ]}
        mutuallyExclusiveFilters={['type', 'group']}
        showCountOnlyWhenFiltering
        layoutOptions={LAYOUTS}
        layoutClassName="kol-helper-12"
        defaultLayout="grid"
        trailingActions={
          <div className="flex flex-col items-end">
            <div className="flex items-center gap-6">
              <ViewToggle tone="sunken" variant="icon" options={GROUNDS} viewMode={ground} onViewChange={setGroundOverride} />
              <Divider variant="vertical" />
              {GUIDE.map((o) => (
                <span
                  key={o.label}
                  onClick={() => setGuide(o.value)}
                  aria-pressed={guide === o.value}
                  className={`kol-helper-14 cursor-pointer select-none ${guide === o.value ? 'text-oq-96' : 'text-oq-48 hover:text-oq-64'}`}
                  style={{ letterSpacing: 1 }}
                >
                  {o.label}
                </span>
              ))}
            </div>
          </div>
        }
        renderItem={(rows, _view, layout) => {
          const list = layout === 'list'
          return (
            <ContentCollection form={list ? 'list' : 'grid'} cols={6}>
              {rows.map((item) => list ? (
                <ContentRow
                  key={item.name}
                  variant="catalog"
                  title={copied === item.name ? 'copied!' : item.name}
                  detail={item.group}
                  onClick={() => copy(item.name)}
                />
              ) : (
                <ContentCard
                  key={item.name}
                  variant="catalog"
                  ratio="auto"
                  plateRule={false}
                  title={copied === item.name ? 'copied!' : item.name}
                  detail={item.group}
                  media={<Glyph name={item.name} size={size} bgLight={bgLight} guide={guide} />}
                  onClick={() => copy(item.name)}
                />
              ))}
            </ContentCollection>
          )
        }}
      />
    </PageSection>
  )
}
