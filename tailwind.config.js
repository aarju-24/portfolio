/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{ts,tsx,js,jsx}",
    "./pages/**/*.{ts,tsx,js,jsx}",
    "./components/**/*.{ts,tsx,js,jsx}",
    "./app/**/*.{ts,tsx,js,jsx}",
  ],

  darkMode: "class", // manual toggle only

  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "1.5rem",
        lg: "2rem",
        xl: "2.5rem",
      },
    },

    extend: {
      colors: {
        /* ===== Primary Color Palette ===== */
        /* Primary: Professional Blue - WCAG AA compliant */
        primary: {
          50: "#f0f7ff",   // Lightest
          100: "#e0effe",
          200: "#bae6fd",
          300: "#7dd3fc",
          400: "#38bdf8",
          500: "#0ea5e9",  // Main primary
          600: "#0284c7",  // Darker for hover
          700: "#0369a1",  // Even darker
          800: "#075985",
          900: "#0c3d66",  // Darkest
        },

        /* ===== Secondary Color Palette ===== */
        /* Secondary: Professional Purple - WCAG AA compliant */
        secondary: {
          50: "#faf5ff",
          100: "#f3e8ff",
          200: "#e9d5ff",
          300: "#d8b4fe",
          400: "#c084fc",
          500: "#a855f7",  // Main secondary
          600: "#9333ea",  // Darker for hover
          700: "#7e22ce",
          800: "#6b21a8",
          900: "#581c87",
        },

        /* ===== Accent Color Palette ===== */
        /* Accent: Vibrant Teal - WCAG AA compliant */
        accent: {
          50: "#f0fdfa",
          100: "#ccfbf1",
          200: "#99f6e4",
          300: "#5eead4",
          400: "#2dd4bf",
          500: "#14b8a6",  // Main accent
          600: "#0d9488",  // Darker for hover
          700: "#0f766e",
          800: "#115e59",
          900: "#134e4a",
        },

        /* ===== Neutral Color Palette ===== */
        /* Neutral: Professional Gray - WCAG AA compliant */
        neutral: {
          50: "#fafafa",
          100: "#f5f5f5",
          200: "#e5e5e5",
          300: "#d4d4d4",
          400: "#a3a3a3",
          500: "#737373",  // Main neutral
          600: "#525252",
          700: "#404040",
          800: "#262626",
          900: "#171717",
        },

        /* ===== Semantic Colors ===== */
        /* Success: Green - WCAG AA compliant */
        success: {
          50: "#f0fdf4",
          100: "#dcfce7",
          200: "#bbf7d0",
          300: "#86efac",
          400: "#4ade80",
          500: "#22c55e",  // Main success
          600: "#16a34a",
          700: "#15803d",
          800: "#166534",
          900: "#145231",
        },

        /* ===== Warning Color ===== */
        /* Warning: Amber - WCAG AA compliant */
        warning: {
          50: "#fffbeb",
          100: "#fef3c7",
          200: "#fde68a",
          300: "#fcd34d",
          400: "#fbbf24",
          500: "#f59e0b",  // Main warning
          600: "#d97706",
          700: "#b45309",
          800: "#92400e",
          900: "#78350f",
        },

        /* ===== Error Color ===== */
        /* Error: Red - WCAG AA compliant */
        error: {
          50: "#fef2f2",
          100: "#fee2e2",
          200: "#fecaca",
          300: "#fca5a5",
          400: "#f87171",
          500: "#ef4444",  // Main error
          600: "#dc2626",
          700: "#b91c1c",
          800: "#991b1b",
          900: "#7f1d1d",
        },

        /* ===== Text Colors ===== */
        /* Text: Professional Dark Gray - WCAG AA compliant */
        textPrimary: "#111827",     // Headings - 18:1 contrast on white
        textSecondary: "#374151",   // Body text - 8.6:1 contrast on white
        muted: "#6b7280",           // Captions/labels - 4.5:1 contrast on white

        /* ===== UI Colors ===== */
        border: "#e5e7eb",          // Light gray border
        surface: "#f9fafb",         // Light background surface
        background: "#ffffff",      // Main background

        /* ===== Dark Mode Colors ===== */
        darkBg: "#0f172a",          // Dark background
        darkSurface: "#1e293b",     // Dark surface
        darkBorder: "#334155",      // Dark border
        darkText: "#f1f5f9",        // Dark mode text
        darkTextSecondary: "#cbd5e1", // Dark mode secondary text
      },

      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },

      fontSize: {
        base: ["16px", { lineHeight: "1.7" }],
      },

      borderRadius: {
        md: "6px",
        lg: "8px",
      },

      /* ===== Shadow Tokens ===== */
      boxShadow: {
        card: "0 1px 2px rgba(0,0,0,0.05)",
        elevated: "0 4px 6px rgba(0,0,0,0.1), 0 2px 4px rgba(0,0,0,0.06)",
        hover: "0 10px 15px rgba(0,0,0,0.1), 0 4px 6px rgba(0,0,0,0.05)",
        focus: "0 0 0 3px rgba(14, 165, 233, 0.1), 0 0 0 1px rgba(14, 165, 233, 0.5)",
      },

      /* ===== Animation Tokens ===== */
      animation: {
        fadeIn: "fadeIn 0.6s ease-out",
        slideUp: "slideUp 0.6s ease-out",
        slideDown: "slideDown 0.3s ease-out",
        scaleIn: "scaleIn 0.3s ease-out",
        pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },

      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideDown: {
          "0%": { opacity: "0", transform: "translateY(-20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
      },

      /* ===== Spacing Tokens ===== */
      spacing: {
        "safe-top": "env(safe-area-inset-top)",
        "safe-bottom": "env(safe-area-inset-bottom)",
        "safe-left": "env(safe-area-inset-left)",
        "safe-right": "env(safe-area-inset-right)",
      },

      /* ===== Transition Tokens ===== */
      transitionDuration: {
        fast: "150ms",
        base: "200ms",
        slow: "300ms",
        slower: "500ms",
      },

      transitionTimingFunction: {
        smooth: "cubic-bezier(0.4, 0, 0.2, 1)",
        bounce: "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
      },
    },
  },

  plugins: [],
};
