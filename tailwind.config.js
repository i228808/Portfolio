/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: '#0A0A0A',
          light: '#1A1A1A',
          dark: '#050505',
        },
        primary: {
          DEFAULT: '#0A0A0A',
          light: '#1A1A1A',
          dark: '#050505',
        },
        secondary: {
          DEFAULT: '#1A1A1A',
          light: '#2A2A2A',
          dark: '#0A0A0A',
        },
        accent: {
          DEFAULT: '#3B82F6',
          light: '#60A5FA',
          dark: '#2563EB',
        },
        neon: {
          blue: '#00F2FE',
          purple: '#4F46E5',
          pink: '#EC4899',
        },
        text: {
          DEFAULT: '#FFFFFF',
          muted: '#A3A3A3',
        },
        glow: {
          blue: '0 0 20px rgba(59, 130, 246, 0.5)',
          purple: '0 0 20px rgba(79, 70, 229, 0.5)',
          pink: '0 0 20px rgba(236, 72, 153, 0.5)',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['Fira Code', 'monospace'],
        display: ['Space Grotesk', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.5s ease-out',
        'fade-in': 'fadeIn 0.5s ease-out',
        'scale': 'scale 0.3s ease-out',
        'orbit': 'orbit 20s linear infinite',
        'neon-pulse': 'neonPulse 2s ease-in-out infinite',
        'matrix-rain': 'matrixRain 20s linear infinite',
        'hologram': 'hologram 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.5 },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        scale: {
          '0%': { transform: 'scale(0.95)', opacity: 0 },
          '100%': { transform: 'scale(1)', opacity: 1 },
        },
        orbit: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        neonPulse: {
          '0%, 100%': { 
            textShadow: '0 0 10px rgba(59, 130, 246, 0.5), 0 0 20px rgba(59, 130, 246, 0.3)',
            opacity: 1 
          },
          '50%': { 
            textShadow: '0 0 20px rgba(59, 130, 246, 0.8), 0 0 30px rgba(59, 130, 246, 0.5)',
            opacity: 0.8 
          },
        },
        matrixRain: {
          '0%': { backgroundPosition: '0% 0%' },
          '100%': { backgroundPosition: '0% 100%' },
        },
        hologram: {
          '0%, 100%': { 
            opacity: 1,
            filter: 'brightness(1)',
            transform: 'translateY(0)'
          },
          '50%': { 
            opacity: 0.8,
            filter: 'brightness(1.2)',
            transform: 'translateY(-5px)'
          },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-mesh': 'linear-gradient(to right, rgba(59, 130, 246, 0.1), rgba(0, 242, 254, 0.1))',
        'matrix-pattern': 'linear-gradient(0deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
} 