import React from "react";
import { useCurrentFrame, AbsoluteFill } from "remotion";
import {
  ease, progress, BG, PINK,
  COLS, ROWS, ROW_DY, COL_CX, ROW0_CY, ROW0_PATHS,
  SVG_VB_W, SVG_VB_H, CLIP_X, CLIP_Y, CLIP_W, CLIP_H, CLIP_RX,
} from "./flikc-shared";

// ================================================================
// V1: Morphing — 450 frames, 30fps (15s)
// State 1 (0-120): default grid
// State 2 (120-270): checkerboard chevrons flip horizontally
// State 3 (270-420): alternating rows flip vertically
// Fade in 0-30, fade out 420-450
// ================================================================
export const FlikC: React.FC = () => {
  const frame = useCurrentFrame();

  const fadeIn = ease(progress(frame, 0, 30));
  const fadeOut = 1 - ease(progress(frame, 420, 450));
  const opacity = Math.min(fadeIn, fadeOut);

  // Smooth flip transitions
  const flipH = ease(progress(frame, 120, 180));
  const flipV = ease(progress(frame, 270, 330));

  const chevrons: React.ReactElement[] = [];
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      const [arm1, arm2] = ROW0_PATHS[col];
      const cx = COL_CX[col];
      const cy = ROW0_CY;
      const dy = row * ROW_DY;

      // Checkerboard: every other chevron flips scaleX 1 → -1
      const isCheckerboard = (col + row) % 2 === 1;
      const sx = isCheckerboard ? 1 - 2 * flipH : 1;

      // Alternating rows: flip scaleY 1 → -1
      const isAltRow = row % 2 === 1;
      const sy = isAltRow ? 1 - 2 * flipV : 1;

      // Transform: move row0 paths down to correct row, then flip around chevron center
      chevrons.push(
        <g key={`${row}-${col}`}>
          <g transform={`translate(${cx}, ${cy + dy}) scale(${sx}, ${sy}) translate(${-cx}, ${-cy})`}>
            <path d={arm1} fill={PINK} />
            <path d={arm2} fill={PINK} />
          </g>
        </g>
      );
    }
  }

  return (
    <AbsoluteFill style={{ backgroundColor: BG }}>
      <div style={{ width: "100%", height: "100%", opacity, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <svg width="1920" height="1080" viewBox={`0 0 ${SVG_VB_W} ${SVG_VB_H}`} preserveAspectRatio="xMidYMid meet" fill="none">
          <defs>
            <clipPath id="v1-clip">
              <rect x={CLIP_X} y={CLIP_Y} width={CLIP_W} height={CLIP_H} rx={CLIP_RX} />
            </clipPath>
          </defs>
          <g clipPath="url(#v1-clip)">{chevrons}</g>
        </svg>
      </div>
    </AbsoluteFill>
  );
};
