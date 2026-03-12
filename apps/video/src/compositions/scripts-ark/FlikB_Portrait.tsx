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

export const FlikB_Portrait: React.FC = () => {
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

            const diag = col + row;
            const delay = diag * 5; // Faster stagger for larger grid

            const scaleVal =
              frame >= delay
                ? spring({
                    frame: frame - delay,
                    fps,
                    config: { damping: 10, stiffness: 60 },
                    from: 0,
                    to: 1,
                  })
                : 0;

            const opacity = interpolate(frame, [delay, delay + 12], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            });

            if (opacity <= 0) return null;

            const breathScale =
              frame >= 300
                ? 1 +
                  0.03 *
                    Math.sin((frame - 300) * 0.03 + diag * 0.2)
                : 1;

            return (
              <g
                key={`${row}-${col}`}
                transform={`translate(${cx}, ${cy}) scale(${scaleVal * breathScale})`}
                opacity={opacity}
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
