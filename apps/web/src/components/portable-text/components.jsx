import { CodeBlock } from '@kolkrabbi/kol-component'
import TableBlock from '../prose/blocks/TableBlock'
import VideoBlock from '../prose/blocks/VideoBlock'

/**
 * Custom PortableText components for blog rendering
 * Maps Sanity block types to React components with proper styling
 */
export const portableTextComponents = {
  types: {
    // Code blocks with syntax highlighting (using @sanity/code-input type)
    code: CodeBlock,

    // Images with optional label and caption
    image: ({ value }) => {
      const { asset, alt, label, caption } = value
      if (!asset) return null

      return (
        <figure className="kol-prose-figure">
          {label && <div className="kol-caption-label">{label}</div>}
          <img
            src={asset.url}
            alt={alt || ''}
            loading="lazy"
          />
          {caption && <figcaption className="kol-caption-text">{caption}</figcaption>}
        </figure>
      )
    },

    tableBlock: TableBlock,

    videoBlock: VideoBlock
  },

  marks: {
    // Links with proper styling from prose.css
    link: ({ value, children }) => {
      const target = (value?.href || '').startsWith('http') ? '_blank' : undefined
      return (
        <a
          href={value?.href}
          target={target}
          rel={target === '_blank' ? 'noopener noreferrer' : undefined}
        >
          {children}
        </a>
      )
    },
  },

  block: {
    // Normal paragraphs - handled by .kol-prose p
    normal: ({ children }) => <p>{children}</p>,

    // Headings - handled by .kol-prose h2, h3, h4
    h2: ({ children }) => <h2>{children}</h2>,
    h3: ({ children }) => <h3>{children}</h3>,
    h4: ({ children }) => <h4>{children}</h4>,

    // Blockquotes - handled by .kol-prose blockquote
    blockquote: ({ children }) => <blockquote>{children}</blockquote>,

    // Caption style - handled by .kol-prose .caption
    caption: ({ children }) => <p className="caption">{children}</p>,
  },

  list: {
    // Lists - handled by .kol-prose ul, ol
    bullet: ({ children }) => <ul>{children}</ul>,
    number: ({ children }) => <ol>{children}</ol>,
  },

  listItem: {
    // List items - handled by .kol-prose li
    bullet: ({ children }) => <li>{children}</li>,
    number: ({ children }) => <li>{children}</li>,
  },
}

export default portableTextComponents
