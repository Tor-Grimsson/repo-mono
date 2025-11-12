// Script to add preview flags to typography breakpoints
// Run with: node add-preview-flags.js

const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'tokens.js');
let content = fs.readFileSync(filePath, 'utf8');

// Define which breakpoints are NEW (preview) vs existing in CSS
const previewRules = {
  display: [false, true, false], // Mobile exists, Tablet NEW, Desktop exists
  section: [true, true, false],  // Mobile changed (40px), Tablet NEW, Desktop exists (64px)
  h1: [true, true, false],        // ALL NEW except desktop (64px exists as fixed)
  h2: [true, true, false],        // ALL NEW except desktop (48px exists as fixed)
  h3: [true, true, false],        // ALL NEW except desktop (40px exists as fixed)
  h4: [true, false, false],       // Mobile NEW (20px), Tablet exists (24px), Desktop exists (32px)
  body: [true, false, true],      // Mobile NEW, Tablet exists (16px), Desktop NEW
  'body-sm': [true, false, true], // Mobile NEW, Tablet exists (14px), Desktop NEW
  'mono-body': [true, false, true], // Mobile NEW, Tablet exists (16px), Desktop NEW
  label: [true, false, false],    // Mobile NEW (14px), Tablet exists (16px), Desktop exists (24px)
  mono: [true, false, true]       // Mobile NEW, Tablet exists (12px), Desktop NEW
};

// Add preview flag to each breakpoint
Object.keys(previewRules).forEach(id => {
  const flags = previewRules[id];
  const pattern = new RegExp(`id: '${id}'[\\s\\S]*?breakpoints: \\[([\\s\\S]*?)\\]\\s*\\}`, 'm');

  content = content.replace(pattern, (match) => {
    let bpIndex = 0;
    return match.replace(/(\{[^}]*name: '[^']*'[^}]*)\}/g, (bpMatch) => {
      const hasPreview = bpMatch.includes('preview:');
      if (!hasPreview) {
        const flag = flags[bpIndex];
        bpIndex++;
        return bpMatch.replace(/\}$/, `,\n        preview: ${flag}\n      }`);
      }
      bpIndex++;
      return bpMatch;
    });
  });
});

fs.writeFileSync(filePath, content, 'utf8');
