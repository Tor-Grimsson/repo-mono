import { MediaLibrary } from '@kolkrabbi/kol-component'
import PageSection from '../components/framework/PageSection'
import usePageTitle from '../components/hooks/usePageTitle'
import { mediaClient } from '../lib/mediaClient'

/**
 * LibraryBrowse — `/library/browse`: folder / files, `MediaLibrary
 * variant="browse"` (MediaLibraryPages, kol-component 0.118.0) — the bucket
 * dropdown, the crumb line, Finder columns over the flat key space, the count
 * line — the organism paints the page head. Read client → read-only.
 */
export default function LibraryBrowse() {
  usePageTitle('Browse')
  return (
    <PageSection id="library-browse">
      <MediaLibrary variant="browse" client={mediaClient} title="Browse" />
    </PageSection>
  )
}
