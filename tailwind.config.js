/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        obsidian: {
          DEFAULT: '#0a0a0f',
          light: '#12121e',
          dark: '#050508',
        },
        neonCyan: '#00f0ff',
        electricViolet: '#7000ff',
        emeraldGreen: '#00ff9d',
      },
      fontFamily: {
        sans: ['Outfit', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        glowCyan: '0 0 15px rgba(0, 240, 255, 0.35)',
        glowViolet: '0 0 15px rgba(112, 0, 255, 0.35)',
        glowGreen: '0 0 15px rgba(0, 255, 157, 0.35)',
      },
      backgroundImage: {
        'glass-gradient': 'linear-gradient(135deg, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0.01) 100%)',
      }
    },
  },
  plugins: [],
}
