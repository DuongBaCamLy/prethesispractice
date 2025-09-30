import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/v1': {
        target: 'http://localhost:8082', // hoặc 8081 nếu backend của bạn ở đó
        changeOrigin: true,
      },
    },
  },
})