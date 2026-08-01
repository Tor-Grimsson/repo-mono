import { useParams } from 'react-router-dom'
import PageSection from '../components/framework/PageSection'
import usePageTitle from '../components/hooks/usePageTitle'
import { Icon, KOL_ICON_SET_V1 } from '@kolkrabbi/kol-icons'

/* Icon-set registry. `kol-icon-set-v1` is the only set that exists today; the
 * component is parameterised for the ones that do not, which is the whole
 * point of the route taking a `:set` segment.
 *
 * The group index comes FROM the package (`KOL_ICON_SET_V1`, built by
 * import.meta.glob over the SVG folder) — never a hand-transcribed name list.
 * A transcription drifts the moment an icon is added; this cannot. */
export const ICON_SETS = {
  'kol-icon-set-v1': {
    label: 'kol-icon-set-v1',
    title: 'Contact sheet',
    body: 'The whole set at a glance, grouped as it is on disk. Glyphs at display size with no labels — the embedded showcase already lists every icon by name; this is the other way of looking at the same set.',
    groups: KOL_ICON_SET_V1,
  },
}

/**
 * IconsGallery — a SECOND presentation of an icon set, at `/icons/:set`.
 *
 * Deliberately unlike the surface `/icons` already embeds: the DS showcase is a
 * labelled row-per-icon list with size / background / grid controls. Repeating
 * that here would be a worse copy of a live page. So this is a contact sheet —
 * large glyphs, no per-icon label, grouped by the set's own folder groups, the
 * name available on hover rather than printed under every tile.
 */
export default function IconsGallery() {
  const { set } = useParams()
  const meta = ICON_SETS[set]
  usePageTitle(meta?.label ?? 'Icons')

  if (!meta) {
    return (
      <PageSection id="icons-gallery" label="Icons" title="Unknown set">
        <p className="kol-mono-12 text-fg-48 mt-6">No icon set named “{set}”.</p>
      </PageSection>
    )
  }

  const groups = Object.entries(meta.groups).sort(([a], [b]) => a.localeCompare(b))
  const total = Object.values(meta.groups).reduce((n, g) => n + g.length, 0)

  return (
    <PageSection id={`icons-${set}`} label="Icons" title={meta.title} body={meta.body}>
      <p className="kol-mono-12 text-fg-48 mt-6">
        {total} icons · {groups.length} groups
      </p>

      <div className="mt-10 flex flex-col gap-12">
        {groups.map(([group, names]) => (
          <section key={group}>
            <header className="flex items-baseline gap-3 pb-3 border-b border-fg-08">
              <h3 className="kol-mono-12 text-emphasis">{group}</h3>
              <span className="kol-mono-12 text-fg-48">{names.length}</span>
            </header>
            <ul className="mt-6 grid gap-3 grid-cols-[repeat(auto-fill,minmax(5rem,1fr))]">
              {names.map((name) => (
                <li
                  key={name}
                  title={name}
                  className="aspect-square flex items-center justify-center rounded border border-fg-08 text-body hover:text-emphasis hover:border-fg-24 transition-colors"
                >
                  <Icon name={name} size={28} />
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </PageSection>
  )
}
