import {
  useCurrentFrame,
  interpolate,
  AbsoluteFill,
  spring,
  useVideoConfig,
} from "remotion";

// ---- Easing helpers ----
const ease = (t: number) => t * t * (3 - 2 * t);

const progress = (frame: number, start: number, end: number) =>
  interpolate(frame, [start, end], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

const drawOn = (frame: number, start: number, dur: number, len: number) =>
  len * (1 - ease(progress(frame, start, start + dur)));

const drawOff = (frame: number, start: number, dur: number, len: number) =>
  len * ease(progress(frame, start, start + dur));

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

// ---- Geometry (shared across all instances) ----
const HEX_LINES = [
  { x1: 46, y1: 26, x2: 46, y2: -26 },
  { x1: 46, y1: 26, x2: 0, y2: 0 },
  { x1: 46, y1: 26, x2: 0, y2: 52 },
  { x1: 46, y1: -26, x2: 0, y2: 0 },
  { x1: 46, y1: -26, x2: 0, y2: -52 },
  { x1: -46, y1: -26, x2: -46, y2: 26 },
  { x1: -46, y1: -26, x2: 0, y2: 0 },
  { x1: -46, y1: -26, x2: 0, y2: -52 },
  { x1: -46, y1: 26, x2: 0, y2: 0 },
  { x1: -46, y1: 26, x2: 0, y2: 52 },
  { x1: 0, y1: 0, x2: 0, y2: 52 },
  { x1: 0, y1: 0, x2: 0, y2: -52 },
];

const HEX_YELLOW_PATHS = [
  { d: "M0 0L46 -25.75L46 26L0 0Z", length: 160 },
  { d: "M0 0L0 -52L0 52", length: 104 },
];

const GRID_LINES = [
  { x1: 0, y1: -56, x2: 0, y2: 56 },
  { x1: -56, y1: 0, x2: 56, y2: 0 },
  { x1: 39.4, y1: -39.4, x2: -39.4, y2: 39.4 },
  { x1: 39.4, y1: 39.4, x2: -39.4, y2: -39.4 },
];

const GRID_SHAPES = [
  { d: "M-40 -40H40V40H-40Z", length: 320 },
  { d: "M-28 -28H28V28H-28Z", length: 224 },
  { d: "M0 -56L39.6 0L0 56L-39.6 0Z", length: 271 },
  { d: "M0 -40L28.3 0L0 40L-28.3 0Z", length: 195 },
];

const YELLOW_SETS = [
  [
    { d: "M-28 -28L0 -56L0 56L28 28", length: 192 },
    { d: "M-20 20L20 -20", length: 57 },
  ],
  [
    { d: "M16 -40L0 -56L0 40", length: 118 },
    { d: "M-40 0L0 40L40 0", length: 114 },
    { d: "M40 40L0 0L-40 40", length: 114 },
  ],
  [
    { d: "M16 -40L0 -56L0 40L40 0", length: 175 },
    { d: "M-20 -20L-40 0L40 0", length: 108 },
    { d: "M16 -40L-16 -40", length: 32 },
  ],
];

const MAGENTA = "rgba(210, 60, 180, 0.6)";

const GUIDE_LINES = [
  { d: "M0 -56L-28 -28", length: 63, slot: 0, lead: 18 },
  { d: "M0 56L28 28", length: 40, slot: 0, lead: 10 },
  { d: "M16 -40L0 -56", length: 22, slot: 1, lead: 18 },
  { d: "M0 40L-40 0", length: 57, slot: 1, lead: 12 },
  { d: "M0 40L40 0", length: 57, slot: 2, lead: 16 },
  { d: "M-20 -20L-40 0", length: 28, slot: 2, lead: 10 },
  { d: "M0 -56L-28 -28", length: 63, slot: 3, lead: 18 },
  { d: "M0 56L28 28", length: 40, slot: 3, lead: 10 },
];

// ---- Colors ----
const BG = "#121215";
const WHITE = "rgba(255,255,255,0.4)";
const WHITE_BRIGHT = "rgba(255,255,255,0.6)";
const GOLD = "#F5D245";

// ---- Shared timing ----
const YELLOW_TIMING = [
  { drawStart: 250, drawDur: 40, retractStart: 350, retractDur: 40 },
  { drawStart: 380, drawDur: 45, retractStart: 500, retractDur: 40 },
  { drawStart: 530, drawDur: 45, retractStart: 640, retractDur: 40 },
  { drawStart: 670, drawDur: 40, retractStart: 760, retractDur: 45 },
];

// ---- 3 instances, each with a different symbol order ----
// At any moment, all 3 grids show different symbols
const INSTANCE_SYMBOL_ORDERS = [
  [0, 1, 2, 0], // grid 1: sym1 → sym2 → sym3 → sym1
  [1, 2, 0, 1], // grid 2: sym2 → sym3 → sym1 → sym2
  [2, 0, 1, 2], // grid 3: sym3 → sym1 → sym2 → sym3
];

// ================================================================
// Layout: 3:5 aspect at 2160×3600
// 3 grids stacked vertically, centered
// Grid centers at y = 600, 1800, 3000
// ================================================================
const INSTANCE_Y = [600, 1800, 3000];
const CANVAS_W = 2160;
const CANVAS_H = 3600;
const GRID_SCALE = 4.0; // each grid: 224 × 4 = 896px — fits nicely in 1/3

// ---- Single grid instance renderer ----
const GridInstance: React.FC<{
  frame: number;
  fps: number;
  instanceIdx: number;
  introStagger: number; // slight stagger on hex intro per instance
}> = ({ frame, fps, instanceIdx, introStagger }) => {
  const symbolOrder = INSTANCE_SYMBOL_ORDERS[instanceIdx];
  const f = frame; // alias for readability
  const stg = introStagger;

  // Unique prefix for mask IDs (avoid collisions between instances)
  const uid = `i${instanceIdx}`;

  // ==== Hex wireframe ====
  const hexDraw = (index: number) => {
    const s = index * 3 + stg;
    return ease(progress(f, s, s + 24));
  };
  const hexCollapse = (index: number) => {
    const s = index * 2;
    return ease(progress(f, 165 + stg + s, 195 + stg + s));
  };
  const hexLineEnd = (index: number) =>
    Math.max(0, hexDraw(index) - hexCollapse(index));

  // ==== Hex yellow accents ====
  const hexYDraw0 = drawOn(f, 75 + stg, 25, 160);
  const hexYDraw1 = drawOn(f, 82 + stg, 25, 104);
  const hexYRetract0 = drawOff(f, 155 + stg, 25, 160);
  const hexYRetract1 = drawOff(f, 160 + stg, 25, 104);
  const hexY0Offset = Math.max(hexYDraw0, hexYRetract0);
  const hexY1Offset = Math.max(hexYDraw1, hexYRetract1);
  const hexYVisible = f >= 75 + stg && f < 195 + stg;

  // ==== Circle grid ====
  const circleStart = 180 + stg;
  const circleRadius =
    f >= circleStart
      ? 56 * spring({ frame: f - circleStart, fps, config: { damping: 14, stiffness: 70 } })
      : 0;
  const circleRetract = ease(progress(f, 830, 880));
  const finalRadius = circleRadius * (1 - circleRetract);

  const gridLineDraw = (index: number) => {
    const start = 200 + stg + index * 8;
    return ease(progress(f, start, start + 30));
  };
  const gridLineRetract = (index: number) => {
    const start = 780 + index * 6;
    return ease(progress(f, start, start + 30));
  };
  const gridShapeDrawOffset = (index: number) =>
    drawOn(f, 220 + stg + index * 10, 35, GRID_SHAPES[index].length);
  const gridShapeRetractOffset = (index: number) =>
    drawOff(f, 800 + index * 8, 30, GRID_SHAPES[index].length);

  const gridVisible = f >= circleStart && f < 900;

  // ==== Yellow symbols ====
  const yellowPathOffset = (slotIdx: number, pathIdx: number, pathLength: number) => {
    const t = YELLOW_TIMING[slotIdx];
    const stagger = pathIdx * 8;
    const on = drawOn(f, t.drawStart + stagger, t.drawDur, pathLength);
    const off = drawOff(f, t.retractStart + stagger, t.retractDur, pathLength);
    return Math.max(on, off);
  };
  const yellowSlotVisible = (slotIdx: number) => {
    const t = YELLOW_TIMING[slotIdx];
    return f >= t.drawStart && f <= t.retractStart + t.retractDur + 10;
  };

  // ==== Magenta guides ====
  const guideProgress_ = (guide: (typeof GUIDE_LINES)[0]) => {
    const t = YELLOW_TIMING[guide.slot];
    const drawStart = t.drawStart - guide.lead;
    return ease(progress(f, drawStart, drawStart + 20));
  };
  const guideTailFade = (guide: (typeof GUIDE_LINES)[0]) => {
    const t = YELLOW_TIMING[guide.slot];
    const fadeStart = t.drawStart + t.drawDur + 10;
    if (f < fadeStart) return 1;
    return 1 - ease(progress(f, fadeStart, fadeStart + 20));
  };
  const guideVisible = (guide: (typeof GUIDE_LINES)[0]) => {
    const t = YELLOW_TIMING[guide.slot];
    const drawStart = t.drawStart - guide.lead;
    const fadeEnd = t.drawStart + t.drawDur + 30;
    return f >= drawStart && f <= fadeEnd;
  };

  return (
    <svg
      width="224"
      height="224"
      viewBox="-112 -112 224 224"
      fill="none"
      style={{ overflow: "visible" }}
    >
      {/* Hex wireframe */}
      {f < 250 + stg &&
        HEX_LINES.map((line, i) => {
          const p = hexLineEnd(i);
          if (p <= 0) return null;
          const dx = line.x2 - line.x1;
          const dy = line.y2 - line.y1;
          return (
            <line
              key={`hex-${i}`}
              x1={line.x1} y1={line.y1}
              x2={line.x1 + dx * p} y2={line.y1 + dy * p}
              stroke={WHITE} strokeWidth={0.5}
            />
          );
        })}

      {/* Hex yellow accents */}
      {hexYVisible && (
        <g>
          <path d={HEX_YELLOW_PATHS[0].d} stroke={GOLD} strokeWidth={2}
            strokeLinecap="round" strokeLinejoin="round" fill="none"
            strokeDasharray={160} strokeDashoffset={hexY0Offset} />
          <path d={HEX_YELLOW_PATHS[1].d} stroke={GOLD} strokeWidth={2}
            strokeLinecap="round" fill="none"
            strokeDasharray={104} strokeDashoffset={hexY1Offset} />
        </g>
      )}

      {/* Circle grid */}
      {gridVisible && (
        <g>
          {finalRadius > 0.1 && (
            <circle cx={0} cy={0} r={finalRadius}
              stroke={WHITE_BRIGHT} strokeWidth={0.5} fill="none" />
          )}
          {GRID_LINES.map((line, i) => {
            const draw = gridLineDraw(i);
            const retract = gridLineRetract(i);
            const p = Math.max(0, draw - retract);
            if (p <= 0) return null;
            const cx = (line.x1 + line.x2) / 2;
            const cy = (line.y1 + line.y2) / 2;
            return (
              <line key={`grid-${i}`}
                x1={lerp(cx, line.x1, p)} y1={lerp(cy, line.y1, p)}
                x2={lerp(cx, line.x2, p)} y2={lerp(cy, line.y2, p)}
                stroke={WHITE} strokeWidth={0.5} />
            );
          })}
          {GRID_SHAPES.map((shape, i) => {
            const on = gridShapeDrawOffset(i);
            const off = gridShapeRetractOffset(i);
            const offset = Math.max(on, off);
            if (offset >= shape.length - 0.5) return null;
            return (
              <path key={`shape-${i}`} d={shape.d}
                stroke={WHITE} strokeWidth={0.5} fill="none"
                strokeDasharray={shape.length} strokeDashoffset={offset} />
            );
          })}
        </g>
      )}

      {/* Magenta guides */}
      {GUIDE_LINES.map((guide, i) => {
        if (!guideVisible(guide)) return null;
        const p = guideProgress_(guide);
        if (p <= 0.01) return null;
        const fade = guideTailFade(guide);
        const maskId = `${uid}-gm-${i}`;
        return (
          <g key={`guide-${i}`} opacity={fade}>
            <defs>
              <mask id={maskId}>
                <path d={guide.d} fill="none" stroke="white"
                  strokeWidth={6} strokeLinecap="round"
                  strokeDasharray={guide.length}
                  strokeDashoffset={guide.length * (1 - p)} />
              </mask>
            </defs>
            <path d={guide.d} stroke={MAGENTA} strokeWidth={1}
              strokeLinecap="butt" strokeLinejoin="round" fill="none"
              strokeDasharray="1.5 2" mask={`url(#${maskId})`} />
          </g>
        );
      })}

      {/* Yellow symbols */}
      {YELLOW_TIMING.map((_, slotIdx) => {
        if (!yellowSlotVisible(slotIdx)) return null;
        const setIdx = symbolOrder[slotIdx];
        const set = YELLOW_SETS[setIdx];
        return (
          <g key={`yellow-${slotIdx}`}>
            {set.map((p, pathIdx) => {
              const offset = yellowPathOffset(slotIdx, pathIdx, p.length);
              if (offset >= p.length - 0.5) return null;
              return (
                <path key={`yp-${slotIdx}-${pathIdx}`} d={p.d}
                  stroke={GOLD} strokeWidth={2}
                  strokeLinecap="round" strokeLinejoin="round" fill="none"
                  strokeDasharray={p.length} strokeDashoffset={offset} />
              );
            })}
          </g>
        );
      })}
    </svg>
  );
};

// ================================================================
// V5: 3:5 portrait, 3 stacked grids, each showing different symbols
// 2160×3600, 30fps, 900 frames = 30 seconds
// ================================================================
export const GridSymbolsV5: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Shared enter/exit
  const enterScale = spring({
    frame,
    fps,
    config: { damping: 20, stiffness: 60 },
    from: 0.85,
    to: 1,
  });

  const exitScale =
    frame >= 860
      ? interpolate(frame, [860, 900], [1, 0.75], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: (t: number) => t * t,
        })
      : 1;

  const exitOpacity =
    frame >= 880
      ? interpolate(frame, [880, 900], [1, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        })
      : 1;

  const scale = GRID_SCALE * enterScale * exitScale;

  return (
    <AbsoluteFill style={{ backgroundColor: BG }}>
      <div style={{ width: CANVAS_W, height: CANVAS_H, position: "relative", opacity: exitOpacity }}>
        {INSTANCE_Y.map((y, idx) => (
          <div
            key={`grid-${idx}`}
            style={{
              position: "absolute",
              left: CANVAS_W / 2,
              top: y,
              transform: `translate(-50%, -50%) scale(${scale})`,
            }}
          >
            <GridInstance
              frame={frame}
              fps={fps}
              instanceIdx={idx}
              introStagger={idx * 8}
            />
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};
