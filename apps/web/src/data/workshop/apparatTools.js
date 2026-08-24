// Single source for the apparat tools: HomeApparat sections, the per-tool about
// pages (ApparatTool), and the frame routes (apparat/<id>/live) all read this.
// Concepts mined from each repo's README; TODO slots where the README is a template.
export const APPARAT_TOOLS = [
  {
    id: 'kol-monitor',
    label: 'Kol Monitor',
    section: 'signal',
    subtitle: 'Modular video synthesizer — eurorack model, pure-math geometry',
    icon: 'stat-chart-a',
    live: 'https://monitor.kolkrabbi.io/',
    repo: 'https://github.com/Tor-Grimsson/kol-monitor',
    concept: 'A browser-based modular video synthesizer built on the language of eurorack. Where eurorack uses voltage as its universal medium, Monitor uses pure math — parametric equations and trigonometry generate geometry instead of pushing pixels.',
    approach: 'The rack engine, Video Modulo, runs fifty modules across five categories (control, math, generators, display, utility) connected through virtual patch cables, evaluated in topological order, and rendered at 60fps on Canvas2D. No WebGL, no shaders, no pixel buffers.',
    stack: 'React · Canvas2D · pure-math rack engine (Video Modulo)'
  },
  {
    id: 'kol-modulator',
    label: 'Kol Modulator',
    section: 'signal',
    subtitle: 'Interactive frequency visualizer',
    icon: 'frequency',
    live: 'https://modulator.kolkrabbi.io/',
    repo: 'https://github.com/Tor-Grimsson/kol-modulator',
    concept: 'Interactive frequency visualizer.'
    // TODO(story): repo README is a template — concept/approach/stack from the user
  },
  {
    id: 'kol-radial',
    label: 'Kol Radial',
    section: 'signal',
    subtitle: 'Parametric waveform vector editor',
    icon: 'circle',
    live: 'https://radial.kolkrabbi.io/',
    repo: 'https://github.com/Tor-Grimsson/kol-radial',
    concept: 'Parametric waveform vector editor.'
    // TODO(story): repo README is a template — concept/approach/stack from the user
  },
  {
    id: 'kol-radar',
    label: 'Kol Radar',
    section: 'signal',
    subtitle: 'Radar visualizer',
    icon: 'roadmap',
    live: 'https://kol-radar.vercel.app/',
    repo: 'https://github.com/Tor-Grimsson/kol-radar',
    concept: 'Radar visualizer.'
    // TODO(blurb): confirm what kol-radar is — placeholder concept
  },
  {
    id: 'kol-mirror',
    label: 'Kol Mirror',
    section: 'image',
    subtitle: 'Interactive image-distortion playground (PixiJS)',
    icon: 'overlap',
    live: 'https://mirror.kolkrabbi.io/',
    repo: 'https://github.com/Tor-Grimsson/kol-mirror',
    concept: 'Interactive image-distortion playground. Load an image, warp it live through the mirror hall.',
    stack: 'React · PixiJS · GSAP'
  },
  {
    id: 'kol-distress',
    label: 'Kol Distress',
    section: 'image',
    subtitle: 'SVG distortion & texture tool',
    icon: 'scribble',
    live: 'https://distress.kolkrabbi.io/',
    repo: 'https://github.com/Tor-Grimsson/kol-distress',
    concept: 'SVG distortion & texture tool.'
    // TODO(story): repo README is bare — concept/approach/stack from the user
  },
  {
    id: 'kol-ds-editor',
    label: 'Kol Design Editor',
    section: 'editors',
    subtitle: 'Embeddable vector + generative design editor',
    icon: 'layout',
    live: 'https://editor.kolkrabbi.io/',
    repo: 'https://github.com/Tor-Grimsson/kol-ds-editor',
    concept: 'The Kolkrabbi design editor as an embeddable React component — a DOM/SVG vector + generative compositor: canvas, layers, palette/pattern/type generators, kinetic type, boolean geometry, image export.',
    approach: 'Consumes the published @kolkrabbi/kol-* design system as peer dependencies — the editor is itself a DS consumer.',
    stack: 'React · DOM/SVG compositor · @kolkrabbi/kol-* peers'
  },
  {
    id: 'kol-vcap',
    label: 'Kol Vcap',
    section: 'editors',
    subtitle: 'Console-driven skinless tab recorder for Chromium',
    icon: 'row',
    live: 'https://kol-vcap.vercel.app/',
    repo: 'https://github.com/Tor-Grimsson/kol-vcap',
    concept: 'Console-driven skinless tab recording for Chromium — type vcap.start() in DevTools, press the hotkey, get an mp4 or webm out. No browser chrome, no share-this-tab prompt, no overlay UI.',
    stack: 'Chromium tabCapture · MediaRecorder'
  }
]

export const APPARAT_SECTIONS = [
  { id: 'signal', title: 'Signal & waveform', body: 'Wave physics and frequency work — synthesis, visualization, parametric waveforms.' },
  { id: 'image', title: 'Image & texture', body: 'Distortion and texture play — raster and vector.' },
  { id: 'editors', title: 'Editors & capture', body: 'Design tooling — editing and recording.' }
]
