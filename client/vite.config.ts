import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://api.99digicom.com',
        changeOrigin: true,
        secure: true,
        headers: {
          'X-Requested-With': 'XMLHttpRequest'
        }
      }
    }
  }
});
