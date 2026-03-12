import React from "react";
import { useCurrentFrame, AbsoluteFill } from "remotion";
import {
  ease, progress, BG, PINK,
  COLS, ROWS, ROW_DY, COL_CX, ROW0_CY, ROW0_PATHS,
  SVG_VB_W, SVG_VB_H, CLIP_X, CLIP_Y, CLIP_W, CLIP_H, CLIP_RX,
} from "./flikc-shared";

// ================================================================
// V4: Diagonal scale pulse — 450 frames, 30fps (15s)
// All chevrons visible from start. Diagonal waves travel
// from top-left to bottom-right, each chevron scales
// 0.8 → 1.2 → 1.0 as the wave passes. Multiple waves
// with decreasing amplitude for a dampened ripple effect.
// ================================================================

export const FlikCV4: React.FC = () => {
  const frame = useCurrentFrame();

  const fadeIn = ease(progress(frame, 0, 25));
  const fadeOut = 1 - ease(progress(frame, 420, 450));
  const masterOpacity = Math.min(fadeIn, fadeOut);

  const chevrons: React.ReactElement[] = [];
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      const [arm1, arm2] = ROW0_PATHS[col];
      const cx = COL_CX[col];
      const cy = ROW0_CY;
      const dy = row * ROW_DY;

      // Diagonal position: sum of normalized col+row position
      const diagPos = (col / (COLS - 1)) + (row / (ROWS - 1)); // 0 to 2

      // Multiple waves with decreasing amplitude
      let scaleOffset = 0;
      const waves = [
        { start: 30, speed: 0.025, amplitude: 0.25 },
        { start: 120, speed: 0.03, amplitude: 0.18 },
        { start: 200, speed: 0.035, amplitude: 0.12 },
        { start: 280, speed: 0.028, amplitude: 0.08 },
        { start: 350, speed: 0.032, amplitude: 0.05 },
      ];

      for (const wave of waves) {
        const waveTime = frame - wave.start;
        if (waveTime <= 0) continue;

        // Wave position travels from 0 to 2+ along diagonal
        const wavePos = waveTime * wave.speed;
        const delta = diagPos - wavePos;

        // Gaussian pulse shape
        const spread = 0.4;
        const pulse = Math.exp(-(delta * delta) / (2 * spread * spread));

        // Sine modulation for scale up then back down
        const phase = delta / spread;
        const sineScale = Math.sin(phase * Math.PI * 0.5);

        scaleOffset += pulse * sineScale * wave.amplitude;
      }

      const scale = 1 + scaleOffset;

      // Subtle rotation tied to scale offset
      const rotation = scaleOffset * 3; // slight tilt during pulse

      chevrons.push(
        <g key={`${row}-${col}`}>
          <g transform={`translate(${cx}, ${cy + dy}) scale(${scale}) rotate(${rotation}) translate(${-cx}, ${-cy})`}>
            <path d={arm1} fill={PINK} />
            <path d={arm2} fill={PINK} />
          </g>
        </g>
      );
    }
  }

  return (
    <AbsoluteFill style={{ backgroundColor: BG }}>
      <div style={{ width: "100%", height: "100%", opacity: masterOpacity, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <svg width="1920" height="1080" viewBox={`0 0 ${SVG_VB_W} ${SVG_VB_H}`} preserveAspectRatio="xMidYMid meet" fill="none">
          <defs>
            <clipPath id="v4-clip">
              <rect x={CLIP_X} y={CLIP_Y} width={CLIP_W} height={CLIP_H} rx={CLIP_RX} />
            </clipPath>
          </defs>
          <g clipPath="url(#v4-clip)">{chevrons}</g>
        </svg>
      </div>
    </AbsoluteFill>
  );
};
