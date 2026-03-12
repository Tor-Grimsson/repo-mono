import React from "react";
import {
  useCurrentFrame,
  interpolate,
  AbsoluteFill,
  spring,
  useVideoConfig,
} from "remotion";

// ---- Easing helpers ----
const ease = (t: number) => t * t * (3 - 2 * t);

const progress = (frame: number, start: number, end: number) =>
  interpolate(frame, [start, end], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

// ---- Flower of Life geometry ----
const R = 64;
const DOT_R = 8;
const D = 48;
const CIRC = 2 * Math.PI * R;

// Design: dark bg, white stroke-only, no fills
const BG = "#121215";
const STROKE = "rgba(255,255,255,0.7)";
const STROKE_W = 0.6;
const DASH = "2 4";

// ---- Circle positions for the 7-circle Flower of Life ----
// Spiral order: center, top, top-right, bottom-right, bottom, bottom-left, top-left
const spiralAngles = [90, 30, 330, 270, 210, 150];
const ALL_CIRCLES: { cx: number; cy: number }[] = [
  { cx: 0, cy: 0 }, // center
  ...spiralAngles.map((a) => ({
    cx: D * Math.cos((a * Math.PI) / 180),
    cy: -D * Math.sin((a * Math.PI) / 180),
  })),
];

// Dot positions — on the outer edge of each petal circle
const ALL_DOTS: { cx: number; cy: number }[] = spiralAngles.map((a) => ({
  cx: (D + R + DOT_R) * Math.cos((a * Math.PI) / 180),
  cy: -(D + R + DOT_R) * Math.sin((a * Math.PI) / 180),
}));

// ================================================================
// TIMELINE — 30fps, 900 frames = 30 seconds, 1920x1080
// ================================================================
// Sequential spiral draw-on:
//   Each circle: 80 frames to draw, 30 frame gap between starts
//   Circle 0 (center):  0–80
//   Circle 1 (top):    30–110
//   Circle 2 (top-rt): 60–140
//   ...
//   Circle 6 (top-lt): 180–260
//   All drawn by ~260
//   260–600: hold with dash drift animation
//   Dots spring in staggered during 280–420
//   600–750: retract circles in reverse spiral order
//   750–900: hold empty / fade
// ================================================================

const DRAW_DUR = 80;
const CIRCLE_GAP = 30;

export const Flowers: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const SCALE = 2.5;

  // Subtle overall rotation: 0.1 deg/frame
  const rotation = frame * 0.1;

  // Enter scale
  const enterScale = spring({
    frame,
    fps,
    config: { damping: 22, stiffness: 50 },
    from: 0.85,
    to: 1,
  });

  // Exit fade
  const exitOpacity = interpolate(frame, [850, 900], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: BG }}>
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: `translate(-50%, -50%) scale(${SCALE * enterScale})`,
          opacity: exitOpacity,
        }}
      >
        <svg
          width="400"
          height="400"
          viewBox="-200 -200 400 400"
          fill="none"
          style={{ overflow: "visible" }}
        >
          <g transform={`rotate(${rotation})`}>
            {/* Circles — sequential spiral draw-on and reverse retract */}
            {ALL_CIRCLES.map((c, i) => {
              const drawStart = i * CIRCLE_GAP;
              const drawEnd = drawStart + DRAW_DUR;
              const drawP = ease(progress(frame, drawStart, drawEnd));

              // Retract in reverse order
              const reverseIdx = ALL_CIRCLES.length - 1 - i;
              const retractStart = 600 + reverseIdx * 20;
              const retractEnd = retractStart + 70;
              const retractP = ease(progress(frame, retractStart, retractEnd));

              const finalDraw = Math.max(0, drawP - retractP);
              if (finalDraw <= 0.001) return null;

              // Dash offset animation during hold phase (creates movement along path)
              const dashDrift =
                frame > drawEnd
                  ? (frame - drawEnd) * 0.15
                  : 0;

              const strokeDashoffset = CIRC * (1 - finalDraw) + dashDrift;

              return (
                <circle
                  key={`c-${i}`}
                  cx={c.cx}
                  cy={c.cy}
                  r={R}
                  fill="none"
                  stroke={STROKE}
                  strokeWidth={STROKE_W}
                  strokeLinecap="round"
                  strokeDasharray={DASH}
                  strokeDashoffset={strokeDashoffset}
                  opacity={finalDraw}
                />
              );
            })}

            {/* Dots — spring in staggered, fade out with retract */}
            {ALL_DOTS.map((d, i) => {
              const dotStart = 280 + i * 22;
              const sp = spring({
                frame: Math.max(0, frame - dotStart),
                fps,
                config: { damping: 14, stiffness: 80 },
              });
              const retractP = ease(
                progress(frame, 640 + i * 15, 640 + i * 15 + 60)
              );
              const finalScale = Math.max(0, sp - retractP);
              if (finalScale <= 0.01) return null;

              return (
                <circle
                  key={`d-${i}`}
                  cx={d.cx}
                  cy={d.cy}
                  r={DOT_R}
                  fill="white"
                  fillOpacity={0.5 * finalScale}
                  transform={`translate(${d.cx},${d.cy}) scale(${finalScale}) translate(${-d.cx},${-d.cy})`}
                />
              );
            })}
          </g>
        </svg>
      </div>
    </AbsoluteFill>
  );
};
