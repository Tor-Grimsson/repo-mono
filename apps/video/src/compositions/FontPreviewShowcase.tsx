/**
 * FontPreviewShowcase — Instagram-format (1080×1350, 4:5) component preview.
 *
 * Timeline (~10s / 300 frames @ 30fps):
 *   0–45    Intro: component slides up + fades in
 *  45–105   Size slider sweep on the hero row (96→140→96)
 * 105–150   Weight: Regular → Bold (text reflows)
 * 150–195   Style: toggle to Italic, then Bold Italic
 * 195–255   Leading tweak on second row
 * 255–300   Outro: fade + scale out
 */

import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import {
  DropdownVisual,
  DividerVisual,
  FoundationIcon,
} from "../wrappers/VideoUI";
import FontPreviewItem from "../wrappers/FontPreviewItem";

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

const keyframe = (
  frame: number,
  stops: [number, number],
  values: [number, number]
) =>
  interpolate(frame, stops, values, {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

/* ------------------------------------------------------------------ */
/*  Header — mirrors FoundrySection                                    */
/* ------------------------------------------------------------------ */

interface HeaderProps {
  weightLabel: string;
  styleLabel: string;
}

const Header: React.FC<HeaderProps> = ({ weightLabel, styleLabel }) => (
  <>
    <div className="w-full flex flex-row justify-between items-end gap-4">
      <div className="flex items-center gap-4">
        <span className="kol-mono-text-lg">Málrómur</span>
        <FoundationIcon size={20} />
      </div>
      <div className="flex items-center gap-4">
        <DropdownVisual value={weightLabel} />
        <DropdownVisual value={styleLabel} />
      </div>
    </div>
    <DividerVisual />
  </>
);

/* ------------------------------------------------------------------ */
/*  Main Composition                                                   */
/* ------------------------------------------------------------------ */

export const FontPreviewShowcase: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  /* --- Intro (0–45): slide up + fade in --- */
  const introSpring = spring({
    frame,
    fps,
    config: { damping: 16, stiffness: 120 },
  });
  const introY = interpolate(introSpring, [0, 1], [60, 0]);
  const introOpacity = interpolate(frame, [0, 30], [0, 1], {
    extrapolateRight: "clamp",
  });

  /* --- Outro (255–300): fade + scale out --- */
  const outroOpacity = keyframe(frame, [255, 290], [1, 0]);
  const outroScale = keyframe(frame, [255, 290], [1, 0.96]);

  const opacity = Math.min(introOpacity, outroOpacity);
  const translateY = frame < 45 ? introY : 0;
  const scale = frame > 255 ? outroScale : 1;

  /* --- Size sweep on row 1 (45–105) --- */
  const row1Size =
    frame < 45
      ? 96
      : frame < 75
        ? keyframe(frame, [45, 75], [96, 140])
        : keyframe(frame, [75, 105], [140, 96]);

  /* --- Weight transition (105–150) --- */
  const weightLabel = frame < 120 ? "Regular" : "Bold";

  /* --- Style transition (150–195) --- */
  const isItalic = frame >= 150;
  const fontStyle: "normal" | "italic" = isItalic ? "italic" : "normal";
  const styleLabel = isItalic ? "Italic" : "Roman";

  /* --- Leading tweak on row 2 (195–255) --- */
  const row2Leading =
    frame < 195
      ? 10
      : frame < 225
        ? keyframe(frame, [195, 225], [10, 35])
        : keyframe(frame, [225, 255], [35, 10]);

  /* --- Row configs --- */
  const rows: Array<{
    size: number;
    leading: number;
    spacing: number;
    lineClamp?: number;
  }> = [
    { size: Math.round(row1Size), leading: 10, spacing: 0, lineClamp: 1 },
    { size: 64, leading: Math.round(row2Leading), spacing: 0, lineClamp: 3 },
    { size: 48, leading: 10, spacing: 0, lineClamp: 4 },
    { size: 24, leading: 50, spacing: 0, lineClamp: 5 },
  ];

  return (
    <AbsoluteFill
      data-theme="dark"
      style={{
        backgroundColor: "var(--kol-surface-primary)",
        padding: "60px 48px",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          opacity,
          transform: `translateY(${translateY}px) scale(${scale})`,
          display: "flex",
          flexDirection: "column",
          gap: "32px",
          width: "100%",
          height: "100%",
        }}
      >
        <Header weightLabel={weightLabel} styleLabel={styleLabel} />

        {rows.map((row, i) => (
          <FontPreviewItem
            key={i}
            weightLabel={weightLabel}
            fontStyle={fontStyle}
            size={row.size}
            leading={row.leading}
            spacing={row.spacing}
            lineClamp={row.lineClamp}
          />
        ))}
      </div>
    </AbsoluteFill>
  );
};
