import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import viteCompression from 'vite-plugin-compression'

export default defineConfig({
	base: process.env.NODE_ENV === 'production' ? '/viet-portfolio/' : '/',
	plugins: [ react(), viteCompression() ],
	css: {
		preprocessorOptions: {
			scss: { additionalData: `@import "./src/styles/variables.scss";` }
		}
	},
	build: {
		rollupOptions: {
			output: {
				manualChunks(id) {
					if (id.includes('node_modules')) {
						return id.toString().split('node_modules/')[1].split('/')[0].toString();
					}
				},
			},
			onwarn(warning, warn) {
				if (warning.code === 'EVAL' && warning.id && /three-stdlib/.test(warning.id)) { return; }
				warn(warning);
			}
		},
		chunkSizeWarningLimit: 1000
	}
})
