/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#0f0f13",
        "bg-elevated": "#1a1a24",
        "bg-card": "#16161f",
        border: "#2d2d3d",
        accent: "#7c5cff",
        "accent-2": "#00d4a8",
        green: "#00d4a8",
        red: "#ff6b6b",
        amber: "#ffb547",
        background: "#0f0f13",
        foreground: "#e7ecf3",
        card: "#16161f",
        "card-foreground": "#e7ecf3",
        popover: "#16161f",
        "popover-foreground": "#e7ecf3",
        primary: "#7c5cff",
        "primary-foreground": "#ffffff",
        secondary: "#1a1a24",
        "secondary-foreground": "#e7ecf3",
        muted: "#1a1a24",
        "muted-foreground": "#9aa3b2",
        destructive: "#ff6b6b",
        "destructive-foreground": "#ffffff",
        input: "#2d2d3d",
        ring: "#7c5cff",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      borderRadius: {
        card: "0.75rem",
        xl: "0.75rem",
      },
    },
  },
  plugins: [],
}
