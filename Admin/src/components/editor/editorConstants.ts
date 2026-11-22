export const DEFAULT_FONT_COLORS = [
  "#000000",
  "#0A2540",
  "#0066CC",
  "#2563EB",
  "#DC2626",
  "#16A34A",
  "#D97706",
  "#7C3AED",
  "#475569",
  "#FFFFFF",
];

export const DEFAULT_BG_COLORS = [
  "transparent",
  "#FEF08A", // soft yellow
  "#BAE6FD", // soft blue
  "#BBF7D0", // soft green
  "#FED7AA", // soft orange
  "#FBCFE8", // soft pink
  "#E2E8F0", // soft gray
  "#FEE2E2", // soft red
  "#DDD6FE", // soft purple
  "#0A2540", // dark navy
];

export const FONT_SIZES = [
  { label: "Small (12px)", value: "1", px: "12px" },
  { label: "Normal (14px)", value: "3", px: "14px" },
  { label: "Medium (16px)", value: "4", px: "16px" },
  { label: "Large (20px)", value: "5", px: "20px" },
  { label: "Extra Large (24px)", value: "6", px: "24px" },
];

export interface ActiveStyles {
  bold: boolean;
  italic: boolean;
  underline: boolean;
  unorderedList: boolean;
  orderedList: boolean;
  blockquote: boolean;
  link: boolean;
  fontSize: string;
}
