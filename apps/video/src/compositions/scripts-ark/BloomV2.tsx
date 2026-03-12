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
const DOT_R = 12;
const D = 48;
const CIRC = 2 * Math.PI * R;

interface Circle {
  cx: number;
  cy: number;
}

const sixAngles = [90, 30, 330, 270, 210, 150];
const sixCircles: Circle[] = sixAngles.map((a) => ({
  cx: D * Math.cos((a * Math.PI) / 180),
  cy: -D * Math.sin((a * Math.PI) / 180),
}));
const sixDots = sixAngles.map((a) => ({
  cx: (D + R + DOT_R) * Math.cos((a * Math.PI) / 180),
  cy: -(D + R + DOT_R) * Math.sin((a * Math.PI) / 180),
}));

const fourAngles = [90, 0, 270, 180];
const fourCircles: Circle[] = fourAngles.map((a) => ({
  cx: D * Math.cos((a * Math.PI) / 180),
  cy: -D * Math.sin((a * Math.PI) / 180),
}));
const fourDots = fourAngles.map((a) => ({
  cx: (D + R + DOT_R) * Math.cos((a * Math.PI) / 180),
  cy: -(D + R + DOT_R) * Math.sin((a * Math.PI) / 180),
}));

// Stages: start at 3 circles, focus on growth/expansion
interface Stage {
  circles: Circle[];
  dots: { cx: number; cy: number }[];
}

const STAGES: Stage[] = [
  // Stage 0: Three circles — triangle
  {
    circles: [
      { cx: 0, cy: -D },
      { cx: -D * Math.cos(Math.PI / 6), cy: D * Math.sin(Math.PI / 6) },
      { cx: D * Math.cos(Math.PI / 6), cy: D * Math.sin(Math.PI / 6) },
    ],
    dots: [
      { cx: 0, cy: -(D + R + DOT_R) },
      {
        cx: -(D + R + DOT_R) * Math.cos(Math.PI / 6),
        cy: (D + R + DOT_R) * Math.sin(Math.PI / 6),
      },
      {
        cx: (D + R + DOT_R) * Math.cos(Math.PI / 6),
        cy: (D + R + DOT_R) * Math.sin(Math.PI / 6),
      },
    ],
  },
  // Stage 1: Four circles — cross
  { circles: fourCircles, dots: fourDots },
  // Stage 2: Six circles — hexagonal
  { circles: sixCircles, dots: sixDots },
  // Stage 3: Seven circles — six + center
  { circles: [{ cx: 0, cy: 0 }, ...sixCircles], dots: sixDots },
];

const BG = "#121215";
const DRAW_DUR = 45;

// ================================================================
// TIMELINE — 30fps, 600 frames = 20 seconds
// ================================================================
// 0-80:    Stage 0 (3 circles, triangle) draws on simultaneously
// 80-180:  Stage 1 (4 circles) — pattern rotates 60 deg as new circle appears
// 180-280: Stage 2 (6 circles) — bloom outward, new circles expand from center
// 280-360: Stage 3 (7 circles) — center circle pops in with spring bounce
// 360-450: Hold with gentle rotation of entire pattern (0.5 deg/frame)
// 450-520: Circles scale down one by one in reverse order
// 520-600: Final fade out
// ================================================================

export const BloomV2: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const stageTimings = [
    { start: 0 },
    { start: 80 },
    { start: 180 },
    { start: 280 },
  ];

  // Track all circles with unique keys and their appearance order (global index)
  const activeCircles: {
    cx: number;
    cy: number;
    drawProgress: number;
    scaleProgress: number;
    globalIndex: number;
  }[] = [];

  const activeDots: {
    cx: number;
    cy: number;
    scaleProgress: number;
    globalIndex: number;
  }[] = [];

  const placedCircles = new Set<string>();
  const placedDots = new Set<string>();
  const coordKey = (c: { cx: number; cy: number }) =>
    `${Math.round(c.cx * 10)},${Math.round(c.cy * 10)}`;

  let globalCircleIdx = 0;
  let globalDotIdx = 0;
  const totalCircles = 7; // max circles in final stage

  for (let si = 0; si < STAGES.length; si++) {
    const timing = stageTimings[si];
    if (frame < timing.start - 10) continue;

    const stage = STAGES[si];

    stage.circles.forEach((c, ci) => {
      const k = coordKey(c);
      if (placedCircles.has(k)) return;
      placedCircles.add(k);

      const myGlobalIdx = globalCircleIdx++;
      const stagger = ci * 8;
      const appearFrame = timing.start + stagger;

      // Spring scale-in for birth
      const scaleP =
        frame < appearFrame
          ? 0
          : spring({
              frame: frame - appearFrame,
              fps,
              config: { damping: 12, stiffness: 90 },
            });

      // Stroke draw-on
      const drawP = ease(progress(frame, appearFrame, appearFrame + DRAW_DUR));

      // Reverse-order retract: last added circles disappear first
      // Circle with globalIndex G retracts at: 450 + (totalCircles - 1 - G) * 8
      const reverseIdx = totalCircles - 1 - myGlobalIdx;
      const retractFrame = 450 + reverseIdx * 8;
      const retractP = ease(progress(frame, retractFrame, retractFrame + 35));

      const finalDraw = Math.max(0, drawP - retractP);
      const finalScale = Math.max(0, scaleP * (1 - retractP));

      if (finalScale <= 0.01 && finalDraw <= 0) return;

      activeCircles.push({
        cx: c.cx,
        cy: c.cy,
        drawProgress: finalDraw,
        scaleProgress: finalScale,
        globalIndex: myGlobalIdx,
      });
    });

    stage.dots.forEach((d, di) => {
      const k = coordKey(d);
      if (placedDots.has(k)) return;
      placedDots.add(k);

      const myGlobalIdx = globalDotIdx++;
      const stagger = di * 8;
      const dotAppear = timing.start + stagger + DRAW_DUR * 0.5;

      const sp =
        frame < dotAppear
          ? 0
          : spring({
              frame: frame - dotAppear,
              fps,
              config: { damping: 10, stiffness: 100, overshootClamping: false },
            });

      // Reverse retract for dots too
      const totalDots = 6; // max dots
      const reverseIdx = totalDots - 1 - myGlobalIdx;
      const retractFrame = 450 + reverseIdx * 6;
      const retractP = ease(progress(frame, retractFrame + 5, retractFrame + 35));
      const finalScale = Math.max(0, sp * (1 - retractP));

      if (finalScale <= 0.01) return;

      activeDots.push({
        cx: d.cx,
        cy: d.cy,
        scaleProgress: finalScale,
        globalIndex: myGlobalIdx,
      });
    });
  }

  // ---- Overall composition transforms ----
  const enterScale = spring({
    frame,
    fps,
    config: { damping: 18, stiffness: 70 },
    from: 0.8,
    to: 1,
  });

  // Pattern rotation during stage 1 transition (80-180): 60 degrees
  const stageRotation = ease(progress(frame, 80, 140)) * 60;

  // Hold phase rotation (360-450): gentle continuous rotation at 0.5 deg/frame
  const holdRotation =
    frame >= 360 && frame < 450 ? (frame - 360) * 0.5 : frame >= 450 ? 90 * 0.5 : 0;

  const totalRotation = stageRotation + holdRotation;

  // Final fade out (520-600)
  const exitOpacity =
    frame >= 520
      ? interpolate(frame, [520, 600], [1, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        })
      : 1;

  const exitScale =
    frame >= 540
      ? interpolate(frame, [540, 600], [1, 0.85], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: (t: number) => t * t,
        })
      : 1;

  const SCALE = 2.4;
  const compositeScale = SCALE * enterScale * exitScale;

  return (
    <AbsoluteFill style={{ backgroundColor: BG }}>
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: `translate(-50%, -50%) scale(${compositeScale}) rotate(${totalRotation}deg)`,
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
          {/* ---- Circle strokes + fills ---- */}
          {activeCircles.map((c, i) => {
            // Stroke draw-on via dashoffset
            const baseOffset = CIRC * (1 - c.drawProgress);
            // Subtle rotation of dash pattern
            const dashDrift = frame * 0.3;
            const dashOffset = baseOffset + dashDrift;

            return (
              <circle
                key={`c-${i}`}
                cx={c.cx}
                cy={c.cy}
                r={R}
                fill="white"
                fillOpacity={0.03 * c.scaleProgress}
                stroke="white"
                strokeWidth={0.8}
                strokeLinecap="round"
                strokeDasharray="2 4"
                strokeDashoffset={dashOffset}
                transform={`translate(${c.cx},${c.cy}) scale(${c.scaleProgress}) translate(${-c.cx},${-c.cy})`}
              />
            );
          })}

          {/* ---- Dots (sentinel points) ---- */}
          {activeDots.map((d, i) => (
            <circle
              key={`d-${i}`}
              cx={d.cx}
              cy={d.cy}
              r={DOT_R}
              fill="white"
              opacity={d.scaleProgress}
              transform={`translate(${d.cx},${d.cy}) scale(${d.scaleProgress}) translate(${-d.cx},${-d.cy})`}
            />
          ))}
        </svg>
      </div>
    </AbsoluteFill>
  );
};
