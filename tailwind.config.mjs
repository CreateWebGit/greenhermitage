import { withUt } from "uploadthing/tw";

/** @type {import('tailwindcss').Config} */
export default withUt({
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // 👇 Add CSS variables
        Caveat: ["var(--font-caveat)"],
        Inter: ["var(--font-inter)"],
        forum: ["var(--font-forum)"],
        giestsans: ["var(--font-geist-sans)"],
        giestmono: ["var(--font-geist-mono)"],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        colorTitle: "rgb(var(--color-title) / <alpha-value>)",
      },
    },
  },
  plugins: [],
});
