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
const DOT_R = 8;
const D = 48;
const CIRC = 2 * Math.PI * R;

// Design: dark bg, white stroke-only, no fills
const BG = "#121215";
const STROKE = "rgba(255,255,255,0.7)";
const STROKE_W = 0.6;
const DASH = "2 4";

// 7-circle flower: center + 6 petals
const petalAngles = [90, 30, 330, 270, 210, 150];
const FLOWER_CIRCLES: { cx: number; cy: number }[] = [
  { cx: 0, cy: 0 },
  ...petalAngles.map((a) => ({
    cx: D * Math.cos((a * Math.PI) / 180),
    cy: -D * Math.sin((a * Math.PI) / 180),
  })),
];

const FLOWER_DOTS: { cx: number; cy: number }[] = petalAngles.map((a) => ({
  cx: (D + R + DOT_R) * Math.cos((a * Math.PI) / 180),
  cy: -(D + R + DOT_R) * Math.sin((a * Math.PI) / 180),
}));

// Instance Y centers (in the 2160x3600 viewport)
const INSTANCE_Y = [900, 1800, 2700];
const SCALE = 2.5;

// ================================================================
// TIMELINE — 30fps, 900 frames = 30 seconds, 2160x3600 portrait
// ================================================================
// 3 stacked instances, each with DIFFERENT characteristic animation:
//
// TOP (offset 0):     PULSE — circles appear quickly, then each independently
//                     pulses radius R +/- 8 with sine waves at different phases
//
// CENTER (offset 200): ORBIT — circles draw on, then slowly orbit around center
//                      (each circle's angle increases by 0.3 deg/frame)
//
// BOTTOM (offset 400): WAVE — circles draw on, then a scale wave (1.0->1.15->1.0)
//                      propagates through them in sequence like a ripple
//
// Each has its own exit animation (reverse of characteristic motion)
// ================================================================

// --- PULSE INSTANCE (top) ---
const renderPulseInstance = (frame: number, fps: number, offset: number) => {
  const f = frame - offset;

  // Quick draw-on: all 7 circles in 120 frames
  const circles = FLOWER_CIRCLES.map((c, i) => {
    const stagger = i * 12;
    const drawP = ease(progress(f, stagger, stagger + 70));

    // Exit: reverse pulse then fade
    const exitP = ease(progress(f, 700, 800));
    const finalDraw = Math.max(0, drawP - exitP);
    if (finalDraw <= 0.001) return null;

    // Pulse: sine wave with unique phase per circle
    const pulseActive = f > 120 && f < 700;
    const pulseAmount = pulseActive
      ? Math.sin((f - 120) * 0.04 + i * 1.2) * 8
      : 0;
    const currentR = R + pulseAmount * finalDraw;

    // Gentle dash drift
    const dashDrift = f > stagger + 70 ? (f - stagger - 70) * 0.08 : 0;

    return (
      <circle
        key={`pc-${i}`}
        cx={c.cx}
        cy={c.cy}
        r={Math.max(0, currentR)}
        fill="none"
        stroke={STROKE}
        strokeWidth={STROKE_W}
        strokeLinecap="round"
        strokeDasharray={DASH}
        strokeDashoffset={CIRC * (1 - finalDraw) + dashDrift}
        opacity={finalDraw}
      />
    );
  });

  // Dots
  const dots = FLOWER_DOTS.map((d, i) => {
    const dotStart = 100 + i * 15;
    const sp = spring({
      frame: Math.max(0, f - dotStart),
      fps,
      config: { damping: 14, stiffness: 80 },
    });
    const exitP = ease(progress(f, 720 + i * 10, 800));
    const finalScale = Math.max(0, sp - exitP);
    if (finalScale <= 0.01) return null;

    // Dots also pulse slightly
    const pulseActive = f > 140 && f < 700;
    const dotPulse = pulseActive
      ? 1 + Math.sin((f - 140) * 0.05 + i * 1.5) * 0.15
      : 1;

    return (
      <circle
        key={`pd-${i}`}
        cx={d.cx}
        cy={d.cy}
        r={DOT_R}
        fill="white"
        fillOpacity={0.5 * finalScale}
        transform={`translate(${d.cx},${d.cy}) scale(${finalScale * dotPulse}) translate(${-d.cx},${-d.cy})`}
      />
    );
  });

  const enterScale = spring({
    frame: Math.max(0, f),
    fps,
    config: { damping: 22, stiffness: 50 },
    from: 0.85,
    to: 1,
  });

  const exitOpacity = interpolate(f, [780, 850], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const visible = f > -10 && exitOpacity > 0;
  if (!visible) return null;

  return (
    <g
      key="pulse"
      transform={`translate(1080, ${INSTANCE_Y[0]}) scale(${SCALE * enterScale})`}
      opacity={Math.max(0, exitOpacity)}
    >
      {circles}
      {dots}
    </g>
  );
};

// --- ORBIT INSTANCE (center) ---
const renderOrbitInstance = (frame: number, fps: number, offset: number) => {
  const f = frame - offset;

  // Draw on over 150 frames
  const circles = FLOWER_CIRCLES.map((c, i) => {
    const stagger = i * 15;
    const drawP = ease(progress(f, stagger, stagger + 80));

    // Exit: reverse orbit (speed up rotation then fade)
    const exitP = ease(progress(f, 550, 680));
    const finalDraw = Math.max(0, drawP - exitP);
    if (finalDraw <= 0.001) return null;

    // Orbit: each circle (except center) rotates around origin
    let cx = c.cx;
    let cy = c.cy;
    if (i > 0 && f > 120) {
      const orbitProgress = Math.min(1, (f - 120) / 60); // ease into orbit
      const angle = (f - 120) * 0.3 * orbitProgress; // 0.3 deg/frame
      const angleRad = (angle * Math.PI) / 180;
      const dist = Math.sqrt(c.cx * c.cx + c.cy * c.cy);
      const baseAngle = Math.atan2(c.cy, c.cx);
      cx = dist * Math.cos(baseAngle + angleRad);
      cy = dist * Math.sin(baseAngle + angleRad);
    }

    const dashDrift = f > stagger + 80 ? (f - stagger - 80) * 0.1 : 0;

    return (
      <circle
        key={`oc-${i}`}
        cx={cx}
        cy={cy}
        r={R}
        fill="none"
        stroke={STROKE}
        strokeWidth={STROKE_W}
        strokeLinecap="round"
        strokeDasharray={DASH}
        strokeDashoffset={CIRC * (1 - finalDraw) + dashDrift}
        opacity={finalDraw}
      />
    );
  });

  // Dots orbit too
  const dots = FLOWER_DOTS.map((d, i) => {
    const dotStart = 130 + i * 18;
    const sp = spring({
      frame: Math.max(0, f - dotStart),
      fps,
      config: { damping: 14, stiffness: 80 },
    });
    const exitP = ease(progress(f, 570 + i * 10, 660));
    const finalScale = Math.max(0, sp - exitP);
    if (finalScale <= 0.01) return null;

    let cx = d.cx;
    let cy = d.cy;
    if (f > 120) {
      const orbitProgress = Math.min(1, (f - 120) / 60);
      const angle = (f - 120) * 0.3 * orbitProgress;
      const angleRad = (angle * Math.PI) / 180;
      const dist = Math.sqrt(d.cx * d.cx + d.cy * d.cy);
      const baseAngle = Math.atan2(d.cy, d.cx);
      cx = dist * Math.cos(baseAngle + angleRad);
      cy = dist * Math.sin(baseAngle + angleRad);
    }

    return (
      <circle
        key={`od-${i}`}
        cx={cx}
        cy={cy}
        r={DOT_R}
        fill="white"
        fillOpacity={0.5 * finalScale}
        transform={`translate(${cx},${cy}) scale(${finalScale}) translate(${-cx},${-cy})`}
      />
    );
  });

  const enterScale = spring({
    frame: Math.max(0, f),
    fps,
    config: { damping: 22, stiffness: 50 },
    from: 0.85,
    to: 1,
  });

  const exitOpacity = interpolate(f, [650, 700], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const visible = f > -10 && exitOpacity > 0;
  if (!visible) return null;

  return (
    <g
      key="orbit"
      transform={`translate(1080, ${INSTANCE_Y[1]}) scale(${SCALE * enterScale})`}
      opacity={Math.max(0, exitOpacity)}
    >
      {circles}
      {dots}
    </g>
  );
};

// --- WAVE INSTANCE (bottom) ---
const renderWaveInstance = (frame: number, fps: number, offset: number) => {
  const f = frame - offset;

  // Draw on over 150 frames
  const circles = FLOWER_CIRCLES.map((c, i) => {
    const stagger = i * 15;
    const drawP = ease(progress(f, stagger, stagger + 80));

    // Exit: wave reverses (scale down in sequence)
    const exitStart = 380 + i * 18;
    const exitP = ease(progress(f, exitStart, exitStart + 70));
    const finalDraw = Math.max(0, drawP - exitP);
    if (finalDraw <= 0.001) return null;

    // Wave: scale ripple propagates through circles in sequence
    let waveScale = 1;
    if (f > 140 && f < 400) {
      // Wave period ~120 frames, propagates with i*20 frame delay
      const waveT = f - 140 - i * 20;
      if (waveT > 0) {
        // Repeating wave
        const cycle = (waveT % 120) / 120;
        waveScale = 1 + Math.sin(cycle * Math.PI * 2) * 0.15;
      }
    }

    const dashDrift = f > stagger + 80 ? (f - stagger - 80) * 0.06 : 0;

    return (
      <circle
        key={`wc-${i}`}
        cx={c.cx}
        cy={c.cy}
        r={R * waveScale}
        fill="none"
        stroke={STROKE}
        strokeWidth={STROKE_W}
        strokeLinecap="round"
        strokeDasharray={DASH}
        strokeDashoffset={CIRC * (1 - finalDraw) + dashDrift}
        opacity={finalDraw}
      />
    );
  });

  // Dots with wave
  const dots = FLOWER_DOTS.map((d, i) => {
    const dotStart = 120 + i * 18;
    const sp = spring({
      frame: Math.max(0, f - dotStart),
      fps,
      config: { damping: 14, stiffness: 80 },
    });
    const exitP = ease(progress(f, 400 + i * 15, 470));
    const finalScale = Math.max(0, sp - exitP);
    if (finalScale <= 0.01) return null;

    // Dots also participate in wave
    let dotWave = 1;
    if (f > 160 && f < 400) {
      const waveT = f - 160 - i * 22;
      if (waveT > 0) {
        const cycle = (waveT % 120) / 120;
        dotWave = 1 + Math.sin(cycle * Math.PI * 2) * 0.2;
      }
    }

    return (
      <circle
        key={`wd-${i}`}
        cx={d.cx}
        cy={d.cy}
        r={DOT_R}
        fill="white"
        fillOpacity={0.5 * finalScale}
        transform={`translate(${d.cx},${d.cy}) scale(${finalScale * dotWave}) translate(${-d.cx},${-d.cy})`}
      />
    );
  });

  const enterScale = spring({
    frame: Math.max(0, f),
    fps,
    config: { damping: 22, stiffness: 50 },
    from: 0.85,
    to: 1,
  });

  const exitOpacity = interpolate(f, [450, 500], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const visible = f > -10 && exitOpacity > 0;
  if (!visible) return null;

  return (
    <g
      key="wave"
      transform={`translate(1080, ${INSTANCE_Y[2]}) scale(${SCALE * enterScale})`}
      opacity={Math.max(0, exitOpacity)}
    >
      {circles}
      {dots}
    </g>
  );
};

// ================================================================
// Main component
// ================================================================

export const FlowersV3: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill style={{ backgroundColor: BG }}>
      <svg
        width="2160"
        height="3600"
        viewBox="0 0 2160 3600"
        fill="none"
      >
        {renderPulseInstance(frame, fps, 0)}
        {renderOrbitInstance(frame, fps, 200)}
        {renderWaveInstance(frame, fps, 400)}
      </svg>
    </AbsoluteFill>
  );
};
