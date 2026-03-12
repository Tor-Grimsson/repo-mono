import React from "react";
import {
  useCurrentFrame,
  interpolate,
  AbsoluteFill,
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

const W = 1920;
const H = 1080;
const COLS = 18;
const ROWS = 12;

const SCALE = Math.min(W / (COLS * PATTERN_B_CELL_W), H / (ROWS * PATTERN_B_CELL_H)) * 1.15;

/**
 * FlikB V2 — Wave ripple: sine wave travels across, rotating each chevron
 * Cream chevrons on raspberry. 1920x1080, 450 frames, 30fps.
 */
export const FlikBV2: React.FC = () => {
  const frame = useCurrentFrame();

  const ox = PATTERN_B_ORIGIN.x;
  const oy = PATTERN_B_ORIGIN.y;
  const cellW = PATTERN_B_CELL_W;
  const cellH = PATTERN_B_CELL_H;

  const gridW = COLS * cellW * SCALE;
  const gridH = ROWS * cellH * SCALE;
  const offsetX = (W - gridW) / 2;
  const offsetY = (H - gridH) / 2;

  const waveSpeed = 0.08;
  const waveWidth = 4;

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS_B.bg }}>
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`}>
        {Array.from({ length: ROWS + 2 }).map((_, row) =>
          Array.from({ length: COLS + 2 }).map((_, col) => {
            const idx = row * (COLS + 2) + col;

            const cx = offsetX + col * cellW * SCALE;
            const cy = offsetY + row * cellH * SCALE;

            const fadeIn = ease(progress(frame, 0, 25));

            // Diagonal wave
            const wavePos = (frame - 50) * waveSpeed - col * 0.6 - row * 0.4;
            const waveBump = Math.max(0, 1 - Math.abs(wavePos) / waveWidth);
            const waveEased = ease(waveBump);

            const rotation = waveEased * 180;
            const scaleBoost = 1 + waveEased * 0.12;

            return (
              <g
                key={idx}
                transform={`translate(${cx + (cellW * SCALE) / 2}, ${cy + (cellH * SCALE) / 2}) scale(${SCALE * scaleBoost}) rotate(${rotation}) translate(${-(ox + cellW / 2)}, ${-(oy + cellH / 2)})`}
                opacity={fadeIn}
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
