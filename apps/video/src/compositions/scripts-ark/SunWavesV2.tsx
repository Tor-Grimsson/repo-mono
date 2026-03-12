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

// ---- Colors ----
const BG = "#121215";
const GOLD = "#FFCC00";

// ---- Geometry ----
const R = 112;
const WAVE_WIDTH = R * 1.8;
const WAVE_AMPLITUDE = 12;
const WAVE_PERIODS = 4;
const WAVE_SPACING = 26;

// 3 wave rows (state 3)
const WAVE_Y_POSITIONS = [
  -WAVE_SPACING,
  0,
  WAVE_SPACING,
];

const waveRow = (
  y: number,
  amplitude: number,
  periods: number,
  width: number
) => {
  const halfW = width / 2;
  let d = `M${-halfW} ${y}`;
  const segWidth = width / periods;
  for (let i = 0; i < periods; i++) {
    const x1 = -halfW + i * segWidth;
    const x2 = -halfW + (i + 0.5) * segWidth;
    const x3 = -halfW + (i + 1) * segWidth;
    d += ` C${x1 + segWidth / 4} ${y - amplitude} ${x2 - segWidth / 4} ${y - amplitude} ${x2} ${y}`;
    d += ` C${x2 + segWidth / 4} ${y + amplitude} ${x3 - segWidth / 4} ${y + amplitude} ${x3} ${y}`;
  }
  return d;
};

const TOP_HALF_Y = -WAVE_SPACING * 1.5 - 8;
const BOTTOM_HALF_Y = WAVE_SPACING * 1.5 + 8;

// ================================================================
// TIMELINE — 30fps, 450 frames = 15 seconds
// Portrait 2160×3600 — large centered sun+waves
// Slow ocean motion — longer period sine waves
// ================================================================
// 0-45f:    Circle fades in
// 45-120f:  Sun pulse — scale 1→1.1→1
// 120-300f: Waves undulate — slow ocean sine
// 300-450f: Fade out, scale down to 0.9
// ================================================================

export const SunWavesV2: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Fade in
  const fadeIn = ease(progress(frame, 0, 45));

  // Sun pulse
  const pulseT = progress(frame, 45, 120);
  const sunPulse = 1 + 0.1 * Math.sin(pulseT * Math.PI);

  // Gentle ongoing pulse
  const gentlePulse =
    frame >= 120 && frame < 300
      ? 1 + 0.03 * Math.sin(((frame - 120) / 30) * Math.PI * 0.6)
      : 1;

  // Fade out
  const fadeOut = frame >= 300 ? 1 - ease(progress(frame, 300, 450)) : 1;
  const scaleOut = frame >= 300
    ? interpolate(frame, [300, 450], [1, 0.9], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      })
    : 1;

  // Entrance spring
  const enterScale = spring({
    frame,
    fps,
    config: { damping: 16, stiffness: 50 },
    from: 0.6,
    to: 1,
  });

  const compositeScale = enterScale * sunPulse * gentlePulse * scaleOut;
  const compositeOpacity = fadeIn * fadeOut;

  // Slow ocean wave undulation — longer periods than landscape version
  const waveUndulate = (index: number) => {
    if (frame < 45) return 0;
    const t = (frame - 45) / 30;
    const phaseOffset = index * 1.5; // wider phase spread
    const amplitude = frame >= 300 ? 5 * fadeOut : 5;
    // Slower frequency (1.0 vs 1.8 in landscape)
    return Math.sin(t * 1.0 + phaseOffset) * amplitude;
  };

  // Portrait: bigger scale to fill canvas
  const viewScale = (3600 * 0.25) / R;

  return (
    <AbsoluteFill style={{ backgroundColor: BG }}>
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: `translate(-50%, -50%) scale(${compositeScale * viewScale})`,
          opacity: compositeOpacity,
        }}
      >
        <svg
          width={R * 3}
          height={R * 4}
          viewBox={`${-R * 1.5} ${-R * 2} ${R * 3} ${R * 4}`}
          fill="none"
          style={{ overflow: "visible" }}
        >
          <defs>
            <clipPath id="clip-top-sun-v2">
              <rect x={-R - 10} y={-R - 10} width={R * 2 + 20} height={R + 10} />
            </clipPath>
            <clipPath id="clip-bottom-sun-v2">
              <rect x={-R - 10} y={0} width={R * 2 + 20} height={R + 10} />
            </clipPath>
          </defs>

          {/* Top half-circle (sun) */}
          <g
            clipPath="url(#clip-top-sun-v2)"
            transform={`translate(0, ${TOP_HALF_Y})`}
          >
            <circle cx={0} cy={0} r={R} fill={GOLD} />
          </g>

          {/* Bottom half-circle */}
          <g
            clipPath="url(#clip-bottom-sun-v2)"
            transform={`translate(0, ${BOTTOM_HALF_Y})`}
          >
            <circle cx={0} cy={0} r={R} fill={GOLD} />
          </g>

          {/* Wave rows — slow ocean motion */}
          {WAVE_Y_POSITIONS.map((baseY, i) => {
            const undulateY = waveUndulate(i);
            const d = waveRow(baseY + undulateY, WAVE_AMPLITUDE, WAVE_PERIODS, WAVE_WIDTH);
            return (
              <path
                key={`wave-${i}`}
                d={d}
                stroke={GOLD}
                strokeWidth={4}
                strokeLinecap="round"
                fill="none"
              />
            );
          })}
        </svg>
      </div>
    </AbsoluteFill>
  );
};
