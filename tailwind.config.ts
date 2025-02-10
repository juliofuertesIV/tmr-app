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
        moveIn: {
            "0%":{ top: "-2rem" },
            "50%":{ top: "3rem" },
            "70%":{ top: "2.3rem" },
            "90%":{ top: "2.7rem" },
            "100%":{ top: "2.5rem" },
        },
        moveOut: {
            "0%":{ top: "2.5rem" },
            "30%":{ top: "3rem" },
            "100%":{ top: "-5rem" }
        }
      },
      animation: {
        "moveIn": "moveIn .5s ease-in forwards",
        "moveOut": "moveOut .5s ease-out backwards"
      }
    },
  },
  plugins: [],
};
export default config;
