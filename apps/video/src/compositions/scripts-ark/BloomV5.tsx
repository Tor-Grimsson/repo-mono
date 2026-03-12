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

// ================================================================
// TIMELINE — 30fps, 900 frames = 30 seconds, 3840x2160 (4K)
// ================================================================
// Two flowers side by side with MIRRORED animation:
//   Left  (x=1280): normal evolution 0->6 stages
//   Right (x=2560): REVERSE evolution, starts at stage 6, peels to 0
// They cross paths around frame 450
// ================================================================

const stageTimings = [
  { start: 0, drawDur: 40 },
  { start: 55, drawDur: 40 },
  { start: 115, drawDur: 40 },
  { start: 180, drawDur: 45 },
  { start: 250, drawDur: 50 },
  { start: 340, drawDur: 40 },
  { start: 410, drawDur: 55 },
];

// Collect unique circles and dots with stage mapping
const collectAll = () => {
  const allC: Circle[] = [];
  const allD: { cx: number; cy: number }[] = [];
  const kC = new Set<string>();
  const kD = new Set<string>();
  const key = (c: { cx: number; cy: number }) =>
    `${Math.round(c.cx * 10)},${Math.round(c.cy * 10)}`;

  const circleStageMap: number[] = [];
  const dotStageMap: number[] = [];
  const circleIndexInStage: number[] = [];
  const dotIndexInStage: number[] = [];

  for (let si = 0; si < STAGES.length; si++) {
    STAGES[si].circles.forEach((c, ci) => {
      const ck = key(c);
      if (!kC.has(ck)) {
        kC.add(ck);
        allC.push(c);
        circleStageMap.push(si);
        circleIndexInStage.push(ci);
      }
    });
    STAGES[si].dots.forEach((d, di) => {
      const dk = key(d);
      if (!kD.has(dk)) {
        kD.add(dk);
        allD.push(d);
        dotStageMap.push(si);
        dotIndexInStage.push(di);
      }
    });
  }
  return { allC, allD, circleStageMap, dotStageMap, circleIndexInStage, dotIndexInStage };
};

const { allC, allD, circleStageMap, dotStageMap, circleIndexInStage, dotIndexInStage } =
  collectAll();

const renderFlower = (
  frame: number,
  fps: number,
  offsetFrames: number,
  translateX: number,
  reverse: boolean,
) => {
  const f = frame - offsetFrames;

  const SCALE = 3.5;
  const totalC = allC.length;
  const totalD = allD.length;

  // Enter
  const enterSpring = spring({
    frame: Math.max(0, f),
    fps,
    config: { damping: 20, stiffness: 60 },
    from: 0.7,
    to: 1,
  });

  // Exit opacity
  const exitOpacity =
    f >= 820
      ? interpolate(f, [820, 860], [1, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        })
      : f < 0
        ? 0
        : 1;

  // Enter opacity (fade in)
  const enterOpacity =
    f < 0
      ? 0
      : f < 20
        ? interpolate(f, [0, 20], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })
        : 1;

  const opacity = enterOpacity * exitOpacity;
  if (opacity <= 0) return null;

  const dashShift = frame * 0.3;

  const renderedCircles: React.ReactNode[] = [];
  const renderedDots: React.ReactNode[] = [];

  for (let ci = 0; ci < totalC; ci++) {
    const si = circleStageMap[ci];
    const ciInStage = circleIndexInStage[ci];
    const t = stageTimings[si];

    let dp: number;
    if (reverse) {
      // Reverse: start fully drawn, peel away starting from last stage
      const reverseOrder = totalC - 1 - ci;
      const stagger = reverseOrder * 5;
      // Start fully visible, then retract
      const holdEnd = 60 + stagger;
      const retractDur = 45;
      const retractP = ease(progress(f, holdEnd, holdEnd + retractDur));
      dp = 1 - retractP;
    } else {
      // Normal forward draw
      const stagger = ciInStage * 5;
      const drawP = ease(progress(f, t.start + stagger, t.start + stagger + t.drawDur));
      const retractP = ease(progress(f, 750 + ci * 3, 750 + ci * 3 + 55));
      dp = Math.max(0, drawP - retractP);
    }

    if (dp <= 0.01) continue;

    // Spring birth scale (forward only; reverse starts at scale 1)
    let cScale = 1;
    if (!reverse) {
      const stagger = ciInStage * 5;
      const birthSpring = spring({
        frame: Math.max(0, f - (t.start + stagger)),
        fps,
        config: { damping: 10, stiffness: 80, overshootClamping: false },
      });
      cScale = Math.min(birthSpring, 1);
    } else {
      // Reverse: shrink on exit
      cScale = dp;
    }

    if (cScale <= 0.01) continue;

    const cx = allC[ci].cx;
    const cy = allC[ci].cy;

    renderedCircles.push(
      <circle
        key={`c-${ci}`}
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
      />,
    );
  }

  for (let di = 0; di < totalD; di++) {
    const si = dotStageMap[di];
    const diInStage = dotIndexInStage[di];
    const t = stageTimings[si];

    let ds: number;
    if (reverse) {
      const reverseOrder = totalD - 1 - di;
      const stagger = reverseOrder * 6;
      const holdEnd = 80 + stagger;
      const retractP = ease(progress(f, holdEnd, holdEnd + 40));
      ds = 1 - retractP;
    } else {
      const stagger = diInStage * 6;
      const sp = spring({
        frame: Math.max(0, f - (t.start + stagger + t.drawDur * 0.6)),
        fps,
        config: { damping: 8, stiffness: 120, overshootClamping: false },
      });
      const retractP = ease(progress(f, 770 + di * 4, 770 + di * 4 + 45));
      ds = Math.max(0, sp - retractP);
    }

    if (ds <= 0.01) continue;

    const dx = allD[di].cx;
    const dy = allD[di].cy;

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
      key={`flower-${translateX}`}
      transform={`translate(${translateX}, 1080) scale(${SCALE * enterSpring})`}
      opacity={opacity}
    >
      {renderedCircles}
      {renderedDots}
    </g>
  );
};

export const BloomV5: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill style={{ backgroundColor: BG }}>
      <svg width="3840" height="2160" viewBox="0 0 3840 2160" fill="none">
        {/* Left flower: normal forward evolution */}
        {renderFlower(frame, fps, 0, 1280, false)}
        {/* Right flower: reverse evolution, starts fully drawn */}
        {renderFlower(frame, fps, 60, 2560, true)}
      </svg>
    </AbsoluteFill>
  );
};
