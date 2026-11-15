import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        charcoal: {
          DEFAULT: "#171A19",
          card: "#202422",
          surface: "#1B1E1D",
        },
        offwhite: {
          DEFAULT: "#F5F3ED",
          alt: "#ECE9DF",
          card: "#FFFFFF",
        },
        forest: {
          DEFAULT: "#234B3B",
          light: "#2D5E4A",
          dark: "#19362A",
        },
        beige: {
          DEFAULT: "#D8C9B5",
          light: "#EBE4D8",
        },
        grey: {
          DEFAULT: "#858782",
          light: "#B4B6B0",
          dark: "#4A4D49",
        },
        orange: {
          DEFAULT: "#E58B48",
          hover: "#D77A35",
        },
        cyan: {
          DEFAULT: "#0EA5E9",
        },
        blue: {
          DEFAULT: "#0284C7",
        },
      },
      fontFamily: {
        heading: ["'Plus Jakarta Sans'", "Manrope", "-apple-system", "sans-serif"],
        body: ["'Inter'", "'DM Sans'", "-apple-system", "sans-serif"],
        serif: ["'Playfair Display'", "Georgia", "serif"],
      },
      boxShadow: {
        glow: "0 0 40px rgba(229, 139, 72, 0.2)",
        luxury: "0 20px 50px rgba(0, 0, 0, 0.4)",
      },
    },
  },
  plugins: [],
};
export default config;
