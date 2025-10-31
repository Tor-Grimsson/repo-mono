import { SectionLabel } from '@kol/ui'
import SanityImage from '../../media/SanityImage'

export default function DetailHero({ project }) {
  return (
    <div className="relative h-dvh flex flex-col justify-end overflow-hidden">
      {/* Background Image */}
      {project.heroImage && (
        <div className="absolute inset-0 z-0">
          <SanityImage
            image={project.heroImage}
            alt={project.title}
            width={2880}
            height={1920}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Content Overlay */}
      <div className="relative z-10 p-12 flex flex-col gap-2 mix-blend-difference">
        <SectionLabel text={project.client} />
        <h1 className="kol-heading-display">
          / {project.title}
        </h1>
      </div>
    </div>
  )
}
