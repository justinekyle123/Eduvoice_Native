/** @type {import('tailwindcss').Config} */
module.exports = {
  // ⚠️ Make sure "./src/**/*.{js,jsx,ts,tsx}" is included!
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", 
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}"
  ],
  presets: [require("nativewind/preset")], // Required for NativeWind v4+
  theme: {
    extend: {},
  },
  plugins: [],
}
