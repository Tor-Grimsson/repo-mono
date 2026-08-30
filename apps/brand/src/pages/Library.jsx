import { Button, MediaLibrary } from '@kolkrabbi/kol-component'
import PageSection from '../components/framework/PageSection'
import usePageTitle from '../components/hooks/usePageTitle'
import { mediaClient } from '../lib/mediaClient'

/**
 * Library — `/library` (Overview): the content-filters wall over the three
 * buckets, `MediaLibrary variant="library"` (MediaLibraryPages, kol-component
 * 0.118.0 — kol-r2b2's file wall promoted). The organism paints the page head
 * (title · bucket dropdown · lock · settings), so the page adds none. Read
 * client → read-only: Copy URL, download; no upload, rename or delete —
 * writes happen on the admin, the Open admin button rides `headerActions`.
 * The wall shows by default (`layout: 'grid'`); the organism's own default is
 * `off`, which is r2b2's browser-first habit, not a library's.
 */
export default function Library() {
  usePageTitle('Library')
  return (
    <PageSection id="library">
      <MediaLibrary
        variant="library"
        client={mediaClient}
        title="Library"
        defaults={{ layout: 'grid' }}
        headerActions={
          <Button variant="secondary" size="sm" href="https://admin.kolkrabbi.io" iconRight="external-link" iconSize={14} target="_blank" rel="noreferrer">
            Open admin
          </Button>
        }
      />
    </PageSection>
  )
}
