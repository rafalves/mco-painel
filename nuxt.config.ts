// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: false,
  modules: [
    '@nuxtjs/tailwindcss', 'nuxt-primevue', 'nuxt-icon'
  ],
  runtimeConfig: {
    rafaelStrapiToken: '',
    lomadeePublisherID: '',
    lomadeeApiToken: '',
    telegramBotToken: '',
    strapiWebhookToken: '',
    public: {
      lomadeeBaseUrl: '',
    }
  },
  css: ["@/assets/css/main.css", 'primevue/resources/themes/lara-light-indigo/theme.css', 'primeicons/primeicons.css'],
  primevue: {
    usePrimeVue: true,
    options: {
      ripple: true,
    },
    components: {
      prefix: '',
      include: ['Button', 'InputText', 'InputNumber', 'TabView', 'TabPanel', 'DataTable', 'Column', 'Checkbox', 'Toolbar', 'RadioButton', 'Textarea'],
    },
    directives: {
      prefix: '',
      include: ['Tooltip'],
    },
  },
})
