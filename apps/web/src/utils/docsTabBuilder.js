import { documentationInventory } from '../data/workshop/documentationInventory'

// Curated list of essential documentation topics
const CURATED_TABS = [
  { docId: '2.2.0-typography', label: 'Typography', icon: 'type' },
  { docId: '2.1.0-colors', label: 'Color', icon: 'color' },
  { docId: '03-components-index', label: 'Components', icon: 'component' },
  { docId: '2.3.0-css-architecture', label: 'Grid & Layout', icon: 'foundation' },
  { docId: '3.4.0-icons', label: 'Icons', icon: 'grid' },
  { docId: '2.4.0-prose', label: 'Patterns', icon: 'dashboard-book-open' }
]

export const buildDocHighlightTabs = () => {
  const docs = documentationInventory

  if (!Array.isArray(docs) || docs.length === 0) {
    return []
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
        path: `/workshop/design-system/documentation/${doc.id}`
      }
    })
    .filter(Boolean)

  return tabs
}
