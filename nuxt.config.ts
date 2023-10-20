// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  ssr: false,
  modules: [
    '@nuxtjs/tailwindcss', 'nuxt-primevue',
  ],
  css: ["@/assets/css/main.css", 'primevue/resources/themes/lara-light-indigo/theme.css'],
  primevue: {
    usePrimeVue: true,
    options: {
      ripple: true,
    },
    components: {
      prefix: '',
      include: ['Button', 'InputText', 'TabView', 'TabPanel', 'DataTable',
        'Column', 'Checkbox', 'Toolbar', 'RadioButton'],
    },
    directives: {
      prefix: '',
      include: ['Tooltip'],
    },
  },
})
