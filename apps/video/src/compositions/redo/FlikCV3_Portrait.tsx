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
  snakeIndex: number;
}

function buildGrid(): ChevronPos[] {
  const positions: ChevronPos[] = [];
  let snakeIdx = 0;
  for (let row = 0; row < ROWS; row++) {
    const leftToRight = row % 2 === 0;
    for (let c = 0; c < COLS; c++) {
      const col = leftToRight ? c : COLS - 1 - c;
      positions.push({
        cx: GRID_OFFSET_X + col * COL_SPACING,
        cy: GRID_OFFSET_Y + row * ROW_SPACING,
        snakeIndex: snakeIdx,
      });
      snakeIdx++;
    }
  }
  return positions;
}

const GRID = buildGrid();
const TOTAL = GRID.length;

/**
 * FlikCV3_Portrait — Portrait snake reveal
 * 450f / 15s @ 30fps, 2160×3600
 */
export const FlikCV3_Portrait: React.FC = () => {
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
          const staggerPerItem = 300 / TOTAL;
          const appearFrame = pos.snakeIndex * staggerPerItem;

          const scaleIn =
            frame >= appearFrame
              ? spring({
                  frame: frame - appearFrame,
                  fps,
                  config: { damping: 12, stiffness: 100 },
                  from: 0,
                  to: 1,
                })
              : 0;

          if (scaleIn < 0.001) return null;

          let opacity = 1;
          if (frame >= 300) {
            const breathPhase =
              ((frame - 300) / 80) * Math.PI * 2 +
              pos.snakeIndex * 0.3;
            opacity = 0.85 + Math.sin(breathPhase) * 0.15;
          }

          return (
            <g
              key={i}
              transform={`translate(${pos.cx}, ${pos.cy}) scale(${scaleIn})`}
              opacity={opacity}
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
