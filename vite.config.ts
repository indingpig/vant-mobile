import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
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
	server: {
		proxy: {
			'/api/v1': {
				// target: 'http://localhost:8080',
				target: "https://config.grandlmoon.com",
				changeOrigin: true,
				secure: false,
				// rewrite: (path) => path.replace(/^\/api/, '')
			},
			'/profile/upload': {
				// target: 'http://localhost:8080',
				// https://config.grandlmoon.com/profile/upload/2025/01/13/%E4%B8%BB%E5%9B%BE%E4%BF%AE%E6%94%B9%E7%89%88_20250113103614A005.jpg
				target: "https://config.grandlmoon.com",
				changeOrigin: true,
				secure: false,
				// rewrite: (path) => path.replace(/^\/api/, '')
			}
		}
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
});
