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

const WARM_FILLS = [
  "#FFCF33",
  "#E8A040",
  "#DA5E55",
  "#F5D245",
  "#8B5E34",
  "#E8A040",
  "#F5D245",
];

const CYCLE_FILLS = [
  ["#FFCF33", "#E8A040", "#DA5E55", "#F5D245", "#8B5E34", "#E8A040", "#F5D245"],
  ["#DA5E55", "#F5D245", "#FFCF33", "#E8A040", "#F5D245", "#8B5E34", "#E8A040"],
  ["#E8A040", "#8B5E34", "#E8A040", "#DA5E55", "#FFCF33", "#F5D245", "#DA5E55"],
  ["#F5D245", "#DA5E55", "#8B5E34", "#FFCF33", "#E8A040", "#DA5E55", "#8B5E34"],
];

const BG = "#FDFCF8";
const NAVY = "#202A42";

// 3 stacked instances like CircleBloomV3 but warm palette
const INSTANCES = [
  { y: 600, stageOffset: 0 },
  { y: 1800, stageOffset: 2 },
  { y: 3000, stageOffset: 4 },
];

// ================================================================
// TIMELINE — 30fps, 900 frames = 30 seconds
// Portrait 2160x3600
// Warm opaque fills, 3 stacked instances
// ================================================================

export const CircleFlowersV3: React.FC = () => {
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

    const getCircleAppearFrame = (circleIndex: number): number => {
      const effectiveIndex = circleIndex - inst.stageOffset;
      if (effectiveIndex <= 0) return instanceDelay;
      return instanceDelay + effectiveIndex * 45;
    };

    const circleScale = (index: number): number => {
      const appearAt = getCircleAppearFrame(index);
      if (frame < appearAt) return 0;
      const maxStage = inst.stageOffset + Math.floor((frame - instanceDelay) / 45) + 1;
      if (index >= Math.min(7, maxStage)) return 0;
      return spring({
        frame: frame - appearAt,
        fps,
        config: { damping: 12, stiffness: 60 },
      });
    };

    const dotScale = (index: number): number => {
      const appearAt = getCircleAppearFrame(index) + 10;
      if (frame < appearAt) return 0;
      const maxStage = inst.stageOffset + Math.floor((frame - instanceDelay) / 45) + 1;
      if (index >= Math.min(7, maxStage)) return 0;
      return spring({
        frame: frame - appearAt,
        fps,
        config: { damping: 8, stiffness: 80, overshootClamping: false },
      });
    };

    // Color cycling starts at frame 400 per instance
    const cycleStart = 350 + instanceIndex * 60;

    const getCircleFill = (index: number): string => {
      if (frame < cycleStart) return WARM_FILLS[index];

      const cycleFrame = frame - cycleStart;
      const stagger = index * 8;
      const cycleDuration = 75;
      const totalCycle = cycleDuration * CYCLE_FILLS.length;
      const adjustedFrame = Math.max(0, cycleFrame - stagger);
      const cycleProgress = (adjustedFrame % totalCycle) / totalCycle;

      const cycleIndex = Math.floor(cycleProgress * CYCLE_FILLS.length);
      const nextCycleIndex = (cycleIndex + 1) % CYCLE_FILLS.length;
      const t = ease((cycleProgress * CYCLE_FILLS.length) % 1);

      const from = parseHex(CYCLE_FILLS[cycleIndex][index]);
      const to = parseHex(CYCLE_FILLS[nextCycleIndex][index]);

      const cr = Math.round(lerp(from.r, to.r, t));
      const cg = Math.round(lerp(from.g, to.g, t));
      const cb = Math.round(lerp(from.b, to.b, t));

      return `rgb(${cr},${cg},${cb})`;
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
                  stroke={NAVY}
                  strokeWidth={2}
                  fill={getCircleFill(i)}
                  opacity={cs}
                />
                {ds > 0.01 && (
                  <circle
                    cx={c.dotX}
                    cy={c.dotY}
                    r={r * ds}
                    fill={NAVY}
                    stroke={NAVY}
                    strokeWidth={1}
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
