import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        listen1: 'bounce 1s infinite ease-in-out',
        listen2: 'bounce 1s 0.2s infinite ease-in-out',
        listen3: 'bounce 1s 0.4s infinite ease-in-out',
        listen4: 'bounce 1s 0.6s infinite ease-in-out',
      },
      keyframes: {
        bounce: {
          '0%, 100%': { transform: 'scaleY(1)' },
          '50%': { transform: 'scaleY(0.3)' },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "blackground": "#121212",
        "spotifyGrey": "#212121",
        "spotifyLightGrey": "#535353",

      },
    },
  },
  plugins: [],
};
export default config;
