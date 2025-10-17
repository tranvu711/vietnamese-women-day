/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'float': 'float 18s ease-in-out infinite',
        'float-reverse': 'float 22s ease-in-out infinite reverse',
        'pulse-slow': 'pulse 4s ease-in-out infinite',
        'spin-slow': 'spin 30s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        drift: {
          '0%': { transform: 'translate(0, 0) rotate(0)' },
          '100%': { transform: 'translate(20px, -20px) rotate(8deg)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '0% 50%' },
          '100%': { backgroundPosition: '200% 50%' },
        },
        spin: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
      transformOrigin: {
        'center': 'center',
      },
      perspective: {
        '1000': '1000px',
      },
      rotate: {
        'y-2': 'rotateY(2deg)',
        'x-2': 'rotateX(2deg)',
      },
      backdropBlur: {
        xs: '2px',
      },
      transitionProperty: {
        'transform': 'transform',
      },
    },
  },
  plugins: [],
  safelist: [
    'from-rose-50', 'to-rose-100', 'text-rose-900', 'text-rose-600', 'bg-rose-100', 'text-rose-700', 'bg-rose-600', 'hover:bg-rose-700',
    'from-fuchsia-50', 'to-fuchsia-100', 'text-fuchsia-900', 'text-fuchsia-600', 'bg-fuchsia-100', 'text-fuchsia-700', 'bg-fuchsia-600', 'hover:bg-fuchsia-700',
    'from-purple-50', 'to-purple-100', 'text-purple-900', 'text-purple-600', 'bg-purple-100', 'text-purple-700', 'bg-purple-600', 'hover:bg-purple-700',
    'from-pink-50', 'to-pink-100', 'text-pink-900', 'text-pink-600', 'bg-pink-100', 'text-pink-700', 'bg-pink-600', 'hover:bg-pink-700',
    'from-orange-50', 'to-orange-100', 'text-orange-900', 'text-orange-600', 'bg-orange-100', 'text-orange-700', 'bg-orange-600', 'hover:bg-orange-700',
  ],
}
