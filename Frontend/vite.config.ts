import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss()],
  build: {
    outDir: './build_output', // Change 'build_output' to your desired folder name
  }
})
