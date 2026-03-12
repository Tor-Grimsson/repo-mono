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
 * FlikB V4 — Radial breathing pulse from center + rotation
 * Cream chevrons on raspberry. 1920x1080, 450 frames, 30fps.
 */
export const FlikBV4: React.FC = () => {
  const frame = useCurrentFrame();

  const ox = PATTERN_B_ORIGIN.x;
  const oy = PATTERN_B_ORIGIN.y;
  const cellW = PATTERN_B_CELL_W;
  const cellH = PATTERN_B_CELL_H;

  const gridW = COLS * cellW * SCALE;
  const gridH = ROWS * cellH * SCALE;
  const offsetX = (W - gridW) / 2;
  const offsetY = (H - gridH) / 2;

  const centerCol = COLS / 2;
  const centerRow = ROWS / 2;
  const maxDist = Math.sqrt(centerCol * centerCol + centerRow * centerRow);

  const pulseStart = 30;
  const pulseSpeed = 0.15;

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS_B.bg }}>
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`}>
        {Array.from({ length: ROWS + 2 }).map((_, row) =>
          Array.from({ length: COLS + 2 }).map((_, col) => {
            const idx = row * (COLS + 2) + col;

            const cx = offsetX + col * cellW * SCALE;
            const cy = offsetY + row * cellH * SCALE;

            const dist = Math.sqrt(
              Math.pow(col - centerCol, 2) + Math.pow(row - centerRow, 2)
            );
            const appearDelay = dist * 3;
            const appearP = ease(progress(frame, appearDelay, appearDelay + 18));

            // First pulse outward
            const pulseWavePos = (frame - pulseStart) * pulseSpeed - dist;
            const pulseBump = Math.max(0, 1 - Math.abs(pulseWavePos) * 0.5);
            const pulseEased = ease(pulseBump);
            const pulseScale = 1 + pulseEased * 0.3;

            // Second pulse inward
            const pulse2Start = 220;
            const pulse2WavePos = (frame - pulse2Start) * pulseSpeed - (maxDist - dist);
            const pulse2Bump = Math.max(0, 1 - Math.abs(pulse2WavePos) * 0.5);
            const pulse2Eased = ease(pulse2Bump);

            const totalScale = pulseScale + pulse2Eased * 0.2;
            const rotation = pulseEased * 20 - pulse2Eased * 20;

            if (appearP < 0.01) return null;

            return (
              <g
                key={idx}
                transform={`translate(${cx + (cellW * SCALE) / 2}, ${cy + (cellH * SCALE) / 2}) scale(${SCALE * appearP * totalScale}) rotate(${rotation}) translate(${-(ox + cellW / 2)}, ${-(oy + cellH / 2)})`}
                opacity={appearP}
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
