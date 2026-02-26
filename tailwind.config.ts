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
        sans: ["var(--font-ubuntu)", "Ubuntu", "sans-serif"],
        display: ["var(--font-display)", "Manrope", "sans-serif"],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        palette: {
          900: "#1E3146",
          800: "#3F5E7B",
          400: "#8EA9C3",
          100: "#D9E0E7",
          50: "#FFFFFF",
        },
      },
    },
  },
  plugins: [],
};
export default config;
