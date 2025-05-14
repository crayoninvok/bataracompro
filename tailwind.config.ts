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
        geist: ['var(--font-geist-sans)', "sans-serif"],
        mono: ['var(--font-geist-mono)', "monospace"],
        comfortaa: ['"Comfortaa"', "cursive"],
        inder: ['"Inder"', "cursive"]
      },
    },
  },
  plugins: [],
};

export default config;
