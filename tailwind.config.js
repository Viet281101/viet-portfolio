/** @type {import('tailwindcss').Config} */
export default {
	content: [
		"./index.html",
		"./src/**/*.{js,ts,jsx,tsx}",
		"./src/**/*.{scss,css}"
	],
	theme: {
		extend: {
			screens: {
				'custom': '940px',
			},
		},
	},
	variants: {},
	plugins: [],
}
