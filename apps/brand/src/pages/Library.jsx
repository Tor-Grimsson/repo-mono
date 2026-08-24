import PageSection from '../components/framework/PageSection'
import usePageTitle from '../components/hooks/usePageTitle'
import { Button, MediaLibrary } from '@kolkrabbi/kol-component'
import { createMediaClient } from '@kolkrabbi/kol-media-client'

/* The bucket browser is the DS organism now — kol-component 0.19.0, which
 * collapsed four forks of this page (9 files, ~1542 lines across this repo,
 * kol-ds-fxr, kol-labs-single, kol-client-kolkrabbi) onto one module. The local
 * transcription this file used to carry, and the folder-scoped gallery in
 * LibraryFolder.jsx, are both retired: lobby/outbox/MediaLibrary.md.
 *
 * THE CLIENT IS INJECTED. kol-component never imports kol-media-client
 * (kol-ds-ui ARCHITECTURE §3 — the UI tier takes no edge on the clients tier),
 * so the endpoint stays this app's to own. Built at MODULE scope on purpose:
 * MediaLibraryProvider's fetch effect keys on the client identity, so a fresh
 * object per render would refetch forever.
 *
 * No arguments — the factory's own defaults are already this bucket
 * (adminBase https://admin.kolkrabbi.io · publicBase https://r2.kolkrabbi.io),
 * the exact pair this page used to hardcode. Passing them again would be a
 * second copy of a value that is only allowed to have one. */
const mediaClient = createMediaClient()

export default function Library() {
  usePageTitle('Library')

  return (
    <div>
      <PageSection
        id="library"
        label="Library"
        title="kol-media bucket"
        body="Read-only browse of the kol-media R2 bucket. Open a folder to disclose it in place, or copy any file's public URL — paste into any kolkrabbi component, hero, or generator. Uploads, renames, and deletes happen on the admin."
      >
        <header className="mt-6 flex items-center gap-3 flex-wrap">
          <Button
            variant="secondary"
            size="sm"
            href="https://admin.kolkrabbi.io"
            iconRight="external-link"
            iconSize={14}
            target="_blank"
            rel="noreferrer"
          >
            Open admin
          </Button>
        </header>

        {/* No `onSelect` — without it the row actions offer Copy URL only, which
            is the read-only surface a brand book wants. Passing one would turn
            every row into a picker. */}
        <div className="mt-6">
          <MediaLibrary variant="page" client={mediaClient} />
        </div>
      </PageSection>
    </div>
  )
}
