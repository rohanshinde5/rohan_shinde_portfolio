import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
      }
    }
  },
  build: {
    // Suppress the chunk size warning (Three.js bundles are inherently large)
    chunkSizeWarningLimit: 1600,
    rollupOptions: {
      output: {
        // Code-split heavy libraries into separate cached chunks
        manualChunks: {
          'vendor-react': ['react', 'react-dom'],
          'vendor-three': ['three'],
          'vendor-r3f': ['@react-three/fiber', '@react-three/drei'],
          'vendor-motion': ['framer-motion'],
          'vendor-lenis': ['lenis'],
        }
      }
    }
  }
})
