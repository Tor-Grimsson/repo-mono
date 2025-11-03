export const proseCodeExamples = {
  bash: `function example() {
  return "code blocks should align"
}`,
  jsx: `// apps/foundry/src/components/sections/Specimen.jsx

// Use React state to manage the chosen properties
const [fontSize, setFontSize] = useState(48);
// ...

return (
  <div className="controls-panel">
    <SizeControl value={fontSize} onChange={setFontSize} />
  </div>

  <div className="specimen-display">
    <FontViewer fontSize={fontSize} /> // Viewer reads the state
  </div>
);`,
  css: `/* Prose typography system */
.kol-prose {
  max-width: 65ch;
  margin-inline: auto;
}

.kol-prose h1 {
  font-family: var(--kol-font-family-rgrot-tight);
  font-size: clamp(48px, 6vw, 64px);
  line-height: 100%;
  font-weight: 500;
  text-transform: uppercase;
}`,
  json: `{
  "name": "kol-design-system",
  "version": "3.3.0",
  "tokens": {
    "colors": {
      "surface-primary": "#fafafa",
      "surface-on-primary": "#121215"
    },
    "typography": {
      "font-family-base": "Inter Tight",
      "font-family-mono": "RightGroteskMono"
    }
  }
}`,
  tree: `kolkrabbi-monorepo/
├── apps/
│   ├── web/
│   │   ├── src/
│   │   │   ├── components/
│   │   │   │   ├── prose/
│   │   │   │   └── styleguide/
│   │   │   └── routes/
│   │   └── public/
│   └── foundry/
├── packages/
│   └── ui/
│       ├── css/
│       │   ├── prose.css
│       │   ├── theme.css
│       │   └── utilities.css
│       └── src/
└── docs/
    └── system/`
};
