import { useNavigate } from 'react-router-dom'
import { Button } from '@kolkrabbi/kol-component'
import { DocumentationReader } from '@kolkrabbi/kol-workshop'
import { PAGES, PAGE_INVENTORY, PAGE_MODULES, pageHref } from '../../data/workshop/pages.js'

/* The frontmatter block: the page's own plumbing keys stay out of it, and its two links read as
 * names (kol-workshop 0.39.0 `fields`, reader-takes-field-config-and-page-actions). */
const FIELDS = {
  url: { label: 'Live', icon: 'external-link' },
  repo: { label: 'Repository', icon: 'code' },
  icon: { hidden: true },
  image: { hidden: true },
  order: { hidden: true },
  embed: { hidden: true },
}

// One app page: its markdown file through the package reader, with the page's own actions under
// the title. The right rail stays the chrome's (rail={false}) — AutoToc adds the live and repo links.
const WorkshopPage = ({ id }) => {
  const navigate = useNavigate()
  const page = PAGES.find((p) => p.id === id)
  const actions = page && (
    <>
      <Button tone="primary" href={page.url} target="_blank" rel="noreferrer" iconRight="external-link">
        Open {page.title}
      </Button>
      {page.embed && (
        <Button tone="ghost" onClick={() => navigate(`${pageHref(id)}/live`)} iconLeft="maximize">
          Open in place
        </Button>
      )}
    </>
  )
  return (
    <DocumentationReader
      inventory={PAGE_INVENTORY}
      modules={PAGE_MODULES}
      docHref={pageHref}
      docId={id}
      rail={false}
      fields={FIELDS}
      actions={actions}
      routes={{ docsIndex: '/workshop' }}
    />
  )
}

export default WorkshopPage
