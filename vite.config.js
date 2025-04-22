import { fileURLToPath, URL } from 'node:url'
import fs from 'fs'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/sakura/', // Set the base path for hosting in /sakura
  plugins: [vue(), vueJsx()],
  publicPath: '/sakura/',
  base: '/sakura/',
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    host: true, // listen on all addresses, including LAN and public addresses,
    https: {
      key: fs.readFileSync('certs/selfsigned.key'),
      cert: fs.readFileSync('certs/selfsigned.crt'),
    },
  }
})
