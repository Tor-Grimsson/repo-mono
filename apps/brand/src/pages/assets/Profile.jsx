import PageSection from '../../components/framework/PageSection'
import usePageTitle from '../../components/hooks/usePageTitle'
import AssetCard from '../../components/styleguide/AssetCard'
import { Avatar } from '../../components/styleguide/SocialMocks'

/* Was the `#social-profile` PageSection inside `pages/Assets.jsx` until 2026-08-01,
 * when the nav went category → page and every section became its own route.
 * Extracted verbatim, not re-authored. */
export default function Profile() {
  usePageTitle('Profile')

  return (
    <PageSection
      id="social-profile"
      label="13 — social · profile"
      title="Profile"
      body="Avatar treatment for profile pictures across platforms — round-cropped on burgundy, signature centered."
    >
      <div className="kol-grid mt-8 items-start">
        <AssetCard><Avatar bg="#FCFBFB" polarity="dark" /></AssetCard>
        <AssetCard><Avatar bg="#F2E5CB" polarity="dark" /></AssetCard>
        <AssetCard><Avatar bg="#750E20" polarity="light" /></AssetCard>
        <AssetCard><Avatar bg="#131316" polarity="light" /></AssetCard>
      </div>
    </PageSection>
  )
}
