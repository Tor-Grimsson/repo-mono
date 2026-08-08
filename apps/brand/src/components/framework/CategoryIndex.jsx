import { Link } from 'react-router-dom'
import { Icon } from '@kolkrabbi/kol-icons'
import { NAV_TREE } from './sidebars.config'

/**
 * The list of pages in a category, read FROM the nav tree.
 *
 * Every Overview page needs to name its siblings, and transcribing that list
 * per page is how a nav and its landing pages drift apart. This reads
 * `NAV_TREE` instead, so adding a page to the sidebar adds it here with no
 * second edit. `Overview` filters itself out — a page does not index itself.
 */
export default function CategoryIndex({ categoryId }) {
  const category = NAV_TREE.find((c) => c.id === categoryId)
  const pages = (category?.pages ?? []).filter((p) => p.label !== 'Overview')
  if (!pages.length) return null

  return (
    <ul className="mt-12 grid gap-2 grid-cols-1 md:grid-cols-2 max-w-[var(--kol-content-panel)]">
      {pages.map((page) => (
        <li key={page.to}>
          <Link
            to={page.to}
            className="kol-card kol-card-interactive flex items-center justify-between gap-4 px-4 py-3 no-underline group"
          >
            <span className="kol-mono-14 text-emphasis">{page.label}</span>
            <Icon name="arrow-right" size={16} className="text-meta group-hover:text-emphasis transition-colors" />
          </Link>
        </li>
      ))}
    </ul>
  )
}
