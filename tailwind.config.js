/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#050505",
        "bg-elevated": "#0a0a0f",
        "bg-card": "#0d0d12",
        border: "rgba(255, 255, 255, 0.06)",
        accent: "#7c5cff",
        "accent-2": "#00d4a8",
        green: "#00d4a8",
        red: "#ff6b6b",
        amber: "#ffb547",
        foreground: "#e7ecf3",
        card: "#0d0d12",
        "card-foreground": "#e7ecf3",
        popover: "#0d0d12",
        "popover-foreground": "#e7ecf3",
        "primary-foreground": "#ffffff",
        "secondary-foreground": "#e7ecf3",
        muted: "#0a0a0f",
        "muted-foreground": "#9aa3b2",
        destructive: "#ff6b6b",
        "destructive-foreground": "#ffffff",
        input: "rgba(255, 255, 255, 0.06)",
        ring: "#7c5cff",
      },
      fontFamily: {
        sans: ["Geist Variable", "Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      fontSize: {
        "label-caps": ["12px", {"lineHeight": "16px", "letterSpacing": "0.1em", "fontWeight": "600"}],
        "headline-lg": ["32px", {"lineHeight": "40px", "letterSpacing": "-0.02em", "fontWeight": "600"}],
        "body-md": ["16px", {"lineHeight": "24px", "letterSpacing": "0em", "fontWeight": "400"}],
        "mono-data": ["14px", {"lineHeight": "20px", "fontWeight": "500"}],
        "headline-lg-mobile": ["24px", {"lineHeight": "32px", "letterSpacing": "-0.02em", "fontWeight": "600"}],
        "display-lg": ["48px", {"lineHeight": "56px", "letterSpacing": "-0.04em", "fontWeight": "700"}],
        "body-sm": ["14px", {"lineHeight": "20px", "letterSpacing": "0em", "fontWeight": "400"}]
      },
      borderRadius: {
        card: "0.75rem",
        xl: "0.75rem",
        lg: "0.5rem",
        full: "9999px"
      },
      spacing: {
        "stack-lg": "32px",
        "unit": "4px",
        "gutter": "24px",
        "container-max": "1280px",
        "stack-sm": "8px",
        "stack-md": "16px",
        "margin-safe": "32px"
      },
    },
  },
  plugins: [],
}
