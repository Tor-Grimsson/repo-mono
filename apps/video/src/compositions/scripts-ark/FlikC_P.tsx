import React from "react";
import { useCurrentFrame, AbsoluteFill } from "remotion";
import {
  ease, progress, BG, PINK, CHEV_ARM1, CHEV_ARM2,
} from "./flikc-shared";

// ================================================================
// V1 Portrait: Morphing — 2160x3600, 450 frames, 30fps
// Same animation as landscape but on a portrait grid:
// 5 cols x 10 rows of chevrons
// ================================================================

const W = 2160;
const H = 3600;
const P_COLS = 5;
const P_ROWS = 10;
const MARGIN_X = 180;
const MARGIN_Y = 200;
const SPACING_X = (W - 2 * MARGIN_X) / (P_COLS - 1);
const SPACING_Y = (H - 2 * MARGIN_Y) / (P_ROWS - 1);
const CHEV_SCALE = 0.72;

export const FlikC_P: React.FC = () => {
  const frame = useCurrentFrame();

  const fadeIn = ease(progress(frame, 0, 30));
  const fadeOut = 1 - ease(progress(frame, 420, 450));
  const opacity = Math.min(fadeIn, fadeOut);

  const flipH = ease(progress(frame, 120, 180));
  const flipV = ease(progress(frame, 270, 330));

  const chevrons: React.ReactElement[] = [];
  for (let row = 0; row < P_ROWS; row++) {
    for (let col = 0; col < P_COLS; col++) {
      const cx = MARGIN_X + col * SPACING_X;
      const cy = MARGIN_Y + row * SPACING_Y;

      // Alternating type: even cols = type A, odd = type B (mirrored)
      const isTypeB = col % 2 === 1;
      const baseScaleX = isTypeB ? -1 : 1;

      // Checkerboard flip
      const isAlt = (col + row) % 2 === 1;
      const sx = isAlt ? baseScaleX * (1 - 2 * flipH) : baseScaleX;

      // Alternating row flip
      const isAltRow = row % 2 === 1;
      const sy = isAltRow ? 1 - 2 * flipV : 1;

      chevrons.push(
        <g key={`${row}-${col}`} transform={`translate(${cx}, ${cy}) scale(${CHEV_SCALE * sx}, ${CHEV_SCALE * sy})`}>
          <path d={CHEV_ARM1} fill={PINK} />
          <path d={CHEV_ARM2} fill={PINK} />
        </g>
      );
    }
  }

  return (
    <AbsoluteFill style={{ backgroundColor: BG }}>
      <div style={{ width: "100%", height: "100%", opacity, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} fill="none">
          <defs>
            <clipPath id="v1p-clip">
              <rect x="100" y="100" width={W - 200} height={H - 200} rx="20" />
            </clipPath>
          </defs>
          <g clipPath="url(#v1p-clip)">{chevrons}</g>
        </svg>
      </div>
    </AbsoluteFill>
  );
};
