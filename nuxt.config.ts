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
      htmlAttrs: { lang: 'en' },
      title: 'Abiodun Arigbede · Senior Frontend/Product Engineer',
      meta: [
        { name: 'color-scheme', content: 'dark light' },
        { name: 'theme-color', content: '#17171a' },
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
})
