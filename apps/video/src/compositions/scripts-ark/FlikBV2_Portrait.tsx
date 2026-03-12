import {
  useCurrentFrame,
  interpolate,
  AbsoluteFill,
  spring,
  useVideoConfig,
} from "remotion";

// ---- Chevron geometry ----
const COL_SPACING = 120;
const ROW_SPACING = 112;

const UPPER_ARM = "M4 -8 L56 -103 L56 -61 L0 3 L0 -40 Z";
const LOWER_ARM = "M-4 63 L-56 -48 L-56 -6 L0 52 L0 95 Z";

// Colors — Pattern B
const BG = "#8F3953";
const CHEVRON_COLOR = "#FAF7F0";

const WIDTH = 2160;
const HEIGHT = 3600;

const COLS = Math.ceil(WIDTH / COL_SPACING) + 4;
const ROWS = Math.ceil(HEIGHT / ROW_SPACING) + 4;

const OFFSET_X = -COL_SPACING * 2;
const OFFSET_Y = -ROW_SPACING * 2;

export const FlikBV2_Portrait: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill style={{ backgroundColor: BG }}>
      <svg
        width={WIDTH}
        height={HEIGHT}
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        fill="none"
      >
        {Array.from({ length: ROWS }, (_, row) =>
          Array.from({ length: COLS }, (_, col) => {
            const cx = OFFSET_X + col * COL_SPACING;
            const cy = OFFSET_Y + row * ROW_SPACING;

            const appearDelay = (col + row) * 2;
            const scaleVal =
              frame >= appearDelay
                ? spring({
                    frame: Math.min(frame - appearDelay, 60),
                    fps,
                    config: { damping: 12, stiffness: 80 },
                    from: 0,
                    to: 1,
                  })
                : 0;

            if (scaleVal <= 0.01) return null;

            const isGroupA = (col % 2 === 0) === (row % 2 === 0);

            let sx = 1;
            if (frame >= 150) {
              const cycleTime = frame - 150;
              const cyclePhase = Math.floor(cycleTime / 60) % 2;
              const inCycleProgress = interpolate(
                cycleTime % 60,
                [0, 20, 40, 60],
                [0, 1, 1, 0],
                { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
              );

              if (isGroupA) {
                sx = cyclePhase === 0 ? 1 - 2 * inCycleProgress : -1 + 2 * inCycleProgress;
              } else {
                sx = cyclePhase === 0 ? -1 + 2 * inCycleProgress : 1 - 2 * inCycleProgress;
              }

              if (Math.abs(sx) < 0.15) sx = sx >= 0 ? 0.15 : -0.15;
            }

            return (
              <g
                key={`${row}-${col}`}
                transform={`translate(${cx}, ${cy}) scale(${scaleVal * sx}, ${scaleVal})`}
              >
                <path d={UPPER_ARM} fill={CHEVRON_COLOR} />
                <path d={LOWER_ARM} fill={CHEVRON_COLOR} />
              </g>
            );
          })
        )}
      </svg>
    </AbsoluteFill>
  );
};
