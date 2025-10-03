/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './data/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  safelist: [
    // Gradient classes used in components
    'from-blue-500',
    'to-cyan-500',
    'from-purple-500',
    'to-pink-500',
    'from-green-500',
    'to-emerald-500',
    'from-orange-500',
    'to-red-500',
    'from-cyan-500',
    'to-blue-500',
    'from-violet-500',
    'to-purple-500',
    'from-pink-500',
    'to-rose-500',
    'from-indigo-500',
    'from-teal-500',
    'to-green-500',
    'from-red-500',
    'from-amber-500',
    'to-yellow-500',
    'from-fuchsia-500',
    'from-sky-500',
    // Background gradient classes
    'bg-gradient-to-br',
    // Opacity classes
    'bg-opacity-20',
    'bg-opacity-30',
    'bg-opacity-50',
    'bg-opacity-70',
    'bg-opacity-80',
    'bg-opacity-90'
  ],
  theme: {
    extend: {
      animation: {
        'fadeIn': 'fadeIn 0.5s ease-out',
        'slideUp': 'slideUp 0.6s ease-out'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        }
      }
    },
  },
  plugins: [],
}
