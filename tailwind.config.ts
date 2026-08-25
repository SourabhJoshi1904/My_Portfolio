import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#050505",
        accent: "#7C5CFF",
        "accent-soft": "rgba(124,92,255,0.14)",
        muted: "#A0A0A0",
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
      spacing: {
        section: "160px",
        "section-mobile": "96px",
      },
      maxWidth: {
        content: "1200px",
      },
      animation: {
        "spin-slow": "spin 24s linear infinite",
        "pulse-soft": "pulse 3s ease-in-out infinite",
      },
      keyframes: {
        pulse: {
          "0%, 100%": { opacity: "0.5" },
          "50%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
