import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'http://backend:8000',
      '/media': 'http://backend:8000',
      '/adminka': 'http://backend:8000',
    },
  },
  test: {
    environment: 'happy-dom',
    globals: true,
    setupFiles: './src/__tests__/setup.js',
  },
})
