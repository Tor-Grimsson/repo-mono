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

// Two flowers side by side
const FLOWERS = [
  { x: 1280, y: 1080, startFrame: 0 },
  { x: 2560, y: 1080, startFrame: 60 },
];

// ================================================================
// TIMELINE — 30fps, 900 frames = 30 seconds
// 4K 3840x2160
// Two flowers with offset timing
// ================================================================

export const CircleBloomV5: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const SCALE = 4.0;

  const parseHex = (hex: string) => ({
    r: parseInt(hex.slice(1, 3), 16),
    g: parseInt(hex.slice(3, 5), 16),
    b: parseInt(hex.slice(5, 7), 16),
  });

  const renderFlower = (flowerIndex: number) => {
    const flower = FLOWERS[flowerIndex];
    const localFrame = frame - flower.startFrame;

    const getCircleAppearFrame = (index: number): number => {
      return index * 45;
    };

    const circleScale = (index: number): number => {
      const appearAt = getCircleAppearFrame(index);
      if (localFrame < appearAt) return 0;
      return spring({
        frame: localFrame - appearAt,
        fps,
        config: { damping: 12, stiffness: 60 },
      });
    };

    const dotScale = (index: number): number => {
      const appearAt = getCircleAppearFrame(index) + 12;
      if (localFrame < appearAt) return 0;
      return spring({
        frame: localFrame - appearAt,
        fps,
        config: { damping: 8, stiffness: 80, overshootClamping: false },
      });
    };

    // Color bloom starts after all stages built (~315f after start)
    const bloomStart = 350;
    const bloomProgress = (index: number): number => {
      const stagger = index * 15;
      return ease(progress(localFrame, bloomStart + stagger, bloomStart + 120 + stagger));
    };

    const pulsePhase = localFrame >= 450
      ? 1 + 0.025 * Math.sin(((localFrame - 450) / 30) * Math.PI * 2)
      : 1;

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
      return BLOOM_COLORS[index];
    };

    return (
      <div
        key={`flower-${flowerIndex}`}
        style={{
          position: "absolute",
          top: flower.y,
          left: flower.x,
          transform: `translate(-50%, -50%) scale(${SCALE * pulsePhase})`,
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
              <g key={`c-${i}`}>
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
    );
  };

  return (
    <AbsoluteFill style={{ backgroundColor: BG }}>
      {FLOWERS.map((_, i) => renderFlower(i))}
    </AbsoluteFill>
  );
};
