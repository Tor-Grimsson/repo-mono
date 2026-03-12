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

const SCALE = Math.min(W / (COLS * PATTERN_A_CELL_W), H / (ROWS * PATTERN_A_CELL_H)) * 1.15;

/**
 * FlikA V3 — Column cascade + mirror: columns appear L-to-R, then odd/even slide vertically
 * Dark chevrons on cream. 1920x1080, 450 frames, 30fps.
 */
export const FlikAV3: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const ox = PATTERN_A_CELL_ORIGIN.x;
  const oy = PATTERN_A_CELL_ORIGIN.y;
  const cellW = PATTERN_A_CELL_W;
  const cellH = PATTERN_A_CELL_H;

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

            // Column cascade: columns appear left to right
            const colDelay = col * 10;
            const colP = ease(progress(frame, colDelay, colDelay + 20));

            // Slide from left
            const slideX = interpolate(colP, [0, 1], [-cellW * SCALE, 0]);

            // After all columns in: vertical slide
            const slideStart = 160;
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
