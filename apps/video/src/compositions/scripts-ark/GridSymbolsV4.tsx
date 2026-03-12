import {
  useCurrentFrame,
  interpolate,
  AbsoluteFill,
  spring,
  useVideoConfig,
} from "remotion";

// ---- Easing helpers ----
const ease = (t: number) => t * t * (3 - 2 * t);

/** Clamped 0→1 progress */
const progress = (frame: number, start: number, end: number) =>
  interpolate(frame, [start, end], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

/** Draw-on: returns strokeDashoffset (pathLength → 0) */
const drawOn = (frame: number, start: number, dur: number, len: number) =>
  len * (1 - ease(progress(frame, start, start + dur)));

/** Draw-off (retract): returns strokeDashoffset (0 → pathLength) */
const drawOff = (frame: number, start: number, dur: number, len: number) =>
  len * ease(progress(frame, start, start + dur));

/** Linear interpolation */
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

// ---- Hex wireframe geometry (centered at 0,0) ----
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

// ---- Circle grid geometry (r=56, centered at 0,0) ----
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

// ---- Yellow accent symbol paths ----
// Connected segments merged into polylines for clean strokeLinejoin
const YELLOW_SETS = [
  // Figure 2: main polyline + separate cross
  [
    { d: "M-28 -28L0 -56L0 56L28 28", length: 192 },
    { d: "M-20 20L20 -20", length: 57 },
  ],
  // Figure 3: arrow+vertical, two V-shapes
  [
    { d: "M16 -40L0 -56L0 40", length: 118 },
    { d: "M-40 0L0 40L40 0", length: 114 },
    { d: "M40 40L0 0L-40 40", length: 114 },
  ],
  // Figure 4: arrow+vertical+diagonal, horizontal+diagonal, top bar
  [
    { d: "M16 -40L0 -56L0 40L40 0", length: 175 },
    { d: "M-20 -20L-40 0L40 0", length: 108 },
    { d: "M16 -40L-16 -40", length: 32 },
  ],
];

// ---- Magenta construction guides ----
// Trajectory previews: dotted lines showing WHERE the gold stroke is heading,
// drawn slightly ahead of the gold path at non-obvious turns.
// "From here → to target corner" — the intent of the gold stroke's route.
const MAGENTA = "rgba(210, 60, 180, 0.6)";

// `lead` = how many frames BEFORE the gold draw starts the guide appears
const GUIDE_LINES = [
  // Slot 0 (symbol 1): gold hooks from top of vertical (0,-56) to inner
  // square corner (-28,-28) — guide previews that trajectory
  { d: "M0 -56L-28 -28", length: 63, slot: 0, lead: 18 },
  // Slot 0: gold hooks from bottom of vertical (0,56) to (28,28)
  { d: "M0 56L28 28", length: 40, slot: 0, lead: 10 },
  // Slot 1 (symbol 2): arrow tip goes from (16,-40) to top of vertical (0,-56)
  { d: "M16 -40L0 -56", length: 22, slot: 1, lead: 18 },
  // Slot 1: bottom V routes from (0,40) out to (-40,0) — non-obvious diagonal
  { d: "M0 40L-40 0", length: 57, slot: 1, lead: 12 },
  // Slot 2 (symbol 3): gold goes from bottom of vertical (0,40) diagonally
  // to (40,0) — guide previews that destination
  { d: "M0 40L40 0", length: 57, slot: 2, lead: 16 },
  // Slot 2: horizontal bar destination — gold routes from (-20,-20) to (-40,0)
  { d: "M-20 -20L-40 0", length: 28, slot: 2, lead: 10 },
  // Slot 3 (reprise): same as slot 0 guides
  { d: "M0 -56L-28 -28", length: 63, slot: 3, lead: 18 },
  { d: "M0 56L28 28", length: 40, slot: 3, lead: 10 },
];

// ---- Colors ----
const BG = "#121215";
const WHITE = "rgba(255,255,255,0.4)";
const WHITE_BRIGHT = "rgba(255,255,255,0.6)";
const GOLD = "#F5D245";

// ================================================================
// TIMELINE — 30fps, 900 frames = 30 seconds
// ================================================================
// Phase 1:   0–75    (0–2.5s)     Hex wireframe draws on
// Phase 2:  75–120   (2.5–4s)     Hex yellow accents draw on
// Phase 3: 120–150   (4–5s)       Hold hex composition
// Phase 4: 150–250   (5–8.3s)     Hex collapses → circle grid expands
// Phase 5: 250–350   (8.3–11.7s)  Symbol 1 draws on + hold
// Phase 6: 350–410   (11.7–13.7s) Symbol 1 retracts → symbol 2 draws on
// Phase 7: 410–500   (13.7–16.7s) Symbol 2 holds
// Phase 8: 500–560   (16.7–18.7s) Symbol 2 retracts → symbol 3 draws on
// Phase 9: 560–640   (18.7–21.3s) Symbol 3 holds
// Phase 10: 640–700  (21.3–23.3s) Symbol 3 retracts → symbol 1 draws on (LOOP)
// Phase 11: 700–760  (23.3–25.3s) Symbol 1 holds (reprise)
// Phase 12: 760–840  (25.3–28s)   Symbol 1 retracts + grid retracts
// Phase 13: 840–900  (28–30s)     Circle shrinks, clean for loop
// ================================================================

// Symbol order: 1 → 2 → 3 → 1 (loop point)
const SYMBOL_ORDER = [0, 1, 2, 0];

const YELLOW_TIMING = [
  { drawStart: 250, drawDur: 40, retractStart: 350, retractDur: 40 },
  { drawStart: 380, drawDur: 45, retractStart: 500, retractDur: 40 },
  { drawStart: 530, drawDur: 45, retractStart: 640, retractDur: 40 },
  { drawStart: 670, drawDur: 40, retractStart: 760, retractDur: 45 },
];

export const GridSymbolsV4: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const SCALE = 9.6; // 3.2 × 2 (4K) × 1.5 (bigger) — fills 4K frame

  // ==== PHASE 1: Hex wireframe draw-on ====
  const hexDraw = (index: number) => {
    const stagger = index * 3;
    return ease(progress(frame, stagger, stagger + 24));
  };

  const hexCollapse = (index: number) => {
    const stagger = index * 2;
    return ease(progress(frame, 165 + stagger, 195 + stagger));
  };

  const hexLineEnd = (index: number) =>
    Math.max(0, hexDraw(index) - hexCollapse(index));

  // ==== PHASE 2: Hex yellow accents ====
  const hexYellowDraw0 = drawOn(frame, 75, 25, 160);
  const hexYellowDraw1 = drawOn(frame, 82, 25, 104);
  const hexYellowRetract0 = drawOff(frame, 155, 25, 160);
  const hexYellowRetract1 = drawOff(frame, 160, 25, 104);
  const hexYellow0Offset = Math.max(hexYellowDraw0, hexYellowRetract0);
  const hexYellow1Offset = Math.max(hexYellowDraw1, hexYellowRetract1);
  const hexYellowVisible = frame >= 75 && frame < 195;

  // ==== PHASE 4: Circle grid ====
  const circleRadius =
    frame >= 180
      ? 56 *
        spring({
          frame: frame - 180,
          fps,
          config: { damping: 14, stiffness: 70 },
        })
      : 0;

  const circleRetractProgress = ease(progress(frame, 830, 880));
  const finalCircleRadius = circleRadius * (1 - circleRetractProgress);

  const gridLineDraw = (index: number) => {
    const start = 200 + index * 8;
    return ease(progress(frame, start, start + 30));
  };

  const gridLineRetract = (index: number) => {
    const start = 780 + index * 6;
    return ease(progress(frame, start, start + 30));
  };

  const gridShapeDraw = (index: number) =>
    drawOn(frame, 220 + index * 10, 35, GRID_SHAPES[index].length);

  const gridShapeRetract = (index: number) =>
    drawOff(frame, 800 + index * 8, 30, GRID_SHAPES[index].length);

  // ==== PHASES 5–12: Yellow accent cycling (4 slots) ====
  const yellowPathOffset = (
    slotIdx: number,
    pathIdx: number,
    pathLength: number
  ) => {
    const t = YELLOW_TIMING[slotIdx];
    const stagger = pathIdx * 8;
    const on = drawOn(
      frame,
      t.drawStart + stagger,
      t.drawDur,
      pathLength
    );
    const off = drawOff(
      frame,
      t.retractStart + stagger,
      t.retractDur,
      pathLength
    );
    return Math.max(on, off);
  };

  const yellowSlotVisible = (slotIdx: number) => {
    const t = YELLOW_TIMING[slotIdx];
    return frame >= t.drawStart && frame <= t.retractStart + t.retractDur + 10;
  };

  // ==== Magenta construction guides ====
  // Guides LEAD the gold stroke — draw on before gold starts, stay while gold
  // catches up, then gentle fade at the tail once gold has passed over.
  // Guide draw-on progress (0→1) — used to clip the dotted line reveal
  const guideProgress = (guide: (typeof GUIDE_LINES)[0]) => {
    const t = YELLOW_TIMING[guide.slot];
    const drawStart = t.drawStart - guide.lead;
    return ease(progress(frame, drawStart, drawStart + 20));
  };

  const guideTailFade = (guide: (typeof GUIDE_LINES)[0]) => {
    const t = YELLOW_TIMING[guide.slot];
    const fadeStart = t.drawStart + t.drawDur + 10;
    if (frame < fadeStart) return 1;
    return 1 - ease(progress(frame, fadeStart, fadeStart + 20));
  };

  const guideVisible = (guide: (typeof GUIDE_LINES)[0]) => {
    const t = YELLOW_TIMING[guide.slot];
    const drawStart = t.drawStart - guide.lead;
    const fadeEnd = t.drawStart + t.drawDur + 30;
    return frame >= drawStart && frame <= fadeEnd;
  };

  // ==== Grid visible window ====
  const gridVisible = frame >= 180 && frame < 900;

  // ==== Overall scale: enter + exit, stable during middle ====
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

  const compositeScale = SCALE * enterScale * exitScale;

  return (
    <AbsoluteFill style={{ backgroundColor: BG }}>
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: `translate(-50%, -50%) scale(${compositeScale})`,
          opacity: exitOpacity,
        }}
      >
        <svg
          width="224"
          height="224"
          viewBox="-112 -112 224 224"
          fill="none"
          style={{ overflow: "visible" }}
        >
          {/* ---- Hex wireframe (phases 1–4) ---- */}
          {frame < 250 &&
            HEX_LINES.map((line, i) => {
              const p = hexLineEnd(i);
              if (p <= 0) return null;
              const dx = line.x2 - line.x1;
              const dy = line.y2 - line.y1;
              return (
                <line
                  key={`hex-${i}`}
                  x1={line.x1}
                  y1={line.y1}
                  x2={line.x1 + dx * p}
                  y2={line.y1 + dy * p}
                  stroke={WHITE}
                  strokeWidth={0.5}
                />
              );
            })}

          {/* ---- Hex yellow accents (phase 2–3, retract in phase 4) ---- */}
          {hexYellowVisible && (
            <g>
              <path
                d={HEX_YELLOW_PATHS[0].d}
                stroke={GOLD}
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                strokeDasharray={160}
                strokeDashoffset={hexYellow0Offset}
              />
              <path
                d={HEX_YELLOW_PATHS[1].d}
                stroke={GOLD}
                strokeWidth={2}
                strokeLinecap="round"
                fill="none"
                strokeDasharray={104}
                strokeDashoffset={hexYellow1Offset}
              />
            </g>
          )}

          {/* ---- Circle grid (phases 4–13) ---- */}
          {gridVisible && (
            <g>
              {finalCircleRadius > 0.1 && (
                <circle
                  cx={0}
                  cy={0}
                  r={finalCircleRadius}
                  stroke={WHITE_BRIGHT}
                  strokeWidth={0.5}
                  fill="none"
                />
              )}

              {GRID_LINES.map((line, i) => {
                const draw = gridLineDraw(i);
                const retract = gridLineRetract(i);
                const p = Math.max(0, draw - retract);
                if (p <= 0) return null;
                const cx = (line.x1 + line.x2) / 2;
                const cy = (line.y1 + line.y2) / 2;
                return (
                  <line
                    key={`grid-${i}`}
                    x1={lerp(cx, line.x1, p)}
                    y1={lerp(cy, line.y1, p)}
                    x2={lerp(cx, line.x2, p)}
                    y2={lerp(cy, line.y2, p)}
                    stroke={WHITE}
                    strokeWidth={0.5}
                  />
                );
              })}

              {GRID_SHAPES.map((shape, i) => {
                const on = gridShapeDraw(i);
                const off = gridShapeRetract(i);
                const offset = Math.max(on, off);
                if (offset >= shape.length - 0.5) return null;
                return (
                  <path
                    key={`shape-${i}`}
                    d={shape.d}
                    stroke={WHITE}
                    strokeWidth={0.5}
                    fill="none"
                    strokeDasharray={shape.length}
                    strokeDashoffset={offset}
                  />
                );
              })}
            </g>
          )}

          {/* ---- Magenta construction guides (dotted, draw-on reveal) ---- */}
          {/* Each guide uses a <mask> with an expanding white stroke to
              progressively reveal the dotted line underneath */}
          {GUIDE_LINES.map((guide, i) => {
            if (!guideVisible(guide)) return null;
            const p = guideProgress(guide);
            if (p <= 0.01) return null;
            const fade = guideTailFade(guide);
            const maskId = `guide-mask-${i}`;
            return (
              <g key={`guide-${i}`} opacity={fade}>
                <defs>
                  <mask id={maskId}>
                    <path
                      d={guide.d}
                      fill="none"
                      stroke="white"
                      strokeWidth={6}
                      strokeLinecap="round"
                      strokeDasharray={guide.length}
                      strokeDashoffset={guide.length * (1 - p)}
                    />
                  </mask>
                </defs>
                <path
                  d={guide.d}
                  stroke={MAGENTA}
                  strokeWidth={1}
                  strokeLinecap="butt"
                  strokeLinejoin="round"
                  fill="none"
                  strokeDasharray="1.5 2"
                  mask={`url(#${maskId})`}
                />
              </g>
            );
          })}

          {/* ---- Yellow accent sets (phases 5–12) ---- */}
          {YELLOW_TIMING.map((_, slotIdx) => {
            if (!yellowSlotVisible(slotIdx)) return null;
            const setIdx = SYMBOL_ORDER[slotIdx];
            const set = YELLOW_SETS[setIdx];
            return (
              <g key={`yellow-slot-${slotIdx}`}>
                {set.map((p, pathIdx) => {
                  const offset = yellowPathOffset(slotIdx, pathIdx, p.length);
                  if (offset >= p.length - 0.5) return null;
                  return (
                    <path
                      key={`yp-${slotIdx}-${pathIdx}`}
                      d={p.d}
                      stroke={GOLD}
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fill="none"
                      strokeDasharray={p.length}
                      strokeDashoffset={offset}
                    />
                  );
                })}
              </g>
            );
          })}
        </svg>
      </div>
    </AbsoluteFill>
  );
};
