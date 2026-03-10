import SanityImage from '../../media/SanityImage'

/**
 * Standardised aspect ratios:
 *  - 2:1  → full-width landscape (hero/cinematic)
 *  - 4:5  → portrait pairs (side-by-side)
 *  - 4:3  → desktop landscape (single or paired)
 *
 * Repeating pattern per 6 images:
 *  0:   full-width 2:1
 *  1,2: two 4:5 portraits side-by-side
 *  3:   full-width 4:3
 *  4,5: two 4:5 portraits side-by-side
 */
const PATTERN = [
  { span: 2, aspect: '2/1', width: 2880, height: 1440 },
  { span: 1, aspect: '4/5', width: 1400, height: 1750 },
  { span: 1, aspect: '4/5', width: 1400, height: 1750 },
  { span: 2, aspect: '4/3', width: 2880, height: 2160 },
  { span: 1, aspect: '4/5', width: 1400, height: 1750 },
  { span: 1, aspect: '4/5', width: 1400, height: 1750 },
]

function getLayout(index) {
  return PATTERN[index % PATTERN.length]
}

export default function ImageMasonry({ images = [], projectTitle = '' }) {
  if (!images || images.length === 0) {
    return null
  }

  return (
    <div className="w-full max-w-[1800px] mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {images.map((image, index) => {
          const layout = getLayout(index)
          const isFullWidth = layout.span === 2

          return (
            <div
              key={index}
              className={`overflow-hidden bg-black/5 ${isFullWidth ? 'md:col-span-2' : ''}`}
              style={{ aspectRatio: layout.aspect }}
            >
              <SanityImage
                image={image}
                alt={image?.alt || `${projectTitle} ${index + 1}`}
                width={layout.width}
                height={layout.height}
                className="w-full h-full object-cover"
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}
