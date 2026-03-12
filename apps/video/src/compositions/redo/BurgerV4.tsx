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
// Burger V4 — Portrait of V3, 2160×3600, 600 frames (20s @ 30fps)
// Same creative animation as V3: rotation, tilt, glow. Portrait canvas.
// ================================================================

const WAVE_ORDER = [1, 0, 2];

export const BurgerV4: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const globalRot = interpolate(frame, [0, 600], [0, 180], {
    extrapolateRight: "clamp",
  });

  const introScale = spring({
    frame, fps,
    config: { damping: 14, stiffness: 45 },
    from: 0.3, to: 1,
  });
  const introOpacity = interpolate(frame, [0, 30], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });

  const gapOpen = ease(progress(frame, 40, 200));
  const gapClose = ease(progress(frame, 420, 560));
  const gap = gapOpen * (1 - gapClose);

  const topY = CLOSE_OFFSET * (1 - gap);
  const botY = -CLOSE_OFFSET * (1 - gap);

  const halfTilt = gap * 6;
  const breathe = Math.sin(frame * 0.04) * 3 * gap;

  const waveOn = [
    ease(progress(frame, 70, 130)),
    ease(progress(frame, 140, 200)),
    ease(progress(frame, 200, 260)),
  ];
  const waveOff = [
    ease(progress(frame, 510, 555)),
    ease(progress(frame, 450, 500)),
    ease(progress(frame, 400, 450)),
  ];

  const waveDrawDir = (i: number) => (i % 2 === 0 ? 1 : -1);

  const waveShiftX = (i: number): number => {
    if (gap < 0.3) return 0;
    return Math.sin(frame * 0.03 + i * 1.3) * 5 * gap;
  };
  const waveOscY = (i: number): number => {
    if (gap < 0.3) return 0;
    return Math.sin(frame * 0.025 + i * 1.7 + 0.5) * 2 * gap;
  };

  const glowStrength = (frame >= 180 && frame < 440)
    ? 2 + Math.sin(frame * 0.06) * 1.5
    : 0;

  const outroScale = frame >= 540
    ? interpolate(frame, [540, 600], [1, 0.4], {
        extrapolateLeft: "clamp", extrapolateRight: "clamp",
        easing: (t: number) => t * t,
      })
    : 1;
  const outroOpacity = frame >= 565
    ? interpolate(frame, [565, 600], [1, 0], {
        extrapolateLeft: "clamp", extrapolateRight: "clamp",
      })
    : 1;

  // Portrait scale
  const compositeScale = 4.5 * introScale * outroScale;
  const compositeOpacity = introOpacity * outroOpacity;

  return (
    <AbsoluteFill style={{ backgroundColor: BG }}>
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: `translate(-50%, -50%) scale(${compositeScale}) rotate(${globalRot}deg)`,
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
          {glowStrength > 0.5 && (
            <defs>
              <filter id="wave-glow-v4" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation={glowStrength} result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
          )}

          <g transform={`translate(160, 160) rotate(${-halfTilt}) translate(-160, -160) translate(0, ${topY - breathe})`}>
            <path d={TOP_HALF} fill={GOLD} />
          </g>

          <g filter={glowStrength > 0.5 ? "url(#wave-glow-v4)" : undefined}>
            {WAVE_ORDER.map((waveIdx, i) => {
              const on = waveOn[i];
              const off = waveOff[i];
              const drawn = Math.max(0, on - off);
              if (drawn <= 0.001) return null;
              const adjustedY = 160 + (WAVE_Y[waveIdx] - 160) * gap;
              const dir = waveDrawDir(i);
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
                  strokeDashoffset={dir * (1 - drawn)}
                  transform={`translate(${waveShiftX(i)}, ${adjustedY + waveOscY(i)})`}
                />
              );
            })}
          </g>

          <g transform={`translate(160, 160) rotate(${halfTilt}) translate(-160, -160) translate(0, ${botY + breathe})`}>
            <path d={BOTTOM_HALF} fill={GOLD} />
          </g>
        </svg>
      </div>
    </AbsoluteFill>
  );
};
