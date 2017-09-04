import Vue from 'vue'
import Toasted from 'vue-toasted'

Vue.use(Toasted, <%= JSON.stringify(options) %>)

export default function (ctx, inject) {
  inject('toast', Vue.toasted)
}