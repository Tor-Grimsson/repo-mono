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

const drawOn = (frame: number, start: number, dur: number, len: number) =>
  len * (1 - ease(progress(frame, start, start + dur)));

const drawOff = (frame: number, start: number, dur: number, len: number) =>
  len * ease(progress(frame, start, start + dur));

// ---- Colors ----
const BG = "#121215";
const GOLD = "#FFCC00";

// ---- Geometry ----
const R = 112;
const CX = 0;
const CY = 0;

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

const waveLength = (periods: number, width: number, amplitude: number) => {
  const segWidth = width / periods;
  const arcLen = Math.sqrt((segWidth / 2) ** 2 + (amplitude * 2) ** 2) * 1.2;
  return arcLen * periods * 2;
};

const WAVE_WIDTH = R * 1.8;
const WAVE_AMPLITUDE = 12;
const WAVE_PERIODS = 4;
const WAVE_PATH_LEN = waveLength(WAVE_PERIODS, WAVE_WIDTH, WAVE_AMPLITUDE);

const WAVE_SPACING = 26;
const waveYPositions = [
  -WAVE_SPACING * 1.5,
  -WAVE_SPACING * 0.5,
  WAVE_SPACING * 0.5,
  WAVE_SPACING * 1.5,
];

// ================================================================
// TIMELINE — 30fps, 600 frames = 20 seconds
// Portrait 2160×3600 version
// ================================================================

export const HamburgerV2: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const enterScale = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 60 },
    from: 0,
    to: 1,
  });

  const exitPulse =
    frame >= 540
      ? 1 + 0.08 * Math.sin(ease(progress(frame, 540, 600)) * Math.PI)
      : 1;

  const compositeScale = enterScale * exitPulse;

  const splitOpen = ease(progress(frame, 60, 150));
  const splitMore = ease(progress(frame, 250, 350));
  const splitClose = ease(progress(frame, 450, 540));
  const splitAmount = Math.max(0, (splitOpen + splitMore * 0.6) * (1 - splitClose));

  const maxSep = R * 0.9;
  const separation = splitAmount * maxSep;

  const wave1On = drawOn(frame, 150, 60, WAVE_PATH_LEN);
  const wave2On = drawOn(frame, 260, 50, WAVE_PATH_LEN);
  const wave3On = drawOn(frame, 290, 50, WAVE_PATH_LEN);
  const wave4On = drawOn(frame, 350, 60, WAVE_PATH_LEN);

  const wave1Off = drawOff(frame, 480, 40, WAVE_PATH_LEN);
  const wave2Off = drawOff(frame, 470, 40, WAVE_PATH_LEN);
  const wave3Off = drawOff(frame, 460, 40, WAVE_PATH_LEN);
  const wave4Off = drawOff(frame, 450, 40, WAVE_PATH_LEN);

  const waveOffsets = [
    Math.max(wave1On, wave1Off),
    Math.max(wave2On, wave2Off),
    Math.max(wave3On, wave3Off),
    Math.max(wave4On, wave4Off),
  ];

  const clipOpacity = frame >= 60 ? 1 : 0;
  const showFullCircle = frame < 60 || frame >= 560;
  const fullCircleOpacity = showFullCircle ? 1 : 0;
  const halvesVisible = frame >= 55 && frame < 565;

  // Portrait: fill ~30% of 3600 height
  const viewScale = (3600 * 0.3) / (R * 2);

  return (
    <AbsoluteFill style={{ backgroundColor: BG }}>
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: `translate(-50%, -50%) scale(${compositeScale * viewScale})`,
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
            <clipPath id="clip-top-v2">
              <rect x={-R - 10} y={-R - 10} width={R * 2 + 20} height={R + 10} />
            </clipPath>
            <clipPath id="clip-bottom-v2">
              <rect x={-R - 10} y={0} width={R * 2 + 20} height={R + 10} />
            </clipPath>
          </defs>

          {fullCircleOpacity > 0 && (
            <circle cx={CX} cy={CY} r={R} fill={GOLD} opacity={fullCircleOpacity} />
          )}

          {halvesVisible && (
            <>
              <g clipPath="url(#clip-top-v2)" transform={`translate(0, ${-separation})`} opacity={clipOpacity}>
                <circle cx={CX} cy={CY} r={R} fill={GOLD} />
              </g>
              <g clipPath="url(#clip-bottom-v2)" transform={`translate(0, ${separation})`} opacity={clipOpacity}>
                <circle cx={CX} cy={CY} r={R} fill={GOLD} />
              </g>
            </>
          )}

          {waveOffsets.map((offset, i) => {
            if (offset >= WAVE_PATH_LEN - 1) return null;
            const waveY = waveYPositions[i];
            const d = waveRow(waveY, WAVE_AMPLITUDE, WAVE_PERIODS, WAVE_WIDTH);
            return (
              <path
                key={`wave-${i}`}
                d={d}
                stroke={GOLD}
                strokeWidth={4}
                strokeLinecap="round"
                fill="none"
                strokeDasharray={WAVE_PATH_LEN}
                strokeDashoffset={offset}
              />
            );
          })}
        </svg>
      </div>
    </AbsoluteFill>
  );
};
