/** @type {import('tailwindcss').Config} */
module.exports = {
  // NativeWind scans these files for utility classes.
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")], // Required for NativeWind v4+
  theme: {
    extend: {
      // "Eduvoice" palette — mirrors Design/src/index.css.
      colors: {
        // Backdrop layers of the app shell
        shell: {
          DEFAULT: "#e8f3ff",
          soft: "#f8faff",
          warm: "#f5edf6",
        },
        // Text hierarchy
        ink: {
          DEFAULT: "#121a29",
          strong: "#1d2635",
          deep: "#131d2d",
        },
        muted: {
          DEFAULT: "#6b7487",
          soft: "#8a92a1",
          faint: "#a3aab7",
        },
        // Interactive blues
        accent: {
          DEFAULT: "#4f91e9",
          deep: "#397fe4",
          soft: "#69a4eb",
          ink: "#5c76a5",
          // Colour of the highlighted line in the onboarding headline
          headline: "#416a9b",
        },
        // Solid dark buttons and the mic control
        navy: {
          DEFAULT: "#172131",
          deep: "#0d1420",
          mid: "#222d3d",
          soft: "#1c2635",
        },
        success: "#54a788",
        sunken: "#f1f3f7",
        // Accent tints used by onboarding interest cards
        mint: { DEFAULT: "#197b66", tint: "#c9eee1" },
        sky: { DEFAULT: "#316cac", tint: "#d6e8ff" },
        gold: { DEFAULT: "#a87513", tint: "#feebbb" },
        lavender: { DEFAULT: "#5f5c99", tint: "#deddf4" },
        violet: { DEFAULT: "#56458a", tint: "#d7cdf0" },
      },
      borderRadius: {
        control: 14,
        chip: 18,
        card: 24,
        panel: 28,
        shell: 46,
      },
      // Manrope ships one file per weight, so bold never falls back to synthesis.
      fontFamily: {
        manrope: ["Manrope_400Regular"],
        "manrope-medium": ["Manrope_500Medium"],
        "manrope-semibold": ["Manrope_600SemiBold"],
        "manrope-bold": ["Manrope_700Bold"],
        "manrope-extrabold": ["Manrope_800ExtraBold"],
      },
    },
  },
  plugins: [],
};
