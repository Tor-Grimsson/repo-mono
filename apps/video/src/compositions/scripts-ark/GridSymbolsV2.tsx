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

/** Line endpoint interpolation — animate x1,y1→x2,y2 with progress */
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

// Squares and diamonds as path strings for strokeDasharray animation
const GRID_SHAPES = [
  { d: "M-40 -40H40V40H-40Z", length: 320 }, // outer square
  { d: "M-28 -28H28V28H-28Z", length: 224 }, // inner square
  { d: "M0 -56L39.6 0L0 56L-39.6 0Z", length: 271 }, // outer diamond
  { d: "M0 -40L28.3 0L0 40L-28.3 0Z", length: 195 }, // inner diamond
];

// ---- Yellow accent symbol paths per figure ----
// Connected segments merged into polylines for clean joins (no double round caps)
const YELLOW_SETS = [
  // Figure 2: main polyline (top diagonal → vertical → bottom diagonal) + separate cross
  [
    { d: "M-28 -28L0 -56L0 56L28 28", length: 192 },
    { d: "M-20 20L20 -20", length: 57 },
  ],
  // Figure 3: arrow+vertical merged, bottom star as two V-shapes
  [
    { d: "M16 -40L0 -56L0 40", length: 118 },
    { d: "M-40 0L0 40L40 0", length: 114 },
    { d: "M40 40L0 0L-40 40", length: 114 },
  ],
  // Figure 4: arrow+vertical+diagonal merged, horizontal+diagonal merged, top bar
  [
    { d: "M16 -40L0 -56L0 40L40 0", length: 175 },
    { d: "M-20 -20L-40 0L40 0", length: 108 },
    { d: "M16 -40L-16 -40", length: 32 },
  ],
];

// ---- Magenta construction guides ----
// Thin lines showing the grid geometry the gold path follows
// Each: { d, length, set, delay } — delay in frames after yellow set starts
const MAGENTA = "rgba(210, 60, 180, 0.35)";
const GUIDE_LINES = [
  // Set 0: diamond edge that the top diagonal follows
  { d: "M0 -56L39.6 0", length: 68, set: 0, delay: 12 },
  // Set 0: diamond edge that the bottom diagonal follows
  { d: "M0 56L-39.6 0", length: 68, set: 0, delay: 20 },
  // Set 1: inner square edge the arrow tip aligns to
  { d: "M28 -28L-28 -28", length: 56, set: 1, delay: 10 },
  // Set 1: outer square edge the star points snap to
  { d: "M-40 40L40 40", length: 80, set: 1, delay: 22 },
  // Set 2: diamond edge the main diagonal follows
  { d: "M39.6 0L0 40", length: 57, set: 2, delay: 14 },
  // Set 2: inner square edge the horizontal aligns with
  { d: "M-28 0L-40 0", length: 12, set: 2, delay: 24 },
];

// ---- Colors ----
const BG = "#121215";
const WHITE = "rgba(255,255,255,0.4)";
const WHITE_BRIGHT = "rgba(255,255,255,0.6)";
const GOLD = "#F5D245";

// ================================================================
// TIMELINE — 30fps, 900 frames = 30 seconds
// ================================================================
// Phase 1:   0–75   (0–2.5s)    Hex wireframe draws on
// Phase 2:  75–120  (2.5–4s)    Hex yellow accents draw on
// Phase 3: 120–150  (4–5s)      Hold hex composition
// Phase 4: 150–270  (5–9s)      Hex collapses → circle grid expands
// Phase 5: 270–390  (9–13s)     Yellow set 1 draws on + hold
// Phase 6: 390–450  (13–15s)    Set 1 retracts → set 2 draws on (overlap)
// Phase 7: 450–540  (15–18s)    Set 2 holds
// Phase 8: 540–600  (18–20s)    Set 2 retracts → set 3 draws on (overlap)
// Phase 9: 600–720  (20–24s)    Set 3 holds
// Phase 10: 720–840 (24–28s)    Everything retracts (reverse draw-on)
// Phase 11: 840–900 (28–30s)    Circle shrinks to nothing, clean for loop
// ================================================================

export const GridSymbolsV2: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const SCALE = 3.2;

  // ==== PHASE 1: Hex wireframe draw-on ====
  const hexDraw = (index: number) => {
    const stagger = index * 3;
    return ease(progress(frame, stagger, stagger + 24));
  };

  // Hex collapse: lines retract from end back to start (phase 4)
  const hexCollapse = (index: number) => {
    const stagger = index * 2;
    // Returns 0→1 progress of collapse
    return ease(progress(frame, 165 + stagger, 195 + stagger));
  };

  // Hex line visibility: draw on, then collapse (no fade!)
  const hexLineEnd = (index: number) => {
    const draw = hexDraw(index);
    const collapse = hexCollapse(index);
    // During draw-on: endpoint travels from x1,y1 toward x2,y2
    // During collapse: endpoint travels back from x2,y2 toward x1,y1
    // Net progress = draw - collapse (clamped)
    return Math.max(0, draw - collapse);
  };

  // ==== PHASE 2: Hex yellow accents ====
  const hexYellowDraw0 = drawOn(frame, 75, 25, 160);
  const hexYellowDraw1 = drawOn(frame, 82, 25, 104);
  // Retract during morph
  const hexYellowRetract0 = drawOff(frame, 155, 25, 160);
  const hexYellowRetract1 = drawOff(frame, 160, 25, 104);
  // Combined offset
  const hexYellow0Offset = Math.max(hexYellowDraw0, hexYellowRetract0);
  const hexYellow1Offset = Math.max(hexYellowDraw1, hexYellowRetract1);
  // Only show when drawn on and not fully retracted
  const hexYellowVisible = frame >= 75 && frame < 195;

  // ==== PHASE 4: Circle grid expansion ====
  // Circle radius animates from 0
  const circleRadius = frame >= 180
    ? 56 * spring({ frame: frame - 180, fps, config: { damping: 14, stiffness: 70 } })
    : 0;

  // Circle retract (phase 10): radius shrinks back
  const circleRetractProgress = ease(progress(frame, 810, 870));
  const finalCircleRadius = circleRadius * (1 - circleRetractProgress);

  // Grid lines: draw on from center outward
  const gridLineDraw = (index: number) => {
    const start = 200 + index * 8;
    return ease(progress(frame, start, start + 30));
  };

  // Grid lines retract (phase 10)
  const gridLineRetract = (index: number) => {
    const start = 740 + index * 6;
    return ease(progress(frame, start, start + 30));
  };

  // Grid shapes: draw on with stagger
  const gridShapeDraw = (index: number) => {
    const start = 220 + index * 10;
    const dur = 35;
    return drawOn(frame, start, dur, GRID_SHAPES[index].length);
  };

  // Grid shapes retract
  const gridShapeRetract = (index: number) => {
    const start = 760 + index * 8;
    const dur = 30;
    return drawOff(frame, start, dur, GRID_SHAPES[index].length);
  };

  // ==== PHASES 5–9: Yellow accent set cycling ====
  // Set 0: draw 270–310, hold, retract 390–430
  // Set 1: draw 410–460, hold, retract 540–580
  // Set 2: draw 560–610, hold, retract 720–770

  const YELLOW_TIMING = [
    { drawStart: 270, drawDur: 40, retractStart: 390, retractDur: 40 },
    { drawStart: 410, drawDur: 45, retractStart: 540, retractDur: 40 },
    { drawStart: 560, drawDur: 45, retractStart: 720, retractDur: 45 },
  ];

  const yellowPathOffset = (
    setIdx: number,
    pathIdx: number,
    pathLength: number
  ) => {
    const t = YELLOW_TIMING[setIdx];
    const stagger = pathIdx * 8;
    const on = drawOn(frame, t.drawStart + stagger, t.drawDur, pathLength);
    const off = drawOff(frame, t.retractStart + stagger, t.retractDur, pathLength);
    return Math.max(on, off);
  };

  // Yellow set visibility (only render when in its active window)
  const yellowVisible = (setIdx: number) => {
    const t = YELLOW_TIMING[setIdx];
    return frame >= t.drawStart && frame <= t.retractStart + t.retractDur + 10;
  };

  // ==== Magenta construction guides ====
  const guideOffset = (guide: typeof GUIDE_LINES[0]) => {
    const t = YELLOW_TIMING[guide.set];
    const start = t.drawStart + guide.delay;
    const drawDur = 18;
    const holdEnd = start + drawDur + 20;
    const retractDur = 15;
    const on = drawOn(frame, start, drawDur, guide.length);
    const off = drawOff(frame, holdEnd, retractDur, guide.length);
    return Math.max(on, off);
  };

  const guideVisible = (guide: typeof GUIDE_LINES[0]) => {
    const t = YELLOW_TIMING[guide.set];
    const start = t.drawStart + guide.delay;
    const end = start + 18 + 20 + 15 + 5;
    return frame >= start && frame <= end;
  };

  // No scale changes after initial entrance — stability during grid + yellow phases

  // ==== Grid visible window ====
  const gridVisible = frame >= 180 && frame < 900;

  // ==== Overall composition scale for animate-in / animate-out ====
  // Animate in: scale from 0.85 → 1 with spring
  const enterScale = spring({
    frame,
    fps,
    config: { damping: 20, stiffness: 60 },
    from: 0.85,
    to: 1,
  });

  // Animate out: scale 1 → 0.8, then invisible
  const exitScale = frame >= 840
    ? interpolate(frame, [840, 900], [1, 0.75], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
        easing: (t) => t * t,
      })
    : 1;

  const exitOpacity = frame >= 870
    ? interpolate(frame, [870, 900], [1, 0], {
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

          {/* ---- Circle grid (phases 4–10) ---- */}
          {gridVisible && (
            <g>
              {/* Circle */}
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

              {/* Axis + diagonal lines — draw on, then retract */}
              {GRID_LINES.map((line, i) => {
                const draw = gridLineDraw(i);
                const retract = gridLineRetract(i);
                const p = Math.max(0, draw - retract);
                if (p <= 0) return null;
                // Draw outward from center: interpolate both endpoints from 0,0
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

              {/* Squares + diamonds — stroke draw-on/off */}
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

          {/* ---- Magenta construction guides ---- */}
          {GUIDE_LINES.map((guide, i) => {
            if (!guideVisible(guide)) return null;
            const offset = guideOffset(guide);
            if (offset >= guide.length - 0.5) return null;
            return (
              <path
                key={`guide-${i}`}
                d={guide.d}
                stroke={MAGENTA}
                strokeWidth={0.8}
                strokeLinecap="butt"
                fill="none"
                strokeDasharray={guide.length}
                strokeDashoffset={offset}
              />
            );
          })}

          {/* ---- Yellow accent sets (phases 5–9) ---- */}
          {YELLOW_SETS.map((set, setIdx) =>
            yellowVisible(setIdx) ? (
              <g key={`yellow-${setIdx}`}>
                {set.map((p, pathIdx) => {
                  const offset = yellowPathOffset(setIdx, pathIdx, p.length);
                  if (offset >= p.length - 0.5) return null;
                  return (
                    <path
                      key={`yp-${setIdx}-${pathIdx}`}
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
            ) : null
          )}
        </svg>
      </div>
    </AbsoluteFill>
  );
};
