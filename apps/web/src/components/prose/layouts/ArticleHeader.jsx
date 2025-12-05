import { Pill } from "@kol/ui";

// Helper to construct proper Sanity image URLs
const buildSanityImageUrl = (url, width = 1200, height = null) => {
  if (!url || typeof url !== 'string') return null;

  // If already a full URL with params, return as-is
  if (url.includes('?')) return url;

  // Add Sanity image query parameters
  const params = new URLSearchParams();
  params.set('w', width.toString());
  if (height) params.set('h', height.toString());
  params.set('fit', 'crop');
  params.set('crop', 'center');
  params.set('auto', 'format');

  return `${url}?${params.toString()}`;
};

const resolveImageUrl = (image) => {
  if (!image) return null;
  if (typeof image === 'string') {
    if (!image || image === 'placeholder') return null;
    return image;
  }
  if (typeof image.url === 'string') return image.url;
  if (image.asset?.url) return image.asset.url;
  return null;
};

/**
 * ArticleHeader Component
 *
 * Complete header section for articles with pills, title, author info, and hero image
 *
 * @param {Object} props
 * @param {Array<string>} props.tags - Array of tag/pill labels
 * @param {string} props.title - Main article title
 * @param {string} props.authorName - Author name
 * @param {string} props.authorTitle - Author title/role
 * @param {string} props.date - Publication date
 * @param {string} props.readingTime - Estimated reading time
 * @param {string} props.excerpt - Article excerpt
 * @param {string} props.heroImage - Hero image URL (optional)
 * @param {Object} props.authorImage - Author image object from Sanity (optional)
 */
const ArticleHeader = ({
  tags = [],
  title,
  authorName,
  authorTitle,
  date,
  readingTime,
  excerpt,
  heroImage,
  authorImage
}) => {
  return (
    <header className="pb-12">
      <div className="max-w-[1400px] mx-auto flex flex-col">


        {/* Tags/Pills - sm below lg, md at lg+ */}
        {tags.length > 0 && (
          <>
            <div className="reveal flex lg:hidden flex-wrap items-center gap-2 pb-6" style={{ '--reveal-delay': '0s' }}>
              {tags.map((tag, index) => (
                <Pill key={index} variant="inverse" size="sm">
                  {tag}
                </Pill>
              ))}
            </div>
            <div className="reveal hidden lg:flex flex-wrap items-center gap-2 pb-6" style={{ '--reveal-delay': '0s' }}>
              {tags.map((tag, index) => (
                <Pill key={index} variant="inverse" size="md">
                  {tag}
                </Pill>
              ))}
            </div>
          </>
        )}

        {/* Title */}
        <div className="flex flex-col gap-6">
          <h1 className="reveal kol-heading-display text-balance" style={{ '--reveal-delay': '0.1s' }}>{title}</h1>

          {/* Author/Date/Reading Time */}
          <div className="reveal flex flex-wrap items-center gap-6 text-fg-64 pb-3" style={{ '--reveal-delay': '0.2s' }}>
            <div className="flex items-center gap-4">
              {resolveImageUrl(authorImage) ? (
                <img
                  src={buildSanityImageUrl(resolveImageUrl(authorImage), 96, 96)}
                  alt={authorName || 'Author'}
                  className="w-12 h-12 rounded-full object-cover"
                />
              ) : (
                <div className="w-12 h-12 rounded-full bg-surface-secondary"></div>
              )}
              <div className="flex flex-col">
                <span className="kol-helper-s uppercase text-fg-48">
                  {authorName}
                </span>
                <span className="kol-mono-xs text-fg-64">{authorTitle}</span>
              </div>
            </div>
            <div className="flex items-center gap-3 kol-helper-s uppercase text-fg-48">
              <span>{date}</span>
              <span>• {readingTime}</span>
            </div>
          </div>

          {/* Excerpt */}
          {excerpt && (
            <div className="reveal pb-4 w-[80%]" style={{ '--reveal-delay': '0.25s' }}>
              <p className="kol-mono-text text-fg-64">{excerpt}</p>
            </div>
          )}

          {/* Hero Image */}
          {resolveImageUrl(heroImage) ? (
            <div className="reveal rounded overflow-hidden border border-fg-08" style={{ '--reveal-delay': '0.3s' }}>
              <img
                src={buildSanityImageUrl(resolveImageUrl(heroImage), 1200, 600)}
                alt=""
                className="w-full aspect-[4/2] object-cover"
              />
            </div>
          ) : heroImage ? (
            <div className="reveal rounded overflow-hidden border border-fg-08" style={{ '--reveal-delay': '0.3s' }}>
              <div className="w-full aspect-[4/2]" />
            </div>
          ) : null}
        </div>
      </div>
    </header>
  );
};

export default ArticleHeader;
