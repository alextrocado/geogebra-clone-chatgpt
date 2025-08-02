import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
export default defineConfig({
  root: '.',         // <-- Garante que o index.html está na raiz
  plugins: [react()],
  server: {
    port: 5173
  }
})