import { DocumentationReader } from '@kolkrabbi/kol-workshop'
import { documentationInventory } from '../../data/workshop/documentationInventory'

// The injection seam: doc discovery is Vite-specific, so it stays in the app.
// Everything downstream (parse, render, TOC, tag mode) lives in the package.
const documentationModules = import.meta.glob(
  ['@docs/documentation/0[0-9]-*/*.md'],
  { eager: true, query: '?raw', import: 'default' }
)

const WorkshopDocumentationReader = () => (
  <DocumentationReader
    inventory={documentationInventory}
    modules={documentationModules}
    docHref={(id) => `/workshop/docs/${id}`}
    routes={{
      docsIndex: '/workshop/docs',
      components: '/workshop/components',
      tagHref: (tag) => `/workshop/docs?tag=${encodeURIComponent(tag)}`,
      docFilePath: (id) => `docs/documentation/${id}.md`,
    }}
  />
)

export default WorkshopDocumentationReader
