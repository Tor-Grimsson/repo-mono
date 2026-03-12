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

interface Stage {
  circles: Circle[];
  dots: { cx: number; cy: number }[];
}

const STAGES: Stage[] = [
  // Stage 0: Single circle
  {
    circles: [{ cx: 0, cy: 0 }],
    dots: [{ cx: 0, cy: -(R + DOT_R) }],
  },
  // Stage 1: Two circles side by side
  {
    circles: [{ cx: -D, cy: 0 }, { cx: D, cy: 0 }],
    dots: [{ cx: -(D + R + DOT_R), cy: 0 }, { cx: D + R + DOT_R, cy: 0 }],
  },
  // Stage 2: Three circles — triangle
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
  // Stage 3: Four circles — cross
  { circles: fourCircles, dots: fourDots },
  // Stage 4: Six circles — hexagonal
  { circles: sixCircles, dots: sixDots },
  // Stage 5: Seven circles — six + center
  { circles: [{ cx: 0, cy: 0 }, ...sixCircles], dots: sixDots },
  // Stage 6: Thirteen circles — center + 6 inner + 6 outer
  {
    circles: [
      { cx: 0, cy: 0 },
      ...sixCircles,
      ...sixAngles.map((a) => ({
        cx: 2 * D * Math.cos((a * Math.PI) / 180),
        cy: -2 * D * Math.sin((a * Math.PI) / 180),
      })),
    ],
    dots: [
      ...sixDots,
      ...sixAngles.map((a) => ({
        cx: (2 * D + R + DOT_R) * Math.cos((a * Math.PI) / 180),
        cy: -(2 * D + R + DOT_R) * Math.sin((a * Math.PI) / 180),
      })),
    ],
  },
];

const BG = "#121215";
const DRAW_DUR = 60;

// ================================================================
// TIMELINE — 30fps, 900 frames = 30 seconds
// ================================================================
// 0-90:    Stage 0 (1 circle) draws on from nothing
// 90-200:  Stage 1 (2 circles) — new circle births, spring scale-in
// 200-320: Stage 2 (3 circles, triangle)
// 320-430: Stage 3 (4 circles, cross)
// 430-550: Stage 4 (6 circles, hexagonal)
// 550-640: Stage 5 (7 circles, 6+center)
// 640-730: Stage 6 (13 circles, full dense with outer ring)
// 730-820: Hold with subtle breathing (scale oscillation 0.98-1.02)
// 820-900: Draw off — strokes retract, circles scale down, fade out
// ================================================================

export const Bloom: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const stageTimings = [
    { start: 0 },
    { start: 90 },
    { start: 200 },
    { start: 320 },
    { start: 430 },
    { start: 550 },
    { start: 640 },
  ];

  const activeCircles: {
    cx: number;
    cy: number;
    drawProgress: number;
    scaleProgress: number;
  }[] = [];

  const activeDots: {
    cx: number;
    cy: number;
    scaleProgress: number;
  }[] = [];

  const placedCircles = new Set<string>();
  const placedDots = new Set<string>();
  const coordKey = (c: { cx: number; cy: number }) =>
    `${Math.round(c.cx * 10)},${Math.round(c.cy * 10)}`;

  // Retract phase: 820-900
  const retractStart = 820;
  const retractDur = 50;

  for (let si = 0; si < STAGES.length; si++) {
    const timing = stageTimings[si];
    if (frame < timing.start - 10) continue;

    const stage = STAGES[si];

    stage.circles.forEach((c, ci) => {
      const k = coordKey(c);
      if (placedCircles.has(k)) return;
      placedCircles.add(k);

      const stagger = ci * 8;
      const appearFrame = timing.start + stagger;

      // Spring scale-in for birth
      const scaleP =
        frame < appearFrame
          ? 0
          : spring({
              frame: frame - appearFrame,
              fps,
              config: { damping: 14, stiffness: 80 },
            });

      // Stroke draw-on (starts simultaneously with scale, takes DRAW_DUR frames)
      const drawP = ease(progress(frame, appearFrame, appearFrame + DRAW_DUR));

      // Retract: stroke retracts and scale shrinks
      const retractIdx = ci + si * 2; // stagger retract by stage + circle index
      const retractP = ease(
        progress(frame, retractStart + retractIdx * 2, retractStart + retractIdx * 2 + retractDur)
      );

      const finalDraw = Math.max(0, drawP - retractP);
      const finalScale = Math.max(0, scaleP * (1 - retractP));

      if (finalScale <= 0.01 && finalDraw <= 0) return;

      activeCircles.push({
        cx: c.cx,
        cy: c.cy,
        drawProgress: finalDraw,
        scaleProgress: finalScale,
      });
    });

    stage.dots.forEach((d, di) => {
      const k = coordKey(d);
      if (placedDots.has(k)) return;
      placedDots.add(k);

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

      const retractIdx = di + si * 2;
      const retractP = ease(
        progress(frame, retractStart + 10 + retractIdx * 2, retractStart + 10 + retractIdx * 2 + 40)
      );
      const finalScale = Math.max(0, sp * (1 - retractP));

      if (finalScale <= 0.01) return;

      activeDots.push({ cx: d.cx, cy: d.cy, scaleProgress: finalScale });
    });
  }

  // ---- Overall composition scale ----
  const enterScale = spring({
    frame,
    fps,
    config: { damping: 20, stiffness: 60 },
    from: 0.7,
    to: 1,
  });

  const exitScale =
    frame >= 850
      ? interpolate(frame, [850, 900], [1, 0.8], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: (t: number) => t * t,
        })
      : 1;

  const exitOpacity =
    frame >= 870
      ? interpolate(frame, [870, 900], [1, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        })
      : 1;

  // Subtle breathing during hold phase (730-820)
  const breathe =
    frame >= 730 && frame < 820
      ? 0.98 + 0.04 * (0.5 + 0.5 * Math.sin((frame - 730) * 0.07))
      : 1;

  const SCALE = 2.2;
  const compositeScale = SCALE * enterScale * exitScale * breathe;

  return (
    <AbsoluteFill style={{ backgroundColor: BG }}>
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: `translate(-50%, -50%) scale(${compositeScale})`,
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
