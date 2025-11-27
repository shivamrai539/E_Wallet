import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/login': 'http://localhost:8686',
      '/register': 'http://localhost:8686',
      '/dashboard-data': 'http://localhost:8686',
      '/transfer': 'http://localhost:8686',
      '/add-funds': 'http://localhost:8686',
      '/logout': 'http://localhost:8686',
      '/profile': 'http://localhost:8686',
    }
  }
})
