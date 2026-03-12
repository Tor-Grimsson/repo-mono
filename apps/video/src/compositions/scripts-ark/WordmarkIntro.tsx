import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { Wordmark } from "@kol/ui/common";

export const WordmarkIntro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // Phase 1: Wordmark springs in (frames 0–30)
  const scaleSpring = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 180 },
  });
  const scale = interpolate(scaleSpring, [0, 1], [0.8, 1]);

  const fadeIn = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Phase 2: Hold (frames 30–70)

  // Phase 3: Fade out (last 20 frames)
  const fadeOut = interpolate(
    frame,
    [durationInFrames - 20, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp" }
  );

  const opacity = Math.min(fadeIn, fadeOut);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "var(--kol-surface-primary)",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          opacity,
          transform: `scale(${scale})`,
        }}
      >
        <Wordmark
          className="w-[540px] h-auto"
          tone="default"
        />
      </div>
    </AbsoluteFill>
  );
};
