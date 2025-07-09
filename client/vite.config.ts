import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    },
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          ui: ['lucide-react', 'react-toastify']
        }
      }
    }
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
