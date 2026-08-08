import { DocumentationReader } from '@kolkrabbi/kol-workshop'
import { VAULT, VAULT_MODULES, vaultDocHref } from '../../data/workshop/vault.js'

// The injection seam: doc discovery is Vite-specific, so it stays in the app
// (data/workshop/vault.js). Everything downstream — parse, render, TOC, tags,
// the reader's own right rail — lives in the package.
const WorkshopDocumentationReader = () => (
  <DocumentationReader
    inventory={VAULT}
    modules={VAULT_MODULES}
    docHref={vaultDocHref}
    routes={{
      docsIndex: '/workshop/docs',
      components: '/workshop/design-system/components',
    }}
  />
)

export default WorkshopDocumentationReader
