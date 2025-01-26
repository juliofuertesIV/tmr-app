import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      keyframes: {
        dropdown: {
            "0%":{ top: "-2rem" },
            "50%":{ top: "3rem" },
            "70%":{ top: "2.3rem" },
            "90%":{ top: "2.7rem" },
            "100%":{ top: "2.5rem" },
        }
      },
      animation: {
        "dropdown": "dropdown .5s ease-in forwards"
      }
    },
  },
  plugins: [],
};
export default config;
