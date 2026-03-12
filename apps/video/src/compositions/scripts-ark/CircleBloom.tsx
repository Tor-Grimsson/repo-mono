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

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

// ---- Flower of Life geometry ----
const R = 64; // circle radius
const r = 12; // dot radius
const D = 96; // distance between centers

const ANGLES = [0, 60, 120, 180, 240, 300].map((a) => (a * Math.PI) / 180);

interface CircleData {
  cx: number;
  cy: number;
  dotX: number;
  dotY: number;
}

const generateCircles = (): CircleData[] => {
  const circles: CircleData[] = [];
  // Center circle
  circles.push({ cx: 0, cy: 0, dotX: 0, dotY: -(R + r) });
  // Ring of 6
  for (const angle of ANGLES) {
    const cx = D * Math.cos(angle);
    const cy = D * Math.sin(angle);
    const dist = Math.sqrt(cx * cx + cy * cy);
    const nx = cx / dist;
    const ny = cy / dist;
    circles.push({
      cx,
      cy,
      dotX: cx + nx * (R + r),
      dotY: cy + ny * (R + r),
    });
  }
  return circles;
};

const CIRCLES = generateCircles();

// 7 cumulative stages
const STAGES = [
  [0],
  [0, 1],
  [0, 1, 2],
  [0, 1, 2, 3],
  [0, 1, 2, 3, 4],
  [0, 1, 2, 3, 4, 5],
  [0, 1, 2, 3, 4, 5, 6],
];

// Color bloom targets
const BLOOM_COLORS = [
  "#FFCF33", // center - gold
  "#DA5E55", // 0° - red
  "#E8A040", // 60° - orange
  "#F5D245", // 120° - yellow
  "#DA5E55", // 180° - red
  "#E8A040", // 240° - orange
  "#F5D245", // 300° - yellow
];

const BG = "#202A42";

// ================================================================
// TIMELINE — 30fps, 600 frames = 20 seconds
// ================================================================
// 0-60:    Stage 1 (center)
// 60-120:  Stage 2
// 120-180: Stage 3
// 180-240: Stage 4
// 240-300: Stage 5
// 300-360: Stage 6 + 7
// 360-600: Color bloom + gentle pulse
// ================================================================

export const CircleBloom: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const SCALE = 3.5;

  // Determine which circles are visible and their appear frame
  const circleAppearFrame = (index: number): number => {
    // Stage 1 at frame 0, stage 2 at frame 60, etc.
    for (let s = 0; s < STAGES.length; s++) {
      if (STAGES[s].includes(index)) {
        return s * 50; // ~50 frames between stages for smooth pacing
      }
    }
    return 600;
  };

  // Stage timing: stages at 0, 50, 100, 150, 200, 250, 300
  const stageFrames = [0, 50, 100, 150, 200, 250, 300];

  const getCircleAppearFrame = (index: number): number => {
    if (index === 0) return stageFrames[0];
    return stageFrames[index]; // index 1-6 map to stages 2-7
  };

  // Circle scale animation
  const circleScale = (index: number): number => {
    const appearAt = getCircleAppearFrame(index);
    if (frame < appearAt) return 0;
    return spring({
      frame: frame - appearAt,
      fps,
      config: { damping: 12, stiffness: 60 },
    });
  };

  // Dot scale animation (delayed after circle, with overshoot)
  const dotScale = (index: number): number => {
    const appearAt = getCircleAppearFrame(index) + 12;
    if (frame < appearAt) return 0;
    return spring({
      frame: frame - appearAt,
      fps,
      config: { damping: 8, stiffness: 80, overshootClamping: false },
    });
  };

  // Color bloom (frames 360-560)
  const bloomProgress = (index: number): number => {
    const stagger = index * 15;
    return ease(progress(frame, 360 + stagger, 460 + stagger));
  };

  // Gentle pulse in bloom phase
  const pulseScale =
    frame >= 400
      ? 1 + 0.02 * Math.sin(((frame - 400) / 30) * Math.PI * 2)
      : 1;

  const getCircleFill = (index: number): string => {
    const bp = bloomProgress(index);
    if (bp <= 0) return "rgba(255,255,255,0.1)";
    const r0 = 255,
      g0 = 255,
      b0 = 255,
      a0 = 0.1;
    // Parse target color
    const tc = BLOOM_COLORS[index];
    const tr = parseInt(tc.slice(1, 3), 16);
    const tg = parseInt(tc.slice(3, 5), 16);
    const tb = parseInt(tc.slice(5, 7), 16);
    const ta = 0.35;
    const cr = Math.round(lerp(r0, tr, bp));
    const cg = Math.round(lerp(g0, tg, bp));
    const cb = Math.round(lerp(b0, tb, bp));
    const ca = lerp(a0, ta, bp);
    return `rgba(${cr},${cg},${cb},${ca})`;
  };

  const getStrokeColor = (index: number): string => {
    const bp = bloomProgress(index);
    if (bp <= 0) return "white";
    const tc = BLOOM_COLORS[index];
    const tr = parseInt(tc.slice(1, 3), 16);
    const tg = parseInt(tc.slice(3, 5), 16);
    const tb = parseInt(tc.slice(5, 7), 16);
    const cr = Math.round(lerp(255, tr, bp));
    const cg = Math.round(lerp(255, tg, bp));
    const cb = Math.round(lerp(255, tb, bp));
    return `rgb(${cr},${cg},${cb})`;
  };

  const getDotFill = (index: number): string => {
    const bp = bloomProgress(index);
    if (bp <= 0) return "white";
    return BLOOM_COLORS[index];
  };

  return (
    <AbsoluteFill style={{ backgroundColor: BG }}>
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: `translate(-50%, -50%) scale(${SCALE * pulseScale})`,
        }}
      >
        <svg
          width="300"
          height="300"
          viewBox="-150 -150 300 300"
          fill="none"
          style={{ overflow: "visible" }}
        >
          {CIRCLES.map((c, i) => {
            const cs = circleScale(i);
            if (cs <= 0.01) return null;
            const ds = dotScale(i);
            return (
              <g key={`circle-${i}`}>
                {/* Circle */}
                <circle
                  cx={c.cx}
                  cy={c.cy}
                  r={R * cs}
                  stroke={getStrokeColor(i)}
                  strokeWidth={1}
                  strokeLinecap="round"
                  strokeDasharray="2 4"
                  fill={getCircleFill(i)}
                  opacity={cs}
                />
                {/* Dot */}
                {ds > 0.01 && (
                  <circle
                    cx={c.dotX}
                    cy={c.dotY}
                    r={r * ds}
                    fill={getDotFill(i)}
                    opacity={ds}
                  />
                )}
              </g>
            );
          })}
        </svg>
      </div>
    </AbsoluteFill>
  );
};
