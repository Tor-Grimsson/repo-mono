import { SectionLabel } from '@kol/ui'
import SanityImage from '../../media/SanityImage'

export default function DetailHero({ project }) {
  const hasVideo = project.heroVideo?.url
  const hasImage = project.heroImage

  return (
    <div className="relative h-dvh flex flex-col justify-end overflow-hidden">
      {/* Background Video or Image */}
      {hasVideo ? (
        <div className="absolute inset-0 z-0">
          <video
            src={project.heroVideo.url}
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
            image={project.heroImage}
            alt={project.title}
            width={2880}
            height={1920}
            className="w-full h-full object-cover"
          />
        </div>
      ) : null}

      {/* Content Overlay */}
      <div className="relative z-10 py-12 flex flex-col gap-2 mix-blend-difference">
        <SectionLabel text="Project" />
        <h1 className="kol-heading-display">
          / {project.title}
        </h1>
      </div>
    </div>
  )
}
