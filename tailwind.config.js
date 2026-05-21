/** @type {import('tailwindcss').Config} */
/* Aligned with solar-helper/tailwind.config.ts */
const tailwindcssAnimate = require("tailwindcss-animate");

module.exports = {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./faq/index.html",
    "./ur/faq/index.html",
    "./*.js",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Mulish"', "sans-serif"],
        urduUi: ['"Noto Sans Arabic"', "sans-serif"],
        urduHeader: ['"Noto Nastaliq Urdu"', '"Noto Sans Arabic"', "serif"],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "var(--destructive)",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        solar: {
          green: {
            50: "#ecfdf3",
            100: "#d1fae5",
            200: "#a7f3d0",
            300: "#6ee7b7",
            400: "#34d399",
            500: "#10b981",
            600: "#059669",
            700: "#047857",
            800: "#065f46",
            900: "#064e3b",
          },
          blue: {
            50: "#f0f9ff",
            100: "#e0f2fe",
            200: "#bae6fd",
            300: "#7dd3fc",
            400: "#38bdf8",
            500: "#0ea5e9",
            600: "#0284c7",
            700: "#0369a1",
            800: "#075985",
            900: "#0c4a6e",
          },
          slate: {
            50: "#f8fafc",
            100: "#f1f5f9",
            200: "#e2e8f0",
            300: "#cbd5e1",
            400: "#94a3b8",
            500: "#64748b",
            600: "#475569",
            700: "#334155",
            800: "#1e293b",
            900: "#0f172a",
          },
          gold: "#FFB834",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      transitionTimingFunction: {
        smooth: "cubic-bezier(0.22, 1, 0.36, 1)",
        "smooth-in": "cubic-bezier(0.4, 0, 0.2, 1)",
      },
      transitionDuration: {
        verse: "420ms",
        ui: "280ms",
      },
      keyframes: {
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        verseIn: {
          from: { opacity: "0", transform: "translateY(8px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        modalIn: {
          from: { opacity: "0", transform: "translateY(12px) scale(0.98)" },
          to: { opacity: "1", transform: "translateY(0) scale(1)" },
        },
        swipeLeft: {
          "0%": { transform: "translateX(0)", opacity: "1" },
          "100%": { transform: "translateX(-22%)", opacity: "0" },
        },
        swipeRight: {
          "0%": { transform: "translateX(0)", opacity: "1" },
          "100%": { transform: "translateX(22%)", opacity: "0" },
        },
      },
      animation: {
        "fade-in": "fadeIn 0.45s cubic-bezier(0.22, 1, 0.36, 1) forwards",
        "verse-in": "verseIn 0.45s cubic-bezier(0.22, 1, 0.36, 1) forwards",
        "modal-in": "modalIn 0.35s cubic-bezier(0.22, 1, 0.36, 1) forwards",
        "swipe-left": "swipeLeft 0.65s cubic-bezier(0.4, 0, 0.2, 1) forwards",
        "swipe-right": "swipeRight 0.65s cubic-bezier(0.4, 0, 0.2, 1) forwards",
        "list-item-in": "verseIn 0.4s cubic-bezier(0.22, 1, 0.36, 1) forwards",
      },
    },
  },
  plugins: [tailwindcssAnimate],
};
