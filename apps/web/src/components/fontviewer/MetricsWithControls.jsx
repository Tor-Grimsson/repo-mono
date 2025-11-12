import { useEffect, useState } from "react";
import { Pill, Slider } from "@kol/ui";
import { FontLoader } from "@kol/fontviewer";
import Extraction from "./Extraction";
import defaultItalicFontUrl from "/fonts/TGMalromurItalicVF.ttf?url";
import defaultRomanFontUrl from "/fonts/TGMalromurRomanVF.ttf?url";

const SAMPLE_OPTIONS = [
  // Uppercase A-Z
  ...Array.from({ length: 26 }, (_, i) => {
    const char = String.fromCharCode(65 + i); // 65 is 'A'
    return { id: char, label: char, text: char };
  }),
  // Lowercase a-z
  ...Array.from({ length: 26 }, (_, i) => {
    const char = String.fromCharCode(97 + i); // 97 is 'a'
    return { id: char, label: char, text: char };
  })
];

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

export default function MetricsWithControls({
  italicFontUrl = defaultItalicFontUrl,
  romanFontUrl = defaultRomanFontUrl,
  title = "TG Málrómur",
  subtitle = "Variable serif",
  className = "",
}) {
  const [fontFamily, setFontFamily] = useState(null);
  const [fontInfo, setFontInfo] = useState(null);
  const [fontSize, setFontSize] = useState(180);
  const [sampleIndex, setSampleIndex] = useState(0);
  const [customText, setCustomText] = useState("f");
  const [variationAxes, setVariationAxes] = useState([]);
  const [variationValues, setVariationValues] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isItalic, setIsItalic] = useState(0); // 0 = Italic, 1 = Roman

  // Determine which font file to use
  const activeFontUrl = isItalic === 0 ? italicFontUrl : romanFontUrl;

  useEffect(() => {
    if (!activeFontUrl) return;

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
        const response = await fetch(activeFontUrl);
        const buffer = await response.arrayBuffer();
        const filename = activeFontUrl.split("/").pop() || "font.ttf";
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
  }, [activeFontUrl]);

  const currentGlyph = customText.length > 0 ? customText : "f";

  const weightAxis =
    variationAxes.find((axis) => axis.tag?.toLowerCase() === "wght") ?? null;

  const weightValue = weightAxis
    ? (variationValues[weightAxis.tag] ??
      Number(weightAxis.default ?? weightAxis.min ?? 0))
    : 0;

  const axisTags = fontInfo?.axes?.length
    ? fontInfo.axes.map((axis) => ({
        id: axis.tag,
        label: axis.name || axis.tag,
      }))
    : [];

  const handleSampleIndexChange = (value) => {
    const clampedIndex = clamp(Math.round(value), 0, SAMPLE_OPTIONS.length - 1);
    setSampleIndex(clampedIndex);
    setCustomText(SAMPLE_OPTIONS[clampedIndex].text);
  };

  const handleWeightChange = (value) => {
    if (!weightAxis) return;
    setVariationValues((prev) => ({
      ...prev,
      [weightAxis.tag]: value,
    }));
  };

  const handleItalicChange = (value) => {
    // Snap to 0 or 1 based on crossing the halfway point
    const snappedValue = value < 0.5 ? 0 : 1;
    setIsItalic(snappedValue);
  };

  return (
    <article
      className={`relative flex flex-col overflow-hidden ${className}`}
      data-fontviewer-card
    >
      {/* Metrics Display */}
      <div className="mb-8">
        <Extraction
          fontUrl={activeFontUrl}
          glyph={currentGlyph}
          fontSize={fontSize}
          fontWeight={weightValue}
          weightAxisTag={weightAxis?.tag}
          fontItalic={isItalic}
          height={600}
          className="bg-surface-primary rounded-sm border border-fg-08"
        />
      </div>

      {/* Controls */}
      <div className="flex flex-col gap-6">
        {/* Weight and Italic Pills with Input Fields */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex gap-2">
            {axisTags.length > 0 && axisTags.map((axis) => (
              <Pill key={axis.id} variant="subtle">
                {axis.label}
              </Pill>
            ))}
          </div>
          <div className="flex gap-3">
            <input
              type="text"
              value={customText}
              onChange={(e) => setCustomText(e.target.value)}
              placeholder="Type character..."
              className="w-40 h-[26px] px-3 bg-surface-primary border border-fg-08 rounded-full text-auto kol-helper-xs focus:outline-none focus:border-fg-32"
              maxLength={10}
            />
          </div>
        </div>

        {/* Slider stack */}
        <div className="flex-1 w-full flex flex-col gap-3">
          {/* Sample: cycles between different glyphs */}
          <Slider
            label="Glyph"
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
          {/* Italic / Roman slider */}
          <Slider
            label="Style"
            variant="minimal"
            min={0}
            max={1}
            step={0.01}
            value={isItalic}
            onChange={handleItalicChange}
            formatValue={(value) => value === 0 ? 'Italic' : 'Roman'}
          />
        </div>

        {/* Error message */}
        {error && (
          <p className="kol-mono-xs text-status-danger">{error}</p>
        )}
      </div>
    </article>
  );
}
