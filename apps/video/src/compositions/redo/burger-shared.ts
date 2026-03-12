import { interpolate } from "remotion";

// ================================================================
// SHARED DATA for Burger / Waves compositions
// SVG path data from apps/video/svgs-to-animate/5/320.svg
// ================================================================

// Colors
export const BG = "#202A42";
export const GOLD = "#FFCC00";

// Top half: semicircle with scalloped bottom edge (from 320.svg line 3)
export const TOP_HALF =
  "M160 48C124.654 48 96 77.2077 96 113.239C98.1004 115.383 100.595 117.083 103.34 118.243C106.085 119.403 109.028 120 112 120C114.972 120 117.915 119.403 120.66 118.243C123.405 117.083 125.9 115.383 128 113.239C130.1 111.096 132.594 109.395 135.34 108.235C138.085 107.075 141.028 106.477 144 106.477C146.972 106.477 149.915 107.075 152.66 108.235C155.406 109.395 157.9 111.096 160 113.239C162.1 115.383 164.595 117.083 167.34 118.243C170.085 119.403 173.028 120 176 120C178.972 120 181.915 119.403 184.66 118.243C187.405 117.083 189.9 115.383 192 113.239C194.1 111.096 196.594 109.395 199.34 108.235C202.085 107.075 205.028 106.477 208 106.477C210.972 106.477 213.915 107.075 216.66 108.235C219.406 109.395 221.9 111.096 224 113.239C224 77.2077 195.346 48 160 48Z";

// Bottom half: semicircle with scalloped top edge (from 320.svg line 7)
export const BOTTOM_HALF =
  "M192 206.761C189.9 208.904 187.405 210.604 184.66 211.764C181.915 212.924 178.972 213.521 176 213.521C173.028 213.521 170.085 212.924 167.34 211.764C164.595 210.604 162.1 208.904 160 206.761C157.9 204.617 155.405 202.917 152.66 201.757C149.915 200.597 146.972 200 144 200C141.028 200 138.085 200.597 135.34 201.757C132.595 202.917 130.1 204.617 128 206.761C125.9 208.904 123.405 210.604 120.66 211.764C117.915 212.924 114.972 213.521 112 213.521C109.028 213.521 106.085 212.924 103.34 211.764C100.595 210.604 98.1004 208.904 96 206.761C96 242.791 124.654 272 160 272C195.346 272 224 242.791 224 206.761C221.9 204.617 219.405 202.917 216.66 201.757C213.915 200.597 210.972 200 208 200C205.028 200 202.085 200.597 199.34 201.757C196.595 202.917 194.1 204.617 192 206.761V206.761Z";

// Wave centerline path: 6 scallops from x=64 to x=256
// Matches the scallop geometry of the halves' edges.
// Uses absolute coordinates in the 320x320 viewBox.
// Amplitude 6.8px matches the SVG scallop depth.
const buildWavePath = (): string => {
  const amp = 6.8;
  const segW = 32;
  const count = 6;
  const startX = 64;
  let d = `M${startX} 0`;
  for (let i = 0; i < count; i++) {
    const x0 = startX + i * segW;
    const x1 = x0 + segW;
    const dir = i % 2 === 0 ? -1 : 1;
    d += ` C${x0 + segW / 3} ${dir * amp} ${x0 + (2 * segW) / 3} ${dir * amp} ${x1} 0`;
  }
  return d;
};

export const WAVE_PATH = buildWavePath();

// Original wave Y positions from 320.svg (3 rows)
export const WAVE_Y = [137, 160, 183];

// How much to translate each half to close the gap.
// Top scallop troughs at y=120, bottom at y=200.
// To interlock at y=160: each half moves 44px toward center.
// At CLOSE_OFFSET, top troughs at y=164 overlap bottom peaks at y=163.
export const CLOSE_OFFSET = 44;

// ================================================================
// Easing helpers
// ================================================================

/** Smoothstep easing */
export const ease = (t: number) => t * t * (3 - 2 * t);

/** Clamped progress from 0 to 1 between start and end frames */
export const progress = (frame: number, start: number, end: number) => {
  if (start >= end) return frame >= start ? 1 : 0;
  return interpolate(frame, [start, end], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
};
