/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'forge-black': '#0D0D0D',
        'forge-dark': '#1A1A1A',
        'forge-gray': '#2A2A2A',
        'forge-light': '#F7F7F7',
        'forge-white': '#FFFFFF',
        'forge-crimson': '#901a1d',
        'forge-crimson-dark': '#701518',
        'forge-crimson-light': '#a82023',
      },
      fontFamily: {
        'heading': ['Poppins', 'sans-serif'],
        'body': ['Inter', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 4s ease-in-out infinite',
        'pulse-slow': 'pulseSlow 8s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'pulse-slow-reverse': 'pulseSlowReverse 10s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'ember': 'ember 3s ease-out infinite',
        'flame': 'flame 1.5s ease-in-out infinite',
        'slide-up': 'slideUp 0.6s ease-out',
        'fade-in': 'fadeIn 0.8s ease-out',
        'scale-in': 'scaleIn 0.5s ease-out',
        'ripple': 'ripple 0.6s linear',
        'spin-slow': 'spin 20s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%, 100%': { boxShadow: 'inset 0 0 60px rgba(177, 18, 38, 0.1)' },
          '50%': { boxShadow: 'inset 0 0 100px rgba(177, 18, 38, 0.2)' },
        },
        pulseSlow: {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.15' },
          '50%': { transform: 'scale(1.2)', opacity: '0.25' },
        },
        pulseSlowReverse: {
          '0%, 100%': { transform: 'scale(1.2)', opacity: '0.1' },
          '50%': { transform: 'scale(1)', opacity: '0.2' },
        },
        ember: {
          '0%': { transform: 'translateY(0) scale(1)', opacity: 1 },
          '100%': { transform: 'translateY(-100px) scale(0)', opacity: 0 },
        },
        flame: {
          '0%, 100%': { transform: 'scaleY(1) scaleX(1)' },
          '50%': { transform: 'scaleY(1.1) scaleX(0.95)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(40px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.9)', opacity: 0 },
          '100%': { transform: 'scale(1)', opacity: 1 },
        },
        ripple: {
          '0%': { transform: 'scale(0)', opacity: 1 },
          '100%': { transform: 'scale(4)', opacity: 0 },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'forge-gradient': 'linear-gradient(135deg, #0D0D0D 0%, #1A1A1A 50%, #0D0D0D 100%)',
        'crimson-gradient': 'linear-gradient(135deg, #8B1C1C 0%, #B11226 50%, #D4202C 100%)',
      },
      boxShadow: {
        'crimson': '0 0 30px rgba(177, 18, 38, 0.3)',
        'crimson-lg': '0 0 60px rgba(177, 18, 38, 0.4)',
        'dark': '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
      },
    },
  },
  plugins: [],
}
