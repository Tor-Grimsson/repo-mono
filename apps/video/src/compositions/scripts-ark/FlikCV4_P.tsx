import React from "react";
import { useCurrentFrame, AbsoluteFill } from "remotion";
import {
  ease, progress, BG, PINK, CHEV_ARM1, CHEV_ARM2,
} from "./flikc-shared";

// ================================================================
// V4 Portrait: Diagonal scale pulse — 2160x3600, 450 frames, 30fps
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

export const FlikCV4_P: React.FC = () => {
  const frame = useCurrentFrame();

  const fadeIn = ease(progress(frame, 0, 25));
  const fadeOut = 1 - ease(progress(frame, 420, 450));
  const masterOpacity = Math.min(fadeIn, fadeOut);

  const chevrons: React.ReactElement[] = [];
  for (let row = 0; row < P_ROWS; row++) {
    for (let col = 0; col < P_COLS; col++) {
      const cx = MARGIN_X + col * SPACING_X;
      const cy = MARGIN_Y + row * SPACING_Y;
      const isTypeB = col % 2 === 1;
      const baseScaleX = isTypeB ? -1 : 1;

      // Diagonal position normalized 0-2
      const diagPos = (col / (P_COLS - 1)) + (row / (P_ROWS - 1));

      let scaleOffset = 0;
      const waves = [
        { start: 30, speed: 0.02, amplitude: 0.25 },
        { start: 110, speed: 0.025, amplitude: 0.18 },
        { start: 190, speed: 0.03, amplitude: 0.12 },
        { start: 270, speed: 0.022, amplitude: 0.08 },
        { start: 340, speed: 0.028, amplitude: 0.05 },
      ];

      for (const wave of waves) {
        const waveTime = frame - wave.start;
        if (waveTime <= 0) continue;
        const wavePos = waveTime * wave.speed;
        const delta = diagPos - wavePos;
        const spread = 0.4;
        const pulse = Math.exp(-(delta * delta) / (2 * spread * spread));
        const sineScale = Math.sin((delta / spread) * Math.PI * 0.5);
        scaleOffset += pulse * sineScale * wave.amplitude;
      }

      const scale = (1 + scaleOffset) * CHEV_SCALE;
      const rotation = scaleOffset * 3;

      chevrons.push(
        <g key={`${row}-${col}`} transform={`translate(${cx}, ${cy}) scale(${scale * baseScaleX}, ${scale}) rotate(${rotation})`}>
          <path d={CHEV_ARM1} fill={PINK} />
          <path d={CHEV_ARM2} fill={PINK} />
        </g>
      );
    }
  }

  return (
    <AbsoluteFill style={{ backgroundColor: BG }}>
      <div style={{ width: "100%", height: "100%", opacity: masterOpacity, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} fill="none">
          <defs>
            <clipPath id="v4p-clip">
              <rect x="100" y="100" width={W - 200} height={H - 200} rx="20" />
            </clipPath>
          </defs>
          <g clipPath="url(#v4p-clip)">{chevrons}</g>
        </svg>
      </div>
    </AbsoluteFill>
  );
};
