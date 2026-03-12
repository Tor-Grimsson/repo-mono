import React from "react";
import { useCurrentFrame, AbsoluteFill, spring, useVideoConfig } from "remotion";
import {
  ease, progress, BG, PINK, CHEV_ARM1, CHEV_ARM2,
} from "./flikc-shared";

// ================================================================
// V2 Portrait: Radial burst — 2160x3600, 450 frames, 30fps
// ================================================================

const W = 2160;
const H = 3600;
const P_COLS = 5;
const P_ROWS = 10;
const MARGIN_X = 180;
const MARGIN_Y = 200;
const SPACING_X = (W - 2 * MARGIN_X) / (P_COLS - 1);
const SPACING_Y = (H - 2 * MARGIN_Y) / (P_ROWS - 1);
const CHEV_SCALE = 0.72;
const CENTER_X = W / 2;
const CENTER_Y = H / 2;

export const FlikCV2_P: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const fadeOut = 1 - ease(progress(frame, 410, 450));

  const chevrons: React.ReactElement[] = [];
  for (let row = 0; row < P_ROWS; row++) {
    for (let col = 0; col < P_COLS; col++) {
      const cx = MARGIN_X + col * SPACING_X;
      const cy = MARGIN_Y + row * SPACING_Y;
      const isTypeB = col % 2 === 1;
      const baseScaleX = isTypeB ? -1 : 1;

      const dx = cx - CENTER_X;
      const dy = cy - CENTER_Y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const maxDist = 1900;

      const staggerDelay = (dist / maxDist) * 80;
      const scaleIn = spring({
        frame: Math.max(0, frame - 20 - staggerDelay),
        fps,
        config: { damping: 12, stiffness: 80, mass: 0.8 },
      });

      // Color intensity ripple
      const rippleTime = frame - 180;
      const rippleSpeed = 12;
      const rippleDist = rippleTime * rippleSpeed;
      const rippleDelta = Math.abs(dist - rippleDist);
      const rippleWidth = 150;
      const rippleIntensity = rippleTime > 0 ? Math.max(0, 1 - rippleDelta / rippleWidth) : 0;

      const ripple2Time = frame - 280;
      const ripple2Dist = ripple2Time * rippleSpeed;
      const ripple2Delta = Math.abs(dist - ripple2Dist);
      const ripple2Intensity = ripple2Time > 0 ? Math.max(0, 1 - ripple2Delta / rippleWidth) * 0.6 : 0;

      const brightBoost = Math.max(rippleIntensity, ripple2Intensity);
      const r = 0xEE + Math.round((0xFF - 0xEE) * brightBoost);
      const g = 0x79 + Math.round((0xFF - 0x79) * brightBoost * 0.5);
      const b = 0x9C + Math.round((0xFF - 0x9C) * brightBoost * 0.3);
      const color = `rgb(${r}, ${g}, ${b})`;

      const finalScale = scaleIn * fadeOut * CHEV_SCALE;
      if (finalScale < 0.001) continue;

      chevrons.push(
        <g key={`${row}-${col}`} transform={`translate(${cx}, ${cy}) scale(${finalScale * baseScaleX}, ${finalScale})`}>
          <path d={CHEV_ARM1} fill={color} />
          <path d={CHEV_ARM2} fill={color} />
        </g>
      );
    }
  }

  return (
    <AbsoluteFill style={{ backgroundColor: BG }}>
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} fill="none" style={{ width: "100%", height: "100%" }}>
        <defs>
          <clipPath id="v2p-clip">
            <rect x="100" y="100" width={W - 200} height={H - 200} rx="20" />
          </clipPath>
        </defs>
        <g clipPath="url(#v2p-clip)">{chevrons}</g>
      </svg>
    </AbsoluteFill>
  );
};
