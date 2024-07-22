import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
	base: process.env.NODE_ENV === 'production' ? '/viet-portfolio/' : '/',
	plugins: [react()],
	css: {
		preprocessorOptions: {
			scss: { additionalData: `@import "./src/styles/variables.scss";` }
		}
	}
})
