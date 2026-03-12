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

/**
 * FlikC_Portrait — Portrait version of FlikC (morphing)
 * 450f / 15s @ 30fps, 2160×3600
 */
export const FlikC_Portrait: React.FC = () => {
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
          const isChecker = (pos.col + pos.row) % 2 === 1;

          let rotation = 0;
          if (isChecker) {
            const smoothRot = spring({
              frame: Math.max(0, frame - 100),
              fps,
              config: { damping: 16, stiffness: 80 },
              from: 0,
              to: 1,
              durationInFrames: 100,
            });
            rotation = (frame >= 100 ? smoothRot : 0) * 180;
          }

          let scaleX = 1;
          let returnRotation = 0;

          if (isChecker && frame >= 350) {
            const flipProgress = spring({
              frame: frame - 350,
              fps,
              config: { damping: 14, stiffness: 70 },
              from: 0,
              to: 1,
              durationInFrames: 80,
            });
            scaleX = 1 - 2 * flipProgress;
            returnRotation = -180 * flipProgress;
          }

          const totalRotation = rotation + returnRotation;

          return (
            <g
              key={i}
              transform={`translate(${pos.cx}, ${pos.cy}) rotate(${totalRotation}) scale(${scaleX}, 1)`}
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
