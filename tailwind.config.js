/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        bgdark: "#78b0d0",
        bgdarker: "#5c93b3",
        panel: "#8ec2dd",
        panel2: "#6ea3c4",
        steel: "#3d6a89",
        steellight: "#153349",
        flame1: "#ee6c2f",
        flame2: "#f28a45",
        ember: "#c8501c",
        gold: "#f7941d",
        paper: "#f4f6fa",
        paper2: "#eceff5",
        ink: "#131c33",
        inksoft: "#4b5670",
        navy: "#78b0d0",
        navydeep: "#5c93b3",
        footerdark: "#0a1e3a",
        aiBlue1: "#2f6fed",
        aiBlue2: "#5b93ff",
      },
      fontFamily: {
        display: ["Oswald", "sans-serif"],
        body: ["Inter", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      boxShadow: {
        flame: "0 8px 24px -8px rgba(255,91,30,.55)",
      },
    },
  },
  plugins: [],
};
