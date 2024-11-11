import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import postCssPxtorem from 'postcss-pxtorem';
import autoprefixer from 'autoprefixer';
import tailwindcss from 'tailwindcss';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
	css: {
		postcss: {
			plugins: [
				tailwindcss(),
				autoprefixer(),
				postCssPxtorem({
					rootValue: 16,
					propList: ['*'],
					selectorBlackList: ['html'],
					minPixelValue: 0,
					unitPrecision: 5,
					replace: true,
					mediaQuery: false,
				})
			]
		}
	}
})
