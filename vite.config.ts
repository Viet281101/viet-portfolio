import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import viteCompression from 'vite-plugin-compression'

export default defineConfig({
	base: process.env.NODE_ENV === 'production' ? '/viet-portfolio/' : '/',
	plugins: [react(), viteCompression()],
	css: {
		preprocessorOptions: { scss: { additionalData: `@import "./src/styles/variables.scss";` } }
	},
	build: {
		rollupOptions: {
			output: {
				manualChunks(id) {
					if (id.includes('node_modules')) {
						const directories = id.toString().split('node_modules/');
						if (directories.length > 1) {
							const chunkName = directories[1].split('/')[0];
							if (chunkName && [
								'@mediapipe', '@monogrid', 'bidi-js', 'camera-controls', 'detect-gpu', 'hls.js', 
								'maath', 'meshline', 'potpack', 'prop-types', 'stats-gl', 'stats.js', 
								'three-mesh-bvh', 'troika-three-text', 'troika-three-utils', 'troika-worker-utils', 
								'uuid', 'webgl-sdf-generator'
							].includes(chunkName)) { return chunkName; }
						}
					}
				},
			},
			onwarn(warning, warn) {
				if (warning.code === 'EVAL' && warning.id && /three-stdlib/.test(warning.id)) { return; }
				warn(warning);
			}
		},
		// sourcemap: false,
		chunkSizeWarningLimit: 1000
	}
})
