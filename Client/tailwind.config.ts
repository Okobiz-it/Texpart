import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    borderRadius: {
      none: "0",
      DEFAULT: "4px",
      sm: "4px",
      md: "4px",
      lg: "4px",
      xl: "4px",
      "2xl": "4px",
      "3xl": "4px",
      full: "9999px", // Keep full for circles and pills
    },
    extend: {
      colors: {
        primary: {
          DEFAULT: "#0066CC", // Vibrant corporate buying house blue
          hover: "#0052CC",
          dark: "#003D7A",
          light: "#3385D6",
          surface: "#EBF3FA",
        },
        navy: {
          DEFAULT: "#0A2540",
          deep: "#061730",
          dark: "#0A192F",
          light: "#0F2C59",
          subtle: "#1E3A5F",
        },
        charcoal: {
          DEFAULT: "#0A192F",
          card: "#0F243E",
          surface: "#061730",
        },
        offwhite: {
          DEFAULT: "#FFFFFF",
          alt: "#F8FAFC",
          card: "#FFFFFF",
        },
        forest: {
          DEFAULT: "#0284C7",
          light: "#38BDF8",
          dark: "#0369A1",
        },
        beige: {
          DEFAULT: "#E2E8F0",
          light: "#F1F5F9",
        },
        grey: {
          DEFAULT: "#64748B",
          light: "#94A3B8",
          dark: "#334155",
        },
        orange: {
          DEFAULT: "#0066CC", // Seamlessly mapped to corporate blue
          hover: "#0052CC",
        },
        cyan: {
          DEFAULT: "#0EA5E9",
        },
        blue: {
          DEFAULT: "#0066CC",
          50: "#F0F6FB",
          100: "#E1EEFB",
          200: "#B8DAF7",
          300: "#80BFF1",
          400: "#3D9DE9",
          500: "#0B7DE0",
          600: "#0066CC",
          700: "#0052CC",
          800: "#0A3D80",
          900: "#0A2540",
          950: "#061730",
        },
      },
      fontFamily: {
        heading: ["'Plus Jakarta Sans'", "Manrope", "-apple-system", "sans-serif"],
        body: ["'Inter'", "'DM Sans'", "-apple-system", "sans-serif"],
        serif: ["'Playfair Display'", "Georgia", "serif"],
      },
      animation: {
        'marquee': 'marquee 30s linear infinite',
        'float': 'float 4s ease-in-out infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 8s linear infinite',
        'bounce-gentle': 'bounce 2s ease-in-out infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
      },
      boxShadow: {
        glow: "0 0 40px rgba(0, 102, 204, 0.25)",
        card: "0 2px 8px rgba(10, 37, 64, 0.05)",
        'card-hover': "0 8px 24px rgba(10, 37, 64, 0.10)",
        luxury: "0 15px 35px -10px rgba(10, 37, 64, 0.12)",
      },
    },
  },
  plugins: [],
};

export default config;
