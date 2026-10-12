import type { TextStyle } from "react-native";

/**
 * Manrope ships one file per weight, so every variant pins an exact family
 * instead of relying on synthetic bolding (which Android renders poorly).
 */
export const fonts = {
  regular: "Manrope_400Regular",
  medium: "Manrope_500Medium",
  semibold: "Manrope_600SemiBold",
  bold: "Manrope_700Bold",
  extrabold: "Manrope_800ExtraBold",
} as const;

export type FontWeight = keyof typeof fonts;

export const textVariants = {
  /** Onboarding hero headline. */
  display: { fontFamily: fonts.extrabold, fontSize: 40, lineHeight: 42, letterSpacing: -2.4 },
  /** Screen titles such as the home greeting. */
  title: { fontFamily: fonts.extrabold, fontSize: 27, lineHeight: 32, letterSpacing: -1.3 },
  /** Section headings. */
  heading: { fontFamily: fonts.extrabold, fontSize: 24, lineHeight: 30, letterSpacing: -1.1 },
  headingSm: { fontFamily: fonts.bold, fontSize: 21, lineHeight: 27, letterSpacing: -0.8 },
  /** Card titles. */
  cardTitle: { fontFamily: fonts.bold, fontSize: 19, lineHeight: 25, letterSpacing: -0.6 },
  /** Lead paragraph / hero supporting copy. */
  lead: { fontFamily: fonts.regular, fontSize: 15, lineHeight: 25, letterSpacing: 0 },
  body: { fontFamily: fonts.regular, fontSize: 13, lineHeight: 21, letterSpacing: 0 },
  bodyMedium: { fontFamily: fonts.medium, fontSize: 13, lineHeight: 21, letterSpacing: 0 },
  bodySm: { fontFamily: fonts.regular, fontSize: 12, lineHeight: 19, letterSpacing: 0 },
  /** Button + tab labels. */
  label: { fontFamily: fonts.bold, fontSize: 11, lineHeight: 15, letterSpacing: 0.1 },
  labelSm: { fontFamily: fonts.bold, fontSize: 10, lineHeight: 14, letterSpacing: 0.2 },
  labelLg: { fontFamily: fonts.semibold, fontSize: 14, lineHeight: 20, letterSpacing: -0.2 },
  caption: { fontFamily: fonts.medium, fontSize: 9, lineHeight: 13, letterSpacing: 0.2 },
  eyebrow: { fontFamily: fonts.extrabold, fontSize: 11, lineHeight: 14, letterSpacing: 1.5, textTransform: "uppercase" },
  cardLabel: { fontFamily: fonts.extrabold, fontSize: 10, lineHeight: 13, letterSpacing: 1.3, textTransform: "uppercase" },
} as const satisfies Record<string, TextStyle>;

export type TextVariant = keyof typeof textVariants;
