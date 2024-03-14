import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false, // ou true, dependendo do tema que você está usando
      options: {customProperties: true},
      themes: {
        light: {
          // Seu tema personalizado para o tema claro
        },
        dark: {
          // Seu tema personalizado para o tema escuro
        },
      },
    },
  }
})
