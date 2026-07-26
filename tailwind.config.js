/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'forge-black': '#000000',
        'forge-dark': '#0a0a0a',
        'forge-gray': '#111111',
        'forge-mid': '#1a1a1a',
        'forge-border': '#222222',
        'forge-muted': '#888888',
        'forge-light': '#f5f5f5',
        'forge-white': '#ffffff',
        'forge-crimson': '#901a1d',
        'forge-crimson-dark': '#6b1315',
        'forge-crimson-light': '#b52025',
      },
      fontFamily: {
        // Override default font-sans so nothing falls back to system-ui/Inter accidentally
        'sans': ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        'display': ['Fraunces', 'Georgia', 'serif'],
        'heading': ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        'body': ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        'mono': ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'float': 'float 8s ease-in-out infinite',
        'scan': 'scan 3s linear infinite',
        'marquee': 'marquee 25s linear infinite',
        'marquee-reverse': 'marquee-reverse 25s linear infinite',
        'pulse-crimson': 'pulseCrimson 3s ease-in-out infinite',
        'fade-up': 'fadeUp 0.7s ease-out forwards',
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'line-grow': 'lineGrow 1s ease-out forwards',
        'counter': 'counter 2s ease-out forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '33%': { transform: 'translateY(-15px) rotate(1deg)' },
          '66%': { transform: 'translateY(-8px) rotate(-1deg)' },
        },
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'marquee-reverse': {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0%)' },
        },
        pulseCrimson: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(144, 26, 29, 0.4)' },
          '50%': { boxShadow: '0 0 50px rgba(144, 26, 29, 0.8)' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        lineGrow: {
          '0%': { width: '0%' },
          '100%': { width: '100%' },
        },
      },
      boxShadow: {
        'crimson': '0 0 40px rgba(144, 26, 29, 0.35)',
        'crimson-sm': '0 0 20px rgba(144, 26, 29, 0.25)',
        'inner-crimson': 'inset 0 0 30px rgba(144, 26, 29, 0.15)',
        'glow': '0 0 80px rgba(144, 26, 29, 0.2)',
      },
    },
  },
  plugins: [],
}
