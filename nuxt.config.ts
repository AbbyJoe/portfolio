import { fileURLToPath } from 'node:url'
import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  vite: {
    plugins: [tailwindcss()],
  },
  app: {
    head: {
      htmlAttrs: { lang: 'en', 'data-theme': 'light' },
      title: 'Abiodun Arigbede · Senior Frontend/Product Engineer',
      meta: [
        { name: 'color-scheme', content: 'light dark' },
        { name: 'theme-color', content: '#f4f1ea' },
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
      ],
    },
  },
  runtimeConfig: {
    xaiBaseUrl: '',
    xaiAuthKey: '',
    xaiModel: '',
    xaiMaxTokens: '',
  },
  nitro: {
    serverAssets: [
      {
        baseName: 'portfolio',
        dir: fileURLToPath(new URL('.', import.meta.url)),
        pattern: 'PORTFOLIO.md',
        ignore: ['**/node_modules/**', '**/.git/**', '**/.nuxt/**', '**/.output/**'],
      },
    ],
  },
})
