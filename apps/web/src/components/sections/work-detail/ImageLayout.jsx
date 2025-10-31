import SanityImage from '../../media/SanityImage'
import WorkSection from '../work/WorkSection'

export default function ImageLayout({ images = [] }) {
  if (!images || images.length === 0) {
    return null
  }

  return (
    <div className="w-full max-w-[1200px] mx-auto flex flex-col gap-8 py-8">
      <WorkSection label="Project Gallery" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {images.map((image, index) => {
          const isFirstCard = index === 0
          const isLastCard = index === images.length - 1
          const shouldSpanTwo = isFirstCard || (isLastCard && images.length % 2 === 0)

          return (
            <div
              key={index}
              className={`bg-black/5 rounded overflow-hidden ${
                isFirstCard ? 'md:col-span-2 md:row-span-2' :
                isLastCard && images.length % 2 === 0 ? 'md:col-span-2 md:row-span-2' :
                'aspect-[3/2]'
              }`}
            >
              <SanityImage
                image={image}
                alt={image?.alt || `Project image ${index + 1}`}
                width={shouldSpanTwo ? 2880 : 1400}
                height={shouldSpanTwo ? 1920 : 933}
                className="w-full h-full object-cover"
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}
