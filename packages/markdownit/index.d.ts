import MarkdownIt from 'markdown-it'

declare module '@nuxt/types' {
  interface Context {
    $md: MarkdownIt
  }
  interface NuxtAppOptions {
    $md: MarkdownIt
  }
}

declare module 'vue/types/vue' {
  interface Vue {
    $md: MarkdownIt
  }
}

declare module "vuex/types/index" {
  interface Store<S> {
    $md: MarkdownIt
  }
}
