import { defineNuxtConfig } from 'nuxt3';

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
  css: ['@/assets/style/main.scss', '@openfonts/fira-code_latin/index.css'],
  buildModules: ['@pinia/nuxt', '@vueuse/nuxt'],
  app: {
    baseURL: "https://amitkummer.github.io/zork/",
    cdnURL: "https://amitkummer.github.io/zork/"
  },
  target: 'static'
});
