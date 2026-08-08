import PageSection from '../components/framework/PageSection'
import usePageTitle from '../components/hooks/usePageTitle'

/**
 * A page that exists in the nav but has no source yet.
 *
 * The standing ruling is "build everything, use placeholders if waiting for
 * stuff" — so a route agreed in the tree ships as a real route rather than a
 * dead link, and says on screen that it is not built. It never fakes content.
 *
 * `note` carries WHY it is empty, in one sentence. That sentence is the whole
 * value of the page: it stops the next session re-deriving what is missing.
 */
export default function Placeholder({ id, label, title, note }) {
  usePageTitle(label)

  return (
    <PageSection id={id} label={label} title={title} body={note}>
      <p className="kol-mono-12 text-meta mt-12">
        Not built. This route exists so the nav is honest about the shape of the
        thing; it will carry content when the source for it does.
      </p>
    </PageSection>
  )
}
