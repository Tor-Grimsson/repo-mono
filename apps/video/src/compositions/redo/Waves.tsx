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
// Waves V1 — Standalone sun+waves, 1920×1080, 450 frames (15s @ 30fps)
// ================================================================
// Shorter, punchier. Circle opens faster. All 3 waves draw on quickly.
// Longer hold with pronounced undulation. Quick retract and close.
// ================================================================

const WAVE_ORDER = [1, 0, 2];

export const Waves: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // ---- Intro ----
  const introScale = spring({
    frame, fps,
    config: { damping: 16, stiffness: 55 },
    from: 0.5, to: 1,
  });
  const introOpacity = interpolate(frame, [0, 18], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });

  // ---- Gap ----
  const gapOpen = ease(progress(frame, 20, 140));
  const gapClose = ease(progress(frame, 340, 420));
  const gap = gapOpen * (1 - gapClose);

  const topY = CLOSE_OFFSET * (1 - gap);
  const botY = -CLOSE_OFFSET * (1 - gap);

  // ---- Breathing: gentle gap pulse ----
  const breathe = (frame >= 150 && frame < 340)
    ? Math.sin((frame - 150) * 0.045) * 2 * gap
    : 0;

  // ---- Wave draw-on (faster than Burger) ----
  const waveOn = [
    ease(progress(frame, 40, 80)),
    ease(progress(frame, 70, 115)),
    ease(progress(frame, 100, 145)),
  ];
  const waveOff = [
    ease(progress(frame, 390, 420)),
    ease(progress(frame, 360, 390)),
    ease(progress(frame, 330, 360)),
  ];

  // ---- Undulation: more pronounced horizontal + vertical drift ----
  const waveShiftX = (i: number): number => {
    if (frame < 150 || frame >= 340) return 0;
    const t = (frame - 150) * 0.035;
    return Math.sin(t + i * 0.9) * 5;
  };
  const waveOscY = (i: number): number => {
    if (frame < 150 || frame >= 340) return 0;
    const t = (frame - 150) * 0.04;
    return Math.sin(t + i * 1.5 + 0.5) * 2;
  };

  // ---- Subtle scale pulse during hold ----
  const pulse = (frame >= 150 && frame < 340)
    ? 1 + Math.sin((frame - 150) * 0.03) * 0.012
    : 1;

  // ---- Outro ----
  const outroScale = frame >= 420
    ? interpolate(frame, [420, 450], [1, 0.5], {
        extrapolateLeft: "clamp", extrapolateRight: "clamp",
        easing: (t: number) => t * t,
      })
    : 1;
  const outroOpacity = frame >= 432
    ? interpolate(frame, [432, 450], [1, 0], {
        extrapolateLeft: "clamp", extrapolateRight: "clamp",
      })
    : 1;

  const compositeScale = 2.8 * introScale * outroScale * pulse;
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
          <g transform={`translate(0, ${topY - breathe})`}>
            <path d={TOP_HALF} fill={GOLD} />
          </g>

          {WAVE_ORDER.map((waveIdx, i) => {
            const on = waveOn[i];
            const off = waveOff[i];
            const drawn = Math.max(0, on - off);
            if (drawn <= 0.001) return null;
            const adjustedY = 160 + (WAVE_Y[waveIdx] - 160) * gap;
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
                transform={`translate(${waveShiftX(i)}, ${adjustedY + waveOscY(i)})`}
              />
            );
          })}

          <g transform={`translate(0, ${botY + breathe})`}>
            <path d={BOTTOM_HALF} fill={GOLD} />
          </g>
        </svg>
      </div>
    </AbsoluteFill>
  );
};
