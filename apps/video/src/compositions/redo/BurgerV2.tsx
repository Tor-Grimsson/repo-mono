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
// Burger V2 — Portrait 2160×3600, 600 frames (20s @ 30fps)
// Same animation as V1 but portrait canvas.
// ================================================================

const WAVE_ORDER = [1, 0, 2];

export const BurgerV2: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const introScale = spring({
    frame, fps,
    config: { damping: 18, stiffness: 60 },
    from: 0.6, to: 1,
  });
  const introOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });

  const gapOpen = ease(progress(frame, 25, 240));
  const gapClose = ease(progress(frame, 380, 555));
  const gap = gapOpen * (1 - gapClose);

  const topY = CLOSE_OFFSET * (1 - gap);
  const botY = -CLOSE_OFFSET * (1 - gap);

  const breathe = (frame >= 250 && frame < 380)
    ? Math.sin((frame - 250) * 0.05) * 2.5 * gap
    : 0;

  const waveOn = [
    ease(progress(frame, 45, 100)),
    ease(progress(frame, 120, 180)),
    ease(progress(frame, 190, 250)),
  ];
  const waveOff = [
    ease(progress(frame, 500, 550)),
    ease(progress(frame, 430, 480)),
    ease(progress(frame, 380, 430)),
  ];

  const waveShiftX = (i: number): number => {
    if (frame < 250 || frame >= 380) return 0;
    return Math.sin((frame - 250) * 0.04 + i * 1.1) * 3;
  };
  const waveOscY = (i: number): number => {
    if (frame < 250 || frame >= 380) return 0;
    return Math.sin((frame - 250) * 0.035 + i * 1.5) * 1.5;
  };

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

  // Portrait: scale to fit 2160 width
  const compositeScale = 4.5 * introScale * outroScale;
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
