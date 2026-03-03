/**
 * VideoUI — Lightweight visual-only replicas of @kol/ui atoms for Remotion.
 *
 * These render the same visual output as the real components but without
 * interactivity, internal state, or Vite-only dependencies (import.meta.glob).
 * Values are fully controlled via props — perfect for frame-based animation.
 */

import React from "react";

/* ------------------------------------------------------------------ */
/*  SliderVisual                                                       */
/* ------------------------------------------------------------------ */

interface SliderVisualProps {
  label: string;
  min: number;
  max: number;
  value: number;
  formatValue?: (val: number) => number | string;
  className?: string;
}

export const SliderVisual: React.FC<SliderVisualProps> = ({
  label,
  min,
  max,
  value,
  formatValue,
  className = "",
}) => {
  const pct = ((value - min) / (max - min)) * 100;
  const displayValue = formatValue ? formatValue(value) : Math.round(value);

  return (
    <div
      className={`control-slider-minimal gap-3 shadow-none ${className}`}
      style={{ display: "flex", alignItems: "center" }}
    >
      <label
        className="kol-mono-xs whitespace-nowrap shrink-0 w-fit"
        style={{ fontSize: "11px" }}
      >
        {label}
      </label>
      {/* Track + thumb */}
      <div
        style={{
          flex: 1,
          height: "2px",
          backgroundColor: "var(--kol-foreground)",
          opacity: 0.16,
          position: "relative",
          borderRadius: "1px",
        }}
      >
        {/* Filled portion */}
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: `${pct}%`,
            height: "100%",
            backgroundColor: "var(--kol-foreground)",
            opacity: 1,
            borderRadius: "1px",
          }}
        />
        {/* Thumb */}
        <div
          style={{
            position: "absolute",
            left: `${pct}%`,
            top: "50%",
            transform: "translate(-50%, -50%)",
            width: "10px",
            height: "10px",
            borderRadius: "50%",
            backgroundColor: "var(--kol-foreground)",
          }}
        />
      </div>
      <span
        className="kol-mono-xs text-right shrink-0 w-fit"
        style={{ fontSize: "11px" }}
      >
        {displayValue}
      </span>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/*  DropdownVisual                                                     */
/* ------------------------------------------------------------------ */

interface DropdownVisualProps {
  value: string;
  variant?: "default" | "minimal";
}

export const DropdownVisual: React.FC<DropdownVisualProps> = ({
  value,
  variant = "default",
}) => {
  if (variant === "minimal") {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "6px",
          height: "24px",
          fontFamily: "var(--kol-font-family-mono)",
          fontSize: "12px",
          lineHeight: "120%",
        }}
      >
        <span>{value}</span>
        <svg
          width="10"
          height="10"
          viewBox="0 0 12 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="m3 5 3 3 3-3"
            stroke="currentColor"
            strokeWidth="1.25"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    );
  }

  return (
    <div
      style={{
        border: "1px solid var(--kol-border-default)",
        borderRadius: "22px",
        backgroundColor: "var(--kol-surface-primary)",
        color: "var(--kol-surface-on-primary)",
        padding: "14px 24px",
        fontFamily: "var(--kol-font-family-mono)",
        fontSize: "12px",
        lineHeight: "120%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: "140px",
        minWidth: "140px",
      }}
    >
      <span>{value}</span>
      <svg
        width="12"
        height="12"
        viewBox="0 0 12 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ marginLeft: "auto" }}
      >
        <path
          d="m3 5 3 3 3-3"
          stroke="currentColor"
          strokeWidth="1.25"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/*  DividerVisual                                                      */
/* ------------------------------------------------------------------ */

export const DividerVisual: React.FC = () => (
  <div
    style={{
      width: "100%",
      height: "1px",
      backgroundColor: "var(--kol-foreground)",
      opacity: 0.08,
    }}
  />
);

/* ------------------------------------------------------------------ */
/*  FoundationIcon — tiny inline SVG replica of the "foundation" icon  */
/* ------------------------------------------------------------------ */

export const FoundationIcon: React.FC<{ size?: number }> = ({ size = 20 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M12 2v20M2 12h20" />
  </svg>
);
