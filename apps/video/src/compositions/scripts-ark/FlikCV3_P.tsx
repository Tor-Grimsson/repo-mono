import React from "react";
import { useCurrentFrame, AbsoluteFill, spring, useVideoConfig } from "remotion";
import {
  ease, progress, BG, PINK, CHEV_ARM1, CHEV_ARM2,
} from "./flikc-shared";

// ================================================================
// V3 Portrait: Snake reveal — 2160x3600, 450 frames, 30fps
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

const TOTAL = P_COLS * P_ROWS; // 50

function snakeIndex(row: number, col: number): number {
  const base = row * P_COLS;
  return row % 2 === 0 ? base + col : base + (P_COLS - 1 - col);
}

const STAGGER = 4; // faster stagger for more items
const REVEAL_START = 10;
const FADEOUT_START = 320;

export const FlikCV3_P: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const chevrons: React.ReactElement[] = [];
  for (let row = 0; row < P_ROWS; row++) {
    for (let col = 0; col < P_COLS; col++) {
      const cx = MARGIN_X + col * SPACING_X;
      const cy = MARGIN_Y + row * SPACING_Y;
      const isTypeB = col % 2 === 1;
      const baseScaleX = isTypeB ? -1 : 1;

      const idx = snakeIndex(row, col);
      const enterFrame = REVEAL_START + idx * STAGGER;

      const scaleIn = spring({
        frame: Math.max(0, frame - enterFrame),
        fps,
        config: { damping: 10, stiffness: 120, mass: 0.6 },
      });

      const reverseIdx = TOTAL - 1 - idx;
      const exitFrame = FADEOUT_START + reverseIdx * 2;
      const fadeOutP = ease(progress(frame, exitFrame, exitFrame + 20));
      const exitScale = 1 - fadeOutP;

      const entryAge = frame - enterFrame;
      const flash = entryAge > 0 && entryAge < 15
        ? 1 + 0.3 * Math.sin((entryAge / 15) * Math.PI)
        : 1;

      const finalScale = scaleIn * Math.max(0, exitScale) * CHEV_SCALE;
      if (finalScale < 0.001) continue;

      const r = Math.min(255, Math.round(0xEE * flash));
      const g = Math.min(255, Math.round(0x79 * flash));
      const b = Math.min(255, Math.round(0x9C * flash));
      const color = `rgb(${r}, ${g}, ${b})`;

      chevrons.push(
        <g key={`${row}-${col}`} transform={`translate(${cx}, ${cy}) scale(${finalScale * baseScaleX}, ${finalScale})`}>
          <path d={CHEV_ARM1} fill={color} />
          <path d={CHEV_ARM2} fill={color} />
        </g>
      );
    }
  }

  return (
    <AbsoluteFill style={{ backgroundColor: BG }}>
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} fill="none" style={{ width: "100%", height: "100%" }}>
        <defs>
          <clipPath id="v3p-clip">
            <rect x="100" y="100" width={W - 200} height={H - 200} rx="20" />
          </clipPath>
        </defs>
        <g clipPath="url(#v3p-clip)">{chevrons}</g>
      </svg>
    </AbsoluteFill>
  );
};
