import { Helmet } from 'react-helmet-async';

/**
 * SEO Component - Manages page metadata for SEO and social sharing
 *
 * @param {string} title - Page title (appears in browser tab and search results)
 * @param {string} description - Meta description (120-160 chars recommended)
 * @param {string} ogTitle - Open Graph title (for social media, defaults to title)
 * @param {string} ogDescription - Open Graph description (defaults to description)
 * @param {string} ogImage - Open Graph image URL (1200x630px recommended)
 * @param {string} ogType - Open Graph type (website, article, etc.)
 * @param {string} ogUrl - Canonical URL for this page
 * @param {string} twitterCard - Twitter card type (summary_large_image, summary)
 * @param {string} canonical - Canonical URL (defaults to ogUrl)
 */
export default function SEO({
  title,
  description,
  ogTitle,
  ogDescription,
  ogImage = 'https://kolkrabbi.io/img/open-graph/open-graph-01.png',
  ogType = 'website',
  ogUrl,
  twitterCard = 'summary_large_image',
  canonical,
}) {
  return (
    <Helmet>
      {/* Page Title */}
      <title>{title}</title>

      {/* Meta Description */}
      {description && <meta name="description" content={description} />}

      {/* Open Graph / Facebook */}
      <meta property="og:title" content={ogTitle || title} />
      {(ogDescription || description) && (
        <meta property="og:description" content={ogDescription || description} />
      )}
      <meta property="og:image" content={ogImage} />
      <meta property="og:type" content={ogType} />
      {ogUrl && <meta property="og:url" content={ogUrl} />}

      {/* Twitter Card */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={ogTitle || title} />
      {(ogDescription || description) && (
        <meta name="twitter:description" content={ogDescription || description} />
      )}
      <meta name="twitter:image" content={ogImage} />

      {/* Canonical URL */}
      {(canonical || ogUrl) && <link rel="canonical" href={canonical || ogUrl} />}
    </Helmet>
  );
}
