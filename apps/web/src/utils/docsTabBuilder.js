import { documentationInventory } from '../data/workshop/documentationInventory'

// Curated list of essential documentation topics
const CURATED_TABS = [
  { docId: '2.2.0-design-system-typography', label: 'Typography', icon: 'type' },
  { docId: '2.1.0-design-system-colors', label: 'Color', icon: 'color' },
  { docId: '3.0.0-design-system-components', label: 'Components', icon: 'component' },
  { docId: '2.3.0-design-system-css-architecture', label: 'Grid & Layout', icon: 'foundation' },
  { docId: '3.4.0-icons', label: 'Icons', icon: 'grid' },
  { docId: '2.4.0-design-system-prose', label: 'Patterns', icon: 'dashboard-book-open' }
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
