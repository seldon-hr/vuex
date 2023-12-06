/* Vite nos permite configurar nuestra base de aplicación. */
import { fileURLToPath, URL } from 'url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      /* Permite importar elementos con @ desde la carpeta src */
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
