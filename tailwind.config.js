/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary": "#222222",

        "secondary": "#ffffff",
        "secondary-100": "#f7f7f7",
        "secondary-200": "#dddddd",
        "secondary-300": "#bbbbbb",
        
        "blue-light": "#b6fbff",
        "blue-meduim": "#83a4d4",
      },
      fontFamily: {
        'sans': 'Lato, sans-serif',
      },
      boxShadow: {
        'md': '#222222 0 0 0 2px, rgba(255, 255, 255, 0.8) 0 0 0 4px',
      }
    },
    boxShadow: {
      '3xl': '12px 12px 24px #9b9b9b, -12px -12px 24px #ffffff',
    },
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    }
  },
  darkMode: 'class',
  plugins: [],
}