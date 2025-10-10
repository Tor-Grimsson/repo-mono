import SanityImage from '../../media/SanityImage'

export default function FeatureImage({ image, alt }) {
  return (
    <div className="w-full h-[500px] md:h-[700px] lg:h-[960px] bg-black/5 rounded-lg overflow-hidden">
      <SanityImage
        image={image}
        alt={alt}
        width={2880}
        height={1920}
        className="w-full h-full object-cover"
      />
    </div>
  )
}
