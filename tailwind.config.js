/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#07080a",
        paper: "#f0f0e9",
        muted: "#989c99",
        lime: "#d8ff58",
        violet: "#a786ff",
        coral: "#ff806d",
        cyan: "#7ff3da",
      },
      fontFamily: {
        sans: ["var(--font-jakarta)", "'Plus Jakarta Sans'", "sans-serif"],
        display: ["var(--font-syne)", "'Syne'", "sans-serif"],
        serif: ["var(--font-serif)", "'Instrument Serif'", "serif"],
        mono: ["var(--font-mono)", "'JetBrains Mono'", "monospace"],
      },
      animation: {
        'spin-slow': 'spin 20s linear infinite',
      }
    },
  },
  plugins: [],
};
