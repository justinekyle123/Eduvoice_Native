import type { ViewStyle } from "react-native";

import { colors } from "./colors";

export const radius = {
  xs: 10,
  sm: 13,
  control: 14,
  chip: 18,
  card: 24,
  panel: 28,
  shell: 46,
  pill: 999,
} as const;

/**
 * The design avoids heavy shadows: low opacity, large blur and a navy tint so
 * cards feel grounded rather than floating.
 */
export const shadows = {
  card: {
    shadowColor: "#4d608a",
    shadowOffset: { width: 0, height: 14 },
    shadowOpacity: 0.11,
    shadowRadius: 28,
    elevation: 5,
  },
  raised: {
    shadowColor: "#304065",
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.18,
    shadowRadius: 25,
    elevation: 10,
  },
  soft: {
    shadowColor: "#40527a",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 3,
  },
  orb: {
    shadowColor: "#4c69b1",
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.3,
    shadowRadius: 40,
    elevation: 12,
  },
} as const satisfies Record<string, ViewStyle>;

export const motion = {
  fast: 180,
  base: 280,
  slow: 450,
  loop: 2000,
} as const;

/** Shared horizontal rhythm for full-screen content. */
export const screenPadding = {
  horizontal: 20,
  top: 16,
  bottom: 28,
} as const;

export const texture = {
  size: 20,
  dotRadius: 0.7,
  opacity: 0.22,
} as const;

export const glass = {
  surface: "rgba(255, 255, 255, 0.55)",
  surfaceStrong: "rgba(250, 252, 255, 0.86)",
  border: "rgba(255, 255, 255, 0.85)",
  borderStrong: "rgba(255, 255, 255, 0.92)",
} as const;

export const paletteHighlight = {
  innerGlow: colors.white,
} as const;
