module.exports = {
  content: [
    "./client/index.html",
    "./client/src/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{html,js,ts,jsx,tsx}",
    "app/**/*.{ts,tsx}",
    "components/**/*.{ts,tsx}",
  ],
  corePlugins: { preflight: true },
  theme: {
    extend: {
      /* === SEMANTIC COLOR PALETTE === */
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
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
        /* === GATHERGO UNICORN PALETTE === */
        emerald: {
          DEFAULT: "hsl(var(--emerald))",
          deep: "hsl(var(--emerald-deep))",
          light: "hsl(var(--emerald-light))",
          surface: "hsl(var(--emerald-surface))",
        },
        cream: {
          DEFAULT: "hsl(var(--cream))",
          deep: "hsl(var(--cream-deep))",
          warm: "hsl(var(--cream-warm))",
        },
        ink: {
          DEFAULT: "hsl(var(--ink))",
          light: "hsl(var(--ink-light))",
        },
        coral: {
          DEFAULT: "hsl(var(--coral))",
          light: "hsl(var(--coral-light))",
        },
        sunset: {
          DEFAULT: "hsl(var(--sunset))",
        },
        champagne: {
          DEFAULT: "hsl(var(--champagne))",
          light: "hsl(var(--champagne-light))",
        },
        mint: {
          DEFAULT: "hsl(var(--mint))",
          light: "hsl(var(--mint-light))",
        },
        rose: {
          DEFAULT: "hsl(var(--rose))",
        },
        clay: {
          DEFAULT: "hsl(var(--clay))",
        },
      },

      /* === TYPOGRAPHY SCALE === */
      fontSize: {
        micro: ["10px", { lineHeight: "1.2", letterSpacing: "0.22em", fontWeight: "600" }],
        label: ["11px", { lineHeight: "1.3", letterSpacing: "0.05em", fontWeight: "600" }],
        body: ["13px", { lineHeight: "1.5" }],
        lead: ["15px", { lineHeight: "1.5" }],
        title: ["18px", { lineHeight: "1.2", letterSpacing: "-0.02em", fontWeight: "700" }],
        heading: ["22px", { lineHeight: "1.2", letterSpacing: "-0.03em", fontWeight: "800" }],
        hero: ["28px", { lineHeight: "1.15", letterSpacing: "-0.04em", fontWeight: "900" }],
        display: ["36px", { lineHeight: "1.05", letterSpacing: "-0.05em", fontWeight: "900" }],
      },

      /* === SPACING TOKENS === */
      spacing: {
        bento: "12px",
        "bento-tight": "8px",
      },

      /* === BORDER RADIUS === */
      borderRadius: {
        glass: "24px",
        pill: "100px",
        "2xl": "20px",
        "3xl": "28px",
        "4xl": "32px",
      },

      /* === ANIMATIONS === */
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        /* === SPRING PHYSICS === */
        "spring-in": {
          "0%": { transform: "scale(0.8)", opacity: "0" },
          "50%": { transform: "scale(1.03)", opacity: "1" },
          "70%": { transform: "scale(0.97)" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        "spring-up": {
          "0%": { transform: "translateY(30px)", opacity: "0" },
          "60%": { transform: "translateY(-4px)", opacity: "1" },
          "80%": { transform: "translateY(2px)" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        /* === AMBIENT GLOW === */
        "glow-pulse": {
          "0%, 100%": { opacity: "0.4", transform: "scale(1)" },
          "50%": { opacity: "0.8", transform: "scale(1.1)" },
        },
        /* === SHIMMER === */
        "shimmer-sweep": {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
        /* === FLOAT 3D === */
        "float-3d": {
          "0%, 100%": { transform: "translateY(0) rotateX(0deg)" },
          "50%": { transform: "translateY(-8px) rotateX(2deg)" },
        },
        /* === BREATHE === */
        breathe: {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.03)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "spring-in": "spring-in 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
        "spring-up": "spring-up 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
        "glow-pulse": "glow-pulse 4s ease-in-out infinite",
        "shimmer-sweep": "shimmer-sweep 2s ease-in-out infinite",
        "float-3d": "float-3d 6s ease-in-out infinite",
        "breathe": "breathe 3s ease-in-out infinite",
      },
    },
    container: { center: true, padding: "2rem", screens: { "2xl": "1400px" } },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
  darkMode: ["class"],
};
