import React from "react";
import {
  useCurrentFrame,
  interpolate,
  AbsoluteFill,
  spring,
  useVideoConfig,
} from "remotion";
import {
  PATTERN_B_PATHS,
  PATTERN_B_ORIGIN,
  PATTERN_B_CELL_W,
  PATTERN_B_CELL_H,
  COLORS_B,
} from "./flikPaths";

const ease = (t: number) => t * t * (3 - 2 * t);
const progress = (frame: number, start: number, end: number) =>
  interpolate(frame, [start, end], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

const W = 2160;
const H = 3600;
const COLS = 12;
const ROWS = 36;

const SCALE = Math.min(W / (COLS * PATTERN_B_CELL_W), H / (ROWS * PATTERN_B_CELL_H)) * 1.1;

/**
 * FlikB Portrait V3 — Column cascade + vertical interlock
 * Cream chevrons on raspberry. 2160x3600, 450 frames, 30fps.
 */
export const FlikBV3_P: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const ox = PATTERN_B_ORIGIN.x;
  const oy = PATTERN_B_ORIGIN.y;
  const cellW = PATTERN_B_CELL_W;
  const cellH = PATTERN_B_CELL_H;

  const gridW = COLS * cellW * SCALE;
  const gridH = ROWS * cellH * SCALE;
  const offsetX = (W - gridW) / 2;
  const offsetY = (H - gridH) / 2;

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS_B.bg }}>
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`}>
        {Array.from({ length: ROWS + 2 }).map((_, row) =>
          Array.from({ length: COLS + 2 }).map((_, col) => {
            const idx = row * (COLS + 2) + col;

            const colDelay = col * 8;
            const colP = ease(progress(frame, colDelay, colDelay + 18));

            const slideX = interpolate(colP, [0, 1], [-cellW * SCALE * 2, 0]);

            const slideStart = 120;
            const isOdd = col % 2 === 1;
            const slideDir = isOdd ? -1 : 1;
            const slideAmount = cellH * SCALE * 0.5 * slideDir;

            const slideYProgress = frame > slideStart
              ? spring({
                  frame: frame - slideStart - col * 2,
                  fps,
                  config: { damping: 14, stiffness: 60 },
                  from: 0,
                  to: 1,
                })
              : 0;
            const slideY = slideYProgress * slideAmount;

            const cx = offsetX + col * cellW * SCALE + slideX;
            const cy = offsetY + row * cellH * SCALE + slideY;

            if (colP < 0.01) return null;

            return (
              <g
                key={idx}
                transform={`translate(${cx + (cellW * SCALE) / 2}, ${cy + (cellH * SCALE) / 2}) scale(${SCALE}) translate(${-(ox + cellW / 2)}, ${-(oy + cellH / 2)})`}
                opacity={colP}
              >
                {PATTERN_B_PATHS.map((d, i) => (
                  <path key={i} d={d} fill={COLORS_B.fg} />
                ))}
              </g>
            );
          })
        )}
      </svg>
    </AbsoluteFill>
  );
};
