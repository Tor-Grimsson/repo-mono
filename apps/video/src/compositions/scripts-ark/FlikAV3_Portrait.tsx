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

// Colors — Pattern A
const BG = "#FDFCF8";
const CHEVRON_COLOR = "#353537";

const WIDTH = 2160;
const HEIGHT = 3600;

const COLS = Math.ceil(WIDTH / COL_SPACING) + 4;
const ROWS = Math.ceil(HEIGHT / ROW_SPACING) + 4;

const OFFSET_X = -COL_SPACING * 2;
const OFFSET_Y = -ROW_SPACING * 2;

export const FlikAV3_Portrait: React.FC = () => {
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
        {Array.from({ length: COLS }, (_, col) => {
          const colDelay = col * 12;

          return Array.from({ length: ROWS }, (_, row) => {
            const cx = OFFSET_X + col * COL_SPACING;
            const cy = OFFSET_Y + row * ROW_SPACING;

            const scaleVal =
              frame >= colDelay
                ? spring({
                    frame: frame - colDelay,
                    fps,
                    config: { damping: 12, stiffness: 80 },
                    from: 0,
                    to: 1,
                  })
                : 0;

            if (scaleVal <= 0.01) return null;

            const isMirrorCol = col % 3 === 0;
            let mirrorSx = 1;
            if (isMirrorCol && frame >= 200) {
              const cycleFrame = frame - 250 - col * 3;
              if (cycleFrame > 0) {
                const cycle = Math.sin(cycleFrame * 0.015);
                mirrorSx = cycle >= 0 ? 1 : -1;
                const smoothScale = 0.4 + 0.6 * Math.abs(cycle);
                mirrorSx *= smoothScale;
              } else {
                const mirrorProgress = interpolate(
                  frame,
                  [200 + col * 3, 250 + col * 3],
                  [0, 1],
                  { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
                );
                mirrorSx = 1 - 2 * mirrorProgress;
                if (Math.abs(mirrorSx) < 0.1) mirrorSx = 0.1;
              }
            }

            return (
              <g
                key={`${row}-${col}`}
                transform={`translate(${cx}, ${cy}) scale(${scaleVal * mirrorSx}, ${scaleVal})`}
              >
                <path d={UPPER_ARM} fill={CHEVRON_COLOR} />
                <path d={LOWER_ARM} fill={CHEVRON_COLOR} />
              </g>
            );
          });
        })}
      </svg>
    </AbsoluteFill>
  );
};
