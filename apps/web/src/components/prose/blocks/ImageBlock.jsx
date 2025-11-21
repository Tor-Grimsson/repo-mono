/**
 * ImageBlock - Render images with optional labels and captions
 *
 * Handles Sanity image blocks with semantic figure/figcaption markup
 * for accessibility and proper styling.
 *
 * @param {Object} value - Sanity image block data
 * @param {Object} value.asset - Image asset with URL
 * @param {string} value.alt - Alt text for accessibility
 * @param {string} value.label - Optional label (e.g., "Figure 1")
 * @param {string} value.caption - Optional caption text
 */
import SanityImage from '../../media/SanityImage'

export default function ImageBlock({ value }) {
  const { asset, alt, label, caption } = value

  if (!asset) return null

  return (
    <figure className="kol-prose-figure">
      {label && (
        <div className="kol-caption-label">
          {label}
        </div>
      )}
      <div className="border border-fg-08 rounded overflow-hidden">
        <SanityImage
          image={value}
          alt={alt || ''}
          className="w-full h-auto object-cover"
        />
      </div>
      {caption && (
        <figcaption className="kol-caption-text">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}
