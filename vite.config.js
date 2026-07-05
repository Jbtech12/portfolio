import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Three.js + R3F are heavy (~700KB) — isolate so they don't block main bundle
          'three-vendor': ['three', '@react-three/fiber', '@react-three/drei'],
          // GSAP in its own chunk
          'gsap-vendor': ['gsap'],
          // React core
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
        },
      },
    },
    // Warn at 400KB, error at 600KB per chunk
    chunkSizeWarningLimit: 600,
  },
})
