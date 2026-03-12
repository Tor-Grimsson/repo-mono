import React from "react";
import { useCurrentFrame, AbsoluteFill, spring, useVideoConfig } from "remotion";
import {
  ease, progress, BG, PINK,
  COLS, ROWS, ROW_DY, COL_CX, ROW0_CY, ROW0_PATHS,
  SVG_VB_W, SVG_VB_H, CLIP_X, CLIP_Y, CLIP_W, CLIP_H, CLIP_RX,
} from "./flikc-shared";

// ================================================================
// V2: Radial burst from center — 450 frames, 30fps (15s)
// Chevrons scale in from 0 staggered by distance from center.
// Spring physics. Once all visible, a color intensity ripple
// travels outward, then everything fades.
// ================================================================
const CENTER_X = SVG_VB_W / 2;
const CENTER_Y = SVG_VB_H / 2;

export const FlikCV2: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const fadeOut = 1 - ease(progress(frame, 410, 450));

  const chevrons: React.ReactElement[] = [];
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      const [arm1, arm2] = ROW0_PATHS[col];
      const cx = COL_CX[col];
      const cy = ROW0_CY;
      const dy = row * ROW_DY;

      // Distance from center of grid
      const dx = cx - CENTER_X;
      const ddy = (cy + dy) - CENTER_Y;
      const dist = Math.sqrt(dx * dx + ddy * ddy);
      const maxDist = 900; // approximate max distance

      // Staggered scale-in: closer chevrons appear first
      const staggerDelay = (dist / maxDist) * 60; // 0-60 frames delay
      const scaleIn = spring({
        frame: Math.max(0, frame - 20 - staggerDelay),
        fps,
        config: { damping: 12, stiffness: 80, mass: 0.8 },
      });

      // Color intensity ripple (frames 180-350)
      const rippleTime = frame - 180;
      const rippleSpeed = 8; // pixels per frame
      const rippleDist = rippleTime * rippleSpeed;
      const rippleDelta = Math.abs(dist - rippleDist);
      const rippleWidth = 120;
      const rippleIntensity = rippleTime > 0
        ? Math.max(0, 1 - rippleDelta / rippleWidth)
        : 0;

      // Second ripple
      const ripple2Time = frame - 280;
      const ripple2Dist = ripple2Time * rippleSpeed;
      const ripple2Delta = Math.abs(dist - ripple2Dist);
      const ripple2Intensity = ripple2Time > 0
        ? Math.max(0, 1 - ripple2Delta / rippleWidth) * 0.6
        : 0;

      const brightBoost = Math.max(rippleIntensity, ripple2Intensity);
      // Brighten: interpolate from PINK to white
      const r = 0xEE + Math.round((0xFF - 0xEE) * brightBoost);
      const g = 0x79 + Math.round((0xFF - 0x79) * brightBoost * 0.5);
      const b = 0x9C + Math.round((0xFF - 0x9C) * brightBoost * 0.3);
      const color = `rgb(${r}, ${g}, ${b})`;

      const finalScale = scaleIn * fadeOut;
      if (finalScale < 0.001) continue;

      chevrons.push(
        <g key={`${row}-${col}`}>
          <g transform={`translate(${cx}, ${cy + dy}) scale(${finalScale}) translate(${-cx}, ${-cy})`}>
            <path d={arm1} fill={color} />
            <path d={arm2} fill={color} />
          </g>
        </g>
      );
    }
  }

  return (
    <AbsoluteFill style={{ backgroundColor: BG }}>
      <svg width="1920" height="1080" viewBox={`0 0 ${SVG_VB_W} ${SVG_VB_H}`} preserveAspectRatio="xMidYMid meet" fill="none" style={{ width: "100%", height: "100%" }}>
        <defs>
          <clipPath id="v2-clip">
            <rect x={CLIP_X} y={CLIP_Y} width={CLIP_W} height={CLIP_H} rx={CLIP_RX} />
          </clipPath>
        </defs>
        <g clipPath="url(#v2-clip)">{chevrons}</g>
      </svg>
    </AbsoluteFill>
  );
};
