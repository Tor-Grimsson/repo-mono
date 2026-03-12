// ============================================================
// Pattern A chevron unit — extracted from 09-flik-4-5.svg
// One "cell" = 4 parallelogram paths forming 2 stacked V shapes
// Original cell bounding box: x ∈ [1087, 1279], y ∈ [120, 551.43]
// Cell dimensions: 192 × 431.43
// ============================================================

// We use the first cell's raw paths and provide an offset to normalize to origin.
// The cell origin (top-left) is at (1087, 120) in the original SVG.
export const PATTERN_A_CELL_ORIGIN = { x: 1087, y: 120 };
export const PATTERN_A_CELL_W = 192;
export const PATTERN_A_CELL_H = 431.43;

// 4 raw paths for one Pattern A cell (from lines 5-8 of the SVG)
export const PATTERN_A_PATHS = [
  // Upper-right parallelogram (right arm of upper V)
  "M1154.5 235.388C1152.71 232.505 1154.09 227.857 1156.75 227.857H1206.12C1212.96 227.857 1219.48 232.087 1224.09 239.516L1279.19 328.184C1280.98 331.066 1279.6 335.714 1276.95 335.714H1227.57C1220.74 335.714 1214.22 331.485 1209.6 324.056L1154.5 235.388Z",
  // Upper-left parallelogram (left arm of upper V)
  "M1087.47 220.326C1085.68 223.209 1087.07 227.857 1089.72 227.857H1139.1C1145.93 227.857 1152.45 223.627 1157.07 216.199L1212.17 127.531C1213.96 124.648 1212.57 120 1209.92 120L1160.54 120C1153.71 120 1147.19 124.23 1142.58 131.658L1087.47 220.326Z",
  // Lower-left parallelogram (left arm of lower V)
  "M1212.17 451.103C1213.96 448.22 1212.57 443.572 1209.92 443.572H1160.54C1153.71 443.572 1147.19 447.802 1142.58 455.23L1087.47 543.898C1085.68 546.781 1087.07 551.429 1089.72 551.429H1139.1C1145.93 551.429 1152.45 547.199 1157.07 539.771L1212.17 451.103Z",
  // Lower-right parallelogram (right arm of lower V)
  "M1279.19 436.041C1280.99 438.924 1279.6 443.572 1276.95 443.572H1227.57C1220.74 443.572 1214.22 439.342 1209.6 431.914L1154.5 343.246C1152.71 340.363 1154.1 335.715 1156.75 335.715H1206.13C1212.96 335.715 1219.48 339.945 1224.09 347.373L1279.19 436.041Z",
];

// The grid in the SVG has columns at x-offsets: 0, 193, 386, 579 (from rightmost)
// Actually columns go: col0 center ~1183, col1 center ~990, col2 ~797, col3 ~604, col4 ~411, col5 ~218
// These are mirrored pairs. Even columns face right, odd columns face left.
// Column x-centers from the SVG (right to left):
// 1183, 990, 797, 604, 411, 218
// Step between columns = -193 (but some are mirrored)

// Examining the SVG: columns at x~1087-1279 face one way,
// and columns at x~894-1086 face the OPPOSITE way (mirrored).
// The "facing" alternates every column.

// Column spacing in the original SVG
export const PATTERN_A_COL_STEP = 192.67;
// Row spacing = cell height
export const PATTERN_A_ROW_STEP = 431.43;

// ============================================================
// Pattern B chevron unit — extracted from 12-flik-4-5.svg
// One "cell" = 2 paths forming one V-chevron
// First cell bounding box: x ∈ [220, 340], y ∈ [291.668, 450.332]
// But the V spans from the upper-right arm to lower-left arm
// ============================================================

// Pattern B: each chevron = 2 paths (upper arm going ↘, lower arm going ↗)
// Cell dimensions derived from the repeating offsets:
// Columns at x=220,340,460,580,700,820,940,1060 → step of 120
// Vertical repeat: first arm at y=291→394, second at y=347→450 → pair repeat ~112

export const PATTERN_B_CELL_W = 120;
export const PATTERN_B_CELL_H = 112;

// First chevron pair from the SVG (column at x=220-340)
// Path 1: upper-right arm (from ↗ corner going ↘)
export const PATTERN_B_PATHS = [
  // Upper arm (going down-right): tip at upper-right, body going to lower-left of arm
  "M284.189 394.862C282.586 396.345 280 395.197 280 393.003V352.138C280 346.484 282.353 341.09 286.486 337.269L335.811 291.668C337.414 290.185 340 291.332 340 293.526V334.392C340 340.046 337.647 345.44 333.515 349.261L284.189 394.862Z",
  // Lower arm (going up-right): tip at lower-left, body going to upper-right of arm
  "M275.811 450.332C277.414 451.815 280 450.668 280 448.474V407.608C280 401.954 277.647 396.56 273.514 392.739L224.189 347.138C222.586 345.655 220 346.803 220 348.997V389.862C220 395.516 222.353 400.91 226.486 404.731L275.811 450.332Z",
];

export const PATTERN_B_ORIGIN = { x: 220, y: 291.668 };
export const PATTERN_B_COL_STEP = 120;
export const PATTERN_B_ROW_STEP = 112;

// Colors
export const COLORS_A = { bg: "#FDFCF8", fg: "#353537" };
export const COLORS_B = { bg: "#8F3953", fg: "#FAF7F0" };
