import React from "react";
import {
  useCurrentFrame,
  interpolate,
  AbsoluteFill,
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
 * FlikA V2 — Wave ripple: sine wave travels across grid, rotating each chevron 180deg
 * Dark chevrons on cream. 1920x1080, 450 frames, 30fps.
 */
export const FlikAV2: React.FC = () => {
  const frame = useCurrentFrame();

  const ox = PATTERN_A_CELL_ORIGIN.x;
  const oy = PATTERN_A_CELL_ORIGIN.y;
  const cellW = PATTERN_A_CELL_W;
  const cellH = PATTERN_A_CELL_H;

  const gridW = COLS * cellW * SCALE;
  const gridH = ROWS * cellH * SCALE;
  const offsetX = (W - gridW) / 2;
  const offsetY = (H - gridH) / 2;

  // Wave parameters
  const waveSpeed = 0.06; // frames per pixel of travel
  const waveWidth = 5; // columns wide

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS_A.bg }}>
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`}>
        {Array.from({ length: ROWS + 1 }).map((_, row) =>
          Array.from({ length: COLS + 1 }).map((_, col) => {
            const idx = row * (COLS + 1) + col;

            const cx = offsetX + col * cellW * SCALE;
            const cy = offsetY + row * cellH * SCALE;

            // Initial fade in
            const fadeIn = ease(progress(frame, 0, 30));

            // Wave position based on column + row offset
            const wavePos = (frame - 60) * waveSpeed - col * 0.8 - row * 0.3;
            // Smooth bump: 0 normally, peaks at 1 when wave passes
            const waveBump = Math.max(0, 1 - Math.abs(wavePos) / waveWidth);
            const waveEased = ease(waveBump);

            // Rotation: 0 -> 180 -> 0 as wave passes
            const rotation = waveEased * 180;

            // Subtle scale pulse during wave
            const scaleBoost = 1 + waveEased * 0.15;

            return (
              <g
                key={idx}
                transform={`translate(${cx + (cellW * SCALE) / 2}, ${cy + (cellH * SCALE) / 2}) scale(${SCALE * scaleBoost}) rotate(${rotation}) translate(${-(ox + cellW / 2)}, ${-(oy + cellH / 2)})`}
                opacity={fadeIn}
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
