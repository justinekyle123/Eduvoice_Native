/**
 * Raw Eduvoice palette (mirrors `Design/src/index.css`).
 *
 * Prefer the Tailwind tokens declared in `tailwind.config.js` (`text-ink`,
 * `bg-white/55`, ...) when styling. Reach for these values only where a
 * className cannot be used: gradients, SVG fills and animated styles.
 */
export const colors = {
  shell: {
    base: "#e8f3ff",
    soft: "#f8faff",
    warm: "#f5edf6",
    top: "#edf7ff",
  },
  ambient: {
    pink: "#ffe1ec",
    blue: "#c0ddff",
    blush: "#efcfdf",
    sky: "#bbd7f6",
  },
  ink: {
    base: "#121a29",
    strong: "#1d2635",
    deep: "#131d2d",
  },
  muted: {
    base: "#6b7487",
    soft: "#8a92a1",
    faint: "#a3aab7",
  },
  accent: {
    base: "#4f91e9",
    deep: "#397fe4",
    soft: "#69a4eb",
    ink: "#5c76a5",
    headline: "#416a9b",
  },
  navy: {
    base: "#172131",
    deep: "#0d1420",
    mid: "#222d3d",
    soft: "#1c2635",
  },
  success: "#54a788",
  white: "#ffffff",
  texture: "#47679c",
} as const;

export type ColorName = keyof typeof colors;
