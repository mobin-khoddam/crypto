import daisyui from "daisyui";
import tailwindScrollbar from "tailwind-scrollbar";

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'selector',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "light-color": "#F5F5F5",
        "dark-color": "#212121",
      }
    },
  },
  plugins: [daisyui, tailwindScrollbar],
}
