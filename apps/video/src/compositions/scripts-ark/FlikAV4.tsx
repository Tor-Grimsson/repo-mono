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
 * FlikA V4 — Breathing scale pulse from center + rotation on pulse
 * Dark chevrons on cream. 1920x1080, 450 frames, 30fps.
 */
export const FlikAV4: React.FC = () => {
  const frame = useCurrentFrame();

  const ox = PATTERN_A_CELL_ORIGIN.x;
  const oy = PATTERN_A_CELL_ORIGIN.y;
  const cellW = PATTERN_A_CELL_W;
  const cellH = PATTERN_A_CELL_H;

  const gridW = COLS * cellW * SCALE;
  const gridH = ROWS * cellH * SCALE;
  const offsetX = (W - gridW) / 2;
  const offsetY = (H - gridH) / 2;

  // Center of grid in col/row space
  const centerCol = COLS / 2;
  const centerRow = ROWS / 2;

  // Radial pulse timing
  const pulseStart = 40;
  const pulseSpeed = 0.12; // distance units per frame
  const maxDist = Math.sqrt(centerCol * centerCol + centerRow * centerRow);

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS_A.bg }}>
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`}>
        {Array.from({ length: ROWS + 1 }).map((_, row) =>
          Array.from({ length: COLS + 1 }).map((_, col) => {
            const idx = row * (COLS + 1) + col;

            const cx = offsetX + col * cellW * SCALE;
            const cy = offsetY + row * cellH * SCALE;

            // Initial appear
            const dist = Math.sqrt(
              Math.pow(col - centerCol, 2) + Math.pow(row - centerRow, 2)
            );
            const appearDelay = dist * 5;
            const appearP = ease(progress(frame, appearDelay, appearDelay + 20));

            // Radial pulse: travels outward from center
            const pulseWavePos = (frame - pulseStart) * pulseSpeed - dist;
            const pulseBump = Math.max(0, 1 - Math.abs(pulseWavePos) * 0.6);
            const pulseEased = ease(pulseBump);

            // Scale: normal 1.0, pulse expands to 1.2, then settles
            const pulseScale = 1 + pulseEased * 0.25;

            // Second pulse wave (later, going inward)
            const pulse2Start = 250;
            const pulse2WavePos = (frame - pulse2Start) * pulseSpeed - (maxDist - dist);
            const pulse2Bump = Math.max(0, 1 - Math.abs(pulse2WavePos) * 0.6);
            const pulse2Eased = ease(pulse2Bump);

            const totalScale = pulseScale + pulse2Eased * 0.2;

            // Rotation during pulse
            const rotation = pulseEased * 15 - pulse2Eased * 15;

            if (appearP < 0.01) return null;

            return (
              <g
                key={idx}
                transform={`translate(${cx + (cellW * SCALE) / 2}, ${cy + (cellH * SCALE) / 2}) scale(${SCALE * appearP * totalScale}) rotate(${rotation}) translate(${-(ox + cellW / 2)}, ${-(oy + cellH / 2)})`}
                opacity={appearP}
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
