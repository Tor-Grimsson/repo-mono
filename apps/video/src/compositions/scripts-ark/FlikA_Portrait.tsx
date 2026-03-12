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

export const FlikA_Portrait: React.FC = () => {
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
        {Array.from({ length: ROWS }, (_, row) => {
          const rowDelay = row * 8; // Faster stagger for more rows
          const rowY = OFFSET_Y + row * ROW_SPACING;
          const flipRow = row % 2 === 1;

          return Array.from({ length: COLS }, (_, col) => {
            const cx = OFFSET_X + col * COL_SPACING;
            const cy = rowY;

            const delay = rowDelay + col * 1;

            const scaleVal =
              frame >= delay
                ? spring({
                    frame: frame - delay,
                    fps,
                    config: { damping: 12, stiffness: 80 },
                    from: 0.5,
                    to: 1,
                  })
                : 0;

            const opacity = interpolate(frame, [delay, delay + 15], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            });

            if (opacity <= 0) return null;

            const pulseOpacity =
              frame >= 300
                ? interpolate(
                    Math.sin((frame - 300) * 0.04),
                    [-1, 1],
                    [0.85, 1]
                  )
                : 1;

            const sx = flipRow ? -1 : 1;

            return (
              <g
                key={`${row}-${col}`}
                transform={`translate(${cx}, ${cy}) scale(${scaleVal * sx}, ${scaleVal})`}
                opacity={opacity * pulseOpacity}
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
