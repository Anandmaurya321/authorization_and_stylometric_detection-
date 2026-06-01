/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['Syne', 'sans-serif'],
        body: ['DM Sans', 'sans-serif'],
        mono: ['DM Mono', 'monospace'],
      },
      colors: {
        void: '#05050f',
        ink: '#0b0b1a',
        surface: '#10101f',
        panel: '#141428',
        border: '#1e1e3a',
        'border-bright': '#2d2d52',
        cyan: {
          glow: '#00e5ff',
          500: '#06b6d4',
          400: '#22d3ee',
        },
        violet: {
          glow: '#a855f7',
          500: '#8b5cf6',
          400: '#a78bfa',
        },
        rose: {
          glow: '#f43f5e',
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'mesh-1': 'radial-gradient(ellipse 80% 50% at 20% 40%, rgba(120,40,200,0.15), transparent)',
        'mesh-2': 'radial-gradient(ellipse 60% 60% at 80% 20%, rgba(0,200,255,0.10), transparent)',
        'mesh-3': 'radial-gradient(ellipse 50% 70% at 60% 80%, rgba(100,20,180,0.08), transparent)',
      },
      boxShadow: {
        'glow-cyan': '0 0 30px rgba(0,229,255,0.25), 0 0 60px rgba(0,229,255,0.10)',
        'glow-violet': '0 0 30px rgba(168,85,247,0.25), 0 0 60px rgba(168,85,247,0.10)',
        'glow-sm': '0 0 15px rgba(0,229,255,0.15)',
        'glass': '0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease forwards',
        'fade-up': 'fadeUp 0.6s ease forwards',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'spin-slow': 'spin 2s linear infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'scan': 'scan 2s ease-in-out infinite',
        'result-in': 'resultIn 0.7s cubic-bezier(0.16,1,0.3,1) forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        float: {
          '0%,100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        scan: {
          '0%,100%': { transform: 'scaleX(0)', opacity: '0' },
          '50%': { transform: 'scaleX(1)', opacity: '1' },
        },
        resultIn: {
          '0%': { opacity: '0', transform: 'scale(0.92) translateY(16px)' },
          '100%': { opacity: '1', transform: 'scale(1) translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
