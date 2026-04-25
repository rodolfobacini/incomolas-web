import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-display)", "Barlow Condensed", "sans-serif"],
        body: ["var(--font-body)", "Barlow", "sans-serif"],
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },
      colors: {
        bg: {
          DEFAULT: "#0E0E0F",
          2: "#161618",
          3: "#1E1E21",
          4: "#28282C",
        },
        border: {
          DEFAULT: "#32323A",
          2: "#44444E",
        },
        text: {
          1: "#F2F1EF",
          2: "#A8A7A4",
          3: "#6B6A68",
        },
        accent: {
          DEFAULT: "oklch(66% 0.19 38)",
          dk: "oklch(54% 0.19 38)",
          lt: "oklch(76% 0.15 38)",
          bg: "oklch(20% 0.06 38)",
          border: "oklch(30% 0.10 38)",
        },
        steel: {
          DEFAULT: "oklch(66% 0.19 230)",
          dk: "oklch(54% 0.19 230)",
          bg: "oklch(18% 0.06 230)",
          border: "oklch(28% 0.10 230)",
        },
        green: {
          DEFAULT: "oklch(66% 0.19 145)",
          bg: "oklch(18% 0.06 145)",
          border: "oklch(28% 0.10 145)",
        },
      },
      borderRadius: {
        sm: "4px",
        md: "8px",
        lg: "12px",
      },
      maxWidth: {
        container: "1280px",
      },
      backdropBlur: {
        nav: "12px",
      },
    },
  },
  plugins: [],
};

export default config;
