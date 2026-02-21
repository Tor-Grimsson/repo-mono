import { SectionLabel, useTheme } from '@kol/ui'
import SanityImage from '../../media/SanityImage'

export default function DetailHero({ project }) {
  const { theme } = useTheme()
  const isLight = theme === 'light'

  // Pick theme-appropriate video (default is dark, light is optional variant)
  const heroVideo = isLight && project.heroVideoLight?.url
    ? project.heroVideoLight
    : project.heroVideo

  // Pick theme-appropriate image (default is dark, light is optional variant)
  const heroImage = isLight && project.heroImageLight
    ? project.heroImageLight
    : project.heroImage

  const hasVideo = heroVideo?.url
  const hasImage = heroImage

  return (
    <div className="relative h-dvh flex flex-col justify-end overflow-hidden full-bleed">
      {/* Background Video or Image */}
      {hasVideo ? (
        <div className="absolute inset-0 z-0">
          <video
            src={heroVideo.url}
            poster={heroImage?.url}
            autoPlay
            muted
            loop
            playsInline
            disablePictureInPicture
            controlsList="nodownload nofullscreen noremoteplayback"
            className="w-full h-full object-cover pointer-events-none"
            style={{ objectFit: 'cover' }}
          />
        </div>
      ) : hasImage ? (
        <div className="absolute inset-0 z-0">
          <SanityImage
            image={heroImage}
            alt={project.title}
            width={2880}
            height={1920}
            className="w-full h-full object-cover"
          />
        </div>
      ) : null}

      {/* Content Overlay */}
      {/* <div className="relative z-10 py-12 px-6 md:px-8 flex flex-col gap-2">
        <div className="reveal" style={{ '--reveal-delay': '0.3s' }}>
          <SectionLabel text="Project" />
        </div>
        <h1 className="reveal kol-heading-display" style={{ '--reveal-delay': '0.4s' }}>
          / {project.title}
        </h1>
      </div> */}
    </div>
  )
}
