import SanityImage from '../../common/SanityImage'

export default function ImageLayout({ images }) {
  if (!images || images.length === 0) {
    return null
  }

  return (
    <div className="py-6 space-y-4 md:py-8 lg:py-12 md:space-y-6">
      {images.length >= 4 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-6">
          {images.slice(0, 4).map((image, index) => (
            <div key={index} className="aspect-[3/2] bg-black/5 rounded-lg overflow-hidden">
              <SanityImage
                image={image}
                alt={image?.alt || `Project image ${index + 1}`}
                width={1400}
                height={933}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      )}

      {images.slice(4).map((image, index) => (
        <div key={index + 4} className="w-full h-[500px] md:h-[700px] lg:h-[896px] bg-black/5 rounded-lg overflow-hidden">
          <SanityImage
            image={image}
            alt={image?.alt || `Project image ${index + 5}`}
            width={2880}
            height={1792}
            className="w-full h-full object-cover"
          />
        </div>
      ))}

      {images.length < 4 && images.map((image, index) => (
        <div key={index} className="w-full h-[500px] md:h-[700px] lg:h-[896px] bg-black/5 rounded-lg overflow-hidden">
          <SanityImage
            image={image}
            alt={image?.alt || `Project image ${index + 1}`}
            width={2880}
            height={1792}
            className="w-full h-full object-cover"
          />
        </div>
      ))}
    </div>
  )
}
