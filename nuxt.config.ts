export default defineNuxtConfig({
  compatibilityDate: '2025-01-01',
  devtools: { enabled: false },
  css: ['~/assets/css/main.css'],
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      htmlAttrs: { lang: 'es' },
      title: 'Prisma: universo del color y la composición',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'OVA de teoría del color y composición visual con Nuxt 3 y Vue 3.' },
        { name: 'keywords', content: 'Teoría del Color, Círculo Cromático, Composición Visual, Vue3, Nuxt, Componentes Interactivos, Arte Digital, Módulo Educativo, HTML5 Canvas' }
      ],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;600&family=Space+Grotesk:wght@500;700&display=swap' }
      ]
    }
  }
})
