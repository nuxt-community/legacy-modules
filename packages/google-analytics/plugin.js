import Vue from 'vue'
import AdsByGoogle from './adsbygoogle.vue'

// Extend the AdsByGoogle component with the client ID
const adsbygoogle = {
  extends: AdsByGoogle,
  props: {
    adClient: {
      type: String,
      default: '<%= options.id %>'
    },
    adTest: {
      type: Boolean,
      default: <%= options.test %>
  }
}

// Register our ad component
Vue.component('adsbygoogle', adsbygoogle)
