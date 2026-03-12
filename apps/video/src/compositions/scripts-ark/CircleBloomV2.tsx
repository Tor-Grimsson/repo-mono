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
const R = 64;
const r = 12;
const D = 96;

const ANGLES = [0, 60, 120, 180, 240, 300].map((a) => (a * Math.PI) / 180);

interface CircleData {
  cx: number;
  cy: number;
  dotX: number;
  dotY: number;
}

const generateCircles = (): CircleData[] => {
  const circles: CircleData[] = [];
  circles.push({ cx: 0, cy: 0, dotX: 0, dotY: -(R + r) });
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

const BLOOM_COLORS = [
  "#FFCF33",
  "#DA5E55",
  "#E8A040",
  "#F5D245",
  "#DA5E55",
  "#E8A040",
  "#F5D245",
];

const BG = "#202A42";

// ================================================================
// TIMELINE — 30fps, 900 frames = 30 seconds (loopable)
// ================================================================
// 0-300:   Build all 7 stages (~43f each)
// 300-450: Color bloom
// 450-550: Hold
// 550-650: Color reverse
// 650-900: Circle collapse reverse (matching frame 0 state)
// ================================================================

export const CircleBloomV2: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const SCALE = 3.5;

  const stageFrames = [0, 43, 86, 129, 172, 215, 258];

  const getCircleAppearFrame = (index: number): number => {
    if (index === 0) return stageFrames[0];
    return stageFrames[index];
  };

  // Collapse: reverse order, starting at frame 650
  const getCircleCollapseFrame = (index: number): number => {
    const reverseIndex = 6 - index;
    return 680 + reverseIndex * 30;
  };

  const circleScale = (index: number): number => {
    const appearAt = getCircleAppearFrame(index);
    const collapseAt = getCircleCollapseFrame(index);

    // Build phase
    let buildScale = 0;
    if (frame >= appearAt) {
      buildScale = spring({
        frame: Math.min(frame, 650) - appearAt,
        fps,
        config: { damping: 12, stiffness: 60 },
      });
    }

    // Collapse phase
    if (frame >= collapseAt) {
      const collapseProgress = ease(progress(frame, collapseAt, collapseAt + 35));
      buildScale *= 1 - collapseProgress;
    }

    return buildScale;
  };

  const dotScale = (index: number): number => {
    const appearAt = getCircleAppearFrame(index) + 12;
    const collapseAt = getCircleCollapseFrame(index) - 5;

    let buildScale = 0;
    if (frame >= appearAt) {
      buildScale = spring({
        frame: Math.min(frame, 650) - appearAt,
        fps,
        config: { damping: 8, stiffness: 80, overshootClamping: false },
      });
    }

    if (frame >= collapseAt) {
      const collapseProgress = ease(progress(frame, collapseAt, collapseAt + 30));
      buildScale *= 1 - collapseProgress;
    }

    return buildScale;
  };

  // Color bloom: 300-450 forward, 550-650 reverse
  const bloomProgress = (index: number): number => {
    const stagger = index * 12;
    const forward = ease(progress(frame, 300 + stagger, 400 + stagger));
    const reverse = ease(progress(frame, 550 + stagger, 650 + stagger));
    return Math.max(0, forward - reverse);
  };

  const pulseScale =
    frame >= 400 && frame <= 600
      ? 1 + 0.02 * Math.sin(((frame - 400) / 25) * Math.PI * 2)
      : 1;

  const parseHex = (hex: string) => ({
    r: parseInt(hex.slice(1, 3), 16),
    g: parseInt(hex.slice(3, 5), 16),
    b: parseInt(hex.slice(5, 7), 16),
  });

  const getCircleFill = (index: number): string => {
    const bp = bloomProgress(index);
    if (bp <= 0) return "rgba(255,255,255,0.1)";
    const tc = parseHex(BLOOM_COLORS[index]);
    const cr = Math.round(lerp(255, tc.r, bp));
    const cg = Math.round(lerp(255, tc.g, bp));
    const cb = Math.round(lerp(255, tc.b, bp));
    const ca = lerp(0.1, 0.35, bp);
    return `rgba(${cr},${cg},${cb},${ca})`;
  };

  const getStrokeColor = (index: number): string => {
    const bp = bloomProgress(index);
    if (bp <= 0) return "white";
    const tc = parseHex(BLOOM_COLORS[index]);
    const cr = Math.round(lerp(255, tc.r, bp));
    const cg = Math.round(lerp(255, tc.g, bp));
    const cb = Math.round(lerp(255, tc.b, bp));
    return `rgb(${cr},${cg},${cb})`;
  };

  const getDotFill = (index: number): string => {
    const bp = bloomProgress(index);
    if (bp <= 0) return "white";
    const tc = parseHex(BLOOM_COLORS[index]);
    const cr = Math.round(lerp(255, tc.r, bp));
    const cg = Math.round(lerp(255, tc.g, bp));
    const cb = Math.round(lerp(255, tc.b, bp));
    return `rgb(${cr},${cg},${cb})`;
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
