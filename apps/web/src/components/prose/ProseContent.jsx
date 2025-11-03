import { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Icon } from '@kol/ui';

// Inline check-mark SVG
const CheckMarkIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M19.4697 6.41987C19.7626 6.12697 20.2373 6.12697 20.5302 6.41987C20.8231 6.71276 20.8231 7.18752 20.5302 7.48041L10.9443 17.0663C9.87038 18.1401 8.12951 18.1401 7.05561 17.0663L3.46967 13.4804C3.17678 13.1875 3.17678 12.7128 3.46967 12.4199C3.76256 12.127 4.23732 12.127 4.53022 12.4199L8.11615 16.0058C8.60427 16.4938 9.39561 16.4938 9.88373 16.0058L19.4697 6.41987Z" fill="currentColor"/>
  </svg>
);

// Variant-specific component selector
const CodeBlockWrapper = ({ code, variant = 'default' }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Get classes based on variant
  const getVariantClasses = () => {
    switch (variant) {
      case 'wide':
        return {
          container: 'simple-code-block',
          header: 'simple-code-header',
          inner: 'simple-code-inner',
          button: 'simple-copy-button',
          padding: '1.5rem',
          fontSize: '14px',
          lineHeight: '1.6',
        };
      case 'compact':
        return {
          container: 'simple-code-block-compact',
          header: 'simple-code-header-compact',
          inner: 'simple-code-inner-compact',
          button: 'simple-copy-button-compact',
          padding: '0.875rem',
          fontSize: '12px',
          lineHeight: '1.4',
        };
      default:
        return {
          container: 'simple-code-block-default',
          header: 'simple-code-header-default',
          inner: 'simple-code-inner-default',
          button: 'simple-copy-button-default',
          padding: '1.25rem',
          fontSize: '14px',
          lineHeight: '1.5',
        };
    }
  };

  const classes = getVariantClasses();

  return (
    <div className={classes.container}>
      <div className={classes.inner}>
        <SyntaxHighlighter
          language="text"
          style={oneDark}
          customStyle={{
            margin: 0,
            padding: 0,
            background: 'transparent',
            fontSize: classes.fontSize,
            lineHeight: classes.lineHeight,
          }}
          PreTag="pre"
        >
          {code}
        </SyntaxHighlighter>
        <button
          className={classes.button}
          onClick={handleCopy}
          aria-label={copied ? 'Code copied!' : 'Copy code'}
          title={copied ? 'Code copied!' : 'Copy code'}
        >
          {copied ? <CheckMarkIcon /> : <Icon name="copy" size={16} />}
        </button>
      </div>
    </div>
  );
};

const ProseContent = ({ variant = 'default' }) => {
  const variantClass =
    variant === 'wide'
      ? 'kol-prose-wide'
      : variant === 'compact'
      ? 'kol-prose-compact'
      : 'kol-prose';

  const proseCodeExamples = {
    bash: `curl -sSL https://get.kolkrabbi.dev | bash

# Install dependencies
yarn install

# Start development server
yarn dev:web`,

    jsx: `import React from 'react'
import { DesPage, DesSection } from '@kol/ui'

const Example = () => {
  return (
    <DesPage
      title="Prose System"
      subtitle="Typography for long-form content"
      meta="8px baseline grid · Responsive clamp()"
    >
      <DesSection
        name="Typography"
        description="Core type system"
        details="Scale · Rhythm · Readability"
      />
    </DesPage>
  )
}`,

    css: `/* Prose Typography System */
.kol-prose {
  max-width: 65ch;
  margin-inline: auto;
  line-height: 1.6;
}

.kol-prose h1 {
  font-size: clamp(48px, 6vw, 64px);
  line-height: 1.1;
  font-weight: 500;
  text-transform: uppercase;
  margin-block: 2rem 1.5rem;
}

.kol-prose h2 {
  font-size: clamp(32px, 4vw, 40px);
  line-height: 1.2;
  margin-block: 2rem 1rem;
}

.kol-prose p {
  font-size: clamp(16px, 1.8vw, 18px);
  margin-block: 1rem;
}`,

    json: `{
  "prose": {
    "variants": ["default", "wide", "compact"],
    "maxWidth": {
      "default": "65ch",
      "wide": "90ch",
      "compact": "45ch"
    },
    "typography": {
      "scale": 1.25,
      "baseline": 8
    }
  }
}`,

    tree: `kolkrabbi/
├── apps/
│   ├── web/
│   │   └── src/
│   │       ├── components/
│   │       │   ├── prose/
│   │       │   │   ├── ProseContent.jsx
│   │       │   │   └── layouts/
│   │       │   └── styleguide/
│   │       └── routes/
│   └── foundry/
├── packages/
│   └── ui/
│       ├── src/
│       │   ├── atoms/
│       │   ├── molecules/
│       │   └── organisms/
└── docs/
    └── system/`
  };

  return (
    <div className={`relative ${variantClass}`}>
      <h1>Display Heading Level 1</h1>
      <p>
        This is a paragraph following the main heading.
        Lorem ipsum dolor sit amet, consectetur adipiscing
        elit. The text should align to the 8px baseline
        grid for consistent vertical rhythm.
      </p>

      <h2>Section Heading Level 2</h2>
      <p>
        This paragraph follows a section heading. Notice
        how the spacing maintains the baseline grid.
        <strong>Bold text</strong> and{" "}
        <em>italic text</em> should maintain the same
        baseline as regular text.
      </p>

      <h3>Subsection Heading Level 3</h3>
      <p>
        Multiple paragraphs help visualize the rhythm.{" "}
        <a className="" href="#">Links are styled</a> but don't disrupt
        the baseline. The goal is consistent spacing
        throughout.
      </p>

      <h4>Minor Heading Level 4</h4>
      <p>
        This is the smallest heading level, useful for
        minor sections and labels.
      </p>

      <h3>Unordered List Example</h3>
      <ul>
        <li>First list item with plus marker</li>
        <li>Second item showing alignment</li>
        <li>Third item to verify spacing</li>
        <li>
          Fourth item with longer text to demonstrate how
          multi-line list items wrap and maintain proper
          baseline alignment throughout
        </li>
      </ul>

      <h3>Nested Unordered Lists (2nd & 3rd Level)</h3>
      <ul>
        <li>First level item</li>
        <li>
          First level with nested list:
          <ul>
            <li>Second level item with plus marker</li>
            <li>
              Second level with third level:
              <ul>
                <li>Third level item</li>
                <li>Another third level item</li>
              </ul>
            </li>
            <li>Second level continuation</li>
          </ul>
        </li>
        <li>Back to first level</li>
      </ul>

      <h3>Ordered List Example</h3>
      <ol>
        <li>First numbered item</li>
        <li>Second numbered item</li>
        <li>Third numbered item</li>
        <li>Fourth numbered item</li>
      </ol>

      <h3>Nested Ordered Lists (2nd & 3rd Level)</h3>
      <ol>
        <li>First level numbered item</li>
        <li>
          First level with nested ordered list:
          <ol>
            <li>Second level with decimal numbering</li>
            <li>
              Second level with third level:
              <ol>
                <li>Third level numbered item</li>
                <li>Another third level item</li>
              </ol>
            </li>
            <li>Second level continuation</li>
          </ol>
        </li>
        <li>Back to first level</li>
      </ol>

      <h3>Mixed Nested Lists</h3>
      <ul>
        <li>
          Unordered with nested ordered:
          <ol>
            <li>Ordered inside unordered</li>
            <li>Second ordered item</li>
          </ol>
        </li>
        <li>
          Unordered with deeper nesting:
          <ol>
            <li>
              Ordered level 2:
              <ul>
                <li>Unordered level 3</li>
                <li>Another level 3 item</li>
              </ul>
            </li>
          </ol>
        </li>
      </ul>

      <h3>Code Block Example</h3>
      <CodeBlockWrapper code={proseCodeExamples.bash} variant={variant} />

      <p>Paragraph after code block to check spacing.</p>

      <h3>Inline Code Example</h3>
      <p>
        Some text with <code>inline code</code> that
        should maintain the baseline grid without
        disrupting the flow.
      </p>

      <h3>JSX Example</h3>
      <CodeBlockWrapper code={proseCodeExamples.jsx} variant={variant} />

      <h3>CSS Example</h3>
      <CodeBlockWrapper code={proseCodeExamples.css} variant={variant} />

      <h3>JSON Configuration</h3>
      <CodeBlockWrapper code={proseCodeExamples.json} variant={variant} />

      <h3>Directory Tree</h3>
      <CodeBlockWrapper code={proseCodeExamples.tree} variant={variant} />

      <h3>Blockquote Example</h3>
      <blockquote>
        This is a blockquote that should maintain baseline
        alignment while having distinct styling.
      </blockquote>

      <p>Text after blockquote.</p>

      <hr />

      <p>Content after horizontal rule.</p>

      <h3>Pull Quote Example</h3>

      <div className="kol-pull-quote">
        <p>
          A pull quote stands out but should still
          respect vertical rhythm.
        </p>
        <cite>— Attribution</cite>
      </div>

      <h3>Link Variations</h3>
      <p>
        This paragraph contains{" "}
        <a href="#" className="text-accent-contrast-inverse">standard links</a> and demonstrates
        how they integrate with body text. Links should be
        clearly distinguishable but not disruptive.
      </p>

      <h3>Text Formatting</h3>
      <p>
        This paragraph demonstrates various{" "}
        <strong>strong emphasis</strong>,{" "}
        <em>italic emphasis</em>, and combinations like{" "}
        <strong>
          <em>bold italic text</em>
        </strong>{" "}
        within flowing content.
      </p>

      <h3>Mixed Content Flow</h3>
      <p>
        This section combines multiple elements to test
        how they work together:
      </p>
      <ul>
        <li>List item one</li>
        <li>
          List item two with <code>inline code</code>
        </li>
      </ul>
      <p>
        Paragraph between lists with a{" "}
        <a href="#" className="text-accent-contrast-inverse">link</a> and{" "}
        <strong>strong text</strong>.
      </p>
      <ol>
        <li>Ordered item one</li>
        <li>Ordered item two</li>
      </ol>

      <h4>Final Section</h4>
      <p>
        The baseline grid helps ensure consistent vertical
        spacing throughout long-form content. Every
        element should align to the 8px grid for optimal
        reading rhythm. The three variants (default, wide,
        compact) provide flexibility for different content
        types while maintaining typographic consistency.
      </p>
    </div>
  );
};

export default ProseContent;
