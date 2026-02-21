import { documentationInventory } from '../data/workshop/documentationInventory'

// Curated list of essential documentation topics
const CURATED_TABS = [
  { docId: '2.2.0-typography', label: 'Typography', icon: 'type' },
  { docId: '2.1.0-colors', label: 'Color', icon: 'color' },
  { docId: '3.0.0-components-index', label: 'Components', icon: 'component' },
  { docId: '2.3.0-css-architecture', label: 'Grid & Layout', icon: 'foundation' },
  { docId: '3.2.0-icons', label: 'Icons', icon: 'grid' },
  { docId: '2.4.0-prose-styles-index', label: 'Prose Patterns', icon: 'dashboard-book-open' }
]

// Static tabs that don't map to a doc ID
const STATIC_TABS = [
  { id: 'components-showcase', label: 'Showcase', icon: 'grid', path: '/docs/components' }
]

export const buildDocHighlightTabs = () => {
  const docs = documentationInventory

  if (!Array.isArray(docs) || docs.length === 0) {
    return [...STATIC_TABS]
  }

  // Map doc IDs to actual docs
  const tabs = CURATED_TABS
    .map(({ docId, label, icon }) => {
      const doc = docs.find(d => d.id === docId)
      if (!doc) return null

      return {
        id: doc.id,
        label,
        icon,
        path: `/docs/${doc.id}`
      }
    })
    .filter(Boolean)

  return [...tabs, ...STATIC_TABS]
}
