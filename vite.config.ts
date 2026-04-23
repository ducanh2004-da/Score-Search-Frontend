import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite' // 1. Thêm dòng import này

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), // 2. Thêm hàm này vào mảng plugins
  ],
})