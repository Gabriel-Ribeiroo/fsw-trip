/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
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
		}
  },
  plugins: [],
}
