import Vue from 'vue'
import Toasted from 'vue-toasted'

Vue.use(Toasted, <%= serialize(options) %>)

export default function (ctx, inject) {
  inject('toast', Vue.toasted)
}