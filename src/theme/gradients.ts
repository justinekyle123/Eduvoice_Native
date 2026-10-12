import { colors } from "./colors";

export type Gradient = {
  colors: readonly [string, string, ...string[]];
  start: { x: number; y: number };
  end: { x: number; y: number };
};

const diagonal = { start: { x: 0, y: 0 }, end: { x: 1, y: 1 } };
const horizontal = { start: { x: 0, y: 0.5 }, end: { x: 1, y: 0.5 } };

/** Page canvas: `linear-gradient(135deg, #e8f3ff, #f8faff 47%, #f5edf6)`. */
export const shellGradient: Gradient = {
  colors: [colors.shell.base, colors.shell.soft, colors.shell.warm],
  ...diagonal,
};

/** Deep navy primary action button. */
export const primaryButtonGradient: Gradient = {
  colors: [colors.navy.mid, colors.navy.deep],
  ...horizontal,
};

/** The large "is Eduvoice listening?" orb. */
export const voiceOrbGradient: Gradient = {
  colors: ["#b9e1ff", "#779ee9", "#7771d7", "#555195"],
  ...diagonal,
};

/** The smaller orb on the home voice card. */
export const homeOrbGradient: Gradient = {
  colors: ["#a9d9ff", "#6a88e7", "#5e56a9"],
  ...diagonal,
};

/** Brand mark + default avatar. */
export const brandGradient: Gradient = {
  colors: ["#72b6ff", "#746edc"],
  ...diagonal,
};

export const avatarGradient: Gradient = {
  colors: ["#8ebdf0", "#837bdc"],
  ...diagonal,
};

/** Active microphone control in voice mode. */
export const micActiveGradient: Gradient = {
  colors: ["#559ce9", "#726bd2"],
  ...diagonal,
};

/** Floating microphone in the tab bar. */
export const tabMicGradient: Gradient = {
  colors: ["#67a8ef", "#7169cf"],
  ...diagonal,
};

/** Thin progress bar on the "getting ready" screen. */
export const progressGradient: Gradient = {
  colors: ["#3a84e9", "#687bea"],
  ...horizontal,
};

export const gradients = {
  shell: shellGradient,
  primaryButton: primaryButtonGradient,
  voiceOrb: voiceOrbGradient,
  homeOrb: homeOrbGradient,
  brand: brandGradient,
  avatar: avatarGradient,
  micActive: micActiveGradient,
  tabMic: tabMicGradient,
  progress: progressGradient,
} as const;
