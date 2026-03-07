/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./index.html', './src/**/*.{ts,tsx,js,jsx}'],
	theme: {
		extend: {
			screens: {
				xs: '475px',
			},
			colors: {
				primary: {
					50: '#fdf2f2',
					100: '#fce7e7',
					200: '#f9d2d2',
					300: '#f4adad',
					400: '#ec7a7a',
					500: '#e04d4d',
					600: '#c92e2e',
					700: '#a82424',
					800: '#8B1538',
					900: '#6b0f2a',
					950: '#4a0a1e',
				},
				rccg: {
					// Brand palette (modernized, higher contrast, less saturation)
					red: '#7b1234',
					maroon: '#5b0c24',
					gold: '#c6a24a',
					cream: '#fbf7f1',
					ink: '#0b1220',
				},
				accent: {
					500: '#c6a24a',
					600: '#a88420',
				},
			},
			fontFamily: {
				sans: ['system-ui', 'Segoe UI', 'Roboto', 'sans-serif'],
			},
			container: {
				center: true,
				padding: {
					DEFAULT: '1rem',
					sm: '1.25rem',
					md: '1.5rem',
					lg: '2rem',
					xl: '2.5rem',
					'2xl': '4rem',
				},
				screens: {
					sm: '640px',
					md: '768px',
					lg: '1024px',
					xl: '1280px',
					'2xl': '1400px',
				},
			},
		},
	},
	darkMode: 'class',
	plugins: [],
}

