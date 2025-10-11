import React, { useEffect } from 'react';

const Styles = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const progressBar = document.getElementById('progress');
    if (progressBar) {
      progressBar.style.width = '0%';
    }
  }, []);

  return (
    <article className="post">
      <header>
        <div className="eyebrow">Style Guide</div>
        <h1>Design System Reference</h1>
        <div className="meta">
          <span>All styles and components</span>
        </div>
      </header>

      <div className="body">
        <p>
          This page showcases all the typographic styles, components, and design elements used throughout the site. Use this as a reference for maintaining visual consistency.
        </p>

        <h2>Typography Scale</h2>
        <p>
          Our type system uses fluid scaling with clamp() to ensure readability across all devices. All sizes scale proportionally between minimum and maximum values based on viewport width.
        </p>

        <div className="code-block-wrapper">
          <div className="code-label">CSS Variables — Type Scale</div>
          <pre className="code-block">
            <code className="language-css">
{`:root {
  --h1: clamp(44px, 6vw, 88px);
  --h2: clamp(28px, 3.6vw, 48px);
  --h3: clamp(20px, 2.2vw, 28px);
  --lead: clamp(18px, 1.7vw, 22px);
  --body: clamp(16px, 1.2vw, 18px);
}`}
            </code>
          </pre>
          <div className="code-caption">
            Fluid typography scales smoothly from mobile (min) to desktop (max)
          </div>
        </div>

        <h3>H1 — Page Title</h3>
        <h1 style={{ marginTop: '0.5em', marginBottom: '0.5em' }}>
          This is a Heading 1
        </h1>
        <div className="code-block-wrapper">
          <pre className="code-block">
            <code className="language-css">
{`h1 {
  font-size: clamp(44px, 6vw, 88px);
  line-height: 0.95;
  letter-spacing: -0.01em;
  margin: 0.3em 0 0.2em;
}`}
            </code>
          </pre>
        </div>

        <h3>H2 — Section Heading</h3>
        <h2 style={{ marginTop: '0.5em', marginBottom: '0.5em' }}>
          This is a Heading 2
        </h2>
        <div className="code-block-wrapper">
          <pre className="code-block">
            <code className="language-css">
{`h2 {
  font-size: clamp(28px, 3.6vw, 48px);
  margin: 1.4em 0 0.4em;
}`}
            </code>
          </pre>
        </div>

        <h3>H3 — Subsection Heading</h3>
        <h3 style={{ marginTop: '0.5em', marginBottom: '0.5em' }}>
          This is a Heading 3
        </h3>
        <div className="code-block-wrapper">
          <pre className="code-block">
            <code className="language-css">
{`h3 {
  font-size: clamp(20px, 2.2vw, 28px);
  margin: 1.2em 0 0.3em;
}`}
            </code>
          </pre>
        </div>

        <h3>Body Text & Lead</h3>
        <p style={{ fontSize: 'var(--lead)', marginTop: '0.5em', marginBottom: '0.5em' }}>
          This is lead text — slightly larger than body copy, used for introductions and emphasis.
        </p>
        <p style={{ marginTop: '0.5em', marginBottom: '0.5em' }}>
          This is standard body text with <strong>bold text</strong> and <em>italic text</em>. Body copy is set at a comfortable reading size with generous line-height (1.45) for improved readability.
        </p>
        <div className="code-block-wrapper">
          <pre className="code-block">
            <code className="language-css">
{`/* Lead paragraph */
.lead {
  font-size: clamp(18px, 1.7vw, 22px);
}

/* Body text */
body {
  font-size: clamp(16px, 1.2vw, 18px);
  line-height: 1.45;
  letter-spacing: 0.01em;
}`}
            </code>
          </pre>
        </div>

        <h3>Eyebrow & Labels</h3>
        <div className="eyebrow" style={{ marginTop: '0.5em', marginBottom: '0.5em' }}>
          This is an Eyebrow Label
        </div>
        <div className="code-block-wrapper">
          <pre className="code-block">
            <code className="language-css">
{`.eyebrow {
  font: 700 12px / 1 var(--mono);
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--muted);
}`}
            </code>
          </pre>
        </div>

        <h2>Links & References</h2>
        <p>
          Inline links are styled with subtle underlines and hover effects. For example, here's a link to{' '}
          <a href="https://developer.mozilla.org" target="_blank" rel="noopener noreferrer">
            MDN Web Docs
          </a>
          . External links automatically get an arrow icon.
        </p>

        <h2>Blockquotes</h2>
        <blockquote>
          Design is not just what it looks like and feels like. Design is how it works.
        </blockquote>
        <p>Blockquotes are styled with a left border and italic text to set them apart from body copy.</p>

        <h2>Code Examples</h2>
        <p>
          Inline code snippets like <code data-token>--color-primary</code> and{' '}
          <code data-token>font-size: clamp()</code> are highlighted with a subtle background.
        </p>

        <h3>Code Block with Label</h3>
        <div className="code-block-wrapper">
          <div className="code-label">Example — CSS Variables</div>
          <pre className="code-block">
            <code className="language-css">
{`:root {
  --bg: #faf8f5;
  --fg: #111111;
  --space-lg: clamp(22px, 3vw, 40px);
  --h1: clamp(44px, 6vw, 88px);
}`}
            </code>
          </pre>
          <div className="code-caption">
            Define design tokens as CSS custom properties for easy theming
          </div>
        </div>

        <div className="code-block-wrapper">
          <div className="code-label">Example — React Component</div>
          <pre className="code-block">
            <code className="language-jsx">
{`const Button = ({ children, variant = 'primary' }) => {
  return (
    <button className={\`btn btn-\${variant}\`}>
      {children}
    </button>
  );
};`}
            </code>
          </pre>
          <div className="code-caption">
            A simple reusable button component with variant support
          </div>
        </div>

        <h2>Images with Labels</h2>
        <figure className="post-image">
          <div className="image-label">Figure 1 — Design System</div>
          <img
            src="https://images.unsplash.com/photo-1558655146-9f40138edfeb?q=80&w=1600&auto=format&fit=crop"
            alt="Design system components"
          />
          <figcaption className="meta" style={{ marginTop: '8px' }}>
            A well-organized component library with consistent patterns
          </figcaption>
        </figure>

        <h2>Labels & Captions</h2>
        <p>
          Code blocks and images can have labels (shown above the element) and captions (shown below). Labels use uppercase monospace with a small indicator, while captions provide additional context in a muted, italic style.
        </p>

        <h2>Spacing & Rhythm</h2>
        <p>
          Consistent spacing creates visual hierarchy and improves readability. We use a fluid spacing scale that adapts to viewport size:
        </p>
        <div className="code-block-wrapper">
          <pre className="code-block">
            <code className="language-css">
{`--space: clamp(14px, 1.6vw, 22px);
--space-lg: clamp(22px, 3vw, 40px);
--space-xl: clamp(34px, 5vw, 72px);`}
            </code>
          </pre>
        </div>

        <h2>Card Components</h2>
        <p>
          Cards are the primary content containers used throughout the site. They include hero cards for featured content and article cards for regular content.
        </p>

        <h3>Hero Cards</h3>
        <p>
          Hero cards are displayed prominently at the top of the home page. The primary hero (left) features large text, while the secondary hero (right) includes an image.
        </p>

        <div style={{ marginTop: 'var(--space-lg)', marginBottom: 'var(--space-lg)' }}>
          <div className="hero">
            <article className="hero-card">
              <div className="eyebrow">Feature</div>
              <h1>Type and technology, beautifully aligned.</h1>
              <p className="summary" style={{ fontSize: 'var(--lead)', color: 'var(--muted)' }}>
                Exploring typography, product design, and the culture around the things we make.
              </p>
              <div className="meta">
                <span>Updated Oct 8, 2025</span>
                <span>8 min read</span>
              </div>
            </article>

            <article className="card">
              <div className="card-media" style={{ aspectRatio: '3 / 2' }}>
                <img src="https://images.unsplash.com/photo-1526318472351-c75fcf070305?q=80&w=1600&auto=format&fit=crop" alt="Abstract typographic scene" />
              </div>
              <div className="card-body">
                <div className="kicker">Design</div>
                <div className="title" style={{ fontSize: 'var(--h2)' }}>How brutalist type can feel friendly</div>
                <p className="summary">Borrowing the high-contrast, big-type energy while keeping the content tidy and approachable.</p>
                <div className="meta">
                  <span>Oct 3, 2025</span>
                  <span>5 min read</span>
                </div>
              </div>
            </article>
          </div>
        </div>

        <h3>Article Cards</h3>
        <p>
          Article cards are used in the main content grid. They feature an image, category label, title, summary, and metadata.
        </p>

        <div style={{ marginTop: 'var(--space-lg)', marginBottom: 'var(--space-lg)' }}>
          <div className="grid">
            <article className="card">
              <div className="card-media">
                <img src="https://images.unsplash.com/photo-1529336953121-ad5a0d43d0f5?q=80&w=1600&auto=format&fit=crop" alt="Grids" />
              </div>
              <div className="card-body">
                <div className="kicker">Design</div>
                <div className="title">Grids that breathe: spacing systems that scale</div>
                <p className="summary">A pragmatic guide to vertical rhythm and spatial scales that adapt from mobile to widescreen.</p>
                <div className="meta">
                  <span>Oct 1, 2025</span>
                  <span>6 min read</span>
                </div>
              </div>
            </article>

            <article className="card">
              <div className="card-media">
                <img src="https://images.unsplash.com/photo-1518779578993-ec3579fee39f?q=80&w=1600&auto=format&fit=crop" alt="Pipelines" />
              </div>
              <div className="card-body">
                <div className="kicker">Tech</div>
                <div className="title">From render to reality: fast pipelines for teams</div>
                <p className="summary">Ship beautiful frontends faster with component tokens, CSS variables, and strong editorial patterns.</p>
                <div className="meta">
                  <span>Sep 27, 2025</span>
                  <span>4 min read</span>
                </div>
              </div>
            </article>

            <article className="card">
              <div className="card-media">
                <img src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1600&auto=format&fit=crop" alt="Sustainable" />
              </div>
              <div className="card-body">
                <div className="kicker">Environment</div>
                <div className="title">Sustainable defaults: lighter pages, happier readers</div>
                <p className="summary">Performance is part of the planet: designing for smaller payloads and calmer energy usage.</p>
                <div className="meta">
                  <span>Sep 19, 2025</span>
                  <span>7 min read</span>
                </div>
              </div>
            </article>
          </div>
        </div>

        <h2>Sources & References</h2>
        <p>
          Articles can include a sources section at the end with numbered references. Each source is displayed as a card with hover effects.
        </p>
      </div>

      <div className="sources">
        <div className="sources-title">Example Sources</div>
        <ul className="sources-list">
          <li className="source-item">
            <div className="source-number">[1]</div>
            <div className="source-content">
              <a
                href="https://refactoringui.com"
                target="_blank"
                rel="noopener noreferrer"
                className="source-title"
              >
                Refactoring UI — Design Best Practices
              </a>
              <div className="source-meta">Adam Wathan & Steve Schoger</div>
            </div>
          </li>
          <li className="source-item">
            <div className="source-number">[2]</div>
            <div className="source-content">
              <a
                href="https://atomicdesign.bradfrost.com"
                target="_blank"
                rel="noopener noreferrer"
                className="source-title"
              >
                Atomic Design Methodology
              </a>
              <div className="source-meta">Brad Frost</div>
            </div>
          </li>
          <li className="source-item">
            <div className="source-number">[3]</div>
            <div className="source-content">
              <a
                href="https://developer.mozilla.org/en-US/docs/Web/CSS"
                target="_blank"
                rel="noopener noreferrer"
                className="source-title"
              >
                CSS Documentation & Reference
              </a>
              <div className="source-meta">MDN Web Docs</div>
            </div>
          </li>
        </ul>
      </div>
    </article>
  );
};

export default Styles;
