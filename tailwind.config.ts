import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poetsen: ['"Poetsen One"', "cursive"],
        geist: ["var(--font-geist-sans)", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
        comfortaa: ['"Comfortaa"', "cursive"],
        inder: ['"Inder"', "cursive"],
      },
      animation: {
        "bounce-slow": "bounce 3s infinite",
        "spin-slow": "spin 4s linear infinite",
        "bounce-dots": "bounceDot 1.4s infinite",
      },
      keyframes: {
        bounceDot: {
          "0%, 80%, 100%": { transform: "translateY(0)" },
          "40%": { transform: "translateY(-6px)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
