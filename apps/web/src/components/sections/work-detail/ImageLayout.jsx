import { Divider } from '@kol/ui'
import SanityImage from '../../media/SanityImage'
import WorkSection from '../work/WorkSection'

export default function ImageLayout({ images = [] }) {
  if (!images || images.length === 0) {
    return null
  }

  return (
    <div className="w-full max-w-[1400px] mx-auto flex flex-col gap-8 py-8">
      {/* <WorkSection label="Project Gallery" /> */}
      <Divider />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {images.map((image, index) => {
          // Layout: big, big, 2x2, big, 2x2, big...
          // First 2 are big, then every 5th after that (4 grid + 1 big)
          const isFullWidth = index < 2 || (index - 2) % 5 === 4

          return (
            <div
              key={index}
              className={`bg-black/5 rounded overflow-hidden ${
                isFullWidth ? 'md:col-span-2 aspect-[2/1]' : 'aspect-[2/1]'
              }`}
            >
              <SanityImage
                image={image}
                alt={image?.alt || `Project image ${index + 1}`}
                width={isFullWidth ? 2880 : 1400}
                height={isFullWidth ? 1440 : 700}
                className="w-full h-full object-cover"
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}
