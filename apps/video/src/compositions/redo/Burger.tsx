import React from "react";
import {
  useCurrentFrame,
  interpolate,
  AbsoluteFill,
  spring,
  useVideoConfig,
} from "remotion";
import {
  BG, GOLD, TOP_HALF, BOTTOM_HALF, WAVE_PATH,
  WAVE_Y, CLOSE_OFFSET, ease, progress,
} from "./burger-shared";

// ================================================================
// Burger V1 — Landscape 1920×1080, 600 frames (20s @ 30fps)
// ================================================================
// Full circle fades in → splits open in 3 stages as waves draw on →
// holds with subtle breathing → reverses: waves draw off, gap closes →
// fade out. Waves extend beyond the circle halves (wider than sun disk).
// ================================================================

// Wave draw order: center first, then top, then bottom
const WAVE_ORDER = [1, 0, 2]; // indices into WAVE_Y: 160, 137, 183

export const Burger: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // ---- Intro ----
  const introScale = spring({
    frame, fps,
    config: { damping: 18, stiffness: 60 },
    from: 0.6, to: 1,
  });
  const introOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });

  // ---- Gap: 0 = closed circle, 1 = original SVG positions ----
  const gapOpen = ease(progress(frame, 25, 240));
  const gapClose = ease(progress(frame, 380, 555));
  const gap = gapOpen * (1 - gapClose);

  // Half translations: at gap=0, halves overlap at center; at gap=1, original positions
  const topY = CLOSE_OFFSET * (1 - gap);
  const botY = -CLOSE_OFFSET * (1 - gap);

  // ---- Breathing during hold ----
  const breathe = (frame >= 250 && frame < 380)
    ? Math.sin((frame - 250) * 0.05) * 2.5 * gap
    : 0;

  // ---- Wave draw-on (strokeDashoffset via pathLength=1) ----
  const waveOn = [
    ease(progress(frame, 45, 100)),   // wave 0 (center, y=160)
    ease(progress(frame, 120, 180)),  // wave 1 (top, y=137)
    ease(progress(frame, 190, 250)),  // wave 2 (bottom, y=183)
  ];
  const waveOff = [
    ease(progress(frame, 500, 550)),  // center last to leave
    ease(progress(frame, 430, 480)),  // top
    ease(progress(frame, 380, 430)),  // bottom first to leave
  ];

  // ---- Wave undulation during hold ----
  const waveShiftX = (i: number): number => {
    if (frame < 250 || frame >= 380) return 0;
    return Math.sin((frame - 250) * 0.04 + i * 1.1) * 3;
  };
  const waveOscY = (i: number): number => {
    if (frame < 250 || frame >= 380) return 0;
    return Math.sin((frame - 250) * 0.035 + i * 1.5) * 1.5;
  };

  // ---- Outro ----
  const outroScale = frame >= 560
    ? interpolate(frame, [560, 600], [1, 0.6], {
        extrapolateLeft: "clamp", extrapolateRight: "clamp",
        easing: (t: number) => t * t,
      })
    : 1;
  const outroOpacity = frame >= 575
    ? interpolate(frame, [575, 600], [1, 0], {
        extrapolateLeft: "clamp", extrapolateRight: "clamp",
      })
    : 1;

  const compositeScale = 2.8 * introScale * outroScale;
  const compositeOpacity = introOpacity * outroOpacity;

  return (
    <AbsoluteFill style={{ backgroundColor: BG }}>
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: `translate(-50%, -50%) scale(${compositeScale})`,
          opacity: compositeOpacity,
        }}
      >
        <svg
          width="320"
          height="320"
          viewBox="0 0 320 320"
          fill="none"
          style={{ overflow: "visible" }}
        >
          {/* Top half — slides up as gap opens */}
          <g transform={`translate(0, ${topY - breathe})`}>
            <path d={TOP_HALF} fill={GOLD} />
          </g>

          {/* 3 wave rows — draw on/off with strokeDashoffset */}
          {WAVE_ORDER.map((waveIdx, i) => {
            const on = waveOn[i];
            const off = waveOff[i];
            const drawn = Math.max(0, on - off);
            if (drawn <= 0.001) return null;

            const originalY = WAVE_Y[waveIdx];
            // Wave Y tracks the gap: at gap=0 all at center, at gap=1 at original positions
            const adjustedY = 160 + (originalY - 160) * gap;
            const sx = waveShiftX(i);
            const oy = waveOscY(i);

            return (
              <path
                key={`wave-${waveIdx}`}
                d={WAVE_PATH}
                fill="none"
                stroke={GOLD}
                strokeWidth={4}
                strokeLinecap="round"
                pathLength={1}
                strokeDasharray={1}
                strokeDashoffset={1 - drawn}
                transform={`translate(${sx}, ${adjustedY + oy})`}
              />
            );
          })}

          {/* Bottom half — slides down as gap opens */}
          <g transform={`translate(0, ${botY + breathe})`}>
            <path d={BOTTOM_HALF} fill={GOLD} />
          </g>
        </svg>
      </div>
    </AbsoluteFill>
  );
};
