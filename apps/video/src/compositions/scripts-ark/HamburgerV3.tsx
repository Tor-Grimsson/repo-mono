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
// Dealer's choice: orbiting halves + undulating waves
// ================================================================
// 0-60f:    Circle appears
// 60-150f:  Circle splits, halves begin rotating (top CW, bottom CCW)
// 150-350f: Waves draw on, each undulates independently
// 350-500f: Scale breathing with phase offsets
// 500-600f: Elements converge back, circle reforms
// ================================================================

export const HamburgerV3: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Scale spring entrance
  const enterScale = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 60 },
    from: 0,
    to: 1,
  });

  // Split progress
  const splitOpen = ease(progress(frame, 60, 150));
  const splitClose = ease(progress(frame, 500, 580));
  const splitAmount = Math.max(0, splitOpen * (1 - splitClose));

  const maxSep = R * 0.7;
  const separation = splitAmount * maxSep;

  // Orbit rotation for halves
  const orbitProgress = frame >= 60 ? (frame - 60) / 540 : 0;
  const orbitAngle = orbitProgress * Math.PI * 3; // 1.5 full rotations
  const orbitDampen = splitAmount; // no orbit when closed

  const topRotation = orbitAngle * orbitDampen * (180 / Math.PI);
  const bottomRotation = -orbitAngle * orbitDampen * (180 / Math.PI);

  // Orbit radius — halves orbit around center
  const orbitRadius = separation * 0.3;
  const topOrbitX = Math.sin(orbitAngle) * orbitRadius * orbitDampen;
  const bottomOrbitX = -Math.sin(orbitAngle) * orbitRadius * orbitDampen;

  // Wave draw-on timings (staggered)
  const wave1On = drawOn(frame, 150, 50, WAVE_PATH_LEN);
  const wave2On = drawOn(frame, 190, 50, WAVE_PATH_LEN);
  const wave3On = drawOn(frame, 230, 50, WAVE_PATH_LEN);
  const wave4On = drawOn(frame, 270, 50, WAVE_PATH_LEN);

  const wave1Off = drawOff(frame, 520, 40, WAVE_PATH_LEN);
  const wave2Off = drawOff(frame, 510, 40, WAVE_PATH_LEN);
  const wave3Off = drawOff(frame, 500, 40, WAVE_PATH_LEN);
  const wave4Off = drawOff(frame, 490, 40, WAVE_PATH_LEN);

  const waveOffsets = [
    Math.max(wave1On, wave1Off),
    Math.max(wave2On, wave2Off),
    Math.max(wave3On, wave3Off),
    Math.max(wave4On, wave4Off),
  ];

  // Wave undulation — each wave row oscillates in Y with sine
  const waveUndulation = (index: number) => {
    if (frame < 150 || frame > 540) return 0;
    const t = (frame - 150) / 30; // time in "seconds" at 30fps
    const phaseOffset = index * 0.8;
    return Math.sin(t * 2.5 + phaseOffset) * 6 * splitAmount;
  };

  // Scale breathing (350-500f)
  const breathe = (phaseOffset: number) => {
    if (frame < 350 || frame > 500) return 1;
    const t = (frame - 350) / 30;
    return 1 + 0.05 * Math.sin(t * 3 + phaseOffset);
  };

  const showFullCircle = frame < 60 || frame >= 580;
  const halvesVisible = frame >= 55 && frame < 585;

  const viewScale = (1080 * 0.4) / (R * 2);

  // Reform opacity crossfade
  const reformOpacity = frame >= 575 ? ease(progress(frame, 575, 590)) : 0;

  return (
    <AbsoluteFill style={{ backgroundColor: BG }}>
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: `translate(-50%, -50%) scale(${enterScale * viewScale})`,
        }}
      >
        <svg
          width={R * 4}
          height={R * 5}
          viewBox={`${-R * 2} ${-R * 2.5} ${R * 4} ${R * 5}`}
          fill="none"
          style={{ overflow: "visible" }}
        >
          <defs>
            <clipPath id="clip-top-v3">
              <rect x={-R - 20} y={-R - 20} width={R * 2 + 40} height={R + 20} />
            </clipPath>
            <clipPath id="clip-bottom-v3">
              <rect x={-R - 20} y={0} width={R * 2 + 40} height={R + 20} />
            </clipPath>
          </defs>

          {/* Full circle */}
          {showFullCircle && (
            <circle
              cx={0}
              cy={0}
              r={R}
              fill={GOLD}
              opacity={frame < 60 ? 1 : reformOpacity}
            />
          )}

          {/* Split halves with orbit */}
          {halvesVisible && (
            <>
              <g
                clipPath="url(#clip-top-v3)"
                transform={`translate(${topOrbitX}, ${-separation}) rotate(${topRotation}, 0, 0) scale(${breathe(0)})`}
                opacity={1 - reformOpacity}
              >
                <circle cx={0} cy={0} r={R} fill={GOLD} />
              </g>
              <g
                clipPath="url(#clip-bottom-v3)"
                transform={`translate(${bottomOrbitX}, ${separation}) rotate(${bottomRotation}, 0, 0) scale(${breathe(Math.PI)})`}
                opacity={1 - reformOpacity}
              >
                <circle cx={0} cy={0} r={R} fill={GOLD} />
              </g>
            </>
          )}

          {/* Wave rows with undulation */}
          {waveOffsets.map((offset, i) => {
            if (offset >= WAVE_PATH_LEN - 1) return null;
            const baseY = waveYPositions[i];
            const undulateY = waveUndulation(i);
            const d = waveRow(baseY + undulateY, WAVE_AMPLITUDE, WAVE_PERIODS, WAVE_WIDTH);
            const scale = breathe(i * 0.7);
            return (
              <g key={`wave-${i}`} transform={`scale(${scale})`}>
                <path
                  d={d}
                  stroke={GOLD}
                  strokeWidth={4}
                  strokeLinecap="round"
                  fill="none"
                  strokeDasharray={WAVE_PATH_LEN}
                  strokeDashoffset={offset}
                />
              </g>
            );
          })}
        </svg>
      </div>
    </AbsoluteFill>
  );
};
