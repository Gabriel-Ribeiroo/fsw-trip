/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
	],
  theme: {
    extend: {
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },

			backgroundImage: {
				'search-area': 'url(/world-map.png)'
			},
			
			colors: {
				'primary': '#590BD8',
				'primary-lighter': '#DDD5EA',
				'primary-darker': '#312A4F',
			},

			textColor: {
				dark: '#717171'
			}
    },
  },
  plugins: [require("tailwindcss-animate")],
}