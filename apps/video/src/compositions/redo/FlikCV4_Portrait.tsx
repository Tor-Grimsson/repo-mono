import {
  useCurrentFrame,
  interpolate,
  AbsoluteFill,
  spring,
  useVideoConfig,
} from "remotion";

// ---- Pattern C constants (Portrait 2160×3600) ----
const BG = "#27262B";
const PINK = "#EE799C";
const WIDTH = 2160;
const HEIGHT = 3600;
const COL_SPACING = 293;
const ROW_SPACING = 240;
const ARM_WIDTH = 130;
const ARM_HEIGHT = 135;
const ARM_THICKNESS = 55;
const COLS = 9;
const ROWS = 17;

const GRID_OFFSET_X = (WIDTH - (COLS - 1) * COL_SPACING) / 2;
const GRID_OFFSET_Y = (HEIGHT - (ROWS - 1) * ROW_SPACING) / 2;

function upperArm(cx: number, cy: number): string {
  return `M${cx} ${cy} L${cx} ${cy - ARM_THICKNESS} L${cx - ARM_WIDTH} ${cy - ARM_HEIGHT} L${cx - ARM_WIDTH} ${cy - ARM_HEIGHT + ARM_THICKNESS} Z`;
}

function lowerArm(cx: number, cy: number): string {
  const y0 = cy + 10;
  return `M${cx} ${y0} L${cx} ${y0 + ARM_THICKNESS} L${cx + ARM_WIDTH} ${y0 + ARM_HEIGHT} L${cx + ARM_WIDTH} ${y0 + ARM_HEIGHT - ARM_THICKNESS} Z`;
}

interface ChevronPos {
  cx: number;
  cy: number;
  col: number;
  row: number;
}

function buildGrid(): ChevronPos[] {
  const positions: ChevronPos[] = [];
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      positions.push({
        cx: GRID_OFFSET_X + col * COL_SPACING,
        cy: GRID_OFFSET_Y + row * ROW_SPACING,
        col,
        row,
      });
    }
  }
  return positions;
}

const GRID = buildGrid();

const WAVE_CYCLE = 150;
const STAGGER_PER_CELL = 8;
const PULSE_DURATION = 30;

/**
 * FlikCV4_Portrait — Portrait scale pulse wave
 * 450f / 15s @ 30fps, 2160×3600
 */
export const FlikCV4_Portrait: React.FC = () => {
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
        {GRID.map((pos, i) => {
          const diagonalOffset = (pos.col + pos.row) * STAGGER_PER_CELL;
          const waveFrame = (frame + WAVE_CYCLE * 3 - diagonalOffset) % WAVE_CYCLE;

          let scale = 1;
          if (waveFrame >= 0 && waveFrame < PULSE_DURATION) {
            if (waveFrame < PULSE_DURATION / 2) {
              const pulseSpring = spring({
                frame: waveFrame,
                fps,
                config: { damping: 10, stiffness: 120 },
                from: 0,
                to: 1,
              });
              scale = 1 + 0.2 * pulseSpring;
            } else {
              const returnSpring = spring({
                frame: waveFrame - PULSE_DURATION / 2,
                fps,
                config: { damping: 14, stiffness: 80 },
                from: 0,
                to: 1,
              });
              scale = Math.max(0.8, Math.min(1.2, 1 + 0.2 * (1 - returnSpring * 2)));
            }
          } else if (waveFrame >= PULSE_DURATION && waveFrame < PULSE_DURATION + 10) {
            const settle = (waveFrame - PULSE_DURATION) / 10;
            scale = interpolate(settle, [0, 1], [0.9, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            });
          }

          return (
            <g
              key={i}
              transform={`translate(${pos.cx}, ${pos.cy}) scale(${scale})`}
            >
              <path d={upperArm(0, 0)} fill={PINK} />
              <path d={lowerArm(0, 0)} fill={PINK} />
            </g>
          );
        })}
      </svg>
    </AbsoluteFill>
  );
};
