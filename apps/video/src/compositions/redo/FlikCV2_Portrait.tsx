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
const CENTER_X = WIDTH / 2;
const CENTER_Y = HEIGHT / 2;

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
  dist: number;
}

function buildGrid(): ChevronPos[] {
  const positions: ChevronPos[] = [];
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      const cx = GRID_OFFSET_X + col * COL_SPACING;
      const cy = GRID_OFFSET_Y + row * ROW_SPACING;
      const dist = Math.sqrt((cx - CENTER_X) ** 2 + (cy - CENTER_Y) ** 2);
      positions.push({ cx, cy, dist });
    }
  }
  return positions;
}

const GRID = buildGrid();
const MAX_DIST = Math.max(...GRID.map((p) => p.dist));

/**
 * FlikCV2_Portrait — Portrait radial burst from center (1080, 1800)
 * 450f / 15s @ 30fps, 2160×3600
 */
export const FlikCV2_Portrait: React.FC = () => {
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
          const normDist = pos.dist / MAX_DIST;
          const appearFrame = normDist * 200;

          const scaleIn =
            frame >= appearFrame
              ? spring({
                  frame: frame - appearFrame,
                  fps,
                  config: { damping: 12, stiffness: 90 },
                  from: 0,
                  to: 1,
                })
              : 0;

          let pulse = 1;
          if (frame >= 250) {
            const pulsePhase =
              ((frame - 250) / 60) * Math.PI * 2 - normDist * Math.PI * 2;
            pulse = 1 + Math.sin(pulsePhase) * 0.08;
          }

          const scale = scaleIn * pulse;
          if (scale < 0.001) return null;

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
