// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  modules: [
    '@pinia/nuxt',
    'pinia-plugin-persistedstate/nuxt',
  ],
  css: ['~/assets/css/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  plugins: [
    '@/plugins/vue-notification.ts'
  ],
  runtimeConfig: {
    public: {
      apiBaseURL: process.env.API_BASE_URL,
      appName: process.env.APP_NAME
    }
  },
  ssr: false,
})
