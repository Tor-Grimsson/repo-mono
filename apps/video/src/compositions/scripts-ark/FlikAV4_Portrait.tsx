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

// Colors — Pattern A
const BG = "#FDFCF8";
const CHEVRON_COLOR = "#353537";

const WIDTH = 2160;
const HEIGHT = 3600;

const COLS = Math.ceil(WIDTH / COL_SPACING) + 4;
const ROWS = Math.ceil(HEIGHT / ROW_SPACING) + 4;

const OFFSET_X = -COL_SPACING * 2;
const OFFSET_Y = -ROW_SPACING * 2;

export const FlikAV4_Portrait: React.FC = () => {
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
            const forwardDelay = diag * 3; // Faster stagger for larger grid

            let rotation = 0;

            if (frame >= forwardDelay && frame < 300) {
              rotation = spring({
                frame: frame - forwardDelay,
                fps,
                config: { damping: 14, stiffness: 50 },
                from: 0,
                to: 180,
              });
            } else if (frame >= 300) {
              const reverseDelay = diag * 3;
              const reverseStart = 300 + reverseDelay;

              if (frame >= reverseStart) {
                rotation = spring({
                  frame: frame - reverseStart,
                  fps,
                  config: { damping: 14, stiffness: 50 },
                  from: 180,
                  to: 0,
                });
              } else {
                rotation = 180;
              }
            }

            return (
              <g
                key={`${row}-${col}`}
                transform={`translate(${cx}, ${cy}) rotate(${rotation})`}
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
