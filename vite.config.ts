import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'url'
import AutoImport from 'unplugin-auto-import/vite'
import graphql from '@rollup/plugin-graphql'
import path from 'path'
import Components from 'unplugin-vue-components/vite'
import svgLoader from 'vite-svg-loader'
import vueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3000,
  },
  plugins: [
    vue(),
    svgLoader(),
    Components({
      dirs: ['src'],
      dts: true,
    }),
    AutoImport({
      imports: ['vue', 'vue-router', '@vueuse/core', '@vueuse/math', 'pinia'],
      vueTemplate: true,
    }),
    graphql(),
    vueI18nPlugin({
      include: [path.resolve(__dirname, './locales/**')],
    }),
  ],
  define: { 'process.env': {} },
  build: {
    chunkSizeWarningLimit: 5000,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
