import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import {resolve} from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      "components": resolve(__dirname, "./src/components"),
      "api": resolve(__dirname, "./src/api"),
    }
  },css: {
    // css预处理器
    preprocessorOptions: {
      scss: {
        // charset: false,
        additionalData: `@use "./src/assets/css/variable.scss" as *;`,
      },
    },
  },
  build: {
    outDir: 'dist',
  },

})
