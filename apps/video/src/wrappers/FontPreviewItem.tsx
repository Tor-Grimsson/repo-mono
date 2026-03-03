/**
 * FontPreviewItem — Render-only wrapper for Remotion.
 *
 * Mirrors the visual layout of FontPreviewItemAlt from @kol/ui
 * but with every value controlled externally (no internal state).
 * Uses VideoUI replicas to avoid Vite-only import.meta.glob deps.
 */

import React from "react";
import { SliderVisual, DropdownVisual } from "./VideoUI";

const SPECIMEN_TEXT =
  "Rennimjúkt eðal flauel, duft slæðist niður, silkislaufa & æðardúnn, fiður daðra dilur, friður. Sjáumst sjaldnar en sálagárur, samverustundir við skák að sötri, soðin sjálfsögðum samtölum. Spakir sötra á sætu seyði, sjónlistarspjall, síðfóníur, söngur sungin suður af Síberíu, setið að sálrænum stríðsglæpum, svaðil-pöttum og skyndimátum, svarthvítar svikamyllur, sökkvandi skálínur spegla sýnirnar – seinni tíðirnar.";

const WEIGHT_VALUES: Record<string, number> = {
  Thin: 100,
  Extralight: 200,
  Light: 300,
  Regular: 400,
  Medium: 500,
  Semibold: 600,
  Bold: 700,
  Extrabold: 800,
  Black: 900,
};

interface FontPreviewItemProps {
  weightLabel: string;
  fontStyle: "normal" | "italic";
  size: number;
  leading: number;
  spacing: number;
  lineClamp?: number;
}

const FontPreviewItem: React.FC<FontPreviewItemProps> = ({
  weightLabel,
  fontStyle,
  size,
  leading,
  spacing,
  lineClamp,
}) => {
  const numericWeight = WEIGHT_VALUES[weightLabel] || 400;

  return (
    <div className="self-stretch min-h-40 p-6 rounded border border-fg-16 flex flex-col justify-start items-start gap-6 bg-surface-primary">
      {/* Controls Row */}
      <div className="self-stretch flex justify-start items-start gap-8">
        <div className="flex-shrink-0">
          <DropdownVisual value={weightLabel} variant="minimal" />
        </div>
        <div className="flex-1 flex justify-start items-start gap-8">
          <SliderVisual
            label="Size"
            min={12}
            max={200}
            value={size}
            className="flex-1"
          />
          <SliderVisual
            label="Leading"
            min={0}
            max={50}
            value={leading}
            formatValue={(val: number) => 90 + val}
            className="flex-1"
          />
          <SliderVisual
            label="Spacing"
            min={-50}
            max={50}
            value={spacing}
            className="flex-1"
          />
        </div>
      </div>

      {/* Preview Text */}
      <div className="self-stretch rounded flex justify-start items-start overflow-hidden">
        <div
          className="flex-1 bg-transparent"
          style={{
            fontFamily: "TGMalromur",
            fontStyle,
            fontWeight: numericWeight,
            fontSize: `${size}px`,
            lineHeight: `${90 + leading}%`,
            letterSpacing: `${spacing}px`,
            wordWrap: "break-word",
            overflowWrap: "break-word",
            whiteSpace: "normal",
            hyphens: "none",
            maxWidth: "100%",
            ...(lineClamp && {
              display: "-webkit-box",
              WebkitLineClamp: lineClamp,
              WebkitBoxOrient: "vertical" as const,
              overflow: "hidden",
            }),
          }}
        >
          {SPECIMEN_TEXT}
        </div>
      </div>
    </div>
  );
};

export default FontPreviewItem;
