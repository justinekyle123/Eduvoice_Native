// Sanctuary Design System - Theme Constants
// Based on DESIGN.md

export const colors = {
  // Backgrounds
  background: "#fbf9f5",
  surface: "#fbf9f5",
  surfaceContainer: "#efeeea",
  surfaceContainerLow: "#f5f3ef",
  surfaceContainerHigh: "#eae8e4",
  surfaceContainerLowest: "#ffffff",

  // Primary (Deep Navy)
  primary: "#04162e",
  onPrimary: "#ffffff",
  primaryContainer: "#1a2b44",
  onPrimaryContainer: "#8292b0",

  // Secondary (Spiritual Gold)
  secondary: "#775a19",
  onSecondary: "#ffffff",
  secondaryContainer: "#fed488",
  onSecondaryContainer: "#785a1a",

  // Tertiary (Sky Blue)
  tertiary: "#001923",
  onTertiary: "#ffffff",
  tertiaryContainer: "#002f3f",
  onTertiaryContainer: "#7297ab",

  // Neutral
  onSurface: "#1b1c1a",
  onSurfaceVariant: "#44474d",
  outline: "#75777e",
  outlineVariant: "#c5c6ce",

  // Error
  error: "#ba1a1a",
  errorContainer: "#ffdad6",
  onErrorContainer: "#93000a",
};

export const typography = {
  display: {
    fontSize: 48,
    fontWeight: "700" as const,
    lineHeight: 56,
    letterSpacing: -0.02,
  },
  headlineLg: {
    fontSize: 32,
    fontWeight: "600" as const,
    lineHeight: 40,
  },
  headlineLgMobile: {
    fontSize: 24,
    fontWeight: "600" as const,
    lineHeight: 32,
  },
  headlineMd: {
    fontSize: 24,
    fontWeight: "500" as const,
    lineHeight: 32,
  },
  bodyLg: {
    fontSize: 18,
    fontWeight: "400" as const,
    lineHeight: 28,
  },
  bodyMd: {
    fontSize: 16,
    fontWeight: "400" as const,
    lineHeight: 24,
  },
  labelMd: {
    fontSize: 14,
    fontWeight: "600" as const,
    lineHeight: 20,
    letterSpacing: 0.01,
  },
  caption: {
    fontSize: 12,
    fontWeight: "400" as const,
    lineHeight: 16,
  },
};

export const spacing = {
  unit: 8,
  stackSm: 8,
  stackMd: 16,
  stackLg: 32,
  marginMobile: 16,
  marginDesktop: 32,
  gutter: 24,
};

export const borderRadius = {
  sm: 4,
  DEFAULT: 8,
  lg: 16,
  xl: 24,
  full: 9999,
};

export const shadows = {
  // Ambient shadow (navy-tinted)
  ambient: {
    shadowColor: "#04162e",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.06,
    shadowRadius: 24,
    elevation: 4,
  },
  // Subtle lift
  subtle: {
    shadowColor: "#04162e",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
};
