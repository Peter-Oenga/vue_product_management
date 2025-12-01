import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    vue(),
    tailwindcss(),
  ],

  // ✔ IMPORTANT: GitHub Pages base path
  base: '/vue_product_management/',

  // ✔ Output build to docs/ for GitHub Pages
  build: {
    outDir: 'docs'
  }
})
