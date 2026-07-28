// Required React hooks
import { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { PortableText } from '@portabletext/react'
import { Divider, Tooltip } from "@kolkrabbi/kol-component";
import { Icon } from "@kolkrabbi/kol-icons";
import { SourcesReferences } from "@kolkrabbi/kol-content";
import StickyNavCard from "../components/prose/blocks/StickyNavCard";
import { AnimatePresence, motion } from 'framer-motion';
import { sanityClient } from '../lib/sanityClient'
import { BLOG_DETAIL } from '@kol/content/frontend'
import SEO from '../components/layout/SEO'
import { portableTextBlogComponents } from '../components/prose/core/PortableTextBlog'
import ArticleHeader from '../components/prose/layouts/ArticleHeader.jsx';
import CmsGlobal from '../components/sections/blog/CmsGlobal';

const StackArticle = () => {
  const { slug } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeSection, setActiveSection] = useState(0);

  // Generate slug from text for section IDs - must be before useMemo
  const slugify = (text) => {
    return text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '') // Remove special chars
      .replace(/\s+/g, '-') // Replace spaces with -
      .replace(/-+/g, '-') // Replace multiple - with single -
      .trim();
  };

  // Extract headings from article body (H2 and H3)
  const extractHeadings = (body) => {
    if (!body || !Array.isArray(body)) return [];
    const headings = [];
    body.forEach((block, index) => {
      if (block._type === 'block' && (block.style === 'h2' || block.style === 'h3')) {
        const text = block.children
          ?.map(child => child.text)
          .join(' ')
          .trim() || '';
        if (text) {
          const id = slugify(text);
          const level = block.style === 'h2' ? 2 : 3;
          headings.push({ id, text, level, index });
        }
      }
    });
    return headings;
  };

  // Build TOC sections from headings
  const buildTOCSections = (headings) => {
    if (!headings.length) return [];
    const sections = [];
    headings.forEach((heading, index) => {
      if (heading.level === 2) {
        const bullets = [];
        let nextIndex = index + 1;
        while (nextIndex < headings.length && headings[nextIndex].level === 3) {
          bullets.push(headings[nextIndex].text);
          nextIndex++;
        }
        sections.push({
          heading: heading.text,
          body: `Section: ${heading.text}`,
          bullets,
          index: sections.length,
          id: heading.id
        });
      }
    });
    return sections;
  };

  const tocSections = useMemo(() => {
    if (!article) {
      return [];
    }

    if (Array.isArray(article.toc) && article.toc.length > 0) {
      return article.toc.map((item, idx) => ({
        heading: item.title || `Section ${idx + 1}`,
        body: item.summary || '',
        bullets: Array.isArray(item.bullets) ? item.bullets.filter(Boolean) : [],
        index: idx,
        id: item.targetId?.current?.trim() ||
          (typeof item.targetId === 'string' ? item.targetId.trim() : slugify(item.title || `section-${idx + 1}`))
      }));
    }

    const headings = extractHeadings(article.body);
    return buildTOCSections(headings);
  }, [article]);

  // Scroll spy effect - defer until after render
  useEffect(() => {
    if (!tocSections.length) return;

    let observer;
    let handleScroll;
    let hasReachedEnd = false;

    const timeoutId = setTimeout(() => {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const id = entry.target.getAttribute('id');
              const sectionIndex = tocSections.findIndex((section) => section.id === id);
              if (sectionIndex !== -1) {
                setActiveSection(sectionIndex);
              }
            }
          });
        },
        { rootMargin: '-10% 0% -80% 0%' }
      );

      tocSections.forEach((section) => {
        if (!section.id) return;
        const element = document.getElementById(section.id);
        if (element) {
          observer.observe(element);
        }
      });

      handleScroll = () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const windowHeight = window.innerHeight;
        const docHeight = document.documentElement.scrollHeight;
        const scrollBottom = scrollTop + windowHeight;
        const threshold = docHeight - 50;

        if (scrollBottom >= threshold && !hasReachedEnd) {
          hasReachedEnd = true;
          setActiveSection(tocSections.length);
        }
      };

      window.addEventListener('scroll', handleScroll);
    }, 0);

    return () => {
      clearTimeout(timeoutId);
      if (observer) observer.disconnect();
      if (handleScroll) window.removeEventListener('scroll', handleScroll);
    };
  }, [tocSections]);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        setLoading(true);
        const data = await sanityClient.fetch(BLOG_DETAIL, { slug });

        if (!data) {
          setError('Article not found');
          return;
        }

        setArticle(data);
      } catch (err) {
        console.error('Error fetching article:', err);
        setError('Failed to load article');
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchArticle();
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="kol-mono-14">Loading article...</p>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="kol-mono-14 text-fg-64">{error || 'Article not found'}</p>
      </div>
    );
  }

  // Determine article type (default to 'standard' for backward compatibility)
  const articleType = article.type || 'standard';

  // Determine article type (default to 'standard' for backward compatibility)
  const headings = extractHeadings(article.body);

  // Format date and calculate reading time
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const calculateReadingTime = (body) => {
    if (!body || !Array.isArray(body)) return '5 min read';
    const wordsPerMinute = 200;
    const wordCount = body
      .filter(block => block._type === 'block')
      .reduce((count, block) => {
        return count + (block.children?.reduce((childCount, child) => {
          return childCount + (child.text?.split(' ').length || 0);
        }, 0) || 0);
      }, 0);
    const minutes = Math.ceil(wordCount / wordsPerMinute);
    return `${minutes} min read`;
  };

  // Format sources for SourcesReferences (numbers itself from array order)
  const formatSources = (sources) => {
    if (!sources || !Array.isArray(sources)) return [];

    return sources.map((source) => ({
      title: source.title,
      href: source.url,
      note: source.meta || ''
    }));
  };

  const articleSlug = article?.slug || slug;
  const articleTitle = article?.title || 'Stack article';
  const articleDescription = article?.excerpt || '';
  const getInlineImageUrl = (body) => {
    if (!Array.isArray(body)) return '';
    const imageBlock = body.find((block) => block?._type === 'image' && block?.asset?.url);
    return imageBlock?.asset?.url || '';
  };
  const articleImage =
    article?.thumbnail?.url ||
    article?.thumbnail?.asset?.url ||
    article?.coverImage?.url ||
    article?.coverImage?.asset?.url ||
    getInlineImageUrl(article?.body);
  const articleUrl = articleSlug ? `https://kolkrabbi.io/stack/${articleSlug}` : undefined;
  const shareUrl = articleUrl || '';
  const shareUrlForSocial = articleSlug ? `https://kolkrabbi.io/share/stack/${articleSlug}` : shareUrl;
  const shareTitle = articleTitle;
  const shareLinks = shareUrl
    ? [
        {
          id: 'twitter',
          label: 'Twitter',
          href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareTitle)}&url=${encodeURIComponent(shareUrlForSocial)}`,
          icon: 'social-twitter'
        },
        {
          id: 'linkedin',
          label: 'LinkedIn',
          href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrlForSocial)}`,
          icon: 'social-linkedin'
        },
        {
          id: 'meta',
          label: 'Meta',
          href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrlForSocial)}`,
          icon: 'social-facebook'
        }
      ]
    : [];

  // Standard Blog Post Layout (Single Column)
  const renderStandardLayout = () => (
    <>
      <SEO
        title={articleTitle}
        description={articleDescription}
        ogTitle={articleTitle}
        ogDescription={articleDescription}
        ogImage={articleImage || undefined}
        ogType="article"
        ogUrl={articleUrl}
        canonical={articleUrl}
      />
      <main id="main" className="min-h-screen w-full bg-surface-primary text-auto pt-42 breakpoint-padding">
        <ArticleHeader
          tags={article.tags || []}
          title={article.title}
          authorName={article.author?.name}
          authorTitle={article.author?.bio || 'Author'}
          authorImage={article.author?.image}
          date={formatDate(article.publishedAt)}
          readingTime={calculateReadingTime(article.body)}
          excerpt={article.excerpt}
          heroImage={article.coverImage?.url || article.coverImage?.asset?.url || 'placeholder'}
        />

        <Divider className=" w-full max-w-[1400px] mx-auto mt-16"/>


        <section className="py-16">
          <div className="max-w-[800px] mx-auto">
            <article className="space-y-12">
              {/* Main Content */}
              <div className="kol-prose-wide">
                {article.body ? (
                  <PortableText
                    value={article.body}
                    components={portableTextBlogComponents}
                  />
                ) : (
                  <p className="text-fg-64">No content available.</p>
                )}
              </div>

            {/* Sources & References */}
            {article.sources && article.sources.length > 0 && (
              <div className="mt-8">
                <SourcesReferences
                  title="Sources & References"
                  sources={formatSources(article.sources)}
                />
              </div>
            )}
            {shareLinks.length > 0 && (
              <div className="flex flex-wrap items-center gap-3 pt-4">
                <span className="kol-mono-10 uppercase text-fg-48">Share</span>
                {shareLinks.map((link) => (
                  <Tooltip key={link.id} label={`Share on ${link.label}`}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Share on ${link.label}`}
                      className="inline-flex items-center justify-center border border-fg-08 rounded-full p-2 text-fg-64 hover:text-fg transition-colors"
                    >
                      <Icon name={link.icon} size={16} className="text-current" />
                    </a>
                  </Tooltip>
                ))}
              </div>
            )}
          </article>
        </div>
      </section>

        <div className="my-24">
          <Divider>
            <p className="kol-mono-10 uppercase text-fg-48 px-4 text-center">End</p>
          </Divider>
        </div>

        <CmsGlobal />
      </main>
    </>
  );

  // Research Article Layout (Two Column)
  const renderResearchLayout = () => (
    <>
      <SEO
        title={articleTitle}
        description={articleDescription}
        ogTitle={articleTitle}
        ogDescription={articleDescription}
        ogImage={articleImage || undefined}
        ogType="article"
        ogUrl={articleUrl}
        canonical={articleUrl}
      />
      <main id="main" className="min-h-screen w-full bg-surface-primary text-auto pt-42 breakpoint-padding">
        {/* Article Header */}
        <ArticleHeader
          tags={article.tags || []}
          title={article.title}
          authorName={article.author?.name}
          authorTitle={article.author?.bio || 'Author'}
          authorImage={article.author?.image}
          date={formatDate(article.publishedAt)}
          readingTime={calculateReadingTime(article.body)}
          excerpt={article.excerpt}
          heroImage={article.coverImage?.url || article.coverImage?.asset?.url || 'placeholder'}
        />

        <Divider className=" w-full max-w-[1400px] mx-auto my-8"/>

        {/* Main Content Area */}
        <section className="py-16">
          <div className="max-w-[1400px] mx-auto grid gap-6 lg:grid-cols-[minmax(0,360px)_minmax(0,1fr)] xl:grid-cols-[minmax(0,529px)_minmax(0,1fr)] lg:gap-10">


            {/* Left Column: Table of Contents (hidden on mobile) */}
            <aside className="hidden lg:block space-y-8">


              {/* STICKY */}
              <div className="lg:sticky lg:top-16">
                <div className="space-y-3 mb-6">
                  <h2 className="kol-sans-heading-05 uppercase">In this article</h2>
                  <p className="kol-mono-12 text-fg-64">
                    A condensed outline to guide your reading experience.
                  </p>
                </div>

                {tocSections.length > 0 ? (
                  <div className="flex flex-col gap-3 relative">
                    <AnimatePresence>
                      {tocSections.map((section, index) => {
                        const isActive = index === activeSection;
                        const collapsed = index < activeSection;

                        const OVERLAP_PX = 40;
                        const shouldOverlap = index < activeSection && index > 0;

                      return (
                        <motion.div
                          key={section.id}
                          className="relative"
                          style={{
                            marginTop: shouldOverlap ? -OVERLAP_PX : undefined,
                            zIndex: index + 1
                          }}
                          layout
                          initial={{ opacity: 0, y: -12 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -12 }}
                          transition={{ duration: 0.8, ease: [0.2, 0, 0.2, 1] }}
                        >
                          <StickyNavCard
                            heading={section.heading}
                            body={section.body}
                            bullets={section.bullets}
                            index={index}
                            isActive={isActive}
                            collapsed={collapsed}
                            onClick={() => {
                              const element = document.getElementById(section.id);
                              if (element) {
                                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                              }
                            }}
                            className="bg-surface-primary"
                          />
                        </motion.div>
                      );
                      })}
                    </AnimatePresence>
                  </div>
                ) : (
                  <p className="kol-mono-12 text-fg-64">
                    No sections found. Add H2 headings to your article to build a table of contents.
                  </p>
                )}
              </div>
            </aside>

            {/* Right Column: Article Content */}
            <article className="space-y-12 pt-0 w-full min-w-0">
              {/* Main Prose Content */}
              <div className="kol-prose pt-0 research-article-prose">
                <style>{`
                  .research-article-prose h1:first-of-type,
                  .research-article-prose h2:first-of-type {
                    margin-block-start: 0 !important;
                  }
                  .research-article-prose {
                    scroll-behavior: smooth;
                    max-width: 100%;
                  }
                `}</style>
                {article.body ? (
                  <PortableText
                    value={article.body}
                    components={portableTextBlogComponents}
                  />
                ) : (
                  <p className="text-fg-64">No content available.</p>
                )}
              </div>

            {/* Sources & References */}
            {article.sources && article.sources.length > 0 && (
              <div className="mt-8">
                <SourcesReferences
                  title="Sources & References"
                  sources={formatSources(article.sources)}
                />
              </div>
            )}
            {shareLinks.length > 0 && (
              <div className="flex flex-wrap items-center gap-3 pt-4">
                <span className="kol-mono-10 uppercase text-fg-48">Share</span>
                {shareLinks.map((link) => (
                  <Tooltip key={link.id} label={`Share on ${link.label}`}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Share on ${link.label}`}
                      className="inline-flex items-center justify-center border border-fg-08 rounded-full p-2 text-fg-64 hover:text-fg transition-colors"
                    >
                      <Icon name={link.icon} size={16} className="text-current" />
                    </a>
                  </Tooltip>
                ))}
              </div>
            )}
          </article>
        </div>
      </section>

        <div className="mt-12 mb-24 max-w-[1400px] mx-auto">
          <Divider>
            <p className="kol-mono-10 uppercase text-fg-48 px-4 text-center">End</p>
          </Divider>
        </div>

        <CmsGlobal />
      </main>
    </>
  );

  // Render based on article type
  return articleType === 'research' ? renderResearchLayout() : renderStandardLayout();
};

export default StackArticle;
