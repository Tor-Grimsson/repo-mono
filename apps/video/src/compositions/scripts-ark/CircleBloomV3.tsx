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

// 3 instances at y=600, 1800, 3000 with stage offsets 1, 3, 5
const INSTANCES = [
  { y: 600, stageOffset: 0 },
  { y: 1800, stageOffset: 2 },
  { y: 3000, stageOffset: 4 },
];

// ================================================================
// TIMELINE — 30fps, 900 frames = 30 seconds
// Portrait 2160x3600
// Each instance builds from its stage offset
// ================================================================

export const CircleBloomV3: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const SCALE = 3.0;

  const parseHex = (hex: string) => ({
    r: parseInt(hex.slice(1, 3), 16),
    g: parseInt(hex.slice(3, 5), 16),
    b: parseInt(hex.slice(5, 7), 16),
  });

  const renderFlower = (instanceIndex: number) => {
    const inst = INSTANCES[instanceIndex];
    const instanceDelay = instanceIndex * 60;

    // Each circle in the flower has its own appear time
    const getCircleAppearFrame = (circleIndex: number): number => {
      // The instance starts with `stageOffset` circles already conceptually present
      // but they still animate in with stagger
      const effectiveIndex = circleIndex - inst.stageOffset;
      if (effectiveIndex <= 0) return instanceDelay;
      return instanceDelay + effectiveIndex * 50;
    };

    const circleScale = (index: number): number => {
      const appearAt = getCircleAppearFrame(index);
      if (frame < appearAt) return 0;
      // Only show circles that belong to stages up to stage offset + progressive
      const maxStage = inst.stageOffset + Math.floor((frame - instanceDelay) / 50) + 1;
      if (index >= Math.min(7, maxStage)) return 0;
      return spring({
        frame: frame - appearAt,
        fps,
        config: { damping: 12, stiffness: 60 },
      });
    };

    const dotScale = (index: number): number => {
      const appearAt = getCircleAppearFrame(index) + 12;
      if (frame < appearAt) return 0;
      const maxStage = inst.stageOffset + Math.floor((frame - instanceDelay) / 50) + 1;
      if (index >= Math.min(7, maxStage)) return 0;
      return spring({
        frame: frame - appearAt,
        fps,
        config: { damping: 8, stiffness: 80, overshootClamping: false },
      });
    };

    // Color bloom starts at frame 500 for each instance
    const bloomStart = 450 + instanceIndex * 50;
    const bloomProgress = (index: number): number => {
      const stagger = index * 15;
      return ease(progress(frame, bloomStart + stagger, bloomStart + 100 + stagger));
    };

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
        key={`inst-${instanceIndex}`}
        style={{
          position: "absolute",
          top: inst.y,
          left: 1080,
          transform: `translate(-50%, -50%) scale(${SCALE})`,
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
      {INSTANCES.map((_, i) => renderFlower(i))}
    </AbsoluteFill>
  );
};
