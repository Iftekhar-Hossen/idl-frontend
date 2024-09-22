/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./app/**/*.{js,jsx}",
    "./src/**/*.{js,jsx}",
    "./node_modules/react-tailwindcss-select/dist/index.esm.js",
  ],
  prefix: "",
  theme: {
    screens: {
      "2xl": { min: "1310px" },
      xl: { max: "1300px" },
      lg: { max: "1200px" },
      md: { max: "992px",  },
      sm: { max: "767px", min: "0px" },
    },
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "1rem",
        md: "0rem",
        lg: "0rem",
        xl: "0rem",
      },
      screens: {
        "2xl": "1280px",
        xl: "1140px",
        lg: "960px",
        md: "720px",
        // sm: "500px"
      },
    },
    extend: {
      fontFamily: {
        saol: "var(--font-saol)",
        roboto: "var(--font-roboto)",
      },
      filter: {
        primary:
          "brightness(0) saturate(100%) invert(48%) sepia(5%) saturate(4631%) hue-rotate(343deg) brightness(99%) contrast(59%)",
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#a07758",
          foreground: "hsl(var(--primary-foreground))",
          50: "#f6f1ee",
          75: "#d8c7bb",
          100: "#c8b09e",
          200: "#b08e74",
          300: "#a07758",
          400: "#70533e",
          500: "#624936",
          filtered:
            " filter: brightness(0) saturate(100%) invert(48%) sepia(5%) saturate(4631%) hue-rotate(343deg) brightness(99%) contrast(59%);",
        },
        secondary: {
          DEFAULT: "#f6f3ec",
          foreground: "hsl(var(--secondary-foreground))",
          50: "#fefefd",
          75: "#fbfaf7",
          100: "#faf8f4",
          200: "#f8f5ef",
          300: "#f6f3ec",
          400: "#acaaa5",
          500: "#969490",
        },
        neutral: {
          DEFAULT: "#1d1d1d",
          foreground: "hsl(var(--neutral-foreground))",
          50: "#e8e8e8",
          75: "#a2a2a2",
          100: "#7c7c7c",
          200: "#434343",
          300: "#1d1d1d",
          400: "#141414",
          500: "#121212",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
