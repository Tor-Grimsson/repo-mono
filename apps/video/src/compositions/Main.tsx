import { useCurrentFrame, interpolate, AbsoluteFill } from "remotion";

export const Main: React.FC = () => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 30], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "var(--kol-surface-primary)",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h1
        style={{
          color: "var(--kol-surface-on-primary)",
          fontSize: 80,
          opacity,
        }}
      >
        Hello Remotion
      </h1>
    </AbsoluteFill>
  );
};
