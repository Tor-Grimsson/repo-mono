import {
  useCurrentFrame,
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

export const FlikBV4_Portrait: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const breathScale =
    frame >= 100
      ? 0.95 + 0.1 * (0.5 + 0.5 * Math.sin((frame - 100) * 0.02))
      : 1;

  return (
    <AbsoluteFill style={{ backgroundColor: BG }}>
      <svg
        width={WIDTH}
        height={HEIGHT}
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        fill="none"
        style={{
          transform: `scale(${breathScale})`,
          transformOrigin: "center center",
        }}
      >
        {Array.from({ length: ROWS }, (_, row) =>
          Array.from({ length: COLS }, (_, col) => {
            const cx = OFFSET_X + col * COL_SPACING;
            const cy = OFFSET_Y + row * ROW_SPACING;

            const appearDelay = (col + row) * 1.5;
            const scaleVal =
              frame >= appearDelay
                ? spring({
                    frame: Math.min(frame - appearDelay, 40),
                    fps,
                    config: { damping: 12, stiffness: 100 },
                    from: 0,
                    to: 1,
                  })
                : 0;

            if (scaleVal <= 0.01) return null;

            const rotation =
              frame >= 100
                ? Math.sin(frame * 0.03 + col * 0.5 + row * 0.3) * 15
                : 0;

            return (
              <g
                key={`${row}-${col}`}
                transform={`translate(${cx}, ${cy}) scale(${scaleVal}) rotate(${rotation})`}
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
