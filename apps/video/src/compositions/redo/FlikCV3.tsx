import React from "react";
import { useCurrentFrame, AbsoluteFill, spring, useVideoConfig } from "remotion";
import {
  ease, progress, BG, PINK,
  COLS, ROWS, ROW_DY, COL_CX, ROW0_CY, ROW0_PATHS,
  SVG_VB_W, SVG_VB_H, CLIP_X, CLIP_Y, CLIP_W, CLIP_H, CLIP_RX,
} from "./flikc-shared";

// ================================================================
// V3: Snake reveal — 450 frames, 30fps (15s)
// Chevrons appear one-by-one following a snake path
// (left→right row 0, right→left row 1, etc.)
// Each scales up with a spring, then a brief opacity pulse.
// After full reveal, hold, then reverse-snake fadeout.
// ================================================================

// Snake order: row 0 L→R, row 1 R→L, row 2 L→R, row 3 R→L
function snakeIndex(row: number, col: number): number {
  const base = row * COLS;
  return row % 2 === 0 ? base + col : base + (COLS - 1 - col);
}

const TOTAL = COLS * ROWS; // 24
const STAGGER = 6; // frames between each chevron appearing
const REVEAL_START = 15;
const REVEAL_END = REVEAL_START + TOTAL * STAGGER; // ~159

// Reverse fadeout starts
const FADEOUT_START = 340;

export const FlikCV3: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const chevrons: React.ReactElement[] = [];
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      const [arm1, arm2] = ROW0_PATHS[col];
      const cx = COL_CX[col];
      const cy = ROW0_CY;
      const dy = row * ROW_DY;

      const idx = snakeIndex(row, col);
      const enterFrame = REVEAL_START + idx * STAGGER;

      // Scale-in spring
      const scaleIn = spring({
        frame: Math.max(0, frame - enterFrame),
        fps,
        config: { damping: 10, stiffness: 120, mass: 0.6 },
      });

      // Reverse snake fadeout
      const reverseIdx = TOTAL - 1 - idx;
      const exitFrame = FADEOUT_START + reverseIdx * 4;
      const fadeOutP = ease(progress(frame, exitFrame, exitFrame + 20));
      const exitScale = 1 - fadeOutP;

      // Entry opacity flash: quick bright pulse then settle
      const entryAge = frame - enterFrame;
      const flash = entryAge > 0 && entryAge < 15
        ? 1 + 0.3 * Math.sin((entryAge / 15) * Math.PI)
        : 1;

      const finalScale = scaleIn * Math.max(0, exitScale);
      if (finalScale < 0.001) continue;

      // Slight brightness on flash
      const brightness = flash;
      const r = Math.min(255, Math.round(0xEE * brightness));
      const g = Math.min(255, Math.round(0x79 * brightness));
      const b = Math.min(255, Math.round(0x9C * brightness));
      const color = `rgb(${r}, ${g}, ${b})`;

      chevrons.push(
        <g key={`${row}-${col}`}>
          <g transform={`translate(${cx}, ${cy + dy}) scale(${finalScale}) translate(${-cx}, ${-cy})`}>
            <path d={arm1} fill={color} />
            <path d={arm2} fill={color} />
          </g>
        </g>
      );
    }
  }

  return (
    <AbsoluteFill style={{ backgroundColor: BG }}>
      <svg width="1920" height="1080" viewBox={`0 0 ${SVG_VB_W} ${SVG_VB_H}`} preserveAspectRatio="xMidYMid meet" fill="none" style={{ width: "100%", height: "100%" }}>
        <defs>
          <clipPath id="v3-clip">
            <rect x={CLIP_X} y={CLIP_Y} width={CLIP_W} height={CLIP_H} rx={CLIP_RX} />
          </clipPath>
        </defs>
        <g clipPath="url(#v3-clip)">{chevrons}</g>
      </svg>
    </AbsoluteFill>
  );
};
