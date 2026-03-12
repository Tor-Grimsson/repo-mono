import { useCurrentFrame, interpolate, AbsoluteFill, spring, useVideoConfig } from "remotion";

// Easing helper
const ease = (t: number) => t * t * (3 - 2 * t);

// Stroke draw-on: returns strokeDashoffset for a given path length
const useDrawOn = (
  frame: number,
  startFrame: number,
  duration: number,
  pathLength: number
) => {
  const progress = interpolate(frame, [startFrame, startFrame + duration], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return pathLength * (1 - ease(progress));
};

// Fade helper
const useFade = (frame: number, startFrame: number, duration: number) =>
  interpolate(frame, [startFrame, startFrame + duration], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

// ---- Hexagon geometry (figure 1, centered at 0,0) ----
// Original hex vertices: (46,−26), (46,26), (0,−52), (0,52), (−46,−26), (−46,26)
// The hex wireframe is 12 line segments connecting center + 6 vertices
const HEX_LINES = [
  // Right side
  { x1: 46, y1: 26, x2: 46, y2: -26 },
  { x1: 46, y1: 26, x2: 0, y2: 0 },
  { x1: 46, y1: 26, x2: 0, y2: 52 },
  { x1: 46, y1: -26, x2: 0, y2: 0 },
  { x1: 46, y1: -26, x2: 0, y2: -52 },
  // Left side
  { x1: -46, y1: -26, x2: -46, y2: 26 },
  { x1: -46, y1: -26, x2: 0, y2: 0 },
  { x1: -46, y1: -26, x2: 0, y2: -52 },
  { x1: -46, y1: 26, x2: 0, y2: 0 },
  { x1: -46, y1: 26, x2: 0, y2: 52 },
  // Center vertical
  { x1: 0, y1: 0, x2: 0, y2: 52 },
  { x1: 0, y1: 0, x2: 0, y2: -52 },
];

// Hex yellow accent paths (figure 1)
const HEX_YELLOW = [
  "M0 0L46 -25.75L46 26L0 0Z",
  "M0 0L0 -52L0 52",
];

// ---- Circle grid geometry (figures 2-4, centered at 0,0, r=56) ----
// Grid elements that build on from the hexagon

// Yellow accent paths per figure (translated to 0,0 center)
const YELLOW_SETS = [
  // Figure 2: vertical + 3 diagonals
  [
    { d: "M0 -56V56", length: 112 },
    { d: "M0 56L28 28", length: 40 },
    { d: "M-20 20L20 -20", length: 57 },
    { d: "M-28 -28L0 -56", length: 40 },
  ],
  // Figure 3: vertical + arrow/star shape
  [
    { d: "M0 -56L0 40", length: 96 },
    { d: "M16 -40L0 -56", length: 22 },
    { d: "M40 40L0 0", length: 57 },
    { d: "M0 40L-40 0", length: 57 },
    { d: "M-40 40L0 0", length: 57 },
    { d: "M0 40L40 0", length: 57 },
  ],
  // Figure 4: vertical + horizontal + diagonals
  [
    { d: "M0 -56L0 40", length: 96 },
    { d: "M-40 0L-20 -20", length: 28 },
    { d: "M0 40L40 0", length: 57 },
    { d: "M-40 0H40", length: 80 },
    { d: "M16 -40L-16 -40", length: 32 },
  ],
];

const BG = "#202A42";
const WHITE = "rgba(255,255,255,0.5)";
const GOLD = "#F5D245";

// ---- Timeline (frames at 30fps) ----
// Phase 1: 0-45    Hex wireframe draws on (1.5s)
// Phase 2: 45-75   Hex yellow accents draw on (1s)
// Phase 3: 75-105  Hold hex, then morph to circle grid (1s)
// Phase 4: 105-135 Circle grid settles, hex yellow fades (1s)
// Phase 5: 135-165 Yellow set 1 draws on (1s)
// Phase 6: 165-195 Hold, then yellow set 1 fades / set 2 draws (1s)
// Phase 7: 195-225 Yellow set 2 holds, fades / set 3 draws (1s)
// Phase 8: 225-270 Hold final state, fade out (1.5s)

export const GridSymbols: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const SCALE = 3.2; // Scale up the 112px-radius artwork to fill 1080p

  // ---- Phase 1: Hex wireframe ----
  const hexLineProgress = (index: number) => {
    const stagger = index * 2;
    return interpolate(frame, [stagger, stagger + 20], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });
  };

  // ---- Phase 2: Hex yellow ----
  const hexYellowOpacity = useFade(frame, 45, 15);
  const hexYellowDraw1 = useDrawOn(frame, 45, 20, 160);
  const hexYellowDraw2 = useDrawOn(frame, 50, 20, 104);

  // ---- Phase 3: Morph hex → circle ----
  // Hex fades out, circle grid fades in
  const hexFadeOut = interpolate(frame, [80, 105], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const hexYellowFadeOut = interpolate(frame, [75, 90], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const gridFadeIn = interpolate(frame, [85, 115], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Circle expands from 0 using spring
  const circleScale = frame >= 90
    ? spring({ frame: frame - 90, fps, config: { damping: 15, stiffness: 80 } })
    : 0;

  // Grid internal lines stagger in
  const gridLineOpacity = (index: number) => {
    const start = 95 + index * 3;
    return interpolate(frame, [start, start + 15], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });
  };

  // ---- Phase 5-7: Yellow accent sets ----
  const yellowSetIndex = (() => {
    if (frame < 130) return -1;
    if (frame < 175) return 0;
    if (frame < 215) return 1;
    return 2;
  })();

  const yellowSetOpacity = (setIdx: number) => {
    const starts = [130, 175, 215];
    const ends = [165, 205, 255];
    if (frame < starts[setIdx]) return 0;
    // Draw in
    const fadeIn = interpolate(frame, [starts[setIdx], starts[setIdx] + 15], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });
    // Fade out (except last)
    if (setIdx < 2) {
      const fadeOut = interpolate(frame, [ends[setIdx], ends[setIdx] + 10], [1, 0], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      });
      return fadeIn * fadeOut;
    }
    return fadeIn;
  };

  const yellowPathDraw = (setIdx: number, pathIdx: number, pathLength: number) => {
    const starts = [130, 175, 215];
    const stagger = pathIdx * 4;
    return useDrawOn(frame, starts[setIdx] + stagger, 18, pathLength);
  };

  // ---- Final fade out ----
  const finalFade = interpolate(frame, [255, 270], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: BG }}>
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: `translate(-50%, -50%) scale(${SCALE})`,
          opacity: finalFade,
        }}
      >
        <svg
          width="224"
          height="224"
          viewBox="-112 -112 224 224"
          fill="none"
          style={{ overflow: "visible" }}
        >
          {/* Phase 1: Hexagon wireframe */}
          <g opacity={hexFadeOut}>
            {HEX_LINES.map((line, i) => {
              const dx = line.x2 - line.x1;
              const dy = line.y2 - line.y1;
              const len = Math.sqrt(dx * dx + dy * dy);
              const progress = hexLineProgress(i);
              return (
                <line
                  key={`hex-${i}`}
                  x1={line.x1}
                  y1={line.y1}
                  x2={line.x1 + dx * ease(progress)}
                  y2={line.y1 + dy * ease(progress)}
                  stroke={WHITE}
                  strokeWidth={0.5}
                />
              );
            })}
          </g>

          {/* Phase 2: Hex yellow accents */}
          <g opacity={hexYellowOpacity * hexYellowFadeOut}>
            <path
              d={HEX_YELLOW[0]}
              stroke={GOLD}
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              strokeDasharray={160}
              strokeDashoffset={hexYellowDraw1}
            />
            <path
              d={HEX_YELLOW[1]}
              stroke={GOLD}
              strokeWidth={2}
              strokeLinecap="round"
              fill="none"
              strokeDasharray={104}
              strokeDashoffset={hexYellowDraw2}
            />
          </g>

          {/* Phase 3-4: Circle grid */}
          <g opacity={gridFadeIn}>
            {/* Circle */}
            <circle
              cx={0}
              cy={0}
              r={56}
              stroke={WHITE}
              strokeWidth={0.5}
              fill="none"
              transform={`scale(${circleScale})`}
              style={{ transformOrigin: "center" }}
            />

            {/* Vertical axis */}
            <line
              x1={0} y1={-56} x2={0} y2={56}
              stroke={WHITE}
              strokeWidth={0.5}
              opacity={gridLineOpacity(0)}
            />
            {/* Horizontal axis */}
            <line
              x1={-56} y1={0} x2={56} y2={0}
              stroke={WHITE}
              strokeWidth={0.5}
              opacity={gridLineOpacity(1)}
            />
            {/* Diagonal 1 */}
            <line
              x1={39.375} y1={-39.375} x2={-39.375} y2={39.375}
              stroke={WHITE}
              strokeWidth={0.5}
              opacity={gridLineOpacity(2)}
            />
            {/* Diagonal 2 */}
            <line
              x1={39.375} y1={39.375} x2={-39.375} y2={-39.375}
              stroke={WHITE}
              strokeWidth={0.5}
              opacity={gridLineOpacity(3)}
            />
            {/* Outer square */}
            <rect
              x={-40} y={-40} width={80} height={80}
              stroke={WHITE}
              strokeWidth={0.5}
              fill="none"
              opacity={gridLineOpacity(4)}
            />
            {/* Inner square */}
            <rect
              x={-28} y={-28} width={56} height={56}
              stroke={WHITE}
              strokeWidth={0.5}
              fill="none"
              opacity={gridLineOpacity(5)}
            />
            {/* Outer diamond */}
            <rect
              x={0} y={-56}
              width={79.196} height={79.196}
              transform="rotate(45 0 -56)"
              stroke={WHITE}
              strokeWidth={0.5}
              fill="none"
              opacity={gridLineOpacity(6)}
            />
            {/* Inner diamond */}
            <rect
              x={0} y={-40}
              width={56.569} height={56.569}
              transform="rotate(45 0 -40)"
              stroke={WHITE}
              strokeWidth={0.5}
              fill="none"
              opacity={gridLineOpacity(7)}
            />
          </g>

          {/* Phase 5-7: Yellow accent sets */}
          {YELLOW_SETS.map((set, setIdx) => (
            <g key={`yellow-${setIdx}`} opacity={yellowSetOpacity(setIdx)}>
              {set.map((p, pathIdx) => (
                <path
                  key={`yp-${setIdx}-${pathIdx}`}
                  d={p.d}
                  stroke={GOLD}
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="bevel"
                  fill="none"
                  strokeDasharray={p.length}
                  strokeDashoffset={yellowPathDraw(setIdx, pathIdx, p.length)}
                />
              ))}
            </g>
          ))}
        </svg>
      </div>
    </AbsoluteFill>
  );
};
