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

const fourAngles = [90, 0, 270, 180]; // top, right, bottom, left

const BG = "#121215";

// ================================================================
// TIMELINE — 30fps, 450 frames = 15 seconds, 1080x1080 square
// ================================================================
// Focused on the 4-circle cross formation with breathing pulse
//   0-60:    4 circles draw on from cardinal points
//  60-90:    Dots pop in with spring
//  90-350:   Breathing — scale oscillates per circle, radius oscillates D+-4
// 350-400:   Circles retract strokes
// 400-450:   Scale down + fade
// ================================================================

export const BloomV4: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const SCALE = 3.0;
  const DRAW_DUR = 50; // frames per circle draw-on

  // ---- Per-circle breathing parameters ----
  const breatheScale = (index: number): number => {
    if (frame < 90 || frame > 350) return 1;
    const t = frame - 90;
    // Each circle has a different phase offset for jellyfish effect
    const phase = (index * Math.PI) / 2;
    return 0.95 + 0.1 * (0.5 + 0.5 * Math.sin(t * 0.045 + phase));
  };

  const breatheD = (index: number): number => {
    if (frame < 90 || frame > 350) return D;
    const t = frame - 90;
    // Radius oscillation D +/- 4, different phase per circle
    const phase = (index * Math.PI) / 2 + Math.PI / 4;
    return D + 4 * Math.sin(t * 0.035 + phase);
  };

  // ---- Circle draw/retract ----
  const circleProgress = fourAngles.map((_, i) => {
    const stagger = i * 10;
    const drawP = ease(progress(frame, stagger, stagger + DRAW_DUR));

    // Spring birth scale
    const birthSpring = spring({
      frame: Math.max(0, frame - stagger),
      fps,
      config: { damping: 10, stiffness: 80, overshootClamping: false },
    });

    const retractP = ease(progress(frame, 350 + i * 8, 350 + i * 8 + 40));
    const dp = Math.max(0, drawP - retractP);
    const cScale = Math.min(birthSpring, 1);
    return { dp, cScale };
  });

  // ---- Dot animation ----
  const dotScales = fourAngles.map((_, i) => {
    const stagger = i * 8;
    const sp = spring({
      frame: Math.max(0, frame - (60 + stagger)),
      fps,
      config: { damping: 8, stiffness: 120, overshootClamping: false },
    });
    const retractP = ease(progress(frame, 360 + i * 6, 360 + i * 6 + 35));
    return Math.max(0, sp - retractP);
  });

  // ---- Overall enter/exit ----
  const enterScale = spring({
    frame,
    fps,
    config: { damping: 18, stiffness: 60 },
    from: 0.6,
    to: 1,
  });

  const exitScale =
    frame >= 400
      ? interpolate(frame, [400, 450], [1, 0.7], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        })
      : 1;

  const exitOpacity =
    frame >= 400
      ? interpolate(frame, [400, 450], [1, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        })
      : 1;

  // Dash offset rotation
  const dashShift = frame * 0.3;

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
          {fourAngles.map((a, i) => {
            const { dp, cScale } = circleProgress[i];
            if (dp <= 0.01) return null;

            const currentD = breatheD(i);
            const bScale = breatheScale(i);
            const rad = (a * Math.PI) / 180;
            const cx = currentD * Math.cos(rad);
            const cy = -currentD * Math.sin(rad);
            const finalR = R * Math.min(cScale, 1) * bScale;

            return (
              <circle
                key={`c-${i}`}
                cx={cx}
                cy={cy}
                r={finalR}
                fill="white"
                fillOpacity={0.03}
                stroke="white"
                strokeWidth={0.8}
                strokeLinecap="round"
                strokeDasharray="2 4"
                strokeDashoffset={CIRC * (1 - dp) + dashShift}
                opacity={dp}
              />
            );
          })}

          {fourAngles.map((a, i) => {
            const ds = dotScales[i];
            if (ds <= 0.01) return null;

            const currentD = breatheD(i);
            const rad = (a * Math.PI) / 180;
            const dx = (currentD + R + DOT_R) * Math.cos(rad);
            const dy = -(currentD + R + DOT_R) * Math.sin(rad);

            return (
              <circle
                key={`d-${i}`}
                cx={dx}
                cy={dy}
                r={DOT_R}
                fill="white"
                transform={`translate(${dx},${dy}) scale(${ds}) translate(${-dx},${-dy})`}
                opacity={ds}
              />
            );
          })}
        </svg>
      </div>
    </AbsoluteFill>
  );
};
