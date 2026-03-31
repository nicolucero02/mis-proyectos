import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
    "./content/posts/**/*.{md,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        charcoal: "#161311",
        ivory: "#faf6f0",
        sand: "#f4ede1",
        copper: "#c2794f",
        ink: "#111111",
        paper: "#f5efe5",
        ember: "#dc5f31",
        moss: "#45624e",
        gold: "#f0c25e"
      }
    }
  },
  plugins: [require("@tailwindcss/typography")]
};

export default config;
