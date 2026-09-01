import { SectionSplit, ProfileCard } from '@kolkrabbi/kol-component'
import { Asset } from '@kolkrabbi/kol-brand/svg'

/* Brand content is the consumer's — the DS card takes the lockup as a slot
 * (kol-component cannot import kol-brand) and name/email/socials as props with
 * no defaults. Carried verbatim from the retired local ProfileCard
 * (_tmp/2026-09-01-profilecard-ds-adoption/). */
const cdnCard = 'https://b2.kolkrabbi.io/website/asset-library/studio/card-about/studio-about-1200.jpg'

const socials = [
  { icon: 'social-instagram-2', href: 'https://www.instagram.com/kolkrabbi_/', label: 'Instagram' },
  { icon: 'social-dribbble', href: 'https://dribbble.com/kolkrabbi', label: 'Dribbble' },
  { icon: 'social-behance', href: 'https://www.behance.net/kolkrabbi_', label: 'Behance' },
  { icon: 'social-youtube', href: 'https://www.youtube.com/@kolkrabbi', label: 'YouTube' },
  { icon: 'social-tiktok', href: 'https://www.tiktok.com/@kolkrabbi', label: 'TikTok' },
]

const cardProps = {
  image: cdnCard,
  logo: <Asset name="kol-lockup-vert" title="Kolkrabbi" className="inline-flex [&>svg]:h-full [&>svg]:w-auto" />,
  name: 'Tór Grímsson',
  email: 'hello@kolkrabbi.io',
  socials,
  /* light shelf (user 2026-09-01) — shelfTheme stamps data-theme on the
   * shelf; the shipped default is the page's inverse. `secondary` is the
   * surface `kol-btn-primary` fills with, which is the ask. */
  shelfTheme: 'light',
  shelfBackground: 'secondary',
  className: 'w-full',
}

const StudioProcessCard = () => {
  return (
    <SectionSplit
      height="40"
      label="Process"
      slotClass={{ label: 'reveal', headline: 'reveal', body: 'reveal' }}
      slotStyle={{ label: { '--reveal-delay': '0s' }, headline: { '--reveal-delay': '0.1s' }, body: { '--reveal-delay': '0.2s' } }}
      headline="Interlocking systems"
      headlineSize="heading-02"
      body={
        <>
          Kolkrabbi's process is based on observation: mapping problems, understanding and observing constraints, studying identities at component level, and rebuilding them with interlocking systems.
          <span className="block pt-4">
            Client services include identity creation, brand refresh, and product development. The end goal is to enable clients and collaborators with scalable concepts and modular tools that make future design choices intuitive and easy.
          </span>
        </>
      }
      media={
        <div className="flex items-center justify-center w-full">
          <div className="hidden md:block w-full"><ProfileCard {...cardProps} size="lg" orientation="horizontal" /></div>
          <div className="md:hidden w-full"><ProfileCard {...cardProps} size="lg" /></div>
        </div>
      }
      ratio="auto"
    />
  )
}

export default StudioProcessCard
