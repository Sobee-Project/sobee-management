import { nextui } from "@nextui-org/react"
import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))"
      },
      boxShadow: {
        "custom-light": "0 0 10px 0 rgba(0, 0, 0, 0.1)",
        "custom-dark": "0 0 10px 0 rgba(0, 0, 0, 0.5)"
      }
    }
  },
  darkMode: "class",
  plugins: [nextui(), require("tailwindcss-inner-border"), require("tailwind-scrollbar")({ nocompatible: true })]
}
export default config
