import React from "react";
import {
  useCurrentFrame,
  interpolate,
  AbsoluteFill,
  spring,
  useVideoConfig,
} from "remotion";
import {
  PATTERN_A_PATHS,
  PATTERN_A_CELL_ORIGIN,
  PATTERN_A_CELL_W,
  PATTERN_A_CELL_H,
  COLORS_A,
} from "./flikPaths";

const ease = (t: number) => t * t * (3 - 2 * t);
const progress = (frame: number, start: number, end: number) =>
  interpolate(frame, [start, end], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

const W = 1920;
const H = 1080;
const COLS = 12;
const ROWS = 4;

// Scale to fit: the original cell is large (192x431), we need to tile ~12x4
const SCALE = Math.min(W / (COLS * PATTERN_A_CELL_W), H / (ROWS * PATTERN_A_CELL_H)) * 1.15;

/**
 * FlikA V1 — Row-by-row staggered reveal + every-2nd-column horizontal flip
 * Dark chevrons on cream. 1920x1080, 450 frames, 30fps.
 */
export const FlikA: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const ox = PATTERN_A_CELL_ORIGIN.x;
  const oy = PATTERN_A_CELL_ORIGIN.y;
  const cellW = PATTERN_A_CELL_W;
  const cellH = PATTERN_A_CELL_H;

  // Center the grid
  const gridW = COLS * cellW * SCALE;
  const gridH = ROWS * cellH * SCALE;
  const offsetX = (W - gridW) / 2;
  const offsetY = (H - gridH) / 2;

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS_A.bg }}>
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`}>
        {Array.from({ length: ROWS + 1 }).map((_, row) =>
          Array.from({ length: COLS + 1 }).map((_, col) => {
            const idx = row * (COLS + 1) + col;

            // Cell position
            const cx = offsetX + col * cellW * SCALE;
            const cy = offsetY + row * cellH * SCALE;

            // V1: staggered row-by-row reveal
            const drawDelay = row * 12 + col * 2;
            const drawP = ease(progress(frame, drawDelay, drawDelay + 25));

            // After reveal: every 2nd column flips horizontally with spring
            const flipStart = 140;
            const shouldFlip = col % 2 === 1;
            const flipProgress = shouldFlip
              ? spring({
                  frame: Math.max(0, frame - flipStart - col * 4),
                  fps,
                  config: { damping: 12, stiffness: 80 },
                })
              : 0;
            const scaleX = 1 - 2 * flipProgress;

            if (drawP < 0.01) return null;

            // Entry: scale up from center
            const entryScale = interpolate(drawP, [0, 1], [0.4, 1]);

            return (
              <g
                key={idx}
                transform={`translate(${cx + (cellW * SCALE) / 2}, ${cy + (cellH * SCALE) / 2}) scale(${SCALE * entryScale * scaleX}, ${SCALE * entryScale}) translate(${-(ox + cellW / 2)}, ${-(oy + cellH / 2)})`}
                opacity={drawP}
              >
                {PATTERN_A_PATHS.map((d, i) => (
                  <path key={i} d={d} fill={COLORS_A.fg} />
                ))}
              </g>
            );
          })
        )}
      </svg>
    </AbsoluteFill>
  );
};
