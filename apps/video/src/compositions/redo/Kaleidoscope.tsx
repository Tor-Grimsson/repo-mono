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
// ---- Colors ----
const BG = "#121215";
const PINK = "#EE799C";
const WHITE_STROKE = "rgba(255, 255, 255, 0.35)";
const WHITE_FILL = "rgba(255, 255, 255, 0.06)";

// ---- Normalized chevron paths (centered at origin) ----
const CHEV_ARM1 = "M-9.133 31.056C-5.638 32.986 0 31.493 0 28.637V-24.549C0 -31.907 -5.13 -38.928 -14.139 -43.901L-121.668 -103.251C-125.163 -105.18 -130.8 -103.687 -130.8 -100.832V-47.646C-130.8 -40.287 -125.671 -33.266 -116.662 -28.294L-9.133 31.056Z";
const CHEV_ARM2 = "M9.132 103.251C5.637 105.18 0 103.687 0 100.832V47.646C0 40.287 5.129 33.266 14.138 28.294L121.667 -31.056C125.163 -32.986 130.8 -31.493 130.8 -28.637V24.549C130.8 31.907 125.67 38.928 116.661 43.901L9.132 103.251Z";

// ================================================================
// Kaleidoscope: 1080x1080, 900 frames, 30fps (30s)
//
// Center: Flower of Life (overlapping circles, dashed white strokes)
// Middle ring: 8 chevrons at R=300, rotating clockwise
// Outer ring: 12 chevrons at R=420, rotating counter-clockwise
//
// Timeline:
//   0-90:    Center circles draw on
//   60-150:  Middle ring chevrons scale in (staggered)
//   120-210: Outer ring chevrons scale in (staggered)
//   210-800: Continuous rotation, subtle pulsing
//   800-900: Everything fades out
// ================================================================

const SIZE = 1080;
const CX = SIZE / 2;
const CY = SIZE / 2;

// Flower of Life: 1 center circle + 6 surrounding circles
const FOL_R = 80;
const FOL_CIRCLES: { cx: number; cy: number }[] = [
  { cx: 0, cy: 0 },
];
for (let i = 0; i < 6; i++) {
  const angle = (i * Math.PI * 2) / 6;
  FOL_CIRCLES.push({ cx: Math.cos(angle) * FOL_R, cy: Math.sin(angle) * FOL_R });
}

// Middle ring config
const MID_COUNT = 8;
const MID_R = 300;
const MID_CHEV_SCALE = 0.35;

// Outer ring config
const OUT_COUNT = 12;
const OUT_R = 430;
const OUT_CHEV_SCALE = 0.28;

export const Kaleidoscope: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // ---- Fade out ----
  const fadeOut = 1 - ease(progress(frame, 820, 900));

  // ---- Flower of Life center ----
  const folCircles: React.ReactElement[] = [];
  FOL_CIRCLES.forEach((c, i) => {
    const circumference = 2 * Math.PI * FOL_R;
    const drawStart = 10 + i * 8;
    const drawP = ease(progress(frame, drawStart, drawStart + 50));

    // Subtle pulsing after drawn
    const pulseAge = Math.max(0, frame - (drawStart + 50));
    const pulse = 1 + 0.02 * Math.sin(pulseAge * 0.03 + i * 0.5);

    if (drawP < 0.01) return;

    // Use a solid dasharray with offset for the draw-on reveal
    const solidDash = circumference;
    const dashOffset = solidDash * (1 - drawP);

    folCircles.push(
      <g key={`fol-${i}`}>
        {/* Filled circle fades in */}
        <circle
          cx={c.cx}
          cy={c.cy}
          r={FOL_R * pulse}
          fill={WHITE_FILL}
          opacity={drawP}
        />
        {/* Dashed stroke draws on */}
        <circle
          cx={c.cx}
          cy={c.cy}
          r={FOL_R * pulse}
          stroke={WHITE_STROKE}
          strokeWidth={1.2}
          strokeDasharray={`4 3`}
          fill="none"
          opacity={drawP}
        />
      </g>
    );
  });

  // Outer boundary circle for the Flower of Life
  const boundaryDrawP = ease(progress(frame, 50, 110));
  const boundaryVisible = boundaryDrawP > 0.01;

  // ---- Middle ring: 8 chevrons rotating clockwise ----
  const midRotation = frame * 0.15; // degrees per frame
  const midChevrons: React.ReactElement[] = [];
  for (let i = 0; i < MID_COUNT; i++) {
    const baseAngle = (i * 360) / MID_COUNT;
    const angle = baseAngle + midRotation;
    const rad = (angle * Math.PI) / 180;
    const x = Math.cos(rad) * MID_R;
    const y = Math.sin(rad) * MID_R;

    // Staggered scale-in
    const enterDelay = 60 + i * 8;
    const scaleIn = spring({
      frame: Math.max(0, frame - enterDelay),
      fps,
      config: { damping: 14, stiffness: 90, mass: 0.7 },
    });

    // Chevron points outward from center (rotation matches position angle)
    const pointAngle = angle + 90; // perpendicular to radius

    // Alternating: every other chevron is mirrored
    const mirror = i % 2 === 0 ? 1 : -1;

    if (scaleIn < 0.01) continue;

    midChevrons.push(
      <g key={`mid-${i}`} transform={`translate(${x}, ${y}) rotate(${pointAngle}) scale(${MID_CHEV_SCALE * scaleIn * mirror}, ${MID_CHEV_SCALE * scaleIn})`}>
        <path d={CHEV_ARM1} fill={PINK} />
        <path d={CHEV_ARM2} fill={PINK} />
      </g>
    );
  }

  // ---- Outer ring: 12 chevrons rotating counter-clockwise ----
  const outRotation = -frame * 0.1; // slower, opposite direction
  const outChevrons: React.ReactElement[] = [];
  for (let i = 0; i < OUT_COUNT; i++) {
    const baseAngle = (i * 360) / OUT_COUNT;
    const angle = baseAngle + outRotation;
    const rad = (angle * Math.PI) / 180;
    const x = Math.cos(rad) * OUT_R;
    const y = Math.sin(rad) * OUT_R;

    const enterDelay = 120 + i * 6;
    const scaleIn = spring({
      frame: Math.max(0, frame - enterDelay),
      fps,
      config: { damping: 14, stiffness: 90, mass: 0.7 },
    });

    const pointAngle = angle + 90;
    const mirror = i % 2 === 0 ? 1 : -1;

    // Subtle breathing: scale oscillates slightly
    const breath = 1 + 0.04 * Math.sin(frame * 0.04 + i * 0.8);

    if (scaleIn < 0.01) continue;

    outChevrons.push(
      <g key={`out-${i}`} transform={`translate(${x}, ${y}) rotate(${pointAngle}) scale(${OUT_CHEV_SCALE * scaleIn * breath * mirror}, ${OUT_CHEV_SCALE * scaleIn * breath})`}>
        <path d={CHEV_ARM1} fill={PINK} />
        <path d={CHEV_ARM2} fill={PINK} />
      </g>
    );
  }

  return (
    <AbsoluteFill style={{ backgroundColor: BG }}>
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <svg
          width={SIZE}
          height={SIZE}
          viewBox={`0 0 ${SIZE} ${SIZE}`}
          fill="none"
          style={{ opacity: fadeOut }}
        >
          <g transform={`translate(${CX}, ${CY})`}>
            {/* Flower of Life center */}
            <g>
              {folCircles}
              {boundaryVisible && (
                <circle
                  cx={0}
                  cy={0}
                  r={FOL_R * 2}
                  stroke={WHITE_STROKE}
                  strokeWidth={0.8}
                  strokeDasharray={`6 4`}
                  fill="none"
                  opacity={boundaryDrawP}
                />
              )}
            </g>

            {/* Middle ring */}
            {midChevrons}

            {/* Outer ring */}
            {outChevrons}
          </g>
        </svg>
      </div>
    </AbsoluteFill>
  );
};
