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

// Center circle
const CENTER: { cx: number; cy: number } = { cx: 0, cy: 0 };

// 6 petal circles with their tangent angle to center
const petalAngles = [90, 30, 330, 270, 210, 150];
const PETALS: { cx: number; cy: number; tangentAngle: number }[] =
  petalAngles.map((a) => ({
    cx: D * Math.cos((a * Math.PI) / 180),
    cy: -D * Math.sin((a * Math.PI) / 180),
    // The tangent point is where this circle touches the center circle.
    // The draw should start from this angle (pointing toward center).
    // Angle from petal center toward origin = a + 180
    tangentAngle: a + 180,
  }));

// Dot positions
const DOTS: { cx: number; cy: number }[] = petalAngles.map((a) => ({
  cx: (D + R + DOT_R) * Math.cos((a * Math.PI) / 180),
  cy: -(D + R + DOT_R) * Math.sin((a * Math.PI) / 180),
}));

// ================================================================
// TIMELINE — 30fps, 900 frames = 30 seconds, 1080x1080 square
// ================================================================
// Wave 1:   0–120    Center circle draws on
// Wave 2: 120–300    6 petals draw on simultaneously (from tangent points)
// Wave 3: 300–450    Dots pop in with staggered spring
// Hold:   450–700    Dash patterns rotate (spinning flow along circumferences)
// Exit:   700–900    Fade out with circles shrinking via scale
// ================================================================

export const FlowersV2: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const SCALE = 2.8;

  // Enter scale
  const enterScale = spring({
    frame,
    fps,
    config: { damping: 22, stiffness: 50 },
    from: 0.85,
    to: 1,
  });

  // Exit: shrink + fade from 700-900
  const exitScale = interpolate(frame, [700, 900], [1, 0.6], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const exitOpacity = interpolate(frame, [700, 900], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Center circle draw-on: 0-120
  const centerDraw = ease(progress(frame, 0, 120));

  // Dash rotation during hold (450-700): slowly shift dashoffset
  const holdDashDrift = frame > 120 ? (frame - 120) * 0.2 : 0;

  return (
    <AbsoluteFill style={{ backgroundColor: BG }}>
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: `translate(-50%, -50%) scale(${SCALE * enterScale * exitScale})`,
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
          {/* Center circle */}
          {centerDraw > 0.001 && (
            <circle
              cx={CENTER.cx}
              cy={CENTER.cy}
              r={R}
              fill="none"
              stroke={STROKE}
              strokeWidth={STROKE_W}
              strokeLinecap="round"
              strokeDasharray={DASH}
              strokeDashoffset={CIRC * (1 - centerDraw) + holdDashDrift}
              opacity={centerDraw}
            />
          )}

          {/* 6 petal circles — draw on simultaneously from 120-300 */}
          {PETALS.map((p, i) => {
            const stagger = i * 15; // slight stagger between petals
            const drawStart = 120 + stagger;
            const drawEnd = drawStart + 90; // 90 frames each for finesse
            const drawP = ease(progress(frame, drawStart, drawEnd));
            if (drawP <= 0.001) return null;

            // Each circle's dash rotates independently during hold
            // Different speeds for visual interest
            const petalDashDrift =
              frame > drawEnd
                ? (frame - drawEnd) * (0.12 + i * 0.03) * (i % 2 === 0 ? 1 : -1)
                : 0;

            // SVG dashoffset rotates the start point of the dash pattern.
            // To draw from the tangent point, we rotate the dash start
            // by the tangent angle. Convert angle to arc length offset.
            const tangentOffset =
              ((p.tangentAngle % 360) / 360) * CIRC;

            const strokeDashoffset =
              CIRC * (1 - drawP) + tangentOffset + petalDashDrift;

            return (
              <circle
                key={`p-${i}`}
                cx={p.cx}
                cy={p.cy}
                r={R}
                fill="none"
                stroke={STROKE}
                strokeWidth={STROKE_W}
                strokeLinecap="round"
                strokeDasharray={DASH}
                strokeDashoffset={strokeDashoffset}
                opacity={drawP}
              />
            );
          })}

          {/* Dots — staggered spring from 300-450 */}
          {DOTS.map((d, i) => {
            const dotStart = 300 + i * 25;
            const sp = spring({
              frame: Math.max(0, frame - dotStart),
              fps,
              config: { damping: 10, stiffness: 90 },
            });

            // Exit: dots shrink with the overall exit
            const dotExitScale = interpolate(
              frame,
              [720 + i * 10, 850],
              [1, 0],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
            );
            const finalScale = sp * dotExitScale;
            if (finalScale <= 0.01) return null;

            return (
              <circle
                key={`d-${i}`}
                cx={d.cx}
                cy={d.cy}
                r={DOT_R}
                fill="white"
                fillOpacity={0.5 * Math.min(1, finalScale)}
                transform={`translate(${d.cx},${d.cy}) scale(${finalScale}) translate(${-d.cx},${-d.cy})`}
              />
            );
          })}
        </svg>
      </div>
    </AbsoluteFill>
  );
};
