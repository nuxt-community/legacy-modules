import Vue from 'vue'
import { Toasted } from 'vue-toasted'

declare module '@nuxt/vue-app' {
  interface Context {
    $toast: Toasted
  }
  interface NuxtAppOptions {
    $toast: Toasted
  }
}

// Nuxt 2.9+
declare module '@nuxt/types' {
  interface Context {
    $toast: Toasted
  }
  interface NuxtAppOptions {
    $toast: Toasted
  }
}

declare module 'vue/types/vue' {
  interface Vue {
    $toast: Toasted
  }
}
