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

const progress = (frame: number, start: number, end: number) => {
  if (start >= end) return frame >= start ? 1 : 0;
  return interpolate(frame, [start, end], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
};

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
  { circles: [{ cx: 0, cy: 0 }], dots: [{ cx: 0, cy: -(R + DOT_R) }] },
  {
    circles: [
      { cx: -D, cy: 0 },
      { cx: D, cy: 0 },
    ],
    dots: [
      { cx: -(D + R + DOT_R), cy: 0 },
      { cx: D + R + DOT_R, cy: 0 },
    ],
  },
  {
    circles: [
      { cx: 0, cy: -D },
      {
        cx: -D * Math.cos(Math.PI / 6),
        cy: D * Math.sin(Math.PI / 6),
      },
      {
        cx: D * Math.cos(Math.PI / 6),
        cy: D * Math.sin(Math.PI / 6),
      },
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
  { circles: fourCircles, dots: fourDots },
  { circles: sixCircles, dots: sixDots },
  { circles: [{ cx: 0, cy: 0 }, ...sixCircles], dots: sixDots },
];

const BG = "#121215";

// ================================================================
// TIMELINE — 30fps, 900 frames = 30 seconds, 2160x3600 portrait
// ================================================================
// 3 stacked Flower of Life instances with unique animation character
// Instance 0 (top,    y=900):  offset=0    — drift apart (D increases)
// Instance 1 (center, y=1800): offset=150  — counter-rotation
// Instance 2 (bottom, y=2700): offset=300  — reverse order rebuild
// ================================================================

type FlowerMode = "drift" | "counter-rotate" | "reverse";

const stageTimings = [
  { start: 0, drawDur: 40 },
  { start: 55, drawDur: 40 },
  { start: 115, drawDur: 40 },
  { start: 175, drawDur: 40 },
  { start: 240, drawDur: 45 },
  { start: 320, drawDur: 35 },
];

// Collect all unique circles/dots across stages for consistent indexing
const collectAll = () => {
  const allC: Circle[] = [];
  const allD: { cx: number; cy: number }[] = [];
  const kC = new Set<string>();
  const kD = new Set<string>();
  const key = (c: { cx: number; cy: number }) =>
    `${Math.round(c.cx * 10)},${Math.round(c.cy * 10)}`;

  const circleStageMap: number[] = [];
  const dotStageMap: number[] = [];

  for (let si = 0; si < STAGES.length; si++) {
    for (const c of STAGES[si].circles) {
      const ck = key(c);
      if (!kC.has(ck)) {
        kC.add(ck);
        allC.push(c);
        circleStageMap.push(si);
      }
    }
    for (const d of STAGES[si].dots) {
      const dk = key(d);
      if (!kD.has(dk)) {
        kD.add(dk);
        allD.push(d);
        dotStageMap.push(si);
      }
    }
  }
  return { allC, allD, circleStageMap, dotStageMap };
};

const { allC, allD, circleStageMap, dotStageMap } = collectAll();

const renderFlower = (
  frame: number,
  fps: number,
  offsetFrames: number,
  centerY: number,
  mode: FlowerMode,
) => {
  const f = frame - offsetFrames;
  if (f < -10) return null;

  const SCALE = 2.8;
  const totalCircles = allC.length;

  // Enter scale
  const enterScale = spring({
    frame: Math.max(0, f),
    fps,
    config: { damping: 20, stiffness: 60 },
    from: 0.7,
    to: 1,
  });

  // Exit opacity
  const exitOpacity =
    f >= 660
      ? interpolate(f, [660, 700], [1, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        })
      : f < 0
        ? 0
        : 1;

  if (exitOpacity <= 0) return null;

  // Mode-specific: drift increases D over time
  const driftFactor =
    mode === "drift" ? 1 + 0.4 * ease(progress(f, 380, 600)) : 1;

  // Compute circle draw order for reverse mode
  const getCircleOrder = (ci: number): number => {
    if (mode === "reverse") return totalCircles - 1 - ci;
    return ci;
  };

  const renderedCircles: React.ReactNode[] = [];
  const renderedDots: React.ReactNode[] = [];

  for (let ci = 0; ci < allC.length; ci++) {
    const orderIdx = getCircleOrder(ci);
    const si = circleStageMap[ci];
    const t = stageTimings[si];

    // Staggered draw based on order
    const stagger = orderIdx * 6;
    const drawP = ease(progress(f, t.start + stagger, t.start + stagger + t.drawDur));

    // Retract
    const retractStart = mode === "reverse" ? 480 + (totalCircles - 1 - orderIdx) * 4 : 580 + orderIdx * 4;
    const retractP = ease(progress(f, retractStart, retractStart + 55));
    const dp = Math.max(0, drawP - retractP);
    if (dp <= 0.01) continue;

    // Spring scale for birth
    const birthSpring = spring({
      frame: Math.max(0, f - (t.start + stagger)),
      fps,
      config: { damping: 10, stiffness: 80, overshootClamping: false },
    });
    const cScale = Math.min(birthSpring, 1) * dp;
    if (cScale <= 0.01) continue;

    // Position with drift
    let cx = allC[ci].cx * driftFactor;
    let cy = allC[ci].cy * driftFactor;

    // Counter-rotation: odd circles rotate CW, even CCW
    let rotation = 0;
    if (mode === "counter-rotate" && (cx !== 0 || cy !== 0)) {
      const speed = 0.4;
      const dir = ci % 2 === 0 ? 1 : -1;
      rotation = f * speed * dir;
    }

    // Dash offset rotation
    const dashShift = f * 0.3;

    renderedCircles.push(
      <g key={`c-${ci}`} transform={rotation !== 0 ? `rotate(${rotation}, ${cx}, ${cy})` : undefined}>
        <circle
          cx={cx}
          cy={cy}
          r={R * cScale}
          fill="white"
          fillOpacity={0.03}
          stroke="white"
          strokeWidth={0.8}
          strokeLinecap="round"
          strokeDasharray="2 4"
          strokeDashoffset={CIRC * (1 - dp) + dashShift}
          opacity={dp}
        />
      </g>,
    );
  }

  for (let di = 0; di < allD.length; di++) {
    const orderIdx = mode === "reverse" ? allD.length - 1 - di : di;
    const si = dotStageMap[di];
    const t = stageTimings[si];

    const stagger = orderIdx * 7;
    const sp = spring({
      frame: Math.max(0, f - (t.start + stagger + t.drawDur * 0.6)),
      fps,
      config: { damping: 8, stiffness: 120, overshootClamping: false },
    });
    const retractStart = mode === "reverse" ? 500 + (allD.length - 1 - orderIdx) * 5 : 600 + orderIdx * 5;
    const retractP = ease(progress(f, retractStart, retractStart + 45));
    const ds = Math.max(0, sp - retractP);
    if (ds <= 0.01) continue;

    let dx = allD[di].cx * driftFactor;
    let dy = allD[di].cy * driftFactor;

    renderedDots.push(
      <circle
        key={`d-${di}`}
        cx={dx}
        cy={dy}
        r={DOT_R}
        fill="white"
        transform={`translate(${dx},${dy}) scale(${ds}) translate(${-dx},${-dy})`}
        opacity={ds}
      />,
    );
  }

  if (renderedCircles.length === 0 && renderedDots.length === 0) return null;

  return (
    <g
      key={`inst-${centerY}`}
      transform={`translate(1080, ${centerY}) scale(${SCALE * enterScale})`}
      opacity={exitOpacity}
    >
      {renderedCircles}
      {renderedDots}
    </g>
  );
};

export const BloomV3: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const instances: { y: number; offset: number; mode: FlowerMode }[] = [
    { y: 900, offset: 0, mode: "drift" },
    { y: 1800, offset: 150, mode: "counter-rotate" },
    { y: 2700, offset: 300, mode: "reverse" },
  ];

  return (
    <AbsoluteFill style={{ backgroundColor: BG }}>
      <svg width="2160" height="3600" viewBox="0 0 2160 3600" fill="none">
        {instances.map((inst) =>
          renderFlower(frame, fps, inst.offset, inst.y, inst.mode),
        )}
      </svg>
    </AbsoluteFill>
  );
};
