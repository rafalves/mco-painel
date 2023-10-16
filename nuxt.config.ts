// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: false,
  modules: [
    '@nuxtjs/tailwindcss'
  ],
  css: ["@/assets/css/main.css", "primevue/resources/themes/lara-light-blue/theme.css", 'primeicons/primeicons.css', 'primevue/resources/primevue.min.css'],
  build: {
    transpile: ["primevue"]
  }
})
