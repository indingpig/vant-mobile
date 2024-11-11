/** @type {import('tailwindcss').Config} */
export default {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
			// maxWidth: {
			// 	'139.79px': '139.79px',
			// }
		},
		colors: {
			transparent: 'transparent',
      current: 'currentColor',
      'white': '#ffffff',
			lt: {
				blue: 'rgb(22 190 207/var(--tw-bg-opacity));'
			}
		}
  },
  variants: {
    extend: {},
  },
  plugins: [],
}

// tailwind.config.js
// module.exports = {
//   purge: [],
//   darkMode: false, // or 'media' or 'class'
//   theme: {
//     extend: {},
//   },
//   variants: {
//     extend: {},
//   },
//   plugins: [],
// }