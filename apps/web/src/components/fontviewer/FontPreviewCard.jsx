import { useEffect, useState } from "react";
import { Pill, Slider } from "@kolkrabbi/kol-component";
import { FontLoader } from "@kolkrabbi/kol-foundry";
const defaultFontUrl = "/fonts/TGMalromurItalicVF.ttf";

const SAMPLE_OPTIONS = [
   { id: "glyph", label: "Glyph", text: "nið" },
   { id: "word", label: "Word", text: "Kolkrabbi" },
   {
      id: "sentence",
      label: "Sentence",
      text: "The quick brown fox jumps over the lazy dog.",
   },
];

const GRID_OVERLAY_STYLE = {
   backgroundImage:
      "linear-gradient(to right, color-mix(in srgb, var(--kol-surface-on-primary) 12%, transparent) 1px, transparent 1px), linear-gradient(to bottom, color-mix(in srgb, var(--kol-surface-on-primary) 12%, transparent) 1px, transparent 1px)",
   backgroundSize: "48px 48px",
};

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

const formatMetaValue = (value) => {
   if (value === undefined || value === null) return "—";
   if (typeof value === "string") {
      const trimmed = value.trim();
      if (!trimmed || trimmed.toLowerCase() === "unknown") {
         return "—";
      }
      return trimmed;
   }
   if (Number.isFinite(value)) {
      return value;
   }
   return "—";
};

export default function FontPreviewCard({
   fontUrl = defaultFontUrl,
   title = "TG Málrómur",
   subtitle = "Variable serif",
   className = "",
}) {
   const [fontFamily, setFontFamily] = useState(null);
   const [fontInfo, setFontInfo] = useState(null);
   const [fontSize, setFontSize] = useState(180);
   const [sampleIndex, setSampleIndex] = useState(0);
   const [variationAxes, setVariationAxes] = useState([]);
   const [variationValues, setVariationValues] = useState({});
   const [isLoading, setIsLoading] = useState(true);
   const [error, setError] = useState(null);

   useEffect(() => {
      if (!fontUrl) return;

      const loader = new FontLoader({
         onFontLoaded: ({ fontInfo: info, fontFamily: family }) => {
            setFontFamily(family);
            setFontInfo(info);

            if (info.axes?.length) {
               setVariationAxes(info.axes);
               const defaults = info.axes.reduce((acc, axis) => {
                  const numericDefault = Number(axis.default);
                  acc[axis.tag] = Number.isFinite(numericDefault)
                     ? numericDefault
                     : Number(axis.min) || 0;
                  return acc;
               }, {});
               setVariationValues(defaults);
            } else {
               setVariationAxes([]);
               setVariationValues({});
            }

            setIsLoading(false);
         },
         onError: (err) => {
            setError(err?.message ?? "Unable to load font");
            setIsLoading(false);
         },
      });

      let cancelled = false;

      const loadFont = async () => {
         try {
            const response = await fetch(fontUrl);
            const buffer = await response.arrayBuffer();
            const filename = fontUrl.split("/").pop() || "font.ttf";
            if (!cancelled) {
               await loader.loadFont(buffer, filename);
            }
         } catch (err) {
            if (!cancelled) {
               setError(err?.message ?? "Unable to load font");
               setIsLoading(false);
            }
         }
      };

      loadFont();

      return () => {
         cancelled = true;
         loader.cleanup();
      };
   }, [fontUrl]);

   const previewText = SAMPLE_OPTIONS[sampleIndex]?.text ?? "Sample";

   const variationSettings = (() => {
      const settings = Object.entries(variationValues)
         .filter(
            ([, value]) => typeof value === "number" && Number.isFinite(value)
         )
         .map(([tag, value]) => `"${tag}" ${value}`);

      if (!settings.length) {
         return "normal";
      }
      return settings.join(", ");
   })();

   const weightAxis =
      variationAxes.find((axis) => axis.tag?.toLowerCase() === "wght") ?? null;
   const italicAxis =
      variationAxes.find((axis) => axis.tag?.toLowerCase() === "ital") ??
      variationAxes.find((axis) => axis.tag?.toLowerCase() === "slnt") ??
      null;

   const weightValue = weightAxis
      ? (variationValues[weightAxis.tag] ??
        Number(weightAxis.default ?? weightAxis.min ?? 0))
      : 0;

   const italicValue = italicAxis
      ? (variationValues[italicAxis.tag] ??
        Number(italicAxis.default ?? italicAxis.min ?? 0))
      : 0;

   const metadataColumns = [
      [
         { label: "Font", value: formatMetaValue(title) },
         {
            label: "Family",
            value: formatMetaValue(
               fontInfo?.fontFamily ?? fontInfo?.fullName ?? subtitle
            ),
         },
         {
            label: "Style",
            value: formatMetaValue(fontInfo?.fontStyle ?? subtitle),
         },
         { label: "Version", value: formatMetaValue(fontInfo?.version) },
      ],
      [
         { label: "Designer", value: formatMetaValue(fontInfo?.designer) },
         { label: "Foundry", value: formatMetaValue(fontInfo?.manufacturer) },
         { label: "Units / Em", value: formatMetaValue(fontInfo?.unitsPerEm) },
         { label: "Glyphs", value: formatMetaValue(fontInfo?.glyphCount) },
      ],
   ];

   const axisTags = fontInfo?.axes?.length
      ? fontInfo.axes.map((axis) => ({
           id: axis.tag,
           label: axis.name || axis.tag,
        }))
      : [];

   const handleSampleIndexChange = (value) => {
      setSampleIndex(clamp(Math.round(value), 0, SAMPLE_OPTIONS.length - 1));
   };

   const handleWeightChange = (value) => {
      if (!weightAxis) return;
      setVariationValues((prev) => ({
         ...prev,
         [weightAxis.tag]: value,
      }));
   };

   const handleItalicChange = (value) => {
      if (!italicAxis) return;
      setVariationValues((prev) => ({
         ...prev,
         [italicAxis.tag]: value,
      }));
   };

   return (
      <article
         className={`relative flex h-[800px] w-full flex-col overflow-hidden rounded border border-auto bg-surface-secondary text-auto ${className}`}
         data-fontviewer-card
      >
         <div className="relative flex h-full flex-col p-8">


            {/* Preview CANVAS */}

            
            <div className="relative flex-1 bg-surface-primary">
               <div
                  className="pointer-events-none absolute inset-0 opacity-20"
                  style={GRID_OVERLAY_STYLE}
                  aria-hidden
               />
               <div
                  className="absolute inset-0 flex items-center justify-center px-8 text-center"
                  style={{
                     fontFamily: fontFamily
                        ? `'${fontFamily}', sans-serif`
                        : undefined,
                     fontSize: `${fontSize}px`,
                     fontVariationSettings: variationSettings,
                     transition: "font-size 160ms ease, transform 160ms ease",
                  }}
               >
                  <span className="line-clamp-1 leading-none">
                     {isLoading ? "Loading…" : previewText}
                  </span>
               </div>
            </div>

            
            {/* ------* Metadata + controls ------ */}


            <div className="flex flex-col gap-6 pt-8">
               


            {/* ------* Metadata + controls ------ */}
            
         
               {axisTags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                     {axisTags.map((axis) => (
                        <Pill key={axis.id} variant="subtle">
                           {axis.label}
                        </Pill>
                        
                     ))}
                  </div>
               )}


            {/* ------* Metadata + controls ------ */}


          {/* Slider stack */}
          <div className="flex-1 w-full flex flex-col gap-3">
            {/* Sample: cycles between glyph/word/sentence presets */}
            <Slider
              label="Sample"
              variant="minimal"
              min={0}
              max={SAMPLE_OPTIONS.length - 1}
                     step={1}
                     value={sampleIndex}
                     onChange={handleSampleIndexChange}
                     formatValue={(value) =>
                        SAMPLE_OPTIONS[
                           clamp(
                              Math.round(value),
                              0,
                              SAMPLE_OPTIONS.length - 1
                           )
                        ]?.label ?? ""
                     }
                  />
                  <Slider
                     label="Font Size"
                     variant="minimal"
                     min={48}
                     max={320}
                     step={1}
                     value={fontSize}
              onChange={setFontSize}
              formatValue={(value) => `${Math.round(value)}px`}
            />
            {/* Weight axis slider */}
            <Slider
              label="Weight"
              variant="minimal"
              min={weightAxis ? Number(weightAxis.min) : 0}
              max={weightAxis ? Number(weightAxis.max) : 1}
                     step={weightAxis ? Number(weightAxis.increment) || 1 : 1}
              value={weightAxis ? weightValue : 0}
              onChange={handleWeightChange}
            />
            {/* Italic / slant axis slider */}
            <Slider
              label="Italic"
              variant="minimal"
              min={italicAxis ? Number(italicAxis.min) : 0}
              max={italicAxis ? Number(italicAxis.max) : 1}
                     step={italicAxis ? Number(italicAxis.increment) || 1 : 1}
                     value={italicAxis ? italicValue : 0}
                     onChange={handleItalicChange}
                  />
               </div>
               {/* Error message */}
               {error && (
                  <p className="kol-mono-xs text-status-danger">{error}</p>
               )}
            </div>
         </div>
      </article>
   );
}
