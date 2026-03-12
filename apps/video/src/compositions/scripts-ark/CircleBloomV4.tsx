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
// TIMELINE — 30fps, 450 frames = 15 seconds
// Square 1080x1080, punchy
// 0-150:   Fast build (all stages)
// 150-450: Long color bloom with pulsing scale
// ================================================================

export const CircleBloomV4: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const SCALE = 4.0;

  // Fast build: all 7 circles in 150 frames (~21f each)
  const getCircleAppearFrame = (index: number): number => {
    return index * 20;
  };

  const circleScale = (index: number): number => {
    const appearAt = getCircleAppearFrame(index);
    if (frame < appearAt) return 0;
    return spring({
      frame: frame - appearAt,
      fps,
      config: { damping: 10, stiffness: 80 },
    });
  };

  const dotScale = (index: number): number => {
    const appearAt = getCircleAppearFrame(index) + 8;
    if (frame < appearAt) return 0;
    return spring({
      frame: frame - appearAt,
      fps,
      config: { damping: 7, stiffness: 90, overshootClamping: false },
    });
  };

  // Color bloom: 150-350 with stagger
  const bloomProgress = (index: number): number => {
    const stagger = index * 10;
    return ease(progress(frame, 150 + stagger, 250 + stagger));
  };

  // Pulsing scale during bloom phase
  const pulseScale =
    frame >= 150
      ? 1 + 0.04 * Math.sin(((frame - 150) / 20) * Math.PI * 2) * ease(progress(frame, 150, 200))
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
    const ca = lerp(0.1, 0.4, bp);
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
    return BLOOM_COLORS[index];
  };

  // Glow effect intensity during bloom
  const glowIntensity = ease(progress(frame, 200, 300));

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
          {/* Glow behind the pattern */}
          {glowIntensity > 0 && (
            <circle
              cx={0}
              cy={0}
              r={120}
              fill="none"
              stroke={`rgba(255,207,51,${0.15 * glowIntensity})`}
              strokeWidth={60}
              style={{ filter: `blur(20px)` }}
            />
          )}
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
