import React from 'react'
import ImageItem from '../foundry-atoms/ImageItem'

const ImageSection = ({
  // Single image props
  src,
  alt,
  className,
  aspectRatio,
  objectFit,
  useClampedRadius,
  // Multiple images prop
  images
}) => {
  // Single image mode
  if (src && !images) {
    return (
      <section className="h-full">
        <ImageItem
          src={src}
          alt={alt}
          className={className}
          aspectRatio={aspectRatio}
          objectFit={objectFit}
          useClampedRadius={useClampedRadius}
        />
      </section>
    )
  }

  // Multiple images mode
  if (images && Array.isArray(images)) {
    return (
      <section className="w-full h-auto flex flex-col md:flex-row lg:flex-row gap-4 items-start">
        {images.map((image, index) => (
          <div
            key={index}
            className={`w-full md:w-1/${images.length} lg:w-1/${images.length} ${image.aspectRatio || 'aspect-[4/5]'}`}
          >
            <ImageItem
              src={image.src}
              alt={image.alt}
              className={image.className}
              aspectRatio={image.aspectRatio}
              objectFit={image.objectFit}
              useClampedRadius={image.useClampedRadius}
            />
          </div>
        ))}
      </section>
    )
  }

  return null
}

export default ImageSection
