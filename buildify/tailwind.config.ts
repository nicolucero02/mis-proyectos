import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#09090b",
        foreground: "#f4f4f5",
        muted: "#18181b",
        border: "rgba(255,255,255,0.08)",
        accent: "#8b5cf6",
        success: "#34d399",
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(255,255,255,0.06), 0 20px 80px rgba(139, 92, 246, 0.18)",
      },
      backgroundImage: {
        "radial-glow":
          "radial-gradient(circle at top, rgba(139,92,246,0.24), transparent 34%), radial-gradient(circle at 80% 20%, rgba(34,197,94,0.16), transparent 22%)",
      },
      animation: {
        float: "float 8s ease-in-out infinite",
        pulseSoft: "pulseSoft 1.6s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        pulseSoft: {
          "0%, 100%": { opacity: "0.55" },
          "50%": { opacity: "1" },
        },
      },
      fontFamily: {
        sans: ["IBM Plex Sans", "SF Pro Display", "Segoe UI", "sans-serif"],
      },
      borderRadius: {
        "4xl": "2rem",
      },
    },
  },
  plugins: [],
};

export default config;
