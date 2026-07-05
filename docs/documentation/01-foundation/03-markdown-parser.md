---
Title: Markdown Parser
Version: 1.0.0
Date: 2025-11-04
Status: Active
Category: Foundation
Content-Type: Technical Reference
tags: [foundation, technical-reference, markdown, parser, javascript]
modified: 2026-02-17
---

# Markdown Parser Implementation

## Overview

The comprehensive markdown parser utility (`parseDocsMarkdown.js`) powers the documentation system's live markdown rendering. The parser supports both block-level and inline markdown elements, enabling rich documentation presentation within the styleguide at `/styleguide/design-system/documentation`.

**Key Features:**
- Full markdown syntax support (H1-H4, lists, code, links, images, etc.)
- Inline token processing (bold, italic, code, links)
- Frontmatter detection and skipping
- Structured output for React rendering
- Shared utility used by multiple components
- Table of contents auto-generation with nested hierarchy

---

## Context

The parser was created on 2025-11-04 to replace duplicate inline parsing logic in both `Documentations.jsx` and `DocumentationReader.jsx`. The original parsers were basic, supporting only H1/H2 headings and missing inline markdown features (bold, italic, inline code, links).

The existing `docs.css` stylesheet already included styles for H3, H4, strong tags, links, and inline code, but the parser wasn't extracting these elements from markdown. This enhancement bridges that gap.

---

## Supported Markdown Features

### Block-Level Elements

| Element | Syntax | Output |
|---------|--------|--------|
| H1 Heading | `# Heading` | Title-level heading |
| H2 Heading | `## Heading` | Section heading, creates TOC entry |
| H3 Heading | `### Heading` | Sub-section, nested TOC entry |
| H4 Heading | `#### Heading` | Sub-sub-section, nested TOC entry |
| Paragraph | Plain text | Body text with inline markdown |
| Unordered List | `- Item` or `* Item` | Bulleted list |
| Ordered List | `1. Item` | Numbered list |
| Code Block | ` ```code``` ` | Pre-formatted code |
| Blockquote | `> Quote` | Callout/quote block |
| Horizontal Rule | `---` | Divider |

### Inline Elements

| Element | Syntax | Output |
|---------|--------|--------|
| Bold | `**text**` | Strong emphasis |
| Italic | `*text*` | Emphasis |
| Inline Code | `` `code` `` | Monospace code snippet |
| Link | `[text](url)` | Clickable link |
| Image | `![alt](src)` | Embedded image |

### Special Handling

**Frontmatter:**
- YAML frontmatter between `---` delimiters is detected and skipped
- Allows metadata at document start without rendering

**List Continuity:**
- Consecutive list items of same type are grouped
- Maintains proper nesting structure

**Paragraph Buffering:**
- Multi-line text is joined into single paragraphs
- Empty lines trigger paragraph breaks

---

## Architecture

### Parser Structure

```
parseDocsMarkdown(markdown)
├── Returns: { sections, toc, introBlocks }
├── sections: Array of H2 sections with nested blocks
├── toc: Array of heading entries with levels
└── introBlocks: Content before first H2
```

### Processing Pipeline

1. **Line-by-line parsing** - Split markdown into lines
2. **State tracking** - Track code blocks, frontmatter, paragraph buffers
3. **Block detection** - Match headings, lists, code fences
4. **Inline processing** - Extract bold, italic, code, links from text
5. **Structure building** - Group blocks into sections
6. **TOC generation** - Extract headings with IDs and levels

### Token-Based Inline Rendering

Inline markdown is converted to tokens during parsing:

```javascript
"This is **bold** and `code`"
// Becomes:
[
  { type: 'text', content: 'This is ' },
  { type: 'bold', content: 'bold' },
  { type: 'text', content: ' and ' },
  { type: 'code', content: 'code' }
]
```

The `renderInlineTokens()` function converts tokens to React elements:

```jsx
renderInlineTokens(tokens) // Returns React elements
```

---

## Usage

### Basic Usage

```javascript
import { parseDocsMarkdown, renderInlineTokens } from '../../utils/parseDocsMarkdown'

const markdown = `# Title
## Section
This is **bold** and *italic*.
`

const { sections, toc, introBlocks } = parseDocsMarkdown(markdown)
```

### Rendering Parsed Content

```jsx
// Render intro content (before first H2)
{introBlocks.map((block, index) => {
  if (block.type === 'paragraph') {
    return (
      <p key={index}>
        {renderInlineTokens(block.tokens)}
      </p>
    )
  }
})}

// Render sections
{sections.map(({ heading, id, blocks }) => (
  <section key={id} id={id}>
    <h2>{heading}</h2>
    {blocks.map((block, index) => {
      // Render each block type
    })}
  </section>
))}
```

### Table of Contents

The parser auto-generates TOC entries with proper nesting:

```javascript
toc = [
  { id: 'overview', label: 'Overview', level: 2 },
  { id: 'features', label: 'Features', level: 3 },
  { id: 'advanced', label: 'Advanced Features', level: 4 }
]
```

Use the `level` property to indent nested entries:

```jsx
{toc.map((item) => {
  const indent = item.level === 3 ? 'pl-3' : item.level === 4 ? 'pl-6' : ''
  return (
    <li className={indent}>
      <a href={`#${item.id}`}>{item.label}</a>
    </li>
  )
})}
```

---

## Implementation Details

### File Location

**Primary:**
- `apps/web/src/utils/parseDocsMarkdown.js` - Parser utility

**Consumers:**
- `apps/web/src/routes/styleguide/Documentations.jsx` - Index/browser page
- `apps/web/src/routes/styleguide/DocumentationReader.jsx` - Individual doc reader

### CSS Integration

The parser outputs class names that match `packages/ui/css/docs.css`:

| Block Type | Class Name | CSS Selector |
|------------|------------|--------------|
| Paragraph | (none) | `.docs-article p` |
| H2 | (none) | `.docs-article h2` |
| H3 | (none) | `.docs-article h3` |
| H4 | (none) | `.docs-article h4` |
| List | `docs-list` | `.docs-list` |
| Code Block | `docs-codeblock` | `.docs-codeblock` |
| Blockquote | `docs-callout` | `.docs-callout` |
| Link | `docs-link` | `.docs-article a` |
| Image | `docs-image` | `.docs-image` |

Inline elements use semantic HTML tags styled by docs.css:
- `<strong>` for bold
- `<em>` for italic
- `<code>` for inline code
- `<a>` for links
- `<img>` for images

### Performance Considerations

**Memoization:**
Both consumer components use `useMemo()` to cache parsed results:

```javascript
const { sections, toc } = useMemo(() => {
  if (!rawMarkdown) return { sections: [], toc: [] }
  const parsed = parseDocsMarkdown(rawMarkdown)
  return { sections: parsed.sections, toc: parsed.toc }
}, [rawMarkdown])
```

**Single Pass:**
The parser processes markdown in a single pass, building all structures simultaneously.

**Token Caching:**
Inline tokens are generated during parsing, not during rendering, reducing per-render work.

---

## Limitations

**Not Supported:**
- Markdown tables (can be added if needed)
- Nested lists (single level only)
- HTML passthrough
- Task lists `- [ ]`
- Definition lists
- Footnotes
- Math expressions

**Regex-Based:**
The inline processor uses regex matching, which has limitations:
- Cannot handle escaped characters (`\*` for literal asterisk)
- May not match complex nested patterns
- Assumes well-formed markdown

**No Validation:**
The parser does not validate markdown syntax - malformed input may produce unexpected output.

---

## Future Enhancements

**Phase 2 Candidates:**
1. **Table support** - Parse markdown tables into structured data
2. **Nested lists** - Support multi-level list indentation
3. **Task lists** - Render checkboxes for `- [ ]` syntax
4. **Syntax highlighting** - Add language-specific code coloring
5. **Link resolution** - Auto-convert `[M.m.p]` references to doc links

**Phase 3 Candidates:**
1. **Custom containers** - Support `::: warning` style blocks
2. **Frontmatter parsing** - Extract and use metadata
3. **Heading anchors** - Auto-add anchor links to headings
4. **Copy buttons** - Add copy to code blocks
5. **Diff highlighting** - Support `diff` syntax in code blocks

---

## Related Documentation

- [Foundation Index](INDEX.md) - Foundation overview
- [Repository Structure](01-repository-structure.md) - Monorepo architecture

---

**Last Updated:** 2026-02-17
