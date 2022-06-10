/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/pages/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			colors: {
				primary: 'rgb(74, 0, 224)',
				secondary: 'rgb(142, 45, 226)',
			},
		},
	},
	plugins: [],
};
